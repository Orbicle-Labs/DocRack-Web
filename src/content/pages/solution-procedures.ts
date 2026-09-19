import type { CopySection } from './launch';
/** Procedure definitions, not current Pack availability. C17, C23; no extra Run results. */
export const solutionProcedures = {
  p2p: {
    id: 'repeat',
    heading: 'Reuse the procedure. Review the new period.',
    paragraphs: [
      'Clone the approved template into the engagement, set the entity and period, and review the population, authoritative sources and tolerance. A new period uses its own input versions and Run; it does not overwrite the previous review.',
      'Alongside amount matching, evaluate separate approval-limit, duplicate-invoice and recalculation procedures. Invoice, PO, GRN and ERP payment records answer different questions. The worked subtotal result alone does not establish receipt, payment or every control.',
    ],
    claims: ['C03', 'C11', 'C17', 'C23'],
  },
  credit: {
    id: 'terms-and-evidence',
    heading: 'Check the terms as well as the amount.',
    paragraphs: [
      'A separate term comparison can match the sanctioned tenure, rate or conditions to the supplied agreement and disbursement schedule. Specify the authoritative field, date and tolerance in the Recipe; a disagreement needs its own typed exception and source citations.',
      'For supplied KYC or sanction documents, configure completeness separately. An unavailable sanction source leaves the amount comparison at Insufficient evidence; only a completeness procedure that explicitly requires the document can classify its absence as Fail. Review lending-policy applicability and approval authority before concluding.',
    ],
    claims: ['C03', 'C06', 'C17'],
  },
  ifc: {
    id: 'control-procedures',
    heading: 'Test how the control operated.',
    paragraphs: [
      'For a journal-entry approval test, compare the supplied sign-off with the approved authority matrix and transaction threshold. An approval outside the authorised limit needs the amount, approver role, matrix version and source reference.',
      'For period cut-off, compare posting and supporting-document dates against the configured reporting period. For reconciliation, tie a board-deck or MIS total to supplied ledger rows and retain the calculation. These are separate procedures to evaluate, not additional results in DEMO-IFC-001.',
      'A document-based test can support assessment of recorded control operation. It cannot establish an observation that requires a person to witness the control. Finance performing the control and internal audit independently retesting it remain distinct.',
    ],
    claims: ['C03', 'C08', 'C17'],
  },
} as const satisfies Record<string, CopySection>;
