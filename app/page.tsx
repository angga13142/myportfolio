import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { MatrixTyping } from "./components/typing-animation";

const navigation = [
  { name: "Resume", href: "/resume" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Mobile-optimized navigation */}
      <nav className="my-8 sm:my-12 md:my-16 animate-fade-in">
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
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      {/* Particles - reduced quantity on mobile for performance */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      
      {/* Mobile-optimized hero title */}
      <h1 className="z-10 text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display bg-clip-text tracking-wider font-light
        text-3xl px-6 py-4 sm:text-4xl sm:px-4 sm:py-6 md:text-6xl md:py-8 lg:text-8xl xl:text-9xl
        text-center leading-tight sm:leading-tight md:leading-tight">
        MUHAMMAD NURHIDAYAT GANI
      </h1>

      {/* Decorative line - hidden on mobile */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      
      {/* Mobile-optimized subtitle */}
      <div className="my-8 sm:my-12 md:my-16 text-center animate-fade-in px-6 sm:px-4 max-w-3xl">
        <h2 className="text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed tracking-wide">
          <MatrixTyping 
            text="Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance."
            speed={30}
            delay={1500}
          />
        </h2>
      </div>
    </div>
  );

}
