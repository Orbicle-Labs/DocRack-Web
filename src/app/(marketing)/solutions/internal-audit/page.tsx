import { solutionProcedures } from '@/content/pages/solution-procedures';
import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import { EvidenceScene, RunRecord } from '@/components/sections/pages/Evidence';
import { fixtures } from '@/content/demos/fixtures';
const page = pageCopy('/solutions/internal-audit');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        <ProseSection section={page.sections[0]} />
        <ProseSection section={page.sections[1]} />
        <EvidenceScene fixture={fixtures.p2p} />
        <RunRecord fixture={fixtures.p2p} />
        <ProseSection section={page.sections[2]} />
        <ProseSection section={solutionProcedures.p2p} />
        <ProseSection section={page.sections[3]} />
      </div>
      <PageClose
        page={page}
        links={[
          { href: '/product/audit-test-recipes', label: 'Audit Test Recipes' },
          { href: '/product/review-and-findings', label: 'Review and findings' },
        ]}
      />
    </article>
  );
}
