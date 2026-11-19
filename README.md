# Stok Rekon Harmoni Veneer: GitHub Pages + Supabase

Aplikasi stok veneer berbasis web dengan pelacakan transaksi.

- **Halaman Stok** terbuka untuk umum tanpa login. Ada pencarian ("walnut kembang 310 kain", "026C") dan filter jenis, panjang, kain/polos.
- **Karyawan** login untuk input, edit, hapus, dan pulihkan barang masuk/keluar.
- Setiap transaksi punya **kode lacak** (`TRX-00231`) dengan riwayat lengkap: dibuat oleh siapa, diubah apa saja (nilai lama → baru), dihapus oleh siapa dan alasannya.
- **Admin** bisa mengaktifkan akun karyawan, mengubah peran, mengelola produk, melihat semua aktivitas, dan mengunduh CSV.

Biaya: **gratis**. GitHub Pages dan Supabase paket Free sudah cukup untuk pemakaian toko.

```
index.html  app.js  style.css  config.js   ← website (diunggah ke GitHub)
supabase/01_schema.sql                     ← struktur database + keamanan
supabase/02_data_awal.sql                  ← data dari Stok_Rekon.xlsx (67 produk, 292 transaksi)
supabase/03_perbaikan_alasan.sql           ← pembaruan 19/11: edit & hapus wajib menulis alasan
```

---

## Langkah 1: Buat database di Supabase

1. Daftar atau login di **https://supabase.com**, lalu klik **New project**.
   - Name: `stok-rekon`
   - Database password: buat dan simpan
   - Region: **Southeast Asia (Singapore)**
2. Tunggu project selesai dibuat. Buka menu **SQL Editor** → **New query**.
   Tempel seluruh isi `supabase/01_schema.sql`, lalu klik **Run**. Pastikan muncul "Success".
3. Buat **New query** lagi. Tempel isi `supabase/02_data_awal.sql`, lalu klik **Run**.
   Langkah ini hanya dijalankan **sekali**, karena kalau diulang transaksinya akan dobel.
4. Buka **Authentication → Sign In / Providers → Email**:
   - Matikan **Confirm email**. Login memakai username, bukan email sungguhan.
   - Biarkan **Allow new users to sign up** tetap menyala. Karyawan mendaftar sendiri, tapi akunnya **tidak bisa dipakai** sampai admin mengaktifkannya.
5. Buka **Project Settings → API** (atau **Data API**). Salin:
   - **Project URL**
   - **anon public** key (bukan service_role!)

## Langkah 2: Isi `config.js`

Buka `config.js` dan ganti dua baris berikut:
```js
SUPABASE_URL: "https://abcdefgh.supabase.co",
SUPABASE_ANON_KEY: "eyJhbGciOi...",
```
Kunci *anon* aman dipasang di website publik. Data tetap terlindungi oleh aturan keamanan (Row Level Security) di database.

## Langkah 3: Pasang di GitHub Pages

1. Login di **https://github.com**, lalu buat repository baru (**New**), misalnya `stok-rekon`. Pilih **Public**.
   Repository private butuh GitHub berbayar untuk Pages.
2. Klik **Add file → Upload files**. Unggah `index.html`, `app.js`, `style.css`, `config.js`, dan `.nojekyll`, lalu klik **Commit changes**.
   Folder `supabase/` tidak perlu diunggah. Kalau tetap ikut terunggah juga tidak masalah, karena isinya tidak memuat password.
3. Buka **Settings → Pages**. Pada *Build and deployment*, pilih **Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
4. Setelah 1–2 menit, website aktif di alamat `https://USERNAME-GITHUB.github.io/stok-rekon/`.

## Langkah 4: Buat akun admin (lakukan SEGERA)

Akun **pertama** yang mendaftar otomatis menjadi **admin**. Jadi:
1. Buka website, klik **Login karyawan → Daftar**, lalu isi nama, username, dan password Anda.
2. Setelah itu baru bagikan link ke karyawan. Mereka daftar sendiri, lalu Anda aktifkan di menu **Pengguna**.

---

## Pemakaian sehari-hari
- **Input**: menu **+ Input**. Pilih Masuk atau Keluar, ketik nama barang, isi jumlah dan nama pembeli.
  Tombol **Simpan & input lagi** mempercepat pemindahan isi buku catatan.
- **Edit / hapus**: wajib menulis alasan di kolom **Catatan**, minimal 10 karakter. Aturan ini juga dijaga oleh database, dan alasannya tampil di riwayat pelacakan.
- **Lacak**: di menu Transaksi, ketik kode `TRX-00231` atau nama pembeli. Klik kode untuk melihat riwayatnya.
- **Lupa password karyawan**: buka Supabase → **SQL Editor** dan jalankan perintah berikut (ganti username dan password barunya):
  ```sql
  update auth.users set encrypted_password = crypt('passwordbaru123', gen_salt('bf'))
  where email = 'udin@stok.local';
  ```
  Karyawan yang masih bisa login dapat mengganti password sendiri di menu **Akun**.
- **Backup**: di menu Transaksi, klik **Unduh CSV**. Supabase paket Free juga menyimpan backup harian.

## Hal yang perlu diketahui
- Supabase Free **menjeda project yang tidak dipakai selama 7 hari**. Kalau aplikasinya dibuka setiap hari, project tidak akan dijeda. Kalau sempat terjeda, buka dashboard Supabase lalu klik *Restore*.
- Di Supabase → *Advisors*, mungkin muncul peringatan "Security Definer View" untuk view `stok`. Itu **disengaja**: pengunjung tanpa login bisa melihat jumlah stok, tapi tidak bisa melihat nama pelanggan atau detail transaksi.
- 2 baris Excel tidak ikut diimpor karena SKU-nya tidak valid: *Ruskar 18/10 (SKU kosong, 2 lbr)* dan *Tomi 22/10 (SKU 0, 30 lbr)*. Input ulang keduanya lewat aplikasi.
- Stok minus (ditandai merah) biasanya berarti ada pembelian yang belum dicatat.
