import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { RecipeSection } from '@/components/sections/RecipeSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { TraceabilitySection } from '@/components/sections/TraceabilitySection';
import { HumanReviewSection } from '@/components/sections/HumanReviewSection';
import { SecurityPreview } from '@/components/sections/SecurityPreview';
import { FinalCta } from '@/components/sections/FinalCta';

// Section order follows §10 of the build spec.
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <WorkflowSection />
      <RecipeSection />
      <CapabilitiesSection />
      <UseCasesSection />
      <TraceabilitySection />
      <HumanReviewSection />
      <SecurityPreview />
      <FinalCta />
    </>
  );
}
