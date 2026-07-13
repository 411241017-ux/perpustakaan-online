const express = require("express");
const router = express.Router();
const transaksiController = require("../controllers/transaksiController");

router.get("/", transaksiController.getAllTransaksi);
router.post("/pinjam", transaksiController.pinjamBuku);
router.put("/kembali/:id", transaksiController.kembalikanBuku);
router.delete("/:id", transaksiController.deleteTransaksi);

module.exports = router;
