import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { ExplainerSequence } from '@/components/motion/ExplainerSequence';
import { ExceptionHandoff } from '@/components/motion/ExceptionHandoff';
import { exceptionHandoff } from '@/content/pages/motion';
import { workingPapersPage } from '@/content/pages/product';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: workingPapersPage.metaTitle,
  description: workingPapersPage.metaDescription,
  path: workingPapersPage.path,
});

export default function WorkingPapersPage() {
  return (
    <CapabilityLayout
      page={workingPapersPage}
      interaction={
        <ExplainerSequence
          explainer={exceptionHandoff}
          tone="surface"
          aside={<ExceptionHandoff />}
        />
      }
    />
  );
}
