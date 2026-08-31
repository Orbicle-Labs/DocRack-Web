import { OutcomeBadge, type Outcome } from '@/components/ui';

/**
 * The review queue: exceptions and low-confidence results with the rule that
 * produced them. Doubles as the hero visual, so it has to read at a glance —
 * §10.3 wants a real engagement surface, not a decorative graphic.
 */

interface Row {
  ref: string;
  vendor: string;
  rule: string;
  expected: string;
  actual: string;
  outcome: Outcome;
}

/** Abbreviated forms for the results column, which is too narrow for the
 *  canonical labels. Meaning is unchanged — "No evidence" still reads as
 *  missing evidence, not as a failure. */
const SHORT_LABELS: Partial<Record<Outcome, string>> = {
  insufficient: 'No evidence',
  review: 'Review',
};

const ROWS: Row[] = [
  {
    ref: 'INV-4471',
    vendor: 'Meridian Supply',
    rule: 'Invoice qty = GRN qty',
    expected: '120',
    actual: '132',
    outcome: 'fail',
  },
  {
    ref: 'INV-4468',
    vendor: 'Trenton Works',
    rule: 'Invoice rate = PO rate',
    expected: '₹1,840.00',
    actual: '₹1,844.50',
    outcome: 'pass',
  },
  {
    ref: 'INV-4462',
    vendor: 'Kestrel Logistics',
    rule: 'GRN present',
    expected: 'GRN linked',
    actual: 'Not found',
    outcome: 'insufficient',
  },
  {
    ref: 'INV-4455',
    vendor: 'Alder & Co',
    rule: 'Approver within limit',
    expected: '≤ ₹5,00,000',
    actual: '₹6,20,000',
    outcome: 'review',
  },
  {
    ref: 'INV-4450',
    vendor: 'Northgate Steel',
    rule: 'Duplicate check',
    expected: 'Unique',
    actual: 'Unique',
    outcome: 'pass',
  },
];

export function ReviewQueueMock() {
  return (
    <div className="flex h-full w-full flex-col bg-surface text-[11px] leading-normal sm:text-xs">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="font-medium text-ink">Review · Three-way invoice match</span>
        <span className="hidden text-muted sm:inline">4,182 tested · 37 exceptions</span>
      </div>

      {/* Columns drop out as width shrinks, keeping Ref and Result — the
          result is the whole point of the surface and must never be clipped. */}
      <div className="flex shrink-0 items-center gap-3 border-b border-line bg-canvas px-3 py-1.5 font-medium text-muted sm:px-4">
        <span className="flex-1 sm:w-[104px] sm:flex-none">Ref</span>
        <span className="hidden flex-1 lg:block">Rule applied</span>
        <span className="hidden w-[74px] shrink-0 text-right sm:block">Expected</span>
        <span className="hidden w-[74px] shrink-0 text-right sm:block">Actual</span>
        <span className="w-[92px] shrink-0 text-right">Result</span>
      </div>

      <div className="flex-1 divide-y divide-line overflow-hidden">
        {ROWS.map((row) => (
          <div key={row.ref} className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
            <span className="min-w-0 flex-1 sm:w-[104px] sm:flex-none">
              <span className="block font-mono text-ink">{row.ref}</span>
              <span className="block truncate text-[10px] text-muted">{row.vendor}</span>
              {/* The rule rides along under the ref once its own column is gone. */}
              <span className="block truncate text-[10px] text-muted lg:hidden">{row.rule}</span>
            </span>
            <span className="hidden flex-1 truncate text-ink lg:block">{row.rule}</span>
            <span className="hidden w-[74px] shrink-0 truncate text-right text-muted sm:block">
              {row.expected}
            </span>
            <span className="hidden w-[74px] shrink-0 truncate text-right text-ink sm:block">
              {row.actual}
            </span>
            <span className="flex w-[92px] shrink-0 justify-end">
              {/* Short labels in the dense table; the canonical wording is
                  spelled out in full in the human-review section. */}
              <OutcomeBadge outcome={row.outcome} size="sm" label={SHORT_LABELS[row.outcome]} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
