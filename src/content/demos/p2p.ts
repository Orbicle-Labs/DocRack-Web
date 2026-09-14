import type { Outcome } from '@/components/ui/OutcomeLabel';
import { fixtures, formatMoney } from './fixtures';

const fixture = fixtures.p2p;

/** Display fixtures only. No evaluator, provider or authenticated product dependency. */
export const p2p = {
  engagement: fixture.title,
  record: fixture.record,
  recipe: `${fixture.recipe.name} · v${fixture.recipe.version}`,
  run: fixture.run,
  expected: fixture.expected,
  actual: fixture.actual,
  difference: formatMoney(fixture.money.deltaPaise),
  tolerance: formatMoney(fixture.money.tolerancePaise),
  policy: `${fixture.policy.title} v${fixture.policy.version} · ${fixture.policy.clause}`,
  invoice: fixture.traces[0].file,
  cell: fixture.traces[1].location,
  sheet: fixture.traces[1].file,
  review: fixture.review,
} as const;
export const outcomeExamples: {
  outcome: Outcome;
  record: string;
  reason: string;
  source: string;
  rule: string;
}[] = [
  {
    outcome: 'Pass',
    record: 'DEMO-0041',
    reason:
      'The invoice subtotal and approved PO amount are both ₹1,20,000. Difference ₹0; tolerance ₹1.',
    source: 'DEMO-0041.pdf · p1 ↔ purchase-orders.xlsx · Orders!H42',
    rule: 'P2P amount check v3 · Synthetic Procurement Policy v3 · §4.2',
  },
  {
    outcome: 'Fail',
    record: p2p.record,
    reason:
      'Amount mismatch. The invoice subtotal exceeds the approved purchase order by ₹5,000; tolerance ₹1.',
    source: 'DEMO-0042.pdf · p1 ↔ purchase-orders.xlsx · Orders!H43',
    rule: 'P2P amount check v3 · Synthetic Procurement Policy v3 · §4.2',
  },
  {
    outcome: 'Insufficient evidence',
    record: 'DEMO-0043',
    reason:
      'The approved purchase order is missing. This amount check cannot establish a comparison.',
    source: 'DEMO-0043.pdf · p1; approved PO unavailable',
    rule: 'P2P amount check v3 · required evidence',
  },
  {
    outcome: 'Needs human review',
    record: 'DEMO-0044',
    reason:
      'Two possible PO references were extracted. A reviewer must resolve the ambiguous source before a reliable conclusion.',
    source: 'DEMO-0044.pdf · p1 · PO reference region',
    rule: 'P2P amount check v3 · matching ambiguity',
  },
  {
    outcome: 'Not applicable',
    record: 'DEMO-NA-01 · separate illustration',
    reason:
      'A non-PO reimbursement is outside this rule’s scope. This separate example is not part of DEMO-RUN-018.',
    source: 'reimbursements.xlsx · Expenses!A2 · record type',
    rule: 'P2P amount check v3 · eligibility',
  },
  {
    outcome: 'Processing error',
    record: 'DEMO-0045',
    reason:
      'The invoice file could not be parsed. No subtotal was extracted and the check did not complete.',
    source: 'DEMO-0045.pdf · parse failed; no page Trace available',
    rule: 'P2P amount check v3 · execution precondition',
  },
];
