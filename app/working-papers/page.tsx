import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { ExplainerSequence } from '@/components/motion/ExplainerSequence';
import { ExceptionHandoff } from '@/components/motion/ExceptionHandoff';
import { exceptionHandoff } from '@/lib/content/motion';
import { workingPapersPage } from '@/lib/content/product';
import { buildMetadata } from '@/lib/seo';

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
