'use client';

import React, { createContext, useContext } from 'react';
import { LazyMotion, MotionConfig, m, useReducedMotion, type Transition } from 'framer-motion';
import {
  Button,
  Eyebrow,
  Heading,
  ProductFrame,
  Section,
  type SectionProps,
} from '@/components/ui';
import type { Explainer, ExplainerCallout } from '@/content/pages/motion';
import { useStepSequence } from '@/lib/hooks/use-step-sequence';
import { cn } from '@/lib/utils';

/**
 * Loaded on demand rather than bundled. `domAnimation` covers opacity,
 * transform, variants and gestures — everything here uses — at roughly a third
 * the weight of importing `motion.*`. It deliberately excludes layout
 * animations, which is why nothing in these explainers uses `layoutId`.
 */
const loadDomAnimation = () => import('framer-motion').then((mod) => mod.domAnimation);

/** House easing, matching --ease-out in globals.css. */
const EASE_OUT: [number, number, number, number] = [0.2, 0, 0, 1];

interface ExplainerState {
  index: number;
  count: number;
  /** +1 forward, -1 back. Drives the direction of the panel's 6px settle. */
  direction: 1 | -1;
  /** True only when motion should actually run: the user has moved, and the
   *  OS is not asking for reduced motion. Every animation is gated on it. */
  animate: boolean;
  /** Already reduce-aware. Spread into any transition. */
  transition: Transition;
}

const ExplainerContext = createContext<ExplainerState | null>(null);

/**
 * Read the sequence state from inside an `aside`. React context follows the
 * render tree, so a node created by a server component and passed in as a prop
 * still sees this provider once it hydrates.
 */
export function useExplainer(): ExplainerState {
  const state = useContext(ExplainerContext);
  if (!state) throw new Error('useExplainer must be used inside an ExplainerSequence');
  return state;
}

export interface ExplainerSequenceProps {
  explainer: Explainer;
  /** Ink is not offered: ProductFrame forces `tone-light` inside the frame, so
   *  a callout drawn there would resolve light-tone vars against a dark section. */
  tone?: 'surface' | 'canvas';
  spacing?: SectionProps['spacing'];
  /** Rendered below the frame, inside the provider. For motion that must not
   *  sit on a real screenshot. */
  aside?: React.ReactNode;
}

function Callout({ callout, label }: { callout: ExplainerCallout; label: string }) {
  const { left, top, width, height, labelAt = 'below-left' } = callout;
  const [vertical, horizontal] = labelAt.split('-') as ['below' | 'above', 'left' | 'right'];

  const chipStyle: React.CSSProperties =
    horizontal === 'left'
      ? { left: `${left}%`, maxWidth: `calc(${100 - left}% - 8px)` }
      : { right: `${100 - left - width}%`, maxWidth: `calc(${left + width}% - 8px)` };

  if (vertical === 'below') chipStyle.top = `calc(${top + height}% + 8px)`;
  else chipStyle.bottom = `calc(${100 - top}% + 8px)`;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Scrim and ring in one element: a 9999px box-shadow spread darkens
          everything outside the highlighted rect, clipped by the frame. That
          guarantees the white ring always sits on a known dark backdrop, so it
          clears WCAG 1.4.11 by construction — axe reports graphics over an
          <img> as `incomplete`, never as a violation, so it cannot be relied
          on to catch this. Worst case (pure white screenshot) is 4.76:1. */}
      <div
        className="absolute rounded-[4px] border-2 border-white"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          boxShadow: '0 0 0 9999px rgba(16, 20, 28, 0.62)',
        }}
      />

      {/* Hidden below sm: at 320 a floating chip is the likeliest cause of
          horizontal overflow, and the panel body already says the same thing. */}
      <span
        className="absolute hidden max-w-[32ch] rounded-button bg-ink-900 px-2 py-1 text-caption font-medium text-white shadow-2 sm:block"
        style={chipStyle}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * The shell for all three §8 explainers.
 *
 * A stepper, not a tablist. Tabs mean "several alternatives, pick one"; these
 * are causal sequences, and the WAI-ARIA tabs convention of *not* announcing
 * the panel on change would be exactly wrong when a Next button is the whole
 * interaction. So: an <ol> with aria-current="step", manual activation, and one
 * polite live region carrying the panel.
 */
export function ExplainerSequence({
  explainer,
  tone = 'canvas',
  spacing = 'open',
  aside,
}: ExplainerSequenceProps) {
  const { id, steps, label } = explainer;

  const { index, count, direction, hasMoved, isFirst, isLast, goTo, next, prev, handleKeyDown } =
    useStepSequence(steps.length, {
      orientation: 'both',
      onMove: (target) => document.getElementById(`${id}-step-${steps[target].key}`)?.focus(),
    });

  // `?? false` matters: useReducedMotion returns null on the server and on the
  // first client render. It may only ever touch motion props — forking JSX on
  // it would be a guaranteed hydration mismatch.
  const reduce = useReducedMotion() ?? false;
  const animate = hasMoved && !reduce;

  const transition: Transition = animate ? { duration: 0.22, ease: EASE_OUT } : { duration: 0 };

  const step = steps[index];

  return (
    <LazyMotion features={loadDomAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ExplainerContext.Provider value={{ index, count, direction, animate, transition }}>
          <Section tone={tone} spacing={spacing} id={id} clip>
            <div className="max-w-[46rem]">
              <Eyebrow variant="rule">{explainer.eyebrow}</Eyebrow>
              <Heading level={2} className="max-w-[26ch]">
                {explainer.heading}
              </Heading>
              <p className="mt-5 text-body-lg text-muted">{explainer.intro}</p>
            </div>

            {/* min-w-0 is load-bearing: without it the min-w-max track inside
                widens its ancestor and scrolls the whole page at 320. */}
            <div className="mt-10 min-w-0 overflow-x-auto pb-1">
              <ol
                aria-label={`${label} — steps`}
                onKeyDown={handleKeyDown}
                className="flex min-w-max gap-1 rounded-[11px] bg-neutral-100 p-1"
              >
                {steps.map((item, i) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      id={`${id}-step-${item.key}`}
                      aria-current={i === index ? 'step' : undefined}
                      onClick={() => goTo(i)}
                      className={cn(
                        'flex items-center gap-2 rounded-[8px] px-3.5 py-2 text-body-sm',
                        // Colour only. No transform on the rail — a press
                        // transform here would need the u-press escape hatch
                        // that only Button carries.
                        'transition-[background-color,box-shadow,color] duration-fast ease-out',
                        i === index
                          ? 'bg-surface font-medium text-ink shadow-1'
                          : 'text-muted hover:text-ink'
                      )}
                    >
                      <span className="text-label tabular-nums text-muted">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Two children, one grid cell. The sizer holds every step this
                panel is NOT currently showing, so the track is always as tall
                as the tallest step — no reflow on step change — and every
                step's copy is in the server HTML, legible with JS off and to a
                crawler. Nothing here is reachable only by animating. */}
            <div className="mt-9 grid">
              {/* A grid in its own right, so the steps stack in ONE cell and
                  reserve the tallest, rather than summing to the height of all
                  of them. The active step is skipped: the live panel below
                  already occupies the same cell, so the track still resolves to
                  the maximum over every step, without duplicating its copy. */}
              <div
                aria-hidden="true"
                className="pointer-events-none invisible col-start-1 row-start-1 grid"
              >
                {steps.map((item, i) =>
                  i === index ? null : (
                    <div key={item.key} className="col-start-1 row-start-1">
                      <h3 className="text-h3">{item.title}</h3>
                      <p className="mt-3 max-w-prose text-body">{item.body}</p>
                    </div>
                  )
                )}
              </div>

              <m.div
                key={step.key}
                aria-live="polite"
                aria-atomic="true"
                className="col-start-1 row-start-1"
                initial={animate ? { opacity: 0, y: direction * 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
              >
                <span className="sr-only">{`Step ${index + 1} of ${count}: `}</span>
                <h3 className="text-h3">{step.title}</h3>
                <p className="mt-3 max-w-prose text-body text-muted">{step.body}</p>
              </m.div>
            </div>

            <div className="mt-8">
              <ProductFrame
                src={step.visual.src}
                alt={step.visual.alt}
                caption={step.visual.caption}
                variant="real"
                chrome="none"
                aspect="16/10"
                sizes="(min-width: 1280px) 1160px, 92vw"
                overlay={
                  step.callout && (
                    <m.div
                      key={`${step.key}-callout`}
                      className="absolute inset-0"
                      initial={animate ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      transition={animate ? { duration: 0.16, ease: EASE_OUT } : { duration: 0 }}
                    >
                      <Callout callout={step.callout} label={step.title} />
                    </m.div>
                  )
                }
              />
            </div>

            {aside}

            {/* aria-disabled, never the disabled attribute: a real `disabled`
                on Next blurs focus to <body> at the last step, which is a
                WCAG 2.4.3 failure axe cannot see. */}
            <div className="mt-7 flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                aria-disabled={isFirst || undefined}
                onClick={() => !isFirst && prev()}
                className="aria-disabled:cursor-default aria-disabled:border-line aria-disabled:text-muted aria-disabled:shadow-none aria-disabled:hover:bg-transparent"
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                aria-disabled={isLast || undefined}
                onClick={() => !isLast && next()}
                className="aria-disabled:cursor-default aria-disabled:border-line aria-disabled:text-muted aria-disabled:shadow-none aria-disabled:hover:bg-transparent"
              >
                Next
              </Button>
              <span className="ml-1 text-caption tabular-nums text-muted">
                Step {index + 1} of {count}
              </span>
            </div>
          </Section>
        </ExplainerContext.Provider>
      </MotionConfig>
    </LazyMotion>
  );
}
