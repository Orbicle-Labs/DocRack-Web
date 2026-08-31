import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Card, Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { PageHero } from '@/components/sections/PageHero';
import { LedgerRows } from '@/components/sections/LedgerRows';
import { CtaSection } from '@/components/sections/CtaSection';
import { productPage, recipesPage } from '@/lib/content/product';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Product',
  description:
    'DocRack holds the evidence, the procedure and the result together — so the working paper ' +
    'is a by-product of doing the work rather than a document assembled afterwards.',
  path: '/product',
});

/** The four capability pages, as the only Card cluster on this page. */
const AREAS = [
  {
    href: '/documents',
    title: 'Documents',
    body: 'Evidence in one engagement, classified by the role it plays, with every extracted value keeping its page and cell.',
  },
  {
    href: '/reconciliation-and-checks',
    title: 'Reconciliation and checks',
    body: 'Matching across sources, deterministic calculations, stated tolerances and policy checks, across the whole population.',
  },
  {
    href: '/review-and-findings',
    title: 'Review and findings',
    body: 'Exceptions queued with their evidence, five outcomes rather than two, and every reviewer decision on the record.',
  },
  {
    href: '/working-papers',
    title: 'Working papers',
    body: 'Excel and PDF generated from the run, with the exception register, evidence links and frozen versions intact.',
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow={productPage.hero.eyebrow}
        heading={productPage.hero.heading}
        sub={productPage.hero.sub}
        secondary={{ label: 'See Audit Test Recipes', href: '/product/audit-test-recipes' }}
        visual={{
          src: '/product/engagement-dashboard.png',
          alt: 'Engagement dashboard showing active audit tests, run status, open exceptions and working-paper progress across an engagement',
          caption: 'One engagement, from evidence through to sign-off',
        }}
      />

      <LedgerRows
        eyebrow="End to end"
        heading="From evidence to working paper, in one traceable line."
        rows={productPage.stages}
        tone="canvas"
        spacing="open"
      />

      {/* Archetype G — the only Cards on the page. */}
      <Section tone="surface" spacing="default">
        <div>
          <Eyebrow variant="rule">Explore</Eyebrow>
          <Heading level={2} className="max-w-[26ch]">
            Four areas, one continuous record.
          </Heading>
        </div>

        {/* `relative` on the Card is load-bearing: the title link stretches to
            cover the whole card via after:inset-0, so the card must be its
            offset parent. Without it the overlay covers the viewport. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {AREAS.map((area) => (
            <Card key={area.href} as="article" padding="lg" interactive className="relative">
              <h3 className="text-h4">
                <Link
                  href={area.href}
                  className="transition-colors duration-fast ease-out after:absolute after:inset-0 group-hover:text-accent"
                >
                  {area.title}
                </Link>
              </h3>
              <p className="mt-3 text-body-sm text-muted">{area.body}</p>
              <span
                aria-hidden="true"
                className="mt-5 inline-flex items-center gap-1.5 text-body-sm text-accent"
              >
                Read more
                <ArrowRight size={15} className="shrink-0" />
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Archetype D — Audit Test Recipes, the idea the rest depends on. */}
      <Section tone="canvas" spacing="open">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>{recipesPage.hero.eyebrow}</Eyebrow>
            <Heading level={2}>{recipesPage.hero.heading}</Heading>
            <p className="mt-5 max-w-prose text-body-lg text-muted">{recipesPage.hero.sub}</p>
            <Link
              href="/product/audit-test-recipes"
              className="mt-7 inline-flex items-center gap-1.5 text-body text-accent underline decoration-1 underline-offset-[3px] hover:decoration-2"
            >
              How a recipe is built
              <ArrowRight size={16} className="shrink-0" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <ProductFrame
              src="/product/recipe-builder.png"
              alt="Editing an Audit Test Recipe: each rule has an explicit measure, operator and tolerance, alongside a recipe-health checklist and approval route"
              variant="real"
              chrome="none"
              aspect="16/10"
              caption="Configuring rules and tolerances"
            />
          </div>
        </div>
      </Section>

      {/* Archetype D reversed, on ink — the visual leads. */}
      <Section tone="ink" spacing="open">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-7">
            <ProductFrame
              src="/product/knowledge-hub.png"
              alt="Knowledge Hub listing policies, SOPs and regulatory requirements with their source, version, effective date and applicability"
              variant="real"
              chrome="none"
              aspect="16/10"
              caption="Policies and requirements, versioned and citable"
            />
          </div>

          <div className="lg:col-start-9 lg:col-span-4">
            <Eyebrow>{productPage.knowledge.eyebrow}</Eyebrow>
            <Heading level={2}>{productPage.knowledge.heading}</Heading>
            <p className="mt-5 text-body-lg text-muted">{productPage.knowledge.body}</p>
            <ul className="mt-8 border-b border-line">
              {productPage.knowledge.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 border-t border-line py-3.5 text-body-sm text-muted"
                >
                  <Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Copilot lives here rather than on its own route: one screen and four
          claims is not a page, and §9 rules out thin routes cut to fill a nav. */}
      <Section tone="surface" spacing="open" id="copilot">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>{productPage.copilot.eyebrow}</Eyebrow>
            <Heading level={2}>{productPage.copilot.heading}</Heading>
            <p className="mt-5 max-w-prose text-body-lg text-muted">{productPage.copilot.body}</p>
            <ul className="mt-8 border-b border-line">
              {productPage.copilot.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 border-t border-line py-3.5 text-body-sm text-muted"
                >
                  <Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <ProductFrame
              src="/product/copilot.png"
              alt="Copilot answering a question about an engagement document, with the citation and source page shown beside the answer"
              variant="real"
              chrome="none"
              aspect="16/10"
              caption="Answers carry the document and page behind them"
            />
          </div>
        </div>
      </Section>

      <CtaSection heading={productPage.cta.heading} body={productPage.cta.body} />
    </>
  );
}
