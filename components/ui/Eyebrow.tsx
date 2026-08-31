import React from 'react';
import { cn } from '@/lib/utils';

export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
}

/**
 * Small label above a section heading. Uppercase is fine at this size and
 * length; §8 rules out all-caps paragraphs, not all-caps labels.
 */
export function Eyebrow({ as: Tag = 'p', className, children, ...rest }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'text-xs font-semibold uppercase tracking-[0.09em] text-brand',
        'mb-3 sm:mb-4',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
