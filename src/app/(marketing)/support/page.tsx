import Link from 'next/link';
import { SupportForm } from '@/components/forms/SupportForm';
import { Breadcrumbs, pageCopy, pageMetadata } from '@/components/sections/pages/Editorial';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqPageSchema } from '@/lib/seo/structured-data';
import { faqs } from '@/content/pages/support';
const page = pageCopy('/support');
export const metadata = pageMetadata(page.path);
export default function SupportPage() {
  return (
    <article className="v2 fieldwork-page design-container">
      <Breadcrumbs page={page} />
      <JsonLd data={faqPageSchema(faqs, page.path)} />
      <div className="demo-layout">
        <header className="demo-intro">
          <p className="eyeline">Contact and support</p>
          <h1>{page.heading}</h1>
          <p>{page.introduction}</p>
          <a className="text-action mobile-form-jump" href="#support-request">
            Go to the enquiry form ↓
          </a>
        </header>
        <section id="support-request" className="demo-form-panel" aria-labelledby="support-title">
          <h2 id="support-title">Send a message</h2>
          <p className="caption">
            Keep passwords, bank details, borrower records and confidential audit evidence out of
            this form.
          </p>
          <SupportForm />
        </section>
        <section className="demo-agenda page-faq" aria-label="Common questions">
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
          <p className="caption">
            Ask about the inputs, procedure and review output you need. For an evaluation
            conversation, <Link href="/book-demo">request a demo</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
