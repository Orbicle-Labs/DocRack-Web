import {
  fixtures,
  resultStates,
  syntheticLabel,
  type ExampleFixture,
} from '@/content/demos/fixtures';
import { OutcomeLabel } from '@/components/ui/OutcomeLabel';

export function EvidenceScene({ fixture = fixtures.p2p }: { fixture?: ExampleFixture }) {
  return (
    <figure className="evidence-scene">
      <figcaption>{syntheticLabel}</figcaption>
      <div className="evidence-scene-heading">
        <div>
          <p className="eyeline">
            {fixture.title} · {fixture.record}
          </p>
          <h2>{fixture.recipe.name}</h2>
        </div>
        <OutcomeLabel outcome={fixture.outcome} />
      </div>
      <div className="evidence-comparison">
        <div>
          <span>Expected</span>
          <strong>{fixture.expected}</strong>
        </div>
        <div>
          <span>Actual</span>
          <strong>{fixture.actual}</strong>
        </div>
      </div>
      <p>
        {fixture.verdict} · {fixture.review}
      </p>
      <div className="trace-list">
        {fixture.traces.map((trace) => (
          <details key={`${trace.file}-${trace.location}`} open>
            <summary>
              {trace.file} · {trace.location}
            </summary>
            <dl>
              <div>
                <dt>Role / version</dt>
                <dd>
                  {trace.role} · v{trace.version}
                </dd>
              </div>
              <div>
                <dt>Original → normalised</dt>
                <dd>
                  {trace.raw} → {trace.normalised}
                </dd>
              </div>
              <div>
                <dt>Method / corrections</dt>
                <dd>
                  {trace.method} · {trace.corrections}
                </dd>
              </div>
            </dl>
          </details>
        ))}
      </div>
      <blockquote>
        <strong>
          {fixture.policy.title} v{fixture.policy.version} {fixture.policy.clause}
        </strong>
        <p>{fixture.policy.text}</p>
        <span>
          Effective {fixture.policy.effective} · Recipe v{fixture.recipe.version}
        </span>
      </blockquote>
      <p className="caption">
        Invented source excerpts; no original files are downloadable. Confidence and exact page
        regions need evaluation against actual evidence.
      </p>
    </figure>
  );
}

export function RunRecord({ fixture = fixtures.p2p }: { fixture?: ExampleFixture }) {
  const p = fixture.population;
  return (
    <section className="run-record" aria-label="Illustrative Run snapshot">
      <p className="eyeline">Illustrative Run snapshot · {fixture.run}</p>
      <h2>
        {p.completed} of {p.eligible} eligible records completed.
      </h2>
      <p>
        One check per record · {fixture.period.label}. Completion does not resolve human review.
      </p>
      <dl className="population-counters">
        {Object.entries({
          Received: p.received,
          Eligible: p.eligible,
          'Execution completed': p.completed,
          Excluded: p.excluded,
          'Awaiting evidence': p.awaitingEvidence,
          'Processing failures': p.processingFailures,
        }).map(([name, count]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{count}</dd>
          </div>
        ))}
      </dl>
      <ul className="state-counts">
        {resultStates.map((state) => (
          <li key={state}>
            <OutcomeLabel outcome={state} />
            <strong>{fixture.outcomes[state]}</strong>
          </li>
        ))}
      </ul>
      <p className="caption">
        Outcomes total {p.eligible} eligible records; excluded records are separate. Missing
        evidence is reported separately unless the configured completeness procedure explicitly
        defines its absence as a failure.
      </p>
      <p>
        Recipe v{fixture.recipe.version} · Inputs v{fixture.inputsVersion} · illustrative engine{' '}
        {fixture.engine} / model {fixture.model}. Completed Run history is immutable. A new Recipe
        version creates new work; it does not rewrite this snapshot.
      </p>
      <p>
        <strong>{fixture.workingPaper}</strong> · Finding: {fixture.finding.status} ·{' '}
        {fixture.finding.relatedConfirmedExceptions} confirmed exceptions.
      </p>
    </section>
  );
}

export const sourceRoles = [
  ['Population', 'The ERP payment export defines the records in scope.'],
  ['Primary evidence', 'Invoice DEMO-0042.pdf supplies the actual subtotal.'],
  ['Source of truth', 'Approved PO Orders!H43 is authoritative for this amount.'],
  ['Supporting evidence', 'Goods receipts can corroborate delivery in a separate procedure.'],
  ['Reference data', 'An approved authority matrix defines approval limits.'],
  ['Policy/regulation', 'Synthetic Procurement Policy v3 §4.2 supplies the criterion.'],
] as const;
export function SourceRoles() {
  return (
    <section className="source-roles" aria-label="Six source roles">
      <p className="eyeline">Illustrative P2P source assignments</p>
      <dl>
        {sourceRoles.map(([name, description]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
