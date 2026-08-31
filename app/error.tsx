'use client';

import React from 'react';
import { Button, Heading, Section } from '@/components/ui';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section spacing="finale" className="flex min-h-[60vh] items-center">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-label uppercase text-muted">Error</p>
        <Heading level={1} size="h1" className="mt-4">
          Something went wrong.
        </Heading>
        <p className="mx-auto mt-5 max-w-prose text-body-lg text-muted">
          An unexpected error occurred on this page. Trying again usually resolves it.
        </p>

        {/* The message can contain internal detail, so it stays in development
            only. `digest` is safe to show anywhere and is what support needs to
            find the matching server log. */}
        {process.env.NODE_ENV === 'development' && error?.message && (
          <pre className="mt-6 overflow-auto rounded-card border border-danger-300 bg-danger-100 p-4 text-left font-mono text-mono-xs text-danger-strong">
            {error.message}
          </pre>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} size="lg" fullWidth className="sm:w-auto">
            Try again
          </Button>
          <Button href="/" variant="secondary" size="lg" fullWidth className="sm:w-auto">
            Back to home
          </Button>
        </div>

        {error?.digest && (
          <p className="mt-6 text-caption text-muted">
            Reference <span className="font-mono text-mono-xs">{error.digest}</span>
          </p>
        )}
      </div>
    </Section>
  );
}
