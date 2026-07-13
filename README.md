# Dashboard Perpustakaan

Aplikasi web manajemen perpustakaan yang dibangun menggunakan **Node.js, Express, dan MySQL** dengan arsitektur REST API dan Vanilla HTML/CSS/JS di sisi frontend. Aplikasi ini untuk SOAL 2 UAS.

## Fitur Utama
1. **Dashboard & Katalog Buku**: Melihat katalog buku dan status ketersediaannya (Tersedia/Dipinjam).
2. **Pencarian Buku**: Fitur pencarian buku berdasarkan judul secara real-time.
3. **Manajemen Buku (CRUD)**: Menambah, mengubah, menghapus data buku beserta upload gambar sampul.
4. **Manajemen Peminjam (CRUD)**: Menambah, mengubah, menghapus data anggota perpustakaan.
5. **Transaksi Peminjaman & Pengembalian**: Mencatat peminjaman buku (status otomatis menjadi 'Dipinjam') dan pengembalian buku (status kembali menjadi 'Tersedia').

## Teknologi yang Digunakan
- **Backend**: Node.js, Express.js
- **Database**: MySQL (via XAMPP), `mysql2`
- **Upload File**: `multer`
- **Frontend**: HTML5, CSS3 (Custom Premium Design), Vanilla JavaScript

## Cara Instalasi dan Menjalankan Proyek

1. **Persiapan Database (XAMPP)**
   - Pastikan **Apache** dan **MySQL** sudah berjalan di XAMPP Control Panel.
   - Buka phpMyAdmin (`http://localhost/phpmyadmin`) atau terminal MySQL.
   - Import file `setup_db.sql` atau eksekusi seluruh perintah di dalamnya untuk membuat database `db_perpustakaan` beserta tabel-tabelnya.
   - Alternatif: Anda bisa menjalankan perintah `node setup_db.js` pada terminal di dalam folder proyek untuk melakukan setup otomatis.

2. **Instalasi Dependensi**
   - Buka terminal/Command Prompt, arahkan ke folder proyek ini.
   - Jalankan perintah:
     ```bash
     npm install
     ```

3. **Menjalankan Server**
   - Di terminal yang sama, jalankan:
     ```bash
     node app.js
     ```
   - Server akan berjalan pada port 3000. Akan muncul log `SERVER BERHASIL DIJALANKAN` di terminal.

4. **Mengakses Aplikasi**
   - Buka browsernya dan navigasikan ke: **`http://localhost:3000`**

## Struktur Direktori
- `config/db.js`: Konfigurasi koneksi ke database MySQL.
- `controllers/`: Logika bisnis (buku, peminjam, transaksi).
- `routes/`: Definisi endpoint API RESTful.
- `public/`: File statis untuk frontend (HTML, CSS, JS).
- `uploads/`: Direktori penyimpanan file gambar sampul buku.
- `app.js`: Entry point / file utama aplikasi Node.js.
- `setup_db.sql`: Skrip inisialisasi tabel database.

---
*Dibuat untuk memenuhi tugas UAS Pemrograman Web - CRUD dan Upload File JS & MySQL.*
