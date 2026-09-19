import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import Link from 'next/link';

const page = pageCopy('/product/test-library');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        <p className="caption">
          Illustrative template summaries · current Pack availability unverified. P2P v3; credit and
          IFC v1. Each engagement-specific clone requires human review and approval.
        </p>
        <ProseSection section={page.sections[0]}>
          <Link className="text-action" href="/solutions/internal-audit">
            Explore the P2P procedure ↗
          </Link>
        </ProseSection>
        <ProseSection section={page.sections[1]}>
          <Link className="text-action" href="/solutions/credit-loan-audit">
            Explore the credit procedure ↗
          </Link>
        </ProseSection>
        <ProseSection section={page.sections[2]}>
          <Link className="text-action" href="/solutions/ifc-sox">
            Explore the IFC procedure ↗
          </Link>
        </ProseSection>
        <ProseSection section={page.sections[3]} />
      </div>
      <PageClose
        page={page}
        links={[
          { href: '/product/audit-test-recipes', label: 'Audit Test Recipes' },
          { href: '/product/review-and-findings', label: 'Review and findings' },
          { href: '/product/working-papers', label: 'Working papers' },
        ]}
      />
    </article>
  );
}
