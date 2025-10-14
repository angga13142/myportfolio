export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-zinc-800 border-t-zinc-400 rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <p className="mt-4 text-sm text-zinc-500 text-center animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
