"use client";

import { useEffect, useState } from "react";

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}

export function StatCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const steps = 60;
          const increment = end / steps;
          const stepDuration = duration / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, stepDuration);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, label, hasAnimated]);

  return (
    <div
      id={`stat-${label}`}
      className="flex flex-col items-center p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
    >
      <div className="text-4xl md:text-5xl font-bold text-zinc-100 font-display">
        {prefix}
        {count.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-zinc-400 text-center">{label}</div>
    </div>
  );
}

interface StatsGridProps {
  stats: Array<{
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    label: string;
  }>;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCounter
          key={index}
          end={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
          decimals={stat.decimals}
          label={stat.label}
        />
      ))}
    </div>
  );
}
