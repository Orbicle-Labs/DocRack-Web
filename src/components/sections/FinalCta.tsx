import { Button, Heading, Section } from '@/components/ui';
import { finalCta } from '@/content/pages/homepage';
import { DEMO_HREF } from '@/content/navigation';

/** Archetype H — closing invitation. The most air on the page, by design. */
export function FinalCta() {
  return (
    <Section tone="ink" spacing="finale">
      <div className="mx-auto max-w-2xl text-center">
        <span aria-hidden="true" className="mx-auto mb-10 block h-px w-full bg-hairline" />
        <Heading level={2}>{finalCta.heading}</Heading>
        <p className="mx-auto mt-5 max-w-[44ch] text-lead text-muted">{finalCta.body}</p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href={DEMO_HREF} size="lg" fullWidth className="sm:w-auto">
            {finalCta.primaryCta}
          </Button>
          <Button href="/support" variant="secondary" size="lg" fullWidth className="sm:w-auto">
            {finalCta.secondaryCta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
