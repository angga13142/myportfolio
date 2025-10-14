'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';

interface Project {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  url?: string;
}

interface ProjectFiltersProps {
  projects: Project[];
}

const categoryConfig = {
  'All': { label: 'All Projects', color: 'from-zinc-500 to-zinc-600' },
  'Safety': { label: 'Safety', color: 'from-green-500 to-emerald-600' },
  'Operations': { label: 'Operations', color: 'from-blue-500 to-cyan-600' },
  'Maintenance': { label: 'Maintenance', color: 'from-orange-500 to-amber-600' },
  'Productivity': { label: 'Productivity', color: 'from-purple-500 to-pink-600' },
  'Leadership': { label: 'Leadership', color: 'from-red-500 to-rose-600' },
};

export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All': projects.length };
    projects.forEach(project => {
      const category = project.category || 'Operations';
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => (p.category || 'Operations') === activeFilter);
  }, [projects, activeFilter]);

  // Get available categories
  const availableCategories = ['All', ...Object.keys(categoryConfig).filter(cat => 
    cat !== 'All' && categoryCounts[cat] > 0
  )];

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8" data-aos="fade-up">
        {availableCategories.map((category) => {
          const config = categoryConfig[category as keyof typeof categoryConfig];
          const count = categoryCounts[category] || 0;
          const isActive = activeFilter === category;

          return (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                group relative px-5 py-2.5 rounded-lg font-medium transition-all duration-300
                ${isActive 
                  ? 'text-white scale-105' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:scale-105'
                }
              `}
            >
              {/* Background gradient */}
              <div className={`
                absolute inset-0 rounded-lg transition-opacity duration-300
                bg-gradient-to-r ${config.color}
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
              `} />
              
              {/* Border */}
              <div className={`
                absolute inset-0 rounded-lg border transition-colors duration-300
                ${isActive ? 'border-transparent' : 'border-zinc-700 group-hover:border-zinc-600'}
              `} />
              
              {/* Content */}
              <span className="relative flex items-center gap-2">
                {config.label}
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${isActive 
                    ? 'bg-white/20' 
                    : 'bg-zinc-800 group-hover:bg-zinc-700'
                  }
                `}>
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredProjects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group"
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <article className="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02]">
              {/* Category badge */}
              {project.category && (
                <div className="inline-flex mb-3">
                  <span className={`
                    px-3 py-1 text-xs font-medium text-white rounded-full
                    bg-gradient-to-r ${categoryConfig[project.category as keyof typeof categoryConfig]?.color || categoryConfig.Operations.color}
                  `}>
                    {project.category}
                  </span>
                </div>
              )}

              <h2 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors mb-2">
                {project.title}
              </h2>

              {project.description && (
                <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}

              {project.date && (
                <time className="text-zinc-500 text-xs">
                  {new Date(project.date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}

              {/* View arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-5 h-5 text-zinc-400" />
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12" data-aos="fade-up">
          <p className="text-zinc-500">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
