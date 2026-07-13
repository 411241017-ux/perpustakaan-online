const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const bukuRoutes = require("./routes/bukuRoutes");
const peminjamRoutes = require("./routes/peminjamRoutes");
const transaksiRoutes = require("./routes/transaksiRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/buku", bukuRoutes);
app.use("/api/peminjam", peminjamRoutes);
app.use("/api/transaksi", transaksiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("=================================");
    console.log("SERVER BERHASIL DIJALANKAN");
    console.log("=================================");
    console.log(`Frontend : http://localhost:${PORT}`);
    console.log(`API Buku : http://localhost:${PORT}/api/buku`);
    console.log(`API Peminjam : http://localhost:${PORT}/api/peminjam`);
    console.log(`API Transaksi : http://localhost:${PORT}/api/transaksi`);
    console.log(`Folder Upload : http://localhost:${PORT}/uploads`);
    console.log("=================================");
});
