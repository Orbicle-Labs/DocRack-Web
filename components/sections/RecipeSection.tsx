import { Check } from 'lucide-react';
import { Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { RecipeCard } from '@/components/product-ui/RecipeCard';
import { recipe } from '@/lib/content/homepage';

/**
 * Archetype D — split with the visual on the right. The empty column between
 * text and frame is what creates the gutter; raising the grid gap would
 * collapse all twelve tracks instead.
 *
 * `recipe.body` deliberately does NOT live here — it is promoted to its own
 * quiet interstitial (RecipeClaim) immediately below, in the same grey field.
 */
export function RecipeSection() {
  return (
    <Section tone="canvas">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <Eyebrow>{recipe.eyebrow}</Eyebrow>
          <Heading level={2}>{recipe.heading}</Heading>

          <ul className="mt-8 border-b border-line">
            {recipe.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 border-t border-line py-3.5 text-body-sm text-muted"
              >
                <Check size={15} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-start-7 lg:col-span-6">
          {/* auto + a floor rather than a fixed ratio — these mocks are
              content-dense but short, and a fixed ratio leaves dead space. */}
          <ProductFrame
            aspect="auto"
            minHeight="min-h-[300px]"
            caption="Audit Test Recipe"
            breadcrumb="Library / Three-way invoice match"
            chromeMeta="v2.1"
          >
            <RecipeCard />
          </ProductFrame>
        </div>
      </div>
    </Section>
  );
}
