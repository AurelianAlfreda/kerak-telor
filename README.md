# MAKANAN NUSANTARA - KERAK TELOR

### ANGGOTA KELOMPOK 10:

Clara Nata Valentina - 535250065
Aurelian Alfreda - 535250088
Chatrina Citra Patricia Hutabarat. - 535250096
Stephanie Angeline - 825240071
Andre Ha Putra - 825240076

# 🍳 Kerak Telor — Legenda Betawi

Website edukasi dan promosi kuliner **Kerak Telor Betawi**: mengenal asal-usul, cara pembuatan, rekomendasi tempat di Jakarta, dan berbagi kenangan lewat ulasan. Dilengkapi dashboard admin untuk mengelola konten.

## ✨ Fitur

**Pengunjung**
- Register, login, dan logout
- Pengenalan kerak telor dan sejarah (timeline dinamis)
- Video tutorial pembuatan (YouTube)
- Rekomendasi 10 tempat di 5 wilayah Jakarta, lengkap dengan kisaran harga dan tautan Google Maps
- **Wall of Memories**: beri rating bintang dan tulis ulasan
- Tampilan responsif (desktop dan mobile)

**Admin**
- Statistik: total ulasan, rata-rata rating, distribusi rating, 5 ulasan terbaru
- Moderasi ulasan (cari dan hapus)
- Kelola rekomendasi tempat (tambah, edit, hapus, reset ke data awal)
- Kelola konten sejarah (tambah, edit, hapus, reset ke data awal)

## 🚀 Cara Menjalankan

1. Buka folder proyek di VS Code, lalu jalankan `index.html` dengan **Live Server**.
2. Daftar akun pengunjung di `register.html`, lalu login.
3. Untuk dashboard admin, buka `/admin/login.html` di **browser yang sama**.

**Akun admin:** `admin` / `admin123`

## ⚙️ Cara Kerja Singkat

- **Penyimpanan data:** seluruh data (tempat, ulasan, sejarah, akun) disimpan di `localStorage`. Saat masih kosong, data awal dari `data.js` dimuat otomatis.
- **Autentikasi:** status login disimpan di `sessionStorage`. Halaman utama akan mengalihkan ke halaman login jika pengunjung belum masuk.
- **Sinkronisasi:** perubahan di dashboard admin langsung tampil di halaman pengunjung karena keduanya membaca sumber data yang sama.

## 🛠️ Teknologi

HTML5 · CSS3 · JavaScript · jQuery · Bootstrap 5 · Google Fonts

## 📁 Struktur Folder

- `index.html`, `script.js`, `style.css` — halaman utama pengunjung
- `data.js` — data awal dan fungsi bantu penyimpanan
- `register.*`, `loginuser.*` — registrasi dan login pengunjung
- `admin/` — dashboard admin
- `images/` — aset gambar

## 🔭 Pengembangan Selanjutnya

- Backend dan database sungguhan (PHP/MySQL) agar data tidak bergantung pada browser
- Enkripsi password dan autentikasi admin sisi server
- Fitur kelola video tutorial dan status moderasi ulasan
- Unggah gambar dan edit tautan Google Maps langsung dari dashboard admin
