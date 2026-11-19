-- =====================================================================
-- Foto per kode rekon
-- Jalankan SEKALI di Supabase: SQL Editor -> New query -> tempel -> Run.
-- Membuat tempat penyimpanan foto "gambar" (bisa dilihat publik) dan tabel
-- penanda foto mana milik kode rekon yang mana. Hanya admin yang bisa
-- mengunggah, mengganti, atau menghapus foto.
-- =====================================================================

-- Tabel: kunci = "KODE|Jenis|Urat" (mis. "026C|White Oak|Kembang"),
-- atau "sku:NN" untuk produk tanpa kode.
create table if not exists public.gambar_kode (
  kunci       text primary key,
  path        text not null,                         -- nama file di storage "gambar"
  updated_by  uuid references public.profiles(id) default auth.uid(),
  updated_at  timestamptz not null default now()
);

alter table public.gambar_kode enable row level security;

drop policy if exists "gambar publik" on public.gambar_kode;
create policy "gambar publik" on public.gambar_kode for select to anon, authenticated using (true);
drop policy if exists "admin tambah gambar" on public.gambar_kode;
create policy "admin tambah gambar" on public.gambar_kode for insert to authenticated with check (public.is_admin());
drop policy if exists "admin ubah gambar" on public.gambar_kode;
create policy "admin ubah gambar" on public.gambar_kode for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin hapus gambar" on public.gambar_kode;
create policy "admin hapus gambar" on public.gambar_kode for delete to authenticated using (public.is_admin());

revoke all on public.gambar_kode from anon;
grant select on public.gambar_kode to anon;
grant select, insert, update, delete on public.gambar_kode to authenticated;

-- Storage bucket publik "gambar" (maks. 5 MB per file, hanya gambar)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gambar', 'gambar', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "lihat file gambar" on storage.objects;
create policy "lihat file gambar" on storage.objects for select to anon, authenticated
  using (bucket_id = 'gambar');
drop policy if exists "admin unggah gambar" on storage.objects;
create policy "admin unggah gambar" on storage.objects for insert to authenticated
  with check (bucket_id = 'gambar' and public.is_admin());
drop policy if exists "admin ubah file gambar" on storage.objects;
create policy "admin ubah file gambar" on storage.objects for update to authenticated
  using (bucket_id = 'gambar' and public.is_admin()) with check (bucket_id = 'gambar' and public.is_admin());
drop policy if exists "admin hapus file gambar" on storage.objects;
create policy "admin hapus file gambar" on storage.objects for delete to authenticated
  using (bucket_id = 'gambar' and public.is_admin());

notify pgrst, 'reload schema';
