"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
  current?: boolean;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-700 via-zinc-600 to-zinc-800" />

      {/* Timeline Events */}
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-20"
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 top-0 w-5 h-5 rounded-full border-4 border-zinc-900 bg-zinc-400 shadow-lg" />
            
            {/* Current Badge */}
            {event.current && (
              <div className="absolute left-0 top-0">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 animate-ping absolute" />
                  <div className="w-8 h-8 rounded-full bg-emerald-500/50 absolute" />
                </div>
              </div>
            )}

            {/* Content Card */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors">
              {/* Header */}
              <div className="space-y-2 mb-4">
                <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-zinc-400" />
                  {event.title}
                </h3>
                <p className="text-lg text-zinc-300">{event.company}</p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                  {event.current && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-400 mb-4">{event.description}</p>

              {/* Achievements */}
              {event.achievements && event.achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-zinc-300">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {event.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                        <span className="text-zinc-600 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
