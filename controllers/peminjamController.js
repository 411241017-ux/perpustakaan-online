const db = require("../config/db");

exports.getAllPeminjam = (req, res) => {
    db.query("SELECT * FROM peminjam", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

exports.getPeminjamById = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM peminjam WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Peminjam tidak ditemukan" });
        res.json(result[0]);
    });
};

exports.createPeminjam = (req, res) => {
    const { nim, nama, jurusan, no_telp } = req.body;

    const sql = `
        INSERT INTO peminjam (nim, nama, jurusan, no_telp)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nim, nama, jurusan, no_telp], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data peminjam berhasil ditambahkan" });
    });
};

exports.updatePeminjam = (req, res) => {
    const id = req.params.id;
    const { nim, nama, jurusan, no_telp } = req.body;

    const sql = `
        UPDATE peminjam
        SET nim=?, nama=?, jurusan=?, no_telp=?
        WHERE id=?
    `;

    db.query(sql, [nim, nama, jurusan, no_telp, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data peminjam berhasil diperbarui" });
    });
};

exports.deletePeminjam = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM peminjam WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data peminjam berhasil dihapus" });
    });
};
