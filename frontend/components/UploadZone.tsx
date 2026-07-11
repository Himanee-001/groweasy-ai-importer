"use client";

import { useState } from "react";
import Papa from "papaparse";
import toast from "react-hot-toast";

interface UploadZoneProps {
  onFileSelect: (data: any[]) => void;
  onFileChange: (file: File) => void;
}

export default function UploadZone({
  onFileSelect,
  onFileChange,
}: UploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const parseFile = (file: File) => {
    setSelectedFile(file);
    onFileChange(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];

        if (rows.length === 0) {
          toast.error("CSV contains no records.");
          onFileSelect([]);
          setRowCount(0);
          return;
        }

        setRowCount(rows.length);

        toast.success(`CSV uploaded successfully (${rows.length} rows found)`);

        onFileSelect(rows);
      },
      error: () => {
        toast.error("Failed to parse CSV.");
      },
    });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const isCSV =
      file.type === "text/csv" ||
      file.name.toLowerCase().endsWith(".csv");

    if (!isCSV) {
      toast.error("Please upload a valid CSV file.");
      return;
    }

    parseFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      const isCSV =
        file.type === "text/csv" ||
        file.name.toLowerCase().endsWith(".csv");

      if (!isCSV) {
        toast.error("Please upload a valid CSV file.");
        return;
      }

      parseFile(file);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mt-8 transition-colors">

      <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        Upload CSV
      </h2>

      <p className="text-center text-gray-600 dark:text-gray-300 mt-4 text-lg">
        Drag & Drop your CSV here or click to browse
      </p>

      <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-2">
        Supports Facebook Leads, Google Ads, CRM Export,
        Excel Sheets, Marketing CSVs and more.
      </p>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`mt-8 border-2 border-dashed rounded-xl p-16 text-center transition-all duration-300
          ${
            dragActive
              ? "border-blue-600 bg-blue-50 dark:bg-slate-700"
              : "border-blue-300 dark:border-slate-600"
          }`}
      >
        <label className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg cursor-pointer transition">

          Choose CSV File

          <input
            hidden
            type="file"
            accept=".csv"
            onChange={handleFile}
          />
        </label>

        {selectedFile && (
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-5 max-w-md mx-auto transition-colors">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Uploaded File
            </p>

            <p className="text-green-700 dark:text-green-400 font-bold text-lg mt-1">
              📄 {selectedFile.name}
            </p>

            <p className="text-gray-600 dark:text-gray-300 mt-2">
              📊 {rowCount} rows found
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              💾 {(selectedFile.size / 1024).toFixed(2)} KB
            </p>

          </div>
        )}
      </div>
    </div>
  );
}