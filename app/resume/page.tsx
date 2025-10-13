"use client";
import { Navigation } from "../components/nav";

export default function ResumePage() {
  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container min-h-screen px-4 mx-auto mt-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-zinc-100 mb-4">Muhammad Nurhidayat Gani</h1>
            <p className="text-xl text-zinc-400 mb-6">Professional Heavy Equipment Operator</p>
            <div className="flex justify-center gap-6 text-zinc-500">
              <span>📧 mnhidayatgani@gmail.com</span>
              <span>📞 +62 853-4590-2520</span>
            </div>
          </div>

          {/* About */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">About Me</h2>
            <p className="text-zinc-400 leading-relaxed">
              A competent and certified Excavator Heavy Equipment Operator with experience in excavation, loading, and material transfer operations across various projects. Possesses a thorough understanding of occupational safety (K3) standards, routine equipment maintenance (P2H), and technical troubleshooting skills in the field.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">Experience</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-zinc-700 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">Excavator Operator</h3>
                    <p className="text-zinc-400">PT. Nadesico Nickel Industry</p>
                  </div>
                  <span className="text-zinc-500">2023 - Present</span>
                </div>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Operating excavator for nickel mining operations</li>
                  <li>Conducting daily equipment checks (P2H)</li>
                  <li>Ensuring compliance with safety standards (K3)</li>
                  <li>Coordinating with team members for efficient operations</li>
                </ul>
              </div>

              <div className="border-l-2 border-zinc-700 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">Excavator Operator</h3>
                    <p className="text-zinc-400">PT. LTPM Makassar</p>
                  </div>
                  <span className="text-zinc-500">2023</span>
                </div>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Excavation and material handling operations</li>
                  <li>Routine equipment maintenance and troubleshooting</li>
                  <li>Safety protocol implementation</li>
                </ul>
              </div>

              <div className="border-l-2 border-zinc-700 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">Excavator Operator</h3>
                    <p className="text-zinc-400">PT. Bintang Bumi Sulawesi</p>
                  </div>
                  <span className="text-zinc-500">2021 - 2022</span>
                </div>
                <ul className="list-disc list-inside text-zinc-400 space-y-1">
                  <li>Loading and material transfer operations</li>
                  <li>Daily checkup care and maintenance</li>
                  <li>Team coordination and communication</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">Technical Skills</h2>
            <div className="space-y-4">
              {[
                { skill: "Operating an Excavator", level: 90 },
                { skill: "Operating a Wheel Loader", level: 65 },
                { skill: "Basic Excavator Engine Maintenance", level: 75 },
                { skill: "Daily Checkup Care (P2H)", level: 90 },
                { skill: "Occupational Safety and Health (K3)", level: 90 },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-2">
                    <span className="text-zinc-300">{item.skill}</span>
                    <span className="text-zinc-500">{item.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-zinc-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interpersonal Skills */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">Interpersonal Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { skill: "Effective Communication & Team Coordination", level: 95 },
                { skill: "Time Management", level: 80 },
                { skill: "Adaptability", level: 70 },
                { skill: "Problem Solving", level: 70 },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-2">
                    <span className="text-zinc-300">{item.skill}</span>
                    <span className="text-zinc-500">{item.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div
                      className="bg-zinc-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">Training & Certifications</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <h3 className="text-zinc-300 font-semibold">SIO Excavator (Non-Class)</h3>
                  <p className="text-zinc-500">2023</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🪪</span>
                <div>
                  <h3 className="text-zinc-300 font-semibold">SIM BII Umum</h3>
                  <p className="text-zinc-500">2023</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📜</span>
                <div>
                  <h3 className="text-zinc-300 font-semibold">Heavy Equipment Training Certificate</h3>
                  <p className="text-zinc-500">2023</p>
                </div>
              </div>
            </div>
          </section>

          {/* Scope of Work */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">Scope of Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg">
                <span className="text-2xl">🚜</span>
                <p className="text-zinc-400">Excavation, loading & material handling</p>
              </div>
              <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg">
                <span className="text-2xl">🔧</span>
                <p className="text-zinc-400">Daily checks (P2H) & routine maintenance</p>
              </div>
              <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg">
                <span className="text-2xl">👥</span>
                <p className="text-zinc-400">Collaboration and team coordination</p>
              </div>
              <div className="flex items-start gap-3 p-4 border border-zinc-800 rounded-lg">
                <span className="text-2xl">⚠️</span>
                <p className="text-zinc-400">Compliance with safety standards (K3)</p>
              </div>
            </div>
          </section>

          {/* Hobbies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-2">Hobbies & Interests</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-zinc-800 rounded-lg">
                <span className="text-3xl mb-2 block">📚</span>
                <p className="text-zinc-400">Reading</p>
              </div>
              <div className="text-center p-4 border border-zinc-800 rounded-lg">
                <span className="text-3xl mb-2 block">📷</span>
                <p className="text-zinc-400">Photography</p>
              </div>
              <div className="text-center p-4 border border-zinc-800 rounded-lg">
                <span className="text-3xl mb-2 block">✍️</span>
                <p className="text-zinc-400">Writing</p>
              </div>
              <div className="text-center p-4 border border-zinc-800 rounded-lg">
                <span className="text-3xl mb-2 block">✈️</span>
                <p className="text-zinc-400">Travel</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
