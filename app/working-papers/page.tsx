import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { workingPapersPage } from '@/lib/content/product';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: workingPapersPage.metaTitle,
  description: workingPapersPage.metaDescription,
  path: workingPapersPage.path,
});

export default function WorkingPapersPage() {
  return <CapabilityLayout page={workingPapersPage} />;
}
