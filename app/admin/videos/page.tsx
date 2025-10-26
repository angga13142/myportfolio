"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VideoData, TestimonialData } from "@/app/lib/content-types";

export default function VideosManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [activeTab, setActiveTab] = useState<"operations" | "testimonials">(
    "operations"
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const token = localStorage.getItem("adminSession");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const authRes = await fetch("/api/admin/auth");
        if (!authRes.ok) {
          router.push("/admin/login");
          return;
        }

        const contentRes = await fetch("/api/admin/content");
        const data = await contentRes.json();
        setVideos(data.operationsVideos || []);
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error("Load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [router]);

  const handleSaveVideos = async () => {
    setSaving(true);
    try {
      const contentRes = await fetch("/api/admin/content");
      const currentData = await contentRes.json();

      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentData,
          operationsVideos: videos,
          testimonials,
        }),
      });

      if (response.ok) {
        alert("✅ Changes saved successfully!");
      } else {
        alert("❌ Failed to save changes");
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("❌ Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  const handleAddVideo = () => {
    const newVideo: VideoData = {
      id: `video-${Date.now()}`,
      title: "New Video",
      youtubeId: "",
      category: "operations",
      duration: "0:00",
      description: "",
    };
    setVideos([...videos, newVideo]);
    setEditingId(newVideo.id);
    setShowAddForm(false);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter((v) => v.id !== id));
    }
  };

  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialData = {
      id: `testimonial-${Date.now()}`,
      name: "New Person",
      role: "Role",
      company: "Company",
      videoUrl: "",
      rating: 5,
      date: new Date().toISOString().split("T")[0],
      text: "",
    };
    setTestimonials([...testimonials, newTestimonial]);
    setEditingId(newTestimonial.id);
    setShowAddForm(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Header */}
      <header className="bg-zinc-800/50 backdrop-blur-sm border-b border-zinc-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="text-zinc-400 hover:text-white transition"
              >
                ← Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Video Management
                </h1>
                <p className="text-sm text-zinc-400">
                  Manage operations videos & testimonials
                </p>
              </div>
            </div>
            <button
              onClick={handleSaveVideos}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white px-6 py-2 rounded-lg transition font-semibold"
            >
              {saving ? "Saving..." : "💾 Save Changes"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("operations")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "operations"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            📹 Operations Videos ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "testimonials"
                ? "bg-green-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            🎬 Video Testimonials ({testimonials.length})
          </button>
        </div>

        {/* Operations Videos Tab */}
        {activeTab === "operations" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-zinc-400">
                💡 Tip: Get YouTube video ID from URL (e.g.,
                youtube.com/watch?v=
                <strong>VIDEO_ID</strong>)
              </p>
              <button
                onClick={handleAddVideo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                ➕ Add Video
              </button>
            </div>

            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) =>
                        setVideos(
                          videos.map((v) =>
                            v.id === video.id
                              ? { ...v, title: e.target.value }
                              : v
                          )
                        )
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      YouTube Video ID
                    </label>
                    <input
                      type="text"
                      value={video.youtubeId}
                      onChange={(e) =>
                        setVideos(
                          videos.map((v) =>
                            v.id === video.id
                              ? { ...v, youtubeId: e.target.value }
                              : v
                          )
                        )
                      }
                      placeholder="e.g., dQw4w9WgXcQ"
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Category
                    </label>
                    <select
                      value={video.category}
                      onChange={(e) =>
                        setVideos(
                          videos.map((v) =>
                            v.id === video.id
                              ? {
                                  ...v,
                                  category: e.target
                                    .value as VideoData["category"],
                                }
                              : v
                          )
                        )
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="operations">Operations</option>
                      <option value="safety">Safety</option>
                      <option value="training">Training</option>
                      <option value="achievement">Achievement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Duration (e.g., 3:45)
                    </label>
                    <input
                      type="text"
                      value={video.duration}
                      onChange={(e) =>
                        setVideos(
                          videos.map((v) =>
                            v.id === video.id
                              ? { ...v, duration: e.target.value }
                              : v
                          )
                        )
                      }
                      placeholder="3:45"
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-zinc-400 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={video.description || ""}
                      onChange={(e) =>
                        setVideos(
                          videos.map((v) =>
                            v.id === video.id
                              ? { ...v, description: e.target.value }
                              : v
                          )
                        )
                      }
                      rows={2}
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-700">
                  <div className="text-sm text-zinc-500">ID: {video.id}</div>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-zinc-400">
                💡 Tip: Upload video files to /public/testimonials/ folder first
              </p>
              <button
                onClick={handleAddTestimonial}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                ➕ Add Testimonial
              </button>
            </div>

            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) =>
                        setTestimonials(
                          testimonials.map((t) =>
                            t.id === testimonial.id
                              ? { ...t, name: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={testimonial.role}
                      onChange={(e) =>
                        setTestimonials(
                          testimonials.map((t) =>
                            t.id === testimonial.id
                              ? { ...t, role: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={testimonial.company}
                      onChange={(e) =>
                        setTestimonials(
                          testimonials.map((t) =>
                            t.id === testimonial.id
                              ? { ...t, company: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Video URL
                    </label>
                    <input
                      type="text"
                      value={testimonial.videoUrl}
                      onChange={(e) =>
                        setTestimonials(
                          testimonials.map((t) =>
                            t.id === testimonial.id
                              ? { ...t, videoUrl: e.target.value }
                              : t
                          )
                        )
                      }
                      placeholder="/testimonials/video.mp4"
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Rating (1-5)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={testimonial.rating}
                      onChange={(e) =>
                        setTestimonials(
                          testimonials.map((t) =>
                            t.id === testimonial.id
                              ? { ...t, rating: parseInt(e.target.value) }
                              : t
                          )
                        )
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={testimonial.date}
                      onChange={(e) =>
                        setTestimonials(
                          testimonials.map((t) =>
                            t.id === testimonial.id
                              ? { ...t, date: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm text-zinc-400 mb-2">
                      Testimonial Text
                    </label>
                    <textarea
                      value={testimonial.text}
                      onChange={(e) =>
                        setTestimonials(
                          testimonials.map((t) =>
                            t.id === testimonial.id
                              ? { ...t, text: e.target.value }
                              : t
                          )
                        )
                      }
                      rows={3}
                      className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-700">
                  <div className="text-sm text-zinc-500">
                    ID: {testimonial.id}
                  </div>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
