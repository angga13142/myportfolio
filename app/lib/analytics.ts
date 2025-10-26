import ReactGA from "react-ga4";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID not found");
    return;
  }

  try {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gtagOptions: {
        send_page_view: true,
        anonymize_ip: true,
      },
    });
    console.log("Google Analytics initialized");
  } catch (error) {
    console.error("Failed to initialize Google Analytics:", error);
  }
};

// Track page views
export const trackPageView = (path: string) => {
  if (!GA_MEASUREMENT_ID) return;

  try {
    ReactGA.send({ hitType: "pageview", page: path });
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

// Track custom events
interface EventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
}

export const trackEvent = ({
  category,
  action,
  label,
  value,
  nonInteraction = false,
}: EventParams) => {
  if (!GA_MEASUREMENT_ID) return;

  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
      nonInteraction,
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};

// Specific tracking functions for common events

export const trackPDFDownload = (projectSlug: string) => {
  trackEvent({
    category: "Engagement",
    action: "Download PDF",
    label: projectSlug,
  });
};

export const trackLanguageSwitch = (fromLocale: string, toLocale: string) => {
  trackEvent({
    category: "User Preference",
    action: "Language Switch",
    label: `${fromLocale} → ${toLocale}`,
  });
};

export const trackVideoPlay = (videoId: string) => {
  trackEvent({
    category: "Video",
    action: "Play",
    label: videoId,
  });
};

export const trackVideoPause = (videoId: string) => {
  trackEvent({
    category: "Video",
    action: "Pause",
    label: videoId,
  });
};

export const trackVideoComplete = (videoId: string) => {
  trackEvent({
    category: "Video",
    action: "Complete",
    label: videoId,
  });
};

export const trackTimelineClick = (position: string, company: string) => {
  trackEvent({
    category: "Timeline",
    action: "View Details",
    label: `${position} at ${company}`,
  });
};

export const trackMaintenanceFilter = (
  filterType: string,
  filterValue: string
) => {
  trackEvent({
    category: "Maintenance Log",
    action: "Filter",
    label: `${filterType}: ${filterValue}`,
  });
};

export const trackMaintenanceExport = (recordCount: number) => {
  trackEvent({
    category: "Maintenance Log",
    action: "Export CSV",
    label: `${recordCount} records`,
    value: recordCount,
  });
};

export const trackNewsletterSignup = (email: string) => {
  trackEvent({
    category: "Conversion",
    action: "Newsletter Signup",
    label: email.split("@")[1] || "unknown", // Track domain only for privacy
  });
};

export const track3DInteraction = (action: string, label?: string) => {
  trackEvent({
    category: "3D Showcase",
    action,
    label,
  });
};

export const trackWhatsAppClick = (quickMessage?: string) => {
  trackEvent({
    category: "Contact",
    action: "WhatsApp Click",
    label: quickMessage || "Direct",
  });
};

export const trackSkillsRadarView = () => {
  trackEvent({
    category: "Skills",
    action: "View Radar Chart",
    nonInteraction: true,
  });
};

export const trackCertificateView = (certificateName: string) => {
  trackEvent({
    category: "Certificates",
    action: "View Certificate",
    label: certificateName,
  });
};

// User engagement metrics
export const trackScrollDepth = (depth: number) => {
  trackEvent({
    category: "Engagement",
    action: "Scroll Depth",
    label: `${depth}%`,
    value: depth,
    nonInteraction: true,
  });
};

export const trackTimeOnPage = (seconds: number, page: string) => {
  trackEvent({
    category: "Engagement",
    action: "Time on Page",
    label: page,
    value: seconds,
    nonInteraction: true,
  });
};
