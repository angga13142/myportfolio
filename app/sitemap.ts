import { MetadataRoute } from 'next';
import { allProjects } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mnhidayatgani.vercel.app';
  
  const routes = ['', '/projects', '/resume', '/contact'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projects = allProjects
    .filter((project) => project.published)
    .map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...routes, ...projects];
}
