import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export function generateSEO({
  title,
  description,
  image = "/og.png",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Muhammad Nurhidayat Gani",
  keywords = [],
}: SEOProps): Metadata {
  const siteName = "Muhammad Nurhidayat Gani - Portfolio";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mnhidayatgani.vercel.app";

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: [
      "Heavy Equipment Operator",
      "Excavator Operator",
      "Mining Operations",
      "Safety Management",
      "Equipment Maintenance",
      "Indonesia",
      ...keywords,
    ],
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    openGraph: {
      type,
      locale: "id_ID",
      url: siteUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}${image}`],
      creator: "@mnhidayatgani",
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
    alternates: {
      canonical: siteUrl,
    },
  };
}

interface JsonLdProps {
  type: "Person" | "Article" | "WebPage";
  name?: string;
  description?: string;
  image?: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export function generateJsonLd({
  type,
  name,
  description,
  image,
  url,
  datePublished,
  dateModified,
  author = "Muhammad Nurhidayat Gani",
}: JsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mnhidayatgani.vercel.app";

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  };

  if (type === "Person") {
    return {
      ...baseSchema,
      name: author,
      jobTitle: "Heavy Equipment Operator",
      description: "Professional heavy equipment operator specializing in excavator operations, mining, safety management, and equipment maintenance.",
      image: `${siteUrl}/profile/profile.jpg`,
      url: siteUrl,
      sameAs: [
        "https://linkedin.com/in/mnhidayatgani",
        "https://github.com/mnhidayatgani",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Mining Operations",
      },
      knowsAbout: [
        "Heavy Equipment Operation",
        "Excavator Operation",
        "Mining Operations",
        "Safety Management",
        "Equipment Maintenance",
        "Team Coordination",
      ],
    };
  }

  if (type === "Article") {
    return {
      ...baseSchema,
      headline: name,
      description,
      image: image ? `${siteUrl}${image}` : `${siteUrl}/og.png`,
      datePublished,
      dateModified,
      author: {
        "@type": "Person",
        name: author,
      },
      publisher: {
        "@type": "Person",
        name: author,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url || siteUrl,
      },
    };
  }

  return {
    ...baseSchema,
    name,
    description,
    url: url || siteUrl,
  };
}
