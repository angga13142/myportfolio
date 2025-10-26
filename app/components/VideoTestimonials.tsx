"use client";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Quote,
  Download,
  Share2,
} from "lucide-react";

interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  videoUrl: string;
  thumbnail: string;
  quote: string;
  duration: string;
  date?: string;
  rating?: number;
}

const testimonials: VideoTestimonial[] = [
  {
    id: "1",
    name: "Ahmad Susanto",
    role: "Site Supervisor",
    company: "PT. Nadesico Nickel Industry",
    videoUrl: "/testimonials/ahmad-testimonial.mp4",
    thumbnail: "/testimonials/ahmad-thumb.jpg",
    quote:
      "Muhammad is one of our most reliable operators with exceptional safety record.",
    duration: "1:24",
    date: "October 2024",
    rating: 5,
  },
  {
    id: "2",
    name: "Budi Hartono",
    role: "Operations Manager",
    company: "PT. LTPM Makassar",
    videoUrl: "/testimonials/budi-testimonial.mp4",
    thumbnail: "/testimonials/budi-thumb.jpg",
    quote:
      "His technical skills and problem-solving abilities are outstanding.",
    duration: "1:42",
    date: "September 2024",
    rating: 5,
  },
  {
    id: "3",
    name: "Rizki Firmansyah",
    role: "Maintenance Coordinator",
    company: "PT. Bintang Bumi Sulawesi",
    videoUrl: "/testimonials/rizki-testimonial.mp4",
    thumbnail: "/testimonials/rizki-thumb.jpg",
    quote: "Best equipment condition among all operators - truly professional.",
    duration: "1:18",
    date: "August 2024",
    rating: 5,
  },
];

function VideoPlayer({
  testimonial,
  isActive,
}: {
  testimonial: VideoTestimonial;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setIsLoading(true);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(percent);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={testimonial.thumbnail}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onCanPlay={handleCanPlay}
        muted={isMuted}
        playsInline
      >
        <source src={testimonial.videoUrl} type="video/mp4" />
        Your browser does not support video playback.
      </video>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Play/Pause Overlay */}
      {!isPlaying && !isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity hover:bg-black/40"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 bg-green-500/90 rounded-full flex items-center justify-center hover-scale">
            <Play className="w-10 h-10 text-white ml-1" />
          </div>
        </div>
      )}

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div
          className="h-1 bg-zinc-700 rounded-full mb-3 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
            <span className="text-white text-sm ml-2">
              {testimonial.duration}
            </span>
          </div>
          <button
            onClick={handleFullscreen}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          Video Testimonials
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Hear directly from supervisors and colleagues about work quality and
          professionalism
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="glass p-4 rounded-xl space-y-4"
            onClick={() => setActiveVideo(testimonial.id)}
          >
            {/* Video Player */}
            <VideoPlayer
              testimonial={testimonial}
              isActive={activeVideo === testimonial.id}
            />

            {/* Testimonial Info */}
            <div className="space-y-3">
              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-green-500/20" />
                <p className="text-zinc-300 italic pl-6">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-zinc-100">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {testimonial.company}
                  </div>
                </div>
                <div className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">
                  {testimonial.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback Message (jika video belum tersedia) */}
      <div className="glass p-6 rounded-xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Video testimonials coming soon - currently recording with
            supervisors
          </span>
        </div>
        <p className="text-zinc-400 text-sm mt-3">
          In the meantime, you can read written testimonials in the resume
          section
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">
            {testimonials.length}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Video Testimonials</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">3</div>
          <div className="text-sm text-zinc-400 mt-1">Companies</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">5.0</div>
          <div className="text-sm text-zinc-400 mt-1">Average Rating</div>
        </div>
      </div>
    </div>
  );
}
