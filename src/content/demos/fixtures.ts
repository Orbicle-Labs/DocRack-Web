/** Editorial display data only. These are not stored product Runs or engine results. */
export const resultStates = [
  'Pass',
  'Fail',
  'Insufficient evidence',
  'Needs human review',
  'Not applicable',
  'Processing error',
] as const;
export type ResultState = (typeof resultStates)[number];
export const syntheticLabel = 'Illustrative example · invented data · not a product capture';
export const productSourceCommit = 'd7a92e4416d65c6beebc0348e702d3aa6a470820';
export const formatMoney = (paise: number) =>
  `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(paise / 100)}`;

export interface ExampleFixture {
  id: 'p2p' | 'credit' | 'ifc';
  title: string;
  provenance: string;
  period: { label: string; start: string; end: string };
  record: string;
  run: string;
  recipe: {
    name: string;
    version: number;
    approval: 'Approved in illustration';
    effective: string;
  };
  policy: { title: string; version: number; clause: string; effective: string; text: string };
  inputsVersion: number;
  engine: 'demo-1';
  model: 'fixture-1';
  outcome: ResultState;
  verdict: string;
  expected: string;
  actual: string;
  money: {
    expectedPaise: number;
    actualPaise: number;
    deltaPaise: number;
    tolerancePaise: number;
  } | null;
  traces: readonly {
    file: string;
    location: string;
    role: string;
    raw: string;
    normalised: string;
    version: number;
    method: string;
    corrections: 'None in illustration';
  }[];
  population: {
    received: number;
    excluded: number;
    eligible: number;
    completed: number;
    awaitingEvidence: number;
    processingFailures: number;
  };
  /** One check per eligible record; excluded records are not Not applicable outcomes. */
  outcomes: Record<ResultState, number>;
  review: 'Awaiting reviewer confirmation';
  workingPaper: 'Draft / review incomplete';
  finding: { status: 'Not raised'; relatedConfirmedExceptions: 0 };
}

const common = {
  period: { label: 'Q1 FY27', start: '2026-04-01', end: '2026-06-30' },
  inputsVersion: 1,
  engine: 'demo-1',
  model: 'fixture-1',
  outcome: 'Fail',
  review: 'Awaiting reviewer confirmation',
  workingPaper: 'Draft / review incomplete',
  finding: { status: 'Not raised', relatedConfirmedExceptions: 0 },
} as const;

export const fixtures = {
  p2p: {
    ...common,
    id: 'p2p',
    title: 'P2P — Q1 FY27',
    record: 'DEMO-0042',
    run: 'DEMO-RUN-018',
    provenance:
      'Marketing specification §7.2 and Phase 2 fixture; independent of the 210-record product dataset.',
    recipe: {
      name: 'P2P amount check',
      version: 3,
      approval: 'Approved in illustration',
      effective: '2026-04-01',
    },
    policy: {
      title: 'Synthetic Procurement Policy',
      version: 3,
      clause: '§4.2',
      effective: '2026-04-01',
      text: 'Compare invoice subtotal with approved PO amount. Absolute difference must not exceed ₹1. If the approved PO is unavailable, report Insufficient evidence.',
    },
    verdict: 'Amount mismatch',
    expected: '₹1,20,000',
    actual: '₹1,25,000',
    money: {
      expectedPaise: 12000000,
      actualPaise: 12500000,
      deltaPaise: 500000,
      tolerancePaise: 100,
    },
    traces: [
      {
        file: 'DEMO-0042.pdf',
        location: 'Page 1 · subtotal region',
        role: 'Primary evidence',
        raw: '1,25,000.00',
        normalised: '₹1,25,000',
        version: 1,
        method: 'Illustrative extraction',
        corrections: 'None in illustration',
      },
      {
        file: 'purchase-orders.xlsx',
        location: 'Orders!H43',
        role: 'Source of truth',
        raw: '120000',
        normalised: '₹1,20,000',
        version: 1,
        method: 'Illustrative cell read',
        corrections: 'None in illustration',
      },
    ],
    population: {
      received: 200,
      excluded: 10,
      eligible: 190,
      completed: 180,
      awaitingEvidence: 6,
      processingFailures: 4,
    },
    outcomes: {
      Pass: 157,
      Fail: 17,
      'Insufficient evidence': 6,
      'Needs human review': 6,
      'Not applicable': 0,
      'Processing error': 4,
    },
  },
  credit: {
    ...common,
    id: 'credit',
    title: 'Credit and loan files — Q1 FY27',
    record: 'DEMO-LN-0011',
    run: 'DEMO-CREDIT-001',
    provenance:
      'Adapted from product credit_file E03 / LN-2026-0011: ₹35 lakh sanctioned and ₹36 lakh disbursed. Renamed sources, single-check counts and versions below are marketing inventions, not product results.',
    recipe: {
      name: 'Sanction versus disbursement',
      version: 1,
      approval: 'Approved in illustration',
      effective: '2026-04-01',
    },
    policy: {
      title: 'Synthetic Lending Policy',
      version: 1,
      clause: '§2',
      effective: '2026-04-01',
      text: 'The amount disbursed must not exceed the sanctioned amount. Compare supplied sanction and disbursement evidence with zero excess tolerance.',
    },
    verdict: 'Amount mismatch',
    expected: '₹35,00,000',
    actual: '₹36,00,000',
    money: {
      expectedPaise: 350000000,
      actualPaise: 360000000,
      deltaPaise: 10000000,
      tolerancePaise: 0,
    },
    traces: [
      {
        file: 'DEMO-LN-0011.pdf',
        location: 'Page 1 · sanctioned amount',
        role: 'Source of truth',
        raw: '35,00,000.00',
        normalised: '₹35,00,000',
        version: 1,
        method: 'Illustrative extraction',
        corrections: 'None in illustration',
      },
      {
        file: 'demo-disbursements.csv',
        location: 'Row 12 · disbursed_amount',
        role: 'Primary evidence',
        raw: '3600000.00',
        normalised: '₹36,00,000',
        version: 1,
        method: 'Illustrative row read',
        corrections: 'None in illustration',
      },
    ],
    population: {
      received: 12,
      excluded: 1,
      eligible: 11,
      completed: 9,
      awaitingEvidence: 1,
      processingFailures: 1,
    },
    outcomes: {
      Pass: 7,
      Fail: 1,
      'Insufficient evidence': 1,
      'Needs human review': 1,
      'Not applicable': 0,
      'Processing error': 1,
    },
  },
  ifc: {
    ...common,
    id: 'ifc',
    title: 'Journal-entry control — Q1 FY27',
    record: 'DEMO-JEA-002',
    run: 'DEMO-IFC-001',
    provenance:
      'Adapted from product ifc_controls E02 / JEA-002: performer and reviewer are the same person. Role identifiers, filenames, versions and single-check counts below are marketing inventions.',
    recipe: {
      name: 'Independent control review',
      version: 1,
      approval: 'Approved in illustration',
      effective: '2026-04-01',
    },
    policy: {
      title: 'Synthetic Control Procedure',
      version: 1,
      clause: '§2',
      effective: '2026-04-01',
      text: 'The reviewer of a control instance must be a different person from its performer. Missing sign-off evidence is reported separately from a documented same-person review.',
    },
    verdict: 'Independent review not evidenced',
    expected: 'Different performer and reviewer',
    actual: 'Both recorded as DEMO-PERSON-01',
    money: null,
    traces: [
      {
        file: 'DEMO-JEA-002.pdf',
        location: 'Page 1 · performed by',
        role: 'Primary evidence',
        raw: 'DEMO-PERSON-01',
        normalised: 'DEMO-PERSON-01',
        version: 1,
        method: 'Illustrative extraction',
        corrections: 'None in illustration',
      },
      {
        file: 'DEMO-JEA-002.pdf',
        location: 'Page 1 · reviewed by',
        role: 'Primary evidence',
        raw: 'DEMO-PERSON-01',
        normalised: 'DEMO-PERSON-01',
        version: 1,
        method: 'Illustrative extraction',
        corrections: 'None in illustration',
      },
    ],
    population: {
      received: 8,
      excluded: 1,
      eligible: 7,
      completed: 6,
      awaitingEvidence: 1,
      processingFailures: 0,
    },
    outcomes: {
      Pass: 4,
      Fail: 1,
      'Insufficient evidence': 1,
      'Needs human review': 1,
      'Not applicable': 0,
      'Processing error': 0,
    },
  },
} as const satisfies Record<ExampleFixture['id'], ExampleFixture>;
