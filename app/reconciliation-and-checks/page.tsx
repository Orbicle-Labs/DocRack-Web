import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { reconciliationPage } from '@/lib/content/product';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: reconciliationPage.metaTitle,
  description: reconciliationPage.metaDescription,
  path: reconciliationPage.path,
});

export default function ReconciliationPage() {
  return <CapabilityLayout page={reconciliationPage} />;
}
