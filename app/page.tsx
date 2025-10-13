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
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-8xl lg:text-9xl bg-clip-text px-4 py-8 tracking-wider font-light">
        MUHAMMAD NURHIDAYAT GANI
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in px-4 max-w-3xl">
        <h2 className="text-sm md:text-base text-zinc-400 leading-relaxed tracking-wide">
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
