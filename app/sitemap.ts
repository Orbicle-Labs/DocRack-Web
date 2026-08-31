import { MetadataRoute } from 'next';
import { SITEMAP_ROUTES, DEMO_HREF } from '@/lib/nav';
import { SITE_URL } from '@/lib/seo';

/**
 * Derived from lib/nav.ts rather than hardcoded.
 *
 * The previous version listed five paths by hand, three of which now redirect —
 * publishing a 308 as a canonical URL. Deriving it means a page that is not
 * linked anywhere cannot appear here, and a page that is linked cannot be
 * forgotten.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : route === DEMO_HREF ? 0.9 : 0.8,
  }));
}
