/**
 * The two solution pages built at launch. §15 lists six; §9 forbids creating
 * empty routes to fill a nav, so the other four ship when there is something
 * specific to say about them.
 *
 * Each page reuses a UseCase from lib/content/use-cases.ts for its worked
 * example rather than restating one — a solution page whose example disagrees
 * with the homepage is worse than a solution page without an example.
 */

export interface SolutionPage {
  path: string;
  useCaseKey: string;
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; heading: string; sub: string };
  visual: { src: `/${string}`; alt: string; caption: string };
  /** The specific work this audience does, as ledger rows. */
  scope: { title: string; body: string }[];
  /** What changes for them. Not metrics — we have none we can publish. */
  outcomes: { eyebrow: string; heading: string; items: string[] };
  cta: { heading: string; body: string };
}

export const internalAudit: SolutionPage = {
  path: '/solutions/internal-audit',
  useCaseKey: 'invoice',
  metaTitle: 'Internal audit',
  metaDescription:
    'Configure a procedure once, run it across the whole population, and produce a working ' +
    'paper the audit committee can follow back to source.',
  hero: {
    eyebrow: 'Internal audit',
    heading: 'Test the whole population before the committee reads the number.',
    sub:
      'Internal audit is judged on coverage and on defensibility. DocRack runs a configured ' +
      'procedure across everything in scope and keeps the line from each conclusion back to the ' +
      'document page it came from.',
  },
  visual: {
    src: '/product/run-progress.png',
    alt: 'A run executing against the population, showing configured-test coverage, records processed and live per-rule results',
    caption: 'Coverage reported as the run proceeds',
  },
  scope: [
    {
      title: 'Procure-to-pay',
      body: 'Invoice against purchase order against goods receipt, with duplicate detection, tax recalculation and approval-limit checks applied to every record rather than a sample.',
    },
    {
      title: 'Board and committee reporting',
      body: 'Figures in the deck reconciled to the source workbook cell by cell, so a number that moved between drafts is caught before the meeting rather than in it.',
    },
    {
      title: 'General ledger to financial statements',
      body: 'Statement lines traced to ledger balances against a stated source-of-truth hierarchy, with tolerances agreed in advance.',
    },
    {
      title: 'Policy and process compliance',
      body: 'Company policy and SOP requirements held as citable sources, applied as configured checks, so a deviation names the clause and version it deviates from.',
    },
    {
      title: 'Follow-up on prior findings',
      body: 'Findings carry whether an issue is new, recurring or previously observed, with management response and ownership recorded against them.',
    },
  ],
  outcomes: {
    eyebrow: 'What changes',
    heading: 'The file is finished when the fieldwork is.',
    items: [
      'The procedure is configured once and re-run each cycle',
      'Coverage is reported, so untested records are visible rather than absent',
      'Exceptions arrive with the rule and the evidence already attached',
      'The working paper is generated from the run, not rebuilt afterwards',
      'A reviewer confirms a conclusion without reopening the source file',
    ],
  },
  cta: {
    heading: 'Run one of your procedures with us.',
    body: 'Bring a test your team runs every cycle. We will configure it and run it against your evidence.',
  },
};

export const creditLoanAudit: SolutionPage = {
  path: '/solutions/credit-loan-audit',
  useCaseKey: 'credit',
  metaTitle: 'Credit and loan audit',
  metaDescription:
    'Sanction, disbursement and documentation testing across the loan population, with each ' +
    'exception linked to the borrower file and the policy clause it breaches.',
  hero: {
    eyebrow: 'Credit and loan audit',
    heading: 'Every file tested against the policy that governs it.',
    sub:
      'Credit audit is document-heavy and rule-heavy, which is exactly the combination sampling ' +
      'handles worst. DocRack applies the eligibility, approval and documentation rules to the ' +
      'whole population and cites the clause behind each failure.',
  },
  visual: {
    src: '/product/finding.png',
    alt: 'Audit finding with condition, criteria, cause, consequence, recommendation and the management response',
    caption: 'Confirmed exceptions grouped into an observation',
  },
  scope: [
    {
      title: 'Sanction-terms compliance',
      body: 'Sanction letters read against the approved terms — limits, tenor, rate, security and covenants — with each breach linked to the clause and the page it was read from.',
    },
    {
      title: 'Disbursement against sanction',
      body: 'Amounts disbursed reconciled to what was sanctioned, including tranches, so an over-disbursement surfaces as an exception with both figures and their sources.',
    },
    {
      title: 'Documentation completeness',
      body: 'The borrower file checked against the documents the policy requires for that product and borrower type. A missing document is reported as insufficient evidence, never as a pass.',
    },
    {
      title: 'Approval authority',
      body: 'Each approval tested against the delegation matrix in force on the date it was given, so an authority breach is judged against the right version of the matrix.',
    },
    {
      title: 'Interest and charge recalculation',
      body: 'Rates, charges and schedules recomputed deterministically from the sanctioned terms and compared with what was applied.',
    },
  ],
  outcomes: {
    eyebrow: 'What changes',
    heading: 'Coverage without the file-by-file read.',
    items: [
      'The whole loan population tested, not the sample time allowed',
      'Each exception opened against the borrower file page behind it',
      'Policy versions and effective dates applied as at the sanction date',
      'Missing documents reported as insufficient evidence, not as failures',
      'A loan-level working paper with the exception register alongside',
    ],
  },
  cta: {
    heading: 'Bring a sample of loan files.',
    body: 'We will configure your sanction and documentation checks and run them on the call.',
  },
};

export const SOLUTION_PAGES = [internalAudit, creditLoanAudit] as const;
