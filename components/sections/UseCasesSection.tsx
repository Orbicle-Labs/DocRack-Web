'use client';

import { useState } from 'react';
import { Badge, Eyebrow, Heading, Section } from '@/components/ui';
import { useCases } from '@/lib/content/use-cases';
import { cn } from '@/lib/utils';

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
    <Section tone="surface">
      <div className="max-w-2xl">
        <Eyebrow>Use cases</Eyebrow>
        <Heading level={2} balance>
          Four procedures teams configure first.
        </Heading>
      </div>

      <div className="mt-8 overflow-x-auto pb-1">
        <div
          role="tablist"
          aria-label="Use cases"
          onKeyDown={onKeyDown}
          className="flex min-w-max gap-1 border-b border-line"
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
                '-mb-px border-b-2 px-3.5 py-2.5 text-sm transition-colors',
                index === active
                  ? 'border-brand font-medium text-ink'
                  : 'border-transparent text-muted hover:text-ink'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`use-case-panel-${useCase.key}`}
        aria-labelledby={`use-case-tab-${useCase.key}`}
        className="mt-8"
      >
        <Heading level={3}>{useCase.title}</Heading>

        <div className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.09em] text-muted">Inputs</h4>
            <ul className="mt-3 space-y-1.5">
              {useCase.inputs.map((input) => (
                <li key={input} className="text-sm text-ink">
                  {input}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.09em] text-muted">
              Procedure
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-ink">{useCase.procedure}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.09em] text-muted">
              Example exceptions
            </h4>
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

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.09em] text-muted">Output</h4>
            <p className="mt-3 text-sm leading-relaxed text-ink">{useCase.output}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
