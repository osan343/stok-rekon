// =====================================================================
// GANTI dua nilai di bawah dengan milik project Supabase Anda:
// Supabase -> Project Settings -> API (atau Data API)
//   - Project URL          -> SUPABASE_URL
//   - anon / public key    -> SUPABASE_ANON_KEY
// Kunci "anon" memang aman untuk ditaruh di website publik; keamanan data
// dijaga oleh aturan Row Level Security di database.
// JANGAN pernah menaruh kunci "service_role" di sini.
// =====================================================================
window.STOK_CONFIG = {
  SUPABASE_URL: "https://XXXXXXXXXXXX.supabase.co",
  SUPABASE_ANON_KEY: "TEMPEL-ANON-KEY-DI-SINI",
  // Akhiran email palsu untuk login pakai username (tidak perlu diubah)
  EMAIL_DOMAIN: "stok.local",
  NAMA_USAHA: "Stok Rekon",
};
