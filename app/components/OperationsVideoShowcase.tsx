"use client";

import { Play, Video, Award, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import contentData from "@/data/content.json";

interface VideoItem {
  id: string;
  title: string;
  description?: string;
  youtubeId: string; // YouTube video ID for embedding
  thumbnail?: string;
  category: "operations" | "safety" | "training" | "achievement";
  duration?: string;
}

// Load videos from content.json (managed via admin panel)
const sampleVideos: VideoItem[] =
  (contentData.operationsVideos as VideoItem[]) || [
    {
      id: "excavator-operations",
      title: "Excavator Operations Excellence",
      description:
        "Professional excavator operations demonstrating precision digging and material handling techniques in nickel mining site.",
      youtubeId: "dQw4w9WgXcQ", // Fallback - manage via /admin/videos
      category: "operations",
      duration: "3:45",
    },
    {
      id: "safety-protocols",
      title: "P2H Safety Check Demonstration",
      description:
        "Complete P2H (Pre-Operation Check) safety inspection procedure following K3 standards.",
      youtubeId: "dQw4w9WgXcQ", // Fallback - manage via /admin/videos
      category: "safety",
      duration: "5:20",
    },
    {
      id: "productivity",
      title: "High-Efficiency Material Loading",
      description:
        "Advanced loading techniques achieving 800+ BCM daily production with optimized fuel efficiency.",
      youtubeId: "dQw4w9WgXcQ", // Fallback - manage via /admin/videos
      category: "achievement",
      duration: "4:15",
    },
    {
      id: "training",
      title: "Junior Operator Training Session",
      description:
        "Hands-on training demonstration for new operators covering basic controls and safety procedures.",
      youtubeId: "dQw4w9WgXcQ", // Fallback - manage via /admin/videos
      category: "training",
      duration: "6:30",
    },
  ];

const categoryIcons = {
  operations: Video,
  safety: Shield,
  training: Play,
  achievement: Award,
};

const categoryColors = {
  operations: "text-blue-400 bg-blue-500/20",
  safety: "text-green-400 bg-green-500/20",
  training: "text-purple-400 bg-purple-500/20",
  achievement: "text-amber-400 bg-amber-500/20",
};

export default function OperationsVideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          Operations in Action
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Watch professional heavy equipment operations, safety procedures, and
          training demonstrations
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleVideos.map((video) => {
          const Icon = categoryIcons[video.category];
          const colorClass = categoryColors[video.category];

          return (
            <div
              key={video.id}
              className="glass rounded-xl overflow-hidden hover-lift cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-white font-medium">
                    {video.duration}
                  </div>
                )}

                {/* Category Badge */}
                <div
                  className={`absolute top-3 left-3 px-3 py-1 rounded-lg backdrop-blur-md ${colorClass} flex items-center gap-2`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-semibold capitalize">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-zinc-100 mb-2 group-hover:text-green-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Info */}
            <div className="glass mt-4 p-6 rounded-xl">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = categoryIcons[selectedVideo.category];
                    const colorClass = categoryColors[selectedVideo.category];
                    return (
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-sm text-zinc-500 capitalize">
                      {selectedVideo.category} • {selectedVideo.duration}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-zinc-300">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Info Notice */}
      <div className="glass p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
        <div className="flex items-start gap-3">
          <Video className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-amber-200 font-medium mb-1">
              Video Placeholder Notice
            </p>
            <p className="text-amber-100/70">
              The videos above are currently using placeholder YouTube IDs.
              Replace them with your actual excavator operations, safety
              demonstrations, and training videos to showcase your professional
              work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
