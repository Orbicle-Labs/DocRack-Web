import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { ExplainerSequence } from '@/components/motion/ExplainerSequence';
import { evidenceTrace } from '@/lib/content/motion';
import { reviewPage } from '@/lib/content/product';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: reviewPage.metaTitle,
  description: reviewPage.metaDescription,
  path: reviewPage.path,
});

export default function ReviewAndFindingsPage() {
  return (
    <CapabilityLayout
      page={reviewPage}
      interaction={<ExplainerSequence explainer={evidenceTrace} tone="surface" />}
    />
  );
}
