import { Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { TraceLinkMock } from '@/components/product-ui/TraceLinkMock';
import { traceability } from '@/lib/content/homepage';

const CHAIN = [
  'Result',
  'Rule applied',
  'Expected value',
  'Actual value',
  'Source page or cell',
  'Reviewer decision',
];

export function TraceabilitySection() {
  return (
    <Section tone="ink">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow className="text-white">{traceability.eyebrow}</Eyebrow>
          <Heading level={2} balance>
            {traceability.heading}
          </Heading>
          <p className="mt-5 leading-relaxed text-muted">{traceability.body}</p>

          <ol className="mt-7 space-y-0">
            {CHAIN.map((item, index) => (
              <li key={item} className="flex items-center gap-3 border-t border-line py-2.5">
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <ProductFrame aspect="3/2" caption="Exception opened against its evidence">
            <TraceLinkMock />
          </ProductFrame>
        </div>
      </div>
    </Section>
  );
}
