import "../global.css";
import { Poppins } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { UmamiAnalytics } from "./components/UmamiAnalytics";
import { SkipToContent } from "./components/SkipToContent";
import { BackToTop } from "./components/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://aistorytell.me'),
  title: {
    default: "Muhammad Nurhidayat Gani - Portfolio",
    template: "%s | Muhammad Nurhidayat Gani",
  },
  description: "Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance.",
  keywords: [
    "heavy equipment operator",
    "excavator operator",
    "mining operations",
    "safety management",
    "equipment maintenance",
    "P2H inspection",
    "K3",
    "occupational safety",
    "Indonesia",
    "Sulawesi",
    "heavy equipment portfolio",
    "mining professional",
    "excavator specialist",
    "safety compliance",
    "equipment efficiency",
  ],
  authors: [{ name: "Muhammad Nurhidayat Gani" }],
  creator: "Muhammad Nurhidayat Gani",
  publisher: "Muhammad Nurhidayat Gani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Muhammad Nurhidayat Gani - Portfolio",
    description:
      "Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance.",
    url: process.env.NEXT_PUBLIC_URL || "https://aistorytell.me",
    siteName: "Muhammad Nurhidayat Gani Portfolio",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Nurhidayat Gani - Heavy Equipment Operator Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Nurhidayat Gani - Heavy Equipment Operator",
    description: "Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add when available
    // google: 'your-google-site-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_URL || "https://aistorytell.me",
  },
  category: "portfolio",
};

// Poppins font with multiple weights for better typography
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[poppins.variable, calSans.variable].join(" ")}>
      <head>
        <UmamiAnalytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        <SkipToContent />
        {children}
        <BackToTop />
        {/* Vercel Analytics & Speed Insights */}
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
