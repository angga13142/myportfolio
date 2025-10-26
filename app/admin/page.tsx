"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    videos: 0,
    testimonials: 0,
    images: 0,
  });

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const token = localStorage.getItem("adminSession");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/auth");
        if (!response.ok) {
          localStorage.removeItem("adminSession");
          router.push("/admin/login");
          return;
        }

        // Load stats
        const contentRes = await fetch("/api/admin/content");
        const data = await contentRes.json();
        setStats({
          videos: data.operationsVideos?.length || 0,
          testimonials: data.testimonials?.length || 0,
          images: data.gallery?.length || 0,
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Header */}
      <header className="bg-zinc-800/50 backdrop-blur-sm border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-sm text-zinc-400">Content Management System</p>
            </div>
            <div className="flex gap-4 items-center">
              <Link
                href="/"
                className="text-zinc-400 hover:text-white transition"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Operations Videos</p>
                <p className="text-3xl font-bold text-white">{stats.videos}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Testimonials</p>
                <p className="text-3xl font-bold text-white">
                  {stats.testimonials}
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm mb-1">Gallery Images</p>
                <p className="text-3xl font-bold text-white">{stats.images}</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Videos Management */}
          <Link href="/admin/videos">
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-blue-500 transition cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Manage Videos
              </h3>
              <p className="text-zinc-400 text-sm">
                Upload dan edit operations videos dan video testimonials
              </p>
            </div>
          </Link>

          {/* Photos Management */}
          <Link href="/admin/photos">
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 hover:border-purple-500 transition cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <svg
                  className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Manage Photos
              </h3>
              <p className="text-zinc-400 text-sm">
                Upload dan kelola foto project dan gallery
              </p>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/videos?action=add"
              className="bg-zinc-700/50 hover:bg-zinc-700 border border-zinc-600 rounded-lg p-4 text-center transition"
            >
              <svg
                className="w-8 h-8 text-blue-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-white text-sm font-medium">Add Video</p>
            </Link>

            <Link
              href="/admin/photos?action=upload"
              className="bg-zinc-700/50 hover:bg-zinc-700 border border-zinc-600 rounded-lg p-4 text-center transition"
            >
              <svg
                className="w-8 h-8 text-purple-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-white text-sm font-medium">Upload Photo</p>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="bg-zinc-700/50 hover:bg-zinc-700 border border-zinc-600 rounded-lg p-4 text-center transition"
            >
              <svg
                className="w-8 h-8 text-green-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <p className="text-white text-sm font-medium">Preview Site</p>
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="bg-zinc-700/50 hover:bg-zinc-700 border border-zinc-600 rounded-lg p-4 text-center transition"
            >
              <svg
                className="w-8 h-8 text-yellow-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <p className="text-white text-sm font-medium">Refresh Stats</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
