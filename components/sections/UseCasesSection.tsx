'use client';

import React, { useState } from 'react';
import { Badge, Eyebrow, Heading, Section } from '@/components/ui';
import { useCases, useCasesSection } from '@/lib/content/use-cases';
import { cn } from '@/lib/utils';

/** One definition rather than the same class string repeated per column. */
function ColumnHead({ children }: { children: React.ReactNode }) {
  return <h4 className="text-label uppercase text-muted">{children}</h4>;
}

export function UseCasesSection() {
  const [active, setActive] = useState(0);
  const useCase = useCases[active];

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = useCases.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    else if (event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`use-case-tab-${useCases[next].key}`)?.focus();
  }

  return (
    <Section tone="canvas">
      <div>
        <Eyebrow>{useCasesSection.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-[26ch]">
          {useCasesSection.heading}
        </Heading>
      </div>

      {/* A left rail at lg, not a second horizontal tab row: these are
          alternatives, not steps, and the workflow section already owns the
          segmented-track pattern. Below lg it falls back to a tab row. */}
      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-x-6">
        {/* min-w-0 is load-bearing: a grid item defaults to min-width:auto, so
            the `min-w-max` tab row inside would otherwise widen the whole
            track and scroll the page. */}
        <div className="min-w-0 lg:col-span-3">
          <div className="overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
            <div
              role="tablist"
              aria-label="Use cases"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="flex min-w-max gap-1 border-b border-line lg:min-w-0 lg:flex-col lg:gap-0 lg:border-b-0"
            >
              {useCases.map((item, index) => (
                <button
                  key={item.key}
                  role="tab"
                  type="button"
                  id={`use-case-tab-${item.key}`}
                  aria-selected={index === active}
                  aria-controls={`use-case-panel-${item.key}`}
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={cn(
                    'px-3.5 py-2.5 text-body-sm transition-[background-color,border-color,color] duration-fast ease-out',
                    '-mb-px border-b-2 lg:mb-0 lg:border-b-0 lg:border-l-2 lg:text-left',
                    index === active
                      ? 'border-accent font-medium text-ink lg:bg-surface-2'
                      : 'border-transparent text-muted hover:text-ink lg:border-line lg:hover:border-line-strong'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          role="tabpanel"
          id={`use-case-panel-${useCase.key}`}
          aria-labelledby={`use-case-tab-${useCase.key}`}
          className="min-w-0 lg:col-start-5 lg:col-span-8"
        >
          <Heading level={3}>{useCase.title}</Heading>

          <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-3">
            <div>
              <ColumnHead>Inputs</ColumnHead>
              <ul className="mt-3 space-y-1.5">
                {useCase.inputs.map((input) => (
                  <li key={input} className="text-body-sm text-ink">
                    {input}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHead>Procedure</ColumnHead>
              <p className="mt-3 text-body-sm text-ink">{useCase.procedure}</p>
            </div>

            <div>
              <ColumnHead>Output</ColumnHead>
              <p className="mt-3 text-body-sm text-ink">{useCase.output}</p>
            </div>
          </div>

          {/* Exceptions get a full-width row rather than a cramped quarter
            column — they are the most concrete thing on the panel and the
            closest this section has to a visual anchor. */}
          <div className="mt-8 border-t border-line pt-5">
            <ColumnHead>Example exceptions</ColumnHead>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {useCase.exceptions.map((exception) => (
                <li key={exception}>
                  <Badge tone="danger" size="sm">
                    {exception}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
