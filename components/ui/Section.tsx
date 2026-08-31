import React from 'react';
import { cn } from '@/lib/utils';
import { Container, type ContainerProps } from './Container';

/**
 * Tone owns background AND foreground together. Setting a dark background
 * without also flipping text and border colours is the single most common way
 * a section ends up with per-page hard-coded styling, so the pairing lives
 * here and pages only choose a name.
 *
 * `ink` additionally redefines the border/muted custom properties for its
 * subtree, so `border-line` and `text-muted` stay legible on dark without any
 * child needing to know what tone it sits in.
 */
const TONES = {
  surface: 'bg-surface text-ink',
  canvas: 'bg-canvas text-ink',
  ink: 'bg-ink text-white [--color-border:#2a3140] [--color-border-strong:#3d4557] [--color-muted:#9aa3b4]',
} as const;

const SPACING = {
  none: '',
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-24 sm:py-32',
} as const;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: keyof typeof TONES;
  spacing?: keyof typeof SPACING;
  as?: React.ElementType;
  containerSize?: ContainerProps['size'];
  /** Opt out of the inner Container when a child needs full-bleed width. */
  bleed?: boolean;
}

export function Section({
  tone = 'surface',
  spacing = 'md',
  as: Tag = 'section',
  containerSize,
  bleed = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag className={cn(TONES[tone], SPACING[spacing], className)} {...rest}>
      {bleed ? children : <Container size={containerSize}>{children}</Container>}
    </Tag>
  );
}
