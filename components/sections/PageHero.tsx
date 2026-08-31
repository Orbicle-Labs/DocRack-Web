import React from 'react';
import { Button, Container, Eyebrow, Heading, ProductFrame } from '@/components/ui';
import { cn } from '@/lib/utils';
import { DEMO_HREF } from '@/lib/nav';

export interface PageHeroProps {
  eyebrow: string;
  heading: string;
  sub: string;
  /** Omit for pages where the demo CTA is not the next step (legal, company). */
  cta?: { label: string; href?: string } | null;
  secondary?: { label: string; href: string } | null;
  /** A product screen. When absent the hero is centred and text-only. */
  visual?: {
    src: `/${string}`;
    alt: string;
    caption?: string;
  };
}

/**
 * Archetype A for every page below the homepage.
 *
 * Two shapes from one component: a 5/7 split when there is a product screen,
 * a centred column when there is not. Anything else and fourteen pages each
 * grow their own hero, which is how a site stops looking like one site.
 */
export function PageHero({
  eyebrow,
  heading,
  sub,
  cta = { label: 'Book a demo' },
  secondary,
  visual,
}: PageHeroProps) {
  // At 375 two lg buttons wrap and cost roughly 116px of fold, so the primary
  // goes full-width and the secondary demotes to a link.
  const actions =
    cta || secondary ? (
      <div
        className={cn(
          'mt-8 flex flex-col gap-3 sm:flex-row sm:items-center',
          visual ? 'items-start' : 'items-center sm:justify-center'
        )}
      >
        {cta && (
          <Button href={cta.href ?? DEMO_HREF} size="lg" fullWidth className="sm:w-auto">
            {cta.label}
          </Button>
        )}
        {secondary && (
          <Button href={secondary.href} variant="link" size="lg" className="sm:px-4">
            {secondary.label}
          </Button>
        )}
      </div>
    ) : null;

  return (
    <section className="relative bg-page-top">
      <Container>
        {visual ? (
          <div className="grid gap-10 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:grid-cols-12 lg:gap-x-6">
            <div className="lg:col-span-5 lg:pt-2">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Heading level={1}>{heading}</Heading>
              <p className="mt-5 max-w-prose text-body-lg text-muted">{sub}</p>
              {actions}
            </div>
            <div className="lg:col-start-6 lg:col-span-7">
              <ProductFrame
                src={visual.src}
                alt={visual.alt}
                caption={visual.caption}
                variant="real"
                chrome="none"
                aspect="16/10"
                elevation="hero"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl pb-20 pt-16 text-center sm:pb-24 sm:pt-24">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading level={1}>{heading}</Heading>
            <p className="mx-auto mt-5 max-w-prose text-body-lg text-muted">{sub}</p>
            {actions}
          </div>
        )}
      </Container>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-hairline" />
    </section>
  );
}
