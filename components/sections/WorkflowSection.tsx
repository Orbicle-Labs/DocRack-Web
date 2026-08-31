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
    <Section tone="surface" spacing="open" id="workflow">
      <div>
        <Eyebrow variant="rule">{workflow.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-[26ch]">
          {workflow.heading}
        </Heading>
      </div>

      {/* Step rail. Buttons, not links — this switches a panel in place. */}
      {/* A segmented track, not six filled pills. Six brand-blue pills were the
          heaviest element on the page and they are chrome, not content. The
          hairline behind the track makes the six read as a sequence rather
          than as six unrelated options. */}
      <div className="relative mt-10 overflow-x-auto pb-1">
        <div
          role="tablist"
          aria-label="Workflow steps"
          onKeyDown={onKeyDown}
          className="relative flex min-w-max gap-1 rounded-[11px] bg-neutral-100 p-1"
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
                'flex items-center gap-2 rounded-[8px] px-3.5 py-2 text-body-sm',
                'transition-[background-color,box-shadow,color] duration-fast ease-out',
                index === active
                  ? 'bg-surface font-medium text-ink shadow-1'
                  : 'text-muted hover:text-ink'
              )}
            >
              <span className="text-label tabular-nums text-muted">
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
        className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-x-6"
      >
        <div className="min-w-0 lg:col-span-4">
          <Heading level={3}>{step.title}</Heading>
          <p className="mt-3 text-body-lg text-ink">{step.summary}</p>
          <p className="mt-3 max-w-[46ch] text-body-sm text-muted">{step.detail}</p>
        </div>
        <div className="min-w-0 lg:col-start-6 lg:col-span-7">
          {/* aspect="auto": these mocks vary in height and a fixed ratio leaves
              dead space under the shorter ones. A min-height on the panel keeps
              the layout from jumping as tabs change. */}
          <ProductFrame
            aspect="auto"
            minHeight="min-h-[340px]"
            caption={visual.caption}
            breadcrumb={`Engagement / P2P Q3 FY26 · ${step.title}`}
          >
            {visual.node}
          </ProductFrame>
        </div>
      </div>
    </Section>
  );
}
