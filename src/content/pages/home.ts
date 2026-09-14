import { launchPages, type ClaimId } from './launch';
import { fixtures, formatMoney } from '../demos/fixtures';

export const home = launchPages[0];
export const workflowSteps = [
  {
    label: 'Documents',
    heading: 'Give each source a role.',
    text: 'The invoice is primary evidence; the approved purchase order is the amount authority. An ERP payment export defines the population. Goods receipts support the procedure, reference data supplies mappings, and the synthetic procurement policy defines the criteria.',
  },
  {
    label: 'Tests',
    heading: 'Define the procedure before the Run.',
    text: 'The Audit Test Recipe holds Extract, Reconcile and Checks. Match on the PO reference; compare invoice subtotal with the approved PO amount using a ₹1 tolerance and Synthetic Procurement Policy v3 §4.2. Recipe v3 is approved only within this illustration; conclusions still require human review.',
  },
  {
    label: 'Runs',
    heading: 'One execution. A retained snapshot.',
    text: 'DEMO-RUN-018 uses Recipe v3 and input versions v1. Of 200 received records, 10 are excluded and 190 eligible. Execution completes for 180; 6 await evidence and 4 have processing errors. In the product model, completed Run history is immutable; new versions do not rewrite earlier work.',
  },
  {
    label: 'Review',
    heading: 'Inspect the exception beside its source.',
    text: 'DEMO-0042: ₹1,25,000 invoice subtotal versus ₹1,20,000 approved PO. The ₹5,000 difference exceeds ₹1 tolerance: Fail / Amount mismatch. Trace the invoice to page 1 and the PO to Orders!H43. Reviewer confirmation remains outstanding.',
  },
  {
    label: 'Findings',
    heading: 'An exception is not yet a finding.',
    text: 'A finding groups related confirmed exceptions into an audit issue with criteria, condition, cause, impact, recommendation and sign-offs. DEMO-0042 remains unconfirmed: no finding has been raised and there are zero related confirmed exceptions in this illustration.',
  },
  {
    label: 'Working Papers',
    heading: 'Carry the reasoning into the review record.',
    text: 'The working paper brings scope, population, procedure, exceptions, source references, comments and sign-offs together. DEMO-RUN-018 remains Draft / review incomplete. Moving through this example does not approve a result or create an export.',
  },
] as const;
export const homeClaims: readonly ClaimId[] = [
  'C01',
  'C03',
  'C04',
  'C05',
  'C06',
  'C08',
  'C09',
  'C10',
  'C11',
  'C13',
  'C14',
  'C15',
  'C16',
  'C17',
  'C21',
  'C22',
  'C30',
  'C31',
  'C32',
  'C33',
  'C42',
  'C44',
];
export const procedures = [
  {
    fixture: fixtures.p2p,
    label: 'Procure-to-pay',
    inputs: 'Invoice ↔ approved PO ↔ goods receipt ↔ ERP export',
    check: 'Compare invoice subtotal with the approved PO amount.',
    exception: `${formatMoney(fixtures.p2p.money.deltaPaise)} above the approved amount; reviewer confirmation outstanding.`,
    href: '/solutions/internal-audit',
  },
  {
    fixture: fixtures.credit,
    label: 'Credit and loan files',
    inputs: 'Sanction ↔ disbursement ↔ supplied borrower evidence',
    check: 'Compare disbursement with the sanctioned amount.',
    exception: `${fixtures.credit.actual} disbursed against ${fixtures.credit.expected} sanctioned; a ${formatMoney(fixtures.credit.money.deltaPaise)} difference.`,
    href: '/solutions/credit-loan-audit',
  },
  {
    fixture: fixtures.ifc,
    label: 'Financial and IFC/SOX controls',
    inputs: 'Journal-entry control record ↔ sign-off evidence ↔ control procedure',
    check: 'Check that the control reviewer differs from the performer.',
    exception: `${fixtures.ifc.actual}; independent review is not evidenced.`,
    href: '/review-and-findings',
  },
] as const;
