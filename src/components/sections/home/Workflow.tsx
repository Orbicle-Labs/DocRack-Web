import { SourceReview } from '@/components/demos/SourceReview';
import { WorkflowViewer } from '@/components/product-demo/WorkflowViewer';
import { fixtures } from '@/content/demos/fixtures';
import { p2p } from '@/content/demos/p2p';
import { workflowSteps } from '@/content/pages/home';

const fixture = fixtures.p2p;
export function Workflow() {
  return (
    <section
      id="workflow"
      data-chapter="workflow"
      className="evidence-chapter"
      aria-labelledby="workflow-title"
    >
      <div className="design-container">
        <div className="chapter-intro">
          <div>
            <p className="eyeline">01 / The evidence, in focus</p>
            <h2 id="workflow-title">
              Follow one invoice
              <br />
              from source to review.
            </h2>
          </div>
          <p>Select a step. Inspect the evidence. Keep the conclusion in human hands.</p>
        </div>
        <p className="workflow-caption caption">
          Interactive example · synthetic data. Representative interface, not a product capture.
        </p>
        <WorkflowViewer>
          {workflowSteps.map((step, index) =>
            index === 3 ? (
              <SourceReview key={step.label} />
            ) : (
              <div className="workflow-stage" key={step.label}>
                <div className="stage-copy">
                  <p className="eyeline">
                    {step.label} / {p2p.record}
                  </p>
                  <h3>{step.heading}</h3>
                  <p>{step.text}</p>
                </div>
                <div className="stage-record">
                  {index === 0 && (
                    <dl className="home-rows">
                      {[
                        [p2p.invoice, 'Primary evidence · page 1 · v1'],
                        [p2p.sheet, `Source of truth · ${p2p.cell} · v1`],
                        ['ERP payment export', 'Population · illustrative input v1'],
                        ['Goods-receipt rows', 'Supporting evidence · illustrative input v1'],
                        ['Supplier / PO mappings', 'Reference data · illustrative input v1'],
                        [p2p.policy, 'Policy/regulation · effective 1 April 2026'],
                      ].map(([file, role]) => (
                        <div key={file}>
                          <dt>{file}</dt>
                          <dd>{role}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {index === 1 && (
                    <>
                      <p className="eyeline">{p2p.recipe}</p>
                      <blockquote>{fixture.policy.text}</blockquote>
                      <dl className="home-rows">
                        <div>
                          <dt>Matching key</dt>
                          <dd>PO reference · PO-0042</dd>
                        </div>
                        <div>
                          <dt>Approval</dt>
                          <dd>{fixture.recipe.approval}</dd>
                        </div>
                        <div>
                          <dt>Result review</dt>
                          <dd>{fixture.review}</dd>
                        </div>
                      </dl>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <p className="eyeline">{fixture.run}</p>
                      <dl className="home-rows">
                        <div>
                          <dt>Version snapshot</dt>
                          <dd>
                            Recipe v{fixture.recipe.version} · inputs v{fixture.inputsVersion}
                          </dd>
                        </div>
                        <div>
                          <dt>Execution context</dt>
                          <dd>
                            Engine {fixture.engine} · model {fixture.model}
                            <br />
                            Illustrative identifiers
                          </dd>
                        </div>
                        <div>
                          <dt>Completed</dt>
                          <dd>
                            {fixture.population.completed} of {fixture.population.eligible} eligible
                            records
                          </dd>
                        </div>
                        <div>
                          <dt>Review</dt>
                          <dd>{fixture.review}</dd>
                        </div>
                      </dl>
                    </>
                  )}
                  {index === 4 && (
                    <>
                      <p className="eyeline">Finding / {fixture.finding.status}</p>
                      <h3>{fixture.finding.relatedConfirmedExceptions} confirmed exceptions</h3>
                      <p className="caption">
                        Related record: {fixture.record} · {fixture.verdict} · confirmation
                        outstanding.
                      </p>
                      <hr />
                      <p>Criteria → condition → cause → impact → recommendation → sign-offs</p>
                      <p className="caption">
                        These are the fields a reviewer would develop after confirming related
                        exceptions. They are not a finding from this Run.
                      </p>
                    </>
                  )}
                  {index === 5 && (
                    <>
                      <p className="eyeline">Illustrative contents · not an export</p>
                      <h3>{fixture.workingPaper}</h3>
                      <dl className="home-rows">
                        <div>
                          <dt>Scope and procedure</dt>
                          <dd>
                            {fixture.title} · {p2p.recipe}
                          </dd>
                        </div>
                        <div>
                          <dt>Evidence index</dt>
                          <dd>
                            {p2p.invoice} · page 1<br />
                            {p2p.sheet} · {p2p.cell}
                          </dd>
                        </div>
                        <div>
                          <dt>Sign-off</dt>
                          <dd>Outstanding; review is incomplete.</dd>
                        </div>
                      </dl>
                      <a className="text-action" href="#reviewer-output">
                        Inspect the contents ↓
                      </a>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </WorkflowViewer>
        <details className="workflow-transcript">
          <summary>
            Read all six steps and source references <span aria-hidden="true">+</span>
          </summary>
          <ol>
            {workflowSteps.map((step) => (
              <li key={step.label}>
                <h3>{step.label}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <h3>Source Traces for {fixture.record}</h3>
          {fixture.traces.map((trace) => (
            <p key={trace.file}>
              {trace.role}: {trace.file} · {trace.location} · v{trace.version}. Original “
              {trace.raw}” → {trace.normalised}. {trace.method}; {trace.corrections.toLowerCase()}.
            </p>
          ))}
          <p>
            {p2p.policy} · effective 1 April 2026. {fixture.policy.text} Invented company policy,
            not a regulatory requirement.
          </p>
        </details>
        <div className="evidence-footnote">
          <p>
            Missing evidence is reported separately unless the configured procedure explicitly
            defines its absence as a failure.
          </p>
          <p>
            Copilot drafts and explains. Auditors approve Recipes and conclusions; overrides require
            a reason and an attributable record.
          </p>
        </div>
      </div>
    </section>
  );
}
