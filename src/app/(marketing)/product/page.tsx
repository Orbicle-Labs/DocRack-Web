import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { Disclosure } from '@/components/ui/Disclosure';
import { ProductFigure } from '@/components/ui/ProductFigure';
import { buildMetadata } from '@/lib/seo/metadata';
import { p2p } from '@/content/demos/p2p';
export const metadata = buildMetadata({
  title: 'Product',
  description:
    'Explore how evidence, an Audit Test Recipe, a versioned Run and human review fit together in an illustrative fieldwork example.',
  path: '/product',
});
const steps = [
  ['Documents', 'Evidence with a role and a source location.'],
  ['Tests', 'An Audit Test Recipe defines what to check.'],
  ['Runs', 'One execution, with its own version snapshot.'],
  ['Review', 'Resolve uncertainty beside the source.'],
  ['Findings', 'Group confirmed exceptions into an issue.'],
  ['Working Papers', 'Carry the procedure and decisions forward.'],
];
export default function ProductPage() {
  return (
    <div className="v2">
      <section className="design-container product-opening">
        <p className="eyeline">Product / The fieldwork system</p>
        <div className="product-heading">
          <h1>
            One procedure.
            <br />A connected
            <br />
            <span className="editorial">record of work.</span>
          </h1>
          <div>
            <p>
              Documents tell part of the story. The Audit Test Recipe defines the question, a Run
              records the execution, and review gives the result its context.
            </p>
            <Button
              href="/book-demo"
              size="lg"
              iconRight={<ArrowRight size={18} aria-hidden="true" />}
            >
              Book a demo
            </Button>
          </div>
        </div>
        <ol className="workflow-map">
          {steps.map(([title, body], i) => (
            <li key={title}>
              <span className="eyeline">0{i + 1}</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="recipe-chapter">
        <div className="design-container recipe-layout">
          <div>
            <p className="eyeline">Inside Tests / Audit Test Recipe</p>
            <h2>
              Your procedure,
              <br />
              <span className="editorial">made explicit.</span>
            </h2>
            <p>
              Extract, Reconcile and Checks belong inside Tests. The Recipe sets the scope, source
              hierarchy, calculations and reviewer requirements.
            </p>
            <Link className="text-action" href="/product/audit-test-recipes">
              Explore all 14 components <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <ProductFigure caption="Representative Recipe and Run. Fixed synthetic versions; no live processing.">
            <div className="recipe-sheet">
              <p className="eyeline">{p2p.recipe}</p>
              <h3>
                Compare invoice subtotal
                <br />
                with approved PO amount.
              </h3>
              <dl className="recipe-rows">
                <div>
                  <dt>Scope</dt>
                  <dd>
                    PO-backed invoices · Q1 FY27
                    <br />
                    Invoice, PO, goods receipt and ERP evidence
                  </dd>
                </div>
                <div>
                  <dt>Logic</dt>
                  <dd>
                    Approved PO is the amount authority.
                    <br />
                    Absolute difference ≤ ₹1.
                    <br />
                    {p2p.policy}
                  </dd>
                </div>
                <div>
                  <dt>Control</dt>
                  <dd>
                    Recipe approved by reviewer in this fixture.
                    <br />
                    Exceptions await reviewer confirmation.
                  </dd>
                </div>
              </dl>
              <div className="run-snapshot">
                <p className="eyeline">Run / {p2p.run}</p>
                <p>
                  Recipe v3 · Policy v3 · Inputs v1
                  <br />
                  Engine demo-1 · Model fixture-1
                </p>
                <p className="caption">
                  Completed Run history is immutable. A new Recipe version creates new work; it does
                  not rewrite this snapshot.
                </p>
              </div>
            </div>
          </ProductFigure>
        </div>
      </section>
      <section className="design-container responsibility-section">
        <div>
          <p className="eyeline">Assistance and accountability</p>
          <h2>
            A clear place
            <br />
            for human judgement.
          </h2>
          <p>
            Illustrative product model. Review stays incomplete until a person records a decision.
          </p>
        </div>
        <div>
          <Disclosure title="AI assists. Code compares.">
            <p>
              AI can extract, explain and draft. Deterministic code applies the configured
              arithmetic and comparisons. Copilot’s drafts require human approval.
            </p>
          </Disclosure>
          <Disclosure title="An exception is not a finding.">
            <p>
              The ₹5,000 mismatch is a record-level exception. A reviewer may group related
              confirmed exceptions into one finding, with criteria, condition and sign-offs.
            </p>
          </Disclosure>
          <Disclosure title="Know what completed and what remains.">
            <p>
              For this single-check fixture: 200 received, 10 excluded, 190 eligible. Execution
              completed for 180; 6 await evidence and 4 have processing errors. Completed outcomes:
              157 Pass, 17 Fail, 6 Needs human review. Not applicable: 0. Completion does not
              resolve human review.
            </p>
          </Disclosure>
          <Disclosure title="Keep engagement and workspace context.">
            <p>
              Documents, Tests, Runs, Review, Findings and Working Papers sit in the engagement. The
              workspace holds the reusable Test Library and versioned Knowledge Hub. Copilot assists
              across this work.
            </p>
          </Disclosure>
        </div>
      </section>
      <section className="design-container product-end">
        <h2>Start with the evidence.</h2>
        <p>Inspect the amount mismatch and its exact page, cell and rule.</p>
        <Button href="/#workflow" variant="secondary">
          Explore the source-review example <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </section>
    </div>
  );
}
