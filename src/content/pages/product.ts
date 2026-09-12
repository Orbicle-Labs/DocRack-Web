/**
 * Copy for /product and its children.
 *
 * Same discipline as lib/content/homepage.ts: prose lives in a data file so it
 * can be reviewed as prose. Language follows §3 — Audit Test Recipe, evidence,
 * population, exception, working paper.
 *
 * Nothing here asserts a hosting location, a certification, a customer or a
 * performance figure. The legacy pages did all four and none of it was
 * verified (§16).
 */

export const productPage = {
  hero: {
    eyebrow: 'Product',
    heading: 'One place to run a test, work its exceptions and produce the paper.',
    sub:
      'DocRack holds the evidence, the procedure and the result together, so the working paper ' +
      'is a by-product of doing the work rather than a document assembled afterwards.',
  },
  /** The reframed six-stage structure carried over from the old /workflow. */
  stages: [
    {
      title: 'Collect and classify the evidence',
      body: 'PDFs, scans, Excel workbooks and system exports arrive in one engagement and are classified by the role each plays — population, evidence, source of truth, policy or reference data.',
    },
    {
      title: 'Extract fields with their provenance',
      body: 'Values keep the document, page and cell they came from, along with extraction confidence and any human correction, so nothing in the test is a number without an origin.',
    },
    {
      title: 'Define the procedure as a recipe',
      body: 'Objective, population, inputs, calculations, tolerances and outcomes are configured once, versioned, and approved before the recipe can be run.',
    },
    {
      title: 'Run it across the population',
      body: 'A run applies the approved recipe to the whole defined population rather than the sample time allowed, and freezes the recipe and input versions it used.',
    },
    {
      title: 'Work the exceptions',
      body: 'Each item arrives with the rule applied, the expected and actual values and the evidence behind them. Confirm, override, request evidence, mark not applicable or escalate — with identity, time and reason recorded.',
    },
    {
      title: 'Produce the working paper',
      body: 'Scope, population, procedure, results, exception register, evidence links and sign-offs, generated as Excel and PDF from the run itself.',
    },
  ],
  knowledge: {
    eyebrow: 'Knowledge Hub',
    heading: 'The rule a test applied, held as a citable source.',
    body:
      'Company policies, SOPs, regulatory requirements and reference data live in the engagement ' +
      'with their source, version, effective date and applicability. A check does not just fail — ' +
      'it fails against a specific clause of a specific version of a specific policy.',
    points: [
      'Policies and SOPs versioned with effective dates',
      'Reference data held alongside the rules that use it',
      'A test cites the exact requirement it applied',
      'Superseded versions stay readable, so an old run still explains itself',
    ],
  },
  copilot: {
    eyebrow: 'Copilot',
    heading: 'Drafts the procedure. Does not decide the conclusion.',
    body:
      'Copilot turns a written procedure into a draft Test Recipe, suggests the fields and checks ' +
      'it implies, and explains a result with citations. Exploratory chat stays separate from ' +
      'audit evidence until someone converts it into a recipe and approves it.',
    points: [
      'A written procedure becomes a draft recipe you edit',
      'Suggested fields, rules and tolerances, all reviewable',
      'Answers cite the document and page behind them',
      'Nothing reaches a working paper without an approved recipe',
    ],
  },
  cta: {
    heading: 'Bring one audit procedure. See it become a repeatable test.',
    body: 'We will configure it with you against your own evidence, and show you the working paper it produces.',
  },
} as const;

export const recipesPage = {
  hero: {
    eyebrow: 'Audit Test Recipes',
    heading: 'Configure the procedure, not just the prompt.',
    sub:
      'A prompt gives an answer. An Audit Test Recipe produces a repeatable, reviewable and ' +
      'defensible procedure — the same inputs and the same version give the same result.',
  },
  anatomy: [
    {
      title: 'Objective and risk',
      body: 'What the test is for and the risk it addresses, stated before any rule is written, so a reviewer can judge whether the procedure matches the objective.',
    },
    {
      title: 'Population',
      body: 'What the test runs against, defined explicitly — the ledger, the register, the sanction file — rather than left implicit in whichever export was to hand.',
    },
    {
      title: 'Required inputs',
      body: 'The documents and data the test needs, each with the role it plays. A run that is missing one reports insufficient evidence rather than a pass.',
    },
    {
      title: 'Extracted fields',
      body: 'The values to pull from each input, with the source of truth to use when two documents disagree.',
    },
    {
      title: 'Rules and tolerances',
      body: 'Explicit measures, operators and thresholds. Deterministic logic performs the comparison — the calculation is code, not inference.',
    },
    {
      title: 'Outcomes',
      body: 'What counts as pass, fail, insufficient evidence, not applicable or needs review, decided in advance rather than argued afterwards.',
    },
  ],
  versioning: {
    eyebrow: 'Versioning and approval',
    heading: 'A run records the exact version it used.',
    points: [
      'A recipe is versioned and approved before it can be run',
      'Editing an approved recipe creates a new version rather than changing history',
      'Every run stores the recipe version and the input versions it read',
      'A run from last quarter can be re-performed and produce the same result',
    ],
  },
  cta: {
    heading: 'Send us a procedure. We will configure it as a recipe.',
    body: 'One test, your evidence, on a call. You keep the recipe and the working paper it produces.',
  },
} as const;

/** The four capability pages. One shape, so they stay consistent. */
export interface CapabilityPage {
  path: string;
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; heading: string; sub: string };
  visual: { src: `/${string}`; alt: string; caption: string };
  rows: { title: string; body: string }[];
  points: { eyebrow: string; heading: string; items: string[] };
  cta: { heading: string; body: string };
}

export const documentsPage: CapabilityPage = {
  path: '/documents',
  metaTitle: 'Documents and evidence',
  metaDescription:
    'Bring PDFs, scans, Excel workbooks and system exports into one engagement, classified by ' +
    'the role each plays, with every extracted value keeping its page and cell.',
  hero: {
    eyebrow: 'Documents',
    heading: 'Evidence in one place, classified by the job it does.',
    sub:
      'Assembling a test should not start with assembling its inputs. Everything an engagement ' +
      'needs arrives in one place and is classified by the role it plays in the procedure.',
  },
  visual: {
    src: '/product/document-intake.png',
    alt: 'Documents screen listing each engagement input with its classification, owner and extraction status',
    caption: 'Inputs classified by the role they play in the test',
  },
  rows: [
    {
      title: 'Every format an audit actually receives',
      body: 'Digital PDFs, scanned documents, Excel workbooks with real formatting, CSV extracts and system exports — the mix a real engagement arrives in, not an idealised one.',
    },
    {
      title: 'Classified by role, not by file type',
      body: 'An input is a population, evidence, a source of truth, a policy or reference data. That decision drives how the test treats it, and it is made once, visibly.',
    },
    {
      title: 'Extraction that keeps its origin',
      body: 'Each extracted field carries its document, page and cell, its confidence, and any human edit — so a number in a result can always be opened against the thing it came from.',
    },
    {
      title: 'Versioned inputs',
      body: 'A replaced document becomes a new version rather than overwriting the old one, and a run records which version it read. Re-performing a test later reads the same evidence.',
    },
    {
      title: 'Status you can see',
      body: 'What has arrived, what is still outstanding and what failed to extract, visible without asking someone — so work starts the moment the evidence lands.',
    },
  ],
  points: {
    eyebrow: 'What this replaces',
    heading: 'The document scramble, ended.',
    items: [
      'Evidence chased across email, chat and a shared drive',
      'The same field re-keyed once per engagement',
      'A reviewer asking which version of the file a number came from',
      'Extraction with no record of what a human corrected',
    ],
  },
  cta: {
    heading: 'See your own evidence go through it.',
    body: 'Bring a set of engagement documents. We will classify and extract them on the call.',
  },
};

export const reconciliationPage: CapabilityPage = {
  path: '/reconciliation-and-checks',
  metaTitle: 'Reconciliation and checks',
  metaDescription:
    'Match values across sources against a defined hierarchy, then apply calculations, ' +
    'tolerances, policies and regulatory requirements as configured checks across the population.',
  hero: {
    eyebrow: 'Reconciliation and checks',
    heading: 'Every number tested. Every number tied to source.',
    sub:
      'Configured checks run across the whole defined population rather than the sample time ' +
      'allowed, and each result carries the rule it applied and the values it compared.',
  },
  visual: {
    src: '/product/run-progress.png',
    alt: 'A run executing against the population, showing configured-test coverage, records processed and live per-rule results',
    caption: 'A run executing against the defined population',
  },
  rows: [
    {
      title: 'Matching across sources',
      body: 'Values are matched between documents, spreadsheets and system data against an explicit source-of-truth hierarchy, so a disagreement resolves by rule rather than by whoever is reconciling.',
    },
    {
      title: 'Calculations as deterministic logic',
      body: 'Recalculations, totals, ageing and derived measures are computed, not inferred. The arithmetic is code and produces the same answer every time.',
    },
    {
      title: 'Tolerances stated in advance',
      body: 'What counts as a match, a rounding difference and a genuine exception is configured in the recipe, so the threshold is a decision on the record rather than a judgement made mid-review.',
    },
    {
      title: 'Policy and regulatory checks',
      body: 'Requirements held in the Knowledge Hub are applied as configured checks, and a failure cites the specific clause and version it failed against.',
    },
    {
      title: 'The whole population, with coverage shown',
      body: 'A run reports what it covered and what it could not, so untested records are visible rather than silently absent from the conclusion.',
    },
  ],
  points: {
    eyebrow: 'Typical reconciliations',
    heading: 'The pairs teams bring us first.',
    items: [
      'Board or audit-committee deck against the source workbook',
      'General ledger against the financial statements',
      'Regulatory return against the books of account',
      'Invoice, purchase order and goods receipt against each other',
    ],
  },
  cta: {
    heading: 'Run one reconciliation cycle with us.',
    body: 'Bring the two sides you reconcile by hand today. We will configure the check and run it.',
  },
};

export const reviewPage: CapabilityPage = {
  path: '/review-and-findings',
  metaTitle: 'Review and findings',
  metaDescription:
    'Exceptions and low-confidence results are queued with their evidence. Reviewer decisions ' +
    'are recorded with identity, time and reason, and confirmed exceptions become findings.',
  hero: {
    eyebrow: 'Review and findings',
    heading: 'The auditor decides. The system records the decision.',
    sub:
      'Exceptions arrive with the rule, the values and the evidence already attached, so review ' +
      'is judgement rather than re-gathering — and every judgement is on the record.',
  },
  visual: {
    src: '/product/review-queue.png',
    alt: 'Review queue showing each exception with the rule applied, expected and actual values, outcome and severity',
    caption: 'Exceptions queued with the evidence behind them',
  },
  rows: [
    {
      title: 'A queue, not a spreadsheet of flags',
      body: 'Exceptions and low-confidence extractions are worked in one place, ordered by severity, with the rule applied and the expected and actual values on the row itself.',
    },
    {
      title: 'Evidence one click away',
      body: 'Opening an item shows the source page or spreadsheet cell each value came from, beside the rule that compared them.',
    },
    {
      title: 'Five outcomes, not two',
      body: 'A test resolves to pass, fail, insufficient evidence, not applicable or needs review. Missing evidence is never silently converted into a failed control.',
    },
    {
      title: 'Decisions carry identity and reason',
      body: 'Confirmations, overrides, evidence requests and escalations record who decided, when, and why — which is what makes an override defensible rather than invisible.',
    },
    {
      title: 'Findings built from confirmed exceptions',
      body: 'Confirmed items group into an observation carrying condition, criteria, cause, consequence and recommendation, with management response, ownership and whether the issue is new or recurring.',
    },
  ],
  points: {
    eyebrow: 'What a reviewer gets',
    heading: 'Enough to sign, without reopening the source file.',
    items: [
      'The rule applied and the values it compared',
      'The document page or cell behind each value',
      'Extraction confidence and any human correction',
      'Who decided the outcome, when, and on what basis',
    ],
  },
  cta: {
    heading: 'See the queue against your own exceptions.',
    body: 'We will run a test on your evidence and work the exceptions it raises, on the call.',
  },
};

export const workingPapersPage: CapabilityPage = {
  path: '/working-papers',
  metaTitle: 'Working papers',
  metaDescription:
    'Review-ready Excel and PDF working papers generated from the run itself, carrying scope, ' +
    'population, procedure, results, exception register, evidence links and sign-offs.',
  hero: {
    eyebrow: 'Working papers',
    heading: 'Proof that survives inspection.',
    sub:
      'The working paper is generated from the run rather than rebuilt afterwards from memory, ' +
      'so what it documents is what actually happened.',
  },
  visual: {
    src: '/product/working-paper.png',
    alt: 'Working paper showing population and results summary, exception register, frozen input versions and sign-offs',
    caption: 'Review-ready output with frozen input versions',
  },
  rows: [
    {
      title: 'Generated from the run, not reassembled',
      body: 'Scope, population, procedure, results and exceptions come from the execution itself. Nobody reconstructs the test after the fact from a folder and a memory.',
    },
    {
      title: 'Excel and PDF',
      body: 'Excel for the reviewer who wants to work the numbers, PDF for the file. Both carry the same content and the same links back to evidence.',
    },
    {
      title: 'An exception register alongside',
      body: 'Every exception with its rule, values, outcome, reviewer decision and reason, as a register rather than a paragraph summarising one.',
    },
    {
      title: 'Frozen versions behind every number',
      body: 'The recipe version, the input versions and the execution time are recorded, so a number in the paper can be traced to the exact evidence it was computed from.',
    },
    {
      title: 'Sign-offs in place',
      body: 'Preparer and reviewer sign-off is part of the document, with the identity and time recorded rather than a name typed into a cell.',
    },
  ],
  points: {
    eyebrow: 'The question every inspection asks',
    heading: 'How do you know this was not changed?',
    items: [
      'The run records the recipe version it executed',
      'The run records the input versions it read',
      'Reviewer decisions carry identity, time and reason',
      'Re-performing the run reads the same evidence and produces the same result',
    ],
  },
  cta: {
    heading: 'See the paper your reviewer would receive.',
    body: 'We will run one of your procedures end to end and hand you the output it generates.',
  },
};

export const CAPABILITY_PAGES = [
  documentsPage,
  reconciliationPage,
  reviewPage,
  workingPapersPage,
] as const;
