import { Container, Eyebrow, Heading, Panel } from '@/components/ui';
import { DemoForm } from '@/components/forms/DemoForm';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Book a demo',
  description:
    'Bring one audit procedure. We will configure it as an Audit Test Recipe against your own ' +
    'evidence and show you the working paper it produces.',
  path: '/book-demo',
});

/** What the session actually is. Concrete beats "see DocRack in action". */
const AGENDA = [
  {
    title: 'You bring one procedure',
    body: 'A test you already run — a three-way match, an interest recalculation, a sanction-terms check. Whatever your team spends real hours on.',
  },
  {
    title: 'We configure it as a recipe',
    body: 'Live, on the call: inputs, extracted fields, the rules and tolerances that decide pass or fail, and what counts as insufficient evidence.',
  },
  {
    title: 'We run it against a population',
    body: 'Sample evidence if you would rather not share your own. Exceptions come back with the rule applied and the source page or cell behind each value.',
  },
  {
    title: 'You see the working paper',
    body: 'Scope, population, procedure, results, exception register and sign-off blocks — the output your reviewer would receive.',
  },
];

export default function BookDemoPage() {
  return (
    <>
      {/* Archetype A, narrowed. A conversion page earns no hero image: the
          form is the only object on it that matters. */}
      <section className="bg-page-top">
        <Container>
          {/* Three grid children, ordered for mobile: heading, form, agenda.
              At 375 a heading-then-agenda-then-form order put the form 1233px
              down the page — below the entire agenda, on the one page whose
              only purpose is the form. Explicit row placement at lg restores
              the two-column reading order on desktop. */}
          <div className="grid gap-x-6 gap-y-12 pb-24 pt-16 sm:pt-20 lg:grid-cols-12">
            <div className="lg:col-span-5 lg:row-start-1">
              <Eyebrow>Book a demo</Eyebrow>
              <Heading level={1} size="h1">
                Bring one audit procedure. See it become a repeatable test.
              </Heading>
              <p className="mt-5 max-w-prose text-body-lg text-muted">
                Forty-five minutes, screen-shared, no slides. We configure your procedure against
                evidence you recognise and you keep the working paper it produces.
              </p>
            </div>

            <div className="lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:row-span-2">
              <div className="lg:sticky lg:top-24">
                <DemoForm />
              </div>
            </div>

            <div className="lg:col-span-5 lg:row-start-2">
              <ol>
                {AGENDA.map((item, index) => (
                  <Panel
                    as="li"
                    key={item.title}
                    variant={index === 0 ? 'accent' : 'rule'}
                    className="pb-5"
                  >
                    <div className="flex gap-4">
                      <span className="mt-0.5 shrink-0 font-mono text-mono-xs tabular-nums text-muted">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-h4">{item.title}</h2>
                        <p className="mt-1.5 max-w-prose text-body-sm text-muted">{item.body}</p>
                      </div>
                    </div>
                  </Panel>
                ))}
              </ol>

              <p className="mt-8 max-w-prose text-body-sm text-muted">
                Not ready for a demo?{' '}
                <a
                  href="/support"
                  className="text-accent underline decoration-1 underline-offset-[3px] hover:decoration-2"
                >
                  Send us a question
                </a>{' '}
                instead — same team answers it.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
