"use client";
import { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Users,
  X,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  period: string;
  current?: boolean;
  description: string;
  achievements: string[];
  skills: string[];
  images?: string[];
  teamSize?: string;
  projectCount?: number;
  metrics?: {
    label: string;
    value: string;
    icon: any;
  }[];
}

const careerTimeline: TimelineEvent[] = [
  {
    id: "4",
    year: "2023",
    title: "Excavator Operator",
    company: "PT. Nadesico Nickel Industry",
    companyLogo: "/company-logos/nadesico.png",
    location: "Indonesia",
    period: "2023 - Present",
    current: true,
    teamSize: "15+ operators",
    projectCount: 8,
    description:
      "Operating excavator for nickel mining operations with focus on safety, efficiency, and team coordination. Leading daily P2H inspections and maintaining perfect safety record.",
    achievements: [
      "Maintained 95% operational efficiency throughout tenure",
      "Zero accident record - 600+ days without incident",
      "Daily production of 800-1,000 BCM consistently",
      "Led P2H inspection implementation with 98% completion rate",
      "Mentored 5+ junior operators on safety protocols",
      "Reduced equipment downtime by 23% through proactive maintenance",
    ],
    skills: [
      "Excavator Operation",
      "Safety Management",
      "Team Leadership",
      "P2H Inspection",
    ],
    images: ["/projects/nickel-mining-1.jpg", "/projects/nickel-mining-2.jpg"],
    metrics: [
      { label: "Efficiency", value: "95%", icon: TrendingUp },
      { label: "Production", value: "850 BCM/day", icon: Briefcase },
      { label: "Safety", value: "0 Accidents", icon: Award },
      { label: "Team Size", value: "15+", icon: Users },
    ],
  },
  {
    id: "3",
    year: "2023",
    title: "Excavator Operator",
    company: "PT. LTPM Makassar",
    location: "Makassar, Indonesia",
    period: "2023",
    description:
      "Excavation and material handling operations with emphasis on equipment maintenance and safety protocols. Developed strong troubleshooting skills and preventive maintenance expertise.",
    achievements: [
      "Completed excavation projects ahead of schedule",
      "Maintained equipment with 96% uptime rate",
      "Implemented daily maintenance checklist system",
      "Reduced fuel consumption by 15% through technique optimization",
      "Received recognition for outstanding safety compliance",
    ],
    skills: [
      "Equipment Maintenance",
      "Troubleshooting",
      "Safety Protocols",
      "Material Handling",
    ],
    images: ["/projects/excavator-operation-1.jpg"],
    metrics: [
      { label: "Uptime", value: "96%", icon: TrendingUp },
      { label: "Fuel Savings", value: "15%", icon: Award },
    ],
  },
  {
    id: "2",
    year: "2021",
    title: "Excavator Operator",
    company: "PT. Bintang Bumi Sulawesi",
    location: "Sulawesi, Indonesia",
    period: "2021 - 2022",
    description:
      "Loading and material transfer operations with focus on efficiency and equipment care. Built foundation for career through hands-on experience and continuous learning.",
    achievements: [
      "Mastered excavator operations within 3 months",
      "Consistently met daily production targets",
      "Maintained pristine equipment condition",
      "Completed safety training certifications",
      "Developed strong team collaboration skills",
    ],
    skills: [
      "Basic Operation",
      "Equipment Care",
      "Safety Awareness",
      "Team Coordination",
    ],
    images: ["/projects/equipment-maintenance-1.jpg"],
    metrics: [
      { label: "Learning Curve", value: "3 months", icon: TrendingUp },
      { label: "Target Achievement", value: "100%", icon: Award },
    ],
  },
  {
    id: "1",
    year: "2020",
    title: "Training & Certification",
    company: "LPTM Training Center",
    location: "Indonesia",
    period: "2020",
    description:
      "Comprehensive heavy equipment operation training covering excavator fundamentals, safety protocols, maintenance procedures, and industry best practices.",
    achievements: [
      "Completed 200+ hours of practical training",
      "Obtained SIO Excavator Certificate",
      "Passed DISNAKER safety certification",
      "Top 10% in technical assessments",
      "Received instructor commendation for dedication",
    ],
    skills: ["Equipment Fundamentals", "Safety Standards", "Basic Maintenance"],
    images: ["/certificates/SERTIFIKAT LPTM Yat Kompres.pdf"],
    metrics: [
      { label: "Training Hours", value: "200+", icon: Award },
      { label: "Certifications", value: "4", icon: Award },
    ],
  },
];

function TimelineModal({
  event,
  onClose,
}: {
  event: TimelineEvent;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 glass-strong border-b border-zinc-700/50 p-6 flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-2">
              {event.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {event.company}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {event.period}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-zinc-300 leading-relaxed">{event.description}</p>
          </div>

          {/* Metrics */}
          {event.metrics && event.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.metrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div key={i} className="bg-zinc-800/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-zinc-500">
                        {metric.label}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-green-400">
                      {metric.value}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Achievements */}
          <div>
            <h4 className="text-lg font-semibold text-zinc-100 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {event.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-300">
                  <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-lg font-semibold text-zinc-100 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              Skills Developed
            </h4>
            <div className="flex flex-wrap gap-2">
              {event.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          {event.images && event.images.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-zinc-100 mb-3">
                Gallery
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {event.images.map((image, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-lg overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`${event.title} - Image ${i + 1}`}
                      fill
                      className="object-cover hover-scale"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function InteractiveCareerTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          Career Journey
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Interactive timeline showcasing professional growth and achievements
          from training to current role
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-green-500/50 to-transparent" />

        {/* Timeline Events */}
        <div className="space-y-8">
          {careerTimeline.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-8`}
              >
                {/* Year Badge */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                      event.current
                        ? "from-green-500 to-emerald-500 ring-4 ring-green-500/20"
                        : "from-zinc-700 to-zinc-800"
                    } flex items-center justify-center font-bold text-white shadow-xl`}
                  >
                    {event.year}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-4rem)] ml-20 md:ml-0 ${
                    isLeft ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className="glass p-6 rounded-xl cursor-pointer hover-lift group"
                    onClick={() => setSelectedEvent(event)}
                  >
                    {/* Current Badge */}
                    {event.current && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs mb-3">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Current Position
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-green-400 transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-1 text-sm text-zinc-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {event.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.period}
                      </div>
                    </div>

                    <p className="text-zinc-300 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Quick Stats */}
                    {event.metrics && event.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.metrics.slice(0, 2).map((metric, i) => (
                          <div
                            key={i}
                            className="px-3 py-1 bg-zinc-800/50 rounded-lg text-xs"
                          >
                            <span className="text-zinc-500">
                              {metric.label}:{" "}
                            </span>
                            <span className="text-green-400 font-semibold">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button className="text-sm text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1 group/btn">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">6+</div>
          <div className="text-sm text-zinc-400 mt-1">Years Experience</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">3</div>
          <div className="text-sm text-zinc-400 mt-1">Companies</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">15+</div>
          <div className="text-sm text-zinc-400 mt-1">Major Projects</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">0</div>
          <div className="text-sm text-zinc-400 mt-1">Safety Incidents</div>
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <TimelineModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
