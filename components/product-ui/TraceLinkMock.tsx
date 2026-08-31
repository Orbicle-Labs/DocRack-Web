import { OutcomeBadge } from '@/components/ui';

/**
 * One exception opened next to the evidence behind it (§10.10): the rule, the
 * two values it compared, and the document page and spreadsheet cell each
 * value came from. Phase 5 animates the link between the two panes; the
 * static state has to already show the relationship.
 */

export function TraceLinkMock() {
  return (
    <div className="flex h-full w-full flex-col bg-surface text-caption tabular-nums">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="font-mono font-medium text-ink">INV-4471</span>
        <OutcomeBadge outcome="fail" size="sm" />
      </div>

      <div className="grid flex-1 grid-cols-2 divide-x divide-line overflow-hidden">
        {/* Result pane */}
        <div className="space-y-2.5 p-3.5">
          <div>
            <span className="block text-muted">Rule applied</span>
            <span className="mt-0.5 block font-mono text-ink">Invoice qty = GRN qty</span>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="block text-muted">Expected</span>
              <span className="mt-0.5 block font-mono text-ink">120</span>
            </div>
            <div>
              <span className="block text-muted">Actual</span>
              <span className="mt-0.5 block font-mono text-danger">132</span>
            </div>
          </div>
          <div className="border-t border-line pt-2.5">
            <span className="block text-muted">Reviewer</span>
            <span className="mt-0.5 block text-ink">Confirmed · 12 Aug, 14:22</span>
          </div>
        </div>

        {/* Evidence pane */}
        <div className="flex flex-col bg-canvas">
          <div className="shrink-0 border-b border-line px-3.5 py-2 text-muted">
            invoice-4471.pdf · page 2
          </div>
          {/* Squared bars, not rounded-full: rounded bars read as a wireframe,
              squared ones read as redacted body text. */}
          <div className="flex flex-1 flex-col gap-2 p-3.5">
            <div className="h-1.5 w-3/4 rounded-[2px] bg-neutral-200" />
            <div className="h-1.5 w-2/3 rounded-[2px] bg-neutral-200" />
            <div className="flex items-center gap-2 rounded border border-danger bg-surface px-2 py-1">
              <span className="text-muted">Qty</span>
              <span className="font-mono text-ink">132</span>
            </div>
            <div className="h-1.5 w-1/2 rounded-[2px] bg-neutral-200" />
            <div className="h-1.5 w-3/5 rounded-[2px] bg-neutral-200" />
          </div>
          <div className="shrink-0 border-t border-line px-3.5 py-2 text-muted">
            grn-register.xlsx · <span className="font-mono">D412</span>
          </div>
        </div>
      </div>
    </div>
  );
}
