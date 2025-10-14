"use client";

import { useEffect, useState } from "react";

/**
 * Mobile Debugger Component
 * Shows screen size and breakpoint info during development
 * Only visible in development mode
 */
export function MobileDebugger() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !mounted) {
    return null;
  }

  const getBreakpoint = () => {
    const width = dimensions.width;
    if (width < 640) return 'xs (< 640px)';
    if (width < 768) return 'sm (640px - 768px)';
    if (width < 1024) return 'md (768px - 1024px)';
    if (width < 1280) return 'lg (1024px - 1280px)';
    if (width < 1536) return 'xl (1280px - 1536px)';
    return '2xl (≥ 1536px)';
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 text-white px-4 py-3 rounded-lg shadow-xl border border-zinc-700 text-xs font-mono backdrop-blur-sm">
      <div className="flex flex-col gap-1">
        <div className="font-bold text-green-400 mb-1">🔧 Dev Tools</div>
        <div>
          <span className="text-zinc-400">Screen:</span> {dimensions.width} × {dimensions.height}
        </div>
        <div>
          <span className="text-zinc-400">Breakpoint:</span> <span className="text-yellow-400">{getBreakpoint()}</span>
        </div>
        <div className="mt-2 pt-2 border-t border-zinc-700 text-zinc-400 text-[10px]">
          Tailwind breakpoints:
          <div className="mt-1 space-y-0.5">
            <div className="block sm:hidden text-red-400">• Mobile (xs)</div>
            <div className="hidden sm:block md:hidden text-blue-400">• Small (sm)</div>
            <div className="hidden md:block lg:hidden text-green-400">• Medium (md)</div>
            <div className="hidden lg:block xl:hidden text-yellow-400">• Large (lg)</div>
            <div className="hidden xl:block 2xl:hidden text-purple-400">• XLarge (xl)</div>
            <div className="hidden 2xl:block text-pink-400">• 2XLarge (2xl)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
