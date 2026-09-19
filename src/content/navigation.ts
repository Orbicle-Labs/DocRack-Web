import type { PublishedPath } from './routes';

export interface NavItem {
  label: string;
  href: PublishedPath;
}

/**
 * Navigation includes published paths only. Product and Solutions disclosures use the corresponding footer groups.
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
      { label: 'Documents', href: '/product/documents' },
      { label: 'Reconciliation and checks', href: '/product/reconciliation-and-checks' },
      { label: 'Review and findings', href: '/product/review-and-findings' },
      { label: 'Working papers', href: '/product/working-papers' },
      { label: 'Knowledge Hub and Copilot', href: '/product/knowledge-hub-and-copilot' },
      { label: 'Test Library', href: '/product/test-library' },
    ],
  },
  {
    title: 'Solutions',
    items: [
      { label: 'Internal audit', href: '/solutions/internal-audit' },
      { label: 'Credit and loan audit', href: '/solutions/credit-loan-audit' },
      { label: 'IFC/SOX controls', href: '/solutions/ifc-sox' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/company' },
      { label: 'Security', href: '/security' },
      { label: 'Glossary', href: '/glossary' },
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
