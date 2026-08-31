import { Eyebrow, Heading, Panel, Section } from '@/components/ui';
import { PageHero } from '@/components/sections/PageHero';
import { LedgerRows } from '@/components/sections/LedgerRows';
import { CtaSection } from '@/components/sections/CtaSection';
import { security } from '@/lib/content/homepage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Security',
  description:
    'How DocRack separates tenants, scopes access to the engagement, logs reviewer decisions ' +
    'and versions evidence — and what we will walk through with your security team.',
  path: '/security',
});

/**
 * Deliberately narrow.
 *
 * Everything here follows from how the product is built. Certifications,
 * hosting region, residency, encryption specifics, retention windows and
 * subprocessors are NOT on this page, because none of them are verified — and
 * §10.13 and §16 allow only confirmed claims. The previous site asserted
 * "AWS Mumbai ap-south-1", "runs on-prem / in your VPC", "DPDP compliant",
 * "Row Level Security", "Ed25519 & Merkle trees" and "zero AI training on
 * client data" simultaneously, several of which contradict each other.
 *
 * When a claim is confirmed in writing, add it here — not before.
 */

/** What a security reviewer will ask for, answered honestly: on request. */
const ON_REQUEST = [
  'Hosting, region and data-residency detail',
  'Encryption in transit and at rest',
  'Retention periods and deletion on request',
  'Subprocessors and what each one receives',
  'Access-control model and administrative access',
  'Incident response and notification commitments',
  'Model providers, and how engagement data is handled by them',
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow={security.eyebrow}
        heading="Built for the way audit teams handle company information."
        sub={
          'Audit evidence is some of the most sensitive material an organisation holds. These are ' +
          'the controls that follow from how DocRack is built — and below them, exactly what we ' +
          'will put in front of your security team.'
        }
        cta={{ label: 'Talk to us about security' }}
        secondary={{ label: 'Send a question', href: '/support' }}
      />

      <LedgerRows
        eyebrow="How it works"
        heading="Four properties of the architecture."
        rows={security.points}
        tone="canvas"
        spacing="open"
        numbered={false}
      />

      {/* Stated plainly rather than buried: what we will not claim yet. This
          reads better to a security reviewer than a wall of unverified badges,
          and it is the only honest option until the claims are confirmed. */}
      <Section tone="surface" spacing="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>Under evaluation</Eyebrow>
            <Heading level={2} className="max-w-[22ch]">
              We answer these in writing, not on a landing page.
            </Heading>
            <p className="mt-5 max-w-prose text-body-lg text-muted">
              Hosting and data-handling detail belongs in a document your security team can review
              and hold us to, alongside a DPA. Ask and we will send it.
            </p>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <ul className="border-b border-line">
              {ON_REQUEST.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline justify-between gap-4 border-t border-line py-3.5"
                >
                  <span className="text-body-sm text-ink">{item}</span>
                  <span className="shrink-0 text-caption text-muted">On request</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="canvas" spacing="tight">
        <Panel variant="accent" className="max-w-prose">
          <h2 className="text-h4">Where AI sits, and what it is given</h2>
          <p className="mt-3 text-body-sm text-muted">
            AI extracts and classifies; it does not decide a conclusion. The comparison that
            produces a pass or a fail is deterministic logic running the rules configured in the
            recipe. What each model provider receives, and on what terms, is part of the
            documentation above.
          </p>
        </Panel>
      </Section>

      <CtaSection
        heading="Bring your security questionnaire."
        body="We would rather answer it early than late. Send it across and we will complete it before the demo."
        primaryLabel="Book a demo"
        secondaryLabel="Send a question"
        secondaryHref="/support"
      />
    </>
  );
}
