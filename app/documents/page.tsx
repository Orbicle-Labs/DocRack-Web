import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { documentsPage } from '@/lib/content/product';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: documentsPage.metaTitle,
  description: documentsPage.metaDescription,
  path: documentsPage.path,
});

export default function DocumentsPage() {
  return <CapabilityLayout page={documentsPage} />;
}
