import { Button, Container, Heading, ProductFrame } from '@/components/ui';
import { ReviewQueueMock } from '@/components/product-ui/ReviewQueueMock';
import { hero } from '@/lib/content/homepage';
import { DEMO_HREF } from '@/lib/nav';

export function Hero() {
  return (
    <section className="border-b border-line bg-canvas">
      <Container>
        <div className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-5">
            <Heading level={1} size="display" balance>
              {hero.headline}
            </Heading>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.sub}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={DEMO_HREF} size="lg">
                {hero.primaryCta}
              </Button>
              <Button href="#workflow" variant="secondary" size="lg">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ProductFrame aspect="16/10" caption="Review queue">
              <ReviewQueueMock />
            </ProductFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
