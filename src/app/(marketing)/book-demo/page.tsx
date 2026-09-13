import Link from 'next/link';
import { DemoForm } from '@/components/forms/DemoForm';
import { buildMetadata } from '@/lib/seo/metadata';
export const metadata = buildMetadata({
  title: 'Book a demo',
  description:
    'Request a DocRack demo to discuss your audit workflow, source-linked review and working papers.',
  path: '/book-demo',
});
export default function BookDemoPage() {
  return (
    <div className="v2 design-container demo-layout">
      <div className="demo-intro">
        <p className="eyeline">Book a demo</p>
        <h1>
          Let’s talk
          <br />
          about your
          <br />
          <span className="editorial">audit workflow.</span>
        </h1>
        <p>
          Explore a procedure, inspect an exception, and discuss what your reviewer needs to see.
        </p>
        <a className="text-action mobile-form-jump" href="#demo-request">
          Go to the request form <span aria-hidden="true">↓</span>
        </a>
      </div>
      <section id="demo-request" className="demo-form-panel" aria-labelledby="form-title">
        <p className="eyeline">A conversation starts here</p>
        <h2 id="form-title">Request a demo</h2>
        <p className="caption">
          Share a few details. This is an enquiry, not a calendar reservation.
        </p>
        <DemoForm />
      </section>
      <div className="demo-agenda">
        <p className="eyeline">What we can explore</p>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h2>The procedure</h2>
              <p>Your scope, evidence and review requirements.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h2>The exception</h2>
              <p>A result, the source behind it and the rule applied.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h2>The working paper</h2>
              <p>How the procedure and review decisions fit together.</p>
            </div>
          </li>
        </ol>
        <p className="caption">
          Please don’t send confidential audit documents through this form. For a product or support
          question, <Link href="/support">contact us</Link>.
        </p>
      </div>
    </div>
  );
}
