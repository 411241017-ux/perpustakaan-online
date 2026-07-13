const db = require("../config/db");
const fs = require("fs");

exports.getAllBuku = (req, res) => {
    const { query } = req.query;
    let sql = "SELECT * FROM buku";
    let params = [];

    if (query) {
        sql += " WHERE judul LIKE ?";
        params.push(`%${query}%`);
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

exports.getBukuById = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM buku WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.json(result[0]);
    });
};

exports.createBuku = (req, res) => {
    const { judul, pengarang, penerbit, tahun_terbit } = req.body;
    const gambar_sampul = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO buku (judul, pengarang, penerbit, tahun_terbit, gambar_sampul)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [judul, pengarang, penerbit, tahun_terbit, gambar_sampul],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data buku berhasil ditambahkan" });
        }
    );
};

exports.updateBuku = (req, res) => {
    const id = req.params.id;
    const { judul, pengarang, penerbit, tahun_terbit } = req.body;

    db.query("SELECT * FROM buku WHERE id=?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ message: "Buku tidak ditemukan" });

        let gambar_sampul = rows[0].gambar_sampul;

        if (req.file) {
            if (gambar_sampul) {
                const oldPath = `uploads/${gambar_sampul}`;
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            gambar_sampul = req.file.filename;
        }

        const sql = `
            UPDATE buku
            SET judul=?, pengarang=?, penerbit=?, tahun_terbit=?, gambar_sampul=?
            WHERE id=?
        `;

        db.query(
            sql,
            [judul, pengarang, penerbit, tahun_terbit, gambar_sampul, id],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Data buku berhasil diperbarui" });
            }
        );
    });
};

exports.deleteBuku = (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM buku WHERE id=?", [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ message: "Buku tidak ditemukan" });

        const gambar_sampul = rows[0].gambar_sampul;
        if (gambar_sampul) {
            const path = `uploads/${gambar_sampul}`;
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        }

        db.query("DELETE FROM buku WHERE id=?", [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Data buku berhasil dihapus" });
        });
    });
};
