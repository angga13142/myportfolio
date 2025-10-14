export default function ProjectsLoading() {
  return (
    <div className="relative pb-16">
      {/* Navigation skeleton */}
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="h-12 bg-zinc-800 rounded-lg animate-pulse w-64"></div>
          <div className="mt-4 h-6 bg-zinc-800 rounded-lg animate-pulse w-96"></div>
        </div>
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="grid grid-cols-1 gap-4">
              <div className="relative aspect-video bg-zinc-800 rounded-lg animate-pulse"></div>
              <div className="h-8 bg-zinc-800 rounded-lg animate-pulse w-3/4"></div>
              <div className="h-4 bg-zinc-800 rounded-lg animate-pulse w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
