import React from 'react';
import { cn } from '@/lib/utils';

const PADDING = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-7 sm:p-8',
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  padding?: keyof typeof PADDING;
  /** Only for cards that are themselves a link or button. */
  interactive?: boolean;
}

/**
 * Deliberately dumb — no Card.Header / Card.Body compound API. §8 warns
 * against putting every section inside a rounded card, so this stays
 * inconvenient enough that reaching for it is a decision.
 */
export function Card({
  as: Tag = 'div',
  padding = 'md',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-card border border-line bg-surface',
        PADDING[padding],
        interactive &&
          'transition-[border-color,box-shadow] duration-150 hover:border-line-strong hover:shadow-card',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
