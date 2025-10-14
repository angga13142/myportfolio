"use client";
import { Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { ContactForm } from "../components/ContactForm";

const socials = [
	{
		icon: <Mail size={20} />,
		href: "mailto:mnhidayatgani@gmail.com",
		label: "Email",
		handle: "mnhidayatgani@gmail.com",
	},
	{
		icon: <Phone size={20} />,
		href: "tel:+6285345902520",
		label: "Phone",
		handle: "+62 853-4590-2520",
	},
	{
		icon: <Linkedin size={20} />,
		href: "#",
		label: "LinkedIn",
		handle: "Muhammad Nurhidayat Gani",
	},
];

export default function Example() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			{/* Mobile-optimized container */}
			<div className="container px-4 sm:px-6 mx-auto pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16">
				{/* Mobile-optimized header */}
				<div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 mb-3 sm:mb-4 tracking-tight px-4">
						Get in Touch
					</h1>
					<p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed px-4">
						Let's discuss opportunities, collaborations, or just have a chat about heavy equipment operations.
					</p>
				</div>

				{/* Mobile-optimized contact cards */}
				<div className="grid w-full grid-cols-1 gap-6 sm:gap-8 mx-auto mb-12 sm:mb-16 sm:grid-cols-3 lg:gap-8 max-w-6xl">
					{socials.map((s) => (
						<Card key={s.label}>
							<Link
								href={s.href}
								target="_blank"
								className="p-6 sm:p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-16 md:p-8"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
									{s.icon}
								</span>
								<div className="z-10 flex flex-col items-center">
									<span className="text-base sm:text-lg font-medium duration-150 text-zinc-200 group-hover:text-white font-display text-center break-all px-2">
										{s.handle}
									</span>
									<span className="mt-2 text-xs sm:text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>

				{/* Mobile-optimized contact form */}
				<div className="max-w-2xl mx-auto px-4 sm:px-0">
					<div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8">
						<h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-2 tracking-tight">
							Send a Message
						</h2>
						<p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8 leading-relaxed">
							Fill out the form below and I'll get back to you as soon as possible.
						</p>
						<ContactForm />
					</div>
				</div>
			</div>
		</div>
	);
}
