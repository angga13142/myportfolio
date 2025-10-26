/**
 * Loading skeleton components untuk better perceived performance
 */

export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-zinc-800 rounded-lg" />
      <div className="mt-4 h-4 bg-zinc-800 rounded w-3/4" />
      <div className="mt-2 h-4 bg-zinc-800 rounded w-1/2" />
    </div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-zinc-800 rounded-lg mb-4" />
      <div className="h-6 bg-zinc-800 rounded w-2/3 mb-2" />
      <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
      <div className="h-4 bg-zinc-800 rounded w-4/5" />
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-16 bg-zinc-800 rounded-full" />
        <div className="h-6 w-16 bg-zinc-800 rounded-full" />
      </div>
    </div>
  );
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      {[1, 2, 3, 4].map((i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="h-12 bg-zinc-800 rounded w-3/4 mb-4" />

      {/* Meta */}
      <div className="flex gap-4 mb-8">
        <div className="h-4 w-24 bg-zinc-800 rounded" />
        <div className="h-4 w-32 bg-zinc-800 rounded" />
      </div>

      {/* Content lines */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-4 bg-zinc-800 rounded w-full" />
        ))}
        <div className="h-4 bg-zinc-800 rounded w-2/3" />
      </div>

      {/* Image placeholder */}
      <div className="h-64 bg-zinc-800 rounded-lg my-8" />

      {/* More content */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-zinc-800 rounded w-full" />
        ))}
      </div>
    </div>
  );
}
