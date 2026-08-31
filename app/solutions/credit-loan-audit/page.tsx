import { SolutionLayout } from '@/components/sections/SolutionLayout';
import { creditLoanAudit } from '@/lib/content/solutions';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: creditLoanAudit.metaTitle,
  description: creditLoanAudit.metaDescription,
  path: creditLoanAudit.path,
});

export default function CreditLoanAuditPage() {
  return <SolutionLayout page={creditLoanAudit} />;
}
