import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

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
  /** One object per page may be dramatically raised; it should be the hero. */
  elevation?: 'frame' | 'hero';
  /** Breadcrumb shown in the frame chrome. */
  breadcrumb?: string;
  /** Right-hand chrome text, usually a timestamp. */
  chromeMeta?: string;
  /**
   * Floor for `aspect="auto"` frames whose content varies in height — stops
   * the box resizing as a tab switches between a short and a tall mock.
   */
  minHeight?: string;
  className?: string;
}

/**
 * Application chrome, not a mac-window sticker. Three grey dots is the most
 * generic element a product frame can have; a breadcrumb and a timestamp cost
 * the same and make the frame read as a real screen.
 */
function FrameChrome({ breadcrumb, meta }: { breadcrumb: string; meta?: string }) {
  return (
    <div className="flex h-9 shrink-0 items-center justify-between gap-3 border-b border-line bg-surface-2 px-3.5">
      <span className="truncate text-caption text-muted">{breadcrumb}</span>
      {meta && (
        <span className="shrink-0 font-mono text-mono-xs text-muted tabular-nums">{meta}</span>
      )}
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
  elevation = 'frame',
  breadcrumb = 'Engagement / P2P Q3 FY26',
  chromeMeta = '12 Aug 2026',
  minHeight,
  className,
}: ProductFrameProps) {
  return (
    <figure className={cn('w-full', className)}>
      {/* `tone-light` is load-bearing: the frame is always a light surface,
          even inside <Section tone="ink">. Without it the dark section's
          muted, border, accent and focus values leak in and drop the mock
          below AA — a bug this already shipped once. */}
      <div
        className={cn(
          'tone-light overflow-hidden rounded-frame bg-surface',
          elevation === 'hero' ? 'shadow-hero' : 'shadow-frame'
        )}
      >
        {chrome === 'window' && <FrameChrome breadcrumb={breadcrumb} meta={chromeMeta} />}
        <div className={cn('relative w-full', ASPECTS[aspect], minHeight)}>
          {src ? (
            <Image
              src={src}
              alt={alt ?? ''}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover object-top"
            />
          ) : aspect === 'auto' ? (
            // Content sizes the frame. Mocks use h-full, so give them a
            // definite flex height to fill rather than absolute positioning.
            <div className="flex min-h-full w-full overflow-hidden [&>*]:min-h-full">
              {children}
            </div>
          ) : (
            <div className="absolute inset-0 overflow-hidden">{children}</div>
          )}
        </div>
      </div>

      {(caption || variant === 'illustrative') && (
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-caption text-muted">
          {caption && <span>{caption}</span>}
          {/* A Badge, not grey text: this is an honesty disclosure and it
              should read as deliberate rather than apologetic. Making the
              frames prettier must never make this less visible. */}
          {variant === 'illustrative' && (
            <Badge tone="neutral" size="sm">
              Illustrative interface
            </Badge>
          )}
        </figcaption>
      )}
    </figure>
  );
}
