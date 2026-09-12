import { SolutionLayout } from '@/components/sections/SolutionLayout';
import { creditLoanAudit } from '@/content/pages/solutions';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: creditLoanAudit.metaTitle,
  description: creditLoanAudit.metaDescription,
  path: creditLoanAudit.path,
});

export default function CreditLoanAuditPage() {
  return <SolutionLayout page={creditLoanAudit} />;
}
