import { Eyebrow, Heading, Section } from '@/components/ui';
import { problem } from '@/lib/content/homepage';

export function ProblemSection() {
  return (
    <Section tone="surface">
      <div className="max-w-2xl">
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <Heading level={2} balance>
          {problem.heading}
        </Heading>
      </div>

      <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {problem.points.map((point, index) => (
          <li key={point.title} className="border-t border-line pt-4">
            <span className="font-mono text-xs text-muted">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-medium text-ink">{point.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
