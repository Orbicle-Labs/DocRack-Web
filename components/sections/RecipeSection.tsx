import { Check } from 'lucide-react';
import { Eyebrow, Heading, ProductFrame, Section } from '@/components/ui';
import { RecipeCard } from '@/components/product-ui/RecipeCard';
import { recipe } from '@/lib/content/homepage';

export function RecipeSection() {
  return (
    <Section tone="surface">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>{recipe.eyebrow}</Eyebrow>
          <Heading level={2} balance>
            {recipe.heading}
          </Heading>
          <p className="mt-5 text-lg leading-relaxed text-ink">{recipe.body}</p>
          <ul className="mt-6 space-y-2.5">
            {recipe.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm text-muted">
                <Check size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <ProductFrame aspect="4/3" caption="Audit Test Recipe">
            <RecipeCard />
          </ProductFrame>
        </div>
      </div>
    </Section>
  );
}
