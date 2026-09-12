import { Eyebrow, Heading, Section, type SectionProps } from '@/components/ui';

export interface LedgerRow {
  title: string;
  body: string;
}

export interface LedgerRowsProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  rows: readonly LedgerRow[];
  tone?: SectionProps['tone'];
  spacing?: SectionProps['spacing'];
  /** Numbering implies sequence. Off for sets where the order is arbitrary. */
  numbered?: boolean;
  id?: string;
}

/**
 * Archetype E — full-width hairline rows, extracted from ProblemSection so the
 * pages below the homepage share it rather than each reinventing a grid.
 *
 * The reason to reach for this over a card grid: it takes any number of items
 * without orphaning the last row, and it reads as an audit schedule, which is
 * both on-brand and the strongest contrast to the card sections.
 */
export function LedgerRows({
  eyebrow,
  heading,
  intro,
  rows,
  tone = 'canvas',
  spacing = 'open',
  numbered = true,
  id,
}: LedgerRowsProps) {
  return (
    <Section tone={tone} spacing={spacing} id={id}>
      {(eyebrow || heading) && (
        <div>
          {eyebrow && <Eyebrow variant="rule">{eyebrow}</Eyebrow>}
          {heading && (
            <Heading level={2} className="max-w-[26ch]">
              {heading}
            </Heading>
          )}
          {intro && <p className="mt-5 max-w-prose text-body-lg text-muted">{intro}</p>}
        </div>
      )}

      <ul className={cnList(eyebrow || heading)}>
        {rows.map((row, index) => (
          <li
            key={row.title}
            className="grid grid-cols-12 gap-x-4 border-t border-line py-6 lg:gap-x-6 lg:py-7"
          >
            {numbered && (
              <span className="col-span-12 text-label tabular-nums text-muted sm:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
            <h3
              className={
                numbered
                  ? 'col-span-12 mt-1 text-h4 sm:col-span-11 sm:mt-0 lg:col-span-4'
                  : 'col-span-12 text-h4 lg:col-span-4'
              }
            >
              {row.title}
            </h3>
            <p
              className={
                numbered
                  ? 'col-span-12 mt-2 text-body-sm text-muted sm:col-start-2 sm:col-span-11 lg:col-start-6 lg:col-span-7 lg:mt-0'
                  : 'col-span-12 mt-2 text-body-sm text-muted lg:col-start-6 lg:col-span-7 lg:mt-0'
              }
            >
              {row.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The list needs top margin only when a heading block precedes it. */
function cnList(hasHeader: string | boolean | undefined) {
  return hasHeader ? 'mt-12 border-b border-line' : 'border-b border-line';
}
