import { Card, Eyebrow, Heading, Section } from '@/components/ui';
import { capabilities } from '@/lib/content/homepage';

export function CapabilitiesSection() {
  return (
    <Section tone="canvas">
      <div className="max-w-2xl">
        <Eyebrow>{capabilities.eyebrow}</Eyebrow>
        <Heading level={2} balance>
          {capabilities.heading}
        </Heading>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {capabilities.blocks.map((block, index) => (
          <Card key={block.title} padding="lg">
            <span className="font-mono text-xs text-brand">
              {String(index + 1).padStart(2, '0')}
            </span>
            <Heading level={3} size="h4" className="mt-2">
              {block.title}
            </Heading>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{block.body}</p>
          </Card>
        ))}
      </div>

      {/* Knowledge Hub and Copilot sit here rather than among the four blocks:
          §10.8 keeps them supporting, not the centre of the product. */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {capabilities.supporting.map((item) => (
          <div key={item.title} className="border-t border-line pt-4">
            <h3 className="font-medium text-ink">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
