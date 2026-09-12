import { useCallback, useRef, useState } from 'react';

/**
 * The state machine behind every stepped or tabbed set on the site.
 *
 * WorkflowSection and UseCasesSection shipped with the same keyboard handler
 * copied between them, and the copy in UseCasesSection declared
 * `aria-orientation="vertical"` while binding only ArrowLeft/ArrowRight — which
 * WAI-ARIA APG does not allow, and which axe cannot see because it is
 * behavioural. One implementation fixes it in both places.
 *
 * Deliberately headless. Tabs ("several alternatives, pick one") and steps
 * ("an ordered sequence") need different roles, activation models and live
 * regions, so they must not share a shell — but the index arithmetic and the
 * key bindings are genuinely identical, and that is all this owns.
 *
 * No 'use client' directive: this has no JSX and no module side effects, so it
 * simply joins the client graph of whichever client component imports it.
 */

export interface StepSequenceOptions {
  /**
   * Arrow keys wrap past the ends. True for tabs, per APG. False for steppers,
   * where jumping from the last step back to the first misrepresents a
   * sequence as a loop.
   */
  wrap?: boolean;
  /**
   * Which arrow keys move the selection. `both` accepts all four, which is what
   * a rail that is horizontal at one breakpoint and vertical at another needs.
   */
  orientation?: 'horizontal' | 'vertical' | 'both';
  /** Runs after a keyboard move. Used to follow the selection with focus. */
  onMove?: (_index: number) => void;
}

export interface StepSequence {
  index: number;
  count: number;
  isFirst: boolean;
  isLast: boolean;
  /** +1 when the last move went forward, -1 when it went back. +1 initially. */
  direction: 1 | -1;
  /**
   * False until the user has actually moved. Every animation is gated on this,
   * so nothing animates on mount — which is what keeps scroll-triggered
   * fade-up impossible by construction, and makes a late-arriving motion chunk
   * harmless.
   */
  hasMoved: boolean;
  goTo: (_next: number) => void;
  next: () => void;
  prev: () => void;
  handleKeyDown: (_event: React.KeyboardEvent) => void;
}

const FORWARD_KEYS: Record<NonNullable<StepSequenceOptions['orientation']>, string[]> = {
  horizontal: ['ArrowRight'],
  vertical: ['ArrowDown'],
  both: ['ArrowRight', 'ArrowDown'],
};

const BACKWARD_KEYS: Record<NonNullable<StepSequenceOptions['orientation']>, string[]> = {
  horizontal: ['ArrowLeft'],
  vertical: ['ArrowUp'],
  both: ['ArrowLeft', 'ArrowUp'],
};

export function useStepSequence(count: number, options: StepSequenceOptions = {}): StepSequence {
  const { wrap = false, orientation = 'horizontal', onMove } = options;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hasMoved, setHasMoved] = useState(false);

  // Read through a ref so the callbacks below stay referentially stable and
  // do not re-create the key handler on every step change.
  const indexRef = useRef(index);

  const goTo = useCallback(
    (next: number) => {
      const current = indexRef.current;
      if (next === current || next < 0 || next >= count) return;

      indexRef.current = next;
      setDirection(next > current ? 1 : -1);
      setIndex(next);
      setHasMoved(true);
    },
    [count]
  );

  const step = useCallback(
    (delta: 1 | -1) => {
      const last = count - 1;
      const raw = indexRef.current + delta;
      const next = wrap
        ? raw < 0
          ? last
          : raw > last
            ? 0
            : raw
        : Math.min(Math.max(raw, 0), last);
      goTo(next);
      return next;
    },
    [count, goTo, wrap]
  );

  const next = useCallback(() => void step(1), [step]);
  const prev = useCallback(() => void step(-1), [step]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      let target: number | null = null;

      if (FORWARD_KEYS[orientation].includes(event.key)) target = step(1);
      else if (BACKWARD_KEYS[orientation].includes(event.key)) target = step(-1);
      else if (event.key === 'Home') {
        goTo(0);
        target = 0;
      } else if (event.key === 'End') {
        goTo(count - 1);
        target = count - 1;
      }

      if (target === null) return;
      event.preventDefault();
      onMove?.(target);
    },
    [count, goTo, onMove, orientation, step]
  );

  return {
    index,
    count,
    isFirst: index === 0,
    isLast: index === count - 1,
    direction,
    hasMoved,
    goTo,
    next,
    prev,
    handleKeyDown,
  };
}
