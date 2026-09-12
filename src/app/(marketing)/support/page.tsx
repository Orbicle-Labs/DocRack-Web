import { Plus } from 'lucide-react';
import { Container, Eyebrow, Heading } from '@/components/ui';
import { CtaSection } from '@/components/sections/CtaSection';
import { SupportForm } from '@/components/forms/SupportForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqs } from '@/content/pages/support';
import { faqPageSchema } from '@/lib/seo/structured-data';
import { buildMetadata } from '@/lib/seo/metadata';

const PATH = '/support';

export const metadata = buildMetadata({
  title: 'Support',
  description:
    'Questions about how DocRack tests, reviews and documents audit work — and a direct line ' +
    'to the team that builds it.',
  path: PATH,
});

export default function SupportPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs, PATH)} />
      <section className="relative bg-page-top">
        <Container>
          {/* Ordered for mobile: heading, form, FAQ. Putting the FAQ second
              pushed the form 1038px down at 375 — past the point most people
              scroll on a page they arrived at wanting to ask something. */}
          <div className="grid gap-x-6 gap-y-12 pb-24 pt-16 sm:pt-20 lg:grid-cols-12">
            <div className="lg:col-span-6 lg:row-start-1">
              <Eyebrow>Support</Eyebrow>
              <Heading level={1} size="h1">
                Ask us anything about how it works.
              </Heading>
              <p className="mt-5 max-w-prose text-body-lg text-muted">
                Questions from evaluators, security teams and auditors already using DocRack all
                reach the same place. We reply by email within one working day.
              </p>
            </div>

            <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2">
              <div className="lg:sticky lg:top-24">
                <SupportForm />
              </div>
            </div>

            <div className="lg:col-span-6 lg:row-start-2">
              <h2 className="text-label uppercase text-muted">Common questions</h2>

              {/* Native <details>: keyboard-operable, screen-reader-announced and
                  correct with JavaScript disabled. A hand-rolled accordion here
                  would ship state and key handling to do the same job worse. */}
              <div className="mt-5 border-b border-line">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group border-t border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-body font-medium text-ink [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <Plus
                        size={17}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-muted transition-transform duration-base ease-out group-open:rotate-45"
                      />
                    </summary>
                    <p className="max-w-prose pb-5 text-body-sm text-muted">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-hairline" />
      </section>

      <CtaSection
        heading="Would a walkthrough answer it faster?"
        body="Bring one audit procedure and we will configure it against your own evidence on the call."
        secondaryLabel=""
      />
    </>
  );
}
