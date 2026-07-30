import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { projects } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
  ];
  for (const p of projects) {
    routes.push({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    });
  }
  return routes;
}
