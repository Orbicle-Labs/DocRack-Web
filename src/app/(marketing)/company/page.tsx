import Image from 'next/image';
import { Eyebrow, Heading, Panel, Section } from '@/components/ui';
import { PageHero } from '@/components/sections/PageHero';
import { CtaSection } from '@/components/sections/CtaSection';
import { trust } from '@/content/pages/homepage';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Company',
  description:
    'DocRack is built by Orbicle Labs for internal audit teams at banks and NBFCs — audit ' +
    'fieldwork execution, with the evidence trail intact.',
  path: '/company',
});

/**
 * No team section. The previous /about had no names, no founders and no bios —
 * the .team-grid CSS existed but nothing ever rendered it — and inventing a
 * team page is worse than not having one. When there are real names and real
 * consent to publish them, add the section here.
 *
 * The only third-party marks on this page are NVIDIA Inception and IIT Bombay,
 * which are programme recognitions we hold, not customer logos.
 */

const BELIEFS = [
  {
    title: 'A procedure beats a prompt',
    body: 'Anything that produces an audit conclusion has to be repeatable and reviewable. That means a configured procedure with an explicit rule and a version, not a model answering a question differently each time.',
  },
  {
    title: 'Evidence has to keep its origin',
    body: 'A number is only useful in an audit if you can open the page or cell it came from. Provenance is not a feature we added; it is the reason the rest of the product is shaped the way it is.',
  },
  {
    title: 'The auditor decides',
    body: 'Software can gather, extract, compare and present. It should not conclude. Every result goes to a person, and the decision that person makes is recorded with the reason behind it.',
  },
  {
    title: 'Missing evidence is not a failure',
    body: 'A control that cannot be tested because a document is absent is a different thing from a control that failed. Collapsing the two produces findings that do not survive a conversation with the business.',
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        heading="We build the part of the audit that nobody sees."
        sub={
          'DocRack is fieldwork execution — the collecting, extracting, testing, reviewing and ' +
          'documenting that fills the weeks between planning an audit and reporting it. It is ' +
          'where the hours go, and it is the part software has largely left alone.'
        }
        cta={{ label: 'Book a demo' }}
        secondary={{ label: 'Contact the team', href: '/support' }}
      />

      <Section tone="canvas" spacing="open">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <Eyebrow variant="rule">What we believe</Eyebrow>
            <Heading level={2} className="max-w-[18ch]">
              Four positions the product is built on.
            </Heading>
          </div>

          <div className="grid gap-8 lg:col-start-6 lg:col-span-7 sm:grid-cols-2">
            {BELIEFS.map((belief) => (
              <Panel as="article" key={belief.title}>
                <h3 className="text-h4">{belief.title}</h3>
                <p className="mt-2.5 text-body-sm text-muted">{belief.body}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" spacing="default">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <Eyebrow>{trust.eyebrow}</Eyebrow>
            <Heading level={2} className="max-w-[20ch]">
              Programme recognitions we hold.
            </Heading>
            <p className="mt-5 max-w-prose text-body-lg text-muted">
              These are programmes DocRack has been selected into. They are not customers, and we do
              not present them as endorsements of the product.
            </p>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {trust.items.map((item) => (
                <li key={item.src} className="flex items-center gap-3">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={160}
                    height={44}
                    className="h-9 w-auto object-contain"
                  />
                  {item.caption && <span className="text-caption text-muted">{item.caption}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="canvas" spacing="tight">
        <Panel variant="inset" className="max-w-prose">
          <h2 className="text-h4">The company</h2>
          <p className="mt-3 text-body-sm text-muted">
            DocRack is a product of Orbicle Labs Pvt. Ltd., registered in India. For commercial,
            security or press enquiries, use the{' '}
            <a
              href="/support"
              className="text-accent underline decoration-1 underline-offset-[3px] hover:decoration-2"
            >
              contact form
            </a>{' '}
            — it reaches the team directly rather than a queue.
          </p>
        </Panel>
      </Section>

      <CtaSection
        heading="Bring one audit procedure. See it become a repeatable test."
        body="We will configure it with you against your own evidence, and show you the working paper it produces."
      />
    </>
  );
}
