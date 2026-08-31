/**
 * The four §12 product stories. Every use case shows inputs, procedure,
 * example exceptions and output — §10.9 requires all four, because a use case
 * without its exceptions reads as a feature list.
 *
 * Phase 3's solution pages reuse these verbatim, so the shape is deliberately
 * page-agnostic.
 */

export interface UseCase {
  key: string;
  label: string;
  title: string;
  inputs: string[];
  procedure: string;
  exceptions: string[];
  output: string;
}

export const useCases: UseCase[] = [
  {
    key: 'invoice',
    label: 'Invoice audit',
    title: 'Three-way matching across invoices, POs and receipts',
    inputs: ['Invoice PDFs', 'PO data', 'GRN data', 'Vendor master', 'ERP payment export'],
    procedure:
      'Extract invoice fields, match invoice to PO and GRN, recalculate totals and tax, then check for duplicates and approval limits.',
    exceptions: [
      'Quantity mismatch',
      'Price mismatch',
      'Duplicate invoice',
      'Missing GRN',
      'Unauthorised approval',
      'Unknown vendor',
    ],
    output:
      'Reviewed exception register and working paper with document and row-level traceability.',
  },
  {
    key: 'credit',
    label: 'Credit and loan audit',
    title: 'Sanction, disbursement and documentation testing',
    inputs: [
      'Loan population',
      'Borrower files',
      'Sanction documents',
      'Lending policy',
      'Approval matrix',
      'Regulatory requirements',
    ],
    procedure:
      'Extract borrower and sanction information, reconcile it across sources, then apply eligibility, approval and documentation rules.',
    exceptions: [
      'Missing document',
      'Sanction-condition breach',
      'Incorrect authority',
      'Disbursement above sanction',
      'Policy deviation',
      'Insufficient evidence',
    ],
    output: 'Loan-level results, evidence-linked exceptions and a credit-audit working paper.',
  },
  {
    key: 'board-deck',
    label: 'Board-deck reconciliation',
    title: 'Slide figures reconciled to the source workbook',
    inputs: ['Board presentation', 'Source-of-truth Excel workbook'],
    procedure:
      'Extract labelled figures from slides, map them to spreadsheet values, and apply exact or tolerance-based checks.',
    exceptions: [
      'Value mismatch',
      'Missing figure',
      'Outdated source version',
      'Unsupported number',
    ],
    output: 'Slide-to-cell reconciliation with evidence links.',
  },
  {
    key: 'claims',
    label: 'Health-insurance claims audit',
    title: 'Claim eligibility, limits and document completeness',
    inputs: [
      'Claim population',
      'Policy documents',
      'Bills',
      'Discharge summary',
      'Approval data',
      'Applicable rules',
    ],
    procedure:
      'Extract claim information, then apply waiting periods, limits, document-completeness rules and approval checks.',
    exceptions: [
      'Waiting-period breach',
      'Limit breach',
      'Missing evidence',
      'Inconsistent details',
      'Approval deviation',
    ],
    output: 'Claim-level results, exception register and review-ready working paper.',
  },
];
