"use client";
import { useState } from "react";
import {
  Shield,
  Wrench,
  TrendingUp,
  Users,
  CheckCircle2,
  Target,
} from "lucide-react";

const skillCategories = [
  {
    name: "Excavator Operation",
    value: 95,
    icon: Target,
    color: "from-green-500 to-emerald-500",
    certifications: ["Komatsu PC200", "Hitachi EX200", "Cat 320"],
  },
  {
    name: "Safety Management",
    value: 98,
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    certifications: ["K3 Certified", "P2H Inspector", "First Aid"],
  },
  {
    name: "Equipment Maintenance",
    value: 90,
    icon: Wrench,
    color: "from-purple-500 to-pink-500",
    certifications: ["Preventive Maintenance", "Troubleshooting"],
  },
  {
    name: "Team Leadership",
    value: 85,
    icon: Users,
    color: "from-orange-500 to-red-500",
    certifications: ["Crew Supervisor", "15+ Team Members"],
  },
  {
    name: "P2H Inspection",
    value: 95,
    icon: CheckCircle2,
    color: "from-teal-500 to-green-500",
    certifications: ["Daily Inspection", "98% Completion Rate"],
  },
  {
    name: "Productivity Optimization",
    value: 92,
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    certifications: ["23% Improvement", "Efficiency Expert"],
  },
];

export function SkillsMatrix() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const industryAverage = 70; // Industry average benchmark

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          Skills Proficiency
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Data-driven assessment of technical capabilities compared to industry
          standards
        </p>
      </div>

      {/* Radar Chart Visualization (SVG-based for lightweight) */}
      <div className="glass p-8 rounded-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Visual Radar Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Background Circles */}
              <svg className="w-full h-full" viewBox="0 0 400 400">
                {/* Grid circles */}
                {[20, 40, 60, 80, 100].map((percent) => (
                  <circle
                    key={percent}
                    cx="200"
                    cy="200"
                    r={percent * 1.6}
                    fill="none"
                    stroke="#3f3f46"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                ))}

                {/* Axes */}
                {skillCategories.map((_, index) => {
                  const angle =
                    (index * 2 * Math.PI) / skillCategories.length -
                    Math.PI / 2;
                  const x2 = 200 + Math.cos(angle) * 160;
                  const y2 = 200 + Math.sin(angle) * 160;
                  return (
                    <line
                      key={index}
                      x1="200"
                      y1="200"
                      x2={x2}
                      y2={y2}
                      stroke="#3f3f46"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  );
                })}

                {/* Industry Average Polygon */}
                <polygon
                  points={skillCategories
                    .map((_, index) => {
                      const angle =
                        (index * 2 * Math.PI) / skillCategories.length -
                        Math.PI / 2;
                      const r = (industryAverage / 100) * 160;
                      const x = 200 + Math.cos(angle) * r;
                      const y = 200 + Math.sin(angle) * r;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="rgba(156, 163, 175, 0.1)"
                  stroke="rgb(156, 163, 175)"
                  strokeWidth="2"
                />

                {/* User Skills Polygon */}
                <polygon
                  points={skillCategories
                    .map((skill, index) => {
                      const angle =
                        (index * 2 * Math.PI) / skillCategories.length -
                        Math.PI / 2;
                      const r = (skill.value / 100) * 160;
                      const x = 200 + Math.cos(angle) * r;
                      const y = 200 + Math.sin(angle) * r;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="rgba(34, 197, 94, 0.2)"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="3"
                  className="transition-all duration-500"
                />

                {/* Data Points */}
                {skillCategories.map((skill, index) => {
                  const angle =
                    (index * 2 * Math.PI) / skillCategories.length -
                    Math.PI / 2;
                  const r = (skill.value / 100) * 160;
                  const x = 200 + Math.cos(angle) * r;
                  const y = 200 + Math.sin(angle) * r;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="rgb(34, 197, 94)"
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-8 transition-all"
                      onMouseEnter={() => setSelectedSkill(index)}
                      onMouseLeave={() => setSelectedSkill(null)}
                    />
                  );
                })}

                {/* Labels */}
                {skillCategories.map((skill, index) => {
                  const angle =
                    (index * 2 * Math.PI) / skillCategories.length -
                    Math.PI / 2;
                  const labelR = 180;
                  const x = 200 + Math.cos(angle) * labelR;
                  const y = 200 + Math.sin(angle) * labelR;
                  return (
                    <text
                      key={index}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-zinc-400 text-xs font-medium"
                    >
                      {skill.name.split(" ")[0]}
                    </text>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-zinc-400">My Skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-400" />
                  <span className="text-zinc-400">
                    Industry Avg ({industryAverage}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Breakdown */}
          <div className="space-y-4">
            {skillCategories.map((skill, i) => {
              const Icon = skill.icon;
              const isSelected = selectedSkill === i;

              return (
                <div
                  key={i}
                  className={`p-4 rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? "bg-zinc-800/80 ring-2 ring-green-500/50"
                      : "bg-zinc-800/30 hover:bg-zinc-800/50"
                  }`}
                  onMouseEnter={() => setSelectedSkill(i)}
                  onMouseLeave={() => setSelectedSkill(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${skill.color}`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-zinc-300">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-green-400">
                      {skill.value}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-zinc-900 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>

                  {/* Certifications */}
                  {isSelected && (
                    <div className="mt-3 flex flex-wrap gap-2 animate-fade-in">
                      {skill.certifications.map((cert, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-1 bg-zinc-900 text-zinc-400 rounded-md"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">
            {Math.round(
              skillCategories.reduce((acc, skill) => acc + skill.value, 0) /
                skillCategories.length
            )}
            %
          </div>
          <div className="text-sm text-zinc-400 mt-1">Average Proficiency</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">
            +
            {Math.round(
              skillCategories.reduce((acc, skill) => acc + skill.value, 0) /
                skillCategories.length -
                industryAverage
            )}
            %
          </div>
          <div className="text-sm text-zinc-400 mt-1">Above Industry</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">
            {skillCategories.filter((s) => s.value >= 90).length}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Expert Level Skills</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">6+</div>
          <div className="text-sm text-zinc-400 mt-1">Years Experience</div>
        </div>
      </div>
    </div>
  );
}
