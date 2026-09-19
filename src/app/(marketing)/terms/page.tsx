import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = {
  ...buildMetadata({
    title: 'Website terms — review pending',
    description:
      'The website terms document is awaiting owner review. Contact the team with questions.',
    path: '/terms',
  }),
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <article className="v2 fieldwork-page design-container reading-page">
      <header className="page-opening">
        <p className="eyeline">Website information · review pending</p>
        <h1>Website terms</h1>
        <p className="page-lead">The final website terms is awaiting owner and legal review.</p>
        <p>
          For questions about the website or an enquiry, contact the team. Please do not send
          confidential audit evidence or sensitive personal information.
        </p>
        <nav className="related-pages" aria-label="Next steps">
          <Link href="/support">Contact the team ↗</Link>
          <Link href="/">Back to home</Link>
        </nav>
      </header>
    </article>
  );
}
