import { SolutionLayout } from '@/components/sections/SolutionLayout';
import { internalAudit } from '@/content/pages/solutions';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: internalAudit.metaTitle,
  description: internalAudit.metaDescription,
  path: internalAudit.path,
});

export default function InternalAuditPage() {
  return <SolutionLayout page={internalAudit} />;
}
