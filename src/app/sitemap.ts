import { sitemapRoutes } from '@/content/routes';
import { MetadataRoute } from 'next';
import { DEMO_HREF } from '@/content/navigation';
import { SITE_URL } from '@/lib/seo/metadata';

/** Published routes are independent of header/footer visibility. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapRoutes.map(({ path: route }) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : route === DEMO_HREF ? 0.9 : 0.8,
  }));
}
