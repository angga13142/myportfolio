"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  category?: string;
  delay?: number;
}

export function SkillBar({ name, level, category, delay = 0 }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-sm font-medium text-zinc-100">{name}</span>
          {category && (
            <span className="ml-2 text-xs text-zinc-500">({category})</span>
          )}
        </div>
        <span className="text-sm text-zinc-400">{level}%</span>
      </div>
      
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-zinc-400 to-zinc-100 rounded-full"
        />
      </div>
    </div>
  );
}

interface SkillCategory {
  name: string;
  skills: Array<{ name: string; level: number }>;
}

interface SkillsVisualizationProps {
  categories: SkillCategory[];
}

export function SkillsVisualization({ categories }: SkillsVisualizationProps) {
  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <div key={category.name} className="space-y-4">
          <h3 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-2">
            {category.name}
          </h3>
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={categoryIndex * 0.1 + skillIndex * 0.05}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
