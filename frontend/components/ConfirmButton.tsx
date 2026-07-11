"use client";

import { useState } from "react";
import { api } from "@/services/api";
import toast from "react-hot-toast";

interface Props {
  file: File | null;
  onSuccess: (response: any) => void;
  onComplete?: (time: number) => void;
}

export default function ConfirmButton({
  file,
  onSuccess,
  onComplete,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    if (!file) {
      toast.error("Please upload a CSV file first.");
      return;
    }

    const startTime = performance.now();
    setLoading(true);

    const formData = new FormData();
    formData.append("csv", file);

    try {
      const response = await api.post(
        "/upload/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSuccess(response.data);

      const endTime = performance.now();

      const processingTime = Number(
        ((endTime - startTime) / 1000).toFixed(2)
      );

      onComplete?.(processingTime);

      toast.success(
        `Import Successful! AI extracted ${response.data.imported.length} CRM records.`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to process CSV. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handleImport}
        disabled={loading || !file}
        className={`min-w-[270px] rounded-xl px-8 py-4 text-white font-semibold transition-all duration-300 ${
          loading || !file
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 hover:scale-105"
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <svg
              className="animate-spin h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="3"
                opacity="0.25"
              />
              <path
                d="M22 12a10 10 0 00-10-10"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <div className="text-left">
              <p>🤖 AI is extracting CRM fields...</p>
              <p className="text-xs opacity-90">
                Please wait...
              </p>
            </div>
          </div>
        ) : !file ? (
          "Upload CSV First"
        ) : (
          "Confirm Import"
        )}
      </button>
    </div>
  );
}