import { Button, Heading, Section } from '@/components/ui';
import { DEMO_HREF } from '@/content/navigation';

export interface CtaSectionProps {
  heading: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Archetype H — the closing invitation, parameterised for the pages below the
 * homepage. Same ink tone and same `finale` spacing as FinalCta, so arriving
 * at the bottom of any page feels like arriving at the bottom of this site.
 */
export function CtaSection({
  heading,
  body,
  primaryLabel = 'Book a demo',
  primaryHref = DEMO_HREF,
  secondaryLabel = 'Contact the team',
  secondaryHref = '/support',
}: CtaSectionProps) {
  return (
    <Section tone="ink" spacing="finale">
      <div className="mx-auto max-w-2xl text-center">
        <span aria-hidden="true" className="mx-auto mb-10 block h-px w-full bg-hairline" />
        <Heading level={2}>{heading}</Heading>
        <p className="mx-auto mt-5 max-w-[44ch] text-lead text-muted">{body}</p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href={primaryHref} size="lg" fullWidth className="sm:w-auto">
            {primaryLabel}
          </Button>
          {secondaryLabel && (
            <Button
              href={secondaryHref}
              variant="secondary"
              size="lg"
              fullWidth
              className="sm:w-auto"
            >
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
