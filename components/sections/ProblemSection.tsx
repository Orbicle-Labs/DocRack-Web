import { Eyebrow, Heading, Section } from '@/components/ui';
import { problem } from '@/lib/content/homepage';

/**
 * Archetype E — Ledger rows. Five items in a three-column grid orphaned two,
 * which reads as a mistake. Full-width hairline-separated rows fix that, give
 * the eye a long horizontal line, and read as an audit schedule — which is
 * both on-brand and the strongest visual contrast to the card sections.
 */
export function ProblemSection() {
  return (
    <Section tone="canvas" spacing="open">
      <div>
        <Eyebrow variant="rule">{problem.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-[26ch]">
          {problem.heading}
        </Heading>
      </div>

      <ul className="mt-12 border-b border-line">
        {problem.points.map((point, index) => (
          <li
            key={point.title}
            className="grid grid-cols-12 gap-x-4 border-t border-line py-6 lg:gap-x-6 lg:py-7"
          >
            <span className="col-span-12 text-label tabular-nums text-muted sm:col-span-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="col-span-12 mt-1 text-h4 sm:col-span-11 sm:mt-0 lg:col-span-4">
              {point.title}
            </h3>
            <p className="col-span-12 mt-2 text-body-sm text-muted sm:col-start-2 sm:col-span-11 lg:col-start-6 lg:col-span-7 lg:mt-0">
              {point.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
