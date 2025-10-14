import "../global.css";
import { Poppins } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { MobileDebugger } from "./components/MobileDebugger";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  title: {
    default: "Muhammad Nurhidayat Gani - Portfolio",
    template: "%s | Muhammad Nurhidayat Gani",
  },
  description: "Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance.",
  openGraph: {
    title: "Muhammad Nurhidayat Gani - Portfolio",
    description:
      "Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance.",
    url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    siteName: "Muhammad Nurhidayat Gani Portfolio",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Muhammad Nurhidayat Gani",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
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
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
        {/* Mobile debugger - only visible in development */}
        <MobileDebugger />
      </body>
    </html>
  );
}
