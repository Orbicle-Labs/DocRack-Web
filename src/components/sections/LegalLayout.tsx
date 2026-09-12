import React from 'react';
import { Container, Heading } from '@/components/ui';

export interface LegalSection {
  heading: string;
  /** Paragraphs. A string is a paragraph; an array is a bulleted list. */
  blocks: (string | string[])[];
}

export interface LegalLayoutProps {
  title: string;
  intro: string;
  /** ISO date. Rendered as a real <time> so it is machine-readable. */
  updated: string;
  sections: LegalSection[];
}

/**
 * Legal pages are read, not scanned — one narrow column at the prose measure,
 * no cards, no eyebrows, no product screens. The only job of the design here
 * is to stay out of the way and keep the line length comfortable.
 */
export function LegalLayout({ title, intro, updated, sections }: LegalLayoutProps) {
  const updatedLabel = new Date(updated).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="bg-surface">
      <Container>
        <div className="mx-auto max-w-prose pb-28 pt-16 sm:pt-20">
          <Heading level={1} size="h1">
            {title}
          </Heading>
          <p className="mt-4 text-caption text-muted">
            Last updated <time dateTime={updated}>{updatedLabel}</time>
          </p>
          <p className="mt-6 text-body-lg text-muted">{intro}</p>

          <div className="mt-12">
            {sections.map((section) => (
              <section key={section.heading} className="border-t border-line py-8">
                <Heading level={2} size="h4">
                  {section.heading}
                </Heading>
                {section.blocks.map((block, index) =>
                  Array.isArray(block) ? (
                    <ul key={index} className="mt-4 flex flex-col gap-2">
                      {block.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5 text-body-sm text-muted before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-line-interactive"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={index} className="mt-4 text-body text-muted">
                      {block}
                    </p>
                  )
                )}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
