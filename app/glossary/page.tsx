import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { glossaryPage, terms } from '@/lib/content/glossary';
import { definedTermSetSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: glossaryPage.metaTitle,
  description: glossaryPage.metaDescription,
  path: glossaryPage.path,
});

/**
 * A definition list, not LedgerRows.
 *
 * LedgerRows renders <ul>/<li>, which is the wrong element for a term and its
 * definition, and giving its shared LedgerRow type an href would push a
 * glossary-only concern into the eight other pages that use it. Hand-composing
 * a bespoke list from the primitives is what /security and /company already do.
 */
export default function GlossaryPage() {
  return (
    <>
      <JsonLd
        data={definedTermSetSchema(terms, {
          name: `${glossaryPage.metaTitle} — DocRack`,
          description: glossaryPage.metaDescription,
          path: glossaryPage.path,
        })}
      />

      <PageHero
        eyebrow={glossaryPage.eyebrow}
        heading={glossaryPage.heading}
        sub={glossaryPage.sub}
        cta={{ label: 'Book a demo' }}
        secondary={{ label: 'Ask a question', href: '/support' }}
      />

      <Section tone="canvas" spacing="open">
        <dl className="border-b border-line">
          {terms.map((entry) => (
            <div
              key={entry.slug}
              id={entry.slug}
              // scroll-mt clears the sticky header when an anchor is followed.
              className="grid scroll-mt-24 gap-x-6 gap-y-2 border-t border-line py-7 lg:grid-cols-12"
            >
              <dt className="min-w-0 text-h4 lg:col-span-4">{entry.term}</dt>
              <dd className="min-w-0 lg:col-start-6 lg:col-span-7">
                <p className="max-w-prose text-body text-muted">{entry.definition}</p>
                {entry.href && (
                  <Link
                    href={entry.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent transition-colors duration-fast ease-out hover:text-accent-hover"
                  >
                    {entry.hrefLabel}
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaSection heading={glossaryPage.cta.heading} body={glossaryPage.cta.body} />
    </>
  );
}
