import { Button, Container, Heading, ProductFrame } from '@/components/ui';
import { hero } from '@/content/pages/homepage';
import { DEMO_HREF } from '@/content/navigation';

/**
 * Archetype A — Overture. Asymmetric 5/7 with an empty gutter column, the
 * page-top gradient, and a soft fading rule at the bottom rather than a hard
 * border. Bottom padding runs heavier than top so the section reads settled.
 */
export function Hero() {
  return (
    <section className="relative bg-page-top">
      <Container>
        <div className="grid gap-10 pb-20 pt-16 sm:pb-28 sm:pt-20 lg:grid-cols-12 lg:gap-x-6">
          {/* pt-2 optically aligns the headline with the frame's chrome bar
              rather than its outer edge. */}
          <div className="lg:col-span-5 lg:pt-2">
            <Heading level={1} size="display">
              {hero.headline}
            </Heading>
            <p className="mt-5 max-w-[52ch] text-body-lg text-muted">{hero.sub}</p>

            {/* At 375 two lg buttons wrap and cost ~116px of fold. Full-width
                primary plus a link secondary keeps the CTA above the fold and
                removes the wrap jitter. */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button href={DEMO_HREF} size="lg" fullWidth className="sm:w-auto">
                {hero.primaryCta}
              </Button>
              <Button href="#workflow" variant="link" size="lg" className="sm:px-4">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            {/* chrome="none": the capture already includes the product's own
                sidebar and toolbar, so the frame must not draw a second bar. */}
            <ProductFrame
              src="/product/review-queue.png"
              alt="DocRack review queue showing exceptions with the rule applied, expected and actual values, and outcome for each item"
              variant="real"
              chrome="none"
              aspect="16/10"
              elevation="hero"
              priority
              caption="Review queue — Procure-to-Pay engagement"
            />
          </div>
        </div>
      </Container>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-hairline" />
    </section>
  );
}
