import Link from 'next/link';
import { fixtures } from '@/content/demos/fixtures';

/** Evaluation questions, not format support badges. C19, C20, C21. */
export function FormatEvaluation() {
  return (
    <section className="format-evaluation" aria-label="Input format evaluation">
      <table>
        <caption>Confirm each stage for your actual files.</caption>
        <thead>
          <tr>
            <th scope="col">Input</th>
            <th scope="col">Extraction and source review</th>
            <th scope="col">Output to verify</th>
          </tr>
        </thead>
        <tbody>
          {[
            [
              'Born-digital PDF',
              'Check text, tables and the exact cited page/region.',
              'Compared values and page references in the paper.',
            ],
            [
              'Scanned PDF / images',
              'Check legibility, extraction confidence and corrections. Assess each language/script separately.',
              'Original value, correction history and usable source reference.',
            ],
            [
              'XLSX / CSV',
              'Check data types, rows, formula values and the exact sheet/cell.',
              'Stored values and source locations that a reviewer can follow.',
            ],
            [
              'Word / PowerPoint / email / ZIP',
              'Confirm admission, extraction and preview separately; acceptance is not established here.',
              'A representative round-trip from source to reviewed output.',
            ],
          ].map(([format, review, output]) => (
            <tr key={format}>
              <th scope="row">{format}</th>
              <td>{review}</td>
              <td>{output}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="caption">
        Current format acceptance is unverified. File admission does not establish extraction,
        preview or export support.
      </p>
    </section>
  );
}

export function PaperContents() {
  const f = fixtures.p2p;
  return (
    <figure className="paper-contents">
      <figcaption>Illustrative contents explanation · not an exported working paper</figcaption>
      <p className="eyeline">
        {f.run} · {f.period.label}
      </p>
      <h2>Working paper / P2P amount check</h2>
      <p>
        <strong>{f.workingPaper}</strong> · {f.review}
      </p>
      {[
        [
          'Scope and coverage',
          'Invoice subtotal comparison for Q1 FY27. 200 received, 190 eligible, 180 completed, 10 excluded, 6 awaiting evidence and 4 processing failures.',
        ],
        [
          'Procedure and criteria',
          'Recipe v3, inputs v1. Invoice subtotal against approved PO; ₹1 tolerance. Synthetic Procurement Policy v3 §4.2.',
        ],
        [
          'Exception register',
          'DEMO-0042: expected ₹1,20,000; actual ₹1,25,000; difference ₹5,000. Amount mismatch. Reviewer confirmation is outstanding.',
        ],
        [
          'Evidence index',
          'DEMO-0042.pdf, page 1, subtotal region; purchase-orders.xlsx, Orders!H43. Original and normalised values are retained in the illustrated source explanation.',
        ],
        [
          'Comments, findings and sign-offs',
          'No confirmed exceptions, finding, override reason or conclusion approval is recorded. Preparation and review must be completed before locking; later changes create a new version.',
        ],
      ].map(([title, body]) => (
        <details key={title} open>
          <summary>{title}</summary>
          <p>{body}</p>
        </details>
      ))}
      <Link className="text-action" href="/book-demo">
        Discuss the output and evidence links you need ↗
      </Link>
    </figure>
  );
}

export function FindingRelationship() {
  return (
    <section className="version-chain" aria-label="Illustrative exception to finding relationship">
      <p className="eyeline">Illustrative relationship · no finding raised</p>
      <h2 className="text-h3">A record issue needs a reviewed conclusion.</h2>
      <ol>
        <li>
          <strong>DEMO-0042 / Amount mismatch</strong>
          <br />
          Invoice page 1 and PO Orders!H43; Policy v3 §4.2. Awaiting reviewer confirmation.
        </li>
        <li>
          <strong>Preparer and reviewer assess the source.</strong>
          <br />
          Confirm, correct or override with an attributable reason. Uncertainty stays visible until
          resolved.
        </li>
        <li>
          <strong>Only confirmed related exceptions can support a finding.</strong>
          <br />
          Document criteria, condition, cause, impact, severity, recommendation, management
          response, owner, target date and sign-offs. This example has zero confirmed exceptions and
          no finding.
        </li>
      </ol>
    </section>
  );
}
