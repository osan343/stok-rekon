-- =====================================================================
-- Pembaruan 19/11/2026: edit & hapus transaksi wajib menulis alasan
-- (minimal 10 karakter) di kolom catatan.
-- Jalankan SEKALI di Supabase: SQL Editor -> New query -> tempel -> Run.
-- (Tidak perlu dijalankan kalau 01_schema.sql baru dijalankan setelah tanggal ini.)
-- =====================================================================

create or replace function public.tx_before_update()
returns trigger language plpgsql as $$
begin
  new.created_by := old.created_by;
  new.created_at := old.created_at;
  new.updated_by := auth.uid();
  new.updated_at := now();
  -- Edit data atau hapus oleh pengguna: alasan wajib ditulis di kolom catatan (min. 10 karakter)
  if auth.uid() is not null and (
       (new.dihapus and not old.dihapus)
       or (new.tipe, new.tanggal, new.keterangan, new.sku, new.qty)
          is distinct from (old.tipe, old.tanggal, old.keterangan, old.sku, old.qty)) then
    if length(btrim(coalesce(new.catatan, ''))) < 10 or new.catatan is not distinct from old.catatan then
      raise exception 'Alasan wajib ditulis di kolom catatan (minimal 10 karakter).'
        using errcode = 'check_violation';
    end if;
  end if;
  if new.dihapus and not old.dihapus then
    new.alasan := new.catatan;
  end if;
  return new;
end $$;

create or replace function public.tx_log()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  diff jsonb := '{}'::jsonb;
  col  text;
begin
  if tg_op = 'INSERT' then
    insert into history (transaction_id, aksi, perubahan, user_id)
    values (new.id, case when auth.uid() is null then 'impor' else 'dibuat' end,
            jsonb_build_object('tipe', new.tipe, 'qty', new.qty, 'sku', new.sku), auth.uid());
    return new;
  end if;

  if new.dihapus is distinct from old.dihapus then
    insert into history (transaction_id, aksi, alasan, user_id)
    values (new.id, case when new.dihapus then 'dihapus' else 'dipulihkan' end, new.alasan, auth.uid());
  end if;

  foreach col in array array['tipe','tanggal','keterangan','sku','qty','catatan'] loop
    if (to_jsonb(old) -> col) is distinct from (to_jsonb(new) -> col) then
      diff := diff || jsonb_build_object(col, jsonb_build_array(to_jsonb(old) -> col, to_jsonb(new) -> col));
    end if;
  end loop;
  if new.dihapus is distinct from old.dihapus then
    diff := diff - 'catatan';   -- alasan hapus sudah tercatat di baris 'dihapus'
  end if;
  if diff <> '{}'::jsonb then
    insert into history (transaction_id, aksi, perubahan, alasan, user_id)
    values (new.id, 'diubah', diff, case when diff ? 'catatan' then new.catatan end, auth.uid());
  end if;
  return new;
end $$;

notify pgrst, 'reload schema';
