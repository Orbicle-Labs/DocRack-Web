import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ASPECTS = {
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  auto: '',
} as const;

export interface ProductFrameProps {
  /**
   * Local /public path to a real screenshot. Typed as a rooted path on
   * purpose: next.config.ts declares no `images.remotePatterns`, so an
   * external URL would throw at render — this makes that a type error instead.
   */
  src?: `/${string}`;
  alt?: string;
  /** Rendered when `src` is absent. Must fill the frame, not size it. */
  children?: React.ReactNode;
  aspect?: keyof typeof ASPECTS;
  caption?: string;
  chrome?: 'window' | 'none';
  /**
   * `illustrative` labels the frame as a representative interface rather than
   * a screenshot. Required for anything hand-built — §16 forbids presenting a
   * mock as a real product screen, and audit buyers notice.
   */
  variant?: 'illustrative' | 'real';
  priority?: boolean;
  className?: string;
}

function WindowChrome() {
  return (
    <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line bg-canvas px-3.5">
      <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
      <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
      <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
    </div>
  );
}

/**
 * The single wrapper for every product visual on the site.
 *
 * Contract: identical outer box whether the inside is a real screenshot or a
 * React mock. Swapping a mock for a capture is one line — add `src`, drop the
 * children — with no reflow, because the aspect ratio is fixed here and the
 * mock is absolutely positioned to fill it.
 */
export function ProductFrame({
  src,
  alt,
  children,
  aspect = '16/10',
  caption,
  chrome = 'window',
  variant = 'illustrative',
  priority = false,
  className,
}: ProductFrameProps) {
  return (
    <figure className={cn('w-full', className)}>
      <div className="overflow-hidden rounded-card border border-line bg-surface shadow-frame">
        {chrome === 'window' && <WindowChrome />}
        <div className={cn('relative w-full', ASPECTS[aspect])}>
          {src ? (
            <Image
              src={src}
              alt={alt ?? ''}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden">{children}</div>
          )}
        </div>
      </div>

      {(caption || variant === 'illustrative') && (
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          {caption && <span>{caption}</span>}
          {caption && variant === 'illustrative' && (
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
          )}
          {variant === 'illustrative' && <span>Illustrative interface</span>}
        </figcaption>
      )}
    </figure>
  );
}
