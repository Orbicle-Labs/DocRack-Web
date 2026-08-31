import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

// `secondary` and `ghost` inherit their foreground from the surrounding
// Section tone (text-current) rather than hardcoding text-ink, so they stay
// legible on <Section tone="ink"> without the caller overriding anything.
//
// secondary uses line-interactive, not line-strong: a control edge has to
// clear 3:1 (WCAG 1.4.11) and line-strong is 1.63:1 on white.
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white border border-transparent shadow-key ' +
    'hover:bg-brand-hover hover:shadow-key-hover active:shadow-press',
  secondary:
    'bg-transparent text-current border border-line-interactive ' +
    'hover:border-current hover:bg-surface-2 hover:shadow-1',
  ghost: 'bg-transparent text-current border border-transparent hover:bg-surface-2',
  link:
    'bg-transparent text-accent border border-transparent hover:text-accent-hover ' +
    'underline underline-offset-[3px] decoration-1 hover:decoration-2',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-caption gap-1.5',
  md: 'h-11 px-5 text-body-sm gap-2',
  lg: 'h-[52px] px-6 text-body gap-2',
};

const BASE =
  'u-press inline-flex items-center justify-center rounded-button font-medium leading-none ' +
  // Transition only what changes — transition-all animates layout properties
  // and is a jank source.
  'transition-[background-color,border-color,box-shadow,color,transform] ' +
  'duration-fast ease-out whitespace-nowrap active:translate-y-[0.5px] ' +
  // Grey out rather than fade: a 55%-opacity brand fill just reads as a
  // lighter blue, which is not a recognisable disabled state.
  'disabled:pointer-events-none disabled:border-transparent disabled:shadow-none ' +
  'disabled:bg-line disabled:text-muted disabled:translate-y-0';

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
