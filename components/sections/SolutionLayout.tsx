import { Check } from 'lucide-react';
import { Badge, Eyebrow, Heading, Panel, Section } from '@/components/ui';
import { PageHero } from './PageHero';
import { LedgerRows } from './LedgerRows';
import { CtaSection } from './CtaSection';
import type { SolutionPage } from '@/lib/content/solutions';
import { useCases } from '@/lib/content/use-cases';

/**
 * One layout for both solution pages: hero, the scope as ledger rows, a worked
 * example pulled from the shared use-case data, the outcomes checklist, CTA.
 *
 * The worked example shows inputs, procedure, exceptions and output together —
 * §10.9 requires all four, because a use case without its exceptions is a
 * feature list with a job title on it.
 */
export function SolutionLayout({ page }: { page: SolutionPage }) {
  const example = useCases.find((useCase) => useCase.key === page.useCaseKey);

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        heading={page.hero.heading}
        sub={page.hero.sub}
        visual={page.visual}
      />

      <LedgerRows
        eyebrow="In scope"
        heading="The procedures teams configure first."
        rows={page.scope}
        tone="canvas"
        spacing="open"
      />

      {example && (
        <Section tone="surface" spacing="default">
          <div>
            <Eyebrow variant="rule">Worked example</Eyebrow>
            <Heading level={2} className="max-w-[26ch]">
              {example.title}
            </Heading>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-8 lg:grid-cols-12">
            <Panel as="section" className="lg:col-span-4">
              <h3 className="text-label uppercase text-muted">Inputs</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {example.inputs.map((input) => (
                  <li key={input} className="text-body-sm text-muted">
                    {input}
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel as="section" className="lg:col-span-8">
              <h3 className="text-label uppercase text-muted">Procedure</h3>
              <p className="mt-4 max-w-prose text-body text-ink">{example.procedure}</p>
            </Panel>

            <Panel as="section" variant="accent" className="lg:col-span-7">
              <h3 className="text-label uppercase text-muted">Exceptions it raises</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {example.exceptions.map((exception) => (
                  <li key={exception}>
                    <Badge tone="neutral" size="sm">
                      {exception}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel as="section" className="lg:col-start-9 lg:col-span-4">
              <h3 className="text-label uppercase text-muted">Output</h3>
              <p className="mt-4 text-body-sm text-muted">{example.output}</p>
            </Panel>
          </div>
        </Section>
      )}

      <Section tone="canvas" spacing="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>{page.outcomes.eyebrow}</Eyebrow>
            <Heading level={2} className="max-w-[22ch]">
              {page.outcomes.heading}
            </Heading>
          </div>
          <div className="lg:col-start-7 lg:col-span-6">
            <ul className="border-b border-line">
              {page.outcomes.items.map((item) => (
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
