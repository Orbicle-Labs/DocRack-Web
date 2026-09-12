import React from 'react';
import { Button, Heading, Section } from '@/components/ui';
import { DEMO_HREF } from '@/content/navigation';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = {
  ...buildMetadata({
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has been moved.',
    path: '/404',
  }),
  // A 404 must never enter the index, whatever the sitewide default says.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section
      as="main"
      id="main-content"
      spacing="finale"
      className="flex min-h-[60vh] items-center"
    >
      <div className="mx-auto max-w-lg text-center">
        <p className="text-label uppercase text-muted">404</p>
        <Heading level={1} size="h1" className="mt-4">
          This page does not exist.
        </Heading>
        <p className="mx-auto mt-5 max-w-prose text-body-lg text-muted">
          The page may have moved, or the link may be out of date. The pages below cover most of
          what people arrive here looking for.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg" fullWidth className="sm:w-auto">
            Back to home
          </Button>
          <Button href={DEMO_HREF} variant="secondary" size="lg" fullWidth className="sm:w-auto">
            Book a demo
          </Button>
        </div>

        <p className="mt-6 text-body-sm text-muted">
          Still stuck?{' '}
          <a
            href="/support"
            className="text-accent underline decoration-1 underline-offset-[3px] hover:decoration-2"
          >
            Contact the team
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
