import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { ExplainerSequence } from '@/components/motion/ExplainerSequence';
import { evidenceTrace } from '@/content/pages/motion';
import { reviewPage } from '@/content/pages/product';
import { buildMetadata } from '@/lib/seo/metadata';

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
