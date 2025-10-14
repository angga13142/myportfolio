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
  const [showHelp, setShowHelp] = useState(false);

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
    <>
      <div className="fixed bottom-4 right-4 z-[9999] bg-black/95 text-white px-4 py-3 rounded-lg shadow-xl border border-zinc-700 text-xs font-mono backdrop-blur-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3 mb-1">
            <div className="font-bold text-green-400">🔧 Dev Tools</div>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-zinc-400 hover:text-white text-xs"
              title="Show help"
            >
              {showHelp ? '✕' : '?'}
            </button>
          </div>
          <div>
            <span className="text-zinc-400">Screen:</span> {dimensions.width} × {dimensions.height}
          </div>
          <div>
            <span className="text-zinc-400">Breakpoint:</span> <span className="text-yellow-400">{getBreakpoint()}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-zinc-700 text-zinc-400 text-[10px]">
            Active breakpoint:
            <div className="mt-1 space-y-0.5">
              <div className="block sm:hidden text-red-400">• Mobile (xs)</div>
              <div className="hidden sm:block md:hidden text-blue-400">• Small (sm)</div>
              <div className="hidden md:block lg:hidden text-green-400">• Medium (md)</div>
              <div className="hidden lg:block xl:hidden text-yellow-400">• Large (lg)</div>
              <div className="hidden xl:block 2xl:hidden text-purple-400">• XLarge (xl)</div>
              <div className="hidden 2xl:block text-pink-400">• 2XLarge (2xl)</div>
            </div>
          </div>
          
          {/* Inspect Element shortcut */}
          <div className="mt-2 pt-2 border-t border-zinc-700">
            <button
              onClick={() => {
                // This will work in most browsers
                if (typeof window !== 'undefined' && (window as any).devtools) {
                  (window as any).devtools.open();
                }
              }}
              className="text-cyan-400 hover:text-cyan-300 text-[10px]"
              title="Press F12 or Ctrl+Shift+I"
            >
              ⌘ Press F12 to Inspect
            </button>
          </div>
        </div>
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="fixed bottom-24 right-4 z-[9999] bg-black/95 text-white px-4 py-3 rounded-lg shadow-xl border border-zinc-700 text-xs font-mono backdrop-blur-sm max-w-sm">
          <div className="space-y-2">
            <div className="font-bold text-green-400 mb-2">Inspect Element Shortcuts:</div>
            <div className="space-y-1 text-[10px]">
              <div className="text-zinc-300">
                <span className="text-yellow-400">Chrome/Edge:</span> F12 or Ctrl+Shift+I
              </div>
              <div className="text-zinc-300">
                <span className="text-yellow-400">Firefox:</span> F12 or Ctrl+Shift+I
              </div>
              <div className="text-zinc-300">
                <span className="text-yellow-400">Safari:</span> Cmd+Option+I
              </div>
              <div className="text-zinc-300">
                <span className="text-yellow-400">Right-click:</span> "Inspect Element"
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-700">
              <div className="text-cyan-400 font-bold mb-1">DevTools Tabs:</div>
              <div className="space-y-0.5 text-[10px] text-zinc-400">
                <div>• Elements - HTML/CSS</div>
                <div>• Console - Debug JS</div>
                <div>• Network - Requests</div>
                <div>• Sources - Code</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
