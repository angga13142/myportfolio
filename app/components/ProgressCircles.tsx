'use client';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Metric {
  label: string;
  value: number;
  color: string;
  suffix?: string;
}

const metrics: Metric[] = [
  {
    label: 'Operational Efficiency',
    value: 95,
    color: '#3b82f6', // blue-500
    suffix: '%'
  },
  {
    label: 'Equipment Uptime',
    value: 96,
    color: '#10b981', // green-500
    suffix: '%'
  },
  {
    label: 'Safety Compliance',
    value: 100,
    color: '#22c55e', // green-600
    suffix: '%'
  },
  {
    label: 'Team Coordination',
    value: 98,
    color: '#8b5cf6', // purple-500
    suffix: '%'
  }
];

export function ProgressCircles() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        setAnimatedValues(metrics.map(m => m.value));
        setHasAnimated(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  return (
    <section className="py-12">
      <div className="mb-8 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-zinc-100 mb-3">
          Performance Metrics
        </h2>
        <p className="text-zinc-400">
          Consistently exceeding industry standards across all key performance indicators
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            {/* Circular Progress */}
            <div className="w-32 h-32 mb-4">
              <CircularProgressbar
                value={animatedValues[index]}
                text={`${metric.value}${metric.suffix || ''}`}
                styles={buildStyles({
                  pathColor: metric.color,
                  textColor: '#f4f4f5', // zinc-100
                  trailColor: '#27272a', // zinc-800
                  pathTransitionDuration: 2,
                  textSize: '20px',
                })}
              />
            </div>

            {/* Label */}
            <h4 className="text-sm font-semibold text-zinc-100 text-center">
              {metric.label}
            </h4>
          </div>
        ))}
      </div>

      {/* Additional Context */}
      <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-zinc-100 mb-2">Measurement Period</h4>
            <p className="text-zinc-400">Based on 6+ years of documented performance across 3 major companies</p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-100 mb-2">Industry Comparison</h4>
            <p className="text-zinc-400">All metrics exceed mining industry averages by 10-15%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
