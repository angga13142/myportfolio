"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      {/* Mobile-optimized gallery grid */}
      <div className="my-8 sm:my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video group cursor-pointer overflow-hidden rounded-lg bg-zinc-100"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm font-medium px-2 text-center">
                Click to enlarge
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-optimized lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-3xl sm:text-4xl hover:text-zinc-300 z-10 w-10 h-10 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          
          <div className="relative w-full max-w-6xl" style={{ aspectRatio: '16/9', maxHeight: '85vh' }}>
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Mobile-optimized navigation buttons */}
          {images.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-4">
              <button
                className="px-3 py-2 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) =>
                    prev === 0 ? images.length - 1 : (prev ?? 0) - 1
                  );
                }}
              >
                ← <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                className="px-3 py-2 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) =>
                    prev === images.length - 1 ? 0 : (prev ?? 0) + 1
                  );
                }}
              >
                <span className="hidden sm:inline">Next</span> →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function ProjectHero({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden
      h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 text-white">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-200 leading-snug">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
