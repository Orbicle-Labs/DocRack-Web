/** Phase 3 publication candidates. No routes are activated by this module. */
export type ClaimId = `C${number}`;
export interface CopySection {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  claims: readonly ClaimId[];
}
export interface LaunchPage {
  path: `/${string}`;
  brief: {
    audience: string;
    question: string;
    purpose: string;
    composition: string;
    proof: readonly string[];
    acceptance: readonly string[];
  };
  metadata: {
    title: string;
    description: string;
    canonical: `/${string}`;
    image: '/opengraph-image';
    imageAlt: string;
  };
  eyebrow: string;
  heading: string;
  introduction: string;
  claims: readonly ClaimId[];
  sections: readonly CopySection[];
  faq: readonly { question: string; answer: string; claims: readonly ClaimId[] }[];
  cta: { label: string; href: '/book-demo' | '/support' };
  readiness: {
    treatment: 'Illustrative product model' | 'Website source facts' | 'Owner review required';
    publication: 'Candidate for page implementation' | 'Hold for owner review';
    limitations: readonly string[];
  };
}

export const launchPages = [
  {
    path: '/',
    brief: {
      audience: 'Heads of Internal Audit and audit managers',
      question: 'What is DocRack, and can I inspect the reasoning?',
      purpose:
        'Explore an illustrative audit procedure from evidence and a versioned Audit Test Recipe to source-linked results and human review.',
      composition:
        'Eight-chapter homepage brief: opening, worked procedure, Recipe, coverage, use cases, paper, governance, request. Implement in Phase 4.',
      proof: ['p2p-review', 'p2p-recipe', 'p2p-population'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Internal-audit fieldwork',
      description:
        'Explore an illustrative audit procedure from evidence and a versioned Audit Test Recipe to source-linked results and human review.',
      canonical: '/',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'From audit evidence to answers you can review.',
    introduction:
      'AI-assisted internal-audit fieldwork for Indian enterprises. Explore a worked example of a procedure, its sources and the decisions that stay with your team.',
    claims: ['C01', 'C18'],
    sections: [
      {
        id: 'evidence',
        heading: 'One invoice. Two amounts.',
        paragraphs: [
          'In the synthetic P2P example, invoice DEMO-0042 has a subtotal of ₹1,25,000. The approved PO records ₹1,20,000. The ₹5,000 difference exceeds the configured ₹1 tolerance.',
          'Open the invoice page, PO cell and Synthetic Procurement Policy v3 §4.2. The result is Fail; reviewer confirmation remains outstanding.',
        ],
        claims: ['C08', 'C17'],
      },
      {
        id: 'recipe',
        heading: 'Start with an Audit Test Recipe.',
        paragraphs: [
          'Define the objective, population, sources, comparisons and approval requirements before interpreting a result. Extract, Reconcile and Checks belong inside Tests.',
        ],
        claims: ['C03', 'C04'],
      },
      {
        id: 'coverage',
        heading: 'Account for what completed.',
        paragraphs: [
          'This single-check illustration receives 200 records: 10 excluded and 190 eligible. Execution completes for 180; 6 await evidence and 4 have processing errors. Completion does not resolve human review.',
        ],
        claims: ['C05', 'C14'],
      },
      {
        id: 'work',
        heading: 'A procedure for the work in front of you.',
        paragraphs: [
          'Follow P2P amount comparisons, sanction versus disbursement checks, or independent review of journal-entry controls. Each example uses its own supplied evidence and criteria.',
        ],
        claims: ['C17'],
      },
      {
        id: 'paper',
        heading: 'Give the reviewer the reasoning.',
        paragraphs: [
          'A working paper brings scope, procedure, coverage, results, exceptions, evidence references and sign-offs together. The illustrated P2P work remains Draft / review incomplete; no genuine download is available in this example.',
        ],
        claims: ['C21', 'C22'],
      },
      {
        id: 'control',
        heading: 'Keep the conclusion in human hands.',
        paragraphs: [
          'AI assists with extraction and drafts; deterministic code applies configured comparisons. Auditors approve Recipes and conclusions. A record-level exception becomes part of a finding only through review.',
        ],
        claims: ['C10', 'C13'],
      },
      {
        id: 'next',
        heading: 'Bring one procedure to the conversation.',
        paragraphs: [
          'Request a demo to discuss your evidence, configured rules and reviewer requirements. Submitting the form requests a conversation; it does not reserve a calendar slot.',
        ],
        claims: ['C42'],
      },
    ],
    faq: [],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product',
    brief: {
      audience: 'Audit managers and reviewers',
      question: 'How does the fieldwork fit together?',
      purpose:
        'Understand Documents, Tests, Runs, Review, Findings and Working Papers, with the Audit Test Recipe at the centre.',
      composition:
        'Retain the Phase 2 workflow and responsibility composition; add evidence-led detail in Phase 5.',
      proof: ['p2p-recipe', 'p2p-population'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'The fieldwork workflow',
      description:
        'Understand Documents, Tests, Runs, Review, Findings and Working Papers, with the Audit Test Recipe at the centre.',
      canonical: '/product',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'A procedure you can follow from evidence to review.',
    introduction:
      'The illustrative workflow connects the audit procedure to the sources, result and human decision. A Test defines what to do; a Run records one execution.',
    claims: ['C01', 'C04'],
    sections: [
      {
        id: 'workflow',
        heading: 'Documents → Tests → Runs → Review → Findings → Working Papers',
        paragraphs: [
          'Documents establish the source set. Tests hold the Audit Test Recipe, including Extract, Reconcile and Checks. A Run records inputs, Recipe version, execution details and outcomes.',
          'Review resolves uncertainty and records decisions. Findings group related confirmed exceptions. Working Papers collect the procedure, evidence references and sign-offs.',
        ],
        claims: ['C03', 'C04', 'C13', 'C21'],
      },
      {
        id: 'workspace',
        heading: 'Engagement work and reusable knowledge.',
        paragraphs: [
          "Overview summarises an engagement's scope, population and open review work. The workspace holds Test Library templates and Knowledge Hub sources; Copilot assists across this context.",
        ],
        claims: ['C15', 'C16', 'C23'],
      },
      {
        id: 'integrity',
        heading: 'A snapshot is distinct from a conclusion.',
        paragraphs: [
          'In the product model, completed Run history is immutable. New inputs or Recipe versions create new work. Run Integrity: Verified means the recorded inputs and versions remain unchanged; it does not mean the audit passed.',
          'Reperformance needs pinned inputs, versions and retained model outputs where relevant. A fresh unpinned model call is not a guarantee of identical results.',
        ],
        claims: ['C09', 'C11', 'C12'],
      },
      {
        id: 'responsibility',
        heading: 'AI assists. Code compares. People approve.',
        paragraphs: [
          'AI extraction and suggested mappings need evidence review. Deterministic comparisons apply the configured arithmetic. Recipe approval, exception decisions and final conclusions stay with people.',
        ],
        claims: ['C10'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product/audit-test-recipes',
    brief: {
      audience: 'Preparers and reviewers',
      question: 'What exactly is being tested?',
      purpose:
        'Explore all fourteen components of an Audit Test Recipe, from objective and population to source hierarchy, approval and version.',
      composition:
        'Written procedure beside Recipe excerpt; fourteen components grouped into scope, logic and control.',
      proof: ['p2p-recipe'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Audit Test Recipes',
      description:
        'Explore all fourteen components of an Audit Test Recipe, from objective and population to source hierarchy, approval and version.',
      canonical: '/product/audit-test-recipes',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Make the procedure explicit.',
    introduction:
      'An Audit Test Recipe is the structured, versioned definition of a Test. The example compares invoice subtotal with approved PO amount; its result still needs review.',
    claims: ['C03', 'C04'],
    sections: [
      {
        id: 'scope',
        heading: 'Objective, risk and population',
        paragraphs: [
          '1. Audit objective: establish whether invoice subtotal agrees with the approved PO. 2. Risk: an invoice exceeds authorised purchase value. 3. Population and period: eligible PO-backed records in Q1 FY27, with exclusions and evidence gaps accounted for.',
          '4. Required inputs: label each document or dataset by role. 5. Extraction fields: retain a Trace for each compared value. 6. Source-of-truth hierarchy: the approved PO is authoritative for this amount, not automatically for every field.',
        ],
        claims: ['C03', 'C08'],
      },
      {
        id: 'logic',
        heading: 'Calculations, criteria and results',
        paragraphs: [
          '7. Calculations and tolerances: absolute amount difference ≤ ₹1. 8. Company policy: Synthetic Procurement Policy v3 §4.2, effective 1 April 2026. 9. Regulation: none configured in this example; invented policy text is not a legal requirement.',
          '10. Result logic: Pass, Fail, Insufficient evidence, Needs human review, Not applicable and Processing error. 11. Exception severity: assign severity in the context of risk and potential exposure; a difference alone is not a proven loss.',
        ],
        claims: ['C03', 'C05', 'C06'],
      },
      {
        id: 'recipe-run',
        heading: 'Approval, output and version',
        paragraphs: [
          '12. Review and approval: the illustrative Recipe is approved; result confirmation remains outstanding. Overrides require a reason and attributable decision. 13. Output: a draft working paper with procedure, source references and review limitations. 14. Version and effective date: Recipe v3 and Policy v3 remain identified with DEMO-RUN-018.',
          'A policy update requires a new version and review of affected Recipes. It must not rewrite completed Run history. A Copilot-compiled Recipe is a draft until a person approves it.',
        ],
        claims: ['C03', 'C10', 'C11', 'C16'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product/documents',
    brief: {
      audience: 'Preparers and evidence reviewers',
      question: 'Can I see where a value came from?',
      purpose:
        'Understand source roles, page and cell Traces, extraction review and the format-specific evidence needed to evaluate DocRack.',
      composition:
        'Large source detail and adjacent accessible Trace; format readiness table from readiness.ts.',
      proof: ['p2p-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Documents and source Traces',
      description:
        'Understand source roles, page and cell Traces, extraction review and the format-specific evidence needed to evaluate DocRack.',
      canonical: '/product/documents',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Give every source a role.',
    introduction:
      'A source Trace connects a value to its file and exact location. The P2P illustration compares a PDF subtotal with a purchase-order cell.',
    claims: ['C08', 'C19'],
    sections: [
      {
        id: 'roles',
        heading: 'Six roles, one source set',
        paragraphs: [
          'Population defines the records. Primary evidence supports the transaction. Source of truth identifies an authoritative value. Supporting evidence corroborates it. Reference data supplies approved lists or matrices. Policy/regulation supplies criteria.',
        ],
        claims: ['C03'],
      },
      {
        id: 'trace',
        heading: 'Follow the original value.',
        paragraphs: [
          'DEMO-0042.pdf, page 1, shows 1,25,000.00, normalised to ₹1,25,000. purchase-orders.xlsx, Orders!H43, shows 120000, normalised to ₹1,20,000. Both are invented source excerpts, version 1.',
          "Review a Trace's original and normalised value, method, confidence where available, and correction history. A correction should retain its relationship to the original source; a failed parse has no fabricated Trace.",
        ],
        claims: ['C08', 'C10'],
      },
      {
        id: 'formats',
        heading: 'Evaluate your actual file types.',
        paragraphs: [
          'Use born-digital PDF, scanned PDF/image and XLSX/CSV examples to assess extraction and exact source navigation separately. File admission alone does not demonstrate extraction or usable preview.',
          'Word, PowerPoint, email, ZIP and Indian-script scans need format-specific acceptance. No current supported-format or script guarantee is made here. Supply representative non-confidential samples during an agreed evaluation.',
        ],
        claims: ['C19', 'C20'],
      },
      {
        id: 'versions',
        heading: 'Identify the evidence used.',
        paragraphs: [
          'The product model retains file versions and checksums with the Run. Upload/import, extraction, review and export are separate stages; confirm each stage for the inputs your procedure needs.',
        ],
        claims: ['C08', 'C11'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product/reconciliation-and-checks',
    brief: {
      audience: 'Audit preparers',
      question: 'How are sources compared and rules applied?',
      purpose:
        'Explore source matching, amount tolerances and policy checks inside an Audit Test Recipe, followed by a separate Run.',
      composition:
        'Comparison excerpt with named rule; avoid implying all matching variants are currently accepted.',
      proof: ['p2p-review', 'credit-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Reconciliation and Checks inside Tests',
      description:
        'Explore source matching, amount tolerances and policy checks inside an Audit Test Recipe, followed by a separate Run.',
      canonical: '/product/reconciliation-and-checks',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Compare the right values against an explicit rule.',
    introduction:
      'Extract, Reconcile and Checks are capabilities inside Tests. The Recipe defines the comparison; a Run records the execution.',
    claims: ['C04', 'C17'],
    sections: [
      {
        id: 'matching',
        heading: 'Choose the sources and matching rules.',
        paragraphs: [
          'An invoice-to-PO comparison uses a purchase-order reference and per-field source authority. The product model describes exact, normalised, fuzzy and semantic matching, with ambiguous cases escalated to people.',
          'One-to-one, one-to-many and many-to-one matching need explicit grouping rules. A three-way procedure adds goods-receipt evidence; the illustrated subtotal check does not establish delivery or payment.',
        ],
        claims: ['C04', 'C10', 'C48'],
      },
      {
        id: 'amount',
        heading: '₹5,000 beyond the approved PO.',
        paragraphs: [
          'Expected ₹1,20,000; actual ₹1,25,000; absolute difference ₹5,000; tolerance ₹1. This is an Amount mismatch under Synthetic Procurement Policy v3 §4.2.',
          'A separate supplied-ledger loan example compares ₹35,00,000 sanctioned with ₹36,00,000 disbursed. It is not a P2P screen or a regulatory assertion.',
        ],
        claims: ['C08', 'C17'],
      },
      {
        id: 'checks',
        heading: 'A check can use one source.',
        paragraphs: [
          'A configured check can compare a population with a formula, threshold, date rule or reference list. Explain failed results with a typed reason: amount, date/cut-off, duplicate usage, party variance, tax-field mismatch, missing document or unsupported evidence.',
          'Missing evidence is reported separately unless the configured procedure explicitly defines its absence as a failure.',
        ],
        claims: ['C04', 'C05', 'C06'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product/review-and-findings',
    brief: {
      audience: 'Reviewers and audit managers',
      question: 'What can I verify before confirming an issue?',
      purpose:
        'Inspect expected and actual values, source Traces and six result states, then distinguish a record-level exception from a reviewed finding.',
      composition:
        'Retain source-review interaction; finding diagram only as a definition until real capture exists.',
      proof: ['p2p-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Review, exceptions and findings',
      description:
        'Inspect expected and actual values, source Traces and six result states, then distinguish a record-level exception from a reviewed finding.',
      canonical: '/product/review-and-findings',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Keep the evidence beside the decision.',
    introduction:
      'The result, its rule and its source belong together. In the example, Fail describes the configured check; reviewer confirmation is still outstanding.',
    claims: ['C08', 'C13'],
    sections: [
      {
        id: 'evidence-trace',
        heading: 'Inspect the amount, source and rule.',
        paragraphs: [
          'Review DEMO-0042 against the invoice page, Orders!H43 and Policy v3 §4.2. Resolve ambiguous extraction or missing evidence before concluding. Pass, Fail, Insufficient evidence, Needs human review, Not applicable and Processing error remain distinct.',
        ],
        claims: ['C05', 'C08'],
      },
      {
        id: 'decisions',
        heading: 'Record who decided and why.',
        paragraphs: [
          'The product model separates preparer and reviewer. Confirmations, corrections and overrides need attributable history; an override requires a reason. Selecting a website example cannot approve a result.',
        ],
        claims: ['C10', 'C32'],
      },
      {
        id: 'findings',
        heading: 'Group confirmed exceptions with care.',
        paragraphs: [
          'An exception concerns a record. A finding groups related confirmed exceptions into an issue with criteria, condition, cause, impact, severity, recommendation and sign-offs.',
          'No finding has been raised from the unresolved illustrative Run. Management response, owner and target date are finding fields, not a full remediation or document-request system.',
        ],
        claims: ['C13', 'C07'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product/working-papers',
    brief: {
      audience: 'Audit reviewers',
      question: 'What will a reviewer receive?',
      purpose:
        'Explore what a working paper should retain: scope, procedure, coverage, results, source references, limitations and human sign-offs.',
      composition:
        'Readable contents specimen in text; no invented file or download button. Genuine export remains blocked.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Working papers and review evidence',
      description:
        'Explore what a working paper should retain: scope, procedure, coverage, results, source references, limitations and human sign-offs.',
      canonical: '/product/working-papers',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Keep the procedure with the evidence.',
    introduction:
      'A working paper documents the work performed and the limits of its conclusion. The illustrative P2P Run remains Draft / review incomplete.',
    claims: ['C21', 'C22'],
    sections: [
      {
        id: 'contents',
        heading: 'A reviewable record of the work.',
        paragraphs: [
          'Include objective, risk, entity, period, population, coverage, exclusions and limitations; input roles and versions; procedure, extracted fields, matching logic, calculations and tolerances.',
          'Retain company policy and regulatory citations, Recipe/Run versions, all six result states, typed exceptions, findings, comments, overrides and their reasons, evidence index, sign-offs and execution/approval dates.',
        ],
        claims: ['C21'],
      },
      {
        id: 'exception-handoff',
        heading: 'Sources must remain usable.',
        paragraphs: [
          'An exception register needs the compared values, typed verdict, review decision and source references. A page or cell citation is distinct from a public download link. Access-controlled product links may require an authenticated session.',
        ],
        claims: ['C08', 'C21'],
      },
      {
        id: 'formats',
        heading: 'Confirm the output you need.',
        paragraphs: [
          'Discuss the Excel, Word, PDF or CSV output your reviewer needs, including source references and comments. PDF delivery and compatibility with your own template need confirmation in the evaluation.',
          'No genuine sample is published here yet. Named GRC integrations require separate validation. Request a demonstration of the required format and its evidence links.',
        ],
        claims: ['C21', 'C27'],
      },
      {
        id: 'approval',
        heading: 'Draft, approval and later versions.',
        paragraphs: [
          'The product model requires human preparation and review before locking a paper. Later changes create a new version. An unresolved Run must not be described as a locked, approved paper.',
        ],
        claims: ['C22', 'C10'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product/knowledge-hub-and-copilot',
    brief: {
      audience: 'Methodology owners and reviewers',
      question: 'How do source changes affect the procedure?',
      purpose:
        'Understand versioned source categories, policy citations and Copilot drafts that require human review and an approved official Run.',
      composition:
        'Stacked policy → Recipe → Run relationship and a clearly labelled illustrative cited answer.',
      proof: ['knowledge-versions', 'p2p-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Knowledge Hub and Copilot',
      description:
        'Understand versioned source categories, policy citations and Copilot drafts that require human review and an approved official Run.',
      canonical: '/product/knowledge-hub-and-copilot',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Keep knowledge citable. Keep drafts reviewable.',
    introduction:
      'The Knowledge Hub holds the sources behind a procedure. Copilot assists with drafts and explanations within the engagement and Knowledge Hub.',
    claims: ['C15', 'C16'],
    sections: [
      {
        id: 'categories',
        heading: 'Three useful source categories.',
        paragraphs: [
          'Policies and regulations provide criteria. Reference and master data provide approved lists and authority matrices. Methodology provides checklists, audit programmes and working-paper conventions.',
          'A source needs an owner, permissions, applicability, effective dates, version and approval state. No external registry category or live regulatory feed is implied.',
        ],
        claims: ['C15', 'C17'],
      },
      {
        id: 'versions',
        heading: 'A new policy starts a review.',
        paragraphs: [
          'In the example, Procurement Policy v3 §4.2 informs Recipe v3 and DEMO-RUN-018. A later policy version should identify affected Recipes for reapproval; it must not silently change the completed Run snapshot.',
        ],
        claims: ['C11', 'C15'],
      },
      {
        id: 'copilot',
        heading: 'Cite facts and label suggestions.',
        paragraphs: [
          'An illustrative answer is: “The subtotal difference is ₹5,000, from DEMO-0042.pdf page 1 and purchase-orders.xlsx Orders!H43; the configured tolerance is ₹1 under Synthetic Procurement Policy v3 §4.2.”',
          'Without supporting evidence, the answer is “Unable to verify”. Factual audit answers cite supplied engagement or Knowledge Hub sources. A written procedure can be discussed as a draft Recipe; a person must review it before approval and an official Run.',
        ],
        claims: ['C08', 'C16', 'C10'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/product/test-library',
    brief: {
      audience: 'Audit methodology owners',
      question: 'Can our team reuse a procedure each period?',
      purpose:
        'Explore P2P, loan-file and control-review template examples with required inputs, criteria, outputs and explicit review boundaries.',
      composition:
        'Three substantive procedure summaries with illustrative status; no empty Pack catalogue.',
      proof: ['p2p-recipe', 'credit-review', 'ifc-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Test Library and reusable Recipes',
      description:
        'Explore P2P, loan-file and control-review template examples with required inputs, criteria, outputs and explicit review boundaries.',
      canonical: '/product/test-library',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Reuse the procedure. Review the scope.',
    introduction:
      'A Test Pack is a reusable Recipe template. These three summaries illustrate procedures; they are not an availability catalogue.',
    claims: ['C23'],
    sections: [
      {
        id: 'p2p',
        heading: 'P2P amount comparison',
        paragraphs: [
          'Process: procurement; audience: internal audit. Inputs: invoice population, PDFs, approved PO export and procurement policy. Check: compare subtotal with approved PO amount within ₹1. Example template v3 uses Synthetic Procurement Policy v3 §4.2.',
          'Output to evaluate: source-linked amount exceptions and draft working-paper contents. Review the population, effective dates and source hierarchy before reuse.',
        ],
        claims: ['C17', 'C23'],
      },
      {
        id: 'credit',
        heading: 'Sanction versus disbursement',
        paragraphs: [
          'Process: lending; audience: banks, NBFCs and lenders. Inputs: loan population, sanction letters, disbursement export and lending policy. Example template v1 checks that disbursement does not exceed sanction.',
          'Supplied KYC evidence can support a separately configured completeness procedure. This is not an external identity or registry verification service.',
        ],
        claims: ['C17', 'C23'],
      },
      {
        id: 'ifc',
        heading: 'Independent control review',
        paragraphs: [
          'Process: journal-entry controls; audience: IFC/SOX teams. Inputs: control population, sign-offs, authority matrix and control procedure. Example template v1 compares performer and reviewer identity.',
          'Output to evaluate: failed independence checks with sign-off references. Review the evidence and context before raising a finding; no certification or automatic compliance conclusion follows.',
        ],
        claims: ['C17', 'C23'],
      },
      {
        id: 'customise',
        heading: 'Clone, customise and approve.',
        paragraphs: [
          'In the product model, a cloned template becomes an engagement-specific Recipe. Confirm its objective, inputs, matching logic, checks, severity, output and effective version; approval is a human step. No claim is made that all Packs described in the product plan are available today.',
        ],
        claims: ['C03', 'C10', 'C23'],
      },
    ],
    faq: [
      {
        question: 'Does this example confirm current availability?',
        answer:
          'The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence.',
        claims: ['C01', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/solutions/internal-audit',
    brief: {
      audience: 'Heads of Internal Audit and enterprise audit teams',
      question: 'How would this apply to our audit work?',
      purpose:
        'Explore a synthetic internal-audit fieldwork procedure with supplied inputs, source references and human review.',
      composition:
        'Audience → supplied inputs → distinct worked procedure → output and review boundary → related Product page.',
      proof: ['p2p-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'P2P fieldwork for internal-audit teams',
      description:
        'Explore a synthetic internal-audit fieldwork procedure with supplied inputs, source references and human review.',
      canonical: '/solutions/internal-audit',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'P2P fieldwork that a reviewer can follow.',
    introduction:
      'Recreating procedures and tracing spreadsheet exceptions each quarter makes review harder. Start with one explicit Test Recipe and the evidence it requires.',
    claims: ['C17'],
    sections: [
      {
        id: 'inputs',
        heading: 'Start with supplied evidence.',
        paragraphs: [
          'Invoice population, invoice PDFs, approved purchase orders, goods receipts, ERP payment export, vendor master, authority matrix and procurement policy.',
        ],
        claims: ['C17'],
      },
      {
        id: 'procedure',
        heading: 'An explicit procedure and a concrete exception.',
        paragraphs: [
          'The illustrative amount check compares ₹1,25,000 with an approved ₹1,20,000 PO. Its ₹5,000 difference exceeds a ₹1 tolerance. Goods receipt and payment are separate procedures; this check alone does not establish them.',
          'DEMO-RUN-018 has 180 of 190 eligible records completed, with 6 awaiting evidence and 4 processing errors. These are single-check marketing counts, not current product results.',
        ],
        claims: ['C17', 'C14'],
      },
      {
        id: 'output',
        heading: 'Carry the source into review.',
        paragraphs: [
          'The expected output is a record-level exception with expected/actual values, rule/version citation and source Trace. All illustrated results await reviewer confirmation; working-paper status is Draft / review incomplete. Confirmed related exceptions can support a finding after human review.',
        ],
        claims: ['C08', 'C13', 'C21'],
      },
      {
        id: 'scope',
        heading: 'Keep the scope clear.',
        paragraphs: [
          'Internal audit independently retests controls. Existing planning and reporting systems can remain in place; no certified integration is asserted.',
          'Missing evidence is reported separately unless the configured completeness procedure explicitly defines its absence as a failure.',
        ],
        claims: ['C06', 'C17'],
      },
      {
        id: 'related',
        heading: 'Explore the procedure in detail.',
        paragraphs: [
          'Continue with the audit test recipes explanation, then discuss your inputs and review requirements in a demo request.',
        ],
        claims: ['C42'],
      },
    ],
    faq: [
      {
        question: 'Is this a current product Run?',
        answer:
          'No. It is a labelled synthetic illustration, informed by the product model. Current release capture and export acceptance remain outstanding.',
        claims: ['C17', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/solutions/credit-loan-audit',
    brief: {
      audience: 'Credit-audit teams in banks, NBFCs and lenders',
      question: 'How would this apply to our audit work?',
      purpose:
        'Explore a synthetic credit and loan-file audit procedure with supplied inputs, source references and human review.',
      composition:
        'Audience → supplied inputs → distinct worked procedure → output and review boundary → related Product page.',
      proof: ['credit-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Credit and loan-file audit',
      description:
        'Explore a synthetic credit and loan-file audit procedure with supplied inputs, source references and human review.',
      canonical: '/solutions/credit-loan-audit',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Follow the loan from sanction to disbursement.',
    introduction:
      'Loan-file review needs to reconcile the terms approved with the amount and timing recorded. Use the evidence and lending criteria your team supplies.',
    claims: ['C17'],
    sections: [
      {
        id: 'inputs',
        heading: 'Start with supplied evidence.',
        paragraphs: [
          'Loan population, applications, KYC documents, sanction letters, disbursement export, lending policy, authority matrix and reviewed regulatory material.',
        ],
        claims: ['C17'],
      },
      {
        id: 'procedure',
        heading: 'An explicit procedure and a concrete exception.',
        paragraphs: [
          'In this invented display example, DEMO-LN-0011 is sanctioned for ₹35,00,000 and disbursed for ₹36,00,000. The ₹1,00,000 excess fails the zero-excess rule in Synthetic Lending Policy v1 §2.',
          'DEMO-CREDIT-001 is a separate single-check illustration: 12 received, 1 excluded, 11 eligible; 9 completed, 1 awaiting evidence and 1 processing error.',
        ],
        claims: ['C17', 'C14'],
      },
      {
        id: 'output',
        heading: 'Carry the source into review.',
        paragraphs: [
          'The expected output is a record-level exception with expected/actual values, rule/version citation and source Trace. All illustrated results await reviewer confirmation; working-paper status is Draft / review incomplete. Confirmed related exceptions can support a finding after human review.',
        ],
        claims: ['C08', 'C13', 'C21'],
      },
      {
        id: 'scope',
        heading: 'Keep the scope clear.',
        paragraphs: [
          'KYC means checks against supplied evidence. No external registry/status lookup, live RBI feed or automatic lending-compliance conclusion is included.',
          'Missing evidence is reported separately unless the configured completeness procedure explicitly defines its absence as a failure.',
        ],
        claims: ['C06', 'C17'],
      },
      {
        id: 'related',
        heading: 'Explore the procedure in detail.',
        paragraphs: [
          'Continue with the reconciliation and checks explanation, then discuss your inputs and review requirements in a demo request.',
        ],
        claims: ['C42'],
      },
    ],
    faq: [
      {
        question: 'Is this a current product Run?',
        answer:
          'No. It is a labelled synthetic illustration, informed by the product model. Current release capture and export acceptance remain outstanding.',
        claims: ['C17', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/solutions/ifc-sox',
    brief: {
      audience: 'Internal-control and IFC/SOX audit teams',
      question: 'How would this apply to our audit work?',
      purpose:
        'Explore a synthetic ifc and sox control testing procedure with supplied inputs, source references and human review.',
      composition:
        'Audience → supplied inputs → distinct worked procedure → output and review boundary → related Product page.',
      proof: ['ifc-review'],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'IFC and SOX control testing',
      description:
        'Explore a synthetic ifc and sox control testing procedure with supplied inputs, source references and human review.',
      canonical: '/solutions/ifc-sox',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Test the evidence of control operation.',
    introduction:
      'A sign-off is not enough if the procedure requires independent review. Put the control criterion beside the recorded performer and reviewer.',
    claims: ['C17'],
    sections: [
      {
        id: 'inputs',
        heading: 'Start with supplied evidence.',
        paragraphs: [
          'Journal/control population, signed control evidence, approval or authority matrix, period-end records and approved control procedure.',
        ],
        claims: ['C17'],
      },
      {
        id: 'procedure',
        heading: 'An explicit procedure and a concrete exception.',
        paragraphs: [
          'DEMO-JEA-002 records DEMO-PERSON-01 as both performer and reviewer. That fails the distinct-person rule in Synthetic Control Procedure v1 §2. No monetary exposure is assigned to this identity check.',
          'DEMO-IFC-001 is a separate single-check illustration: 8 received, 1 excluded, 7 eligible; 6 completed and 1 awaiting evidence, with no processing errors.',
        ],
        claims: ['C17', 'C14'],
      },
      {
        id: 'output',
        heading: 'Carry the source into review.',
        paragraphs: [
          'The expected output is a record-level exception with expected/actual values, rule/version citation and source Trace. All illustrated results await reviewer confirmation; working-paper status is Draft / review incomplete. Confirmed related exceptions can support a finding after human review.',
        ],
        claims: ['C08', 'C13', 'C21'],
      },
      {
        id: 'scope',
        heading: 'Keep the scope clear.',
        paragraphs: [
          'Finance performing a control is distinct from internal audit independently retesting it. Document checks do not replace observation, professional judgement or certify IFC/SOX compliance.',
          'Missing evidence is reported separately unless the configured completeness procedure explicitly defines its absence as a failure.',
        ],
        claims: ['C06', 'C17'],
      },
      {
        id: 'related',
        heading: 'Explore the procedure in detail.',
        paragraphs: [
          'Continue with the review and findings explanation, then discuss your inputs and review requirements in a demo request.',
        ],
        claims: ['C42'],
      },
    ],
    faq: [
      {
        question: 'Is this a current product Run?',
        answer:
          'No. It is a labelled synthetic illustration, informed by the product model. Current release capture and export acceptance remain outstanding.',
        claims: ['C17', 'C44'],
      },
    ],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/security',
    brief: {
      audience: 'Security, privacy and procurement reviewers',
      question: 'What should we verify before using real audit evidence?',
      purpose:
        "Review questions about product access, approvals, source history and data handling, separately from this website's enquiry processing.",
      composition:
        'Useful evaluation questions first, then verified website source facts; no trust badges.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Security evaluation',
      description:
        "Review questions about product access, approvals, source history and data handling, separately from this website's enquiry processing.",
      canonical: '/security',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'DocRack / Website',
    heading: 'Evaluate the controls alongside the workflow.',
    introduction:
      'Start with the data your procedure uses and who needs access. Product deployment and contractual assurances need evidence for the environment being evaluated.',
    claims: ['C30', 'C33'],
    sections: [
      {
        id: 'access',
        heading: 'Access, approval and history',
        paragraphs: [
          'Ask for the role and engagement-access matrix, negative access tests, maker-checker behaviour, override history and completed-Run protections. The illustrative website workflow does not demonstrate deployed tenant isolation.',
        ],
        claims: ['C30', 'C31', 'C32'],
      },
      {
        id: 'data',
        heading: 'Data location and processing',
        paragraphs: [
          'Confirm hosting and backup regions, encryption, AI providers and data flows, model-training terms, subprocessors, retention/deletion and incident contact. India residency, no-training guarantees, SSO, certifications and deployment options are not established by this website.',
        ],
        claims: ['C33', 'C34', 'C35'],
      },
      {
        id: 'website',
        heading: 'Website enquiries are separate.',
        paragraphs: [
          'The website code saves demo and support enquiries to Google Sheets and attempts an optional internal notification through Resend. It processes an IP-derived key for rate limiting and includes a production analytics component; live delivery and hosting-log retention have not been verified.',
          "Do not submit confidential audit evidence in either enquiry form. Product audit-evidence storage and the website's hosting configuration are separate matters.",
        ],
        claims: ['C39', 'C40', 'C43'],
      },
    ],
    faq: [],
    cta: {
      label: 'Contact the team',
      href: '/support',
    },
    readiness: {
      treatment: 'Website source facts',
      publication: 'Candidate for page implementation',
      limitations: [
        'Describes inspected website code; live delivery and operational commitments are unverified.',
      ],
    },
  },
  {
    path: '/company',
    brief: {
      audience: 'Enterprise audit buyers',
      question: 'Why this product focus?',
      purpose:
        'Learn why DocRack focuses on internal-audit fieldwork, explicit procedures, source-linked results and human review.',
      composition:
        'Editorial product purpose; omit unverified legal entity, biography, portrait and recognition sections.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'About DocRack',
      description:
        'Learn why DocRack focuses on internal-audit fieldwork, explicit procedures, source-linked results and human review.',
      canonical: '/company',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'Built around the work between evidence and review.',
    introduction:
      "DocRack's product direction centres on internal-audit fieldwork for Indian enterprises: making a procedure explicit and keeping the evidence close to a decision.",
    claims: ['C01'],
    sections: [
      {
        id: 'focus',
        heading: 'The problem is concrete.',
        paragraphs: [
          'A reviewer needs to understand what was tested, which source was authoritative and why an exception was raised. The Audit Test Recipe gives those questions a structured definition.',
        ],
        claims: ['C01', 'C03'],
      },
      {
        id: 'judgement',
        heading: 'A place for automation and judgement.',
        paragraphs: [
          'The model separates AI assistance, deterministic comparisons and human approval. It focuses on document/data procedures rather than the full GRC or audit-planning lifecycle.',
        ],
        claims: ['C04', 'C10'],
      },
      {
        id: 'conversation',
        heading: 'Start with a procedure.',
        paragraphs: [
          "Use the demo request to describe your team's fieldwork interests. Company biographies, programme relationships and customer stories are omitted until their facts and publication rights are confirmed.",
        ],
        claims: ['C28', 'C29', 'C46'],
      },
    ],
    faq: [],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/book-demo',
    brief: {
      audience: 'Audit teams evaluating DocRack',
      question: 'How do we discuss our procedure?',
      purpose:
        'Request a conversation about your audit procedures, supplied evidence, source-linked results and reviewer requirements.',
      composition:
        'Retain Phase 2 form composition and exact backend contract; no duration or response-time promise.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Request a DocRack demo',
      description:
        'Request a conversation about your audit procedures, supplied evidence, source-linked results and reviewer requirements.',
      canonical: '/book-demo',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'DocRack / Website',
    heading: 'Bring a procedure. Start a conversation.',
    introduction:
      'Tell us about your team so we can discuss the fieldwork you want to evaluate. This form requests a demo; it does not reserve a time.',
    claims: ['C42'],
    sections: [
      {
        id: 'agenda',
        heading: 'Discuss the work your team performs.',
        paragraphs: [
          'A useful conversation starts with your population and sources, the policy or procedure to test, and how reviewers assess exceptions and working papers. Specific formats and capabilities need confirmation for your evaluation.',
        ],
        claims: ['C38', 'C19'],
      },
      {
        id: 'form',
        heading: 'Request details',
        paragraphs: [
          'Full name, email, company and annual audit volume. Annual audit volume options remain 1-10, 10-50, 50-100 and 100+. Do not include confidential audit evidence.',
        ],
        claims: ['C42', 'C43'],
      },
      {
        id: 'received',
        heading: 'Request received.',
        paragraphs: [
          'Our team will contact you to arrange a time. No calendar reservation or visitor confirmation email is implied. Enquiry storage precedes the optional internal notification.',
        ],
        claims: ['C36', 'C42', 'C43'],
      },
    ],
    faq: [],
    cta: {
      label: 'Contact the team',
      href: '/support',
    },
    readiness: {
      treatment: 'Website source facts',
      publication: 'Candidate for page implementation',
      limitations: [
        'Describes inspected website code; live delivery and operational commitments are unverified.',
      ],
    },
  },
  {
    path: '/support',
    brief: {
      audience: 'Evaluators and users',
      question: 'Where can I ask a question?',
      purpose:
        'Send a product, evaluation or support question to the DocRack team. Do not include confidential audit files or sensitive evidence.',
      composition: 'Concise introduction, existing support form and distinct practical FAQs.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Contact and support',
      description:
        'Send a product, evaluation or support question to the DocRack team. Do not include confidential audit files or sensitive evidence.',
      canonical: '/support',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'DocRack / Website',
    heading: 'Tell us what you need help with.',
    introduction:
      'Use this form for product questions, evaluation questions or support enquiries. Include enough context to explain the issue without confidential audit data.',
    claims: ['C37', 'C43'],
    sections: [
      {
        id: 'form',
        heading: 'Your question',
        paragraphs: [
          'Full name, email and message. Avoid passwords, access tokens, bank details, borrower records and audit attachments. The form has no evidence-upload field.',
        ],
        claims: ['C39', 'C43'],
      },
      {
        id: 'received',
        heading: 'Message received.',
        paragraphs: [
          'Your message has been submitted to the team. No response time is promised. If saving fails, the form reports the error so you can try again; notification failure after saving does not make the submission fail.',
        ],
        claims: ['C37', 'C43'],
      },
      {
        id: 'questions',
        heading: 'Scope and availability',
        paragraphs: [
          "DocRack's product direction is internal-audit fieldwork. Ask about the particular inputs, configured procedure and review output you need. Supplied-source checks do not imply external registry verification.",
        ],
        claims: ['C01', 'C17'],
      },
    ],
    faq: [
      {
        question: 'Can I send audit files here?',
        answer:
          'No. Use the form for a description without confidential evidence; no secure product-upload workflow is established by this website form.',
        claims: ['C39'],
      },
      {
        question: 'Will I receive a confirmation email?',
        answer:
          'The current website sends optional notifications to the internal team. A visitor confirmation email is not part of the form contract.',
        claims: ['C43'],
      },
    ],
    cta: {
      label: 'Contact the team',
      href: '/support',
    },
    readiness: {
      treatment: 'Website source facts',
      publication: 'Candidate for page implementation',
      limitations: [
        'Describes inspected website code; live delivery and operational commitments are unverified.',
      ],
    },
  },
  {
    path: '/glossary',
    brief: {
      audience: 'Auditors and evaluators',
      question: 'What do these terms mean?',
      purpose:
        'Definitions of Audit Test Recipe, Test, Run, Trace, coverage, exception, finding, Working Paper and all six result states.',
      composition:
        'Readable linked definitions; retain eleven historical anchors and derive future DefinedTermSet from these same strings.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Use qualified copy; do not imply current release availability.',
      ],
    },
    metadata: {
      title: 'Audit fieldwork glossary',
      description:
        'Definitions of Audit Test Recipe, Test, Run, Trace, coverage, exception, finding, Working Paper and all six result states.',
      canonical: '/glossary',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'AI-assisted internal-audit fieldwork',
    heading: 'A shared language for evidence and review.',
    introduction:
      "These definitions explain DocRack's product model. They do not establish availability of every described capability.",
    claims: ['C03', 'C04', 'C05'],
    sections: [
      {
        id: 'audit-test-recipe',
        heading: 'Audit Test Recipe',
        paragraphs: [
          'The structured, versioned definition of an audit procedure: objective, risk, population, sources, extraction, source hierarchy, calculations, policy, regulation, result logic, severity, approval, output and effective version.',
        ],
        claims: ['C03'],
      },
      {
        id: 'test',
        heading: 'Test',
        paragraphs: [
          'The definition of what is to be tested. Extract, Reconcile and Checks belong inside a Test.',
        ],
        claims: ['C04'],
      },
      {
        id: 'run',
        heading: 'Run',
        paragraphs: [
          'One execution of a Test, recording input versions, Recipe version, engine/model context, execution log and result snapshot. A new Recipe does not rewrite completed Run history.',
        ],
        claims: ['C04', 'C11'],
      },
      {
        id: 'trace',
        heading: 'Trace',
        paragraphs: [
          "A value's connection to a file and page/region or sheet/row/cell, with original and normalised values, method, confidence and correction history.",
        ],
        claims: ['C08'],
      },
      {
        id: 'configured-tests',
        heading: 'Configured tests',
        paragraphs: [
          'Procedures with explicit scope and criteria. Population coverage concerns eligible records for these tests, subject to evidence and successful processing; it is not complete audit assurance.',
        ],
        claims: ['C14'],
      },
      {
        id: 'population',
        heading: 'Population',
        paragraphs: [
          'The records in scope. Account separately for received, eligible, tested, excluded, processing failures and awaiting evidence. Multiple checks per record have a different denominator from record counts.',
        ],
        claims: ['C14'],
      },
      {
        id: 'coverage',
        heading: 'Coverage',
        paragraphs: [
          'How much of the defined population the configured procedure completed. State the denominator, exclusions, unavailable evidence and processing failures.',
        ],
        claims: ['C14'],
      },
      {
        id: 'evidence',
        heading: 'Evidence',
        paragraphs: [
          'Sources used to support a procedure. Roles are Population, Primary evidence, Source of truth, Supporting evidence, Reference data and Policy/regulation.',
        ],
        claims: ['C03'],
      },
      {
        id: 'source-linked-result',
        heading: 'Source-linked result',
        paragraphs: [
          'A check result retaining the Traces of compared evidence and the relevant rule and version citation.',
        ],
        claims: ['C08'],
      },
      {
        id: 'exception',
        heading: 'Exception',
        paragraphs: [
          'A record-level issue identified by a configured check. A failed result needs a typed reason and review; it is not automatically a confirmed finding.',
        ],
        claims: ['C13'],
      },
      {
        id: 'review',
        heading: 'Review',
        paragraphs: [
          "A person's assessment of a result and its evidence, including confirmation, correction, uncertainty and reasoned overrides.",
        ],
        claims: ['C10', 'C32'],
      },
      {
        id: 'human-approval',
        heading: 'Human approval',
        paragraphs: [
          'A recorded human decision on a Recipe or conclusion. A Copilot draft or website interaction cannot silently provide approval.',
        ],
        claims: ['C10', 'C16'],
      },
      {
        id: 'finding',
        heading: 'Finding',
        paragraphs: [
          'An audit issue grouping one or more related confirmed exceptions, with criteria, condition, cause, impact, recommendation and sign-offs.',
        ],
        claims: ['C13'],
      },
      {
        id: 'working-paper',
        heading: 'Working Paper',
        paragraphs: [
          'The record of scope, procedure, coverage, sources, results, limitations, exceptions, findings and approvals. Draft work is distinct from a reviewed, locked version.',
        ],
        claims: ['C21', 'C22'],
      },
      {
        id: 'test-pack',
        heading: 'Test Pack',
        paragraphs: [
          'A reusable Recipe template with inputs, checks, outputs, version and approval state; cloned scope still needs engagement-specific review.',
        ],
        claims: ['C23'],
      },
      {
        id: 'knowledge-hub',
        heading: 'Knowledge Hub',
        paragraphs: [
          'The workspace collection of versioned policies/regulations, reference/master data and methodology used as citable sources.',
        ],
        claims: ['C15'],
      },
      {
        id: 'pass',
        heading: 'Pass',
        paragraphs: ['The configured requirement was satisfied.'],
        claims: ['C05'],
      },
      {
        id: 'fail',
        heading: 'Fail',
        paragraphs: [
          'Evidence establishes that the configured requirement was not satisfied; retain the typed reason.',
        ],
        claims: ['C05'],
      },
      {
        id: 'insufficient-evidence',
        heading: 'Insufficient evidence',
        paragraphs: [
          'Required evidence is unavailable. Missing evidence is reported separately unless the configured procedure explicitly defines its absence as a failure.',
        ],
        claims: ['C05', 'C06'],
      },
      {
        id: 'needs-human-review',
        heading: 'Needs human review',
        paragraphs: ["A reliable conclusion requires a person's judgement."],
        claims: ['C05'],
      },
      {
        id: 'not-applicable',
        heading: 'Not applicable',
        paragraphs: [
          'The rule does not apply to this record. An excluded population record is not automatically a Not applicable check result.',
        ],
        claims: ['C05', 'C14'],
      },
      {
        id: 'processing-error',
        heading: 'Processing error',
        paragraphs: [
          'A technical problem prevented execution; this is not a successfully completed check.',
        ],
        claims: ['C05'],
      },
    ],
    faq: [],
    cta: {
      label: 'Book a demo',
      href: '/book-demo',
    },
    readiness: {
      treatment: 'Illustrative product model',
      publication: 'Candidate for page implementation',
      limitations: [
        'Examples explain the product model using synthetic data; they are not captures or proof of current availability.',
        'Confirm the required procedure, input formats and output scope during evaluation.',
      ],
    },
  },
  {
    path: '/privacy',
    brief: {
      audience: 'Website visitors',
      question: 'What happens to information submitted on this website?',
      purpose:
        'How the DocRack website handles demo and support enquiries, rate-limit data and configured service providers.',
      composition:
        'Concrete website-only review draft; withhold activation until owner facts and legal review are complete.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Obtain the recorded owner facts and review before publication.',
      ],
    },
    metadata: {
      title: 'Website privacy notice',
      description:
        'How the DocRack website handles demo and support enquiries, rate-limit data and configured service providers.',
      canonical: '/privacy',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'DocRack / Website',
    heading: 'Website privacy notice',
    introduction:
      'This notice concerns the public DocRack website and its enquiry forms. Product audit evidence and any product agreement have a separate scope.',
    claims: ['C39', 'C43'],
    sections: [
      {
        id: 'information',
        heading: 'Information processed',
        paragraphs: [
          'A demo request contains your name, email, company and annual audit-volume selection. A support enquiry contains your name, email and message. The server adds a submission timestamp.',
          'The website uses an IP-derived key to limit repeated requests and a hidden field to help detect automated submissions. Its production layout includes Vercel Analytics. Actual analytics delivery, provider processing and hosting-log retention need confirmation before this notice is published.',
        ],
        claims: ['C39', 'C40', 'C41'],
      },
      {
        id: 'purpose',
        heading: 'How enquiries are used',
        paragraphs: [
          'Enquiry details are used to handle demo requests, product questions and support messages. Do not include confidential audit records, borrower information, passwords or tokens.',
        ],
        claims: ['C42', 'C43'],
      },
      {
        id: 'recipients',
        heading: 'Configured recipients and services',
        paragraphs: [
          'The website saves accepted enquiries in Google Sheets. When configured, Resend sends an internal team notification containing enquiry details. A notification failure after storage does not undo the saved enquiry. The form does not send a visitor confirmation email.',
          'Website hosting processes requests separately from product audit-evidence storage. This notice does not establish product data residency or model-provider terms.',
        ],
        claims: ['C33', 'C43'],
      },
      {
        id: 'retention',
        heading: 'Retention and requests',
        paragraphs: [
          'A rate-limit window is not a verified deletion schedule. The current in-memory limiter can retain expired keys until they are reused or the process restarts. Enquiry, provider and hosting retention periods require owner confirmation.',
          'Use the support form for a website privacy question, without including sensitive supporting documents. The responsible legal entity, dedicated request contact, legal basis and request-handling procedure must be settled during final notice review.',
        ],
        claims: ['C29', 'C40', 'C41'],
      },
    ],
    faq: [],
    cta: {
      label: 'Contact the team',
      href: '/support',
    },
    readiness: {
      treatment: 'Owner review required',
      publication: 'Hold for owner review',
      limitations: [
        'Legal identity, rights, retention and final owner review remain unresolved; see claims register.',
      ],
    },
  },
  {
    path: '/terms',
    brief: {
      audience: 'Website visitors',
      question: 'What does this website offer?',
      purpose:
        "Terms for using DocRack's public website, illustrative examples and enquiry forms, separate from any product agreement.",
      composition:
        'Website-only review draft with concrete example and enquiry terms; no invented legal identity or liability clauses.',
      proof: [],
      acceptance: [
        'Retain the established Phase 2 visual direction.',
        'Keep citations and example labels adjacent to the claim.',
        'Obtain the recorded owner facts and review before publication.',
      ],
    },
    metadata: {
      title: 'Website terms',
      description:
        "Terms for using DocRack's public website, illustrative examples and enquiry forms, separate from any product agreement.",
      canonical: '/terms',
      image: '/opengraph-image',
      imageAlt: 'DocRack — From audit evidence to answers you can review.',
    },
    eyebrow: 'DocRack / Website',
    heading: 'Website terms',
    introduction:
      'These terms concern the public DocRack website. Product access, audit-evidence processing and commercial commitments require a separate agreement.',
    claims: ['C42', 'C47'],
    sections: [
      {
        id: 'examples',
        heading: 'Illustrative material',
        paragraphs: [
          'New worked examples are labelled synthetic and use invented records and policy criteria. They are not customer results, current product captures, regulatory advice, certifications or audit conclusions. Evaluate actual capability and suitability for your procedure before relying on it.',
        ],
        claims: ['C17', 'C44'],
      },
      {
        id: 'enquiries',
        heading: 'Enquiry forms',
        paragraphs: [
          'A demo submission is a request to discuss the product, not a calendar booking, purchase or guaranteed response time. Use the support form for questions without confidential audit evidence or access credentials.',
        ],
        claims: ['C36', 'C37', 'C42'],
      },
      {
        id: 'use',
        heading: 'Use of the website',
        paragraphs: [
          "Use the website and forms for legitimate enquiries. Do not attempt to disrupt the service, gain unauthorised access or submit another person's confidential information.",
          'Website materials explain the product direction. A configured procedure does not provide complete audit assurance or replace professional judgement.',
        ],
        claims: ['C10', 'C14'],
      },
      {
        id: 'rights',
        heading: 'Rights and contact',
        paragraphs: [
          'Brand marks and third-party materials remain subject to their applicable rights. No blanket ownership or permission assertion is made for inherited assets. Contact the team through Support about website material.',
          'The responsible legal entity, terms owner, jurisdiction and any contractual limitation language require confirmation and legal review before publication.',
        ],
        claims: ['C29', 'C47'],
      },
    ],
    faq: [],
    cta: {
      label: 'Contact the team',
      href: '/support',
    },
    readiness: {
      treatment: 'Owner review required',
      publication: 'Hold for owner review',
      limitations: [
        'Legal identity, rights, retention and final owner review remain unresolved; see claims register.',
      ],
    },
  },
] as const satisfies readonly LaunchPage[];
