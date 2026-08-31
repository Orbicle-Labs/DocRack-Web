import React from 'react';
import { cn } from '@/lib/utils';

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  /** `rule` adds an accent bar above the label. Reserve it for sections that
   *  open a new argument — if every section has one it stops meaning anything. */
  variant?: 'plain' | 'rule';
}

/**
 * Small label above a section heading. Uses `text-accent`, not `text-brand`,
 * so it follows the Section tone and needs no `text-white` override on ink.
 *
 * Not every section takes an eyebrow — the hero, trust strip, stated claim
 * and closing CTA deliberately have none.
 */
export function Eyebrow({
  as: Tag = 'p',
  variant = 'plain',
  className,
  children,
  ...rest
}: EyebrowProps) {
  return (
    <Tag className={cn('text-label uppercase text-accent', 'mb-3 sm:mb-4', className)} {...rest}>
      {variant === 'rule' && <span aria-hidden="true" className="mb-3 block h-0.5 w-5 bg-accent" />}
      {children}
    </Tag>
  );
}
