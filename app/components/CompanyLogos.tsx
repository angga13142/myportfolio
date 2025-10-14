'use client';
import { Building2, Factory, Mountain } from 'lucide-react';

const companies = [
  {
    name: 'PT. Nadesico Nickel Industry',
    period: '2023 - Present',
    role: 'Heavy Equipment Operator',
    icon: Mountain,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    name: 'PT. Bintang Bumi Sulawesi',
    period: '2021 - 2023',
    role: 'Excavator Operator',
    icon: Factory,
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'PT. LTPM',
    period: '2019 - 2021',
    role: 'Equipment Operator',
    icon: Building2,
    color: 'from-purple-500 to-pink-600'
  }
];

export function CompanyLogos() {
  return (
    <section className="py-12 border-y border-zinc-800">
      <div className="text-center mb-8" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-zinc-400 mb-2">
          Trusted by Leading Companies
        </h3>
        <p className="text-sm text-zinc-500">
          Professional experience across major mining and construction operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((company, index) => {
          const Icon = company.icon;
          return (
            <div
              key={index}
              className="group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative p-6 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-300 hover:scale-105 text-center">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 bg-gradient-to-br ${company.color} rounded-lg opacity-80 group-hover:opacity-100 transition-opacity`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Company Name */}
                  <h4 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors">
                    {company.name}
                  </h4>

                  {/* Period */}
                  <div className="text-sm text-zinc-400 mb-2">
                    {company.period}
                  </div>

                  {/* Role Badge */}
                  <div className={`inline-flex px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${company.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                    {company.role}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional stats */}
      <div className="mt-8 flex justify-center gap-8 flex-wrap" data-aos="fade-up">
        <div className="text-center">
          <div className="text-2xl font-bold text-zinc-100">3</div>
          <div className="text-xs text-zinc-500">Major Companies</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-zinc-100">6+</div>
          <div className="text-xs text-zinc-500">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-zinc-100">100%</div>
          <div className="text-xs text-zinc-500">Professional Record</div>
        </div>
      </div>
    </section>
  );
}
