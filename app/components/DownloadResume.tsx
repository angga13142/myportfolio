"use client";

import { Download, FileText } from "lucide-react";

export function DownloadResumeButton() {
  const handleDownload = () => {
    // In production, this would trigger actual PDF generation
    // For now, we'll show a message
    alert("PDF download feature coming soon! For now, use browser Print > Save as PDF");
    
    // Trigger browser print dialog
    window.print();
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-200 font-medium"
    >
      <Download className="w-5 h-5" />
      Download Resume (PDF)
    </button>
  );
}

export function PrintResumeButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-200 font-medium"
    >
      <FileText className="w-5 h-5" />
      Print Resume
    </button>
  );
}
