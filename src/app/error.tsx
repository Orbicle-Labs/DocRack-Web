'use client';
import Link from 'next/link';
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="v2 fieldwork-page design-container error-surface">
      <p className="eyeline">Page error</p>
      <h1>This page could not load.</h1>
      <p>Try loading the page again, or return to the homepage.</p>
      <nav className="related-pages" aria-label="Recovery options">
        <button type="button" onClick={reset} className="v2-button v2-button-primary">
          Try again
        </button>
        <Link href="/">Back to home</Link>
        <Link href="/support">Contact the team</Link>
      </nav>
      {error.digest && <p className="caption">Reference: {error.digest}</p>}
    </main>
  );
}
