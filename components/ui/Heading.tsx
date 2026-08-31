import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Sizes per §8: H1 56–72px desktop / 40–48px mobile, H2 40–52px desktop.
 * `display` is the hero; it is deliberately at the lower end of the range so
 * the primary CTA still clears the fold at 1366×768.
 */
const SIZES = {
  display: 'text-[40px] leading-[1.08] sm:text-[52px] lg:text-[60px]',
  h1: 'text-[36px] leading-[1.1] sm:text-[44px] lg:text-[52px]',
  h2: 'text-[30px] leading-[1.15] sm:text-[36px] lg:text-[42px]',
  h3: 'text-[22px] leading-[1.25] sm:text-[26px]',
  h4: 'text-lg leading-[1.35] sm:text-xl',
} as const;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level — kept separate from `size` so visual weight never forces
   *  a heading-order violation. */
  level: 1 | 2 | 3 | 4;
  size?: keyof typeof SIZES;
  balance?: boolean;
}

export function Heading({
  level,
  size,
  balance = false,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const resolved = size ?? (`h${level}` as keyof typeof SIZES);

  return (
    <Tag
      className={cn(
        'font-semibold tracking-[-0.022em] text-current',
        SIZES[resolved],
        balance && '[text-wrap:balance]',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
