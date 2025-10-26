"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GalleryImage } from "@/app/lib/content-types";

export default function PhotosManagement() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        setGallery(data.gallery || []);
      } catch (error) {
        console.error("Load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [router]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folder", "gallery");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const newImage: GalleryImage = {
          id: `image-${Date.now()}`,
          url: data.url,
          alt: selectedFile.name.replace(/\.[^/.]+$/, ""),
          category: "general",
          caption: "",
          order: gallery.length + 1,
        };

        setGallery([...gallery, newImage]);
        setSelectedFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";

        alert("✅ Photo uploaded successfully!");
      } else {
        alert("❌ Failed to upload photo");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("❌ Error uploading photo");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveGallery = async () => {
    setSaving(true);
    try {
      const contentRes = await fetch("/api/admin/content");
      const currentData = await contentRes.json();

      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentData,
          gallery,
        }),
      });

      if (response.ok) {
        alert("✅ Gallery saved successfully!");
      } else {
        alert("❌ Failed to save gallery");
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("❌ Error saving gallery");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setGallery(gallery.filter((img) => img.id !== id));
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
                  Photo Management
                </h1>
                <p className="text-sm text-zinc-400">
                  Upload and manage gallery images
                </p>
              </div>
            </div>
            <button
              onClick={handleSaveGallery}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white px-6 py-2 rounded-lg transition font-semibold"
            >
              {saving ? "Saving..." : "💾 Save Gallery"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            📤 Upload New Photo
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Input */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Select Image File
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full bg-zinc-900/50 border border-zinc-600 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Supported: JPG, PNG, WebP (max 10MB recommended)
              </p>

              {selectedFile && (
                <div className="mt-4">
                  <p className="text-sm text-zinc-400 mb-2">Selected file:</p>
                  <div className="bg-zinc-900/50 rounded-lg p-3 text-sm text-white">
                    <p className="font-semibold">{selectedFile.name}</p>
                    <p className="text-zinc-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white px-6 py-3 rounded-lg transition font-semibold"
                  >
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      "⬆️ Upload Photo"
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Preview
              </label>
              <div className="bg-zinc-900/50 border border-zinc-600 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center text-zinc-500">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
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
                    <p>No image selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            🖼️ Gallery ({gallery.length} images)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((image) => (
            <div
              key={image.id}
              className="bg-zinc-800/50 border border-zinc-700 rounded-xl overflow-hidden"
            >
              {/* Image Preview */}
              <div className="aspect-video bg-zinc-900 relative">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Image Details */}
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) =>
                      setGallery(
                        gallery.map((img) =>
                          img.id === image.id
                            ? { ...img, alt: e.target.value }
                            : img
                        )
                      )
                    }
                    className="w-full bg-zinc-900/50 border border-zinc-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={image.category}
                    onChange={(e) =>
                      setGallery(
                        gallery.map((img) =>
                          img.id === image.id
                            ? { ...img, category: e.target.value }
                            : img
                        )
                      )
                    }
                    placeholder="e.g., operations, safety, equipment"
                    className="w-full bg-zinc-900/50 border border-zinc-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Caption (Optional)
                  </label>
                  <textarea
                    value={image.caption || ""}
                    onChange={(e) =>
                      setGallery(
                        gallery.map((img) =>
                          img.id === image.id
                            ? { ...img, caption: e.target.value }
                            : img
                        )
                      )
                    }
                    rows={2}
                    className="w-full bg-zinc-900/50 border border-zinc-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-zinc-700">
                  <span className="text-xs text-zinc-500">
                    Order: {image.order}
                  </span>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-zinc-600"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              No Images Yet
            </h3>
            <p className="text-zinc-400">
              Upload your first photo to get started
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
