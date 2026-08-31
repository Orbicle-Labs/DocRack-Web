import React from 'react';
import { cn } from '@/lib/utils';

const SIZES = {
  narrow: 'max-w-3xl',
  default: 'max-w-content',
  wide: 'max-w-[1440px]',
} as const;

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  size?: keyof typeof SIZES;
  as?: React.ElementType;
}

/** Horizontal gutter + max width. The only place page width is decided. */
export function Container({
  size = 'default',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', SIZES[size], className)} {...rest}>
      {children}
    </Tag>
  );
}
