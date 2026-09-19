import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = {
  ...buildMetadata({
    title: 'Privacy notice — review pending',
    description:
      'The website privacy document is awaiting owner review. Contact the team with questions.',
    path: '/privacy',
  }),
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <article className="v2 fieldwork-page design-container reading-page">
      <header className="page-opening">
        <p className="eyeline">Website information · review pending</p>
        <h1>Website privacy notice</h1>
        <p className="page-lead">
          The final website privacy notice is awaiting owner and legal review.
        </p>
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
