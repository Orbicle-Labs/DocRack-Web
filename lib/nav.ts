export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation. §10.2 rules out a mega-menu at launch, so these are
 * flat links.
 *
 * PHASE 2 NOTE: Product/Company/Support still point at the pre-redesign
 * routes, which remain live until Phase 3 replaces them. When those land,
 * repoint here — one line each — and add the redirects in next.config.ts.
 */
export const primaryNav: NavItem[] = [
  { label: 'Product', href: '/workflow' },
  { label: 'Company', href: '/about' },
  { label: 'Support', href: '/support' },
];

/** Primary conversion (§2). Referenced by the header, footer and every CTA. */
export const DEMO_HREF = '/intake';

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Product',
    items: [
      { label: 'How it works', href: '/workflow' },
      { label: 'Book a demo', href: DEMO_HREF },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Support', href: '/support' },
    ],
  },
];
