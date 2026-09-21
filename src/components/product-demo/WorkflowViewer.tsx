'use client';

import { useRef, useState, useSyncExternalStore, type ReactNode } from 'react';

import { track } from '@/lib/analytics/client';
import { steps } from '@/lib/analytics/events';

const subscribe = () => () => {};
const labels = ['Documents', 'Tests', 'Runs', 'Review', 'Findings', 'Working Papers'];

/** Only selects explanatory panels. It never changes the fixture or its approval state. */
export function WorkflowViewer({ children }: { children: ReactNode[] }) {
  const [step, setStep] = useState(3);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  function select(index: number) {
    setStep(index);
    track({ name: 'workflow_step_view', props: { stepId: steps[index] } });
  }
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="workflow-viewer">
      <div className="workflow-controls" role="tablist" aria-label="Audit workflow steps">
        {labels.map((label, index) => (
          <button
            key={label}
            ref={(node) => {
              controls.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`workflow-tab-${index}`}
            aria-controls={`workflow-panel-${index}`}
            aria-selected={step === index}
            tabIndex={step === index ? 0 : -1}
            disabled={!ready}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              const next =
                event.key === 'ArrowRight'
                  ? (index + 1) % 6
                  : event.key === 'ArrowLeft'
                    ? (index + 5) % 6
                    : event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? 5
                        : null;
              if (next === null) return;
              event.preventDefault();
              select(next);
              controls.current[next]?.focus();
            }}
          >
            <span className="caption">0{index + 1}</span>
            {label}
          </button>
        ))}
      </div>
      {children.map((child, index) => (
        <div
          key={labels[index]}
          role="tabpanel"
          id={`workflow-panel-${index}`}
          aria-labelledby={`workflow-tab-${index}`}
          tabIndex={0}
          hidden={step !== index}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
