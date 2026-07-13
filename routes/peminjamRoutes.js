const express = require("express");
const router = express.Router();
const peminjamController = require("../controllers/peminjamController");

router.get("/", peminjamController.getAllPeminjam);
router.get("/:id", peminjamController.getPeminjamById);
router.post("/", peminjamController.createPeminjam);
router.put("/:id", peminjamController.updatePeminjam);
router.delete("/:id", peminjamController.deletePeminjam);

module.exports = router;
