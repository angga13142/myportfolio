"use client";

import { Download, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { downloadProjectPDF } from "@/app/lib/pdf-generator";
import { trackPDFDownload } from "@/app/lib/analytics";

interface DownloadCaseStudyProps {
  project: {
    title: string;
    description: string;
    date: string;
    category: string;
    achievements: string[];
    metrics?: {
      label: string;
      value: string | number;
    }[];
  };
  className?: string;
}

export default function DownloadCaseStudy({
  project,
  className = "",
}: DownloadCaseStudyProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      await downloadProjectPDF(project);

      // Track PDF download
      trackPDFDownload(project.title);
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`${className}`}>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        aria-label="Download project case study as PDF"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

        {/* Icon */}
        <div className="relative">
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5 group-hover:animate-bounce" />
          )}
        </div>

        {/* Text */}
        <span className="relative">
          {isGenerating ? "Generating PDF..." : "Download Case Study"}
        </span>

        {/* File icon */}
        <FileText className="w-4 h-4 opacity-70" />
      </button>

      {/* Error message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Info text */}
      <p className="mt-2 text-xs text-zinc-500">
        Professional PDF case study with project details, metrics, and
        achievements
      </p>
    </div>
  );
}
