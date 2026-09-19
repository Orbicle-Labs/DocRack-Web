import Link from 'next/link';
import type { ReactNode } from 'react';
import { launchPages, type CopySection, type LaunchPage } from '@/content/pages/launch';
import { buildMetadata } from '@/lib/seo/metadata';

export function pageCopy(path: string): LaunchPage {
  const page = launchPages.find((entry) => entry.path === path);
  if (!page) throw new Error(`Missing page copy: ${path}`);
  return page;
}
export function pageMetadata(path: string) {
  const page = pageCopy(path);
  return buildMetadata({ ...page.metadata, path });
}

export function Breadcrumbs({ page }: { page: LaunchPage }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span aria-hidden="true">/</span>
      {page.path.startsWith('/product/') && (
        <>
          <Link href="/product">Product</Link>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{page.metadata.title}</span>
    </nav>
  );
}

export function PageOpening({ page }: { page: LaunchPage }) {
  return (
    <div className="design-container">
      <Breadcrumbs page={page} />
      <header className="page-opening">
        <p className="eyeline">{page.eyebrow}</p>
        <h1>{page.heading}</h1>
        <p className="page-lead">{page.introduction}</p>
        <Link className="v2-button v2-button-primary" href={page.cta.href}>
          {page.cta.label}
        </Link>
        {page.readiness.treatment === 'Illustrative product model' && (
          <p className="caption page-qualification">
            Illustrations explain the product model. Confirm your procedure, formats and review
            requirements during evaluation.
          </p>
        )}
      </header>
    </div>
  );
}

export function ProseSection({
  section,
  children,
}: {
  section: CopySection;
  children?: ReactNode;
}) {
  return (
    <section id={section.id} className="prose-section">
      <h2>{section.heading}</h2>
      <div>
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {children}
      </div>
    </section>
  );
}

export function PageClose({
  page,
  links,
}: {
  page: LaunchPage;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div className="design-container page-close">
      {page.faq.length > 0 && (
        <section className="page-faq" aria-label="Questions about this example">
          {page.faq.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </section>
      )}
      <nav className="related-pages" aria-label="Related pages">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
            <span aria-hidden="true"> ↗</span>
          </Link>
        ))}
      </nav>
      <section className="page-next">
        <div>
          <p className="eyeline">Your next procedure</p>
          <h2>Start with the work you need to review.</h2>
          <p>
            Discuss the sources, rules and output your team needs. Please keep confidential audit
            evidence out of the enquiry form.
          </p>
        </div>
        <Link className="v2-button v2-button-primary" href={page.cta.href}>
          {page.cta.label}
        </Link>
      </section>
    </div>
  );
}
