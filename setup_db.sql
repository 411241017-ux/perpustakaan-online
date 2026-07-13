CREATE DATABASE IF NOT EXISTS db_perpustakaan;
USE db_perpustakaan;

DROP TABLE IF EXISTS peminjaman, peminjam, buku;

CREATE TABLE IF NOT EXISTS buku (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    pengarang VARCHAR(255) NOT NULL,
    penerbit VARCHAR(255) NOT NULL,
    tahun_terbit INT NOT NULL,
    gambar_sampul VARCHAR(255),
    status ENUM('Tersedia', 'Dipinjam') DEFAULT 'Tersedia'
);

CREATE TABLE IF NOT EXISTS peminjam (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL UNIQUE,
    nama VARCHAR(255) NOT NULL,
    jurusan VARCHAR(255) NOT NULL,
    no_telp VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS peminjaman (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_buku INT NOT NULL,
    id_peminjam INT NOT NULL,
    tanggal_pinjam DATE NOT NULL,
    tanggal_kembali DATE,
    status ENUM('Dipinjam', 'Dikembalikan') DEFAULT 'Dipinjam',
    FOREIGN KEY (id_buku) REFERENCES buku(id) ON DELETE CASCADE,
    FOREIGN KEY (id_peminjam) REFERENCES peminjam(id) ON DELETE CASCADE
);

INSERT INTO buku (id, judul, pengarang, penerbit, tahun_terbit, gambar_sampul, status) VALUES
(1, 'Laskar Pelangi', 'test', 'test', 2003, '1783962919066-52fb48f9-0987-4992-bf0a-92477f2b28f9.jpg', 'Dipinjam');

INSERT INTO peminjam (id, nim, nama, jurusan, no_telp) VALUES
(1, '411241017', 'Oscar Chin', 'Teknik Informatika', '0816817259');

INSERT INTO peminjaman (id, id_buku, id_peminjam, tanggal_pinjam, tanggal_kembali, status) VALUES
(1, 1, 1, '2026-07-13', NULL, 'Dipinjam');
