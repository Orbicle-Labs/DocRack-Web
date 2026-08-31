import { Check } from 'lucide-react';
import { Eyebrow, Heading, Section } from '@/components/ui';
import { PageHero } from './PageHero';
import { LedgerRows } from './LedgerRows';
import { CtaSection } from './CtaSection';
import type { CapabilityPage } from '@/lib/content/product';

/**
 * The four capability pages are one page four times: hero with a product
 * screen, ledger rows for the substance, a checklist for the payoff, closing
 * CTA. Writing it once means they cannot drift apart, and the content module
 * stays the only place their copy lives.
 */
export function CapabilityLayout({ page }: { page: CapabilityPage }) {
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        heading={page.hero.heading}
        sub={page.hero.sub}
        visual={page.visual}
      />

      <LedgerRows rows={page.rows} tone="canvas" spacing="open" />

      {/* Archetype D without a frame — the checklist is the visual. */}
      <Section tone="surface" spacing="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>{page.points.eyebrow}</Eyebrow>
            <Heading level={2} className="max-w-[22ch]">
              {page.points.heading}
            </Heading>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <ul className="border-b border-line">
              {page.points.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-t border-line py-4 text-body text-muted"
                >
                  <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaSection heading={page.cta.heading} body={page.cta.body} />
    </>
  );
}
