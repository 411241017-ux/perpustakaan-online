const express = require("express");
const router = express.Router();
const multer = require("multer");
const bukuController = require("../controllers/bukuController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

router.get("/", bukuController.getAllBuku);
router.get("/:id", bukuController.getBukuById);
router.post("/", upload.single("gambar_sampul"), bukuController.createBuku);
router.put("/:id", upload.single("gambar_sampul"), bukuController.updateBuku);
router.delete("/:id", bukuController.deleteBuku);

module.exports = router;
