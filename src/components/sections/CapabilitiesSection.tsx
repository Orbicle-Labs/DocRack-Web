import { Card, Eyebrow, Heading, Section } from '@/components/ui';
import { capabilities } from '@/content/pages/homepage';

/**
 * Archetype G — feature quartet. The only Cards on the page, which is what
 * lets a card still mean "a discrete object" rather than "a box".
 */
export function CapabilitiesSection() {
  return (
    <Section tone="surface">
      <div>
        <Eyebrow>{capabilities.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-[26ch]">
          {capabilities.heading}
        </Heading>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {capabilities.blocks.map((block, index) => (
          <Card key={block.title} padding="lg">
            <span className="text-label tabular-nums text-accent">
              {String(index + 1).padStart(2, '0')}
            </span>
            <Heading level={3} size="h4" className="mt-2">
              {block.title}
            </Heading>
            <p className="mt-2.5 text-body-sm text-muted">{block.body}</p>
          </Card>
        ))}
      </div>

      {/* Knowledge Hub and Copilot are supporting, not a second quartet
          (§10.8). Rendered inset and captioned so they read as a footnote —
          otherwise this section carries two competing visual ideas. */}
      <div className="mt-10">
        <p className="text-label uppercase text-muted">Supporting</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {capabilities.supporting.map((item) => (
            <Card key={item.title} variant="inset" padding="sm">
              <h3 className="text-body-sm font-medium text-ink">{item.title}</h3>
              <p className="mt-1.5 text-caption text-muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
