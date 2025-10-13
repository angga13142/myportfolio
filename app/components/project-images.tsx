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
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                Click to enlarge
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-zinc-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <button
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) =>
                    prev === 0 ? images.length - 1 : (prev ?? 0) - 1
                  );
                }}
              >
                ← Previous
              </button>
              <button
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) =>
                    prev === images.length - 1 ? 0 : (prev ?? 0) + 1
                  );
                }}
              >
                Next →
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
    <div className="relative w-full h-64 md:h-96 lg:h-[500px] -mx-4 md:mx-0 md:rounded-lg overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-zinc-200">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
