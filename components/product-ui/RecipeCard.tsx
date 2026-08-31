import { Badge } from '@/components/ui';

/**
 * The Audit Test Recipe as a visible artefact (§10.7) — objective, risk,
 * population, sources, rules, outcomes, reviewer and version. The point of
 * the section is that a recipe is a document you can read, not a hidden
 * prompt, so this shows real field labels rather than an abstract diagram.
 */

const FIELDS: { label: string; value: string }[] = [
  { label: 'Objective', value: 'Invoices are supported by an approved PO and a matching GRN' },
  { label: 'Risk', value: 'Payment for goods not ordered or not received' },
  { label: 'Population', value: 'AP invoices — FY25 Q3 — 4,182 records' },
  { label: 'Source of truth', value: 'ERP PO master → GRN register → invoice PDF' },
];

const RULES: { rule: string; tolerance: string }[] = [
  { rule: 'Invoice qty = GRN qty', tolerance: 'Exact' },
  { rule: 'Invoice rate = PO rate', tolerance: '± 0.5%' },
  { rule: 'Approver within limit', tolerance: 'Approval matrix v4' },
];

export function RecipeCard() {
  return (
    <div className="flex h-full w-full flex-col bg-surface text-caption tabular-nums">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="font-medium text-ink">Three-way invoice match</span>
        <span className="flex items-center gap-2">
          <Badge tone="brand" size="sm">
            v2.1
          </Badge>
          <Badge tone="success" size="sm">
            Approved
          </Badge>
        </span>
      </div>

      <div className="flex-1 space-y-2.5 overflow-hidden px-4 py-3">
        {FIELDS.map((field) => (
          <div key={field.label} className="flex gap-3">
            <span className="w-[86px] shrink-0 text-muted">{field.label}</span>
            <span className="text-ink">{field.value}</span>
          </div>
        ))}

        <div className="border-t border-line pt-2.5">
          <span className="text-muted">Rules</span>
          <div className="mt-1.5 space-y-1">
            {RULES.map((item) => (
              <div
                key={item.rule}
                className="flex items-center justify-between gap-3 rounded border border-line bg-canvas px-2.5 py-1.5"
              >
                <span className="font-mono text-ink">{item.rule}</span>
                <span className="shrink-0 text-muted">{item.tolerance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-muted">
        <span>Reviewer required · Manager sign-off</span>
        <span>Effective 01 Apr 2026</span>
      </div>
    </div>
  );
}
