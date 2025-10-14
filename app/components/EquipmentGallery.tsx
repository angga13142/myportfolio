'use client';
import { Wrench, Gauge, Shield, TrendingUp, Users, Award } from 'lucide-react';

interface Equipment {
  name: string;
  model: string;
  experience: string;
  icon: any;
  color: string;
  specialization: string[];
}

const equipmentList: Equipment[] = [
  {
    name: 'Excavator',
    model: 'Komatsu PC200',
    experience: '6+ years',
    icon: Wrench,
    color: 'from-blue-500 to-cyan-600',
    specialization: ['Material Loading', 'Excavation', 'Land Clearing']
  },
  {
    name: 'Wheel Loader',
    model: 'CAT 950',
    experience: '3+ years',
    icon: Gauge,
    color: 'from-yellow-500 to-orange-600',
    specialization: ['Material Hauling', 'Stockpile Management']
  },
  {
    name: 'Dump Truck',
    model: 'Hino 500',
    experience: '4+ years',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    specialization: ['Heavy Hauling', 'Material Transport']
  },
  {
    name: 'Bulldozer',
    model: 'Komatsu D85',
    experience: '2+ years',
    icon: Shield,
    color: 'from-red-500 to-rose-600',
    specialization: ['Land Grading', 'Road Building']
  },
  {
    name: 'Backhoe Loader',
    model: 'JCB 3CX',
    experience: '3+ years',
    icon: Users,
    color: 'from-purple-500 to-pink-600',
    specialization: ['Trenching', 'Multi-purpose Operations']
  },
  {
    name: 'Grader',
    model: 'CAT 140M',
    experience: '2+ years',
    icon: Award,
    color: 'from-indigo-500 to-blue-600',
    specialization: ['Road Maintenance', 'Surface Leveling']
  }
];

export function EquipmentGallery() {
  return (
    <section className="py-12">
      <div className="mb-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-zinc-100 mb-3">
          Equipment Expertise
        </h2>
        <p className="text-zinc-400">
          Certified and experienced in operating various heavy equipment across mining and construction sites
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentList.map((equipment, index) => {
          const Icon = equipment.icon;
          return (
            <div
              key={equipment.name}
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 hover:scale-105">
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${equipment.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`inline-flex p-4 mb-4 bg-gradient-to-br ${equipment.color} rounded-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Equipment Name */}
                  <h3 className="text-xl font-bold text-zinc-100 mb-2">
                    {equipment.name}
                  </h3>

                  {/* Model */}
                  <div className="text-sm text-zinc-400 mb-3">
                    Model: <span className="text-zinc-300">{equipment.model}</span>
                  </div>

                  {/* Experience Badge */}
                  <div className={`inline-flex px-3 py-1 mb-4 text-xs font-medium text-white rounded-full bg-gradient-to-r ${equipment.color}`}>
                    {equipment.experience} experience
                  </div>

                  {/* Specializations */}
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-zinc-500 mb-2">Specializations:</div>
                    {equipment.specialization.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${equipment.color}`} />
                        <span className="text-sm text-zinc-400">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${equipment.color} animate-pulse`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" data-aos="fade-up">
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">6+</div>
          <div className="text-sm text-zinc-400">Equipment Types</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">20+</div>
          <div className="text-sm text-zinc-400">Years Combined</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">100%</div>
          <div className="text-sm text-zinc-400">Safety Certified</div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
          <div className="text-3xl font-bold text-zinc-100 mb-1">3</div>
          <div className="text-sm text-zinc-400">Major Companies</div>
        </div>
      </div>
    </section>
  );
}
