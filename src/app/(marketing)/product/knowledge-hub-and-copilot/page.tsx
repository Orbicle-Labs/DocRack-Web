import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import { EvidenceScene } from '@/components/sections/pages/Evidence';

const page = pageCopy('/product/knowledge-hub-and-copilot');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        <ProseSection section={page.sections[0]} />
        <ProseSection section={page.sections[1]} />
        <ol className="version-chain" aria-label="Illustrative policy version relationship">
          <li>
            <strong>Policy v3 §4.2 → Recipe v3 → DEMO-RUN-018</strong>
            <br />
            The Run retains its sources and versions. Its results still await review.
          </li>
          <li>
            <strong>Later policy → affected Recipes → human reapproval → new Run</strong>
            <br />A policy update cannot alter the completed snapshot.
          </li>
        </ol>
        <ProseSection section={page.sections[2]} />
        <EvidenceScene />
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
