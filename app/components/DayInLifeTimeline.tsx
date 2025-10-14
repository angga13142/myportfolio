'use client';
import { Clock, CheckCircle, Wrench, TrendingUp, Users, FileText } from 'lucide-react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const dailySchedule: TimelineEvent[] = [
  {
    time: '05:30',
    title: 'Pre-Shift Preparation',
    description: 'Review daily work orders and safety briefings',
    icon: FileText,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    time: '06:00',
    title: 'P2H Inspection',
    description: 'Comprehensive pre-operation equipment check - fluids, hydraulics, safety systems',
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-600'
  },
  {
    time: '07:00',
    title: 'Morning Operations',
    description: 'Primary excavation and loading operations - material extraction and hauling coordination',
    icon: Wrench,
    color: 'from-yellow-500 to-orange-600'
  },
  {
    time: '12:00',
    title: 'Midday Break & Inspection',
    description: 'Lunch break with mid-shift equipment check and maintenance assessment',
    icon: Clock,
    color: 'from-purple-500 to-pink-600'
  },
  {
    time: '13:00',
    title: 'Afternoon Production',
    description: 'Continued operations with focus on production targets and quality control',
    icon: TrendingUp,
    color: 'from-red-500 to-rose-600'
  },
  {
    time: '16:00',
    title: 'Team Coordination',
    description: 'Coordinate with other operators and supervisors for next shift handover',
    icon: Users,
    color: 'from-indigo-500 to-blue-600'
  },
  {
    time: '17:00',
    title: 'End of Shift Report',
    description: 'Complete daily logs, report any issues, and prepare equipment for next shift',
    icon: FileText,
    color: 'from-zinc-500 to-zinc-600'
  }
];

export function DayInLifeTimeline() {
  return (
    <section className="py-12">
      <div className="mb-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-zinc-100 mb-3">
          A Day in the Life
        </h2>
        <p className="text-zinc-400">
          Typical workday schedule as a professional heavy equipment operator
        </p>
      </div>

      {/* Desktop Timeline - Horizontal */}
      <div className="hidden lg:block relative" data-aos="fade-up">
        {/* Timeline Line */}
        <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
        
        {/* Timeline Events */}
        <div className="relative flex justify-between">
          {dailySchedule.map((event, index) => {
            const Icon = event.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center w-32"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Time Badge */}
                <div className="mb-4 px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-sm font-bold text-zinc-300">
                  {event.time}
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 mb-4">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${event.color} shadow-lg hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h4 className="text-sm font-bold text-zinc-100 mb-2">
                    {event.title}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Timeline - Vertical */}
      <div className="lg:hidden space-y-6">
        {dailySchedule.map((event, index) => {
          const Icon = event.icon;
          return (
            <div
              key={index}
              className="flex gap-4"
              data-aos="fade-right"
              data-aos-delay={index * 50}
            >
              {/* Left: Time & Icon */}
              <div className="flex flex-col items-center">
                <div className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-sm font-bold text-zinc-300 mb-3">
                  {event.time}
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-br ${event.color} shadow-lg flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {index < dailySchedule.length - 1 && (
                  <div className="w-0.5 h-full bg-zinc-800 mt-3" />
                )}
              </div>

              {/* Right: Content */}
              <div className="flex-1 pb-8">
                <h4 className="text-lg font-bold text-zinc-100 mb-2">
                  {event.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" data-aos="fade-up">
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">12hrs</div>
          <div className="text-sm text-zinc-400">Typical Shift</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">2x</div>
          <div className="text-sm text-zinc-400">Daily Inspections</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">100%</div>
          <div className="text-sm text-zinc-400">Safety Compliance</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">24/7</div>
          <div className="text-sm text-zinc-400">Operations Support</div>
        </div>
      </div>
    </section>
  );
}
