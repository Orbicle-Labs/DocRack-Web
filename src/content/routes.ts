/** Explicit canonical routes. Legal hold pages are reachable but not indexable. */
export const contentModules = {
  homepage: 'src/content/pages/home.ts',
  launch: 'src/content/pages/launch.ts',
  legalHold: 'route page',
} as const;
export const routes = [
  {
    path: '/',
    status: 'published',
    indexable: true,
    content: 'homepage',
  },
  {
    path: '/product',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/product/audit-test-recipes',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/product/documents',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/product/reconciliation-and-checks',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/product/review-and-findings',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/product/working-papers',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/product/knowledge-hub-and-copilot',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/product/test-library',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/solutions/internal-audit',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/solutions/credit-loan-audit',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/solutions/ifc-sox',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/security',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/company',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/book-demo',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/support',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/glossary',
    status: 'published',
    indexable: true,
    content: 'launch',
  },
  {
    path: '/privacy',
    status: 'published',
    indexable: false,
    content: 'legalHold',
  },
  {
    path: '/terms',
    status: 'published',
    indexable: false,
    content: 'legalHold',
  },
] as const;
export type PublishedPath = (typeof routes)[number]['path'];
export const publishedRoutes = routes;
export const sitemapRoutes = publishedRoutes.filter((route) => route.indexable);
export const activeRedirects = [
  {
    source: '/intake',
    destination: '/book-demo',
    permanent: true,
  },
  {
    source: '/workflow',
    destination: '/product',
    permanent: true,
  },
  {
    source: '/about',
    destination: '/company',
    permanent: true,
  },
  {
    source: '/documents',
    destination: '/product/documents',
    permanent: true,
  },
  {
    source: '/reconciliation-and-checks',
    destination: '/product/reconciliation-and-checks',
    permanent: true,
  },
  {
    source: '/review-and-findings',
    destination: '/product/review-and-findings',
    permanent: true,
  },
  {
    source: '/working-papers',
    destination: '/product/working-papers',
    permanent: true,
  },
] satisfies { source: string; destination: PublishedPath; permanent: true }[];
