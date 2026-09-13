import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { HeroEvidence } from '@/components/demos/HeroEvidence';
import { SourceReview } from '@/components/demos/SourceReview';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({
  title: 'AI-assisted internal-audit fieldwork',
  description:
    'From audit evidence to answers you can review. Explore an illustrative audit test, its sources and the human review boundary.',
  path: '/',
});
export default function HomePage() {
  return (
    <div className="v2">
      <section className="design-container home-opening">
        <div className="opening-copy">
          <p className="eyeline">AI-assisted internal-audit fieldwork</p>
          <h1>
            From audit evidence to answers you can <span className="editorial">review.</span>
          </h1>
          <p className="opening-lead">
            Turn documents, spreadsheets and company policies into repeatable audit tests. Review
            exceptions with their sources, then produce working papers your team can sign off.
          </p>
          <div className="opening-actions">
            <Button
              href="/book-demo"
              size="lg"
              iconRight={<ArrowRight size={18} aria-hidden="true" />}
            >
              Book a demo
            </Button>
            <a href="#workflow" className="text-action">
              Explore the workflow <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="opening-note caption">For internal-audit teams at Indian enterprises.</p>
        </div>
        <HeroEvidence />
      </section>
      <SourceReview />
      <section className="design-container prototype-close">
        <p className="eyeline">The procedure behind the result</p>
        <h2>
          Define the test.
          <br />
          <span className="editorial">Keep the judgement.</span>
        </h2>
        <p>
          An Audit Test Recipe brings scope, logic and review requirements together. A Run records
          one execution of that approved version.
        </p>
        <Button
          variant="secondary"
          href="/product"
          iconRight={<ArrowRight size={18} aria-hidden="true" />}
        >
          Explore the product
        </Button>
      </section>
    </div>
  );
}
