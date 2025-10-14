"use client";
import { Navigation } from "../components/nav";
import { Timeline } from "../components/Timeline";
import { SkillsVisualization } from "../components/SkillBar";
import { CertificateShowcase } from "../components/CertificateShowcase";
import { StatsGrid } from "../components/StatCounter";
import { TestimonialsCarousel } from "../components/Testimonials";
import { DownloadResumeButton, PrintResumeButton } from "../components/DownloadResume";
import { EquipmentGallery } from "../components/EquipmentGallery";
import { ProgressCircles } from "../components/ProgressCircles";
import { DayInLifeTimeline } from "../components/DayInLifeTimeline";
import { CompanyLogos } from "../components/CompanyLogos";
import { BeforeAfterComparison } from "../components/BeforeAfterComparison";
import Image from "next/image";

export default function ResumePage() {
  // Career Stats
  const careerStats = [
    { value: 95, suffix: "%", label: "Operational Efficiency" },
    { value: 850, label: "Daily BCM Production" },
    { value: 96, suffix: "%", label: "Equipment Uptime" },
    { value: 0, label: "Accident Record" },
    { value: 40, suffix: "%", label: "Incident Reduction" },
    { value: 23, suffix: "%", label: "Productivity Increase" },
    { value: 18, suffix: "%", label: "Fuel Savings" },
    { value: 85, prefix: "Rp ", suffix: "M+", label: "Annual Savings" },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Ahmad Susanto",
      role: "Site Supervisor",
      company: "PT. Nadesico Nickel Industry",
      content: "Muhammad is one of our most reliable operators. His attention to detail in P2H inspections and consistent high productivity make him an invaluable team member. He maintains safety standards while achieving excellent production targets.",
      rating: 5,
      relationship: "Worked together at Nadesico Nickel",
    },
    {
      name: "Budi Hartono",
      role: "Operations Manager",
      company: "PT. LTPM Makassar",
      content: "During his time with us, Muhammad demonstrated exceptional technical skills and problem-solving abilities. He was always proactive in identifying potential equipment issues before they became problems, resulting in minimal downtime.",
      rating: 5,
      relationship: "Direct supervisor at LTPM",
    },
    {
      name: "Rizki Firmansyah",
      role: "Maintenance Coordinator",
      company: "PT. Bintang Bumi Sulawesi",
      content: "Muhammad's knowledge of excavator maintenance is impressive. He performs thorough daily checks and communicates any concerns clearly. His equipment has consistently been in the best condition among all operators.",
      rating: 5,
      relationship: "Worked together at Bintang Bumi",
    },
    {
      name: "Dwi Prasetyo",
      role: "Safety Officer",
      company: "PT. Nadesico Nickel Industry",
      content: "As a safety officer, I appreciate Muhammad's commitment to safety protocols. He never compromises on P2H procedures and actively contributes to our safety culture. His zero-accident record speaks for itself.",
      rating: 5,
      relationship: "Safety collaboration at Nadesico",
    },
  ];

  const timelineEvents = [
    {
      id: "1",
      title: "Excavator Operator",
      company: "PT. Nadesico Nickel Industry",
      location: "Indonesia",
      period: "2023 - Present",
      current: true,
      description: "Operating excavator for nickel mining operations with focus on safety, efficiency, and team coordination.",
      achievements: [
        "Operating excavator for nickel mining operations",
        "Maintaining 95% operational efficiency",
        "Zero accident record throughout tenure",
        "Daily production of 800-1,000 BCM",
        "Conducting comprehensive P2H inspections",
      ],
    },
    {
      id: "2",
      title: "Excavator Operator",
      company: "PT. LTPM Makassar",
      location: "Makassar, Indonesia",
      period: "2023",
      description: "Excavation and material handling operations with emphasis on equipment maintenance and safety protocols.",
      achievements: [
        "Excavation and material handling operations",
        "Routine equipment maintenance and troubleshooting",
        "Safety protocol implementation",
        "Team coordination and communication",
      ],
    },
    {
      id: "3",
      title: "Excavator Operator",
      company: "PT. Bintang Bumi Sulawesi",
      location: "Sulawesi, Indonesia",
      period: "2021 - 2022",
      description: "Loading and material transfer operations with focus on efficiency and equipment care.",
      achievements: [
        "Loading and material transfer operations",
        "Daily checkup care and maintenance",
        "Team coordination and communication",
        "Consistent production targets achievement",
      ],
    },
  ];

  const skillCategories = [
    {
      name: "Equipment Operation",
      skills: [
        { name: "Excavator Operation", level: 95 },
        { name: "Wheel Loader Operation", level: 70 },
        { name: "Equipment Coordination", level: 90 },
      ],
    },
    {
      name: "Technical Skills",
      skills: [
        { name: "Basic Engine Maintenance", level: 80 },
        { name: "Daily Checkup (P2H)", level: 95 },
        { name: "Troubleshooting", level: 75 },
        { name: "Equipment Optimization", level: 85 },
      ],
    },
    {
      name: "Safety & Compliance",
      skills: [
        { name: "Occupational Safety (K3)", level: 95 },
        { name: "Risk Assessment", level: 85 },
        { name: "Emergency Response", level: 80 },
      ],
    },
    {
      name: "Interpersonal Skills",
      skills: [
        { name: "Team Communication", level: 95 },
        { name: "Leadership & Mentoring", level: 85 },
        { name: "Problem Solving", level: 80 },
        { name: "Time Management", level: 85 },
        { name: "Adaptability", level: 80 },
      ],
    },
  ];

  const certificates = [
    {
      id: "1",
      title: "SIO Excavator Certificate (Non-Class)",
      issuer: "Government of Indonesia",
      date: "2023",
      isPDF: true,
      description: "Official operating license for excavator operation",
      downloadUrl: "/certificates/SIO Yat Kompress.pdf",
    },
    {
      id: "2",
      title: "SIM BII Umum",
      issuer: "Government of Indonesia",
      date: "2023",
      isPDF: true,
      description: "General driver's license for heavy vehicles",
      downloadUrl: "/certificates/SIM Yat Kompress.pdf",
    },
    {
      id: "3",
      title: "DISNAKER Safety Training",
      issuer: "Department of Manpower (DISNAKER)",
      date: "2023",
      isPDF: true,
      description: "Occupational safety and health training certification",
      downloadUrl: "/certificates/SERTIFIKAT DISNAKER Yat Kompres.pdf",
    },
    {
      id: "4",
      title: "LPTM Heavy Equipment Training",
      issuer: "LPTM Training Center",
      date: "2023",
      isPDF: true,
      description: "Comprehensive heavy equipment operation training",
      downloadUrl: "/certificates/SERTIFIKAT LPTM Yat Kompres.pdf",
    },
  ];

  return (
    <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container min-h-screen px-4 mx-auto mt-32">
        <div className="max-w-4xl mx-auto">
          {/* Header with Profile Photo */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-zinc-800">
                <Image
                  src="/profile/profile.jpg"
                  alt="Muhammad Nurhidayat Gani"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4 tracking-tight">Muhammad Nurhidayat Gani</h1>
            <p className="text-xl text-zinc-400 mb-6 font-medium tracking-wide">Professional Heavy Equipment Operator</p>
            <div className="flex justify-center gap-6 text-zinc-500 flex-wrap text-sm mb-6">
              <span>📧 mnhidayatgani@gmail.com</span>
              <span>📞 +62 853-4590-2520</span>
            </div>
            
            {/* Download/Print Buttons */}
            <div className="flex justify-center gap-4 flex-wrap print:hidden">
              <DownloadResumeButton />
              <PrintResumeButton />
            </div>
          </div>

          {/* About */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-4 border-b border-zinc-800 pb-2 tracking-tight">About Me</h2>
            <p className="text-zinc-400 leading-relaxed text-base">
              A competent and certified Excavator Heavy Equipment Operator with experience in excavation, loading, and material transfer operations across various projects. Possesses a thorough understanding of occupational safety (K3) standards, routine equipment maintenance (P2H), and technical troubleshooting skills in the field.
            </p>
          </section>

          {/* Career Impact Stats */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8 border-b border-zinc-800 pb-2 tracking-tight">Career Impact</h2>
            <StatsGrid stats={careerStats} />
          </section>

          {/* Experience Timeline */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8 border-b border-zinc-800 pb-2 tracking-tight">Experience</h2>
            <Timeline events={timelineEvents} />
          </section>

          {/* Skills Visualization */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8 border-b border-zinc-800 pb-2 tracking-tight">Skills & Expertise</h2>
            <SkillsVisualization categories={skillCategories} />
          </section>

          {/* Certifications Showcase */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8 border-b border-zinc-800 pb-2 tracking-tight">Training & Certifications</h2>
            <CertificateShowcase certificates={certificates} />
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

          {/* Company Experience - Social Proof */}
          <CompanyLogos />

          {/* Performance Metrics - Circular Progress */}
          <section className="my-12">
            <ProgressCircles />
          </section>

          {/* Equipment Gallery */}
          <section className="my-12">
            <EquipmentGallery />
          </section>

          {/* Day in the Life Timeline */}
          <section className="my-12">
            <DayInLifeTimeline />
          </section>

          {/* Before/After Comparisons */}
          <section className="my-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8 border-b border-zinc-800 pb-2">Impact & Results</h2>
            
            {/* Safety Implementation Results */}
            <BeforeAfterComparison
              title="Safety Protocol Implementation"
              description="Results from comprehensive safety improvement initiative"
              beforeLabel="Before Initiative"
              afterLabel="After Initiative"
              beforeStats={[
                { label: "Near-miss Incidents", value: "12/month" },
                { label: "P2H Compliance", value: "75%" },
                { label: "Safety Training", value: "Quarterly" }
              ]}
              afterStats={[
                { label: "Near-miss Incidents", value: "7/month (-40%)" },
                { label: "P2H Compliance", value: "98%" },
                { label: "Safety Training", value: "Monthly" }
              ]}
            />

            {/* Productivity Improvement Results */}
            <div className="mt-8">
              <BeforeAfterComparison
                title="Productivity Optimization"
                description="Results from technique optimization and efficiency improvements"
                beforeLabel="Before Optimization"
                afterLabel="After Optimization"
                beforeStats={[
                  { label: "Daily Production", value: "650 BCM" },
                  { label: "Fuel Efficiency", value: "8.5 L/hr" },
                  { label: "Cycle Time", value: "45 sec" }
                ]}
                afterStats={[
                  { label: "Daily Production", value: "800 BCM (+23%)" },
                  { label: "Fuel Efficiency", value: "7.0 L/hr (-18%)" },
                  { label: "Cycle Time", value: "38 sec" }
                ]}
              />
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-100 mb-8 border-b border-zinc-800 pb-2 tracking-tight">Professional Recommendations</h2>
            <TestimonialsCarousel testimonials={testimonials} />
          </section>
        </div>
      </div>
    </div>
  );
}
