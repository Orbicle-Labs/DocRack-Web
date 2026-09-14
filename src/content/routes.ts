/** Publication is explicit and independent of navigation. Planned URLs stay private. */
export const contentModules = {
  homepage: 'src/content/pages/home.ts',
  product: 'src/content/pages/product.ts',
  solutions: 'src/content/pages/solutions.ts',
  support: 'src/content/pages/support.ts',
  glossary: 'src/content/pages/glossary.ts',
  inline: 'route page',
} as const;

interface RouteEntry {
  path: `/${string}`;
  status: 'published' | 'planned';
  indexable: boolean;
  content: keyof typeof contentModules;
  /** Future path only; does not activate a redirect. */
  replacement?: `/${string}`;
}

export const routes = [
  { path: '/', status: 'published', indexable: true, content: 'homepage' },
  { path: '/product', status: 'published', indexable: true, content: 'product' },
  { path: '/product/audit-test-recipes', status: 'published', indexable: true, content: 'product' },
  {
    path: '/documents',
    status: 'published',
    indexable: true,
    content: 'product',
    replacement: '/product/documents',
  },
  {
    path: '/reconciliation-and-checks',
    status: 'published',
    indexable: true,
    content: 'product',
    replacement: '/product/reconciliation-and-checks',
  },
  {
    path: '/review-and-findings',
    status: 'published',
    indexable: true,
    content: 'product',
    replacement: '/product/review-and-findings',
  },
  {
    path: '/working-papers',
    status: 'published',
    indexable: true,
    content: 'product',
    replacement: '/product/working-papers',
  },
  { path: '/solutions/internal-audit', status: 'published', indexable: true, content: 'solutions' },
  {
    path: '/solutions/credit-loan-audit',
    status: 'published',
    indexable: true,
    content: 'solutions',
  },
  { path: '/security', status: 'published', indexable: true, content: 'inline' },
  { path: '/company', status: 'published', indexable: true, content: 'inline' },
  { path: '/book-demo', status: 'published', indexable: true, content: 'inline' },
  { path: '/support', status: 'published', indexable: true, content: 'support' },
  { path: '/glossary', status: 'published', indexable: true, content: 'glossary' },
  { path: '/privacy', status: 'published', indexable: true, content: 'inline' },
  { path: '/terms', status: 'published', indexable: true, content: 'inline' },
  { path: '/product/documents', status: 'planned', indexable: false, content: 'product' },
  {
    path: '/product/reconciliation-and-checks',
    status: 'planned',
    indexable: false,
    content: 'product',
  },
  { path: '/product/review-and-findings', status: 'planned', indexable: false, content: 'product' },
  { path: '/product/working-papers', status: 'planned', indexable: false, content: 'product' },
  {
    path: '/product/knowledge-hub-and-copilot',
    status: 'planned',
    indexable: false,
    content: 'product',
  },
  { path: '/product/test-library', status: 'planned', indexable: false, content: 'product' },
  { path: '/solutions/ifc-sox', status: 'planned', indexable: false, content: 'solutions' },
] as const satisfies readonly RouteEntry[];

export type PublishedPath = Extract<(typeof routes)[number], { status: 'published' }>['path'];
export const publishedRoutes = routes.filter((route) => route.status === 'published');
export const sitemapRoutes = publishedRoutes.filter((route) => route.indexable);

export const activeRedirects = [
  { source: '/intake', destination: '/book-demo', permanent: true },
  { source: '/workflow', destination: '/product', permanent: true },
  { source: '/about', destination: '/company', permanent: true },
] satisfies { source: string; destination: PublishedPath; permanent: true }[];
