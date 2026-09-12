import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Sizes carry their own line-height, tracking and weight (see the `fontSize`
 * block in tailwind.config.js). Each is a clamp() so one class spans every
 * breakpoint — there are no responsive size classes here by design.
 *
 * `display` tops out at 60px, inside §8's 56–72 range and low enough that the
 * primary CTA still clears the fold at 1366×768.
 */
const SIZES = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
} as const;

/** Large type is where a ragged last line reads as a mistake. */
const BALANCE_BY_DEFAULT: (keyof typeof SIZES)[] = ['display', 'h1', 'h2'];

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level — kept separate from `size` so visual weight never forces
   *  a heading-order violation. */
  level: 1 | 2 | 3 | 4;
  size?: keyof typeof SIZES;
  /** Defaults to true at display/h1/h2. Pass false to opt out. */
  balance?: boolean;
}

export function Heading({ level, size, balance, className, children, ...rest }: HeadingProps) {
  const Tag = `h${level}` as const;
  const resolved = size ?? (`h${level}` as keyof typeof SIZES);
  const wrapBalanced = balance ?? BALANCE_BY_DEFAULT.includes(resolved);

  return (
    <Tag
      className={cn(
        'text-current',
        SIZES[resolved],
        wrapBalanced && '[text-wrap:balance]',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
