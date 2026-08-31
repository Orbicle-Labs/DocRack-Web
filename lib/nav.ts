export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation. §10.2 rules out a mega-menu at launch, so these are flat
 * links.
 *
 * Every href here must resolve to a page that exists — §9 forbids linking a
 * nav item at a route built only to fill the nav. That is why there is no
 * Solutions dropdown: two solution pages exist, and two items do not earn a
 * menu, so they are reached from /product and the footer.
 */
export const primaryNav: NavItem[] = [
  { label: 'Product', href: '/product' },
  { label: 'Security', href: '/security' },
  { label: 'Company', href: '/company' },
  { label: 'Support', href: '/support' },
];

/** Primary conversion (§2). Referenced by the header, footer and every CTA. */
export const DEMO_HREF = '/book-demo';

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { label: 'Overview', href: '/product' },
      { label: 'Audit Test Recipes', href: '/product/audit-test-recipes' },
      { label: 'Documents', href: '/documents' },
      { label: 'Reconciliation and checks', href: '/reconciliation-and-checks' },
      { label: 'Review and findings', href: '/review-and-findings' },
      { label: 'Working papers', href: '/working-papers' },
    ],
  },
  {
    title: 'Solutions',
    items: [
      { label: 'Internal audit', href: '/solutions/internal-audit' },
      { label: 'Credit and loan audit', href: '/solutions/credit-loan-audit' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/company' },
      { label: 'Security', href: '/security' },
      { label: 'Support', href: '/support' },
      { label: 'Book a demo', href: DEMO_HREF },
    ],
  },
];

/** Small print. Separated so it renders in the footer's bottom bar. */
export const legalNav: NavItem[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

/**
 * Every indexable route, derived once so the sitemap cannot drift from the
 * pages that exist. The old sitemap hardcoded five routes, three of which now
 * 308 elsewhere — it would have published redirects as canonical URLs.
 */
export const SITEMAP_ROUTES: string[] = [
  '/',
  ...primaryNav.map((item) => item.href),
  ...footerNav.flatMap((group) => group.items.map((item) => item.href)),
  ...legalNav.map((item) => item.href),
  DEMO_HREF,
].filter((href, index, all) => all.indexOf(href) === index);
