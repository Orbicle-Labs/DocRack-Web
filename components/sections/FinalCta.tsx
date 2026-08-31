import { Button, Heading, Section } from '@/components/ui';
import { finalCta } from '@/lib/content/homepage';
import { DEMO_HREF } from '@/lib/nav';

export function FinalCta() {
  return (
    <Section tone="ink" spacing="lg">
      <div className="mx-auto max-w-2xl text-center">
        <Heading level={2} balance>
          {finalCta.heading}
        </Heading>
        <p className="mt-5 text-lg leading-relaxed text-muted">{finalCta.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={DEMO_HREF} size="lg">
            {finalCta.primaryCta}
          </Button>
          <Button href="/support" variant="secondary" size="lg">
            {finalCta.secondaryCta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
