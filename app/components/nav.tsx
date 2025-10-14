"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500 border-zinc-800"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					{/* Navigation Links */}
					<nav className="flex justify-between gap-6 md:gap-8">
						<Link
							href="/resume"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm md:text-base"
						>
							Resume
						</Link>
						<Link
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm md:text-base"
						>
							Projects
						</Link>
						<Link
							href="/blog"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm md:text-base"
						>
							Blog
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100 text-sm md:text-base"
						>
							Contact
						</Link>
					</nav>

					{/* Home Button */}
					<Link
						href="/"
						className="flex items-center gap-2 duration-200 text-zinc-300 hover:text-zinc-100 group"
						aria-label="Back to Home"
					>
						<Home className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
						<span className="hidden sm:inline-block text-sm md:text-base font-medium">
							Home
						</span>
					</Link>
				</div>
			</div>
		</header>
	);
};
