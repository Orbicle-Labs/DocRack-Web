'use client';

import React from 'react';

// global-error catches errors in the root layout itself, so it renders its own
// <html> and <body> and cannot rely on globals.css having loaded. Every value
// is inlined and hardcoded on purpose — the tokens are mirrored from
// app/globals.css (:root) rather than referenced, because var() would resolve
// to nothing in exactly the failure this page exists to handle.
const INK = '#10141c';
const CANVAS = '#f6f7f9';
const MUTED = '#5b6577';
const BRAND = '#2855d9';
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
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
          <p
            style={{
              fontSize: 12,
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
            Refreshing usually resolves it. If it does not, the reference below identifies the
            failure in our logs.
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

          {error?.digest && (
            <p style={{ fontSize: 13, color: MUTED, margin: '24px 0 0' }}>
              Reference{' '}
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                {error.digest}
              </span>
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
