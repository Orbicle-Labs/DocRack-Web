import {
  PageOpening,
  ProseSection,
  PageClose,
  pageCopy,
  pageMetadata,
} from '@/components/sections/pages/Editorial';
const page = pageCopy('/security');
export const metadata = pageMetadata(page.path);
export default function Page() {
  return (
    <article className="v2 fieldwork-page">
      <PageOpening page={page} />
      <div className="design-container page-body">
        {page.sections.map((section) => (
          <ProseSection key={section.id} section={section} />
        ))}
      </div>
      <PageClose
        page={page}
        links={[
          { href: '/product', label: 'Explore the product' },
          { href: '/support', label: 'Contact the team' },
        ]}
      />
    </article>
  );
}
