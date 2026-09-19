import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import {
  routes,
  publishedRoutes,
  sitemapRoutes,
  activeRedirects,
  contentModules,
} from '@/content/routes';
import { primaryNav, footerNav, legalNav } from '@/content/navigation';
import sitemap from '@/app/sitemap';

it('matches the canonical page tree after the deliberate cutover', () => {
  const root = 'src/app/(marketing)';
  function pages(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry): string[] => {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) return pages(file);
      return entry.name === 'page.tsx' ? [dir.slice(root.length).replaceAll('\\', '/') || '/'] : [];
    });
  }
  expect(pages(root).sort()).toEqual(publishedRoutes.map((route) => route.path).sort());
  expect(new Set(routes.map((route) => route.path)).size).toBe(routes.length);
  expect(existsSync('app')).toBe(false);
  for (const file of Object.values(contentModules))
    if (file !== 'route page') expect(existsSync(file)).toBe(true);
});

it('publishes only real canonical pages and keeps all navigation destinations reachable', () => {
  const paths = publishedRoutes.map((route) => route.path);
  for (const link of [...primaryNav, ...footerNav.flatMap((group) => group.items), ...legalNav])
    expect(paths).toContain(link.href);
  expect(
    sitemap()
      .map((entry) => new URL(entry.url).pathname)
      .sort()
  ).toEqual(sitemapRoutes.map((route) => route.path).sort());
  for (const redirect of activeRedirects) {
    expect(paths).toContain(redirect.destination);
    expect(paths).not.toContain(redirect.source);
    expect(redirect.source.startsWith('/api/')).toBe(false);
  }
  expect(activeRedirects).toHaveLength(7);
});
