/**
 * Every string on the homepage. Kept out of JSX because the positioning is
 * new and this copy will churn — reviewing prose in a data file is far easier
 * than reviewing it inside markup, and Phase 3's solution pages reuse it.
 *
 * Language follows §3: Audit Test Recipe, evidence, population, exception,
 * working paper. No "AI audits everything", no "replace auditors", no
 * unqualified assurance claims.
 */

export const hero = {
  headline: 'Run audit fieldwork faster. Defend every conclusion.',
  sub:
    'DocRack turns documents, Excel, system data and company policies into repeatable ' +
    'audit tests, source-linked exceptions and review-ready working papers.',
  primaryCta: 'Book a demo',
  secondaryCta: 'See how it works',
} as const;

export const trust = {
  // "Backed by", never "Trusted by" — these are recognitions, not customers.
  eyebrow: 'Backed by',
  items: [
    { src: '/logos/nvidia-inception.png', alt: 'NVIDIA Inception Program', caption: null },
    { src: '/logos/iit-bombay.png', alt: 'IIT Bombay', caption: 'IDEAS Program' },
  ],
} as const;

export const problem = {
  eyebrow: 'The problem',
  heading: 'Audit evidence is everywhere. The audit trail should not be.',
  points: [
    {
      title: 'Evidence sits in separate places',
      body: 'Documents, Excel workbooks, ERP exports and company policies each live somewhere else, so assembling a single test means assembling its inputs first.',
    },
    {
      title: 'The same extraction happens twice',
      body: 'Auditors re-key the same fields and repeat the same matching work across engagements, because last quarter’s procedure was never captured as anything reusable.',
    },
    {
      title: 'Sampling leaves the rest untested',
      body: 'A configured test runs against the sample that time allowed, and the remainder of the population is never put through it.',
    },
    {
      title: 'Reviewers cannot trace quickly',
      body: 'Confirming a conclusion means reopening the source file and finding the page or cell it came from, by hand, one exception at a time.',
    },
    {
      title: 'Working papers are assembled afterwards',
      body: 'Testing finishes, and only then does someone rebuild the scope, procedure, results and exceptions into a document a reviewer can sign.',
    },
  ],
} as const;

export const workflow = {
  eyebrow: 'How DocRack works',
  heading: 'From evidence to working paper, in one traceable line.',
  steps: [
    {
      key: 'documents',
      title: 'Documents',
      summary: 'Upload PDFs, scans, Excel files and system exports, then classify each input.',
      detail:
        'Every input is classified by its role — population, evidence, source of truth, policy or reference data. Extracted fields keep their document, page and cell provenance, along with confidence and any human edit.',
    },
    {
      key: 'recipe',
      title: 'Audit Test Recipe',
      summary: 'Configure the objective, sources, rules, tolerances and outcomes. Then version it.',
      detail:
        'A recipe defines what is being tested and how: fields to extract, the source-of-truth hierarchy, calculations and tolerances, the policies and regulations that apply, and what counts as pass, fail or insufficient evidence.',
    },
    {
      key: 'run',
      title: 'Run',
      summary: 'Execute an approved recipe against a defined population.',
      detail:
        'The run freezes the recipe version and the input versions it used, tracks coverage and failures, and stays reproducible — the same run can be re-performed later and produce the same result.',
    },
    {
      key: 'review',
      title: 'Review',
      summary: 'Work the exceptions and the low-confidence results.',
      detail:
        'Each item shows the rule applied, the expected value, the actual value and the evidence behind it. Reviewers confirm, override, request evidence, mark not applicable or escalate — and the identity, time and reason are recorded.',
    },
    {
      key: 'findings',
      title: 'Findings',
      summary: 'Group confirmed exceptions into audit observations.',
      detail:
        'Findings carry condition, criteria, cause, consequence and recommendation, along with management response and ownership, and track whether the issue is new, recurring or previously observed.',
    },
    {
      key: 'working-paper',
      title: 'Working Paper',
      summary: 'Generate review-ready Excel and PDF output.',
      detail:
        'Scope, population, procedure, results and exceptions, with evidence links and reviewer sign-offs intact, plus the recipe version, input versions and execution time behind every number.',
    },
  ],
} as const;

export const recipe = {
  eyebrow: 'Audit Test Recipes',
  heading: 'Configure the procedure, not just the prompt.',
  body: 'A prompt gives an answer. An Audit Test Recipe produces a repeatable, reviewable and defensible procedure.',
  points: [
    'Versioned and approved before it can be run',
    'Deterministic logic performs calculations and explicit rule checks',
    'AI extracts, classifies and explains — it does not decide the conclusion',
    'Every run records the exact recipe version it used',
  ],
} as const;

export const capabilities = {
  eyebrow: 'Capabilities',
  heading: 'Four things DocRack does across every audit type.',
  blocks: [
    {
      title: 'Collect and extract evidence',
      body: 'Documents, spreadsheets and system exports come in as classified inputs. Fields and tables are extracted with their page, cell and location provenance preserved.',
    },
    {
      title: 'Reconcile and apply rules',
      body: 'Values are matched across sources against a defined hierarchy, then calculations, tolerances, company policies and regulatory requirements are applied as configured checks.',
    },
    {
      title: 'Review exceptions and findings',
      body: 'Exceptions and low-confidence results are queued with their evidence. Reviewer decisions are recorded and confirmed exceptions become audit observations.',
    },
    {
      title: 'Generate working papers',
      body: 'Excel and PDF output carrying scope, population, procedure, results, exceptions, evidence links and sign-offs, with an exception register alongside.',
    },
  ],
  supporting: [
    {
      title: 'Knowledge Hub',
      body: 'Company policies, SOPs, regulatory requirements and reference data, each with its source, version, effective date and applicability, so a test can cite the exact rule it applied.',
    },
    {
      title: 'Copilot',
      body: 'Turns a written procedure into a draft Test Recipe, suggests fields and checks, and explains a result with citations. Exploratory chat stays separate from audit evidence until it is converted into an approved recipe.',
    },
  ],
} as const;

export const traceability = {
  eyebrow: 'Traceability',
  heading: 'From conclusion to source in one click.',
  body: 'Every result carries the rule that produced it, the values it compared, the document page or spreadsheet cell it came from, and the reviewer who signed it off.',
} as const;

export const humanReview = {
  eyebrow: 'Human review',
  heading: 'Five outcomes. Missing evidence is never one of the failures.',
  body: 'A configured test resolves to one of five states, and the auditor approves the conclusion. DocRack does not silently convert missing evidence into a failed control.',
} as const;

export const security = {
  eyebrow: 'Security',
  heading: 'Built for the way audit teams handle company information.',
  // Only capabilities that follow from the architecture. Data residency,
  // encryption specifics, retention windows, subprocessors and any
  // certification stay off the site until verified (§10.13, §16).
  points: [
    {
      title: 'Tenant isolation',
      body: 'Each organisation’s engagements, evidence and results are separated from every other tenant.',
    },
    {
      title: 'Role-based access',
      body: 'Access follows the engagement. Preparers, reviewers and approvers see the work assigned to them.',
    },
    {
      title: 'Activity logging',
      body: 'Reviewer decisions, overrides and approvals are recorded with identity, time and reason.',
    },
    {
      title: 'Evidence stays evidence',
      body: 'Inputs are versioned, and a run records the exact input versions it read, so a result can be re-performed.',
    },
  ],
  note: 'Detailed hosting, residency, retention and subprocessor information is available on request during evaluation.',
} as const;

export const finalCta = {
  heading: 'Bring one audit procedure. See it become a repeatable test.',
  body: 'We will configure it with you against your own evidence, and show you the working paper it produces.',
  primaryCta: 'Book a demo',
  secondaryCta: 'Contact the team',
} as const;
