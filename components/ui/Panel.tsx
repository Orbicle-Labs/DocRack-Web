import React from 'react';
import { cn } from '@/lib/utils';

// A grouped region that is part of the page, rather than a discrete object
// sitting on it. This is the default vocabulary — §8 warns against putting
// every section inside a rounded card, and Panel is what you reach for
// instead. Three variants so panel-heavy pages don't read as one repeated
// pattern.
const VARIANTS = {
  /** Neutral. The workhorse. */
  rule: 'border-t border-line pt-5',
  /** Marks the primary item in a set — use on the first item only. */
  accent: 'border-t-2 border-accent pt-5',
  /** Recessed rather than raised, for content subordinate to a card set. */
  inset: 'rounded-card bg-surface-2 p-5',
} as const;

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: keyof typeof VARIANTS;
}

export function Panel({
  as: Tag = 'div',
  variant = 'rule',
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <Tag className={cn(VARIANTS[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
