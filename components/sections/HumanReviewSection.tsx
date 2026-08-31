import { Eyebrow, Heading, OutcomeBadge, OUTCOME_LIST, Section } from '@/components/ui';
import { humanReview } from '@/lib/content/homepage';

/**
 * §10.11, as Archetype E — ledger rows. Five outcomes in a three-column grid
 * orphaned two; rows read as a legend, which is exactly what this is.
 *
 * Spacing is `tight` because this continues the Traceability argument rather
 * than opening a new one.
 */
const DESCRIPTIONS: Record<string, string> = {
  pass: 'The rule was satisfied against the evidence provided.',
  fail: 'The rule was tested and not satisfied.',
  insufficient: 'The evidence needed to test the rule was missing or unreadable.',
  review: 'The result is uncertain and is queued for an auditor to decide.',
  na: 'The rule does not apply to this item, with the reason recorded.',
};

export function HumanReviewSection() {
  return (
    <Section tone="surface" spacing="tight">
      <div>
        <Eyebrow>{humanReview.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-[26ch]">
          {humanReview.heading}
        </Heading>
      </div>
      <p className="mt-5 max-w-prose text-lead text-ink">{humanReview.body}</p>

      <dl className="mt-10 border-b border-line">
        {OUTCOME_LIST.map((item) => (
          <div
            key={item.outcome}
            className="grid grid-cols-12 items-baseline gap-x-4 border-t border-line py-5 lg:gap-x-6 lg:py-6"
          >
            <dt className="col-span-12 sm:col-span-4 lg:col-span-3">
              <OutcomeBadge outcome={item.outcome} />
            </dt>
            <dd className="col-span-12 mt-2 text-body-sm text-muted sm:col-span-8 sm:mt-0 lg:col-span-9">
              {DESCRIPTIONS[item.outcome]}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
