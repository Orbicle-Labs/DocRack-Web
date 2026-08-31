'use client';

import { useState } from 'react';
import { Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { DocumentIntakeMock } from '@/components/product-ui/DocumentIntakeMock';
import { FindingMock } from '@/components/product-ui/FindingMock';
import { RecipeCard } from '@/components/product-ui/RecipeCard';
import { ReviewQueueMock } from '@/components/product-ui/ReviewQueueMock';
import { WorkingPaperMock } from '@/components/product-ui/WorkingPaperMock';
import { workflow } from '@/lib/content/homepage';
import { cn } from '@/lib/utils';

/** Which mock illustrates each step. */
const VISUALS: Record<string, { node: React.ReactNode; caption: string }> = {
  documents: { node: <DocumentIntakeMock />, caption: 'Classified inputs with extraction status' },
  recipe: { node: <RecipeCard />, caption: 'Audit Test Recipe' },
  run: { node: <ReviewQueueMock />, caption: 'Run results' },
  review: { node: <ReviewQueueMock />, caption: 'Review queue' },
  findings: { node: <FindingMock />, caption: 'Audit observation with management response' },
  'working-paper': { node: <WorkingPaperMock />, caption: 'Working paper output' },
};

export function WorkflowSection() {
  const [active, setActive] = useState(0);
  const step = workflow.steps[active];
  const visual = VISUALS[step.key];

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern — a tablist
  // that only responds to clicks is worse than no tablist role at all.
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = workflow.steps.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`workflow-tab-${workflow.steps[next].key}`)?.focus();
  }

  return (
    <Section tone="canvas" id="workflow">
      <div className="max-w-2xl">
        <Eyebrow>{workflow.eyebrow}</Eyebrow>
        <Heading level={2} balance>
          {workflow.heading}
        </Heading>
      </div>

      {/* Step rail. Buttons, not links — this switches a panel in place. */}
      <div className="mt-10 overflow-x-auto pb-1">
        <div
          role="tablist"
          aria-label="Workflow steps"
          onKeyDown={onKeyDown}
          className="flex min-w-max gap-2"
        >
          {workflow.steps.map((item, index) => (
            <button
              key={item.key}
              role="tab"
              type="button"
              id={`workflow-tab-${item.key}`}
              aria-selected={index === active}
              aria-controls={`workflow-panel-${item.key}`}
              // Roving tabindex: one stop for the whole rail, arrows move within.
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                'flex items-center gap-2 rounded-button border px-3.5 py-2 text-sm transition-colors',
                index === active
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-surface text-muted hover:border-line-strong hover:text-ink'
              )}
            >
              <span
                className={cn(
                  // white/70 on brand blue is 3.87:1 — below AA at 12px.
                  'font-mono text-xs',
                  index === active ? 'text-white/90' : 'text-muted'
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`workflow-panel-${step.key}`}
        aria-labelledby={`workflow-tab-${step.key}`}
        className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12"
      >
        <div className="lg:col-span-4">
          <Heading level={3}>{step.title}</Heading>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">{step.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
        </div>
        <div className="lg:col-span-8">
          {/* aspect="auto": these mocks vary in height and a fixed ratio leaves
              dead space under the shorter ones. A min-height on the panel keeps
              the layout from jumping as tabs change. */}
          <ProductFrame aspect="auto" minHeight="min-h-[340px]" caption={visual.caption}>
            {visual.node}
          </ProductFrame>
        </div>
      </div>
    </Section>
  );
}
