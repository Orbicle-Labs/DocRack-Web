import { Section } from '@/components/ui';
import { recipe } from '@/content/pages/homepage';

/**
 * Archetype C — stated claim. One sentence, no eyebrow, no grid, no visual.
 *
 * It sits in the same canvas field as RecipeSection with `quiet` spacing and
 * no top edge, so it reads as the conclusion of the recipe argument rather
 * than a new section. This is the page's single most quotable line and §8
 * permits a pull-quote treatment for exactly this.
 */
export function RecipeClaim() {
  return (
    <Section tone="canvas" spacing="quiet">
      <div className="grid lg:grid-cols-12">
        <p className="border-l-2 border-accent pl-6 text-h3 text-ink lg:col-start-2 lg:col-span-9 [text-wrap:balance]">
          {recipe.body}
        </p>
      </div>
    </Section>
  );
}
