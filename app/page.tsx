import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { RecipeSection } from '@/components/sections/RecipeSection';
import { RecipeClaim } from '@/components/sections/RecipeClaim';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { TraceabilitySection } from '@/components/sections/TraceabilitySection';
import { HumanReviewSection } from '@/components/sections/HumanReviewSection';
import { SecurityPreview } from '@/components/sections/SecurityPreview';
import { FinalCta } from '@/components/sections/FinalCta';

// Section order follows §10 of the build spec.
//
// Archetype and tone alternate deliberately — no two adjacent sections share a
// structure, and the two ink sections are separated by three light ones.
// RecipeClaim sits in the same canvas field as RecipeSection so it reads as
// that argument's conclusion rather than a new section.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <WorkflowSection />
      <RecipeSection />
      <RecipeClaim />
      <CapabilitiesSection />
      <UseCasesSection />
      <TraceabilitySection />
      <HumanReviewSection />
      <SecurityPreview />
      <FinalCta />
    </>
  );
}
