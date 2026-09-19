import { FindingRelationship } from '@/components/sections/pages/ProcedureDetails';
import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import { RunRecord } from '@/components/sections/pages/Evidence';
import { SourceReview } from '@/components/demos/SourceReview';

const page = pageCopy('/product/review-and-findings');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        <ProseSection section={page.sections[0]} />
        <SourceReview />
        <ProseSection section={page.sections[1]} />
        <ProseSection section={page.sections[2]} />
        <FindingRelationship />
        <RunRecord />
      </div>
      <PageClose
        page={page}
        links={[
          { href: '/product/audit-test-recipes', label: 'Audit Test Recipes' },
          { href: '/product/working-papers', label: 'Working papers' },
        ]}
      />
    </article>
  );
}
