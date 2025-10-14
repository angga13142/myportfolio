"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  image?: string;
  relationship: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Testimonial Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 md:p-12 relative">
        {/* Quote Icon */}
        <Quote className="absolute top-6 left-6 w-12 h-12 text-zinc-700" />

        {/* Rating */}
        {current.rating && (
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < current.rating!
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-zinc-700"
                }`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <blockquote className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6 relative z-10">
          "{current.content}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {current.image && (
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-semibold text-lg">
              {current.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}
          <div>
            <div className="font-semibold text-zinc-100">{current.name}</div>
            <div className="text-sm text-zinc-400">{current.role}</div>
            <div className="text-sm text-zinc-500">{current.company}</div>
            <div className="text-xs text-zinc-600 mt-1">{current.relationship}</div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-zinc-100 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-zinc-100 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-zinc-400 w-8"
                  : "bg-zinc-700 hover:bg-zinc-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Testimonials Grid (Alternative Layout)
export function TestimonialsGrid({ testimonials }: TestimonialsCarouselProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
        >
          {/* Rating */}
          {testimonial.rating && (
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating!
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-zinc-700"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Content */}
          <blockquote className="text-sm text-zinc-300 leading-relaxed mb-4">
            "{testimonial.content}"
          </blockquote>

          {/* Author */}
          <div className="border-t border-zinc-800 pt-4">
            <div className="font-semibold text-zinc-100 text-sm">
              {testimonial.name}
            </div>
            <div className="text-xs text-zinc-400">{testimonial.role}</div>
            <div className="text-xs text-zinc-500">{testimonial.company}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
