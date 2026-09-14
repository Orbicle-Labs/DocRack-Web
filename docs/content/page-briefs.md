# Phase 3 — final page briefs and publication copy

Generated from `src/content/pages/launch.ts`. Copy is complete for implementation; current-release evidence is not inferred. Privacy and terms remain held for owner/legal review. No Phase 4/5 routes are activated.

## /

**Audience:** Heads of Internal Audit and audit managers

**Visitor question:** What is DocRack, and can I inspect the reasoning?

**Composition:** Eight-chapter homepage brief: opening, worked procedure, Recipe, coverage, use cases, paper, governance, request. Implement in Phase 4.

**Metadata:** Internal-audit fieldwork — Explore an illustrative audit procedure from evidence and a versioned Audit Test Recipe to source-linked results and human review.

**Canonical at launch:** `/` · **Claims:** C01, C18 · **Treatment:** Illustrative product model

**Proof assets:** p2p-review, p2p-recipe, p2p-population

### From audit evidence to answers you can review.

AI-assisted internal-audit fieldwork for Indian enterprises. Explore a worked example of a procedure, its sources and the decisions that stay with your team.

**One invoice. Two amounts.** (`evidence`; C08, C17)

In the synthetic P2P example, invoice DEMO-0042 has a subtotal of ₹1,25,000. The approved PO records ₹1,20,000. The ₹5,000 difference exceeds the configured ₹1 tolerance.

Open the invoice page, PO cell and Synthetic Procurement Policy v3 §4.2. The result is Fail; reviewer confirmation remains outstanding.

**Start with an Audit Test Recipe.** (`recipe`; C03, C04)

Define the objective, population, sources, comparisons and approval requirements before interpreting a result. Extract, Reconcile and Checks belong inside Tests.

**Account for what completed.** (`coverage`; C05, C14)

This single-check illustration receives 200 records: 10 excluded and 190 eligible. Execution completes for 180; 6 await evidence and 4 have processing errors. Completion does not resolve human review.

**A procedure for the work in front of you.** (`work`; C17)

Follow P2P amount comparisons, sanction versus disbursement checks, or independent review of journal-entry controls. Each example uses its own supplied evidence and criteria.

**Give the reviewer the reasoning.** (`paper`; C21, C22)

A working paper brings scope, procedure, coverage, results, exceptions, evidence references and sign-offs together. The illustrated P2P work remains Draft / review incomplete; no genuine download is available in this example.

**Keep the conclusion in human hands.** (`control`; C10, C13)

AI assists with extraction and drafts; deterministic code applies configured comparisons. Auditors approve Recipes and conclusions. A record-level exception becomes part of a finding only through review.

**Bring one procedure to the conversation.** (`next`; C42)

Request a demo to discuss your evidence, configured rules and reviewer requirements. Submitting the form requests a conversation; it does not reserve a calendar slot.

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product

**Audience:** Audit managers and reviewers

**Visitor question:** How does the fieldwork fit together?

**Composition:** Retain the Phase 2 workflow and responsibility composition; add evidence-led detail in Phase 5.

**Metadata:** The fieldwork workflow — Understand Documents, Tests, Runs, Review, Findings and Working Papers, with the Audit Test Recipe at the centre.

**Canonical at launch:** `/product` · **Claims:** C01, C04 · **Treatment:** Illustrative product model

**Proof assets:** p2p-recipe, p2p-population

### A procedure you can follow from evidence to review.

The illustrative workflow connects the audit procedure to the sources, result and human decision. A Test defines what to do; a Run records one execution.

**Documents → Tests → Runs → Review → Findings → Working Papers** (`workflow`; C03, C04, C13, C21)

Documents establish the source set. Tests hold the Audit Test Recipe, including Extract, Reconcile and Checks. A Run records inputs, Recipe version, execution details and outcomes.

Review resolves uncertainty and records decisions. Findings group related confirmed exceptions. Working Papers collect the procedure, evidence references and sign-offs.

**Engagement work and reusable knowledge.** (`workspace`; C15, C16, C23)

Overview summarises an engagement's scope, population and open review work. The workspace holds Test Library templates and Knowledge Hub sources; Copilot assists across this context.

**A snapshot is distinct from a conclusion.** (`integrity`; C09, C11, C12)

In the product model, completed Run history is immutable. New inputs or Recipe versions create new work. Run Integrity: Verified means the recorded inputs and versions remain unchanged; it does not mean the audit passed.

Reperformance needs pinned inputs, versions and retained model outputs where relevant. A fresh unpinned model call is not a guarantee of identical results.

**AI assists. Code compares. People approve.** (`responsibility`; C10)

AI extraction and suggested mappings need evidence review. Deterministic comparisons apply the configured arithmetic. Recipe approval, exception decisions and final conclusions stay with people.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product/audit-test-recipes

**Audience:** Preparers and reviewers

**Visitor question:** What exactly is being tested?

**Composition:** Written procedure beside Recipe excerpt; fourteen components grouped into scope, logic and control.

**Metadata:** Audit Test Recipes — Explore all fourteen components of an Audit Test Recipe, from objective and population to source hierarchy, approval and version.

**Canonical at launch:** `/product/audit-test-recipes` · **Claims:** C03, C04 · **Treatment:** Illustrative product model

**Proof assets:** p2p-recipe

### Make the procedure explicit.

An Audit Test Recipe is the structured, versioned definition of a Test. The example compares invoice subtotal with approved PO amount; its result still needs review.

**Objective, risk and population** (`scope`; C03, C08)

1. Audit objective: establish whether invoice subtotal agrees with the approved PO. 2. Risk: an invoice exceeds authorised purchase value. 3. Population and period: eligible PO-backed records in Q1 FY27, with exclusions and evidence gaps accounted for.

2. Required inputs: label each document or dataset by role. 5. Extraction fields: retain a Trace for each compared value. 6. Source-of-truth hierarchy: the approved PO is authoritative for this amount, not automatically for every field.

**Calculations, criteria and results** (`logic`; C03, C05, C06)

7. Calculations and tolerances: absolute amount difference ≤ ₹1. 8. Company policy: Synthetic Procurement Policy v3 §4.2, effective 1 April 2026. 9. Regulation: none configured in this example; invented policy text is not a legal requirement.

8. Result logic: Pass, Fail, Insufficient evidence, Needs human review, Not applicable and Processing error. 11. Exception severity: assign severity in the context of risk and potential exposure; a difference alone is not a proven loss.

**Approval, output and version** (`recipe-run`; C03, C10, C11, C16)

12. Review and approval: the illustrative Recipe is approved; result confirmation remains outstanding. Overrides require a reason and attributable decision. 13. Output: a draft working paper with procedure, source references and review limitations. 14. Version and effective date: Recipe v3 and Policy v3 remain identified with DEMO-RUN-018.

A policy update requires a new version and review of affected Recipes. It must not rewrite completed Run history. A Copilot-compiled Recipe is a draft until a person approves it.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product/documents

**Audience:** Preparers and evidence reviewers

**Visitor question:** Can I see where a value came from?

**Composition:** Large source detail and adjacent accessible Trace; format readiness table from readiness.ts.

**Metadata:** Documents and source Traces — Understand source roles, page and cell Traces, extraction review and the format-specific evidence needed to evaluate DocRack.

**Canonical at launch:** `/product/documents` · **Claims:** C08, C19 · **Treatment:** Illustrative product model

**Proof assets:** p2p-review

### Give every source a role.

A source Trace connects a value to its file and exact location. The P2P illustration compares a PDF subtotal with a purchase-order cell.

**Six roles, one source set** (`roles`; C03)

Population defines the records. Primary evidence supports the transaction. Source of truth identifies an authoritative value. Supporting evidence corroborates it. Reference data supplies approved lists or matrices. Policy/regulation supplies criteria.

**Follow the original value.** (`trace`; C08, C10)

DEMO-0042.pdf, page 1, shows 1,25,000.00, normalised to ₹1,25,000. purchase-orders.xlsx, Orders!H43, shows 120000, normalised to ₹1,20,000. Both are invented source excerpts, version 1.

Review a Trace's original and normalised value, method, confidence where available, and correction history. A correction should retain its relationship to the original source; a failed parse has no fabricated Trace.

**Evaluate your actual file types.** (`formats`; C19, C20)

Use born-digital PDF, scanned PDF/image and XLSX/CSV examples to assess extraction and exact source navigation separately. File admission alone does not demonstrate extraction or usable preview.

Word, PowerPoint, email, ZIP and Indian-script scans need format-specific acceptance. No current supported-format or script guarantee is made here. Supply representative non-confidential samples during an agreed evaluation.

**Identify the evidence used.** (`versions`; C08, C11)

The product model retains file versions and checksums with the Run. Upload/import, extraction, review and export are separate stages; confirm each stage for the inputs your procedure needs.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product/reconciliation-and-checks

**Audience:** Audit preparers

**Visitor question:** How are sources compared and rules applied?

**Composition:** Comparison excerpt with named rule; avoid implying all matching variants are currently accepted.

**Metadata:** Reconciliation and Checks inside Tests — Explore source matching, amount tolerances and policy checks inside an Audit Test Recipe, followed by a separate Run.

**Canonical at launch:** `/product/reconciliation-and-checks` · **Claims:** C04, C17 · **Treatment:** Illustrative product model

**Proof assets:** p2p-review, credit-review

### Compare the right values against an explicit rule.

Extract, Reconcile and Checks are capabilities inside Tests. The Recipe defines the comparison; a Run records the execution.

**Choose the sources and matching rules.** (`matching`; C04, C10, C48)

An invoice-to-PO comparison uses a purchase-order reference and per-field source authority. The product model describes exact, normalised, fuzzy and semantic matching, with ambiguous cases escalated to people.

One-to-one, one-to-many and many-to-one matching need explicit grouping rules. A three-way procedure adds goods-receipt evidence; the illustrated subtotal check does not establish delivery or payment.

**₹5,000 beyond the approved PO.** (`amount`; C08, C17)

Expected ₹1,20,000; actual ₹1,25,000; absolute difference ₹5,000; tolerance ₹1. This is an Amount mismatch under Synthetic Procurement Policy v3 §4.2.

A separate supplied-ledger loan example compares ₹35,00,000 sanctioned with ₹36,00,000 disbursed. It is not a P2P screen or a regulatory assertion.

**A check can use one source.** (`checks`; C04, C05, C06)

A configured check can compare a population with a formula, threshold, date rule or reference list. Explain failed results with a typed reason: amount, date/cut-off, duplicate usage, party variance, tax-field mismatch, missing document or unsupported evidence.

Missing evidence is reported separately unless the configured procedure explicitly defines its absence as a failure.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product/review-and-findings

**Audience:** Reviewers and audit managers

**Visitor question:** What can I verify before confirming an issue?

**Composition:** Retain source-review interaction; finding diagram only as a definition until real capture exists.

**Metadata:** Review, exceptions and findings — Inspect expected and actual values, source Traces and six result states, then distinguish a record-level exception from a reviewed finding.

**Canonical at launch:** `/product/review-and-findings` · **Claims:** C08, C13 · **Treatment:** Illustrative product model

**Proof assets:** p2p-review

### Keep the evidence beside the decision.

The result, its rule and its source belong together. In the example, Fail describes the configured check; reviewer confirmation is still outstanding.

**Inspect the amount, source and rule.** (`evidence-trace`; C05, C08)

Review DEMO-0042 against the invoice page, Orders!H43 and Policy v3 §4.2. Resolve ambiguous extraction or missing evidence before concluding. Pass, Fail, Insufficient evidence, Needs human review, Not applicable and Processing error remain distinct.

**Record who decided and why.** (`decisions`; C10, C32)

The product model separates preparer and reviewer. Confirmations, corrections and overrides need attributable history; an override requires a reason. Selecting a website example cannot approve a result.

**Group confirmed exceptions with care.** (`findings`; C13, C07)

An exception concerns a record. A finding groups related confirmed exceptions into an issue with criteria, condition, cause, impact, severity, recommendation and sign-offs.

No finding has been raised from the unresolved illustrative Run. Management response, owner and target date are finding fields, not a full remediation or document-request system.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product/working-papers

**Audience:** Audit reviewers

**Visitor question:** What will a reviewer receive?

**Composition:** Readable contents specimen in text; no invented file or download button. Genuine export remains blocked.

**Metadata:** Working papers and review evidence — Explore what a working paper should retain: scope, procedure, coverage, results, source references, limitations and human sign-offs.

**Canonical at launch:** `/product/working-papers` · **Claims:** C21, C22 · **Treatment:** Illustrative product model

**Proof assets:** Text only; no unavailable media placeholder

### Keep the procedure with the evidence.

A working paper documents the work performed and the limits of its conclusion. The illustrative P2P Run remains Draft / review incomplete.

**A reviewable record of the work.** (`contents`; C21)

Include objective, risk, entity, period, population, coverage, exclusions and limitations; input roles and versions; procedure, extracted fields, matching logic, calculations and tolerances.

Retain company policy and regulatory citations, Recipe/Run versions, all six result states, typed exceptions, findings, comments, overrides and their reasons, evidence index, sign-offs and execution/approval dates.

**Sources must remain usable.** (`exception-handoff`; C08, C21)

An exception register needs the compared values, typed verdict, review decision and source references. A page or cell citation is distinct from a public download link. Access-controlled product links may require an authenticated session.

**Confirm the output you need.** (`formats`; C21, C27)

Discuss the Excel, Word, PDF or CSV output your reviewer needs, including source references and comments. PDF delivery and compatibility with your own template need confirmation in the evaluation.

No genuine sample is published here yet. Named GRC integrations require separate validation. Request a demonstration of the required format and its evidence links.

**Draft, approval and later versions.** (`approval`; C22, C10)

The product model requires human preparation and review before locking a paper. Later changes create a new version. An unresolved Run must not be described as a locked, approved paper.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product/knowledge-hub-and-copilot

**Audience:** Methodology owners and reviewers

**Visitor question:** How do source changes affect the procedure?

**Composition:** Stacked policy → Recipe → Run relationship and a clearly labelled illustrative cited answer.

**Metadata:** Knowledge Hub and Copilot — Understand versioned source categories, policy citations and Copilot drafts that require human review and an approved official Run.

**Canonical at launch:** `/product/knowledge-hub-and-copilot` · **Claims:** C15, C16 · **Treatment:** Illustrative product model

**Proof assets:** knowledge-versions, p2p-review

### Keep knowledge citable. Keep drafts reviewable.

The Knowledge Hub holds the sources behind a procedure. Copilot assists with drafts and explanations within the engagement and Knowledge Hub.

**Three useful source categories.** (`categories`; C15, C17)

Policies and regulations provide criteria. Reference and master data provide approved lists and authority matrices. Methodology provides checklists, audit programmes and working-paper conventions.

A source needs an owner, permissions, applicability, effective dates, version and approval state. No external registry category or live regulatory feed is implied.

**A new policy starts a review.** (`versions`; C11, C15)

In the example, Procurement Policy v3 §4.2 informs Recipe v3 and DEMO-RUN-018. A later policy version should identify affected Recipes for reapproval; it must not silently change the completed Run snapshot.

**Cite facts and label suggestions.** (`copilot`; C08, C16, C10)

An illustrative answer is: “The subtotal difference is ₹5,000, from DEMO-0042.pdf page 1 and purchase-orders.xlsx Orders!H43; the configured tolerance is ₹1 under Synthetic Procurement Policy v3 §4.2.”

Without supporting evidence, the answer is “Unable to verify”. Factual audit answers cite supplied engagement or Knowledge Hub sources. A written procedure can be discussed as a draft Recipe; a person must review it before approval and an official Run.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /product/test-library

**Audience:** Audit methodology owners

**Visitor question:** Can our team reuse a procedure each period?

**Composition:** Three substantive procedure summaries with illustrative status; no empty Pack catalogue.

**Metadata:** Test Library and reusable Recipes — Explore P2P, loan-file and control-review template examples with required inputs, criteria, outputs and explicit review boundaries.

**Canonical at launch:** `/product/test-library` · **Claims:** C23 · **Treatment:** Illustrative product model

**Proof assets:** p2p-recipe, credit-review, ifc-review

### Reuse the procedure. Review the scope.

A Test Pack is a reusable Recipe template. These three summaries illustrate procedures; they are not an availability catalogue.

**P2P amount comparison** (`p2p`; C17, C23)

Process: procurement; audience: internal audit. Inputs: invoice population, PDFs, approved PO export and procurement policy. Check: compare subtotal with approved PO amount within ₹1. Example template v3 uses Synthetic Procurement Policy v3 §4.2.

Output to evaluate: source-linked amount exceptions and draft working-paper contents. Review the population, effective dates and source hierarchy before reuse.

**Sanction versus disbursement** (`credit`; C17, C23)

Process: lending; audience: banks, NBFCs and lenders. Inputs: loan population, sanction letters, disbursement export and lending policy. Example template v1 checks that disbursement does not exceed sanction.

Supplied KYC evidence can support a separately configured completeness procedure. This is not an external identity or registry verification service.

**Independent control review** (`ifc`; C17, C23)

Process: journal-entry controls; audience: IFC/SOX teams. Inputs: control population, sign-offs, authority matrix and control procedure. Example template v1 compares performer and reviewer identity.

Output to evaluate: failed independence checks with sign-off references. Review the evidence and context before raising a finding; no certification or automatic compliance conclusion follows.

**Clone, customise and approve.** (`customise`; C03, C10, C23)

In the product model, a cloned template becomes an engagement-specific Recipe. Confirm its objective, inputs, matching logic, checks, severity, output and effective version; approval is a human step. No claim is made that all Packs described in the product plan are available today.

**Does this example confirm current availability?**

The example explains the product model with synthetic data. Confirm the procedure, formats and review behaviour you need in an evaluation; a labelled illustration does not replace product evidence. (C01, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /solutions/internal-audit

**Audience:** Heads of Internal Audit and enterprise audit teams

**Visitor question:** How would this apply to our audit work?

**Composition:** Audience → supplied inputs → distinct worked procedure → output and review boundary → related Product page.

**Metadata:** P2P fieldwork for internal-audit teams — Explore a synthetic internal-audit fieldwork procedure with supplied inputs, source references and human review.

**Canonical at launch:** `/solutions/internal-audit` · **Claims:** C17 · **Treatment:** Illustrative product model

**Proof assets:** p2p-review

### P2P fieldwork that a reviewer can follow.

Recreating procedures and tracing spreadsheet exceptions each quarter makes review harder. Start with one explicit Test Recipe and the evidence it requires.

**Start with supplied evidence.** (`inputs`; C17)

Invoice population, invoice PDFs, approved purchase orders, goods receipts, ERP payment export, vendor master, authority matrix and procurement policy.

**An explicit procedure and a concrete exception.** (`procedure`; C17, C14)

The illustrative amount check compares ₹1,25,000 with an approved ₹1,20,000 PO. Its ₹5,000 difference exceeds a ₹1 tolerance. Goods receipt and payment are separate procedures; this check alone does not establish them.

DEMO-RUN-018 has 180 of 190 eligible records completed, with 6 awaiting evidence and 4 processing errors. These are single-check marketing counts, not current product results.

**Carry the source into review.** (`output`; C08, C13, C21)

The expected output is a record-level exception with expected/actual values, rule/version citation and source Trace. All illustrated results await reviewer confirmation; working-paper status is Draft / review incomplete. Confirmed related exceptions can support a finding after human review.

**Keep the scope clear.** (`scope`; C06, C17)

Internal audit independently retests controls. Existing planning and reporting systems can remain in place; no certified integration is asserted.

Missing evidence is reported separately unless the configured completeness procedure explicitly defines its absence as a failure.

**Explore the procedure in detail.** (`related`; C42)

Continue with the audit test recipes explanation, then discuss your inputs and review requirements in a demo request.

**Is this a current product Run?**

No. It is a labelled synthetic illustration, informed by the product model. Current release capture and export acceptance remain outstanding. (C17, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /solutions/credit-loan-audit

**Audience:** Credit-audit teams in banks, NBFCs and lenders

**Visitor question:** How would this apply to our audit work?

**Composition:** Audience → supplied inputs → distinct worked procedure → output and review boundary → related Product page.

**Metadata:** Credit and loan-file audit — Explore a synthetic credit and loan-file audit procedure with supplied inputs, source references and human review.

**Canonical at launch:** `/solutions/credit-loan-audit` · **Claims:** C17 · **Treatment:** Illustrative product model

**Proof assets:** credit-review

### Follow the loan from sanction to disbursement.

Loan-file review needs to reconcile the terms approved with the amount and timing recorded. Use the evidence and lending criteria your team supplies.

**Start with supplied evidence.** (`inputs`; C17)

Loan population, applications, KYC documents, sanction letters, disbursement export, lending policy, authority matrix and reviewed regulatory material.

**An explicit procedure and a concrete exception.** (`procedure`; C17, C14)

In this invented display example, DEMO-LN-0011 is sanctioned for ₹35,00,000 and disbursed for ₹36,00,000. The ₹1,00,000 excess fails the zero-excess rule in Synthetic Lending Policy v1 §2.

DEMO-CREDIT-001 is a separate single-check illustration: 12 received, 1 excluded, 11 eligible; 9 completed, 1 awaiting evidence and 1 processing error.

**Carry the source into review.** (`output`; C08, C13, C21)

The expected output is a record-level exception with expected/actual values, rule/version citation and source Trace. All illustrated results await reviewer confirmation; working-paper status is Draft / review incomplete. Confirmed related exceptions can support a finding after human review.

**Keep the scope clear.** (`scope`; C06, C17)

KYC means checks against supplied evidence. No external registry/status lookup, live RBI feed or automatic lending-compliance conclusion is included.

Missing evidence is reported separately unless the configured completeness procedure explicitly defines its absence as a failure.

**Explore the procedure in detail.** (`related`; C42)

Continue with the reconciliation and checks explanation, then discuss your inputs and review requirements in a demo request.

**Is this a current product Run?**

No. It is a labelled synthetic illustration, informed by the product model. Current release capture and export acceptance remain outstanding. (C17, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /solutions/ifc-sox

**Audience:** Internal-control and IFC/SOX audit teams

**Visitor question:** How would this apply to our audit work?

**Composition:** Audience → supplied inputs → distinct worked procedure → output and review boundary → related Product page.

**Metadata:** IFC and SOX control testing — Explore a synthetic ifc and sox control testing procedure with supplied inputs, source references and human review.

**Canonical at launch:** `/solutions/ifc-sox` · **Claims:** C17 · **Treatment:** Illustrative product model

**Proof assets:** ifc-review

### Test the evidence of control operation.

A sign-off is not enough if the procedure requires independent review. Put the control criterion beside the recorded performer and reviewer.

**Start with supplied evidence.** (`inputs`; C17)

Journal/control population, signed control evidence, approval or authority matrix, period-end records and approved control procedure.

**An explicit procedure and a concrete exception.** (`procedure`; C17, C14)

DEMO-JEA-002 records DEMO-PERSON-01 as both performer and reviewer. That fails the distinct-person rule in Synthetic Control Procedure v1 §2. No monetary exposure is assigned to this identity check.

DEMO-IFC-001 is a separate single-check illustration: 8 received, 1 excluded, 7 eligible; 6 completed and 1 awaiting evidence, with no processing errors.

**Carry the source into review.** (`output`; C08, C13, C21)

The expected output is a record-level exception with expected/actual values, rule/version citation and source Trace. All illustrated results await reviewer confirmation; working-paper status is Draft / review incomplete. Confirmed related exceptions can support a finding after human review.

**Keep the scope clear.** (`scope`; C06, C17)

Finance performing a control is distinct from internal audit independently retesting it. Document checks do not replace observation, professional judgement or certify IFC/SOX compliance.

Missing evidence is reported separately unless the configured completeness procedure explicitly defines its absence as a failure.

**Explore the procedure in detail.** (`related`; C42)

Continue with the review and findings explanation, then discuss your inputs and review requirements in a demo request.

**Is this a current product Run?**

No. It is a labelled synthetic illustration, informed by the product model. Current release capture and export acceptance remain outstanding. (C17, C44)

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /security

**Audience:** Security, privacy and procurement reviewers

**Visitor question:** What should we verify before using real audit evidence?

**Composition:** Useful evaluation questions first, then verified website source facts; no trust badges.

**Metadata:** Security evaluation — Review questions about product access, approvals, source history and data handling, separately from this website's enquiry processing.

**Canonical at launch:** `/security` · **Claims:** C30, C33 · **Treatment:** Website source facts

**Proof assets:** Text only; no unavailable media placeholder

### Evaluate the controls alongside the workflow.

Start with the data your procedure uses and who needs access. Product deployment and contractual assurances need evidence for the environment being evaluated.

**Access, approval and history** (`access`; C30, C31, C32)

Ask for the role and engagement-access matrix, negative access tests, maker-checker behaviour, override history and completed-Run protections. The illustrative website workflow does not demonstrate deployed tenant isolation.

**Data location and processing** (`data`; C33, C34, C35)

Confirm hosting and backup regions, encryption, AI providers and data flows, model-training terms, subprocessors, retention/deletion and incident contact. India residency, no-training guarantees, SSO, certifications and deployment options are not established by this website.

**Website enquiries are separate.** (`website`; C39, C40, C43)

The website code saves demo and support enquiries to Google Sheets and attempts an optional internal notification through Resend. It processes an IP-derived key for rate limiting and includes a production analytics component; live delivery and hosting-log retention have not been verified.

Do not submit confidential audit evidence in either enquiry form. Product audit-evidence storage and the website's hosting configuration are separate matters.

**Next action:** Contact the team → `/support`

**Publication:** Candidate for page implementation. Describes inspected website code; live delivery and operational commitments are unverified.

## /company

**Audience:** Enterprise audit buyers

**Visitor question:** Why this product focus?

**Composition:** Editorial product purpose; omit unverified legal entity, biography, portrait and recognition sections.

**Metadata:** About DocRack — Learn why DocRack focuses on internal-audit fieldwork, explicit procedures, source-linked results and human review.

**Canonical at launch:** `/company` · **Claims:** C01 · **Treatment:** Illustrative product model

**Proof assets:** Text only; no unavailable media placeholder

### Built around the work between evidence and review.

DocRack's product direction centres on internal-audit fieldwork for Indian enterprises: making a procedure explicit and keeping the evidence close to a decision.

**The problem is concrete.** (`focus`; C01, C03)

A reviewer needs to understand what was tested, which source was authoritative and why an exception was raised. The Audit Test Recipe gives those questions a structured definition.

**A place for automation and judgement.** (`judgement`; C04, C10)

The model separates AI assistance, deterministic comparisons and human approval. It focuses on document/data procedures rather than the full GRC or audit-planning lifecycle.

**Start with a procedure.** (`conversation`; C28, C29, C46)

Use the demo request to describe your team's fieldwork interests. Company biographies, programme relationships and customer stories are omitted until their facts and publication rights are confirmed.

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /book-demo

**Audience:** Audit teams evaluating DocRack

**Visitor question:** How do we discuss our procedure?

**Composition:** Retain Phase 2 form composition and exact backend contract; no duration or response-time promise.

**Metadata:** Request a DocRack demo — Request a conversation about your audit procedures, supplied evidence, source-linked results and reviewer requirements.

**Canonical at launch:** `/book-demo` · **Claims:** C42 · **Treatment:** Website source facts

**Proof assets:** Text only; no unavailable media placeholder

### Bring a procedure. Start a conversation.

Tell us about your team so we can discuss the fieldwork you want to evaluate. This form requests a demo; it does not reserve a time.

**Discuss the work your team performs.** (`agenda`; C38, C19)

A useful conversation starts with your population and sources, the policy or procedure to test, and how reviewers assess exceptions and working papers. Specific formats and capabilities need confirmation for your evaluation.

**Request details** (`form`; C42, C43)

Full name, email, company and annual audit volume. Annual audit volume options remain 1-10, 10-50, 50-100 and 100+. Do not include confidential audit evidence.

**Request received.** (`received`; C36, C42, C43)

Our team will contact you to arrange a time. No calendar reservation or visitor confirmation email is implied. Enquiry storage precedes the optional internal notification.

**Next action:** Contact the team → `/support`

**Publication:** Candidate for page implementation. Describes inspected website code; live delivery and operational commitments are unverified.

## /support

**Audience:** Evaluators and users

**Visitor question:** Where can I ask a question?

**Composition:** Concise introduction, existing support form and distinct practical FAQs.

**Metadata:** Contact and support — Send a product, evaluation or support question to the DocRack team. Do not include confidential audit files or sensitive evidence.

**Canonical at launch:** `/support` · **Claims:** C37, C43 · **Treatment:** Website source facts

**Proof assets:** Text only; no unavailable media placeholder

### Tell us what you need help with.

Use this form for product questions, evaluation questions or support enquiries. Include enough context to explain the issue without confidential audit data.

**Your question** (`form`; C39, C43)

Full name, email and message. Avoid passwords, access tokens, bank details, borrower records and audit attachments. The form has no evidence-upload field.

**Message received.** (`received`; C37, C43)

Your message has been submitted to the team. No response time is promised. If saving fails, the form reports the error so you can try again; notification failure after saving does not make the submission fail.

**Scope and availability** (`questions`; C01, C17)

DocRack's product direction is internal-audit fieldwork. Ask about the particular inputs, configured procedure and review output you need. Supplied-source checks do not imply external registry verification.

**Can I send audit files here?**

No. Use the form for a description without confidential evidence; no secure product-upload workflow is established by this website form. (C39)

**Will I receive a confirmation email?**

The current website sends optional notifications to the internal team. A visitor confirmation email is not part of the form contract. (C43)

**Next action:** Contact the team → `/support`

**Publication:** Candidate for page implementation. Describes inspected website code; live delivery and operational commitments are unverified.

## /glossary

**Audience:** Auditors and evaluators

**Visitor question:** What do these terms mean?

**Composition:** Readable linked definitions; retain eleven historical anchors and derive future DefinedTermSet from these same strings.

**Metadata:** Audit fieldwork glossary — Definitions of Audit Test Recipe, Test, Run, Trace, coverage, exception, finding, Working Paper and all six result states.

**Canonical at launch:** `/glossary` · **Claims:** C03, C04, C05 · **Treatment:** Illustrative product model

**Proof assets:** Text only; no unavailable media placeholder

### A shared language for evidence and review.

These definitions explain DocRack's product model. They do not establish availability of every described capability.

**Audit Test Recipe** (`audit-test-recipe`; C03)

The structured, versioned definition of an audit procedure: objective, risk, population, sources, extraction, source hierarchy, calculations, policy, regulation, result logic, severity, approval, output and effective version.

**Test** (`test`; C04)

The definition of what is to be tested. Extract, Reconcile and Checks belong inside a Test.

**Run** (`run`; C04, C11)

One execution of a Test, recording input versions, Recipe version, engine/model context, execution log and result snapshot. A new Recipe does not rewrite completed Run history.

**Trace** (`trace`; C08)

A value's connection to a file and page/region or sheet/row/cell, with original and normalised values, method, confidence and correction history.

**Configured tests** (`configured-tests`; C14)

Procedures with explicit scope and criteria. Population coverage concerns eligible records for these tests, subject to evidence and successful processing; it is not complete audit assurance.

**Population** (`population`; C14)

The records in scope. Account separately for received, eligible, tested, excluded, processing failures and awaiting evidence. Multiple checks per record have a different denominator from record counts.

**Coverage** (`coverage`; C14)

How much of the defined population the configured procedure completed. State the denominator, exclusions, unavailable evidence and processing failures.

**Evidence** (`evidence`; C03)

Sources used to support a procedure. Roles are Population, Primary evidence, Source of truth, Supporting evidence, Reference data and Policy/regulation.

**Source-linked result** (`source-linked-result`; C08)

A check result retaining the Traces of compared evidence and the relevant rule and version citation.

**Exception** (`exception`; C13)

A record-level issue identified by a configured check. A failed result needs a typed reason and review; it is not automatically a confirmed finding.

**Review** (`review`; C10, C32)

A person's assessment of a result and its evidence, including confirmation, correction, uncertainty and reasoned overrides.

**Human approval** (`human-approval`; C10, C16)

A recorded human decision on a Recipe or conclusion. A Copilot draft or website interaction cannot silently provide approval.

**Finding** (`finding`; C13)

An audit issue grouping one or more related confirmed exceptions, with criteria, condition, cause, impact, recommendation and sign-offs.

**Working Paper** (`working-paper`; C21, C22)

The record of scope, procedure, coverage, sources, results, limitations, exceptions, findings and approvals. Draft work is distinct from a reviewed, locked version.

**Test Pack** (`test-pack`; C23)

A reusable Recipe template with inputs, checks, outputs, version and approval state; cloned scope still needs engagement-specific review.

**Knowledge Hub** (`knowledge-hub`; C15)

The workspace collection of versioned policies/regulations, reference/master data and methodology used as citable sources.

**Pass** (`pass`; C05)

The configured requirement was satisfied.

**Fail** (`fail`; C05)

Evidence establishes that the configured requirement was not satisfied; retain the typed reason.

**Insufficient evidence** (`insufficient-evidence`; C05, C06)

Required evidence is unavailable. Missing evidence is reported separately unless the configured procedure explicitly defines its absence as a failure.

**Needs human review** (`needs-human-review`; C05)

A reliable conclusion requires a person's judgement.

**Not applicable** (`not-applicable`; C05, C14)

The rule does not apply to this record. An excluded population record is not automatically a Not applicable check result.

**Processing error** (`processing-error`; C05)

A technical problem prevented execution; this is not a successfully completed check.

**Next action:** Book a demo → `/book-demo`

**Publication:** Candidate for page implementation. Examples explain the product model using synthetic data; they are not captures or proof of current availability. Confirm the required procedure, input formats and output scope during evaluation.

## /privacy

**Audience:** Website visitors

**Visitor question:** What happens to information submitted on this website?

**Composition:** Concrete website-only review draft; withhold activation until owner facts and legal review are complete.

**Metadata:** Website privacy notice — How the DocRack website handles demo and support enquiries, rate-limit data and configured service providers.

**Canonical at launch:** `/privacy` · **Claims:** C39, C43 · **Treatment:** Owner review required

**Proof assets:** Text only; no unavailable media placeholder

### Website privacy notice

This notice concerns the public DocRack website and its enquiry forms. Product audit evidence and any product agreement have a separate scope.

**Information processed** (`information`; C39, C40, C41)

A demo request contains your name, email, company and annual audit-volume selection. A support enquiry contains your name, email and message. The server adds a submission timestamp.

The website uses an IP-derived key to limit repeated requests and a hidden field to help detect automated submissions. Its production layout includes Vercel Analytics. Actual analytics delivery, provider processing and hosting-log retention need confirmation before this notice is published.

**How enquiries are used** (`purpose`; C42, C43)

Enquiry details are used to handle demo requests, product questions and support messages. Do not include confidential audit records, borrower information, passwords or tokens.

**Configured recipients and services** (`recipients`; C33, C43)

The website saves accepted enquiries in Google Sheets. When configured, Resend sends an internal team notification containing enquiry details. A notification failure after storage does not undo the saved enquiry. The form does not send a visitor confirmation email.

Website hosting processes requests separately from product audit-evidence storage. This notice does not establish product data residency or model-provider terms.

**Retention and requests** (`retention`; C29, C40, C41)

A rate-limit window is not a verified deletion schedule. The current in-memory limiter can retain expired keys until they are reused or the process restarts. Enquiry, provider and hosting retention periods require owner confirmation.

Use the support form for a website privacy question, without including sensitive supporting documents. The responsible legal entity, dedicated request contact, legal basis and request-handling procedure must be settled during final notice review.

**Next action:** Contact the team → `/support`

**Publication:** Hold for owner review. Legal identity, rights, retention and final owner review remain unresolved; see claims register.

## /terms

**Audience:** Website visitors

**Visitor question:** What does this website offer?

**Composition:** Website-only review draft with concrete example and enquiry terms; no invented legal identity or liability clauses.

**Metadata:** Website terms — Terms for using DocRack's public website, illustrative examples and enquiry forms, separate from any product agreement.

**Canonical at launch:** `/terms` · **Claims:** C42, C47 · **Treatment:** Owner review required

**Proof assets:** Text only; no unavailable media placeholder

### Website terms

These terms concern the public DocRack website. Product access, audit-evidence processing and commercial commitments require a separate agreement.

**Illustrative material** (`examples`; C17, C44)

New worked examples are labelled synthetic and use invented records and policy criteria. They are not customer results, current product captures, regulatory advice, certifications or audit conclusions. Evaluate actual capability and suitability for your procedure before relying on it.

**Enquiry forms** (`enquiries`; C36, C37, C42)

A demo submission is a request to discuss the product, not a calendar booking, purchase or guaranteed response time. Use the support form for questions without confidential audit evidence or access credentials.

**Use of the website** (`use`; C10, C14)

Use the website and forms for legitimate enquiries. Do not attempt to disrupt the service, gain unauthorised access or submit another person's confidential information.

Website materials explain the product direction. A configured procedure does not provide complete audit assurance or replace professional judgement.

**Rights and contact** (`rights`; C29, C47)

Brand marks and third-party materials remain subject to their applicable rights. No blanket ownership or permission assertion is made for inherited assets. Contact the team through Support about website material.

The responsible legal entity, terms owner, jurisdiction and any contractual limitation language require confirmation and legal review before publication.

**Next action:** Contact the team → `/support`

**Publication:** Hold for owner review. Legal identity, rights, retention and final owner review remain unresolved; see claims register.
