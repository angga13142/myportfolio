'use client';
import { Shield, Zap, TrendingUp, Award, Users, Target } from 'lucide-react';

const achievements = [
  {
    icon: Shield,
    value: '0',
    label: 'Major Accidents',
    description: 'Perfect safety record',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Zap,
    value: '95%',
    label: 'Efficiency',
    description: 'Above industry standard',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: TrendingUp,
    value: '23%',
    label: 'Productivity Boost',
    description: 'Documented improvement',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Award,
    value: '4',
    label: 'Certifications',
    description: 'Professional credentials',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Users,
    value: '15+',
    label: 'Team Members',
    description: 'Led successfully',
    color: 'from-red-500 to-rose-600'
  },
  {
    icon: Target,
    value: '6+',
    label: 'Years Experience',
    description: 'Heavy equipment operation',
    color: 'from-indigo-500 to-blue-600'
  }
];

export function AchievementBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-12">
      {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return (
          <div
            key={index}
            className="group relative"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="relative p-6 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl hover:border-zinc-600 transition-all duration-300 hover:scale-105">
              {/* Gradient accent */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`inline-flex p-3 mb-3 bg-gradient-to-br ${achievement.color} rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Value */}
              <div className="text-3xl font-bold text-zinc-100 mb-1">
                {achievement.value}
              </div>
              
              {/* Label */}
              <div className="text-sm font-medium text-zinc-400 mb-1">
                {achievement.label}
              </div>
              
              {/* Description */}
              <div className="text-xs text-zinc-500">
                {achievement.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
