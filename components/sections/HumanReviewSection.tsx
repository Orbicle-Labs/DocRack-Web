import { Eyebrow, Heading, OutcomeBadge, OUTCOME_LIST, Section } from '@/components/ui';
import { humanReview } from '@/lib/content/homepage';

/**
 * §10.11. The five outcomes shown together, with the explicit statement that
 * missing evidence is not silently a failure — this is a credibility
 * differentiator for an audit buyer, not a feature list.
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
    <Section tone="canvas">
      <div className="max-w-2xl">
        <Eyebrow>{humanReview.eyebrow}</Eyebrow>
        <Heading level={2} balance>
          {humanReview.heading}
        </Heading>
        <p className="mt-5 text-lg leading-relaxed text-ink">{humanReview.body}</p>
      </div>

      <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {OUTCOME_LIST.map((item) => (
          <div key={item.outcome} className="border-t border-line pt-4">
            <dt>
              <OutcomeBadge outcome={item.outcome} />
            </dt>
            <dd className="mt-2.5 text-sm leading-relaxed text-muted">
              {DESCRIPTIONS[item.outcome]}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
