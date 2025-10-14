"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Download, ExternalLink, X, FileText } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string; // Optional - for image certificates
  isPDF?: boolean; // Flag for PDF certificates
  description?: string;
  verificationUrl?: string;
  downloadUrl?: string;
}

interface CertificateShowcaseProps {
  certificates: Certificate[];
}

export function CertificateShowcase({ certificates }: CertificateShowcaseProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const openModal = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 transition-all duration-300 cursor-pointer"
            onClick={() => openModal(cert)}
          >
            {/* Certificate Preview */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
              {cert.isPDF || !cert.image ? (
                // PDF Certificate - Show Icon
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <FileText className="w-20 h-20 text-zinc-400 mb-4" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-300 mb-1">PDF Certificate</p>
                    <p className="text-xs text-zinc-500">Click to download</p>
                  </div>
                </div>
              ) : (
                // Image Certificate
                <>
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
              
              {/* Overlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Certificate Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-1 line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-sm text-zinc-400 mb-2">{cert.issuer}</p>
              <p className="text-xs text-zinc-500">{cert.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-zinc-900 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Certificate Display */}
              <div className="relative w-full bg-zinc-950" style={{ aspectRatio: '4/3', maxHeight: '70vh' }}>
                {selectedCertificate.isPDF || !selectedCertificate.image ? (
                  // PDF Certificate - Show Download Prompt
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <FileText className="w-32 h-32 text-zinc-400 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">
                      PDF Certificate
                    </h3>
                    <p className="text-zinc-400 text-center mb-6">
                      This certificate is available as a PDF document
                    </p>
                    {selectedCertificate.downloadUrl && (
                      <a
                        href={selectedCertificate.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </a>
                    )}
                  </div>
                ) : (
                  // Image Certificate
                  <Image
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                )}
              </div>

              {/* Certificate Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedCertificate.title}
                  </h2>
                  <p className="text-lg text-zinc-300">{selectedCertificate.issuer}</p>
                  <p className="text-sm text-zinc-500 mt-1">{selectedCertificate.date}</p>
                </div>

                {selectedCertificate.description && (
                  <p className="text-zinc-400">{selectedCertificate.description}</p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {selectedCertificate.downloadUrl && (
                    <a
                      href={selectedCertificate.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  )}
                  
                  {selectedCertificate.verificationUrl && (
                    <a
                      href={selectedCertificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-700 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
