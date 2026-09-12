import React from 'react';
import { cn } from '@/lib/utils';

// Tints come from the literal-hex ramp, not opacity modifiers — see the
// roles-vs-pigments note in tailwind.config.js. Foregrounds use the *-strong
// variants, which clear AA against these tints; the base success/warning
// values do not. `accent` follows the Section tone, so it stays legible on ink.
const TONES = {
  neutral: 'bg-surface-2 text-muted border-line',
  brand: 'bg-brand-150 text-brand border-brand-300',
  accent: 'bg-transparent text-accent border-line-interactive',
  success: 'bg-success-100 text-success-strong border-success-300',
  warning: 'bg-warning-100 text-warning-strong border-warning-300',
  danger: 'bg-danger-100 text-danger-strong border-danger-300',
} as const;

const SIZES = {
  sm: 'h-5 px-1.5 text-mono-xs gap-1',
  md: 'h-6 px-2 text-caption gap-1.5',
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
}

export function Badge({ tone = 'neutral', size = 'md', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        // whitespace-nowrap: a wrapped label breaks out of the pill shape,
        // which is worse than letting a long badge be wide.
        'inline-flex items-center whitespace-nowrap rounded-full border font-medium leading-none',
        TONES[tone],
        SIZES[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

/**
 * The five possible test outcomes (§10.11). Defined once so the colour of
 * "Insufficient evidence" is identical on every page — auditors read these as
 * status, and an inconsistent mapping reads as a defect.
 *
 * Note "Insufficient evidence" is warning, not danger: §10.11 requires that
 * DocRack never silently presents missing evidence as a failed control.
 */
const OUTCOMES = {
  pass: { label: 'Pass', tone: 'success' },
  fail: { label: 'Fail', tone: 'danger' },
  insufficient: { label: 'Insufficient evidence', tone: 'warning' },
  review: { label: 'Needs human review', tone: 'brand' },
  na: { label: 'Not applicable', tone: 'neutral' },
} as const satisfies Record<string, { label: string; tone: BadgeProps['tone'] }>;

export type Outcome = keyof typeof OUTCOMES;

export interface OutcomeBadgeProps extends Omit<BadgeProps, 'tone' | 'children'> {
  outcome: Outcome;
  /** Override the canonical label (e.g. a shortened form in a dense table). */
  label?: string;
}

export function OutcomeBadge({ outcome, label, ...rest }: OutcomeBadgeProps) {
  const { label: defaultLabel, tone } = OUTCOMES[outcome];
  return (
    <Badge tone={tone} {...rest}>
      {label ?? defaultLabel}
    </Badge>
  );
}

export const OUTCOME_LIST = Object.entries(OUTCOMES).map(([key, value]) => ({
  outcome: key as Outcome,
  ...value,
}));
