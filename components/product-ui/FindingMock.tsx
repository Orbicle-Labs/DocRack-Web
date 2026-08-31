import { Badge } from '@/components/ui';

/**
 * A finding as §7 defines it: confirmed exceptions grouped into an
 * observation carrying condition, criteria, cause, consequence and
 * recommendation, plus the management response and recurrence status.
 */

const NARRATIVE: { label: string; value: string }[] = [
  {
    label: 'Condition',
    value: '12 invoices were paid where the received quantity did not match the invoiced quantity.',
  },
  {
    label: 'Criteria',
    value: 'Procurement policy v4, clause 6.2 — three-way match before payment',
  },
  { label: 'Cause', value: 'GRN posting lags invoice approval at two plants' },
  { label: 'Consequence', value: 'Overpayment exposure of ₹4.812 lakh in the period tested' },
  {
    label: 'Recommendation',
    value: 'Block payment release until the GRN is posted and matched.',
  },
];

export function FindingMock() {
  return (
    <div className="flex h-full w-full flex-col bg-surface text-[11px] leading-normal sm:text-xs">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="font-medium text-ink">F-07 · Three-way match not enforced</span>
        <span className="flex shrink-0 items-center gap-1.5">
          <Badge tone="danger" size="sm">
            High
          </Badge>
          <Badge tone="warning" size="sm">
            Recurring
          </Badge>
        </span>
      </div>

      {/* Rows keep their natural rhythm; the block sits toward the top and the
          footer holds the bottom, rather than stretching every gap. */}
      <div className="flex-1 space-y-2.5 overflow-hidden px-4 py-3">
        {NARRATIVE.map((item) => (
          <div key={item.label} className="flex gap-3">
            <span className="w-[92px] shrink-0 text-muted">{item.label}</span>
            <span className="min-w-0 text-ink">{item.value}</span>
          </div>
        ))}

        <div className="flex gap-3 border-t border-line pt-2.5">
          <span className="w-[92px] shrink-0 text-muted">Response</span>
          <span className="min-w-0 text-ink">
            Accepted. Payment block configured at both plants by 30 Sep 2026.
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-muted">
        <span>12 confirmed exceptions grouped</span>
        <span>Owner · Head of Procurement</span>
      </div>
    </div>
  );
}
