"use client";

import { useState, useRef } from "react";
import { CsvRow } from "@/types/csv";

import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import PreviewTable from "@/components/PreviewTable";
import ConfirmButton from "@/components/ConfirmButton";
import SummaryCards from "@/components/SummaryCards";
import ResultTable from "@/components/ResultTable";

export default function Home() {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [importedData, setImportedData] = useState<any[]>([]);
  const [skippedData, setSkippedData] = useState<any[]>([]);
   const [processingTime, setProcessingTime] = useState(0);
  const [summary, setSummary] = useState({
    imported: 0,
    skipped: 0,
    total: 0,
  });

  // Scroll target
  const resultRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">

        <Header />

        <UploadZone
          onFileSelect={setCsvData}
          onFileChange={setSelectedFile}
        />

        <PreviewTable data={csvData} />

        <ConfirmButton
          file={selectedFile}
          onSuccess={(response) => {
            setImportedData(response.imported);
            setSkippedData(response.skipped);

            setSummary({
              imported: response.totalImported,
              skipped: response.totalSkipped,
              total: csvData.length,
            });
          }}
          onComplete={(time) => {
  setProcessingTime(time);

  setTimeout(() => {
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, 300);
}}
        />
      
        <SummaryCards
          imported={summary.imported}
          skipped={summary.skipped}
          total={summary.total}
          processingTime={processingTime}
        />

        <div ref={resultRef}>
          <ResultTable
            title="Imported CRM Records"
            data={importedData}
          />

          <ResultTable
            title="Skipped Records"
            data={skippedData}
          />
        </div>

      </div>
    </main>
  );
}