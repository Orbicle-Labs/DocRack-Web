/**
 * The FAQ is written from scratch.
 *
 * The previous four answers asserted CARO 2020 auto-checklists, Row Level
 * Security, "all data stored within India (AWS Mumbai region)", DPDP
 * compliance, Merkle-tree audit trails and Tally Prime integration. Every one
 * of those is either unverified (§16) or aimed at statutory audit for CA firms,
 * which is not who this site is for any more.
 *
 * These live here rather than in the page because the same array feeds both the
 * rendered <details> list and the FAQPage JSON-LD. Two copies would drift, and
 * structured data that disagrees with the visible page is a Google policy
 * violation as well as a lie.
 */
export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What does DocRack actually do?',
    a: 'It runs audit fieldwork. Evidence comes in as classified inputs, a configured Audit Test Recipe runs against the population, exceptions are reviewed with their evidence attached, and the working paper is generated from that run. It is the execution layer, not an audit-management or issue-tracking tool.',
  },
  {
    q: 'Does the AI decide whether a control passed?',
    a: 'No. AI extracts values from documents, classifies inputs and drafts recipes from written procedures. The comparison that produces a pass or a fail is deterministic logic running the rules and tolerances configured in the recipe, so the same run twice gives the same answer. A person approves the recipe before it runs and approves the conclusion after it does.',
  },
  {
    q: 'What happens when a required document is missing?',
    a: 'The test reports insufficient evidence. That is a distinct outcome from a failure, and it stays distinct all the way through to the working paper — a control that could not be tested is not the same as a control that did not work, and treating them the same produces findings that do not survive a conversation with the business.',
  },
  {
    q: 'Can it apply our own policies rather than generic rules?',
    a: 'Yes — that is what the Knowledge Hub is for. Your policies, SOPs and reference data are held with their source, version, effective date and applicability, and a check cites the specific clause and version it applied. Tests can be evaluated against the policy in force on the date of the transaction rather than the current one.',
  },
  {
    q: 'Which formats can it read?',
    a: 'Digital PDFs, scanned documents, Excel workbooks, CSV extracts and system exports. Extracted values keep the document, page and cell they came from, along with extraction confidence and any human correction.',
  },
  {
    q: 'How does a reviewer check a result without reopening the source file?',
    a: 'Every result carries the rule that produced it, the values it compared and a link to the document page or spreadsheet cell each value came from, plus the reviewer decision and the reason recorded against it. Opening the exception shows all of that in one place.',
  },
  {
    q: 'Where is our data held, and what are your security commitments?',
    a: 'Our security page covers what follows from the architecture — tenant isolation, engagement-scoped access, activity logging and evidence versioning. Hosting, residency, retention, subprocessors and model-provider terms we put in writing for your security team rather than on a web page. Ask and we will send the documentation.',
  },
];
