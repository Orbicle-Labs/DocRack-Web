import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'v2-button-primary',
  secondary: 'v2-button-secondary',
  ghost: 'v2-button-ghost',
  link: 'v2-button-link',
};
const SIZES: Record<ButtonSize, string> = {
  sm: 'v2-button-sm',
  md: 'v2-button-md',
  lg: 'v2-button-lg',
};
const BASE = 'v2-button';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'>;

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export type ButtonProps = AnchorProps | NativeButtonProps;

function Spinner() {
  return (
    <svg
      className="h-4 w-4 shrink-0 animate-spin"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The one button in the system. Renders a next/link when `href` is set,
 * otherwise a native <button>.
 *
 * `loading` shows a spinner and disables interaction — the demo form depends
 * on it, so submit buttons never hand-roll their own busy state.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    iconLeft,
    iconRight,
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    variant === 'link' && 'h-auto px-0',
    // In flight keeps its own colour — the action is pending, not unavailable
    // — so it must not pick up the grey disabled treatment.
    loading && 'cursor-wait',
    loading && variant === 'primary' && 'disabled:bg-brand disabled:text-white disabled:shadow-key',
    loading && variant !== 'primary' && 'disabled:bg-transparent disabled:text-current',
    className
  );

  const content = (
    <>
      {loading ? <Spinner /> : iconLeft}
      {children}
      {!loading && iconRight}
    </>
  );

  if (rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' as const }
      : null;

    return (
      <Link href={href} className={classes} {...externalProps} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type, disabled, ...buttonRest } = rest as NativeButtonProps;

  return (
    <button
      type={type ?? 'button'}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
