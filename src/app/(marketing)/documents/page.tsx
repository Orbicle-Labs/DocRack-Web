import { CapabilityLayout } from '@/components/sections/CapabilityLayout';
import { documentsPage } from '@/content/pages/product';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: documentsPage.metaTitle,
  description: documentsPage.metaDescription,
  path: documentsPage.path,
});

export default function DocumentsPage() {
  return <CapabilityLayout page={documentsPage} />;
}
