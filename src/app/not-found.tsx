import Link from 'next/link';
export const metadata = { title: 'Page not found', robots: { index: false, follow: true } };
export default function NotFound() {
  return (
    <main id="main-content" className="v2 fieldwork-page design-container error-surface">
      <p className="eyeline">404 ? Page not found</p>
      <h1>This page does not exist.</h1>
      <p>The link may be out of date. Explore the product or return to the homepage to continue.</p>
      <nav className="related-pages" aria-label="Recovery options">
        <Link href="/" className="v2-button v2-button-primary">
          Back to home
        </Link>
        <Link href="/product">Explore the product</Link>
        <Link href="/support">Contact the team</Link>
      </nav>
    </main>
  );
}
