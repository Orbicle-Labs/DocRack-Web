# DocRack Marketing Website — Build Specification

**Version:** 1.0  
**Last updated:** 31 August 2026  
**Purpose:** Canonical implementation guide for building DocRack's public marketing website using Codex, Claude Code, or another coding agent inside VS Code.

---

## 1. How the Coding Agent Should Use This File

This document is the source of truth for the marketing website. Before changing code, the coding agent must:

1. Read this file completely.
2. Inspect the existing repository structure, `package.json`, routes, components, styles and assets.
3. Reuse the existing stack and design primitives where suitable.
4. Keep the marketing website separate from the authenticated DocRack product experience.
5. Implement one phase at a time and validate its acceptance criteria before moving forward.
6. Use real DocRack product screens or clearly labelled temporary placeholders.
7. Never invent customers, testimonials, certifications, savings, audit results or security claims.
8. Never copy competitor code, copywriting, illustrations or page layouts. Competitor websites are references for principles only.
9. Preserve unrelated code and existing user changes.
10. Ask for clarification only when a missing decision would materially change the implementation.

### Recommended agent workflow

For every phase:

1. Inspect the current implementation.
2. State the files that will be changed.
3. Implement the smallest complete slice.
4. Run lint, type checking, tests and a production build.
5. Check desktop and mobile layouts.
6. Report what was completed, what remains and any assumptions made.

---

## 2. Website Objective

The website must help an internal-audit buyer understand DocRack within one minute and take the next step toward a product demonstration.

The website must answer:

1. What is DocRack?
2. Who is it for?
3. Which audit work can it perform?
4. How does the workflow operate?
5. Why is an Audit Test Recipe stronger than a general AI prompt?
6. Can every result be traced and reviewed?
7. How does DocRack handle sensitive company information?
8. What should the visitor do next?

### Primary conversion

**Book a demo**

### Secondary conversion

**Watch the workflow** or **See how it works**

### Website success metrics

- Qualified demo requests
- Hero-to-demo click-through rate
- Product walkthrough engagement
- Solution-page-to-demo conversion
- Case-study engagement
- Organic traffic for relevant audit problems
- Mobile performance and accessibility

---

## 3. Product Positioning

### Canonical positioning

> DocRack is the fieldwork execution layer for internal audit. It turns documents, Excel, system data, company policies and regulations into repeatable audit tests, source-linked exceptions and review-ready working papers.

### Short description

> Configure the procedure once. Test the evidence. Review the exceptions. Defend every conclusion.

### Recommended homepage headline

> **Run audit fieldwork faster. Defend every conclusion.**

### Recommended homepage supporting copy

> DocRack turns documents, Excel, system data and company policies into repeatable audit tests, source-linked exceptions and review-ready working papers.

### Language rules

Use:

- Audit Test Recipe
- Evidence
- Population
- Configured tests
- Trace or source-linked result
- Exception
- Review
- Finding
- Working paper
- Human approval
- Insufficient evidence

Avoid:

- AI audits everything
- Replace auditors
- One-click complete audit
- 100% assurance
- Black-box autonomous audit
- Generic document chatbot
- Unlimited accuracy

When discussing population coverage, use:

> Complete-population coverage for configured tests, where suitable.

Do not say that testing a complete population creates complete audit assurance.

---

## 4. Who DocRack Serves

### Primary buyers

- Heads of Internal Audit
- Chief Audit Executives
- Internal Audit Managers
- Audit reviewers
- Corporate Audit and Assurance leaders

### Primary users

- Internal auditors performing fieldwork
- Audit reviewers and engagement managers
- Credit-audit teams
- IFC/SOX control-testing teams
- Operational and compliance auditors

### Secondary audiences

- Finance controllers and financial-control teams
- Accounts-payable assurance teams
- Risk and compliance teams performing independent testing
- Internal-audit and advisory firms

### Initial organisation profile

- Mid-sized and large Indian enterprises
- Banks and NBFCs
- Insurance companies
- Companies with document-heavy audit processes
- Teams using Excel-based working papers and manual evidence review

### Homepage audience rule

The homepage must primarily speak to internal-audit leaders and fieldwork teams. Secondary audiences should be addressed through separate solution pages rather than making the homepage generic.

---

## 5. Audit Types to Present

The website should show that DocRack can support multiple audit types without claiming to be an entire GRC platform.

### 5.1 Financial and IFC/SOX audit

Examples:

- Journal-entry testing
- Reconciliation testing
- Approval testing
- Three-way invoice matching
- Financial-reporting controls
- Board-deck versus source-data reconciliation

### 5.2 Operational audit

Examples:

- Procure-to-pay process testing
- Vendor onboarding
- Employee reimbursements
- Process adherence
- Duplicate transactions
- Approval-limit testing

### 5.3 Credit and loan audit

Examples:

- Borrower-document completeness
- Sanction-condition compliance
- Sanction versus disbursement checks
- Approval-authority checks
- Covenant and security checks
- Drawing-power calculations
- Post-disbursement compliance

### 5.4 Compliance audit

Examples:

- Company-policy compliance
- Regulatory requirements
- Mandatory-document availability
- Approval deviations
- Effective-date and policy-version checks

### Adjacent finance workflows

- Invoice field extraction
- Two-way and three-way matching
- Board-deck reconciliation
- Contract-data extraction
- Spreadsheet validation
- Financial-statement checks

These workflows become internal-audit work when an independent internal-audit team uses them to test whether controls and processes operated correctly.

---

## 6. Core Product Thesis

DocRack must revolve around a versioned **Audit Test Recipe**, not an invisible AI prompt.

Every Audit Test Recipe contains:

1. Audit objective
2. Risk being tested
3. Population and period
4. Required documents and datasets
5. Fields to extract
6. Source-of-truth hierarchy
7. Calculations and tolerances
8. Company-policy requirements
9. Regulatory requirements
10. Pass, fail and insufficient-evidence logic
11. Exception severity
12. Reviewer and approval requirements
13. Working-paper output format
14. Version and effective date

### Website explanation

> A prompt gives an answer. An Audit Test Recipe produces a repeatable, reviewable and defensible procedure.

### Execution principle

AI may extract, classify, map and explain information. Deterministic logic should perform calculations and explicit rule checks wherever possible. The auditor reviews and approves the conclusion.

---

## 7. Core Product Workflow

The website must repeatedly communicate this flow:

> **Documents → Audit Test Recipe → Run → Review → Findings → Working Paper**

### Documents

- Upload PDFs, scans, images, Excel files and system exports
- Organise evidence by engagement and purpose
- Classify each input as population, evidence, source of truth, supporting source, policy or reference data
- Extract fields and tables
- Preserve document, page, cell or location provenance
- Show field confidence and human edits

### Tests

- Configure Extract, Validate, Reconcile and Check procedures
- Define fields, sources, rules, calculations and tolerances
- Add policies and regulations from the Knowledge Hub
- Define outcomes and severity
- Version and approve the recipe

### Runs

- Execute an approved recipe against a defined population
- Freeze the recipe version and input versions used
- Track progress, failures and coverage
- Allow a reproducible re-performance

### Review

- Show exceptions and low-confidence results
- Display expected result, actual result and evidence
- Allow confirm, override, request evidence, mark not applicable or escalate
- Record reviewer identity, time and reason

### Findings

- Group confirmed exceptions into audit observations
- Add condition, criteria, cause, consequence and recommendation
- Record management responses and ownership
- Track whether the issue is new, recurring or previously observed

### Working Papers

- Generate Excel and PDF outputs
- Include scope, population, procedure, results and exceptions
- Preserve evidence links and reviewer sign-offs
- Record recipe version, input versions and execution time
- Export an exception register and GRC-compatible output where supported

### Knowledge Hub

- Store company policies and SOPs
- Store regulatory requirements
- Store reference data such as vendor masters and approval matrices
- Track source, version, effective date, applicability and superseded date
- Cite the exact rule used by a test

### Copilot

- Convert written procedures into draft Audit Test Recipes
- Suggest fields, sources and checks
- Explain a result with citations
- Draft findings and working-paper narratives
- Keep exploratory chat separate from official audit evidence
- Require conversion into an approved Test Recipe before a chat-run check becomes part of the audit record

---

## 8. Website Design Direction

### Brand feeling

> Audit-grade credibility + modern product clarity + restrained human warmth.

The website should feel precise, calm, dependable and modern. It must not resemble an old accounting-firm website, but it must also avoid a science-fiction or gaming appearance.

### Competitor inspiration

Use only publicly visible design principles:

- Trullion: premium composition, accounting specificity and audience segmentation  
  https://trullion.com/
- DataSnipper: product-led hero, workflow explanation and visible human review  
  https://www.datasnipper.com/
- Discord: confident hierarchy, warmth and visual storytelling  
  https://discord.com/
- Linear: spacing, typography, restrained motion and premium product presentation  
  https://linear.app/
- Vanta: trust, security proof and customer validation  
  https://www.vanta.com/
- Workiva: enterprise outcomes, traceability language and role-specific pages  
  https://www.workiva.com/
- Ramp: outcome-led copy and clear product-family organisation  
  https://ramp.com/platform
- Optro: practitioner-focused audit solution pages  
  https://optro.ai/product/operational-audit

### Recommended visual mixture

- 40% Trullion enterprise credibility
- 25% Linear layout and interface presentation
- 20% DataSnipper workflow explanation
- 10% Vanta trust structure
- 5% Discord personality

### Design tokens

Initial tokens may be adjusted to fit the existing DocRack logo and product UI.

```css
--color-ink: #10141c;
--color-navy: #142a5e;
--color-brand: #2855d9;
--color-brand-hover: #1f46bc;
--color-canvas: #f6f7f9;
--color-surface: #ffffff;
--color-border: #dfe3ea;
--color-muted: #657083;
--color-success: #16844a;
--color-warning: #c77b00;
--color-danger: #c73842;
--radius-card: 12px;
--radius-button: 9px;
--content-width: 1240px;
```

### Typography

- Primary family: Geist or Inter
- Body: 16–18px with comfortable line height
- Homepage H1: approximately 56–72px desktop and 40–48px mobile
- Section H2: approximately 40–52px desktop
- Avoid all-caps paragraphs
- Use a display serif only for occasional pull quotes, never throughout the product experience

### Layout

- Maximum content width: 1200–1280px
- Use a 12-column desktop grid
- Use generous vertical spacing
- Alternate white, soft grey and occasional dark sections
- Avoid placing every section inside a rounded card
- Present product screens at readable sizes
- Maintain one dominant visual idea per section

### Motion

Use motion only to explain:

1. Opening the source evidence for a result
2. Executing an Audit Test Recipe
3. Moving reviewed exceptions into a working paper

Avoid autoplay animations everywhere, heavy parallax and decorative motion that slows comprehension.

---

## 9. Website Information Architecture

### Primary navigation

```text
Product
Solutions
Test Packs
Security
Customers
Resources
Company
                              Sign in   Book a demo
```

### Product submenu

- Platform Overview
- Audit Test Recipes
- Documents and Extraction
- Reconciliation and Checks
- Review and Findings
- Working Papers
- Copilot

### Solutions submenu

- Internal Audit
- Credit and Loan Audit
- Financial and IFC/SOX Audit
- Operational Audit
- Compliance Audit
- Finance and Accounting Controls

### Initial routes

```text
/
/product
/product/audit-test-recipes
/product/documents
/product/reconciliation-and-checks
/product/review-and-findings
/product/working-papers
/product/copilot
/solutions/internal-audit
/solutions/credit-loan-audit
/solutions/ifc-sox
/solutions/operational-audit
/solutions/compliance-audit
/solutions/finance-controls
/test-packs
/security
/customers
/resources
/company
/book-demo
/privacy
/terms
```

Do not create empty routes merely to fill the navigation. Hide future pages until useful content exists.

---

## 10. Homepage Content Order

### Section 1 — Announcement bar, optional

Use only for a real product release, customer story, event or Test Pack launch. Do not show a permanent meaningless announcement.

### Section 2 — Navigation

Requirements:

- Sticky after scrolling
- Clear Book a Demo button
- Sign-in link
- Accessible keyboard navigation
- Mobile menu
- No oversized mega-menu at the initial launch

### Section 3 — Hero

Recommended content:

> **Run audit fieldwork faster. Defend every conclusion.**

> DocRack turns documents, Excel, system data and company policies into repeatable audit tests, source-linked exceptions and review-ready working papers.

Buttons:

- Book a demo
- Watch the workflow

Hero visual:

- Real DocRack engagement dashboard
- A short controlled animation can show: open review item → see failed rule → open source page/cell
- Do not use a generic AI orb, robot or stock auditor image

### Section 4 — Trust strip

Possible content, only when approved:

- Customer or design-partner logos
- NVIDIA Inception
- IIT Bombay × Groww INV.ENT recognition
- Inc42 or media recognition
- Security certifications once obtained

Do not display a company logo without permission. Use “Selected by” or “Backed by” accurately rather than implying that every organisation is a customer.

### Section 5 — The problem

Suggested heading:

> Audit evidence is everywhere. The audit trail should not be.

Explain:

- Documents, Excel, ERP exports and policies sit in separate places
- Auditors repeat extraction and matching work
- Sampling leaves configured tests unperformed on much of the population
- Reviewers struggle to trace conclusions quickly
- Working papers are assembled manually after testing

### Section 6 — Core workflow

Show six connected steps:

1. Documents
2. Audit Test Recipe
3. Run
4. Review
5. Findings
6. Working Paper

Each step should open a short explanation and corresponding product screen.

### Section 7 — Audit Test Recipe differentiator

Suggested heading:

> Configure the procedure, not just the prompt.

Display a visual recipe card containing objective, risk, population, sources, fields, rules, outcomes, reviewers and version.

Use this message:

> A prompt gives an answer. An Audit Test Recipe produces a repeatable, reviewable and defensible procedure.

### Section 8 — Product capabilities

Use four large blocks:

1. Collect and extract evidence
2. Reconcile and apply rules
3. Review exceptions and findings
4. Generate working papers

Knowledge Hub and Copilot should appear as supporting capabilities rather than the centre of the product.

### Section 9 — Use cases

Use tabs or cards for:

- Invoice audit
- Credit and loan audit
- Board-deck reconciliation
- Health-insurance claims audit

Every use case must show:

- Inputs
- Procedure
- Exception examples
- Output

### Section 10 — Traceability

Suggested heading:

> From conclusion to source in one click.

Show:

- Result
- Rule applied
- Expected value
- Actual value
- Source document and page or spreadsheet cell
- Reviewer decision

### Section 11 — Human review

Explain the five possible outcomes:

- Pass
- Fail
- Insufficient evidence
- Needs human review
- Not applicable

State that DocRack does not silently convert missing evidence into a failed control.

### Section 12 — Customer evidence

Preferred structure:

- Customer situation
- Existing manual workflow
- Procedure configured in DocRack
- Measured time or coverage improvement
- Customer quote
- Product screen

Use an anonymised customer description if public naming permission is unavailable.

### Section 13 — Security and deployment

Show only verified capabilities:

- Data location and residency
- Encryption in transit and at rest
- Tenant isolation
- Role-based access
- Audit logs
- Retention and deletion controls
- Model-training policy
- Subprocessors
- Deployment options

Do not claim SOC 2, ISO 27001, on-premise or customer VPC until actually available.

### Section 14 — Integrations

Initial inputs:

- PDF and scanned documents
- Excel
- CSV
- PowerPoint where supported
- ERP and system exports

Show named connectors only after they work reliably.

### Section 15 — Final CTA

Suggested heading:

> Bring one audit procedure. See it become a repeatable test.

Buttons:

- Book a demo
- Contact the team

---

## 11. Page Templates

### Product page template

1. Capability-specific outcome
2. Problem it removes
3. How it works
4. Product interface
5. Traceability and controls
6. Example procedure
7. Output
8. Related capabilities
9. CTA

### Solution page template

1. Audience and audit problem
2. Current manual workflow
3. Tests DocRack supports
4. Required documents and data
5. Example exceptions
6. Working-paper output
7. Customer evidence
8. Relevant Test Packs
9. CTA

### Test Pack page template

1. Test Pack name
2. Objective and risk
3. Required inputs
4. Included tests
5. Calculations and tolerances
6. Policy or regulatory references
7. Possible outcomes
8. Working-paper format
9. Version and effective date
10. Request the Test Pack CTA

### Case-study template

1. Customer profile
2. Before DocRack
3. Procedure automated
4. Implementation
5. Results
6. Quote
7. Product evidence
8. Next workflow
9. CTA

### Security page template

1. Security overview
2. Architecture and isolation
3. Encryption
4. Hosting and residency
5. AI and customer-data handling
6. Access and activity logs
7. Retention and deletion
8. Subprocessors
9. Certifications
10. Security contact

---

## 12. Example Product Stories

### Invoice audit

**Inputs:** Invoice PDFs, PO data, GRN data, vendor master and ERP payment export.  
**Procedure:** Extract invoice fields, match invoice to PO and GRN, recalculate totals and tax, check duplicates and approval limits.  
**Exceptions:** Quantity mismatch, price mismatch, duplicate invoice, missing GRN, unauthorised approval or unknown vendor.  
**Output:** Reviewed exception register and working paper with document and row-level traceability.

### Credit and loan audit

**Inputs:** Loan population, borrower files, sanction documents, lending policy, approval matrix and regulatory requirements.  
**Procedure:** Extract borrower and sanction information, reconcile information across sources and apply eligibility, approval and documentation rules.  
**Exceptions:** Missing document, sanction-condition breach, incorrect authority, disbursement above sanction, policy deviation or insufficient evidence.  
**Output:** Loan-level results, evidence-linked exceptions and credit-audit working paper.

### Board-deck reconciliation

**Inputs:** Board presentation and source-of-truth Excel workbook.  
**Procedure:** Extract labelled figures from slides, map them to spreadsheet values and apply exact or tolerance-based checks.  
**Exceptions:** Value mismatch, missing figure, outdated source version or unsupported number.  
**Output:** Slide-to-cell reconciliation with evidence links.

### Health-insurance claims audit

**Inputs:** Claim population, policy documents, bills, discharge summary, approval data and applicable rules.  
**Procedure:** Extract claim information, apply waiting periods, limits, document-completeness rules and approval checks.  
**Exceptions:** Waiting-period breach, limit breach, missing evidence, inconsistent details or approval deviation.  
**Output:** Claim-level results, exception register and review-ready working paper.

---

## 13. Technical Architecture

The coding agent must first reuse the repository's existing stack where possible. If the marketing site is greenfield, use:

- Current stable Next.js with App Router
- TypeScript with strict mode
- Tailwind CSS
- A small reusable component system
- Motion or Framer Motion for restrained animation
- MDX for initial resources and case studies
- Optimised `next/image` assets
- Server-side form handling or a secure CRM endpoint
- Privacy-conscious marketing analytics

### Recommended repository structure

If a monorepo already exists:

```text
apps/
  marketing/
  product/
packages/
  ui/
  config/
  types/
```

If the product is in a separate repository, keep this website standalone rather than forcing a monorepo migration.

### Suggested marketing-site structure

```text
src/
  app/
    page.tsx
    product/
    solutions/
    test-packs/
    security/
    customers/
    resources/
    company/
    book-demo/
  components/
    layout/
    navigation/
    sections/
    product-ui/
    forms/
    ui/
  content/
    case-studies/
    resources/
    test-packs/
  lib/
    analytics/
    forms/
    seo/
  styles/
  public/
    brand/
    product/
    illustrations/
```

### Engineering requirements

- Use semantic HTML
- Meet WCAG 2.1 AA contrast and keyboard requirements
- Use responsive images and modern formats
- Avoid layout shift
- Lazy-load below-the-fold media
- Respect reduced-motion preferences
- Add metadata and canonical URLs
- Add Open Graph images
- Add a sitemap and robots rules
- Add structured data where relevant
- Protect forms against spam and abuse
- Never expose private product APIs or customer data on the marketing site

---

## 14. Implementation Phases

### Phase 0 — Repository and content audit

**Duration:** 1–2 days

Tasks:

- Inspect the current repository and deployment model
- Identify reusable product UI components and screenshots
- Confirm logo, colours and fonts
- Inventory approved customer proof and recognitions
- Confirm primary buyer and primary demo workflow
- List all unverified claims that must not be published

Deliverable:

- Repository assessment
- Content inventory
- Final implementation plan

Acceptance criteria:

- No stack duplication without reason
- Primary audience and CTA are explicit
- Every planned proof statement has an owner and source

### Phase 1 — Foundations and design system

**Duration:** 3–5 days

Tasks:

- Configure layout, typography, colours and spacing
- Build Button, Container, Section, Card, Badge and Heading components
- Build desktop and mobile navigation
- Build footer
- Add basic SEO and analytics structure
- Create product-screen frame component

Deliverable:

- Reusable responsive website shell

Acceptance criteria:

- Navigation works with keyboard and mobile controls
- Core components have consistent visual tokens
- No page-specific hard-coded styling for reusable primitives

### Phase 2 — Homepage MVP

**Duration:** 5–7 days

Tasks:

- Hero
- Trust strip
- Problem section
- Workflow section
- Audit Test Recipe section
- Product-capability sections
- Use-case section
- Traceability section
- Security preview
- Final CTA
- Demo form or demo-page link

Deliverable:

- Complete responsive homepage

Acceptance criteria:

- A new visitor can explain DocRack after reading the hero and workflow
- Primary CTA is visible without scrolling on common desktop and mobile sizes
- Real product imagery remains readable
- Homepage does not imply full GRC functionality

### Phase 3 — Core commercial pages

**Duration:** 7–10 days

Build:

- Product overview
- Audit Test Recipes
- Documents and Extraction
- Reconciliation and Checks
- Review and Findings
- Working Papers
- Internal Audit solution
- Credit and Loan Audit solution
- IFC/SOX solution
- Security
- Company
- Book a Demo
- Privacy and terms

Acceptance criteria:

- Every page follows its defined template
- Every product capability includes a specific procedure example
- Every page has a clear next action
- No duplicate generic marketing copy across pages

### Phase 4 — Proof and education

**Duration:** 5–7 days

Tasks:

- Publish the first approved customer case study
- Add Test Pack pages
- Add a product walkthrough video
- Add FAQs
- Add an audit glossary if useful
- Add resources and article templates
- Add Excel and integration explanation

Acceptance criteria:

- Customer claims are approved and measurable
- Resources answer real buyer questions
- Test Packs show procedure details, not generic feature lists

### Phase 5 — Motion and interaction polish

**Duration:** 3–5 days

Tasks:

- Add evidence-trace interaction
- Add Audit Test Recipe execution demonstration
- Add exception-to-working-paper demonstration
- Improve hover, focus and transition states
- Respect reduced-motion settings

Acceptance criteria:

- Motion clarifies workflow
- Core content remains understandable without animation
- No interaction blocks scrolling or degrades mobile performance

### Phase 6 — Launch QA

**Duration:** 3–5 days

Tasks:

- Test all routes and forms
- Validate responsive layouts
- Run accessibility checks
- Run lint, type checks, tests and production build
- Review metadata, Open Graph, sitemap and robots
- Compress media
- Check privacy, cookie and analytics behaviour
- Check security headers
- Test Chromium, Firefox and Safari-compatible behaviour

Acceptance criteria:

- No broken navigation or forms
- No severe accessibility violations
- No horizontal overflow on supported mobile sizes
- Production build completes successfully
- Core pages meet agreed performance targets

### Phase 7 — Post-launch optimisation

**Cadence:** Monthly

Tasks:

- Review demo conversions by landing page
- Test one hero or CTA change at a time
- Add verified customer evidence
- Publish one useful audit or Test Pack resource
- Update pages using objections from sales calls
- Track which audit types generate qualified demand

---

## 15. Initial Launch Scope

### Must have

- Homepage
- Product overview
- Audit Test Recipe page
- Documents page
- Reconciliation and Checks page
- Review and Working Papers explanation
- Internal Audit solution page
- Credit and Loan Audit solution page
- Security page
- Company page
- Book a Demo flow
- Privacy and terms

### Should have

- Product walkthrough video
- One approved case study
- Two or three Test Pack pages
- IFC/SOX solution page
- Resource article template

### Later

- Pricing page
- Large content CMS
- Dozens of industry pages
- Public interactive audit sandbox
- Large integration marketplace
- Multi-language website
- Full trust centre

---

## 16. Explicit Non-Goals

The initial website must not:

- Position DocRack as a complete GRC platform
- Claim to replace AuditBoard, TeamMate, Workiva or Excel
- Claim that AI makes final audit judgments independently
- Present exploratory Copilot chat as official audit evidence
- Claim unsupported accuracy or assurance
- Publish fake customer logos or testimonials
- Copy competitor assets or wording
- Build decorative experiences that reduce clarity or performance
- Explain every possible future feature on the homepage

---

## 17. Final Launch Checklist

### Product clarity

- [ ] Homepage names internal-audit fieldwork clearly
- [ ] Audit Test Recipe is explained
- [ ] Documents are visibly part of the workflow
- [ ] Review and human approval are visible
- [ ] Every conclusion is shown as traceable
- [ ] Working-paper output is shown

### Credibility

- [ ] Every customer logo is approved
- [ ] Every metric is sourced
- [ ] Every security claim is verified
- [ ] AI limitations are communicated honestly
- [ ] Complete-population language is properly qualified

### Design

- [ ] Desktop and mobile layouts are complete
- [ ] Product screenshots are readable
- [ ] Status colours are used consistently
- [ ] Motion is restrained
- [ ] Visual hierarchy is clear

### Engineering

- [ ] Lint passes
- [ ] Type checking passes
- [ ] Tests pass
- [ ] Production build passes
- [ ] Forms work
- [ ] Accessibility checks pass
- [ ] Metadata and sitemap exist
- [ ] Performance is acceptable
- [ ] No private data or secrets are exposed

---

## 18. Definition of Done

The first release is complete when:

1. An internal-audit leader can understand DocRack's purpose in under one minute.
2. The site clearly explains Documents → Audit Test Recipe → Run → Review → Findings → Working Paper.
3. The distinction between AI assistance, deterministic checks and human judgment is visible.
4. At least two real audit examples are demonstrated.
5. A visitor can book a demo from every important commercial page.
6. All claims are defensible.
7. The site works well on desktop and mobile.
8. Accessibility, build and performance checks pass.

---

## 19. Canonical One-Paragraph Product Explanation

DocRack is an AI-assisted internal-audit fieldwork platform for Indian enterprises. Audit teams upload documents, spreadsheets and system exports, then configure versioned Audit Test Recipes that define the objective, risk, population, required evidence, extraction fields, source-of-truth hierarchy, calculations, tolerances, company policies, regulations, outcomes and reviewer requirements. DocRack extracts and reconciles information, applies configured checks, flags evidence-linked exceptions and sends uncertain results for human review. Approved results flow into findings and review-ready working papers, with every conclusion traceable to its source and the exact recipe version used.
