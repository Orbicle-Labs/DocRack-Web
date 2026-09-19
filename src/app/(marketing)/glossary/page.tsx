import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { definedTermSetSchema } from '@/lib/seo/structured-data';
import { glossaryTerms } from '@/content/pages/glossary';
const page = pageCopy('/glossary');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <JsonLd
        data={definedTermSetSchema(glossaryTerms, {
          name: page.metadata.title,
          description: page.metadata.description,
          path: page.path,
        })}
      />
      <PageOpening page={page} />
      <div className="design-container reading-page">
        <nav className="related-pages" aria-label="Glossary terms">
          {page.sections.map((s) => (
            <Link href={'#' + s.id} key={s.id}>
              {s.heading}
            </Link>
          ))}
        </nav>
        {page.sections.map((section) => (
          <ProseSection key={section.id} section={section} />
        ))}
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
