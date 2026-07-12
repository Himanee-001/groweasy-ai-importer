const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { processCSV } = require("../controllers/uploadController");

const router = express.Router();

// Create uploads folder automatically if it doesn't exist
const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload only
router.post("/", upload.single("csv"), (req, res) => {
  res.json({
    success: true,
    message: "CSV Uploaded Successfully",
    file: req.file,
  });
});

// AI Processing
router.post("/process", upload.single("csv"), processCSV);

module.exports = router;