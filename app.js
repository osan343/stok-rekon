/* Stok Rekon — aplikasi stok (GitHub Pages + Supabase) */
(() => {
"use strict";

const CFG = window.STOK_CONFIG || {};
const configured = CFG.SUPABASE_URL && !CFG.SUPABASE_URL.includes("XXXX") && CFG.SUPABASE_ANON_KEY && !CFG.SUPABASE_ANON_KEY.includes("TEMPEL");
const sb = configured ? window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY) : null;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const view = $("#view");

// ------------------------------------------------------------ util
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const angka = (n) => (Number(n) || 0).toLocaleString("id-ID");
const tgl = (s) => { if (!s) return "-"; const [y, m, d] = String(s).slice(0, 10).split("-"); return `${d}/${m}/${y}`; };
const waktu = (s) => s ? new Date(s).toLocaleString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";
const today = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const code = (id) => "TRX-" + String(id).padStart(5, "0");
const roleLbl = (r) => (r === "admin" ? "admin" : "karyawan");
const kainLbl = (k) => (k === "Y" ? "Kain" : "Polos");
const kainBadge = (k) => `<span class="badge ${k === "Y" ? "b-kain" : "b-polos"}">${kainLbl(k)}</span>`;
const tipeBadge = (t) => `<span class="badge ${t === "masuk" ? "b-in" : "b-out"}">${t}</span>`;
const plabel = (p) => p ? [p.kode, p.jenis, p.urat, p.panjang, kainLbl(p.kain)].filter(Boolean).join(" · ") : "-";
const norm = (s) => String(s || "").toLowerCase()
  .replace(/w\/\s*oak|woak|w\.oak/g, "white oak").replace(/wallnut|wolnut|walnot/g, "walnut").replace(/w\/\s*ash/g, "white ash");
const words = (q) => norm(q).split(/\s+/).filter(Boolean);
const stokCls = (s) => (s < 0 ? "neg" : s === 0 ? "zero" : s < 20 ? "low" : "");
const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} } };

function flash(msg, type = "ok", keep = false) {
  const el = $("#flash");
  el.innerHTML = `<div class="flash ${type}">${esc(msg)}</div>`;
  clearTimeout(flash.t);
  if (!keep) flash.t = setTimeout(() => (el.innerHTML = ""), 5000);
}
function fail(err, ctx = "") {
  console.error(ctx, err);
  const m = err?.message || String(err);
  flash((ctx ? ctx + ": " : "") + (/row-level security|permission denied/i.test(m) ? "Anda tidak punya izin untuk ini." : m), "error", true);
}
async function q(promise, ctx) {
  const { data, error, count } = await promise;
  if (error) { fail(error, ctx); throw error; }
  return count !== undefined && count !== null ? { data, count } : data;
}
async function fetchAll(build, max = 20000) {
  const out = []; const page = 1000;
  for (let from = 0; from < max; from += page) {
    const rows = await q(build().range(from, from + page - 1));
    out.push(...rows);
    if (rows.length < page) break;
  }
  return out;
}

// ------------------------------------------------------------ auth state
const state = { session: null, me: null, meError: null };
const isStaff = () => !!state.me?.aktif;
const isAdmin = () => isStaff() && state.me.role === "admin";

// Muat profil akun. Dicoba 2x; jika token kedaluwarsa, sesi disegarkan dulu.
async function fetchMe() {
  if (!state.session) { state.me = null; state.meError = null; return; }
  let lastErr = null;
  for (let i = 0; i < 2; i++) {
    const { data, error } = await sb.from("profiles").select("*").eq("id", state.session.user.id).maybeSingle();
    if (!error) { state.me = data || null; state.meError = null; return; }
    lastErr = error;
    try { const r = await sb.auth.refreshSession(); if (r.data?.session) state.session = r.data.session; } catch {}
  }
  state.meError = lastErr;   // jangan anggap "belum aktif" kalau sebenarnya gagal memuat
}
// Semua perubahan sesi diproses berurutan supaya tidak saling menimpa.
let authQueue = Promise.resolve();
function setSession(session) {
  authQueue = authQueue.then(async () => {
    if (session?.user?.id !== state.session?.user?.id) state.me = null;
    state.session = session;
    await fetchMe();
    renderNav();
  });
  return authQueue;
}

function renderNav() {
  const r = location.hash.split("/")[1] || "";
  const a = (h, t, key) => `<a href="#/${h}" class="${r === key ? "on" : ""}">${t}</a>`;
  let html = a("", "Stok", "");
  if (isStaff()) {
    html += a("transaksi", "Transaksi", "transaksi") + a("baru", "+ Input", "baru") + a("riwayat", "Riwayat", "riwayat");
    if (isAdmin()) html += a("produk-admin", "Produk", "produk-admin") + a("pengguna", "Pengguna", "pengguna");
  }
  if (state.session) html += a("akun", "👤 " + esc(state.me?.nama || "Akun"), "akun") + `<button id="logout">Keluar</button>`;
  else html += a("login", "Login karyawan", "login");
  $("#nav").innerHTML = html;
  $("#logout")?.addEventListener("click", async () => { await sb.auth.signOut(); location.hash = "#/"; });
}
$("#menuBtn").addEventListener("click", () => $("#nav").classList.toggle("open"));

function needStaff() {
  if (!state.session) { location.hash = "#/login?next=" + encodeURIComponent(location.hash.slice(1)); return false; }
  if (!isStaff()) {
    view.innerHTML = state.meError
      ? `<div class="card empty"><h1>Gagal memuat akun</h1><p>Periksa koneksi internet, lalu coba lagi.</p><button class="btn pri" id="recheck">Coba lagi</button></div>`
      : `<div class="card empty"><h1>Akun belum aktif</h1><p>Akun <b>${esc(state.me?.username || "")}</b> menunggu diaktifkan oleh admin.</p><button class="btn pri" id="recheck">Cek lagi</button></div>`;
    $("#recheck").addEventListener("click", async () => { await setSession(state.session); route(); });
    return false;
  }
  return true;
}
function needAdmin() {
  if (!needStaff()) return false;
  if (!isAdmin()) { view.innerHTML = `<div class="card empty"><h1>403</h1><p>Halaman ini khusus admin.</p></div>`; return false; }
  return true;
}

// ------------------------------------------------------------ shared data
let productsCache = null;
async function getProducts(force) {
  if (!productsCache || force) productsCache = await q(sb.from("products").select("*").order("sku"), "Memuat produk");
  return productsCache;
}
async function getStok() {
  return await q(sb.from("stok").select("*"), "Memuat stok");
}
const sortProd = (a, b) => a.jenis.localeCompare(b.jenis) || String(a.kode || "").localeCompare(String(b.kode || "")) || (a.panjang || 0) - (b.panjang || 0) || (b.kain || "").localeCompare(a.kain || "");

// ============================================================ PAGES
const routes = {};

// ------------------------------------------------------------ Stok (publik)
routes[""] = async () => {
  const rows = (await getStok()).filter((r) => r.aktif).sort(sortProd);
  const jenis = [...new Set(rows.map((r) => r.jenis))].sort();
  const saved = store.get("stokFilter", { q: "", j: "", p: "", k: "", h: false });
  view.innerHTML = `
  <div class="head"><div><h1>Stok barang</h1><div class="muted small">Jumlah lembar terkini dari semua transaksi masuk &amp; keluar.</div></div>
    ${isStaff() ? `<div class="row"><a class="btn in" href="#/baru?tipe=masuk">+ Barang masuk</a><a class="btn out" href="#/baru?tipe=keluar">− Barang keluar</a></div>` : ""}</div>
  <div class="stats"><div class="stat"><b id="sTot">0</b><span>Total lembar</span></div><div class="stat"><b id="sN">0</b><span>Jenis barang</span></div><div class="stat"><b id="sNeg">0</b><span>Stok minus</span></div></div>
  <div class="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
    <input id="q" type="search" placeholder="Cari: walnut kembang 310 kain, 026C, jati 250…" autocomplete="off"></div>
  <div class="chips" id="chips">
    <button class="chip" data-j="">Semua</button>${jenis.map((j) => `<button class="chip" data-j="${esc(j)}">${esc(j)}</button>`).join("")}
    <span class="chip-sep"></span><button class="chip" data-p="250">250</button><button class="chip" data-p="310">310</button>
    <button class="chip" data-k="Y">Kain</button><button class="chip" data-k="N">Polos</button><span class="chip-sep"></span>
    <label class="tog"><input type="checkbox" id="hide0"> Sembunyikan stok 0</label></div>
  <div class="tblwrap"><table class="tbl cards" id="tbl"><thead><tr><th>SKU</th><th>Kode</th><th>Jenis</th><th>Urat</th><th>Panjang</th><th>Kain/Polos</th><th class="num">Stok</th></tr></thead><tbody>
  ${rows.map((r) => `<tr class="click" data-sku="${r.sku}">
    <td class="d">${r.sku}</td><td class="d code">${esc(r.kode || "-")}</td>
    <td class="m-main"><b>${esc(r.jenis)}</b> <span class="m-only muted">${esc(r.urat)}</span></td>
    <td class="d">${esc(r.urat)}</td><td class="d">${r.panjang ?? ""}</td><td class="d">${kainBadge(r.kain)}</td>
    <td class="m-sub">${r.panjang ?? ""} · ${kainBadge(r.kain)} · <span class="code">${esc(r.kode || "tanpa kode")}</span></td>
    <td class="num m-stok"><span class="stok ${stokCls(r.stok)}">${angka(r.stok)}</span></td></tr>`).join("")}
  </tbody></table></div><div class="card empty" id="empty" hidden>Tidak ada barang yang cocok.</div>`;

  const f = { j: saved.j || "", p: saved.p || "", k: saved.k || "" };
  const qi = $("#q"), hide0 = $("#hide0"), trs = $$("#tbl tbody tr");
  qi.value = saved.q || ""; hide0.checked = !!saved.h;
  const hay = rows.map((r) => norm([r.sku, r.kode, r.jenis, r.urat, r.panjang, kainLbl(r.kain)].join(" ")));
  const paint = () => $$("#chips .chip").forEach((c) => {
    for (const key of ["j", "p", "k"]) if (key in c.dataset) c.classList.toggle("on", c.dataset[key] === f[key] && (key === "j" || f[key] !== ""));
  });
  const apply = () => {
    const w = words(qi.value); let tot = 0, n = 0, neg = 0;
    rows.forEach((r, i) => {
      const ok = w.every((x) => hay[i].includes(x)) && (!f.j || r.jenis === f.j) && (!f.p || String(r.panjang) === f.p) && (!f.k || r.kain === f.k) && !(hide0.checked && r.stok === 0);
      trs[i].hidden = !ok; if (ok) { tot += r.stok; n++; if (r.stok < 0) neg++; }
    });
    $("#sTot").textContent = angka(tot); $("#sN").textContent = n; $("#sNeg").textContent = neg; $("#empty").hidden = n > 0;
    store.set("stokFilter", { q: qi.value, ...f, h: hide0.checked });
  };
  $("#chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    for (const key of ["j", "p", "k"]) if (key in b.dataset) f[key] = f[key] === b.dataset[key] && key !== "j" ? "" : b.dataset[key];
    paint(); apply();
  });
  qi.addEventListener("input", apply); hide0.addEventListener("change", apply);
  $("#tbl tbody").addEventListener("click", (e) => { const tr = e.target.closest("tr"); if (tr) location.hash = "#/produk/" + tr.dataset.sku; });
  paint(); apply();
  if (matchMedia("(min-width:721px)").matches) qi.focus();
};

// ------------------------------------------------------------ Detail produk
routes["produk"] = async ([sku]) => {
  const s = await q(sb.from("stok").select("*").eq("sku", sku).maybeSingle(), "Memuat produk");
  if (!s) { view.innerHTML = `<div class="card empty">Produk tidak ditemukan.</div>`; return; }
  let hist = "";
  if (isStaff()) {
    const tx = await q(sb.from("transactions").select("id,tipe,tanggal,keterangan,qty").eq("sku", sku).eq("dihapus", false)
      .order("tanggal", { ascending: false }).order("id", { ascending: false }).limit(500), "Memuat transaksi");
    let saldo = s.stok;
    hist = `<h2>Riwayat transaksi</h2>` + (tx.length ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>Kode</th><th>Tanggal</th><th>Jenis</th><th>Keterangan</th><th class="num">Jumlah</th><th class="num">Saldo</th></tr></thead><tbody>
      ${tx.map((t) => { const row = `<tr class="click" data-id="${t.id}"><td class="code"><a href="#/trx/${t.id}">${code(t.id)}</a></td><td>${tgl(t.tanggal)}</td><td>${tipeBadge(t.tipe)}</td><td>${esc(t.keterangan)}</td>
        <td class="num">${t.tipe === "masuk" ? "+" : "−"}${angka(t.qty)}</td><td class="num muted">${angka(saldo)}</td></tr>`;
        saldo += t.tipe === "masuk" ? -t.qty : t.qty; return row; }).join("")}</tbody></table></div>` : `<div class="card empty">Belum ada transaksi.</div>`);
  } else hist = `<p class="muted">Login sebagai karyawan untuk melihat riwayat transaksi barang ini.</p>`;
  view.innerHTML = `<p><a href="#/">← Kembali ke stok</a></p>
  <div class="head"><div><h1>${esc(s.jenis)} ${esc(s.urat)} ${s.panjang ?? ""}</h1>
    <div class="row"><span class="code">${esc(s.kode || "tanpa kode")}</span><span class="muted">SKU ${s.sku}</span>${kainBadge(s.kain)}${s.aktif ? "" : '<span class="badge b-del">nonaktif</span>'}</div></div>
    ${isStaff() ? `<div class="row"><a class="btn in" href="#/baru?tipe=masuk&sku=${s.sku}">+ Masuk</a><a class="btn out" href="#/baru?tipe=keluar&sku=${s.sku}">− Keluar</a></div>` : ""}</div>
  <div class="stats four"><div class="stat"><b class="stok ${stokCls(s.stok)}">${angka(s.stok)}</b><span>Stok sekarang</span></div>
    <div class="stat"><b>${angka(s.masuk)}</b><span>Total masuk</span></div><div class="stat"><b>${angka(s.keluar)}</b><span>Total keluar</span></div>
    <div class="stat"><b>${tgl(s.terakhir)}</b><span>Transaksi terakhir</span></div></div>${hist}`;
  $$("tr[data-id]").forEach((tr) => tr.addEventListener("click", () => (location.hash = "#/trx/" + tr.dataset.id)));
};

// ------------------------------------------------------------ Login / daftar / akun
routes["login"] = async (_, params) => {
  if (state.session && isStaff()) { location.hash = "#/transaksi"; return; }
  const daftar = params.get("daftar") === "1";
  view.innerHTML = `<div class="card narrow">
    <h1>${daftar ? "Daftar akun karyawan" : "Login karyawan"}</h1>
    <p class="muted small">${daftar ? "Setelah mendaftar, minta admin mengaktifkan akun Anda." : "Untuk input dan edit barang masuk/keluar. Lihat stok tidak perlu login."}</p>
    <form class="form" id="f">
      ${daftar ? `<label>Nama<input name="nama" required></label>` : ""}
      <label>Username<input name="u" autocapitalize="none" autocomplete="username" required pattern="[a-zA-Z0-9._\\-]{3,}" title="Minimal 3 huruf/angka, tanpa spasi"></label>
      <label>Password ${daftar ? '<span class="hint">minimal 6 karakter</span>' : ""}<input name="p" type="password" autocomplete="${daftar ? "new-password" : "current-password"}" minlength="6" required></label>
      <button class="btn pri">${daftar ? "Daftar" : "Masuk"}</button>
    </form>
    <p class="small">${daftar ? `Sudah punya akun? <a href="#/login">Login</a>` : `Belum punya akun? <a href="#/login?daftar=1">Daftar</a> · Lupa password? Hubungi admin.`}</p></div>`;
  $("#f").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target), btn = e.target.querySelector("button");
    const email = String(fd.get("u")).trim().toLowerCase() + "@" + (CFG.EMAIL_DOMAIN || "stok.local");
    btn.disabled = true;
    try {
      if (daftar) {
        const { data, error } = await sb.auth.signUp({ email, password: fd.get("p"), options: { data: { nama: String(fd.get("nama")).trim() } } });
        if (error) throw error;
        if (!data.session) { flash("Akun dibuat, tapi Supabase masih meminta konfirmasi email. Admin: matikan 'Confirm email' (lihat panduan).", "warn", true); return; }
        flash("Akun dibuat. Tunggu admin mengaktifkan akun Anda.", "ok", true);
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password: fd.get("p") });
        if (error) throw new Error(/invalid/i.test(error.message) ? "Username atau password salah." : error.message);
      }
      await setSession((await sb.auth.getSession()).data.session);
      const next = params.get("next");
      location.hash = next && next.startsWith("/") ? "#" + next : isStaff() ? "#/transaksi" : "#/akun";
    } catch (err) { fail(err); } finally { btn.disabled = false; }
  });
};

routes["akun"] = async () => {
  if (!state.session) { location.hash = "#/login"; return; }
  const me = state.me || {};
  view.innerHTML = `<h1>Akun saya</h1><p class="muted">${esc(me.nama)} · <span class="code">${esc(me.username)}</span> · ${esc(roleLbl(me.role))} · ${me.aktif ? "aktif" : '<b class="warn-t">menunggu diaktifkan admin</b>'}</p>
  <div class="card narrow left"><h2 class="mt0">Ganti password</h2><form class="form" id="f">
    <label>Password baru<input name="p" type="password" minlength="6" required autocomplete="new-password"></label>
    <label>Ulangi password baru<input name="p2" type="password" minlength="6" required autocomplete="new-password"></label>
    <button class="btn pri">Simpan</button></form></div>`;
  $("#f").addEventListener("submit", async (e) => {
    e.preventDefault(); const fd = new FormData(e.target);
    if (fd.get("p") !== fd.get("p2")) return flash("Password tidak sama.", "error");
    const { error } = await sb.auth.updateUser({ password: fd.get("p") });
    if (error) return fail(error); e.target.reset(); flash("Password berhasil diganti.");
  });
};

// ------------------------------------------------------------ Daftar transaksi
let txCache = null;
routes["transaksi"] = async (_, params) => {
  if (!needStaff()) return;
  const deleted = params.get("dihapus") === "1";
  const rows = await fetchAll(() => sb.from("transactions")
    .select("id,tipe,tanggal,keterangan,sku,qty,catatan,dihapus,created_at,products(kode,jenis,urat,panjang,kain),pembuat:profiles!transactions_created_by_fkey(nama)")
    .eq("dihapus", deleted).order("tanggal", { ascending: false }).order("id", { ascending: false }));
  txCache = rows;
  const saved = store.get("trxFilter", { q: "", tipe: "", dari: "", sampai: "" });
  view.innerHTML = `<div class="head"><div><h1>${deleted ? "Transaksi terhapus" : "Transaksi"}</h1><div class="muted small" id="sum"></div></div>
    <div class="row"><a class="btn in" href="#/baru?tipe=masuk">+ Barang masuk</a><a class="btn out" href="#/baru?tipe=keluar">− Barang keluar</a></div></div>
  <div class="filters card">
    <label class="q">Cari nama, kode TRX, jenis, kode barang<input id="q" type="search" placeholder="mis. anton walnut 310, TRX-00231" value="${esc(saved.q)}"></label>
    <label class="f-tipe">Jenis<select id="tipe"><option value="">Semua</option><option value="masuk">Masuk</option><option value="keluar">Keluar</option></select></label>
    <label>Dari<input id="dari" type="date" value="${esc(saved.dari)}"></label><label>Sampai<input id="sampai" type="date" value="${esc(saved.sampai)}"></label>
    <button class="btn ghost" id="reset">Reset</button></div>
  <p class="small"><a href="#/transaksi${deleted ? "" : "?dihapus=1"}">${deleted ? "← Transaksi aktif" : "Lihat transaksi yang dihapus"}</a> · <a href="#" id="csv">Unduh CSV (hasil filter)</a></p>
  <div class="tblwrap"><table class="tbl tx"><thead><tr><th>Kode</th><th>Tanggal</th><th>Jenis</th><th>Keterangan</th><th>Barang</th><th class="num">Jumlah</th><th>Input oleh</th><th></th></tr></thead><tbody id="tb"></tbody></table></div>
  <div class="card empty" id="empty" hidden>Tidak ada transaksi yang cocok.</div><div class="center" id="more"></div>`;
  $("#tipe").value = saved.tipe || "";
  const hay = rows.map((t) => norm([code(t.id), t.id, t.keterangan, t.catatan, plabel(t.products), t.products?.urat].join(" ")));
  let shown = [], limit = 200;
  const apply = () => {
    const w = words($("#q").value).map((x) => x.replace(/^trx-0*/, "trx-")), tp = $("#tipe").value, d1 = $("#dari").value, d2 = $("#sampai").value;
    shown = rows.filter((t, i) => (!tp || t.tipe === tp) && (!d1 || t.tanggal >= d1) && (!d2 || t.tanggal <= d2)
      && w.every((x) => hay[i].replace(/trx-0*/, "trx-").includes(x)));
    const tin = shown.filter((t) => t.tipe === "masuk").reduce((a, t) => a + t.qty, 0), tout = shown.filter((t) => t.tipe === "keluar").reduce((a, t) => a + t.qty, 0);
    $("#sum").textContent = `${angka(shown.length)} transaksi · masuk ${angka(tin)} · keluar ${angka(tout)} lembar`;
    $("#tb").innerHTML = shown.slice(0, limit).map((t) => `<tr>
      <td class="code"><a href="#/trx/${t.id}">${code(t.id)}</a></td><td class="nw">${tgl(t.tanggal)}</td><td>${tipeBadge(t.tipe)}</td>
      <td>${esc(t.keterangan)}</td><td><a href="#/produk/${t.sku}">${esc(plabel(t.products))}</a></td><td class="num"><b>${angka(t.qty)}</b></td>
      <td class="muted small">${esc(t.pembuat?.nama || "Impor Excel")}</td><td><a class="btn sm" href="#/edit/${t.id}">Edit</a></td></tr>`).join("");
    $("#empty").hidden = shown.length > 0;
    $("#more").innerHTML = shown.length > limit ? `<button class="btn" id="moreBtn">Tampilkan lebih banyak (${angka(shown.length - limit)} lagi)</button>` : "";
    $("#moreBtn")?.addEventListener("click", () => { limit += 300; apply(); });
    store.set("trxFilter", { q: $("#q").value, tipe: tp, dari: d1, sampai: d2 });
  };
  ["#q", "#tipe", "#dari", "#sampai"].forEach((s) => $(s).addEventListener("input", () => { limit = 200; apply(); }));
  $("#reset").addEventListener("click", () => { $("#q").value = $("#tipe").value = $("#dari").value = $("#sampai").value = ""; apply(); });
  $("#csv").addEventListener("click", (e) => {
    e.preventDefault();
    const head = ["Kode", "Tanggal", "Jenis", "Keterangan", "SKU", "Kode Barang", "Jenis Kayu", "Urat", "Panjang", "Kain", "Qty", "Catatan", "Input oleh"];
    const lines = [head, ...shown.map((t) => [code(t.id), t.tanggal, t.tipe, t.keterangan, t.sku, t.products?.kode, t.products?.jenis, t.products?.urat, t.products?.panjang, kainLbl(t.products?.kain), t.qty, t.catatan, t.pembuat?.nama || "Impor Excel"])]
      .map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(";"));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv" }));
    a.download = `transaksi-${today()}.csv`; a.click();
  });
  apply();
};

// ------------------------------------------------------------ Form input / edit
async function txForm(t) {
  const editing = !!t;
  const [products, stok] = await Promise.all([getProducts(), getStok()]);
  const stokMap = Object.fromEntries(stok.map((s) => [s.sku, s.stok]));
  const P = products.filter((p) => p.aktif || (editing && p.sku === t.sku)).sort(sortProd)
    .map((p) => ({ ...p, l: plabel(p), h: norm([p.sku, p.kode, p.jenis, p.urat, p.panjang, kainLbl(p.kain)].join(" ")) }));
  const names = [...new Set((txCache || []).map((x) => x.keterangan).filter(Boolean))].slice(0, 400);
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  const d = t || { tipe: params.get("tipe") === "masuk" ? "masuk" : "keluar", tanggal: params.get("tanggal") || today(), sku: +params.get("sku") || null, qty: "", keterangan: "", catatan: "" };
  view.innerHTML = `<h1>${editing ? "Edit " + code(t.id) : "Input transaksi"}</h1>
  <p class="muted small">${editing ? "Setiap perubahan tercatat di riwayat pelacakan." : "Barang masuk (pembelian/retur) atau keluar (penjualan)."}</p>
  <div class="card narrow left"><form class="form" id="f" autocomplete="off">
    <div class="seg"><input type="radio" name="tipe" id="t-masuk" value="masuk"><label for="t-masuk">＋ Barang masuk</label>
      <input type="radio" name="tipe" id="t-keluar" value="keluar"><label for="t-keluar">− Barang keluar</label></div>
    <label>Tanggal<input type="date" name="tanggal" required value="${esc(d.tanggal)}"></label>
    <div class="lbl">Barang <span class="hint">ketik untuk mencari, mis. "walnut kembang 310 kain" atau "026C"</span>
      <div class="picker"><input id="pick" placeholder="Cari barang…"><div class="picker-list" id="plist"></div></div>
      <div class="chosen" id="chosen"><span id="cl"></span><span id="cs" class="muted"></span></div></div>
    <label>Jumlah (lembar)<input type="number" name="qty" min="1" step="1" inputmode="numeric" required value="${esc(d.qty)}"></label>
    <label><span id="kl">Keterangan</span> <span class="hint" id="kh"></span><input name="keterangan" list="names" value="${esc(d.keterangan)}"></label>
    ${editing
      ? `<label>Catatan: alasan perubahan <span class="hint">wajib, minimal 10 karakter</span>
          <textarea name="catatan" rows="2" required minlength="10" placeholder="mis. salah input jumlah, seharusnya 8 lembar"></textarea>
          ${t.catatan ? `<span class="hint">Catatan sebelumnya: ${esc(t.catatan)}</span>` : ""}</label>`
      : `<label>Catatan <span class="hint">opsional</span><textarea name="catatan" rows="2">${esc(d.catatan)}</textarea></label>`}
    <div class="flash warn" id="warn" hidden></div>
    <div class="row"><button class="btn pri" data-a="save">Simpan</button>${editing ? "" : `<button class="btn" data-a="again">Simpan &amp; input lagi</button>`}
      <a class="btn ghost" href="${editing ? "#/trx/" + t.id : "#/transaksi"}">Batal</a></div>
  </form><datalist id="names">${names.map((n) => `<option value="${esc(n)}">`).join("")}</datalist></div>
  ${editing ? `<div class="card narrow left mt"><form class="row" id="del"><input name="alasan" placeholder="Alasan hapus (wajib, min. 10 karakter)" class="grow" required minlength="10"><button class="btn danger">Hapus transaksi</button></form></div>` : ""}`;
  const form = $("#f"); let sku = d.sku, act = 0, shown = [];
  form.tipe.value = d.tipe;
  const pick = $("#pick"), list = $("#plist");
  const render = () => {
    const w = words(pick.value); shown = P.filter((p) => w.every((x) => p.h.includes(x))).slice(0, 60);
    list.innerHTML = shown.map((p, i) => `<div class="picker-item${i === act ? " act" : ""}" data-i="${i}"><span>${esc(p.l)}</span><small>stok ${angka(stokMap[p.sku] ?? 0)}</small></div>`).join("") || `<div class="picker-item muted">Tidak ditemukan</div>`;
    list.classList.add("open");
  };
  const show = () => { const p = P.find((x) => x.sku === sku); $("#chosen").classList.toggle("show", !!p); if (p) { $("#cl").textContent = p.l; $("#cs").textContent = "stok " + angka(stokMap[p.sku] ?? 0); } };
  const choose = (p) => { sku = p.sku; pick.value = ""; list.classList.remove("open"); show(); check(); form.qty.focus(); };
  const check = () => {
    const out = form.tipe.value === "keluar", n = +form.qty.value;
    $("#kl").textContent = out ? "Pembeli / tujuan" : "Keterangan"; $("#kh").textContent = out ? "wajib" : "mis. Pembelian, Bengkel, Retur";
    let st = stokMap[sku] ?? 0; if (editing && t.sku === sku && !t.dihapus) st += t.tipe === "keluar" ? t.qty : -t.qty;
    const w = $("#warn"); w.hidden = !(sku && n && out && n > st);
    w.textContent = `Perhatian: stok tersedia ${angka(st)}, setelah ini jadi ${angka(st - n)}. Tetap bisa disimpan jika memang benar.`;
  };
  pick.addEventListener("focus", render); pick.addEventListener("input", () => { act = 0; render(); });
  pick.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { act = Math.min(act + 1, shown.length - 1); render(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { act = Math.max(act - 1, 0); render(); e.preventDefault(); }
    else if (e.key === "Enter") { e.preventDefault(); if (shown[act]) choose(shown[act]); }
    else if (e.key === "Escape") list.classList.remove("open");
  });
  list.addEventListener("mousedown", (e) => { const it = e.target.closest("[data-i]"); if (it) { e.preventDefault(); choose(shown[+it.dataset.i]); } });
  pick.addEventListener("blur", () => setTimeout(() => list.classList.remove("open"), 150));
  form.qty.addEventListener("input", check); $$("[name=tipe]", form).forEach((r) => r.addEventListener("change", check));
  let submitter = "save";
  $$("button[data-a]", form).forEach((b) => b.addEventListener("click", () => (submitter = b.dataset.a)));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!sku) { flash("Pilih barang dulu.", "error"); pick.focus(); render(); return; }
    const row = { tipe: form.tipe.value, tanggal: form.tanggal.value, sku, qty: parseInt(form.qty.value, 10),
      keterangan: form.keterangan.value.trim(), catatan: form.catatan.value.trim() };
    if (!(row.qty > 0)) return flash("Jumlah harus lebih dari 0.", "error");
    if (row.tipe === "keluar" && !row.keterangan) return flash("Isi nama pembeli/tujuan.", "error");
    if (editing && row.catatan.length < 10) { form.catatan.focus(); return flash("Tulis alasan perubahan di kolom Catatan (minimal 10 karakter).", "error"); }
    $$("button", form).forEach((b) => (b.disabled = true));
    try {
      if (editing) {
        const changed = ["tipe", "tanggal", "sku", "qty", "keterangan"].some((k) => String(row[k]) !== String(t[k] ?? ""));
        if (!changed) { flash("Tidak ada perubahan.", "warn"); location.hash = "#/trx/" + t.id; return; }
        await q(sb.from("transactions").update(row).eq("id", t.id), "Gagal menyimpan");
        flash("Perubahan disimpan."); location.hash = "#/trx/" + t.id;
      } else {
        const saved = await q(sb.from("transactions").insert({ ...row, created_by: state.session.user.id }).select("id").single(), "Gagal menyimpan");
        txCache = null;
        flash(`Tersimpan sebagai ${code(saved.id)}.`);
        if (submitter === "again") { location.hash = `#/baru?tipe=${row.tipe}&tanggal=${row.tanggal}&r=${Date.now()}`; }
        else location.hash = "#/trx/" + saved.id;
      }
    } catch { /* sudah ditampilkan */ } finally { $$("button", form).forEach((b) => (b.disabled = false)); }
  });
  $("#del")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const alasan = e.target.alasan.value.trim();
    if (alasan.length < 10) { e.target.alasan.focus(); return flash("Tulis alasan hapus minimal 10 karakter.", "error"); }
    if (!confirm(`Hapus ${code(t.id)}? Transaksi bisa dipulihkan lagi.`)) return;
    await q(sb.from("transactions").update({ dihapus: true, catatan: alasan, alasan }).eq("id", t.id), "Gagal menghapus");
    flash(`${code(t.id)} dihapus (bisa dipulihkan).`); location.hash = "#/trx/" + t.id;
  });
  show(); check();
  if (!sku) pick.focus(); else form.qty.focus();
}
routes["baru"] = async () => { if (needStaff()) await txForm(null); };
routes["edit"] = async ([id]) => {
  if (!needStaff()) return;
  const t = await q(sb.from("transactions").select("*").eq("id", id).maybeSingle(), "Memuat transaksi");
  if (!t) { view.innerHTML = `<div class="card empty">Transaksi tidak ditemukan.</div>`; return; }
  if (t.dihapus) { flash("Transaksi ini sudah dihapus. Pulihkan dulu untuk mengubah.", "warn"); location.hash = "#/trx/" + id; return; }
  await txForm(t);
};

// ------------------------------------------------------------ Detail + pelacakan
const FIELD = { tipe: "Jenis", tanggal: "Tanggal", keterangan: "Keterangan", sku: "Barang", qty: "Jumlah", catatan: "Catatan" };
async function describeChanges(p) {
  if (!p) return "";
  const prods = await getProducts();
  const pl = (s) => plabel(prods.find((x) => x.sku === s)) + ` (SKU ${s})`;
  if (!Array.isArray(Object.values(p)[0])) return p.qty ? `${p.tipe} ${angka(p.qty)} lembar · ${esc(pl(p.sku))}` : "";
  return Object.entries(p).map(([k, [a, b]]) => {
    const f = (v) => (k === "sku" ? pl(v) : k === "tanggal" ? tgl(v) : v === "" || v == null ? "(kosong)" : v);
    return `<div>${FIELD[k] || k}: <s class="muted">${esc(f(a))}</s> → <b>${esc(f(b))}</b></div>`;
  }).join("");
}
routes["trx"] = async ([id]) => {
  if (!needStaff()) return;
  const [t, hist] = await Promise.all([
    q(sb.from("transactions").select("*,products(*),pembuat:profiles!transactions_created_by_fkey(nama),pengubah:profiles!transactions_updated_by_fkey(nama)").eq("id", id).maybeSingle(), "Memuat transaksi"),
    q(sb.from("history").select("*,profiles(nama)").eq("transaction_id", id).order("id", { ascending: false }), "Memuat riwayat"),
  ]);
  if (!t) { view.innerHTML = `<div class="card empty"><h1>Tidak ditemukan</h1><p>${code(id)} tidak ada.</p><a class="btn" href="#/transaksi">Semua transaksi</a></div>`; return; }
  const items = await Promise.all(hist.map(async (h) => `<li class="${h.aksi}"><b class="cap">${h.aksi}</b> <span class="muted small">· ${esc(h.profiles?.nama || "Sistem")} · ${waktu(h.waktu)}</span>
    <div class="small">${await describeChanges(h.perubahan)}${h.alasan ? `<div>Alasan: ${esc(h.alasan)}</div>` : ""}</div></li>`));
  view.innerHTML = `<p><a href="#/transaksi">← Semua transaksi</a></p>
  <div class="head"><div><h1 class="code big">${code(t.id)}</h1><div class="row">${tipeBadge("barang " + t.tipe).replace(/b-out|b-in/, t.tipe === "masuk" ? "b-in" : "b-out")}${t.dihapus ? '<span class="badge b-del">dihapus</span>' : ""}</div></div>
    <div class="row">${t.dihapus ? `<button class="btn" id="restore">Pulihkan</button>` : `<a class="btn pri" href="#/edit/${t.id}">Edit</a>`}</div></div>
  <div class="grid2"><div class="card"><dl class="dl">
    <dt>Tanggal</dt><dd>${tgl(t.tanggal)}</dd>
    <dt>${t.tipe === "keluar" ? "Pembeli" : "Keterangan"}</dt><dd>${esc(t.keterangan || "-")}</dd>
    <dt>Barang</dt><dd><a href="#/produk/${t.sku}">${esc(plabel(t.products))}</a> <span class="muted">(SKU ${t.sku})</span></dd>
    <dt>Jumlah</dt><dd class="big">${angka(t.qty)} lembar</dd>
    <dt>Catatan</dt><dd class="n">${esc(t.catatan || "-")}</dd>
    <dt>Diinput</dt><dd class="n">${esc(t.pembuat?.nama || "Impor Excel")} · ${waktu(t.created_at)}</dd>
    ${t.updated_at ? `<dt>Terakhir diubah</dt><dd class="n">${esc(t.pengubah?.nama || "-")} · ${waktu(t.updated_at)}</dd>` : ""}
  </dl></div>
  <div class="card"><h2 class="mt0">Riwayat pelacakan</h2><ul class="tl">${items.join("")}</ul></div></div>`;
  $("#restore")?.addEventListener("click", async () => {
    await q(sb.from("transactions").update({ dihapus: false, alasan: null }).eq("id", t.id), "Gagal memulihkan");
    flash(`${code(t.id)} dipulihkan.`); route();
  });
};

// ------------------------------------------------------------ Riwayat aktivitas
routes["riwayat"] = async () => {
  if (!needStaff()) return;
  const rows = await q(sb.from("history").select("*,profiles(nama),transactions(tipe,qty,keterangan,sku,products(kode,jenis))")
    .neq("aksi", "impor").order("id", { ascending: false }).limit(300), "Memuat riwayat");
  const body = await Promise.all(rows.map(async (h) => `<tr><td class="small nw">${waktu(h.waktu)}</td><td>${esc(h.profiles?.nama || "-")}</td>
    <td><span class="badge ${h.aksi === "dihapus" ? "b-out" : h.aksi === "dibuat" ? "b-in" : "b-admin"}">${h.aksi}</span></td>
    <td><a class="code" href="#/trx/${h.transaction_id}">${code(h.transaction_id)}</a> <span class="small muted">${esc(h.transactions?.tipe)} ${angka(h.transactions?.qty)} · ${esc(h.transactions?.keterangan)} · ${esc(h.transactions?.products?.jenis)} ${esc(h.transactions?.products?.kode || "")}</span></td>
    <td class="small">${h.aksi === "diubah" ? await describeChanges(h.perubahan) : ""}${h.alasan ? `<div>Alasan: ${esc(h.alasan)}</div>` : ""}</td></tr>`));
  view.innerHTML = `<h1>Riwayat aktivitas</h1><p class="muted small">Siapa menginput, mengubah, menghapus transaksi (300 terakhir).</p>
  ${rows.length ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>Waktu</th><th>Oleh</th><th>Aksi</th><th>Transaksi</th><th>Detail</th></tr></thead><tbody>${body.join("")}</tbody></table></div>` : `<div class="card empty">Belum ada aktivitas.</div>`}`;
};

// ------------------------------------------------------------ Admin: produk
routes["produk-admin"] = async () => {
  if (!needAdmin()) return;
  const [products, stok] = await Promise.all([getProducts(true), getStok()]);
  const sm = Object.fromEntries(stok.map((s) => [s.sku, s.stok]));
  const next = Math.max(0, ...products.map((p) => p.sku)) + 1;
  const kainSel = (k) => `<select name="kain"><option value="N">Polos</option><option value="Y" ${k === "Y" ? "selected" : ""}>Kain</option></select>`;
  view.innerHTML = `<h1>Daftar produk</h1><p class="muted small">Tambah atau ubah jenis barang. Barang nonaktif disembunyikan dari halaman stok &amp; form input.</p>
  <details class="card mb"><summary><b>+ Tambah produk baru</b></summary>
    <form class="filters auto" id="add"><label>SKU<input type="number" name="sku" value="${next}" required></label><label>Kode<input name="kode" placeholder="026C"></label>
    <label>Jenis<input name="jenis" placeholder="White Oak" required></label><label>Urat<input name="urat" placeholder="Lurus/Kembang"></label>
    <label>Panjang<input type="number" name="panjang" placeholder="250"></label><label>Kain/Polos${kainSel("N")}</label><button class="btn pri">Tambah</button></form></details>
  <div class="search"><input id="pq" type="search" placeholder="Cari produk…" class="plain"></div>
  <div class="tblwrap"><table class="tbl"><thead><tr><th>SKU</th><th>Kode</th><th>Jenis</th><th>Urat</th><th>Panjang</th><th>Kain</th><th>Status</th><th class="num">Stok</th><th></th></tr></thead><tbody>
  ${products.map((p) => `<tr data-sku="${p.sku}" data-h="${esc(norm([p.sku, p.kode, p.jenis, p.urat, p.panjang].join(" ")))}"><td><a href="#/produk/${p.sku}">${p.sku}</a></td>
    <td><input name="kode" value="${esc(p.kode || "")}" class="w90"></td><td><input name="jenis" value="${esc(p.jenis)}" class="w120"></td>
    <td><input name="urat" value="${esc(p.urat || "")}" class="w100"></td><td><input type="number" name="panjang" value="${p.panjang ?? ""}" class="w80"></td>
    <td>${kainSel(p.kain)}</td><td><select name="aktif"><option value="1">Aktif</option><option value="0" ${p.aktif ? "" : "selected"}>Nonaktif</option></select></td>
    <td class="num">${angka(sm[p.sku] ?? 0)}</td><td><button class="btn sm" data-save>Simpan</button></td></tr>`).join("")}</tbody></table></div>`;
  const val = (el, n) => el.querySelector(`[name=${n}]`).value.trim();
  $("#add").addEventListener("submit", async (e) => {
    e.preventDefault(); const f = e.target;
    const row = { sku: +val(f, "sku"), kode: val(f, "kode") || null, jenis: val(f, "jenis"), urat: val(f, "urat"), panjang: +val(f, "panjang") || null, kain: val(f, "kain") };
    if (products.some((p) => p.sku === row.sku)) return flash(`SKU ${row.sku} sudah dipakai.`, "error");
    await q(sb.from("products").insert(row), "Gagal menambah"); flash(`SKU ${row.sku} ditambahkan.`); productsCache = null; route();
  });
  $("#pq").addEventListener("input", (e) => { const w = words(e.target.value); $$("tbody tr[data-h]").forEach((tr) => (tr.hidden = !w.every((x) => tr.dataset.h.includes(x)))); });
  $$("[data-save]").forEach((b) => b.addEventListener("click", async () => {
    const tr = b.closest("tr");
    const row = { kode: val(tr, "kode") || null, jenis: val(tr, "jenis"), urat: val(tr, "urat"), panjang: +val(tr, "panjang") || null, kain: val(tr, "kain"), aktif: val(tr, "aktif") === "1" };
    if (!row.jenis) return flash("Jenis wajib diisi.", "error");
    await q(sb.from("products").update(row).eq("sku", tr.dataset.sku), "Gagal menyimpan"); productsCache = null; flash(`SKU ${tr.dataset.sku} disimpan.`);
  }));
};

// ------------------------------------------------------------ Admin: pengguna
routes["pengguna"] = async () => {
  if (!needAdmin()) return;
  const users = await q(sb.from("profiles").select("*").order("aktif").order("username"), "Memuat pengguna");
  const pending = users.filter((u) => !u.aktif).length;
  view.innerHTML = `<h1>Akun pengguna</h1>
  <p class="muted small"><b>Karyawan</b> bisa input, edit, hapus/pulihkan transaksi (edit &amp; hapus wajib menulis alasan). <b>Admin</b> juga bisa mengelola produk dan akun.</p>
  <div class="card mb small"><b>Menambah karyawan:</b> minta karyawan membuka <a href="#/login?daftar=1">halaman Daftar</a> lalu aktifkan akunnya di sini.
    Lupa password: reset dari Supabase → Authentication → Users (email = <span class="code">username@${esc(CFG.EMAIL_DOMAIN || "stok.local")}</span>).</div>
  ${pending ? `<div class="flash warn">${pending} akun menunggu diaktifkan.</div>` : ""}
  <div class="tblwrap"><table class="tbl"><thead><tr><th>Nama</th><th>Username</th><th>Peran</th><th>Status</th><th>Terdaftar</th><th>Aksi</th></tr></thead><tbody>
  ${users.map((u) => `<tr data-id="${u.id}"><td><b>${esc(u.nama)}</b></td><td class="code">${esc(u.username)}</td>
    <td><span class="badge ${u.role === "admin" ? "b-admin" : "b-polos"}">${roleLbl(u.role)}</span></td>
    <td>${u.aktif ? "Aktif" : '<b class="warn-t">Menunggu</b>'}</td><td class="small muted">${waktu(u.created_at)}</td>
    <td>${u.id === state.me.id ? '<span class="muted small">(Anda)</span>' : `<div class="row">
      <button class="btn sm ${u.aktif ? "danger" : "in"}" data-a="aktif">${u.aktif ? "Nonaktifkan" : "Aktifkan"}</button>
      <button class="btn sm" data-a="role">Jadikan ${u.role === "admin" ? "karyawan" : "admin"}</button></div>`}</td></tr>`).join("")}</tbody></table></div>`;
  $$("button[data-a]").forEach((b) => b.addEventListener("click", async () => {
    const id = b.closest("tr").dataset.id, u = users.find((x) => x.id === id);
    const patch = b.dataset.a === "aktif" ? { aktif: !u.aktif } : { role: u.role === "admin" ? "pekerja" : "admin" };
    await q(sb.from("profiles").update(patch).eq("id", id), "Gagal mengubah akun"); flash(`Akun ${u.username} diperbarui.`); route();
  }));
};

// ------------------------------------------------------------ router
let routeSeq = 0;
async function route() {
  const seq = ++routeSeq;
  await authQueue;                                   // tunggu profil akun selesai dimuat
  if (state.session && !isStaff()) await setSession(state.session);   // status bisa saja baru diaktifkan admin
  if (seq !== routeSeq) return;                      // sudah ada navigasi yang lebih baru
  const [path, qs] = location.hash.replace(/^#\/?/, "").split("?");
  const [name, ...args] = path.split("/");
  $("#nav").classList.remove("open");
  renderNav();
  const fn = routes[name] ?? routes[""];
  try { await fn(args, new URLSearchParams(qs || "")); }
  catch (e) { if (!$("#flash").innerHTML) fail(e); if (view.textContent.trim() === "Memuat…") view.innerHTML = `<div class="card empty">Gagal memuat data. Periksa koneksi lalu muat ulang.</div>`; }
  window.scrollTo(0, 0);
}

async function start() {
  if (!sb) {
    view.innerHTML = `<div class="card narrow"><h1>Belum dihubungkan</h1><p>Isi <span class="code">SUPABASE_URL</span> dan <span class="code">SUPABASE_ANON_KEY</span> di file <span class="code">config.js</span>. Lihat panduan README.</p></div>`;
    return;
  }
  await setSession((await sb.auth.getSession()).data.session);
  // Catatan: jangan memanggil query Supabase langsung di dalam callback ini (bisa macet);
  // pekerjaan ditunda dengan setTimeout.
  sb.auth.onAuthStateChange((ev, session) => {
    setTimeout(() => {
      const changed = ev === "SIGNED_OUT" || session?.user?.id !== state.session?.user?.id;
      if (changed) setSession(session).then(route);
      else state.session = session;
    }, 0);
  });
  window.addEventListener("hashchange", route);
  route();
}
start();
})();
