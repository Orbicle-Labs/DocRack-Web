/** Product definitions and P2P illustration: claims C03, C05, C06, C08, C10, C11, C16. */
export const recipeAnatomy = [
  ['Audit objective', 'Establish whether invoice subtotal agrees with the approved PO.'],
  ['Risk', 'An invoice exceeds the authorised purchase value. A difference is not a proven loss.'],
  [
    'Population and period',
    'Eligible PO-backed records in Q1 FY27. Account for exclusions and unavailable evidence.',
  ],
  [
    'Required documents/datasets',
    'ERP payment export, invoice PDFs, approved PO export and policy; assign each source its role.',
  ],
  [
    'Extraction fields',
    'Invoice subtotal, PO reference and approved amount, each with its original value and source Trace.',
  ],
  [
    'Source-of-truth hierarchy',
    'The approved PO wins for the authorised amount. Authority is configured per field.',
  ],
  [
    'Calculations and tolerances',
    'Absolute subtotal difference ≤ ₹1. ₹1,25,000 versus ₹1,20,000 exceeds that tolerance.',
  ],
  ['Company-policy requirements', 'Synthetic Procurement Policy v3 §4.2, effective 1 April 2026.'],
  [
    'Regulatory requirements',
    'None configured in this illustration. A real rule needs jurisdiction, applicability, effective date, version and exact citation.',
  ],
  [
    'Result logic',
    'Pass, Fail, Insufficient evidence, Needs human review, Not applicable or Processing error. Missing evidence is separate unless a completeness rule explicitly makes it a failure.',
  ],
  [
    'Exception severity',
    'Critical, High, Medium or Low, assessed in the context of risk and potential exposure.',
  ],
  [
    'Review and approval',
    'Maker-checker separates preparer and reviewer. Corrections, overrides with reasons, escalation and sign-off are attributable human decisions.',
  ],
  [
    'Output format',
    'Working-paper contents, exception register, findings and evidence index. This example remains Draft / review incomplete.',
  ],
  [
    'Version and effective date',
    'Record author, approver, change summary and sources. DEMO-RUN-018 retains Recipe v3; a later policy or Recipe cannot rewrite completed history.',
  ],
] as const;
