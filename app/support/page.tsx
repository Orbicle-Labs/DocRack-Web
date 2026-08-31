import { Plus } from 'lucide-react';
import { Container, Eyebrow, Heading } from '@/components/ui';
import { CtaSection } from '@/components/sections/CtaSection';
import { SupportForm } from '@/components/forms/SupportForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Support',
  description:
    'Questions about how DocRack tests, reviews and documents audit work — and a direct line ' +
    'to the team that builds it.',
  path: '/support',
});

/**
 * The FAQ is written from scratch.
 *
 * The previous four answers asserted CARO 2020 auto-checklists, Row Level
 * Security, "all data stored within India (AWS Mumbai region)", DPDP
 * compliance, Merkle-tree audit trails and Tally Prime integration. Every one
 * of those is either unverified (§16) or aimed at statutory audit for CA firms,
 * which is not who this site is for any more.
 */
const FAQS = [
  {
    q: 'What does DocRack actually do?',
    a: 'It runs audit fieldwork. Evidence comes in as classified inputs, a configured Audit Test Recipe runs against the population, exceptions are reviewed with their evidence attached, and the working paper is generated from that run. It is the execution layer, not an audit-management or issue-tracking tool.',
  },
  {
    q: 'Does the AI decide whether a control passed?',
    a: 'No. AI extracts values from documents, classifies inputs and drafts recipes from written procedures. The comparison that produces a pass or a fail is deterministic logic running the rules and tolerances configured in the recipe, so the same run twice gives the same answer. A person approves the recipe before it runs and approves the conclusion after it does.',
  },
  {
    q: 'What happens when a required document is missing?',
    a: 'The test reports insufficient evidence. That is a distinct outcome from a failure, and it stays distinct all the way through to the working paper — a control that could not be tested is not the same as a control that did not work, and treating them the same produces findings that do not survive a conversation with the business.',
  },
  {
    q: 'Can it apply our own policies rather than generic rules?',
    a: 'Yes — that is what the Knowledge Hub is for. Your policies, SOPs and reference data are held with their source, version, effective date and applicability, and a check cites the specific clause and version it applied. Tests can be evaluated against the policy in force on the date of the transaction rather than the current one.',
  },
  {
    q: 'Which formats can it read?',
    a: 'Digital PDFs, scanned documents, Excel workbooks, CSV extracts and system exports. Extracted values keep the document, page and cell they came from, along with extraction confidence and any human correction.',
  },
  {
    q: 'How does a reviewer check a result without reopening the source file?',
    a: 'Every result carries the rule that produced it, the values it compared and a link to the document page or spreadsheet cell each value came from, plus the reviewer decision and the reason recorded against it. Opening the exception shows all of that in one place.',
  },
  {
    q: 'Where is our data held, and what are your security commitments?',
    a: 'Our security page covers what follows from the architecture — tenant isolation, engagement-scoped access, activity logging and evidence versioning. Hosting, residency, retention, subprocessors and model-provider terms we put in writing for your security team rather than on a web page. Ask and we will send the documentation.',
  },
];

export default function SupportPage() {
  return (
    <>
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
                {FAQS.map((faq) => (
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
