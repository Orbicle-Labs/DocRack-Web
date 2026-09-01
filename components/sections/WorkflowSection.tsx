'use client';

import { Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { workflow } from '@/lib/content/homepage';
import { useStepSequence } from '@/lib/use-step-sequence';
import { cn } from '@/lib/utils';

/** The product screen for each step. */
const VISUALS: Record<string, { src: `/${string}`; alt: string; caption: string }> = {
  documents: {
    src: '/product/document-intake.png',
    alt: 'Documents screen listing each engagement input with its classification, owner and extraction status',
    caption: 'Inputs classified by the role they play in the test',
  },
  recipe: {
    src: '/product/recipe.png',
    alt: 'Audit Test Recipe showing objective, risk, population, required inputs, extracted fields, and rules with tolerances',
    caption: 'An approved Audit Test Recipe, version 4.2',
  },
  run: {
    src: '/product/run-progress.png',
    alt: 'A run executing against the population, showing configured-test coverage, records processed and live per-rule results',
    caption: 'A run executing against the defined population',
  },
  review: {
    src: '/product/review-queue.png',
    alt: 'Review queue showing each exception with the rule applied, expected and actual values, outcome and severity',
    caption: 'Exceptions queued with the evidence behind them',
  },
  findings: {
    src: '/product/finding.png',
    alt: 'Audit finding with condition, criteria, cause, consequence, recommendation and the management response',
    caption: 'Confirmed exceptions grouped into an observation',
  },
  'working-paper': {
    src: '/product/working-paper.png',
    alt: 'Working paper showing population and results summary, exception register, frozen input versions and sign-offs',
    caption: 'Review-ready output with frozen input versions',
  },
};

export function WorkflowSection() {
  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern — a tablist
  // that only responds to clicks is worse than no tablist role at all. `wrap`
  // is on because APG specifies it for tabs; the shared hook defaults it off
  // for steppers, where wrapping would misrepresent a sequence as a loop.
  const {
    index: active,
    goTo,
    handleKeyDown,
  } = useStepSequence(workflow.steps.length, {
    wrap: true,
    orientation: 'horizontal',
    onMove: (next) => document.getElementById(`workflow-tab-${workflow.steps[next].key}`)?.focus(),
  });

  const step = workflow.steps[active];
  const visual = VISUALS[step.key];

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
          onKeyDown={handleKeyDown}
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
              onClick={() => goTo(index)}
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

      {/* Stacked, not split. These captures are full application screens and
          §8 asks for product screens at readable sizes — a 7-of-12 column
          renders them at roughly a quarter scale, which is legible as an
          impression but not as evidence. Full width nearly doubles that. */}
      <div
        role="tabpanel"
        id={`workflow-panel-${step.key}`}
        aria-labelledby={`workflow-tab-${step.key}`}
        className="mt-10"
      >
        <div className="grid gap-x-6 gap-y-3 lg:grid-cols-12">
          <Heading level={3} className="min-w-0 lg:col-span-4">
            {step.title}
          </Heading>
          <div className="min-w-0 lg:col-start-6 lg:col-span-7">
            <p className="text-body-lg text-ink">{step.summary}</p>
            <p className="mt-3 max-w-[62ch] text-body-sm text-muted">{step.detail}</p>
          </div>
        </div>

        <div className="mt-8">
          <ProductFrame
            src={visual.src}
            alt={visual.alt}
            variant="real"
            chrome="none"
            aspect="16/10"
            sizes="(min-width: 1280px) 1160px, 92vw"
            caption={visual.caption}
          />
        </div>
      </div>
    </Section>
  );
}
