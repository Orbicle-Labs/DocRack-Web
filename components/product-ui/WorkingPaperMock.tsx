/**
 * The working paper as delivered output (§10.8, §7): scope, population,
 * procedure, results and the version metadata that makes it re-performable.
 */

const REGISTER: { ref: string; issue: string; severity: string }[] = [
  { ref: 'INV-4471', issue: 'Quantity mismatch against GRN', severity: 'High' },
  { ref: 'INV-4462', issue: 'GRN not found for invoice', severity: 'Medium' },
  { ref: 'INV-4455', issue: 'Approval above authority limit', severity: 'High' },
  { ref: 'INV-4402', issue: 'Duplicate invoice number', severity: 'Medium' },
];

const SUMMARY: { label: string; value: string }[] = [
  { label: 'Population', value: '4,182 invoices · FY25 Q3' },
  { label: 'Tested', value: '4,182 (100% of configured population)' },
  { label: 'Passed', value: '4,131' },
  { label: 'Exceptions', value: '37 confirmed · 14 resolved' },
];

export function WorkingPaperMock() {
  return (
    <div className="flex h-full w-full flex-col bg-canvas text-caption tabular-nums">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5">
        <span className="font-medium text-ink">WP-3.2 Three-way invoice match</span>
        <span className="hidden text-muted sm:inline">Excel · PDF</span>
      </div>

      <div className="flex-1 overflow-hidden p-3.5">
        <div className="rounded border border-line bg-surface">
          {SUMMARY.map((row, index) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-3 px-3 py-2 ${
                index > 0 ? 'border-t border-line' : ''
              }`}
            >
              <span className="text-muted">{row.label}</span>
              {/* Prose with a number in it — Inter with tabular figures. Mono
                  is reserved for strings a user could copy elsewhere. */}
              <span className="text-ink">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Exception register — §7 lists it as part of the output, and it
            fills the paper the way the real document would. */}
        <div className="mt-3">
          <span className="text-muted">Exception register</span>
          <div className="mt-1.5 overflow-hidden rounded border border-line bg-surface">
            {REGISTER.map((row, index) => (
              <div
                key={row.ref}
                className={`flex items-center gap-3 px-3 py-1.5 ${
                  index > 0 ? 'border-t border-line' : ''
                }`}
              >
                <span className="w-[64px] shrink-0 font-mono text-ink">{row.ref}</span>
                <span className="min-w-0 flex-1 truncate text-muted">{row.issue}</span>
                <span className="shrink-0 text-muted">{row.severity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-[2px] bg-neutral-200" />
          <div className="h-1.5 w-2/3 rounded-[2px] bg-neutral-200" />
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-t border-line bg-surface px-4 py-2.5 text-muted">
        <span>Recipe v2.1</span>
        <span aria-hidden="true">·</span>
        <span>Inputs frozen 12 Aug 2026</span>
        <span aria-hidden="true">·</span>
        <span>Reviewed by A. Nair</span>
      </div>
    </div>
  );
}
