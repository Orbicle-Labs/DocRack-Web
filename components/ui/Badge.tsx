import React from 'react';
import { cn } from '@/lib/utils';

// Tints are literal rgba rather than `bg-brand/10`: the colour tokens are
// var()-based, and Tailwind's opacity modifier can't decompose a var().
const TONES = {
  neutral: 'bg-canvas text-muted border-line',
  brand: 'bg-[rgba(40,85,217,0.07)] text-brand border-[rgba(40,85,217,0.22)]',
  success: 'bg-[rgba(22,132,74,0.09)] text-success border-[rgba(22,132,74,0.25)]',
  warning: 'bg-[rgba(199,123,0,0.10)] text-warning border-[rgba(199,123,0,0.25)]',
  danger: 'bg-[rgba(199,56,66,0.08)] text-danger border-[rgba(199,56,66,0.25)]',
} as const;

const SIZES = {
  sm: 'h-5 px-1.5 text-[11px] gap-1',
  md: 'h-6 px-2 text-xs gap-1.5',
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof TONES;
  size?: keyof typeof SIZES;
}

export function Badge({ tone = 'neutral', size = 'md', className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium leading-none',
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
