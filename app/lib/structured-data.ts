/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand the content
 */

interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  email?: string;
  telephone?: string;
  alumniOf?: Array<{
    "@type": "EducationalOrganization";
    name: string;
  }>;
  knowsAbout?: string[];
  sameAs?: string[];
}

interface ProjectSchema {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  datePublished?: string;
  keywords?: string;
}

interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export function getPersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Nurhidayat Gani",
    jobTitle: "Heavy Equipment Operator",
    description: "Professional Heavy Equipment Operator specializing in excavator operations, with expertise in safety standards and equipment maintenance.",
    url: process.env.NEXT_PUBLIC_URL || "https://mnhidayatgani.vercel.app",
    email: "mnhidayatgani@gmail.com",
    telephone: "+6285345902520",
    knowsAbout: [
      "Excavator Operation",
      "Heavy Equipment Operation",
      "Mining Operations",
      "Safety Management",
      "Equipment Maintenance",
      "Team Coordination",
      "P2H Inspection",
      "K3 (Occupational Safety and Health)",
    ],
    sameAs: [
      // Add LinkedIn URL when available
      // Add other professional profiles
    ],
  };
}

export function getProjectSchema(project: {
  title: string;
  description?: string;
  date?: string;
}): ProjectSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description || "",
    author: {
      "@type": "Person",
      name: "Muhammad Nurhidayat Gani",
    },
    datePublished: project.date,
    keywords: "heavy equipment, excavator, mining, safety, operations",
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function renderJsonLd(data: any) {
  return {
    __html: JSON.stringify(data),
  };
}
