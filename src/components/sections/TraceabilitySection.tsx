import { Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { traceability } from '@/content/pages/homepage';

const CHAIN = [
  'Result',
  'Rule applied',
  'Expected value',
  'Actual value',
  'Source page or cell',
  'Reviewer decision',
];

/**
 * Archetype D, reversed — the one place on the page where the visual leads.
 * Ink tone, so the section anchors the lower half of the page.
 *
 * The Eyebrow needs no `text-white` override: `text-accent` resolves through
 * `.tone-ink` to the light blue that clears contrast on dark.
 *
 * This is also the single section where mono numerals survive — here the
 * number denotes a real sequence position in a technical artefact.
 */
export function TraceabilitySection() {
  return (
    <Section tone="ink" spacing="open">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-7">
          <ProductFrame
            src="/product/trace-link.png"
            alt="An exception traced to its source: the rule applied, expected versus actual values, and the invoice PDF page beside the spreadsheet cell each value came from"
            variant="real"
            chrome="none"
            aspect="16/10"
            caption="An exception opened against its evidence"
          />
        </div>

        <div className="lg:col-start-9 lg:col-span-4">
          <Eyebrow>{traceability.eyebrow}</Eyebrow>
          <Heading level={2}>{traceability.heading}</Heading>
          <p className="mt-5 text-body-lg text-muted">{traceability.body}</p>

          <ol className="mt-8 border-b border-line">
            {CHAIN.map((item, index) => (
              <li key={item} className="flex items-center gap-3 border-t border-line py-2.5">
                <span className="font-mono text-mono-xs tabular-nums text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-body-sm">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
