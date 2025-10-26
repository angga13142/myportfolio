"use client";

export default function Loading() {
  return (
    <div className="relative pb-16">
      {/* Navigation skeleton */}
      <nav className="my-16 animate-pulse">
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-16 bg-zinc-800 rounded" />
          ))}
        </div>
      </nav>

      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:pt-24 lg:pt-32">
        {/* Header skeleton */}
        <div className="max-w-2xl mx-auto lg:mx-0 animate-pulse">
          <div className="h-10 bg-zinc-800 rounded w-32 mb-4" />
          <div className="h-4 bg-zinc-800 rounded w-96" />
        </div>

        <div className="w-full h-px bg-zinc-800" />

        {/* Featured blog skeleton */}
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 animate-pulse">
          <div className="h-96 bg-zinc-900 rounded-lg border border-zinc-800" />
          <div className="flex flex-col gap-8">
            <div className="h-44 bg-zinc-900 rounded-lg border border-zinc-800" />
            <div className="h-44 bg-zinc-900 rounded-lg border border-zinc-800" />
          </div>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        {/* Blog grid skeleton */}
        <div className="grid grid-cols-1 gap-4 mx-auto md:grid-cols-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-zinc-900 rounded-lg border border-zinc-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
