import React from 'react';
import { cn } from '@/lib/utils';
import { Container, type ContainerProps } from './Container';

/**
 * Tone owns background AND foreground together, via the `.tone-*` classes in
 * globals.css. Setting a dark background without also flipping text, borders,
 * muted and focus is how a section ends up with per-page hard-coded colours —
 * and how a nested light surface silently drops below AA.
 */
const TONES = {
  surface: 'tone-light bg-surface text-ink',
  canvas: 'tone-light bg-canvas text-ink',
  ink: 'tone-ink bg-ink-grad text-white',
  'ink-flat': 'tone-ink bg-ink text-white',
} as const;

/**
 * Spacing is a rhetorical device, not a default. A reader should feel where an
 * argument begins from the whitespace alone — uniform padding makes every
 * section equally important, which means none of them are.
 */
const SPACING = {
  none: '',
  strip: 'py-7 sm:py-9', // a rest: trust marks, stat band
  quiet: 'py-10 sm:py-14', // one statement, no heading
  tight: 'py-14 sm:py-[4.5rem]', // continues the previous section's thought
  default: 'py-[4.5rem] sm:py-24',
  open: 'py-24 sm:py-32', // begins a new argument
  finale: 'py-28 sm:py-40', // the closing invitation
} as const;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: keyof typeof TONES;
  spacing?: keyof typeof SPACING;
  as?: React.ElementType;
  containerSize?: ContainerProps['size'];
  /** Soft top boundary. `hairline` fades at both ends; `rule` is a full line. */
  edge?: 'none' | 'hairline' | 'rule';
  /** Opt out of the inner Container when a child needs full-bleed width. */
  bleed?: boolean;
  /** `clip` (never `hidden`) for sections whose content extends past the
   *  container — `hidden` would create a scroll container and break the
   *  sticky header's containing block. */
  clip?: boolean;
}

export function Section({
  tone = 'surface',
  spacing = 'default',
  as: Tag = 'section',
  containerSize,
  edge = 'none',
  bleed = false,
  clip = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        'relative',
        TONES[tone],
        SPACING[spacing],
        clip && 'overflow-x-clip',
        edge === 'rule' && 'border-t border-line',
        className
      )}
      {...rest}
    >
      {edge === 'hairline' && (
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-hairline" />
      )}
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </Tag>
  );
}
