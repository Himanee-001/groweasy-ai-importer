const fs = require("fs");
const parseCSV = require("../utils/csvParser");
const extractCRM = require("../services/geminiService");

async function processCSV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CSV file uploaded.",
      });
    }

    // Read CSV
    const records = await parseCSV(req.file.path);

    if (!records || records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "CSV file is empty.",
      });
    }

    const batchSize = 10;

    let aiResults = [];
    let skipped = [];

    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);

      console.log(
        `Processing batch ${i / batchSize + 1} of ${Math.ceil(
          records.length / batchSize
        )}`
      );

      try {
        const aiResponse = await extractCRM(batch);

        const parsedData = JSON.parse(aiResponse);

        aiResults.push(...parsedData);
      } catch (err) {
        console.error(`Batch ${i / batchSize + 1} failed`, err);

        skipped.push(...batch);
      }
    }

    const imported = [];

    aiResults.forEach((record) => {
      const hasEmail =
        record.email &&
        String(record.email).trim() !== "";

      const hasMobile =
        record.mobile_without_country_code &&
        String(record.mobile_without_country_code).trim() !== "";

      if (hasEmail || hasMobile) {
        imported.push(record);
      } else {
        skipped.push(record);
      }
    });

    res.json({
      success: true,
      imported,
      skipped,
      totalImported: imported.length,
      totalSkipped: skipped.length,
    });
  } catch (err) {
    console.error("AI Processing Error:", err);

    res.status(500).json({
      success: false,
      message: "AI failed to process the CSV.",
      error: err.message,
    });
  } finally {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
}

module.exports = {
  processCSV,
};