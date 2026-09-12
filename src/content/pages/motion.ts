/**
 * Copy and callout geometry for the three §8 explainers.
 *
 * §8 permits motion for exactly three things: opening the source evidence for a
 * result, executing an Audit Test Recipe, and moving reviewed exceptions into a
 * working paper. These are those three and nothing else.
 *
 * Every figure quoted below is read off the screenshot it sits on, and the
 * screenshots are internally consistent — the same EX-1184 / EX-1179 / EX-1168
 * references run from the review queue through the finding into the working
 * paper's exception register. All of it is synthetic demo data (DEMO-prefixed
 * records, demo.xlsx sources), which is what makes it safe to quote at all.
 *
 * Callout geometry is in percentages of the frame. That is exact rather than
 * approximate because every capture in public/product is 2880x1800 and every
 * frame renders at aspect="16/10" with object-cover, so there is no crop.
 */

export interface ExplainerCallout {
  /** Percentages of the frame box. left+width and top+height must stay under 100. */
  left: number;
  top: number;
  width: number;
  height: number;
  /**
   * Corner the label chip attaches to. The chip is hidden below `sm`, where the
   * panel body carries the same information and a floating chip would be the
   * most likely cause of horizontal overflow.
   */
  labelAt?: 'below-left' | 'above-left' | 'below-right' | 'above-right';
}

export interface ExplainerStep {
  /** Stable. Used for React keys and every derived DOM id. */
  key: string;
  /**
   * The rail label. One or two words, deliberately: the rail is a horizontal
   * track and long labels are what push it past the viewport at 320. The full
   * sentence lives in `title`, which the panel heading carries.
   */
  label: string;
  /** Panel heading, and the callout chip's text. */
  title: string;
  /** Must state what the frame now shows, so the panel stands on its own. */
  body: string;
  visual: { src: `/${string}`; alt: string; caption: string };
  callout?: ExplainerCallout;
}

export interface Explainer {
  /** Prefix for every id this instance emits. Must be unique per page. */
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Names the widget for assistive technology. */
  label: string;
  steps: readonly ExplainerStep[];
}

const REVIEW_QUEUE = {
  src: '/product/review-queue.png',
  alt: 'DocRack review queue listing exceptions with their record, the rule applied, expected and actual values, outcome and severity, beside a detail panel for the selected exception',
  caption: 'Review queue — Procure-to-Pay, Q1 FY27',
} as const;

const TRACE_LINK = {
  src: '/product/trace-link.png',
  alt: 'An exception opened against its evidence, with the invoice PDF page beside the purchase-order spreadsheet cell each compared value came from',
  caption: 'The same exception, opened against its sources',
} as const;

const RECIPE = {
  src: '/product/recipe.png',
  alt: 'An Audit Test Recipe showing its objective, the risk being tested, the population, required inputs with their declared roles, extracted fields, and rules with tolerances',
  caption: 'Three-way invoice match — approved at version 4.2',
} as const;

const RUN_PROGRESS = {
  src: '/product/run-progress.png',
  alt: 'A run executing against the population, showing configured-test coverage, records processed, execution stages and live per-rule results',
  caption: 'Run R-2304 executing against the eligible population',
} as const;

const FINDING = {
  src: '/product/finding.png',
  alt: 'An audit finding with its condition, criteria, cause, consequence and recommendation, beside the list of confirmed exceptions linked to it',
  caption: 'Finding F-004, with every exception that supports it',
} as const;

const WORKING_PAPER = {
  src: '/product/working-paper.png',
  alt: 'A working paper showing the population and results summary, the exception register, frozen input versions and reviewer sign-offs',
  caption: 'Working paper WP-P2P-01, generated from the run',
} as const;

/** §8.1 — opening the source evidence for a result. */
export const evidenceTrace: Explainer = {
  id: 'evidence-trace',
  eyebrow: 'Traceability',
  heading: 'From conclusion to source, one step at a time.',
  intro:
    'Every result carries the rule that produced it and the evidence behind it. Step through a ' +
    'single exception to see what a reviewer sees, in the order they see it.',
  label: 'Opening the source evidence for a result',
  steps: [
    {
      key: 'exception',
      label: 'Exception',
      title: 'The exception',
      body: 'EX-1184 sits in the queue with its record, the rule that failed and the two values that disagreed. Nothing has been concluded yet — an exception is an item for a person to look at.',
      visual: REVIEW_QUEUE,
      callout: { left: 16.8, top: 37, width: 57, height: 6.5, labelAt: 'above-left' },
    },
    {
      key: 'rule',
      label: 'Rule',
      title: 'The rule applied',
      body: 'The rule is named, versioned and dated: invoice total must not exceed the approved PO value by more than ₹1,000, from P2P-INV-003 in Rulepack v4.2, effective 01 Apr 2026. A reviewer can judge whether the procedure matched the objective.',
      visual: REVIEW_QUEUE,
      callout: { left: 74, top: 45.5, width: 24, height: 11, labelAt: 'below-right' },
    },
    {
      key: 'values',
      label: 'Values',
      title: 'Expected against actual',
      body: 'The two values that were compared, and the gap between them — ₹4,82,500 expected, ₹5,18,700 actual, ₹35,200 above a ₹1,000 tolerance. That comparison is deterministic logic, not a judgement.',
      visual: REVIEW_QUEUE,
      callout: { left: 74, top: 57, width: 24, height: 14.5, labelAt: 'above-right' },
    },
    {
      key: 'source',
      label: 'Source',
      title: 'The page and the cell',
      body: 'Both values open against their source: the invoice PDF at page 1, and the PO register at cell G18. The reviewer checks the conclusion without reopening a single file by hand.',
      visual: TRACE_LINK,
      callout: { left: 41.5, top: 22, width: 57.5, height: 68, labelAt: 'below-left' },
    },
  ],
};

/** §8.2 — executing an Audit Test Recipe. */
export const recipeRun: Explainer = {
  id: 'recipe-run',
  eyebrow: 'Executing a recipe',
  heading: 'What actually happens when an approved recipe runs.',
  intro:
    'A recipe is approved once and then re-performed. Step through a run to see what is decided ' +
    'beforehand, what is frozen at execution, and what that buys you months later.',
  label: 'Executing an Audit Test Recipe',
  steps: [
    {
      key: 'approved',
      label: 'Approved',
      title: 'Approved, at a version',
      body: 'The recipe is at version 4.2, approved for fieldwork by a named person on a stated date. Nothing runs against a population until that approval exists, and the version is part of the record.',
      visual: RECIPE,
      callout: { left: 77.8, top: 21.5, width: 20.5, height: 9.5, labelAt: 'below-right' },
    },
    {
      key: 'inputs',
      label: 'Inputs',
      title: 'Inputs with declared roles',
      body: 'Every source has an explicit role before the procedure can run — population, evidence, source of truth, policy, reference data. The same workbook means different things in different tests, so the role is configured, not guessed.',
      visual: RECIPE,
      callout: { left: 17.7, top: 38.5, width: 54, height: 29, labelAt: 'above-left' },
    },
    {
      key: 'rules',
      label: 'Rules',
      title: 'Rules and tolerances, written down',
      body: 'Each check states its logic, its tolerance and the outcome it produces: a difference over ₹1,000 fails at high severity, a quantity mismatch fails at medium, a suspected duplicate goes to review. Decided before the run, not inferred during it.',
      visual: RECIPE,
      callout: { left: 17.7, top: 77.5, width: 54, height: 13.5, labelAt: 'above-left' },
    },
    {
      key: 'run',
      label: 'Run',
      title: 'Executed against the population',
      body: 'The run reports its coverage of the eligible population as it goes — here 72.4%, being 8,726 of 12,050 eligible records tested against six configured rules. Coverage is stated as a fact about configured tests, not as a claim about assurance.',
      visual: RUN_PROGRESS,
      callout: { left: 16.8, top: 16, width: 82, height: 14.5, labelAt: 'below-left' },
    },
    {
      key: 'frozen',
      label: 'Frozen',
      title: 'Frozen for re-performance',
      body: 'The run locks the inputs, the recipe version and the engine version it used, and says so on its own face: inputs and rules unchanged, reperformable from frozen versions. That is the difference between a run you can repeat and one you can defend.',
      visual: RUN_PROGRESS,
      callout: { left: 82.5, top: 80.5, width: 15.3, height: 8, labelAt: 'above-right' },
    },
  ],
};

/** §8.3 — moving reviewed exceptions into a working paper. */
export const exceptionHandoff: Explainer = {
  id: 'exception-handoff',
  eyebrow: 'From review to working paper',
  heading: 'Reviewed exceptions become the paper, not a retyped summary.',
  intro:
    'The working paper is generated from the run itself. Step through what carries across from ' +
    'the review queue, and what is frozen alongside it.',
  label: 'Moving reviewed exceptions into a working paper',
  steps: [
    {
      key: 'reviewed',
      label: 'Reviewed',
      title: 'Reviewed, with the decision recorded',
      body: 'Each exception carries a reviewer decision and the reason behind it. The decision travels, not just the result — a confirmed exception and one awaiting evidence are different things all the way to the paper.',
      visual: REVIEW_QUEUE,
      callout: { left: 60.5, top: 37, width: 13.5, height: 43, labelAt: 'below-left' },
    },
    {
      key: 'grouped',
      label: 'Grouped',
      title: 'Grouped into an observation',
      body: 'Confirmed exceptions are linked into a finding with its condition, criteria, cause, consequence and recommendation. The finding names every exception that supports it, so the observation can be taken apart again.',
      visual: FINDING,
      callout: { left: 76.2, top: 38, width: 22, height: 27.5, labelAt: 'below-right' },
    },
    {
      key: 'register',
      label: 'Register',
      title: 'Written into the register',
      body: 'The same references appear in the working paper — EX-1184, EX-1179, EX-1168 — each with its failed rule, severity, exposure, the decision taken and links back to the evidence behind it.',
      visual: WORKING_PAPER,
      callout: { left: 17.7, top: 51.5, width: 57.5, height: 31, labelAt: 'above-left' },
    },
    {
      key: 'sealed',
      label: 'Sealed',
      title: 'Frozen, and signed',
      body: 'The paper records the run, the recipe and rulepack versions, the engine, and the exact version of every input it used, under the preparer and reviewer who signed it. Re-performable a year later, by someone who was not there.',
      visual: WORKING_PAPER,
      callout: { left: 76.2, top: 60.5, width: 22, height: 30.5, labelAt: 'above-right' },
    },
  ],
};

/**
 * The three lanes the exception chips travel across in the §8.3 diagram band.
 *
 * Rendered beside the screenshots rather than on them: showing movement means
 * drawing interface that is not in any single capture, and §16 forbids adding
 * invented product chrome to a frame marked `variant="real"`.
 */
export const handoffLanes = [
  { key: 'review', label: 'Review queue', meta: 'Decision recorded' },
  { key: 'finding', label: 'Finding F-004', meta: 'Linked to the observation' },
  { key: 'paper', label: 'Working paper WP-P2P-01', meta: 'Exception register' },
] as const;

/** The chips that move. Outcomes are the canonical five from OutcomeBadge. */
export const handoffChips = [
  { ref: 'EX-1184', outcome: 'fail', note: 'Invoice total over PO' },
  { ref: 'EX-1179', outcome: 'fail', note: 'DoA limit breached' },
  { ref: 'EX-1168', outcome: 'insufficient', note: 'GRN unavailable' },
] as const;

/** Shown once the sequence reaches its final step. */
export const handoffSeal = 'Sealed · Recipe v4.2 · Rulepack v4.2 · Run R-2291';
