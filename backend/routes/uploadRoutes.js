const express = require("express");
const multer = require("multer");

const { processCSV } = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
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