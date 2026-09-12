import { Eyebrow, Heading, Section } from '@/components/ui';
import { security } from '@/content/pages/homepage';

/** Archetype D without a frame — the list itself is the visual. */
export function SecurityPreview() {
  return (
    <Section tone="canvas">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <Eyebrow>{security.eyebrow}</Eyebrow>
          <Heading level={2}>{security.heading}</Heading>
        </div>

        <div className="lg:col-start-6 lg:col-span-7">
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {security.points.map((point) => (
              <div key={point.title} className="border-t border-line pt-5">
                <dt className="text-h4">{point.title}</dt>
                <dd className="mt-2 text-body-sm text-muted">{point.body}</dd>
              </div>
            ))}
          </dl>
          {/* Sits under the list, not under the heading, where it would
              compete with it. */}
          <p className="mt-8 max-w-prose text-caption text-muted">{security.note}</p>
        </div>
      </div>
    </Section>
  );
}
