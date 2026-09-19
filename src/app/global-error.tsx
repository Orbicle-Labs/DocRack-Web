'use client';

import React from 'react';
import Link from 'next/link';

// global-error catches errors in the root layout itself, so it renders its own
// <html> and <body> and cannot rely on globals.css having loaded. Every value
// is inlined and hardcoded on purpose — the tokens are mirrored from
// app/globals.css (:root) rather than referenced, because var() would resolve
// to nothing in exactly the failure this page exists to handle.
const INK = '#182823';
const CANVAS = '#f5f2eb';
const MUTED = '#56635b';
const BRAND = '#153c31';
const SANS =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: SANS,
          background: CANVAS,
          color: INK,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <main
          style={{
            textAlign: 'left',
            maxWidth: 560,
            padding: '40px 24px',
            overflowWrap: 'anywhere',
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: MUTED,
              margin: '0 0 16px',
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              fontSize: 34,
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: '-0.026em',
              margin: '0 0 16px',
            }}
          >
            DocRack could not load this page.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: MUTED, margin: '0 0 32px' }}>
            Try loading the page again. You can also return to the homepage or contact the team.
          </p>

          {process.env.NODE_ENV === 'development' && error?.message && (
            <pre
              style={{
                textAlign: 'left',
                fontSize: 12,
                lineHeight: 1.5,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                background: '#f9ebec',
                border: '1px solid #f0d3d5',
                color: '#a82c35',
                padding: 16,
                borderRadius: 12,
                overflow: 'auto',
                margin: '0 0 24px',
              }}
            >
              {error.message}
            </pre>
          )}

          <button
            onClick={reset}
            style={{
              padding: '0 24px',
              height: 44,
              background: BRAND,
              color: '#ffffff',
              border: 'none',
              borderRadius: 9,
              fontFamily: SANS,
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
          <p style={{ marginTop: 24 }}>
            <Link href="/" style={{ color: INK, display: 'inline-block', padding: '12px 0' }}>
              Back to home
            </Link>
            {' · '}
            <Link
              href="/support"
              style={{ color: INK, display: 'inline-block', padding: '12px 0' }}
            >
              Contact the team
            </Link>
          </p>

          {error?.digest && (
            <p style={{ fontSize: 13, color: MUTED, margin: '24px 0 0' }}>
              Reference{' '}
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {error.digest}
              </span>
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
