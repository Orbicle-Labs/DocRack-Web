import { Eyebrow, Heading, Section } from '@/components/ui';
import { security } from '@/lib/content/homepage';

export function SecurityPreview() {
  return (
    <Section tone="surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>{security.eyebrow}</Eyebrow>
          <Heading level={2} balance>
            {security.heading}
          </Heading>
          <p className="mt-5 text-sm leading-relaxed text-muted">{security.note}</p>
        </div>

        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:col-span-7">
          {security.points.map((point) => (
            <div key={point.title} className="border-t border-line pt-4">
              <dt className="font-medium text-ink">{point.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{point.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
