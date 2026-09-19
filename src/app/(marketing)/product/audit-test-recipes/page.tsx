import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import { EvidenceScene, RunRecord, SourceRoles } from '@/components/sections/pages/Evidence';
import { recipeAnatomy } from '@/content/pages/recipe-anatomy';

const page = pageCopy('/product/audit-test-recipes');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        <section aria-labelledby="anatomy-title">
          <p className="eyeline">Scope / Logic / Control</p>
          <h2 id="anatomy-title" className="text-h2">
            All fourteen parts of the procedure.
          </h2>
          <ol className="recipe-anatomy">
            {recipeAnatomy.map(([name, detail]) => (
              <li key={name}>
                <h3>{name}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <SourceRoles />
        <EvidenceScene />
        <ProseSection section={page.sections[2]} />
        <RunRecord />
      </div>
      <PageClose
        page={page}
        links={[
          { href: '/product/review-and-findings', label: 'Review and findings' },
          { href: '/product/working-papers', label: 'Working papers' },
        ]}
      />
    </article>
  );
}
