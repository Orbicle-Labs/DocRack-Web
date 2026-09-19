import Link from 'next/link';
import { DemoForm } from '@/components/forms/DemoForm';
import { Breadcrumbs, pageCopy, pageMetadata } from '@/components/sections/pages/Editorial';
const page = pageCopy('/book-demo');
export const metadata = pageMetadata(page.path);
export default function BookDemoPage() {
  return (
    <article className="v2 fieldwork-page design-container">
      <Breadcrumbs page={page} />
      <div className="demo-layout">
        <div className="demo-intro">
          <p className="eyeline">Book a demo</p>
          <h1>
            Let’s talk
            <br />
            about your
            <br />
            <span className="editorial">audit workflow.</span>
          </h1>
          <p>{page.introduction}</p>
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
                <p>
                  Your scope, supplied evidence and review requirements. Confirm specific formats
                  during evaluation.
                </p>
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
            Please don’t send confidential audit documents through this form. For a product or
            support question, <Link href="/support">contact us</Link>.
          </p>
        </div>
      </div>
    </article>
  );
}
