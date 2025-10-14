'use client';
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider';

interface BeforeAfterProps {
  title: string;
  description: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeStats?: { label: string; value: string }[];
  afterStats?: { label: string; value: string }[];
}

export function BeforeAfterComparison({
  title,
  description,
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeImage,
  afterImage,
  beforeStats,
  afterStats
}: BeforeAfterProps) {
  // Placeholder gradient images if no real images provided
  const defaultBefore = beforeImage || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23334155"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="32" fill="%23cbd5e1"%3EBefore%3C/text%3E%3C/svg%3E';
  const defaultAfter = afterImage || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%2316a34a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="32" fill="%23dcfce7"%3EAfter%3C/text%3E%3C/svg%3E';

  return (
    <div className="py-8" data-aos="fade-up">
      {/* Title & Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-zinc-100 mb-2">{title}</h3>
        <p className="text-zinc-400">{description}</p>
      </div>

      {/* Comparison Slider */}
      <div className="relative rounded-xl overflow-hidden border border-zinc-800 shadow-2xl mb-6">
        <ReactCompareSlider
          itemOne={
            <div className="relative w-full h-full">
              <ReactCompareSliderImage
                src={defaultBefore}
                alt={beforeLabel}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
                {beforeLabel}
              </div>
            </div>
          }
          itemTwo={
            <div className="relative w-full h-full">
              <ReactCompareSliderImage
                src={defaultAfter}
                alt={afterLabel}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
                {afterLabel}
              </div>
            </div>
          }
          className="h-96"
        />
      </div>

      {/* Stats Comparison */}
      {(beforeStats || afterStats) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Stats */}
          {beforeStats && (
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h4 className="text-lg font-semibold text-zinc-100">{beforeLabel}</h4>
              </div>
              <div className="space-y-3">
                {beforeStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">{stat.label}</span>
                    <span className="text-lg font-bold text-zinc-100">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* After Stats */}
          {afterStats && (
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <h4 className="text-lg font-semibold text-zinc-100">{afterLabel}</h4>
              </div>
              <div className="space-y-3">
                {afterStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">{stat.label}</span>
                    <span className="text-lg font-bold text-green-400">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-xs text-zinc-500">
          💡 Drag the slider left and right to compare
        </p>
      </div>
    </div>
  );
}
