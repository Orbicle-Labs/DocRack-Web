'use client';

import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { OutcomeBadge, Panel, type Outcome } from '@/components/ui';
import { handoffChips, handoffLanes, handoffSeal } from '@/lib/content/motion';
import { useExplainer } from './ExplainerSequence';
import { cn } from '@/lib/utils';

/**
 * The one place a §8 explainer needs motion the screenshots cannot carry.
 *
 * "Moving reviewed exceptions into a working paper" is about movement, and no
 * single capture shows it — the review queue and the working paper are two
 * different screens. Drawing travelling chips on top of either one would mean
 * adding product interface that is not in the capture, to a frame declared
 * `variant="real"`. §16 forbids that, and audit buyers are exactly the readers
 * who would notice.
 *
 * So this is visibly a diagram: site primitives, site type, below the frame
 * rather than on it. It illustrates the site's claim; it does not impersonate
 * the product.
 */
export function ExceptionHandoff() {
  const { index, animate, transition } = useExplainer();

  // Steps 0-3 map onto three lanes; the last two steps both sit in the paper,
  // because "written into the register" and "frozen and signed" are the same
  // destination at two levels of detail.
  const lane = Math.min(index, handoffLanes.length - 1);
  const sealed = index === 3;

  return (
    <div className="mt-8">
      <Panel variant="inset">
        <p className="text-label uppercase text-muted">The same three exceptions, end to end</p>

        <ol className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-2">
          {handoffLanes.map((column, i) => {
            const active = i === lane;
            const passed = i < lane;

            return (
              <li key={column.key} className="min-w-0">
                <div
                  className={cn(
                    'flex h-full min-w-0 flex-col rounded-card border p-3.5',
                    'transition-[background-color,border-color] duration-base ease-out',
                    active
                      ? 'border-line-interactive bg-surface-1'
                      : 'border-line border-dashed bg-transparent'
                  )}
                >
                  <div className="flex min-w-0 items-baseline gap-2">
                    <span className="font-mono text-mono-xs tabular-nums text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'min-w-0 break-words text-body-sm font-medium',
                        active ? 'text-ink' : 'text-muted'
                      )}
                    >
                      {column.label}
                    </span>
                  </div>
                  <p className="mt-1 text-caption text-muted">{column.meta}</p>

                  {/* The height reservation stops the lanes resizing as chips
                      move between them — but only matters at sm and up, where
                      the three share a grid row. Stacked below sm it would add
                      two screens of empty box. */}
                  <div className="mt-3 space-y-1.5 sm:min-h-[7.5rem]">
                    {active
                      ? handoffChips.map((chip, chipIndex) => (
                          <m.div
                            // Keyed by lane so the chips remount as the
                            // sequence advances, which is what makes them read
                            // as arriving rather than as a list re-rendering.
                            key={`${column.key}-${chip.ref}`}
                            className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 rounded-button bg-surface-2 px-2.5 py-1.5"
                            initial={animate ? { opacity: 0, x: -12 } : false}
                            animate={{ opacity: 1, x: 0 }}
                            transition={
                              animate ? { ...transition, delay: chipIndex * 0.04 } : { duration: 0 }
                            }
                          >
                            <span className="font-mono text-mono-xs tabular-nums text-ink">
                              {chip.ref}
                            </span>
                            <OutcomeBadge outcome={chip.outcome as Outcome} size="sm" />
                            <span className="min-w-0 basis-full text-caption text-muted">
                              {chip.note}
                            </span>
                          </m.div>
                        ))
                      : passed && <p className="text-caption text-muted">Handed on</p>}
                  </div>

                  {i === handoffLanes.length - 1 && (
                    <m.p
                      className="mt-2 font-mono text-mono-xs text-muted"
                      // Height is already reserved by min-h above, so fading
                      // this in cannot move anything around it.
                      initial={false}
                      animate={{ opacity: sealed ? 1 : 0 }}
                      transition={animate ? transition : { duration: 0 }}
                    >
                      {handoffSeal}
                    </m.p>
                  )}
                </div>

                {/* Direction, drawn once per gap. Decorative: the ordered list
                    and the lane numbers already carry the sequence. */}
                {i < handoffLanes.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mt-1 flex justify-center text-muted sm:hidden"
                  >
                    <ArrowRight size={15} className="rotate-90" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Panel>
    </div>
  );
}
