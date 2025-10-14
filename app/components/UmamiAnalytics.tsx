"use client";

import Script from "next/script";

/**
 * Umami Analytics - Privacy-focused alternative to Google Analytics
 * No cookies, GDPR compliant, open source
 */

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";
const UMAMI_SRC = "https://cloud.umami.is/script.js";

export function UmamiAnalytics() {
  if (!UMAMI_WEBSITE_ID) {
    return null;
  }

  return (
    <Script
      async
      src={UMAMI_SRC}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}

// Track custom events (optional)
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
}
