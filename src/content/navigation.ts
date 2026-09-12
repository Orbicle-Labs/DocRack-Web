import type { PublishedPath } from './routes';

export interface NavItem {
  label: string;
  href: PublishedPath;
}

/**
 * Existing navigation preserved during Phase 1. The new Product/Solutions
 * disclosures are Phase 2/5 work. PublishedPath prevents links to planned pages.
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
