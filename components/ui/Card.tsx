import React from 'react';
import { cn } from '@/lib/utils';

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-7 sm:p-8',
} as const;

// `raised` uses the hairline shadow rather than a border, which keeps 1px out
// of the box model and lets the alpha outline stay proportional on both white
// and canvas. `inset` reads recessed — for content subordinate to a card set.
const VARIANTS = {
  raised: 'bg-surface-1 shadow-raised',
  inset: 'bg-surface-2',
  flat: 'bg-surface-1 border border-line',
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  padding?: keyof typeof PADDING;
  variant?: keyof typeof VARIANTS;
  /** Only for cards that are themselves a link or button. */
  interactive?: boolean;
}

/**
 * Deliberately dumb — no Card.Header / Card.Body compound API. §8 warns
 * against putting every section inside a rounded card, so this stays
 * inconvenient enough that reaching for it is a decision. Panel is the
 * default vocabulary; Card is for discrete objects.
 */
export function Card({
  as: Tag = 'div',
  padding = 'md',
  variant = 'raised',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        'group rounded-card',
        VARIANTS[variant],
        PADDING[padding],
        // Shadow and border only. No scale, no lift — a card grid that grows
        // on hover is a consumer-SaaS tell.
        interactive &&
          'transition-[border-color,box-shadow,color] duration-base ease-out hover:shadow-2',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
