const db = require("../config/db");

exports.getAllTransaksi = (req, res) => {
    const sql = `
        SELECT p.id, p.tanggal_pinjam, p.tanggal_kembali, p.status,
               b.judul AS buku_judul, pm.nama AS peminjam_nama,
               p.id_buku
        FROM peminjaman p
        JOIN buku b ON p.id_buku = b.id
        JOIN peminjam pm ON p.id_peminjam = pm.id
        ORDER BY p.id DESC
    `;
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

exports.pinjamBuku = (req, res) => {
    const { id_buku, id_peminjam, tanggal_pinjam } = req.body;

    // Check if buku is available
    db.query("SELECT status FROM buku WHERE id=?", [id_buku], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ message: "Buku tidak ditemukan" });
        if (rows[0].status === 'Dipinjam') return res.status(400).json({ message: "Buku sedang dipinjam" });

        // Insert into peminjaman
        const sql = `
            INSERT INTO peminjaman (id_buku, id_peminjam, tanggal_pinjam, status)
            VALUES (?, ?, ?, 'Dipinjam')
        `;

        db.query(sql, [id_buku, id_peminjam, tanggal_pinjam], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            // Update buku status
            db.query("UPDATE buku SET status='Dipinjam' WHERE id=?", [id_buku], (err, updateRes) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Peminjaman berhasil dicatat" });
            });
        });
    });
};

exports.kembalikanBuku = (req, res) => {
    const id_transaksi = req.params.id;
    const { tanggal_kembali } = req.body;

    // Get id_buku from transaksi
    db.query("SELECT id_buku, status FROM peminjaman WHERE id=?", [id_transaksi], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        if (rows[0].status === 'Dikembalikan') return res.status(400).json({ message: "Buku sudah dikembalikan sebelumnya" });

        const id_buku = rows[0].id_buku;

        // Update peminjaman status
        const sql = `
            UPDATE peminjaman
            SET tanggal_kembali=?, status='Dikembalikan'
            WHERE id=?
        `;

        db.query(sql, [tanggal_kembali, id_transaksi], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            // Update buku status
            db.query("UPDATE buku SET status='Tersedia' WHERE id=?", [id_buku], (err, updateRes) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Pengembalian berhasil dicatat" });
            });
        });
    });
};

exports.deleteTransaksi = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM peminjaman WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Data transaksi berhasil dihapus" });
    });
};
