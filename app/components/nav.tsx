"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const LanguageSwitcher = dynamic(() => import("./LanguageSwitcher"), {
  ssr: false,
});

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-fast ease-smooth border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          {/* Navigation Links */}
          <nav className="flex items-center gap-4 md:gap-6">
            <div className="flex gap-4 md:gap-6">
              <Link
                href="/resume"
                className="duration-fast ease-smooth text-zinc-400 hover:text-zinc-100 text-fluid-sm hover-lift"
              >
                Resume
              </Link>
              <Link
                href="/projects"
                className="duration-fast ease-smooth text-zinc-400 hover:text-zinc-100 text-fluid-sm hover-lift"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="duration-fast ease-smooth text-zinc-400 hover:text-zinc-100 text-fluid-sm hover-lift"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="duration-fast ease-smooth text-zinc-400 hover:text-zinc-100 text-fluid-sm hover-lift"
              >
                Contact
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="ml-2 md:ml-4">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 duration-fast ease-smooth text-zinc-300 hover:text-zinc-100 group"
            aria-label="Back to Home"
          >
            <Home className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-fast group-hover:scale-110" />
            <span className="hidden sm:inline-block text-fluid-sm font-medium">
              Home
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
