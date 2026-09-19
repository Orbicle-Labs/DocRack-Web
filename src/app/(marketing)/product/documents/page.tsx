import { FormatEvaluation } from '@/components/sections/pages/ProcedureDetails';
import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import { EvidenceScene, SourceRoles } from '@/components/sections/pages/Evidence';

const page = pageCopy('/product/documents');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        <ProseSection section={page.sections[0]} />
        <SourceRoles />
        <ProseSection section={page.sections[1]} />
        <EvidenceScene />
        <ProseSection section={page.sections[2]} />
        <FormatEvaluation />
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
