import { LegalLayout, type LegalSection } from '@/components/sections/LegalLayout';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Privacy',
  description:
    'What docrack.ai collects when you use this website, why, where it goes, and how to have it ' +
    'removed.',
  path: '/privacy',
});

/**
 * Scope: this WEBSITE only.
 *
 * Every statement below is written from what the code in this repository
 * actually does — the two form handlers in app/api, lib/sheets.ts,
 * lib/notify.ts, lib/rate-limit.ts and the analytics script in app/layout.tsx.
 * Nothing here describes the DocRack product, which is governed by the
 * agreement a customer signs.
 *
 * Deliberately absent: any claim about a certification, a hosting region, a
 * data-residency guarantee or a statutory compliance status. Those are not
 * verified, and a privacy policy is the worst possible place to overstate one.
 */
const SECTIONS: LegalSection[] = [
  {
    heading: 'What this policy covers',
    blocks: [
      'This policy applies to docrack.ai, the marketing website. It does not cover the DocRack application itself: if your organisation uses DocRack, the handling of your audit evidence is governed by the agreement between us and your organisation, not by this page.',
    ],
  },
  {
    heading: 'What we collect',
    blocks: [
      'We collect only what you type into one of the two forms on this site.',
      'The demo request form collects:',
      [
        'Your full name',
        'Your work email address',
        'Your organisation name',
        'The approximate number of audits your team runs each year',
      ],
      'The support form collects:',
      ['Your full name', 'Your email address', 'The message you write'],
      'We do not ask for, and you should not send us, audit evidence or personal data about third parties through either form.',
    ],
  },
  {
    heading: 'Why we collect it',
    blocks: [
      'To reply to you, to arrange and run a demonstration, and to follow up about that conversation. We do not use these details for anything else, we do not send a newsletter, and we do not sell, rent or share them with anyone for their own marketing.',
    ],
  },
  {
    heading: 'Where it goes',
    blocks: [
      'A submission is written to a Google Sheet that acts as our record of the enquiry, and a notification email is sent to our team through Resend, an email delivery provider. Those two services process the details above on our behalf in order to provide those functions.',
      'Nothing else receives your submission.',
    ],
  },
  {
    heading: 'Analytics',
    blocks: [
      'In production we load Vercel Analytics, which records aggregate page views and performance measurements. It does not use cookies to identify you and does not build a cross-site profile of you. Because it sets no cookies for this purpose, this site shows no cookie banner — there is nothing to consent to.',
    ],
  },
  {
    heading: 'IP addresses',
    blocks: [
      'When you submit a form, your IP address is used in memory to apply a rate limit — three demo requests per twenty minutes and five support messages per thirty minutes, per address — so the forms cannot be flooded. It is held only for the length of that window and is never written to the record of your enquiry.',
    ],
  },
  {
    heading: 'How long we keep it',
    blocks: [
      'We keep an enquiry for as long as we need it to respond to you and to maintain a record of the conversation. If you ask us to delete it, we will, and we will confirm when it is done.',
    ],
  },
  {
    heading: 'Your choices',
    blocks: [
      'You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Send the request through the support form and it reaches the team directly.',
      'You do not need an account to ask, and we will not ask you for more information than we need to find your record.',
    ],
  },
  {
    heading: 'Security',
    blocks: [
      'The site is served over HTTPS and sends a content security policy, frame-ancestors and related headers on every response. How the DocRack product handles audit evidence is a separate and much longer conversation — the security page covers what we can say publicly, and we answer the rest in writing during an evaluation.',
    ],
  },
  {
    heading: 'Changes',
    blocks: [
      'If this policy changes, the date at the top of the page changes with it. We do not make a change retroactive to information you have already given us.',
    ],
  },
  {
    heading: 'Contact',
    blocks: [
      'DocRack is a product of Orbicle Labs Pvt. Ltd., registered in India. For any question about this policy, or to make a request about your information, use the support form on this site.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy"
      updated="2026-09-01"
      intro="This site collects what you type into one of its two forms, and nothing else. This page says exactly what that is, where it goes, and how to have it removed."
      sections={SECTIONS}
    />
  );
}
