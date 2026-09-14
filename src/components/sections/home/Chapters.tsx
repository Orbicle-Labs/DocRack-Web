import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { OutcomeLabel } from '@/components/ui/OutcomeLabel';
import { fixtures, resultStates } from '@/content/demos/fixtures';
import { p2p } from '@/content/demos/p2p';
import { home, procedures } from '@/content/pages/home';

const fixture = fixtures.p2p;

export function RecipeChapter() {
  return (
    <section
      data-chapter="recipe"
      className="home-chapter design-container"
      aria-labelledby="recipe-title"
    >
      <div className="home-split">
        <div className="chapter-copy">
          <p className="eyeline">02 / The procedure behind the result</p>
          <h2 id="recipe-title">
            Your audit procedure,
            <br />
            <span className="editorial">made repeatable.</span>
          </h2>
          <p>{home.sections[1].paragraphs[0]}</p>
          <a className="text-action" href="/product/audit-test-recipes">
            Explore Audit Test Recipes <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="procedure-sheet">
          <p className="eyeline">Illustrative procedure → draft Recipe</p>
          <blockquote>
            “Compare the invoice subtotal with the approved purchase-order amount. Investigate
            differences above {p2p.tolerance}.”
          </blockquote>
          <dl className="home-rows">
            <div>
              <dt>Scope</dt>
              <dd>
                Objective: establish amount agreement.
                <br />
                Risk: invoice overstatement.
                <br />
                PO-backed invoices · Q1 FY27 · invoice, PO and supporting sources.
              </dd>
            </div>
            <div>
              <dt>Logic</dt>
              <dd>
                Extract subtotal and PO reference. Reconcile to the approved PO as amount authority.
                Check absolute difference against {p2p.tolerance}; retain all six result states and
                source Traces.
              </dd>
            </div>
            <div>
              <dt>Control</dt>
              <dd>
                Set exception severity, reviewer requirements and output before approval. Record
                author, approver, version and effective date.
              </dd>
            </div>
          </dl>
          <div className="version-relationship">
            <p className="caption">{p2p.policy} · effective 1 April 2026</p>
            <span aria-hidden="true">↓</span>
            <p className="caption">
              {p2p.recipe} · {fixture.recipe.approval}
            </p>
            <span aria-hidden="true">↓</span>
            <p className="caption">
              {fixture.run} · {fixture.review}
            </p>
          </div>
          <p className="caption">
            A newly interpreted procedure is a draft until a person approves it. This illustration’s
            existing v3 approval is separate from approval of its results.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CoverageChapter() {
  const population = fixture.population;
  return (
    <section
      data-chapter="coverage"
      className="home-chapter coverage-chapter"
      aria-labelledby="coverage-title"
    >
      <div className="design-container">
        <div className="home-split">
          <div className="chapter-copy">
            <p className="eyeline">03 / Coverage and judgement</p>
            <h2 id="coverage-title">
              Know what was tested.
              <br />
              <span className="editorial">See what needs attention.</span>
            </h2>
          </div>
          <p className="chapter-aside">
            One configured check per eligible record. These are illustrative population counts, not
            an assurance or accuracy measure.
          </p>
        </div>
        <div className="coverage-headline">
          <strong className="numbers">
            {population.completed}
            <span> / {population.eligible}</span>
          </strong>
          <p>
            eligible records completed execution.
            <br />
            Completion does not resolve human review.
          </p>
        </div>
        <dl className="coverage-strip numbers">
          {[
            ['Received', population.received],
            ['Excluded', population.excluded],
            ['Eligible', population.eligible],
            ['Completed', population.completed],
            ['Awaiting evidence', population.awaitingEvidence],
            ['Processing errors', population.processingFailures],
          ].map(([label, count]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{count}</dd>
            </div>
          ))}
        </dl>
        <ul className="outcome-legend">
          {resultStates.map((state) => (
            <li key={state}>
              <OutcomeLabel outcome={state} />
              <strong className="numbers">{fixture.outcomes[state]}</strong>
            </li>
          ))}
        </ul>
        <p className="caption">
          Six states across {population.eligible} eligible records. Excluded records are separate
          from Not applicable outcomes. Missing evidence remains separate unless the configured
          completeness procedure makes its absence a failure.
        </p>
        <div className="judgement-layout">
          <div>
            <h3>AI assists. Code compares. People approve.</h3>
            <p>
              AI extracts and drafts; deterministic code performs the configured arithmetic. A
              reviewer assesses sources, resolves uncertainty and owns the conclusion.
            </p>
            <a className="text-action" href="/review-and-findings">
              Explore review and findings <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <details className="home-disclosure">
            <summary>
              Inspect a proposed reviewer decision <span aria-hidden="true">+</span>
            </summary>
            <p className="eyeline">Illustrative review note · not submitted</p>
            <p>
              “The difference needs investigation. Retain the amount mismatch until supporting
              evidence establishes a reason to change it.”
            </p>
            <dl className="home-rows">
              <div>
                <dt>Preparer</dt>
                <dd>Proposes a correction or override with its reason and cited evidence.</dd>
              </div>
              <div>
                <dt>Independent reviewer</dt>
                <dd>
                  Assesses the proposal under the maker-checker requirement. A preparer cannot
                  provide their own independent sign-off.
                </dd>
              </div>
              <div>
                <dt>This record</dt>
                <dd>
                  {fixture.record} · Fail / {fixture.verdict}. {fixture.review}. No override has
                  been applied.
                </dd>
              </div>
            </dl>
            <p className="caption">
              A decision needs an attributable activity record. Opening this note does not record
              approval.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

export function UseCasesChapter() {
  return (
    <section
      data-chapter="use-cases"
      className="home-chapter design-container"
      aria-labelledby="use-cases-title"
    >
      <div className="chapter-copy">
        <p className="eyeline">04 / The work your team performs</p>
        <h2 id="use-cases-title">
          Built around the procedures
          <br />
          <span className="editorial">your team repeats.</span>
        </h2>
        <p>
          {home.sections[3].paragraphs[0]} The examples below are invented illustrations, not
          current product Runs.
        </p>
      </div>
      <div className="procedure-list">
        {procedures.map(({ fixture: example, label, inputs, check, exception, href }, index) => (
          <article className="procedure-row" key={example.id}>
            <div>
              <p className="eyeline">
                0{index + 1} / {example.record}
              </p>
              <h3>{label}</h3>
              <p className="caption">{inputs}</p>
            </div>
            <div>
              <dl className="procedure-facts">
                <div>
                  <dt>Configured check</dt>
                  <dd>{check}</dd>
                </div>
                <div>
                  <dt>Possible exception</dt>
                  <dd>{exception}</dd>
                </div>
                <div>
                  <dt>Review output</dt>
                  <dd>
                    Record-level exception with source Traces and rule citation.{' '}
                    {example.workingPaper}.
                  </dd>
                </div>
              </dl>
              <details className="home-disclosure">
                <summary>
                  Inspect this example’s sources <span aria-hidden="true">+</span>
                </summary>
                <p className="caption">
                  {example.run} · {example.policy.title} v{example.policy.version} ·{' '}
                  {example.policy.clause}
                </p>
                {example.traces.map((trace, traceIndex) => (
                  <p className="caption" key={traceIndex}>
                    {trace.file} · {trace.location}
                    <br />
                    {trace.role} · {trace.normalised}
                  </p>
                ))}
                <a className="text-action" href={href}>
                  Explore {label.toLowerCase()} <ArrowRight size={18} aria-hidden="true" />
                </a>
              </details>
            </div>
          </article>
        ))}
      </div>
      <p className="caption home-note">
        Operational and compliance procedures follow the same supplied-evidence model. Scope,
        applicable sources and suitability need evaluation; document checks do not replace
        observation or professional judgement.
      </p>
    </section>
  );
}

export function OutputChapter() {
  const contents = [
    [
      'Scope and population',
      `${fixture.title} · 1 April–30 June 2026. 200 received, 10 excluded, 190 eligible; 180 completed, 6 awaiting evidence, 4 processing errors.`,
    ],
    [
      'Procedure and criteria',
      `${p2p.recipe}. ${p2p.policy}. Compare invoice subtotal with approved PO amount; tolerance ${p2p.tolerance}.`,
    ],
    [
      'Exception register',
      `${fixture.record} · ${fixture.verdict}. Expected ${fixture.expected}; actual ${fixture.actual}; difference ${p2p.difference}. Confirmation outstanding.`,
    ],
    [
      'Source references',
      `${p2p.invoice} · page 1 · subtotal region · v1. ${p2p.sheet} · ${p2p.cell} · v1. Original and normalised values stay with their Traces.`,
    ],
    [
      'Comments and sign-offs',
      'Review incomplete. No confirmed finding, submitted override or final sign-off. Approved working papers lock in the product model; later changes create a new version. This illustration is a draft.',
    ],
  ];
  return (
    <section
      id="reviewer-output"
      data-chapter="output"
      className="home-chapter output-chapter"
      aria-labelledby="output-title"
    >
      <div className="design-container home-split">
        <div className="chapter-copy">
          <p className="eyeline">05 / What the reviewer receives</p>
          <h2 id="output-title">
            The working paper carries
            <br />
            <span className="editorial">the evidence with it.</span>
          </h2>
          <p>{home.sections[4].paragraphs[0]}</p>
          <p>Select a contents annotation to inspect the reasoning and remaining review work.</p>
          <a className="text-action" href="/working-papers">
            Explore working papers <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="paper-contents">
          <p className="eyeline">Illustrative contents · not a product export</p>
          <h3>{fixture.title}</h3>
          <p className="paper-status">{fixture.workingPaper}</p>
          <p className="caption">
            {fixture.run} · {fixture.record}
          </p>
          {contents.map(([label, text], index) => (
            <details className="paper-annotation" key={label} open={index === 0}>
              <summary>
                <span className="numbers">0{index + 1}</span>
                {label}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{text}</p>
            </details>
          ))}
          <p className="caption">
            This HTML explanation contains invented data. Discuss the required output in a demo; it
            is not a downloadable working paper.
          </p>
        </div>
      </div>
    </section>
  );
}

export function GovernanceChapter() {
  return (
    <section
      data-chapter="governance"
      className="home-chapter design-container"
      aria-labelledby="governance-title"
    >
      <div className="home-split">
        <div className="chapter-copy">
          <p className="eyeline">06 / Governance and supporting proof</p>
          <h2 id="governance-title">
            Built for evidence
            <br />
            <span className="editorial">your team is accountable for.</span>
          </h2>
          <p>
            Evaluate the controls alongside your procedure. These questions describe what to verify
            for the product environment you will use.
          </p>
          <a className="text-action" href="/security">
            Explore security evaluation <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
        <dl className="home-rows governance-rows">
          <div>
            <dt>Access and approval</dt>
            <dd>
              Verify engagement permissions, independent review and reasoned overrides with your
              team’s roles.
            </dd>
          </div>
          <div>
            <dt>Version history and activity</dt>
            <dd>
              Inspect retained input and Recipe versions, immutable completed Run history and
              attributable decisions. Integrity of a snapshot does not mean the audit passed.
            </dd>
          </div>
          <div>
            <dt>Data handling and deployment</dt>
            <dd>
              Confirm hosting regions, provider data flows, retention and contractual commitments
              for the environment being evaluated.
            </dd>
          </div>
        </dl>
      </div>
      <div className="knowledge-note">
        <p>Keep policies current. Keep answers tied to sources.</p>
        <p className="caption">
          Knowledge Hub holds versioned sources; Copilot’s role is to draft and explain with
          citations. People approve Recipes and conclusions.
        </p>
        <a className="text-action" href="/product">
          Explore the product model <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function FinalChapter() {
  return (
    <section
      data-chapter="action"
      className="home-chapter home-final"
      aria-labelledby="action-title"
    >
      <div className="design-container">
        <p className="eyeline">07 / Start with one procedure</p>
        <h2 id="action-title">
          See your audit workflow
          <br />
          <span className="editorial">in DocRack.</span>
        </h2>
        <p>{home.sections[6].paragraphs[0]}</p>
        <div className="opening-actions">
          <Button
            href="/book-demo"
            size="lg"
            iconRight={<ArrowRight size={18} aria-hidden="true" />}
          >
            Book a demo
          </Button>
          <a className="text-action" href="/support">
            Ask a question ↗
          </a>
        </div>
        <p className="caption home-note">
          Describe the procedure. Please keep confidential audit evidence out of the enquiry form.
        </p>
      </div>
    </section>
  );
}
