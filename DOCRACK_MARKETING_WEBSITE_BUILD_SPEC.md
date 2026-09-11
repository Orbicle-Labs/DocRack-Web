# DocRack Marketing Website — Rebuild Specification

**Version:** 2.0

**Prepared:** 11 September 2026

**Repository:** `DocRack-Web`

**Status:** Implementation plan; the website rebuild has not started.

**Purpose:** Replace the existing public website with a new visual identity, clearer product explanation, and a reliable demo-request journey.

This specification supersedes version 1.0 in full. The current website is a source for implementation facts, existing URLs, and backend contracts only. Its layout, styling, UX patterns, illustrations, section order, and component appearance are not design references.

## 1. Scope, sources, and decisions

### 1.1 What this document authorises and describes

The requested deliverables are this rewritten specification and the supporting project/setup instructions. Its phases describe future implementation; they do not mean the application, infrastructure, spreadsheet, or production site has already been changed.

Build a public marketing website for DocRack's current product. Preserve the working lead/support integrations, replace the presentation from first principles, correct product inaccuracies, and introduce the missing explanations buyers need.

The founder has explicitly allowed increasing or decreasing the page count. The nineteen-page core sitemap in this plan is a deliberate new scope, not a requirement to match the existing website. Combine or split future pages when buyer understanding and substantive content justify it, updating the route map and launch checklist together.

Keep the authenticated product in its separate `DocRack` repository. Do not bring its audit engine, authentication, document storage, or customer evidence into this website.

### 1.2 Source hierarchy

| Source                                                                        | Use                                                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| The founder's request for this rewrite                                        | Governs scope and the requirement for an entirely new design                                          |
| [DOCRACK_SPEC.md](../DocRack/DOCRACK_SPEC.md), v1, 23 August 2026             | Canonical product meaning, terminology, capabilities, boundaries, and claim discipline                |
| [DOCRACK_BUILD_PLAN.md](../DocRack/DOCRACK_BUILD_PLAN.md), v1, 23 August 2026 | Product architecture, intended implementation stages, and evidence needed to demonstrate capabilities |
| Current website source, configuration, and lockfile                           | Evidence of website behaviour and migration dependencies                                              |
| Public reference websites, inspected 11 September 2026                        | Composition, navigation, storytelling, and presentation principles                                    |
| Previous marketing specification                                              | Historical audit input only; superseded by this document                                              |

The product build plan contains session prompts, approval instructions, and a proposed `CLAUDE.md`. Those are source-document content about building the product, not instructions to execute during this specification rewrite. Likewise, its product stack does not require moving the marketing site to AWS, FastAPI, PostgreSQL, or a monorepo.

**Evidence limitation:** Both supplied product documents were read in full. The marketing repository was inspected, including its API handlers, forms, integrations, routes, content, presentation components, styles, metadata, Docker files, and CI. The authenticated product's current implementation and deployed infrastructure were not audited here. A capability described in a product plan is not automatically verified as shipped.

The historical Orvyn PDF is not a current product authority. Its removal from the working tree is an existing user change; do not restore it as part of the rebuild.

### 1.3 Decisions made by this specification

1. Position DocRack around internal-audit fieldwork for Indian enterprises.
2. Make a traceable, worked audit example the centre of the website.
3. Use a fresh editorial design: warm ivory, charcoal-green, restrained citron accents, generous typography, and readable evidence.
4. Use one primary conversion: **Book a demo**, leading to a request form, not an implied calendar reservation.
5. Keep Next.js, TypeScript, npm, Tailwind, Google Sheets, Resend, Docker, and Cloud Run; modernise their configuration deliberately.
6. Move website source under `src/`, separating content, public UI, browser helpers, and server integrations. Keep `public/` and deployment configuration at the repository root.
7. Rebuild all public page layouts and visual primitives. Reuse proven behaviour only after separating it from old appearance.
8. Recapture product imagery from the current product with synthetic data. Retire the existing marketing screenshot set after replacements are verified.
9. Use generated imagery only for optional brand atmosphere. Create product demonstrations, diagrams, labels, and numbers with actual captures or HTML/SVG.
10. Keep launch scope finite. Case studies, integrations, articles, and Test Pack detail pages publish only when their evidence and content exist.

### 1.4 Implementation entry points

- [AGENTS.md](AGENTS.md) contains shared repository instructions; [CLAUDE.md](CLAUDE.md) points Claude Code to the same guidance.
- [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md) records actual progress, validation evidence, and the next action.
- [docs/CODEX_START.md](docs/CODEX_START.md) contains first-session and continuation prompts.
- [README.md](README.md) describes the current code and local setup; [DEPLOYMENT.md](DEPLOYMENT.md) describes current deployment configuration and future release gates.

These supporting documents were refreshed during preparation. Phase 0's populated audit artifacts and exit gate still need to be completed. Update the supporting documents as implementation changes; this specification remains the detailed rebuild plan.

## 2. Product model the website must communicate

### 2.1 Positioning and audience

**Canonical positioning**

> DocRack is an AI-assisted internal-audit fieldwork platform that converts company policies, regulations and audit procedures into repeatable tests across documents and data, producing source-linked exceptions, findings and review-ready working papers.

Primary buyers: Heads of Internal Audit, Chief Audit Executives, audit managers, and corporate assurance leaders at Indian enterprises.

Primary users: internal auditors, preparers, reviewers, credit-audit teams in banks/NBFCs/lenders, and IFC/SOX control-testing teams.

Secondary audiences: finance and accounting-control teams, risk/compliance teams, and audit/advisory firms. Give them specific explanations below the primary positioning. Do not return to a CA-firm-first or statutory-compliance-platform homepage.

**Buyer journey**

| Visitor question                           | Where it is answered                          | Desired next action      |
| ------------------------------------------ | --------------------------------------------- | ------------------------ |
| What is this, and is it for my team?       | Hero and first worked example                 | Explore the workflow     |
| Can it apply our procedure and our policy? | Recipe explanation and product detail         | Inspect a sample test    |
| Can I verify the result?                   | Click-to-source demonstration                 | Open rule and evidence   |
| What stays under our control?              | Review, versioning, and security explanations | Read security detail     |
| What will my reviewer receive?             | Working-paper preview and sample              | Request a demo           |
| How do we evaluate it?                     | Demo page                                     | Submit a genuine enquiry |

### 2.2 The workflow and feature hierarchy

```text
Documents → Tests (Audit Test Recipe) → Runs → Review → Findings → Working Papers
                    ↑
       Test Library + Knowledge Hub

Copilot assists throughout; people approve recipes and conclusions.
```

This is an explanatory sequence, not a replacement for the product navigation:

- **Engagement:** Overview, Documents, Tests, Runs, Review, Findings, Working Papers.
- **Workspace:** Test Library, Knowledge Hub.
- **Copilot:** available throughout the application.

Extract, Reconcile, and Checks are capabilities **inside Tests**. A marketing page can explain one capability in depth, but it must show this parent relationship. Do not invent a separate “Validate” product module.

| Concept         | Required explanation and proof                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Overview        | Engagement, entity, period, stage, population accounting, open review work, findings, exposure, and working-paper status                      |
| Documents       | Upload evidence and datasets; assign their roles; retain versions, checksums, and source locations                                            |
| Tests / Recipes | Define and approve what to test, using the fourteen components below                                                                          |
| Runs            | Record one execution with its input versions, recipe version, engine/model versions, results, and execution log                               |
| Review          | Resolve uncertainty and exceptions with evidence beside the result; record decisions and override reasons                                     |
| Findings        | Group related confirmed exceptions into an audit issue with criteria, condition, cause, impact, recommendation, and sign-offs                 |
| Working Papers  | Export scope, procedure, coverage, results, exceptions, evidence references, and approvals; approved papers lock, later edits create versions |
| Test Library    | Approved, reusable Test Pack templates that can be cloned and customised                                                                      |
| Knowledge Hub   | Versioned policies/regulations, reference/master data, and methodology; exact citations and effective dates                                   |
| Copilot         | Draft, explain, locate evidence, query stored results, and compile procedures into draft Recipes, with citations and human approval           |

### 2.3 Audit Test Recipe: all fourteen components

The homepage groups these into a readable summary. The Recipe detail page explains all fourteen.

| #   | Component                   | What the visitor should understand                                          |
| --- | --------------------------- | --------------------------------------------------------------------------- |
| 1   | Audit objective             | What the procedure establishes                                              |
| 2   | Risk                        | What could go wrong                                                         |
| 3   | Population and period       | Which records, dates, entities, eligibility rules, and exclusions apply     |
| 4   | Required documents/datasets | Which inputs are needed and the role each plays                             |
| 5   | Extraction fields           | Which values are captured, with their source Traces                         |
| 6   | Source-of-truth hierarchy   | Which source wins for each field when sources disagree                      |
| 7   | Calculations and tolerances | Explicit arithmetic, matching thresholds, dates, and acceptable differences |
| 8   | Company-policy requirements | Cited clauses and policy versions                                           |
| 9   | Regulatory requirements     | Source, jurisdiction, applicability, effective date, version, and citation  |
| 10  | Result logic                | Six states, with typed reasons for failures                                 |
| 11  | Exception severity          | Critical, High, Medium, Low; context and potential exposure                 |
| 12  | Review and approval         | Preparer/reviewer roles, maker-checker, overrides, escalation, and sign-off |
| 13  | Output format               | Working paper, exception register, findings report, and evidence index      |
| 14  | Version and effective date  | Author, approver, change summary, sources, and the runs that used it        |

Required source roles: **Population; Primary evidence; Source of truth; Supporting evidence; Reference data; Policy/regulation.**

### 2.4 Six result states, typed failures, and coverage

| State                 | Meaning                                                     | Presentation                                                       |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| Pass                  | The configured requirement was satisfied                    | Label + check icon                                                 |
| Fail                  | Evidence establishes that the requirement was not satisfied | Label + failure reason; expected/actual values where applicable    |
| Insufficient evidence | Required evidence is unavailable                            | Label + missing source; never silently treated as pass/fail        |
| Needs human review    | A reliable conclusion requires a person                     | Label + reason for uncertainty                                     |
| Not applicable        | This rule does not apply to this record                     | Neutral label + applicability reason                               |
| Processing error      | A technical problem prevented execution                     | Distinct technical-error label; never counted as a successful test |

A completeness procedure can explicitly define a missing document as a failure. Therefore, do not publish the absolute claim “missing evidence is never a failure.” Use: **“Missing evidence is reported separately unless the configured procedure explicitly defines its absence as a failure.”**

Every failed check has a typed verdict: amount mismatch, date/cut-off mismatch, duplicate usage, party variance, tax-field mismatch, missing document, or unsupported evidence. Render plain-language labels, not backend enum names.

Population accounting must separately show **received, eligible, tested, excluded, processing failures, and awaiting evidence**. These are population counters, not the six result states. Specify denominators and aggregation rules whenever displaying counts; multiple checks per record make a check-result count different from a record count.

Use the canonical phrase **“100% population coverage for configured tests”** only with its scope qualification. It is a capability statement subject to evidence, eligibility, and successful processing, not a claim that every run reached 100%, or that an organisation received 100% audit assurance.

### 2.5 Traceability, determinism, and human control

A Trace connects a value to its source file, page/bounding box or sheet/row/cell, original and normalised values, extraction method, confidence, and correction history. Results inherit the Traces they compared; exported working papers retain source references.

Explain the division of work plainly:

- AI extracts, classifies, suggests mappings, interprets source text, explains, and drafts.
- Deterministic code performs arithmetic and configured comparisons. Matching progresses through exact, normalised, fuzzy, and semantic stages; AI is limited to ambiguous cases, with disagreement escalated.
- Auditors approve Recipes and final conclusions. An override requires a reason and an attributable activity record.
- A completed Run keeps an immutable snapshot. Changing a policy or Recipe creates a new version and requires review; it never rewrites completed work.
- Reperformance claims require the product's reproducibility test, pinned inputs/versions, and retained model outputs where relevant. Do not imply a fresh unpinned model call is guaranteed to be identical.
- “Run Integrity: Verified” means the recorded inputs and versions remain unchanged. It does not mean the audit passed.
- An exception is a record-level issue; a finding groups related issues. Example: 73 unauthorised invoices may support one purchase-approval finding.
- Copilot's factual answers cite engagement/Knowledge Hub evidence. It says “Unable to verify” when evidence is missing. Exploratory checks become official only through an approved Recipe and an official Run.
- Product guidance can explain how to use the software; factual audit answers must not draw on the open web.

### 2.6 Scope boundaries

DocRack supports document/data procedures in financial and IFC/SOX audit, operational audit, credit/loan audit, and compliance audit. Finance can use the same engine to perform a control; internal audit uses it to independently retest that control.

Do not position it as full GRC, annual planning, audit-universe management, risk assessment, budgeting, timesheets, Audit Committee reporting, ERP replacement, or full remediation management.

Explicitly excluded from the current product:

- External verification sources: MCA/GST/registry status lookups and their integrations.
- Document-request management: request lists, owners/deadlines for requests, reminders, overdue tracking, and external auditee upload portals.

“KYC” and regulatory testing mean checks against supplied documents, datasets, and approved sources. “Awaiting evidence” is a state, not a request-management workflow. Finding owners and target dates may appear as finding fields without implying a remediation system.

## 3. Current repository audit and migration implications

### 3.1 Verified local baseline

| Area               | Observed implementation                                                         | Rebuild consequence                                                                            |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Framework          | Lockfile: Next.js 15.5.18, React/React DOM 18.3.1, TypeScript 5.9.3             | Keep App Router; move to supported Next.js 16/React 19 versions during foundation work         |
| Styling            | Tailwind 3.4.19; custom tokens in `app/globals.css`; custom `components/ui`     | Retain Tailwind tooling initially; replace all visual tokens and UI presentation               |
| Motion             | Framer Motion; `ExplainerSequence`, `ExceptionHandoff`, `useStepSequence`       | Reuse suitable headless behaviour; replace scenes and choreography                             |
| Forms              | React Hook Form, Zod, shared submit/error helper, inline messages and Sonner    | Preserve contracts and error handling; redesign forms                                          |
| Demo API           | `POST /api/demo-booking` → Google Sheets → best-effort Resend email             | Keep endpoint and persistence semantics                                                        |
| Support API        | `POST /api/support-ticket` → Google Sheets → best-effort Resend email           | Keep endpoint and support journey                                                              |
| Storage            | One Google spreadsheet with `Demo Bookings` and `Support Tickets` tabs          | Preserve tab names, column order, and historical rows                                          |
| Credentials        | Lazy Google ADC; Cloud Run service identity; local key path; server-only env    | Retain keyless production credentials; never expose secrets to browsers                        |
| Deployment         | Standalone Next Docker image; GitHub Actions → GCP Cloud Run `asia-southeast1`  | Keep deployment platform; this is a configured region, not a verified live residency guarantee |
| Runtime            | `.nvmrc`, Docker, and CI use Node 20; local shell reports Node 24.14.0          | Standardise the rebuilt site on a supported Node 24 LTS patch                                  |
| Quality            | `npm run lint` and `npm run check-types` passed during this audit               | Existing baseline works; do not describe it as broken                                          |
| Lint migration     | `next lint` emitted its deprecation notice; ESLint 9 with legacy config         | Move to explicit ESLint CLI and flat config                                                    |
| Tests              | No test script or committed website test suite found                            | Add focused contract, navigation, content, accessibility, and browser checks                   |
| SEO                | Metadata helper, generated OG image, sitemap, robots, FAQ/glossary JSON-LD      | Preserve concepts, rebuild brand output and route inventory                                    |
| Analytics          | Production mounts `@vercel/analytics`; no analytics route/proxy seen            | Installed package is not evidence that events arrive from Cloud Run                            |
| Assets             | Eleven PNGs under `public/product`, brand PNGs, favicons, two recognition logos | Recapture product scenes; verify brand/recognition rights and provenance                       |
| Existing user work | Untracked `.claude/` present                                                    | Leave it and unrelated local files untouched                                                   |

A production build, live form submission, spreadsheet write, email delivery, and authenticated-product acceptance tests were not performed for this document-only rewrite.

### 3.2 Content and engineering issues to resolve

The findings below record the initial code/documentation audit. The README's inaccurate font, audience, and CSP descriptions were corrected during supporting-document preparation. Application changes and live-service verification remain outstanding; refresh this inventory in Phase 0.

| Finding                                              | Evidence in current files                                                                | Required resolution                                                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Five outcomes omit Processing error                  | `lib/content/homepage.ts`, `product.ts`, `motion.ts`, `components/ui/Badge.tsx`          | One six-state definition shared across pages, examples, and visuals                                       |
| Evidence-request actions conflict with product scope | `homepage.ts`, `product.ts`, `glossary.ts`                                               | Remove requests/reminders/portal language and related demo controls                                       |
| Missing-evidence language is absolute                | Homepage, support answers, solution copy                                                 | Explain the configured completeness-rule exception                                                        |
| Recognition phrased as “Backed by”                   | `lib/content/homepage.ts`                                                                | Use the exact verified programme relationship; programme membership does not imply investment             |
| Security statements inferred from architecture       | `app/security/page.tsx` and homepage security content                                    | Verify isolation/access/logging just as rigorously as hosting and encryption                              |
| Site and product residency can be confused           | Website CI uses Singapore; product plan targets AWS Mumbai and India AI endpoints        | Separate website enquiry data from product evidence; publish only verified scope                          |
| Privacy says “nothing else” is collected             | `app/privacy/page.tsx`, despite analytics and IP processing                              | Inventory actual data flows, hosting logs, processors, retention, and chosen analytics                    |
| IPs are not actively expired from the limiter map    | `lib/rate-limit.ts` overwrites an entry only on another request                          | Add bounded expiry/cleanup; correct retention wording                                                     |
| Production CSP permits inline scripts                | `next.config.ts`; README claims they are blocked                                         | Align documentation with effective headers; test the chosen policy with Next and analytics                |
| Rate limiting is per process                         | In-memory Map, unverified forwarded-IP trust                                             | State the limitation; configure proxy trust and a shared limiter or edge control before scaled production |
| Branding and stack descriptions drift                | README mentions Outfit and a CA/compliance audience; layout loads Inter + JetBrains Mono | Rewrite README and metadata around the new site                                                           |
| Sitemap changes every generation                     | `app/sitemap.ts` uses `new Date()` for every page                                        | Use actual content modification dates, or omit dates                                                      |
| Public app entry is unconfigured                     | Header deliberately omits Sign in                                                        | Enable only with a verified public product URL                                                            |
| Tool versions span majors                            | `@next/bundle-analyzer` 16 with Next 15                                                  | Align compatible versions and validate analysis command after migration                                   |

## 4. Reference study and original design direction

### 4.1 What to learn from the references

The recommendations below are design interpretations. They do not claim competitor layouts cause higher conversions.

| Reference                                 | Observed pattern                                                                                                                                                         | Application to DocRack                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| [OpenAI](https://openai.com/)             | Public page content separates product entry points, research, business stories, and company information                                                                  | Separate “understand the product” from “explore supporting material”; use concise navigation and a clear content hierarchy |
| [Trullion](https://trullion.com/)         | A clear category statement and demo CTA precede platform explanation, audience use cases, proof, and resources; rendered hero uses generous type and a dark field        | State the category immediately, then show a concrete procedure and audience paths; keep the conversion easy to find        |
| [White Desert](https://white-desert.com/) | Rendered hero uses full-bleed film, dramatic type scale, spare navigation, and a visible enquiry action; page content moves through experiences and practical next steps | Give one signature visual room to breathe, then move into clear, useful detail; make atmosphere serve the product          |
| [Linear](https://linear.app/)             | Rendered homepage pairs a direct headline with a large interface scene; the page explains work through product examples                                                  | Show one readable result/evidence interaction at a time and build depth through specific workflow scenes                   |
| [Retool](https://retool.com/)             | Public content connects capability examples, interface images, governance, and business use                                                                              | Answer technical evaluation questions near product proof; link security detail from relevant pages                         |

Research method: public page content was read for all five. Desktop hero captures were visually inspected for Trullion, White Desert, and Linear. OpenAI's local browser capture stopped at a verification screen, so its rendered typography/motion is not claimed as verified. No full interaction or mobile audit of these reference sites was completed. Recheck references during design production because they change.

Do not copy any site's words, assets, CSS, exact layout, navigation behaviour, or animation sequence. In particular, do not transplant a tourism film, an AI chat box, or a competitor's interface into DocRack.

### 4.2 Creative concept: “Evidence, in focus”

The visual story is a messy set of source material becoming a clear, inspectable audit result. The website should feel like a carefully designed publication about a capable enterprise product.

Create contrast through **scale, space, and evidence detail**:

- A light, spacious opening with a large left-aligned headline.
- A deliberately composed result-and-source scene, not a wall of miniature dashboards.
- A deep-green evidence chapter that gives the click-to-source moment visual weight.
- Warm, readable explanatory pages with substantial product crops.
- Small citron highlights that indicate selected evidence and primary emphasis.
- Clear transitions between explanation, proof, and action.

Avoid generic feature-card grids repeated down the page, decorative spreadsheets, glowing AI orbs, animated background particles, stock handshakes, and text hidden until a scroll animation completes. No permanent loader, custom cursor, scroll hijacking, or hover-only content.

### 4.3 New design tokens

These are starting values for the new identity, independent of the current website. Validate final pairings during the design phase.

```css
:root {
  --canvas: #f5f2eb;
  --surface: #ffffff;
  --surface-soft: #ebe8df;
  --ink: #182823;
  --text-muted: #56635b;
  --forest: #153c31;
  --forest-deep: #102c25;
  --citron: #d9ed91;
  --line: #d5d9cf;
  --control-border: #77857a;
  --focus: #225c48;
  --on-dark: #f5f7ee;
  --muted-on-dark: #bdcbbf;
  --success-text: #28603d;
  --danger-text: #a43832;
  --warning-text: #805515;
  --review-text: #55418c;
  --error-text: #713c57;
  --radius-control: 6px;
  --radius-panel: 10px;
  --content-max: 1360px;
  --reading-max: 68ch;
}
```

Primary button: forest background with white text on light surfaces; citron with dark ink in the dark chapter. Citron is not small body text on white. Decorative lines and interactive control boundaries use different tokens. State labels always include words/icons, so colour is never the only signal.

Typography:

- **Manrope variable** for headings, body, navigation, and forms, locally served.
- **Instrument Serif regular/italic** for one short editorial accent or pull quote, never required for understanding. Avoid a centred serif hero resembling the Trullion reference.
- Use Manrope's tabular numbers for the demo. Do not ship a third font solely for technical-looking labels.
- Desktop hero: 72–96px, fluid; tablet: 56–64px; mobile: 40–48px. At 320px, allow further reduction to 36px if required.
- H2: 42–56px desktop / 30–36px mobile. Body: 17–18px. Labels/captions: at least 13–14px.
- Use normal sentence case. Keep line lengths around 55–70 characters for prose.
- Verify the rupee symbol, Indian names, numbers, fallback metrics, and the fonts' redistribution licences.

Layout:

- Desktop: 12 columns, 24–32px gutters, 40–64px outer spacing; maximum content 1360px.
- Tablet: 8 columns, 28–32px outer spacing. Mobile: 4 columns, 20px outer spacing; 16px at 320px.
- Section padding: 112–144px desktop, 72–96px tablet, 56–72px mobile.
- Deliberately use three compositions: editorial split, full-width evidence scene, and compact procedure rows. Cards are reserved for genuinely separate selectable items.
- Reading pages and legal copy use a narrower measure. Do not stretch every page to the marketing grid.
- Images have intrinsic dimensions, documented aspect ratios, and intentional mobile crops.

### 4.4 Header, footer, and interaction language

Desktop header: logo left; **Product, Solutions, Security, Company**; optional verified **Sign in**; one **Book a demo** button. Product and Solutions use compact, accessible disclosure panels, not an exhaustive mega-menu.

Product panel: Overview, Audit Test Recipes, Documents, Reconciliation & Checks, Review & Findings, Working Papers, Knowledge Hub & Copilot. Test Library is explained within Product and linked from there.

Solutions panel: Internal Audit, Credit & Loan Audit, IFC/SOX Controls. Add other solutions only when their pages ship.

Mobile: logo, a compact visible demo CTA, menu button; a full-height menu with grouped links, visible close control, Escape handling, focus restoration, inert background, and usable scroll areas. Use at least 44px touch targets and safe-area padding. Menus must close or reset when crossing back to desktop.

Use a quiet sticky header with a stable background. Anchor sections account for its height. No mobile floating CTA obscuring form controls.

Footer: short positioning line; grouped product and solution links; Security, Company, Support, Glossary, Privacy, Terms. Add Resources/Test Packs only when populated. No empty social icons or nonfunctional email links.

Interaction timing: 140–200ms for controls, 240–360ms for panels, up to 600ms for a deliberate evidence reveal. Transform and opacity only where possible. Reduced motion shows the same information without travel/zoom; all essential content is visible without animation.

## 5. Homepage: a complete narrative and composition

**Target:** An internal-audit leader understands the category within 10 seconds and can describe the evidence-to-working-paper workflow within one minute. These are usability goals, not claims about measured current performance.

The homepage has eight substantive chapters. Navigation and footer are additional. Do not carry forward the old sequence of independent problem, workflow, recipe, capability, traceability, and review sections that repeat the same explanation.

### 5.1 Opening — the outcome and the evidence

**Eyebrow:** AI-assisted internal-audit fieldwork

**Headline:** From audit evidence to answers you can review.

**Supporting copy:** Turn documents, spreadsheets and company policies into repeatable audit tests. Review exceptions with their sources, then produce working papers your team can sign off.

**Primary CTA:** Book a demo → `/book-demo`

**Secondary CTA:** Explore the workflow → `#workflow`

Desktop composition: large, left-aligned type occupies approximately seven columns; a compact evidence/result composition occupies five. The visual is a readable excerpt, with a prominent amount difference and a visible source link. It is not a full application screenshot scaled down to fit.

Keep the headline, category, and primary action visible at 1280×720. At 390×844, the first screen contains the positioning and CTA; the visual follows naturally. Do not force every device into a viewport-height hero.

Hero artwork may add a subtle paper-and-light treatment behind the evidence, but the result itself is semantic HTML or a genuine product crop. The visitor should recognise “audit work” before noticing decorative artwork.

### 5.2 One worked procedure — the signature interaction

**Anchor:** `#workflow`

**Heading:** Follow one invoice from source to review.

Use an original six-step demonstration, with large media and a short explanation:

1. **Documents:** invoice PDF, purchase-order rows, goods-receipt rows, ERP payment export, and procurement policy; show source roles.
2. **Recipe:** an approved version with objective, matching keys, tolerance, rule citation, and reviewer requirement.
3. **Run:** input/recipe versions and honest population accounting.
4. **Review:** expected versus actual, typed exception, and a source link that opens the exact page/cell.
5. **Finding:** related confirmed exceptions grouped into an issue; show the link back to individual records.
6. **Working paper:** procedure, coverage, evidence index, comments, and approval status.

Desktop: six compact step controls above a broad stage; the review step expands into an evidence panel. Mobile: ordinary stacked summaries with an optional step viewer; the result appears first, then the evidence. A phone must not require pinching a desktop table.

The **click-to-source moment** is the main visual signature. On selection, highlight the result, open its source page or cell, and show the applicable rule/version. The visitor controls progression; never automatically approve an exception, fabricate a live Run, or require waiting for simulated processing.

A persistent nearby label reads **“Interactive example · synthetic data.”** If the UI is representative rather than a capture, say so once in its caption. No account, upload, product API call, or real AI execution is involved.

### 5.3 The procedure behind the result

**Heading:** Your audit procedure, made repeatable.

Explain the Audit Test Recipe with three meaningful groups:

- **Scope:** objective, risk, population, period, and evidence.
- **Logic:** fields, source hierarchy, matching, calculations, policies, and six-state outcomes.
- **Control:** severity, reviewer requirements, output format, and version.

Show one short, readable Recipe excerpt and a policy-version relationship. Pair a written procedure with its structured interpretation, explicitly labelled as a draft until approved. Link to `/product/audit-test-recipes`.

Do not show fourteen equally weighted cards on the homepage. Do not make a generic “prompt versus platform” comparison the central argument.

### 5.4 Coverage and judgment

**Heading:** Know what was tested. See what needs attention.

Use a coverage strip with explicit denominators, followed by a compact six-state legend. Show that a processing error and missing evidence remain visible.

A short explanation separates AI assistance, deterministic checks, and reviewer approval. Place the maker-checker and override-with-reason demonstration here, beside the decision it governs.

Link to Review & Findings. Avoid unsupported time-saving, accuracy, or exposure counters.

### 5.5 The work your team performs

**Heading:** Built around the procedures your team repeats.

Use three substantial, selectable procedure rows:

1. Procure-to-pay: Invoice ↔ PO ↔ GRN ↔ ERP; approvals, duplicates, matching, and recalculation.
2. Credit and loan files: sanction ↔ disbursement ↔ supplied borrower evidence; lending-policy and authority checks.
3. Financial and IFC/SOX controls: journal entries, approvals, and board-deck/MIS reconciliation.

Each row includes inputs, one configured check, one possible exception, and the output. Keep these details visible in HTML; a selected row may change its accompanying image.

Mention operational and compliance breadth in a short supporting sentence. Insurance claims and finance controls belong in deeper content after their actual readiness is established.

### 5.6 What the reviewer receives

**Heading:** The working paper carries the evidence with it.

Show a large crop of a synthetic working paper, with selectable annotations for scope, population, procedure, exception register, source references, and sign-offs. Link to Working Papers.

An ungated synthetic PDF sample is preferred when a current, accurate artifact is available. Include file type/size and an accessible HTML summary. Add an Excel sample only after validating its source references and ensuring it contains no external connections, macros, or private data.

Do not use a pretend Download button. Until a sample is ready, use “Explore working papers” linking to the page.

### 5.7 Governance and supporting proof

**Heading:** Built for evidence your team is accountable for.

Show only verified controls, in three concise groups: access and approval; version history and activity records; data handling and deployment. Link to a specific security page with clear current information.

Programme recognition, a customer quote, or a case study can appear here only after evidence and publication rights are recorded. The section must remain complete without social proof. No placeholder logo wall.

Knowledge Hub and Copilot receive a short supporting link: “Keep policies current. Keep answers tied to sources.” Their deeper explanation belongs on the product pages.

### 5.8 Final action

**Heading:** See your audit workflow in DocRack.

**Body:** Walk through a procedure, inspect an exception, and see the working paper it produces.

**CTA:** Book a demo → `/book-demo`

**Quiet secondary link:** Ask a question → `/support`

Use a calm editorial close. Do not demand confidential documents through a marketing form, promise a custom live implementation, or guarantee an output/session duration that the team has not committed to.

## 6. Route architecture and page briefs

### 6.1 Launch routes and migration map

All proposed launch pages require useful, reviewed content and supporting visuals. Keep existing URLs serving until their replacement is ready; switch links and redirects together.

| Existing route                 | Canonical launch route               | Action / page purpose                                              |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------ |
| `/`                            | `/`                                  | Replace homepage completely                                        |
| `/product`                     | `/product`                           | Explain the full fieldwork system and feature hierarchy            |
| `/product/audit-test-recipes`  | Same                                 | Explain all fourteen Recipe components                             |
| `/documents`                   | `/product/documents`                 | Rebuild, then permanent redirect                                   |
| `/reconciliation-and-checks`   | `/product/reconciliation-and-checks` | Rebuild, then permanent redirect; visibly belongs inside Tests     |
| `/review-and-findings`         | `/product/review-and-findings`       | Rebuild, then permanent redirect                                   |
| `/working-papers`              | `/product/working-papers`            | Rebuild, then permanent redirect                                   |
| None                           | `/product/knowledge-hub-and-copilot` | Explain source governance, draft compilation, and cited assistance |
| None                           | `/product/test-library`              | Explain reusable Packs and clone/customise/version behaviour       |
| `/solutions/internal-audit`    | Same                                 | Primary enterprise buyer                                           |
| `/solutions/credit-loan-audit` | Same                                 | Banks, NBFCs, lenders                                              |
| None                           | `/solutions/ifc-sox`                 | Financial/internal-control testing                                 |
| `/security`                    | Same                                 | Product evaluation and website/product data distinction            |
| `/company`                     | Same                                 | Founder/company story and verified identity                        |
| `/book-demo`                   | Same                                 | Demo request conversion                                            |
| `/support`                     | Same                                 | Questions and support enquiries                                    |
| `/glossary`                    | Same                                 | Correct canonical terms; preserve anchors where possible           |
| `/privacy`                     | Same                                 | Website privacy notice matched to actual processing                |
| `/terms`                       | Same                                 | Website terms, separate from the product contract                  |

Preserve current redirects: `/intake → /book-demo`, `/workflow → /product`, `/about → /company`.

Use exact-path permanent redirects (308 in Next.js), preserving query strings. Never redirect `/api/*`, and do not redirect removed feature URLs generically to the homepage. Audit old fragment links, because the browser fragment is not sent to the server; retain useful heading IDs at destination pages.

The sitemap includes only canonical, published, indexable pages. Header visibility and indexability are different concerns; use a route registry rather than deriving the entire sitemap only from navigation links.

### 6.2 Product page briefs

| Page                    | Required content                                                                                                                                                                                                     | Primary visual / next step                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Product overview        | Evidence → Recipe → Run → Review → Finding → Working Paper; engagement/workspace distinction; AI/code/human responsibilities; Overview and Run integrity; supported inputs and outputs                               | One cohesive workflow diagram, then links to capability pages                   |
| Audit Test Recipes      | All fourteen components; versioning; per-field authority; six states; policy effective dates; approval; draft compilation; a concrete Recipe excerpt                                                                 | Written procedure beside structured Recipe; demo CTA                            |
| Documents               | Six source roles; upload/import; extraction confidence and corrections; PDF/page and sheet/cell provenance; version/checksum; supported-format table with readiness                                                  | Genuine source preview with one trace highlight                                 |
| Reconciliation & Checks | Extract/Reconcile/Checks inside Tests; matching cascade; one-to-one/one-to-many/many-to-one; tolerances; three-way matching; single-source checks; typed verdicts; separate Runs                                     | Invoice/PO/GRN result with rule and compared values                             |
| Review & Findings       | Six states; expected/actual/rule/source; maker-checker; mandatory override reason; corrections; exception-to-finding relationship; management response fields without full remediation claims                        | Side-by-side review and a finding linked to constituent exceptions              |
| Working Papers          | Full contents in product spec §8.7; template compatibility; Excel/PDF; evidence index; retained comments; lock/version behaviour; output limitations                                                                 | Legible sample and source-reference annotation                                  |
| Knowledge Hub & Copilot | Three populated categories; item approval, effective dates, permission scope; policy update → affected Recipes → reapproval; cited answers; “Unable to verify”; exploratory → draft Recipe → approval → official Run | Policy-version relationship and one cited answer; not a chat-first landing page |
| Test Library            | Approved templates, process/industry tags, required inputs, checks, outputs, version and approval; clone/customise; availability                                                                                     | Three worked Pack summaries with honest status; link to demo                    |

All product pages use the same visual language, but their evidence determines the layout. Do not force every page into the old `PageHero + LedgerRows + CTA` structure.

### 6.3 Solution briefs

Use a common content contract: audience, recurring problem, supplied inputs, configured procedure, example exceptions, expected output, review boundary, readiness, related Product page, demo CTA.

- **Internal Audit:** P2P as the main story; show reusing a procedure each period and reviewing exceptions with citations. Explain that planning/reporting systems can remain in place. Do not claim certified integrations with them.
- **Credit & Loan Audit:** loan population, application/KYC documents, sanction letter, disbursement export, lending policy, authority matrix, approved regulatory material. Demonstrate amount/term mismatches and missing evidence; no external KYC verification service or live RBI-rule feed.
- **IFC/SOX:** journal-entry approval, threshold/authority checks, period cut-off, and reconciliation evidence. Explain testing control operation; do not promise certification, automatic compliance, or controls that require physical observation.
- **Later operational/compliance pages:** publish only with distinct, demonstrated procedures rather than near-duplicate keyword pages.
- **Later finance-controls page:** explicitly distinguish performing a business control from internal audit independently retesting it.
- **Insurance claims:** a product example, not an implied launch-ready Pack; validate its content and readiness first.

### 6.4 Security, company, support, and legal pages

**Security:** Give useful answers near the top, then detail access/roles, approvals, immutable records, encryption, regions, AI processing, training policy, retention/deletion, subprocessors, deployment options, and incident contact. Each published assertion has evidence and a last-reviewed date.

Do not blanket-hide material facts “on request” once verified. Conversely, a planned India architecture is not a current guarantee. SaaS, VPC, on-premise, SSO, certifications, and tenant isolation must be individually validated. Website data flows are documented separately.

**Company:** Explain the fieldwork problem and why DocRack is being built. Confirm the legal entity name currently stated as Orbicle Labs Pvt. Ltd., founder names, biographies, photos, and programme relationships before publication. Use real portraiture if supplied; omit a team section until facts exist.

**Support:** Keep the existing support form and endpoint. Present product questions, evaluation questions, and support requests clearly without adding routing fields unless the backend changes with them. Explain that the form is not a channel for confidential audit files. Do not invent a response SLA.

**Glossary:** Correct and define Recipe, Test, Run, Trace, population, coverage, exception, finding, Working Paper, Test Pack, Knowledge Hub, and all six states. Preserve useful existing anchors or provide a documented mapping. The visible definitions and structured data must agree.

**Privacy and terms:** Preserve their website-only scope. Rewrite based on the chosen hosting, form, analytics, anti-spam, and notification flows. Include business identity/contact, purposes, recipients, retention, and request handling verified with the owner. Have final legal wording reviewed before publication; do not copy current absolute collection/consent claims.

**Error pages:** Rebuild 404, route errors, and global errors in the new identity, with a useful home/support route. No raw stack traces or internal configuration details.

### 6.5 Conditional expansion

After the core launch:

- `/test-packs` and `/test-packs/[slug]`: public catalogue of concrete Packs with sample inputs, checks, outputs, version, and status.
- `/resources` and `/resources/[slug]`: useful authored articles, transcripts, and sample guides.
- `/customers/[slug]`: approved case studies with baseline, method, measured results, permissions, and customer attribution.
- Additional solutions: operational audit, compliance audit, finance controls.
- Pricing, multilingual pages, a CMS, calendar scheduling, or a full trust centre only when the business need and source material exist.

Initial Pack priorities follow the product plan: P2P; board-deck/MIS validation; credit/loan files; IFC/control basics; expense/journal-entry starter checks. The site must not imply they all ship today. Do not show an empty fourth Knowledge Hub category.

## 7. Content evidence and demonstration data

### 7.1 Claim register and publication rules

Create `docs/content/claims-register.md`. Each row records: claim ID, exact public wording, page/asset, source, capability status, proof artifact, owner, last verification date, and publication decision.

Use these internal states:

| State              | Meaning                                           | Public treatment                                    |
| ------------------ | ------------------------------------------------- | --------------------------------------------------- |
| Verified available | Demonstrated in the current release with evidence | Present-tense capability copy                       |
| Pilot              | Works in a defined evaluation scope               | Clearly label pilot scope where material            |
| Planned            | In the product documents, not verified shipped    | Roadmap context only; not a main conversion promise |
| Unverified         | Insufficient implementation or business evidence  | Omit the claim or use a neutral factual explanation |

These states are internal editorial controls, not a developer checklist displayed to site visitors.

Require evidence for security assertions, supported file types/scripts, output formats, model behaviour, reproducibility, programme logos, integrations, customer counts, metrics, deployment options, and response commitments.

The product build plan's ≥95% extraction target, planted-error recall, 10k-record/<1-hour target, and pilot exit gates are engineering goals. Never turn them into marketing benchmarks without a dated evaluation and methodology.

### 7.2 Canonical worked example

Use one synthetic P2P fixture across homepage, product pages, captions, motion, and sample output. Store it in `src/content/demos/p2p.ts`. It contains display data and source references, not a second implementation of the audit engine.

Proposed central exception:

| Field             | Synthetic example                                |
| ----------------- | ------------------------------------------------ |
| Engagement        | P2P — Q1 FY27                                    |
| Record            | Invoice DEMO-0042                                |
| Rule              | Compare invoice subtotal with approved PO amount |
| Recipe            | P2P amount check, version 3                      |
| Expected amount   | ₹1,20,000                                        |
| Actual amount     | ₹1,25,000                                        |
| Difference        | ₹5,000                                           |
| Allowed tolerance | ₹1                                               |
| Outcome           | Fail                                             |
| Typed verdict     | Amount mismatch                                  |
| Claim source      | DEMO-0042.pdf, page 1, highlighted subtotal      |
| Evidence source   | purchase-orders.xlsx, Orders!H43                 |
| Criteria          | Synthetic Procurement Policy v3, §4.2            |
| Review            | Awaiting reviewer confirmation                   |

This is invented demonstration data, not customer evidence or a statement of regulatory requirements.

If showing aggregate population counts, one consistent proposed **single-check** fixture is:

- Received 200; excluded 10; eligible 190.
- Execution completed for 180; awaiting evidence 6; processing failures 4.
- Completed outcomes: 157 Pass + 17 Fail + 6 Needs human review = 180.
- Across the 190 eligible records: those outcomes + 6 Insufficient evidence + 4 Processing error; Not applicable = 0 for this particular check.
- Display “180 of 190 eligible records completed” rather than a 100% badge. “Completed” does not mean the 6 human-review decisions are resolved.

These counts define an illustrative fixture. If the captured product uses different actual synthetic results, replace the example data everywhere with the export from that run. Do not alter product screenshots to force these counts.

A working paper from this unresolved run is marked **Draft / review incomplete**, with limitations. To show a locked, approved working paper, use a separate completed synthetic run and label its identity explicitly.

Use separate, clearly labelled fixtures for loan and board-deck examples. Do not present a P2P screenshot as a loan-audit screen.

### 7.3 Copy system

Store page copy, metadata, FAQs, readiness, and proof references as typed content. Reuse canonical terms and example data; avoid duplicating long passages between pages.

Use British/Indian English consistently: organisation, normalised, authorisation, ₹ and Indian digit grouping, explicit financial periods. Explain specialist terms on first use where needed.

No generic “revolutionary”, “autonomous audit”, “guaranteed accuracy”, “100% assurance”, automatic compliance, or unsupported customer outcomes. No legal clause presented as real regulation unless its source/applicability has been reviewed.

## 8. Assets, imagery, and motion production

### 8.1 Asset decision

Replace the current marketing product images with a new capture set. Existing names are inventoried for migration, not accepted as current evidence:

`engagement-dashboard.png`, `document-intake.png`, `recipe.png`, `recipe-builder.png`, `run-progress.png`, `review-queue.png`, `trace-link.png`, `finding.png`, `working-paper.png`, `knowledge-hub.png`, `copilot.png`.

Keep source assets in version history until replacement coverage is complete. Use existing brand marks as identity inputs only; they do not dictate the new palette or layout. Obtain an authoritative SVG wordmark/icon or recreate the same mark as a reviewed vector if no source exists. Do not invent a new logo through image generation.

Create `docs/design/assets.md` with source, product commit/run, capture date, synthetic-data confirmation, dimensions, crop, alt text, status, rights, page usage, and output size. Store only public-ready exports under `public/`; raw screenshots or private design material do not belong there.

### 8.2 Required production list

| Asset                            | Production method                                                           | Master / responsive treatment                            | Used in                          |
| -------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------- |
| Hero evidence composition        | HTML/SVG using the canonical fixture; optional atmospheric raster behind it | 16:10 desktop scene; stacked result/source mobile layout | Homepage                         |
| Document source + exact location | Current product capture with synthetic invoice and sheet                    | 2400×1500 master; dedicated close crop at 1200px width   | Documents, workflow              |
| Recipe + rule/version            | Current product capture and external HTML annotations                       | 2400×1500; mobile detail crop                            | Recipe page                      |
| Run + population counters        | Current product capture; counters transcribed from stored run               | Wide crop and accessible text summary                    | Workflow, product                |
| Review side-by-side              | Current product capture, or labelled representative interaction             | 2560×1600; separate claim/evidence mobile crops          | Homepage signature scene, Review |
| Finding with related exceptions  | Current product capture                                                     | 2000×1400; readable single-column crop                   | Review & Findings                |
| Working paper                    | Actual synthetic PDF/Excel output; capture and downloads                    | 1600px-wide preview; downloadable original               | Working Papers, homepage         |
| Knowledge/version relationship   | Capture plus code-native relationship diagram                               | 2000×1400; stacked relationships                         | Knowledge Hub & Copilot          |
| Copilot cited answer             | Current product capture or labelled illustrative example                    | Tight crop with citation legible at display size         | Knowledge Hub & Copilot          |
| Loan and IFC examples            | Dedicated synthetic fixtures and supported current screens                  | 2000px-wide masters                                      | Solution pages                   |
| Social sharing image             | Code-rendered typography, brand, and optional artwork                       | 1200×630                                                 | OG/Twitter                       |
| Brand marks and favicons         | Authoritative vector → deterministic exports                                | SVG plus required favicon sizes                          | Site shell and metadata          |
| Optional brand still             | AI-generated original raster, no product UI or text                         | 2560×1600 desktop, 1200×1500 portrait composition        | Hero atmosphere or company       |
| Optional walkthrough film        | Record the actual synthetic workflow; captions/transcript                   | 1920×1080, 60–90 seconds, poster frame                   | Product/resources                |

Asset dimensions are production targets, not permission to stretch captures. Use `object-contain` for evidence where clipping loses meaning; art-directed cropping is allowed only when the cited content remains visible. Preserve readable numbers and rule text.

### 8.3 Optional image-generation brief

During the asset phase, generate a maximum of two original atmospheric stills if they improve the chosen design.

**Starting prompt:**

> Architectural still life of layered archival paper and translucent glass on warm ivory stone, one precise sliver of pale citron light connecting the layers, deep forest-green shadow, calm editorial photography, restrained materials, subtle natural grain, directional daylight, ample negative space on the left for independently rendered headline text, premium enterprise publication, no words, numbers, logos, screens, people, robots, or floating interface cards.

Generate a separate portrait composition for mobile if the desktop crop fails. Store the prompt and generation provenance in the asset manifest; review for artifacts, brand fit, dimensions, focal point, and contrast. Export AVIF/WebP and keep master files outside public delivery.

Generated art is decorative. It never proves a feature, customer, location, certification, or team identity. Product UI and financial values must not be baked into generated images. If generation is unavailable or unconvincing, use code-native paper/light shapes; it is not a launch dependency.

### 8.4 Motion and media rules

- One signature interactive walkthrough; supporting pages use static captures with small local interactions.
- Evidence highlights and panel changes respond to the visitor's action.
- No autoplay video above the fold. Load a poster first and fetch film on explicit play.
- Optional short muted loops below the fold require pause controls, offscreen suspension, and reduced-motion/static alternatives.
- Lazy-load heavy walkthrough code/media near its section; the initial HTML contains the explanation and first usable state.
- Preserve focus when evidence opens/closes; announce meaningful state changes without reading every animation frame.
- Show the same facts at every breakpoint. Mobile can change composition, not remove essential evidence.
- A missing image, blocked video, disabled animation, or JavaScript delay must leave a useful page.

## 9. Technical architecture and target structure

### 9.1 Chosen stack

| Layer                | Decision                                                                                        | Reason / migration                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Runtime              | Node 24 LTS, current supported patch pinned consistently                                        | Replace Node 20 in engines, `.nvmrc`, both Dockerfiles, and CI                      |
| Framework            | Next.js 16 App Router, stable patched release; matching React/React DOM 19 and type packages    | Keep the existing framework; perform its upgrade before visual reconstruction       |
| Language             | TypeScript strict mode                                                                          | Preserve type checking and explicit content/form contracts                          |
| Package manager      | npm and one committed `package-lock.json`                                                       | No pnpm/workspace migration for this standalone site                                |
| Rendering            | Server Components and prerendered editorial content; small client islands                       | Limit browser JS to navigation, forms, and the walkthrough                          |
| Styles               | Tailwind CSS 3.4 initially, fresh CSS custom properties, CSS Modules for complex scenes         | A new design does not require a Tailwind 4 migration; avoid coupling two migrations |
| Components           | Small custom system; native semantic controls; optional targeted accessible primitive           | No wholesale import of the product's shadcn/table/dashboard UI                      |
| Forms                | React Hook Form + Zod, shared client/server schema, current JSON route handlers                 | Preserve established integrations and improve consistency                           |
| Motion               | Keep Framer Motion with a verified React 19-compatible release; one lazy-loaded runtime         | CSS for simple transitions; no simultaneous GSAP/Three.js/second motion framework   |
| Icons                | Lucide, selectively imported                                                                    | Consistent controls; no decorative icon grid                                        |
| Assets               | `next/image`, locally served licensed fonts, code-native SVG diagrams                           | Responsive media and predictable delivery                                           |
| Content              | Typed TypeScript modules for launch                                                             | No CMS needed for the current page count; add trusted local MDX when resources ship |
| Lead storage         | Existing Google Sheets via server-side Google ADC                                               | Preserve business workflow and historical rows                                      |
| Notifications        | Existing Resend REST integration                                                                | Keep best-effort notification after durable storage                                 |
| Shared abuse control | GCP Firestore counters accessed server-side through ADC                                         | Atomic rate limits across Cloud Run instances; not a migration of lead records      |
| Analytics            | Small provider adapter; Plausible as the proposed marketing provider, disabled until configured | Replace the unverified Vercel-specific installation; no session replay or ad pixels |
| Testing              | Vitest + React Testing Library where useful; Playwright + axe; production build                 | Focus on contracts, interactions, correctness, and rendered pages                   |
| Hosting              | Existing Docker standalone deployment to Cloud Run                                              | No host/domain migration required by the redesign                                   |
| CI                   | GitHub Actions, existing keyless deployment identity                                            | Add tests and pre-release checks; retain main-only production deployment            |

As checked for this plan, Next.js lists 16.x as Active LTS and 15.x as Maintenance LTS; Node lists 24 as LTS and 20 as EOL. Recheck patch versions and security advisories when implementing. [Next.js support policy](https://nextjs.org/support-policy), [Node.js releases](https://nodejs.org/en/about/previous-releases).

Next.js 16 removes `next lint`, and builds no longer run it implicitly. Use the ESLint CLI explicitly, check async request APIs in new routes, and validate bundler/analyser compatibility. [Next.js 16 migration guide](https://nextjs.org/docs/app/guides/upgrading/version-16).

Default to Next.js 16's supported build path. If the bundle analyser requires webpack, expose a separate analysis command using the compatible build mode; do not discover this mismatch at deployment.

### 9.2 Why restructure

**Yes, redefine internal source boundaries; no, do not introduce a monorepo.**

The current root `app/`, `components/`, and `lib/` are workable, but the rebuild is a good point to separate editable content, public presentation, and credential-bearing integrations. Move source once in the foundation phase, while keeping public URLs and API contracts stable. Do not combine that mechanical move with copy/design changes in the same review unit.

### 9.3 Target tree

```text
DocRack-Web/
  AGENTS.md
  CLAUDE.md
  DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md
  README.md
  DEPLOYMENT.md
  package.json
  package-lock.json
  next.config.ts
  tsconfig.json
  tailwind.config.js
  postcss.config.js
  eslint.config.mjs
  vitest.config.ts
  playwright.config.ts
  Dockerfile
  Dockerfile.dev
  docker-compose.yml
  .env.example
  .github/workflows/deploy.yml
  docs/
    CURRENT_PHASE.md
    CODEX_START.md
    decisions/
    design/
      direction.md
      assets.md
      references/
    content/
      claims-register.md
      route-migration.md
    qa/
      baseline.md
      launch-checklist.md
      release-report.md
  src/
    app/
      layout.tsx
      globals.css
      not-found.tsx
      error.tsx
      global-error.tsx
      icon.png
      apple-icon.png
      favicon.ico
      opengraph-image.tsx
      sitemap.ts
      robots.ts
      (marketing)/
        layout.tsx
        page.tsx
        product/
          page.tsx
          audit-test-recipes/page.tsx
          documents/page.tsx
          reconciliation-and-checks/page.tsx
          review-and-findings/page.tsx
          working-papers/page.tsx
          knowledge-hub-and-copilot/page.tsx
          test-library/page.tsx
        solutions/
          internal-audit/page.tsx
          credit-loan-audit/page.tsx
          ifc-sox/page.tsx
        security/page.tsx
        company/page.tsx
        book-demo/page.tsx
        support/page.tsx
        glossary/page.tsx
        privacy/page.tsx
        terms/page.tsx
      api/
        demo-booking/route.ts
        support-ticket/route.ts
    components/
      ui/
      layout/
      navigation/
      sections/
        home/
        product/
        solutions/
      product-demo/
      forms/
      seo/
    content/
      site.ts
      navigation.ts
      routes.ts
      outcomes.ts
      pages/
      demos/
        p2p.ts
        credit.ts
        ifc.ts
      test-packs/
      assets.ts
    lib/
      utils.ts
      hooks/use-step-sequence.ts
      forms/
        schemas.ts
        submit.ts
      seo/
        metadata.ts
        structured-data.ts
      analytics/
        events.ts
        client.ts
      server/
        env.ts
        sheets.ts
        notify.ts
        rate-limit.ts
        request-guards.ts
    styles/
      tokens.css
      typography.css
  public/
    brand/
    product/
      p2p/
      credit/
      ifc/
      knowledge/
    artwork/
    video/
    downloads/
    fonts/
  tests/
    unit/
    integration/
    e2e/
    fixtures/
  scripts/
    setup-sheet.mjs
    check-content.mjs
    check-assets.mjs
```

Do not create empty expansion route directories. When resources launch, add their route/content directories and MDX tooling then.

Migration rules:

- Move all root `app/` contents into `src/app/` and finish the move before removing the old directory. Do not leave both App Router roots active.
- Root layout owns document markup, fonts, metadata defaults, and global providers. The marketing layout owns header, one `main`, footer, and skip-link target.
- Global error/404 states must remain usable even when the marketing layout cannot render.
- Map `@/*` to `./src/*`; update every import and Tailwind scan path.
- Keep `public/` at root. Root URLs for assets do not acquire a `/src` prefix.
- Mark credential-bearing modules with `server-only`. Browser content/schemas cannot import them.
- Use explicit pages for the finite launch set. Do not create a generic page-builder or catch-all route merely to reduce file count.
- Keep story data separate from rendering. Demo components never calculate official audit figures.
- Fonts and sample outputs must build without production credentials or authenticated product access.

### 9.4 Dependency changes

Retain and validate compatible versions of React Hook Form, resolvers, Zod, Lucide, clsx, tailwind-merge, Google auth, and the motion library.

Add the website test tools, `server-only`, and the Firestore server SDK. Add an accessible dialog/disclosure primitive only if native implementation cannot meet the interaction requirements cleanly.

Replace `@vercel/analytics` after its adapter replacement is ready. Remove Sonner if the redesigned forms use inline live feedback exclusively; it is not needed solely to repeat an inline message. Update `@next/bundle-analyzer` and `eslint-config-next` to compatible framework versions.

Do not add FastAPI, PostgreSQL, Celery, product auth, vector search, an LLM SDK, a public file uploader, a complex animation engine, or a CMS to support a marketing demonstration.

Check licence compatibility and runtime advisories before pinning. Preserve a reproducible lockfile; no unreviewed “upgrade everything” step.

## 10. Preserve and strengthen the marketing backend

### 10.1 Current contracts to keep

| Endpoint                   | Request fields                                                         | Persistence                                                          | Success                      |
| -------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------- |
| `POST /api/demo-booking`   | `fullName`, `email`, `companyName`, `auditCount`, optional empty `_hp` | `Demo Bookings`: Timestamp, Full Name, Email, Company, Annual Audits | 201 with `{ success: true }` |
| `POST /api/support-ticket` | `fullName`, `email`, `message`, optional empty `_hp`                   | `Support Tickets`: Timestamp, Full Name, Email, Message              | 201 with `{ success: true }` |

Demo `auditCount` wire values remain `1-10`, `10-50`, `50-100`, `100+`. Use nonoverlapping human labels: up to 10; 11–50; 51–100; more than 100.

Preserve current validation limits: names 2–100 characters with supported letter/punctuation rules; email ≤254; organisation 2–200; support message 10–5000. Normalise leading/trailing whitespace before validating consistently on client/server, and lowercase the email. Maintain usable Unicode names.

Preserve malformed JSON → 400, schema failure → 422 with field errors, rate limit → 429 with `Retry-After`, storage failure → safe 500 response, GET → 405, and nonempty honeypot → generic 200 without persistence or email. Unsupported methods must remain rejected.

Additional request guards can return 413 for oversized payloads, 415 for unsupported content type, and 403 for a rejected origin. Add these deliberately to the shared client's safe handling.

No schema change is required for the first release. Extra qualification fields, CRM metadata, campaign columns, or scheduling require a later additive migration across schema, UI, Sheets, email, privacy, and tests.

### 10.2 Demo and support UX

Demo form: Full name, Work email, Organisation, Audits per year. Keep it single-step with clear labels, autofill, inline validation, a visible pending state, and preserved values after failures.

At desktop, explanatory copy and agenda sit beside the form. On mobile, use short heading → form → agenda, with the first field reached quickly. Do not place a long pitch before the form.

Primary form button: **Request a demo**. Success: **“Request received. Our team will contact you to arrange a time.”** Do not say a time slot is booked or a confirmation email was sent; the existing integration emails the team, not the visitor.

No phone requirement, hidden multi-step funnel, account creation, newsletter opt-in by default, or attachments. Do not shame personal email addresses. Add a plain privacy link and a short, accurate explanation of use.

Support retains Name, Email, Message. Its success state confirms receipt; response-time promises appear only when the owner supplies a real commitment.

Submission errors appear inline in an accessible live region; focus goes to the first invalid field. A rate limit shows when to retry. Network/storage failures preserve the draft. No success feedback before persistence is confirmed.

### 10.3 Server execution and reliability

```text
Browser form
  → same-origin JSON Route Handler
  → request guards + honeypot + shared validation + rate limit
  → Google Sheets append (system of record)
  → awaited, bounded Resend notification (best effort)
  → response to browser
```

Required implementation:

1. Keep the handlers on the Node runtime, not Edge.
2. Add a bounded body size, such as 16 KiB, enforced while reading the body rather than trusting only Content-Length.
3. Accept JSON only. Validate supplied Origin against configured site/staging origins. A missing Origin is not authentication; define support for legitimate nonbrowser requests explicitly and still apply abuse controls.
4. Derive IP only from the verified hosting proxy chain. Never trust an arbitrary first `x-forwarded-for` value without validating how the deployed ingress sets it.
5. Keep limits at three demo requests per 20 minutes and five support requests per 30 minutes. Use distinct endpoint namespaces.
6. Use Firestore transactions for shared counters, with an HMAC-derived client key, window/reset timestamp, count, and expiry; store no form payload or raw IP in the counter documents.
7. Check expiry in application logic. Firestore TTL handles eventual cleanup; it is not a precise deletion timer. Document actual retention and failure behaviour. [Firestore transactions](https://docs.cloud.google.com/firestore/native/docs/manage-data/transactions), [TTL policies](https://docs.cloud.google.com/firestore/native/docs/ttl).
8. If the shared limiter is unavailable, use a bounded in-process fallback with expiry cleanup and emit an operational alert. Record that global enforcement is degraded; do not silently treat it as fully protected.
9. Continue Sheets `valueInputOption=RAW` and fixed tab/column contracts. Treat spreadsheet export as a separate formula-injection boundary; escape untrusted formula-leading cells if exporting CSV/Excel later.
10. Apply bounded provider timeouts. Never automatically retry an ambiguous Sheets append, because the row might already exist.
11. A failed notification does not undo a saved lead or make the visitor resubmit. Await the bounded send before response, retaining the current Cloud Run-safe behaviour; do not use fire-and-forget work.
12. Log event type, status, latency, and a generated correlation ID. Redact form values, auth headers, provider response bodies, and credential details.
13. Keep env validation lazy enough that `next build` works without production secrets. A submission with missing required configuration fails safely and produces an actionable server log.
14. Duplicate clicks are prevented in the UI. Durable exactly-once submission is not provided by Sheets append; do not claim it. Add idempotency/outbox architecture only if observed reliability needs justify it.

Test with mocked integrations, a local emulator where appropriate, and a dedicated staging spreadsheet/notification destination. Automated tests must not append to the live leads sheet or contact prospects.

### 10.4 Configuration and operational records

Preserve:

- `GOOGLE_SHEET_ID`
- `GOOGLE_APPLICATION_CREDENTIALS` for local development only
- `RESEND_API_KEY`
- `NOTIFY_EMAIL`
- `EMAIL_FROM`

Add clearly documented configuration for site/staging origins, optional product sign-in URL, analytics enablement/site configuration, Firestore project/database selection, and a server-only rate-limit HMAC secret.

Do not use a public env prefix for server credentials. Prefer server-rendered public configuration over recompiling browser bundles for secret changes. Preserve Secret Manager bindings and least-privilege service identity during deployment.

The existing `scripts/setup-sheet.mjs` writes header rows and may rename a tab. Retain it for explicit initial setup, not CI, health checks, redesign verification, or routine deployment. Do not rerun it against historical lead storage.

Document response ownership, team-notification monitoring, enquiry retention/deletion, support escalation, and a fallback contact method that has been verified.

## 11. File-level keep, rewrite, add, and remove plan

Paths in the first column refer to the audited checkout; target paths refer to the proposed structure.

| Existing file/group                                                        | Decision                                                                            | Target / condition                                                                                |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `app/api/demo-booking/route.ts`, `support-ticket/route.ts`                 | Keep endpoints; move and refactor shared guards                                     | `src/app/api/...`; preserve contracts in §10                                                      |
| `lib/sheets.ts`                                                            | Keep behaviour; move and harden timeout/logging boundary                            | `src/lib/server/sheets.ts`                                                                        |
| `lib/notify.ts`                                                            | Keep escaping and best-effort semantics; redesign internal email template if useful | `src/lib/server/notify.ts`                                                                        |
| `lib/rate-limit.ts`                                                        | Replace Map as primary production limiter                                           | `src/lib/server/rate-limit.ts`; bounded Map only as explicit fallback                             |
| `lib/forms.ts`                                                             | Keep shared error translation; improve typed outcome handling                       | `src/lib/forms/submit.ts`                                                                         |
| `components/forms/*`                                                       | Rewrite presentation; retain field/endpoint semantics                               | `src/components/forms/*`; shared schemas instead of copies                                        |
| `lib/use-step-sequence.ts`                                                 | Retain suitable headless indexing/keyboard behaviour after tests                    | `src/lib/hooks/use-step-sequence.ts`; no old visual shell                                         |
| `lib/utils.ts`                                                             | Keep class merging, update custom font-size groups                                  | `src/lib/utils.ts`; test colour/size class preservation                                           |
| `lib/seo.ts`                                                               | Keep canonical metadata helper concept                                              | `src/lib/seo/metadata.ts`; new content and routes                                                 |
| `lib/schema.ts`, `components/seo/JsonLd.tsx`                               | Keep structured-data builders and safe serialisation                                | New SEO directories; add malicious closing-script fixture                                         |
| `lib/nav.ts`                                                               | Replace navigation structure and sitemap coupling                                   | `src/content/navigation.ts` + `routes.ts`                                                         |
| `lib/content/*`                                                            | Rewrite all public copy; retain only independently verified product facts           | `src/content/pages/*`, shared demos, outcomes, assets                                             |
| `app/page.tsx` and all public page bodies                                  | Full rebuild                                                                        | `src/app/(marketing)/...`                                                                         |
| `components/layout/*`                                                      | Full visual/UX rebuild                                                              | Layout/navigation components; independently reimplement accessible focus behaviour                |
| `components/ui/*`                                                          | Replace appearance and token assumptions                                            | New primitives; reuse semantic prop contracts only where helpful                                  |
| `components/ui/Badge.tsx`                                                  | Replace five-state model and visuals                                                | Shared six-state content + `OutcomeLabel`                                                         |
| `components/ui/ProductFrame.tsx`                                           | Replace the frame design                                                            | New `ProductFigure`; preserve explicit dimensions and honest captions, avoid blanket object-cover |
| `components/sections/*`                                                    | Replace section architecture                                                        | New home/product/solution sections tied to the new narrative                                      |
| `components/motion/ExplainerSequence.tsx`, `ExceptionHandoff.tsx`          | Retire old scenes                                                                   | `src/components/product-demo/*`; original workflow interaction                                    |
| `app/globals.css`, `tailwind.config.js`                                    | Replace old tokens, typography, shadows, and gradients                              | New styles plus Tailwind mapping and `src` scan paths                                             |
| `app/layout.tsx`                                                           | Rewrite brand/providers/shell boundaries                                            | Root + marketing layout                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`                       | Rebuild to new system                                                               | Equivalent `src/app` error boundaries                                                             |
| `app/opengraph-image.tsx`, icon files, public favicons                     | Regenerate with new identity; remove duplicates only after metadata audit           | Keep required App Router conventions and old asset URLs where useful                              |
| `public/product/*.png`                                                     | Retire after replacement and reference checks                                       | New capture folders and asset manifest                                                            |
| `public/docrack_logo.png`, `docrack_full_logo.png`                         | Preserve until vector replacement is checked                                        | `public/brand/*`; no logo redesign by accident                                                    |
| `public/logos/*`                                                           | Conditional retention                                                               | Verified exact programme label/rights; otherwise remove from public use                           |
| `.eslintrc.json`                                                           | Replace                                                                             | `eslint.config.mjs` after CLI migration passes                                                    |
| `package.json`, lockfile, `.nvmrc`, `tsconfig.json`                        | Update deliberately                                                                 | Versions, scripts, aliases, source/test paths                                                     |
| Dockerfiles, Compose, `.dockerignore`                                      | Retain deployment model; update runtime and copied paths as needed                  | Test standalone image; resolve documented env-file naming                                         |
| `next.config.ts`                                                           | Preserve standalone output; audit headers; add exact redirects                      | Remove obsolete provider domains after replacement                                                |
| `.github/workflows/deploy.yml`                                             | Retain keyless/main-only deployment; add quality gates                              | Node 24; unit/e2e/content checks; deploy only after green gates                                   |
| `scripts/setup-sheet.mjs`                                                  | Retain initial-setup utility                                                        | Document mutation risk; no automatic execution                                                    |
| README, DEPLOYMENT, `.env.example`                                         | Baseline docs refreshed; update as implementation changes                           | Actual setup, data flow, tests, release/rollback, and monitoring                                  |
| AGENTS, CLAUDE, `docs/CURRENT_PHASE.md`, `docs/CODEX_START.md`             | Shared instructions and startup/handoff records added during preparation            | Keep phase status factual and commands consistent with implemented code                           |
| `.husky/pre-commit`, Prettier/lint-staged config                           | Retain useful tooling, reconcile obsolete hook config                               | One working hook mechanism                                                                        |
| Historical Orvyn PDF                                                       | Preserve the user's existing removal; exclude from the new source hierarchy         | No recreation or additional deletion required by the rebuild                                      |
| `.env*` with real values, `secrets/`, `.git/`, `.claude/`, unrelated files | Preserve                                                                            | Never cleanup targets                                                                             |

**Deletion order:** establish replacements → switch all imports/references → validate routes/assets/forms → remove obsolete files → run checks. Search consumers before deleting; use version control as the historical archive. Do not copy the old UI into a production `legacy/` directory.

Every deletion belongs to the phase replacing that behaviour. Do not start with a blanket “delete all components/public/lib” step.

## 12. SEO, analytics, accessibility, and performance

### 12.1 Search and discoverability

- Write a unique title, description, H1, and canonical URL for each launch page.
- Use `https://docrack.ai` as the intended canonical origin; verify www/apex HTTPS behaviour at release without changing DNS as part of the redesign by default.
- Keep important explanations in server-rendered HTML, including the workflow and demo transcript.
- Publish the new route registry through the sitemap; omit redirects, unpublished resources, APIs, private previews, and transient success states.
- Use accurate modification dates, not the deployment time for every page.
- Add Organization and breadcrumb structured data where justified. Keep FAQ/glossary data consistent with visible content. Do not add fictional ratings, prices, or review markup, or promise rich-result eligibility.
- Validate JSON-LD escaping and parseability, including text containing `</script>`.
- Provide one stable 1200×630 social image at launch; page-specific images may follow.
- Link solution pages to the relevant procedure and product explanation. Avoid repeated generic copy across near-identical pages.
- Protect staging with access control where available and noindex headers. Robots alone is not access control.
- Document redirects, canonical changes, old anchor preservation, and relevant search-console checks in `docs/content/route-migration.md`.

### 12.2 Analytics and business measurement

Use a typed analytics adapter so page components do not depend directly on a vendor.

**Proposed provider:** Plausible for the marketing site, enabled only when the owner has configured the domain/account and reviewed processing terms. Its current documentation supports explicit custom events and request filtering. Disable automatic form-success tracking; emit success only after the API confirms persistence. [Plausible event documentation](https://plausible.io/docs/custom-event-goals), [tracking configuration](https://plausible.io/docs/script-extensions).

If the account is unavailable at launch, leave the adapter disabled and use Sheets for lead totals. Do not silently keep a nonfunctional analytics script or pretend that analytics is working. This fallback does not block the rest of the website.

| Event                     | Trigger                                      | Allowed properties                      |
| ------------------------- | -------------------------------------------- | --------------------------------------- |
| `demo_cta_click`          | Explicit demo link activation                | Canonical page, placement, fixed CTA ID |
| `workflow_step_view`      | Visitor selects a walkthrough step           | Fixed step ID                           |
| `source_open`             | Visitor opens synthetic evidence             | Fixed demo ID, source kind              |
| `demo_form_start`         | First intentional interaction with demo form | Page only                               |
| `demo_request_success`    | API returns genuine persisted success (201)  | Page only                               |
| `support_request_success` | Support API returns 201                      | Page only                               |
| `form_error`              | Submit failure                               | Form kind, allowlisted error class      |
| `sample_download`         | A real sample link is activated              | Fixed asset ID, file type               |

Do not send names, emails, organisations, messages, raw IPs, arbitrary query strings, input values, or request bodies as event properties. Sanitize path/query/referrer values; arbitrary UTM strings can also contain personal data. Allowlist campaign values if using attribution.

Disable analytics in development, tests, and private previews. Respect applicable consent/opt-out requirements and the chosen provider settings; do not conclude that all consent obligations disappear simply because a script is cookieless. No session replay, fingerprinting, ad pixels, or automatic capture of form fields.

Verify events in both the browser network panel and the destination dashboard from a staging configuration. Check ad-blocked and provider-failure cases. Analytics must never block navigation or submission.

Use Sheets as the authoritative enquiry count. Analytics will undercount visitors who block it. Review qualified demos, CTA-to-form conversion, form completion, useful walkthrough interactions, solution-page enquiries, and lead quality. Define qualification with the founder; do not equate every submission with revenue.

### 12.3 Accessibility and responsive quality

Target **WCAG 2.2 AA**, with automated checks and manual review. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Required checks:

- Semantic landmarks, logical headings, descriptive links, skip link, and a single visible main content region.
- Text contrast ≥4.5:1 for ordinary text; large text ≥3:1; interactive boundaries/focus indicators distinguishable from adjacent colours.
- Visible keyboard focus, logical tab order, no focus obscured by sticky elements, proper dialog/disclosure semantics, Escape and focus restoration.
- Forms have persistent labels, described errors, autofill, correct input types, readable success states, and no colour-only feedback.
- Six result states remain distinguishable in greyscale and screen-reader output.
- Touch targets generally at least 44×44px as a design requirement.
- 200% text zoom, reflow at a 320px viewport, OS font scaling, reduced motion, and high-contrast/forced-colour checks.
- Captions/transcripts for video; accessible summaries for evidence images and downloadable samples.
- Walkthrough controls work with mouse, touch, and keyboard; essential explanation remains available without JS.
- No page-wide horizontal overflow. Deliberately scrollable tables have labels and visible affordances and do not make the entire viewport scroll sideways.
- Mobile menu and sticky behaviour work in short landscape viewports as well as tall phones.

Render and inspect at **320×740, 390×844, 768×900, 1024×768, 1280×720, and 1440×1000**. Include Chrome, Firefox, and WebKit in browser automation; spot-check actual mobile Safari where available. A passing desktop screenshot does not satisfy the tablet/mobile gate.

### 12.4 Performance budgets

| Metric                | Launch target                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| LCP                   | ≤2.5 seconds under agreed mobile test conditions; later monitor field p75                          |
| INP                   | ≤200ms at field p75 when sufficient traffic exists                                                 |
| CLS                   | ≤0.1; target ≤0.05 on core local journeys                                                          |
| Lighthouse            | Median of three production mobile runs: Performance ≥90; Accessibility/SEO ≥95, plus manual checks |
| Initial compressed JS | Target ≤220 KiB on homepage, excluding deferred walkthrough/video                                  |
| Initial page transfer | Target ≤1 MiB including HTML/CSS/JS/fonts/visible image assets                                     |
| Hero image/atmosphere | Target ≤300 KiB; omit it if it makes the opening slower without improving clarity                  |
| Fonts                 | Target ≤160 KiB combined WOFF2 payload                                                             |
| Heavy media           | Deferred; video fetched only after play                                                            |

Core Web Vitals thresholds and p75 reporting follow Google's guidance. Lab results are pre-launch evidence, not a substitute for field measurement; Lighthouse does not establish real-user INP. [Web Vitals](https://web.dev/articles/vitals).

Optimise the LCP element first. Reserve image sizes, use correct `sizes`, prioritise only truly above-the-fold imagery, and lazy-load lower sections. Do not preload all product captures.

Font requests should be served locally at runtime. Vendor approved font files when build-time network access would make CI unreliable. Test fallback layout as well as fully loaded typography.

Record any missed budget, cause, and proposed remedy in the release report. Do not quietly raise budgets to make a test pass.

### 12.5 Headers and production behaviour

Retain and verify CSP, nosniff, referrer policy, permissions policy, and anti-framing controls. Align X-Frame-Options with the intended frame-ancestors policy. Verify HTTPS/proxy behaviour before enabling a strict transport policy across subdomains.

The existing CSP allows inline scripts in production. Do not describe it as blocking them. Decide explicitly between a compatible static-site policy and nonce/hash-based hardening, documenting any effect on prerendering and caching. Test the chosen policy with Next hydration, JSON-LD, images, forms, and analytics.

Remove obsolete Vercel/YouTube allowances when unused; add only the selected provider origins required by actual network traffic. Check headers on HTML, API errors, redirect responses, and error pages.

No public route may return environment values, service-account material, raw provider failures, private captures, or product access tokens.

## 13. Phase-by-phase execution plan

Phases are dependency ordered. Estimates assume one experienced implementer with timely product captures/content, and exclude external approval/account delays. They are planning ranges, not delivery promises. Core launch is roughly **five to eight working weeks**; reassess after the visual prototype.

During future implementation, complete each phase's concrete artifacts and checks, record its result, and proceed within the authorised scope. Do not ask for permission for every reversible file edit. Missing product/legal facts constrain publication of those claims; they do not stop independent design or engineering work.

### Phase 0 — Confirm baseline and public truth

**Estimate:** 1–2 days

**Depends on:** This specification.

**Work**

1. Refresh the repository audit, git status, source versions, routes, assets, deployment files, and environment-variable names without printing secrets.
2. Record current lint/type/build results and all existing route/API contracts.
3. Create the claims register, route map, asset manifest, and baseline QA record.
4. Review the current product with synthetic data to determine which capabilities/formats/exports/Packs can be shown.
5. Confirm legal/company identity, recognition wording/rights, demo ownership, product login URL, security evidence, and available public samples.
6. Inventory existing staging Sheet/notification configuration and release/rollback identifiers. Document the isolated staging setup needed for later integration checks; provision it only within an authorised infrastructure task. Record unavailable live identifiers as pending verification before release, never as invented values.
7. Record the chosen scope in `docs/CURRENT_PHASE.md`.

**Files:** `docs/qa/baseline.md`, `docs/content/claims-register.md`, `docs/content/route-migration.md`, `docs/design/assets.md`, `docs/CURRENT_PHASE.md`.

**Exit gate**

- Every current route and form behaviour has a migration disposition.
- Verified/pilot/planned/unverified product claims are separated.
- No production data is used for demo fixtures or automated testing.
- Unknown facts have explicit fallbacks; no old visual decision is designated a design constraint.

### Phase 1 — Supported foundation and source boundaries

**Estimate:** 2–4 days

**Depends on:** Phase 0 baseline.

**Work**

1. Upgrade Node/Next/React and compatible tooling in a dedicated review unit.
2. Replace `next lint` with ESLint CLI/flat config; align framework/analyser versions.
3. Move source to `src/`, update aliases/Tailwind paths, and separate server modules/content.
4. Keep existing pages and APIs functioning during this mechanical migration.
5. Add test tooling and baseline form/API tests with Sheets/Resend mocked.
6. Make local, CI, and Docker runtime versions agree; confirm production build requires no credentials.
7. Add route/content registries without yet redirecting routes whose replacements are absent.

**Files:** Package/lock/config files, Dockerfiles, CI, `src/app`, `src/lib`, `src/content`, initial tests.

**Remove:** Old root source directories only after the move is complete; legacy ESLint config after replacement passes. Do not remove old page behaviour yet.

**Exit gate**

- Lint, type checking, baseline contract tests, and standalone production build pass.
- Existing URLs and form contracts still work with test integrations.
- No server-only module enters a client bundle.
- No simultaneous root `app/` and `src/app/` implementation remains.

### Phase 2 — New visual system and reviewable prototypes

**Estimate:** 3–4 days

**Depends on:** Phase 0 content direction; Phase 1 runtime for coded prototypes.

**Work**

1. Produce a reference board with observations and original DocRack composition choices.
2. Design the homepage opening, source-review scene, a representative product page, and demo page at desktop/tablet/mobile sizes.
3. Implement tokens, fonts, buttons, form fields, disclosures, focus states, ProductFigure, OutcomeLabel, and the new shell.
4. Build a code-native prototype of the click-to-source moment using synthetic data.
5. Test text legibility, spacing, contrast, focus, and narrow viewport reflow before expanding all pages.
6. Record the selected direction and any founder feedback against concrete screenshots/prototypes.

**Files:** `src/styles/*`, new UI/navigation/layout components, initial product-demo components, `docs/design/direction.md`.

**Remove/replace:** Old token palette, font assumptions, shell appearance, and primitive visuals as their replacements are integrated.

**Exit gate**

- New visual direction is reviewable at 1440, 768, and 390px.
- It uses no old homepage layout or old UI styling as a template.
- Category, CTA, result, and evidence are readable without animation.
- All six states and keyboard controls work in the prototype.
- The form is easy to reach on mobile.

### Phase 3 — Source-grounded content and asset production

**Estimate:** 3–5 days

**Depends on:** Phase 0 capability evidence and Phase 2 composition.

**Work**

1. Write final page briefs/copy and metadata against the claims register.
2. Populate shared P2P, loan, and IFC synthetic fixtures from verified product examples.
3. Capture the current product and export a genuine synthetic working paper.
4. Produce responsive crops and alt text; validate counts, citations, versions, and approval states.
5. Generate optional atmospheric artwork using §8.3 only if it improves the design.
6. Produce brand vectors/favicon outputs and OG design.
7. Create a video storyboard/transcript if a verified workflow is ready; keep film optional.

**Files:** `src/content/pages/*`, `src/content/demos/*`, `src/content/assets.ts`, new `public` exports, asset and claims manifests.

**Remove/replace:** Old content statements and image references as replacement scenes become ready. Do not delete still-used assets.

**Exit gate**

- All core page content exists; every material claim has a source/status.
- Example amounts/counts and source references agree across media and text.
- Required captures have readable mobile treatments.
- A missing optional photo/video/customer quote does not leave a broken section.
- No confidential data, generated product screenshot, fabricated customer proof, or outdated five-state visual is included.

### Phase 4 — Homepage and signature workflow

**Estimate:** 4–6 days

**Depends on:** Phases 2–3.

**Work**

1. Build all eight homepage chapters in the specified new order.
2. Implement the six-step walkthrough and click-to-source evidence panel.
3. Implement responsive behaviour, reduced motion, accessible summaries, and fallback states.
4. Connect all commercial CTAs to the preserved demo route.
5. Integrate genuine working-paper previews and real links.
6. Check initial bundle/media budgets and resolve layout shift.
7. Retire the old homepage sections and animation scenes once references are switched.

**Files:** Homepage route, `components/sections/home/*`, `components/product-demo/*`, homepage content and tests.

**Remove:** Replaced old Hero/Problem/Workflow/Recipe/Capabilities/UseCases/Traceability/HumanReview/FinalCta implementations, old motion scenes, and their unused data. Remove shared components only when no remaining pages use them.

**Exit gate**

- The complete homepage renders at all required widths.
- A new reader can identify audience, input, procedure, review role, and output.
- Source-open works with keyboard and touch; no trapped focus or scroll.
- The same example remains accurate through all steps.
- CTA and navigation routes work; no placeholder downloads.
- Core content remains intelligible with animation disabled and before JS hydration.

### Phase 5 — Product, solution, and supporting pages

**Estimate:** 6–9 days

**Depends on:** Shared design/content and homepage primitives.

**Work**

1. Build all product pages, including Knowledge Hub & Copilot and Test Library.
2. Build Internal Audit, Credit & Loan Audit, and IFC/SOX solution pages.
3. Rebuild Security, Company, Support, Glossary, Privacy, Terms, and error pages.
4. Rebuild demo-page presentation while keeping the existing API behaviour.
5. Connect header/footer disclosures, breadcrumbs, related-page links, metadata, sitemap, and OG assets.
6. Activate the four product-route redirects and preserve the three existing redirects.
7. Remove replaced legacy layouts and unused screenshots after reference checks.

**Files:** All remaining launch routes, page content, SEO helpers, route registry, navigation, error states, exact redirects.

**Remove:** Superseded `PageHero`, `LedgerRows`, `CapabilityLayout`, `SolutionLayout`, `LegalLayout`, generic section shells, and old copy where fully replaced.

**Exit gate**

- Every launch route in §6.1 has useful, reviewed content and a working next action.
- Product hierarchy, six states, Trace, versions, and approval boundaries remain consistent.
- Redirects are single-hop and preserve relevant queries/anchors.
- No excluded product features, invented customer evidence, or dead navigation entries remain.
- Private/unverified content is not accidentally published through metadata, images, or JSON-LD.

### Phase 6 — Conversion reliability, abuse controls, and analytics

**Estimate:** 3–5 days

**Depends on:** Phase 1 contract tests and Phase 5 conversion pages.

**Work**

1. Unify form schemas and preserve wire contracts.
2. Add request guards, trusted-proxy handling, bounded timeouts, safe logging, and shared rate limiting.
3. Configure Firestore counters and TTL with documented retention/fallback behaviour.
4. Validate Sheets-first/Resend-best-effort semantics and useful accessible feedback.
5. Add analytics adapter, allowlisted events, optional provider configuration, and network verification.
6. Update privacy copy, env examples, notification ownership, and retention/deletion runbook.
7. Review actual production headers against the rebuilt site's dependencies.

**Files:** Forms, schemas, submit helper, API handlers, server integration modules, analytics adapter, tests, env/deployment/privacy documentation.

**Remove:** Duplicated schemas, unverified Vercel Analytics integration, obsolete provider CSP allowances, and redundant toast runtime if unused.

**Exit gate**

- Both forms pass success, validation, malformed-body, honeypot, rate-limit, provider-failure, and network-failure tests.
- Sheets failure does not report receipt; email failure after persistence still reports receipt.
- Shared rate-limit concurrency and fallback are tested.
- No PII appears in analytics, error responses, or routine logs.
- Controlled staging submissions produce the expected rows and team notifications, with no writes to live records.
- Analytics is either proven to receive events or explicitly disabled.

### Phase 7 — Release QA and complete cleanup

**Estimate:** 3–4 days

**Depends on:** Phases 4–6.

**Work**

1. Run all automated checks against a production build.
2. Capture every core page at desktop/mobile sizes; test representative templates and every interactive component at the full viewport matrix.
3. Perform keyboard, screen-reader, zoom, reduced-motion, and contrast review.
4. Validate links, redirects, metadata, sitemap, robots, JSON-LD, social images, downloads, and 404/error states.
5. Measure performance and inspect real network requests and security headers.
6. Scan source, metadata, demo fixtures, and public assets for old product language and excluded features.
7. Delete unused old assets/components/dependencies only after consumer checks.
8. Rewrite README/DEPLOYMENT around final commands and behaviour; resolve environment-file naming differences.
9. Prepare the release report, content review record, and rollback plan.

**Exit gate**

- All required checks pass, with any remaining limitations explicitly documented.
- No layout overflow at 320/390/768px; evidence and forms remain usable.
- No fabricated proof, unjustified security claims, stale five-state labels, or unsupported integration promises.
- No broken imports, duplicate source roots, old-page routes without redirects, or private material in `public/`.
- Release is concrete and reviewable: preview URL, screenshots, checks, data-flow changes, and deployment/rollback instructions.

### Phase 8 — Controlled launch and operational verification

**Estimate:** 1–2 days

**Depends on:** Phase 7 green release gate and authorised production release.

**Work**

1. Record the current production revision and preserve its rollback path.
2. Deploy through the existing authorised main-only pipeline; do not re-provision the project or replace secrets.
3. Check canonical domain, TLS, new pages, redirects, static assets, forms, effective headers, and indexing rules.
4. Run an explicitly designated production smoke submission only when authorised for live records/notifications; use an internal test identity and label it operationally.
5. Confirm the row, internal notification, and optional analytics event; exclude test enquiries from sales reporting.
6. Monitor API error rates, provider timeouts, limiter fallback, failed notifications, and 404s.
7. If conversion or critical navigation fails, route traffic back to the recorded previous revision.

**Exit gate**

- Intended revision is serving the intended domain.
- No staging noindex/access restrictions leak into production.
- Live conversion is verified through the authorised smoke path.
- Team knows how to inspect failed notifications and recover enquiries.
- Rollback changes traffic/image version only; it never deletes enquiry rows.

### Phase 9 — Evidence-led improvement

**Cadence:** Weekly during the first month, then monthly.

Review qualified leads, form abandonment, page performance, demo interactions, and recurring sales questions. Test one meaningful content/CTA change at a time; avoid statistical claims on tiny traffic.

Publish proven Test Pack pages, useful resources, case studies, and additional solution pages as their evidence matures. Recheck claims and screenshots after relevant product releases. Add CRM, scheduling, or durable submission idempotency only when a measured need justifies the extra system.

This phase is ongoing improvement, not unfinished core-launch work.

## 14. Validation commands and acceptance contract

### 14.1 Commands to establish during implementation

Current commands are `npm run lint`, `npm run check-types`, and `npm run build`. The test commands below are **planned additions**, not commands available in the audited checkout.

```text
npm ci
npm run lint
npm run check-types
npm run test
npm run test:e2e
npm run check:content
npm run check:assets
npm run build
```

Define `lint` as the ESLint CLI; `test` as a non-watch Vitest run; `test:e2e` as Playwright against the production app; and content/asset checks as finite repo scripts. CI must build before the production browser suite or have its webServer command build/start explicitly. Run browser dependencies in CI, and keep CI tests independent of external providers.

The standalone Docker image must also start successfully with runtime configuration. Verify its served assets and API behaviour rather than treating image compilation alone as a deployment test.

### 14.2 Minimum meaningful test coverage

| Area                      | What must be proven                                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| API contracts             | Existing accepted fields/enums/statuses; trim/normalisation; 400/422/429/500/405 behaviour; new guard responses             |
| Persistence/notifications | Honeypot writes nothing; Sheets fails → no success/email; Sheets succeeds + email fails → success                           |
| Request safety            | Bounded body, origin/content-type checks, trusted proxy/IP handling, safe errors                                            |
| Rate limiting             | Threshold boundaries, reset timing, concurrent instances, separate form namespaces, degraded fallback                       |
| Forms                     | Validation focus, 422 field mapping, Retry-After message, preserved draft, pending/double-click prevention, genuine success |
| Navigation                | Disclosure/menu keyboard operation, route changes, breakpoint reset, Escape, focus restoration                              |
| Walkthrough               | Step selection, source panel, fixture consistency, mobile layout, reduced motion, no fabricated approvals                   |
| Product truth             | Exactly six state labels; explicit exclusions; immutable Run/Recipe meanings; demo counts reconcile                         |
| SEO                       | All published routes have canonical metadata; redirects absent from sitemap; structured data matches visible text           |
| Assets                    | Every reference exists, dimensions/alt text set, no stale/unused public captures or misleading download link                |
| Accessibility             | axe plus manual keyboard, screen reader, contrast, zoom, touch, and reduced-motion checks                                   |
| Deployment                | Production build, standalone boot, header behaviour, no secret exposure, working release/rollback instructions              |

Do not create unit tests that merely assert class names or duplicate decorative implementation. Browser checks should exercise buyer journeys; content checks should catch real contradictions and broken references.

### 14.3 Definition of done

The rebuilt website is complete when:

- [ ] Its composition, design system, and UX have been created from this new direction.
- [ ] An internal-audit buyer can explain DocRack and find a demo action quickly.
- [ ] All nineteen core launch routes in §6.1 are implemented, with the stated redirects.
- [ ] The product hierarchy and all fourteen Recipe components are accurately explained.
- [ ] Six result states, typed exceptions, source Traces, versioning, and human approval are visible and correct.
- [ ] At least P2P and credit procedures have meaningful examples; IFC content is specific.
- [ ] Every product/corporate/security claim has an appropriate evidence status.
- [ ] Existing demo/support contracts and historical lead storage are preserved.
- [ ] New imagery is accurate, legible, responsive, and documented.
- [ ] Every download, navigation item, and commercial CTA works.
- [ ] Required automated, responsive, accessibility, performance, and release checks pass.
- [ ] Setup, data handling, operations, monitoring, and rollback are documented.
- [ ] Production has been verified through the authorised release process.

Optional generated art, video, public customer stories, a populated Pack catalogue, a CMS, and analytics account activation are not prerequisites for an otherwise complete core release. Their absence must result in a deliberate omission or disabled integration, not an empty page.

## 15. Outstanding factual inputs and safe defaults

These are bounded inputs to obtain during implementation, not unresolved design choices.

| Input                                                | Needed by | Default if unavailable                                                                            |
| ---------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| Current product capability/release evidence          | Phase 0/3 | Use clearly labelled examples; omit shipped/available claims until verified                       |
| Current synthetic product captures and exports       | Phase 3   | Representative, explicitly labelled HTML interaction; no claim it is a real screen                |
| Production sign-in URL                               | Phase 5   | Omit Sign in                                                                                      |
| Authoritative logo/vector and font licensing         | Phase 2/3 | Preserve the existing mark; use licensed local font files                                         |
| Programme proof and logo permissions                 | Phase 3/5 | Omit recognition marks                                                                            |
| Customer quotes and measured outcomes                | Expansion | Omit social proof rather than fabricate it                                                        |
| Verified company identity and biographies            | Phase 5   | Publish only confirmed company facts                                                              |
| Product hosting/model/residency/retention evidence   | Phase 5   | State only verified deployment facts; identify evaluation questions without promising a guarantee |
| Demo response owner, agenda, and commitments         | Phase 6   | Generic request-received language; no invented SLA or duration                                    |
| Staging Sheets/email and shared-limiter provisioning | Phase 6   | Complete mocks/emulator tests; mark external verification pending before release                  |
| Analytics account and processing decision            | Phase 6   | Disabled adapter; count enquiries in Sheets                                                       |
| Final website privacy/terms review                   | Phase 7   | Prepare concrete text for review; do not claim legal compliance from code inspection              |

The website should communicate the product's ambition clearly while keeping examples, current availability, and future work distinguishable. The implementation should leave the founder with an original, understandable marketing site and a dependable way for interested teams to request a demonstration.
