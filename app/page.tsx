import Link from "next/link";
import React, { Suspense } from "react";
import { getPersonSchema, getWebSiteSchema, renderJsonLd } from "./lib/structured-data";

// Lazy load heavy components
const Particles = React.lazy(() => import("./components/particles"));
const AchievementBadges = React.lazy(() => import("./components/AchievementBadges").then(mod => ({ default: mod.AchievementBadges })));
const CompanyLogos = React.lazy(() => import("./components/CompanyLogos").then(mod => ({ default: mod.CompanyLogos })));

const navigation = [
  { name: "Resume", href: "/resume" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const personSchema = getPersonSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(personSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(websiteSchema)}
      />

      <div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black relative">
        {/* Lightweight gradient background - replaces heavy VideoHeroBackground */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl" />
          </div>
        </div>
        
        {/* Mobile-optimized navigation */}
        <nav className="my-8 sm:my-12 md:my-16 animate-fade-in relative z-20" role="navigation" aria-label="Main navigation">
          <ul className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs sm:text-sm duration-500 text-zinc-500 hover:text-zinc-300 px-2 py-1"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        
        {/* Decorative line - hidden on mobile */}
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 relative z-20" aria-hidden="true" />
        
        {/* Particles - lazy loaded for performance */}
        <Suspense fallback={null}>
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={50}
          />
        </Suspense>
        
        {/* Main content area with proper landmark */}
        <main id="main-content" className="z-20 text-center">
          {/* Mobile-optimized hero title */}
          <h1 className="text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display bg-clip-text tracking-wider font-light
            text-3xl px-6 py-4 sm:text-4xl sm:px-4 sm:py-6 md:text-6xl md:py-8 lg:text-8xl xl:text-9xl
            text-center leading-tight sm:leading-tight md:leading-tight">
            MUHAMMAD NURHIDAYAT GANI
          </h1>

          {/* Decorative line - hidden on mobile */}
          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" aria-hidden="true" />
          
          {/* Mobile-optimized subtitle - No typing animation for faster load */}
          <div className="my-8 sm:my-12 md:my-16 text-center animate-fade-in px-6 sm:px-4 max-w-3xl">
            <h2 className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed tracking-wide">
              Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance.
            </h2>
          </div>
        </main>

        {/* Achievement Badges Section - Lazy loaded */}
        <Suspense fallback={<div className="w-full h-48" />}>
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 relative z-20">
            <AchievementBadges />
          </div>
        </Suspense>

        {/* Company Logos Section - Lazy loaded */}
        <Suspense fallback={<div className="w-full h-48" />}>
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
            <CompanyLogos />
          </div>
        </Suspense>
      </div>
    </>
  );
}
