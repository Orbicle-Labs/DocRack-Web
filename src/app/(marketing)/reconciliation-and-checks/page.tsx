import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { reconciliationPage } from '@/content/pages/product';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: reconciliationPage.metaTitle,
  description: reconciliationPage.metaDescription,
  path: reconciliationPage.path,
});

export default function ReconciliationPage() {
  return <CapabilityLayout page={reconciliationPage} />;
}
