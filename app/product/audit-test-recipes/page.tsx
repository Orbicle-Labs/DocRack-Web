import { Check } from 'lucide-react';
import { Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { PageHero } from '@/components/sections/PageHero';
import { LedgerRows } from '@/components/sections/LedgerRows';
import { CtaSection } from '@/components/sections/CtaSection';
import { recipesPage } from '@/lib/content/product';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Audit Test Recipes',
  description:
    'A prompt gives an answer. An Audit Test Recipe produces a repeatable, reviewable and ' +
    'defensible procedure — versioned, approved, and recorded by every run that uses it.',
  path: '/product/audit-test-recipes',
});

export default function AuditTestRecipesPage() {
  return (
    <>
      <PageHero
        eyebrow={recipesPage.hero.eyebrow}
        heading={recipesPage.hero.heading}
        sub={recipesPage.hero.sub}
        visual={{
          src: '/product/recipe.png',
          alt: 'An Audit Test Recipe showing its objective, risk, population, required inputs, extracted fields, and rules with tolerances',
          caption: 'An approved Audit Test Recipe, version 4.2',
        }}
      />

      {/* Archetype C — the claim on its own, in the field it concludes. */}
      <Section tone="canvas" spacing="quiet">
        <p className="mx-auto max-w-[34ch] text-center text-h3">
          A prompt gives an answer. A recipe gives a procedure.
        </p>
      </Section>

      <LedgerRows
        eyebrow="Anatomy of a recipe"
        heading="Six parts, each decided before the test runs."
        rows={recipesPage.anatomy}
        tone="canvas"
        spacing="tight"
        numbered
      />

      {/* Archetype D — versioning, with the builder as the evidence. */}
      <Section tone="surface" spacing="open">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>{recipesPage.versioning.eyebrow}</Eyebrow>
            <Heading level={2}>{recipesPage.versioning.heading}</Heading>
            <ul className="mt-8 border-b border-line">
              {recipesPage.versioning.points.map((point) => (
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
              src="/product/recipe-builder.png"
              alt="Editing an Audit Test Recipe: each rule has an explicit measure, operator and tolerance, alongside a recipe-health checklist and approval route"
              variant="real"
              chrome="none"
              aspect="16/10"
              caption="Rules, tolerances and the approval route"
            />
          </div>
        </div>
      </Section>

      {/* Where AI sits, stated plainly — §16 forbids implying it decides. */}
      <Section tone="ink" spacing="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <Eyebrow>Where AI sits</Eyebrow>
            <Heading level={2}>AI reads. Logic decides.</Heading>
          </div>
          <div className="lg:col-start-6 lg:col-span-7">
            <p className="max-w-prose text-lead text-muted">
              AI extracts values from documents, classifies inputs, drafts a recipe from a written
              procedure and explains a result with citations. It does not perform the comparison
              that produces a conclusion — that is deterministic logic running the rules you
              configured, which is why the same run twice gives the same answer.
            </p>
            <p className="mt-5 max-w-prose text-body text-muted">
              A human approves the recipe before it can run, and a human approves the conclusion
              after it has.
            </p>
          </div>
        </div>
      </Section>

      <CtaSection heading={recipesPage.cta.heading} body={recipesPage.cta.body} />
    </>
  );
}
