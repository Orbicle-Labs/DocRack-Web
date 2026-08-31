import { LegalLayout, type LegalSection } from '@/components/sections/LegalLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Terms',
  description: 'The terms that apply to your use of the docrack.ai website.',
  path: '/terms',
});

/**
 * Website terms only — this is not a product agreement, and it deliberately
 * does not pretend to be one. Access to the DocRack application is governed by
 * a signed contract; nothing on a public page should appear to vary it.
 *
 * The governing-law and jurisdiction clause below states India, consistent with
 * Orbicle Labs Pvt. Ltd. being registered there. Anything more specific — a
 * named city, an arbitration seat, a liability cap in figures — belongs to
 * counsel, not to a marketing site.
 */
const SECTIONS: LegalSection[] = [
  {
    heading: 'What these terms cover',
    blocks: [
      'These terms apply to your use of docrack.ai, this website. They do not govern use of the DocRack application: if your organisation has a contract with us, that contract governs the product, and nothing on this page varies it.',
    ],
  },
  {
    heading: 'Using this site',
    blocks: [
      'You may read this site, share links to it, and quote from it with attribution. You may not:',
      [
        'Attempt to gain access to any part of the site or its systems you have not been given access to',
        'Interfere with the site, its availability, or anyone else’s use of it',
        'Scrape or automate submissions to the forms',
        'Present the content as your own, or use our name or logo in a way that implies a relationship that does not exist',
      ],
    ],
  },
  {
    heading: 'The forms',
    blocks: [
      'The two forms on this site are for genuine enquiries. Submitting one does not create a contract, an obligation on us to provide a demonstration, or any commercial commitment by either of us. Please do not send audit evidence, personal data about other people, or anything confidential through them.',
      'How we handle what you do send is set out on the privacy page.',
    ],
  },
  {
    heading: 'Content on this site',
    blocks: [
      'The text, design, screenshots and graphics on this site belong to Orbicle Labs Pvt. Ltd. or are used with permission. Product screenshots show synthetic demonstration data — they are not, and must not be read as, the records of any customer.',
      'Descriptions of the product describe what it does at the time of writing. Software changes, and a description on a website is not a specification or a warranty.',
    ],
  },
  {
    heading: 'No professional advice',
    blocks: [
      'Nothing on this site is audit, accounting, legal or regulatory advice, and it is not a substitute for the professional judgement of a qualified auditor. DocRack executes procedures that a person configures and a person approves; responsibility for an audit conclusion rests with the auditor who signs it.',
    ],
  },
  {
    heading: 'Availability',
    blocks: [
      'We aim to keep the site available but do not promise that it will be uninterrupted or error-free, and we may change or withdraw any part of it without notice.',
    ],
  },
  {
    heading: 'Links to other sites',
    blocks: [
      'Where this site links to something we do not run, we are not responsible for its content or its handling of your information.',
    ],
  },
  {
    heading: 'Liability',
    blocks: [
      'To the extent the law permits, we are not liable for loss arising from your use of, or inability to use, this website, or from reliance on anything published on it. Nothing here limits liability that cannot lawfully be limited.',
    ],
  },
  {
    heading: 'Governing law',
    blocks: [
      'These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from them.',
    ],
  },
  {
    heading: 'Changes and contact',
    blocks: [
      'If these terms change, the date at the top of the page changes with them. Questions about this page can go through the support form.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms"
      updated="2026-09-01"
      intro="These terms cover your use of this website. Use of the DocRack application is governed by the agreement your organisation signs with us."
      sections={SECTIONS}
    />
  );
}
