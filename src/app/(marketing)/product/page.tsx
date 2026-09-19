import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import { RunRecord } from '@/components/sections/pages/Evidence';
import Link from 'next/link';
import { launchPages } from '@/content/pages/launch';

const page = pageCopy('/product');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        <ProseSection section={page.sections[0]} />
        <nav className="product-index" aria-label="Explore the product">
          {launchPages
            .filter((p) => p.path.startsWith('/product/'))
            .map((p) => (
              <Link key={p.path} href={p.path}>
                {p.metadata.title} ↗
              </Link>
            ))}
        </nav>
        <nav className="version-chain" aria-label="Fieldwork sequence">
          <ol>
            <li>
              Documents → <strong>Tests / Audit Test Recipe</strong> → Runs
            </li>
            <li>Review → Findings → Working Papers</li>
            <li>
              Test Library + Knowledge Hub support engagement work; Copilot assists throughout.
            </li>
          </ol>
        </nav>
        <RunRecord />
        <ProseSection section={page.sections[1]} />
        <ProseSection section={page.sections[2]} />
        <ProseSection section={page.sections[3]} />
        <section id="copilot" className="prose-section">
          <h2>Keep answers tied to sources.</h2>
          <div>
            <p>
              Knowledge Hub supplies versioned sources. Copilot drafts Recipes and explains results
              with citations; people approve the procedure and conclusion.
            </p>
            <Link className="text-action" href="/product/knowledge-hub-and-copilot">
              Explore Knowledge Hub and Copilot ↗
            </Link>
          </div>
        </section>
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
