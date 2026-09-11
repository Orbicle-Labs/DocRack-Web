# Phase 0 baseline audit

**Audit date:** 11 September 2026. **Scope:** local repository inspection and baseline checks; no application implementation or live integration writes.

## Baseline identity and scope

- Website branch: `redesign/marketing-v2`; HEAD: `7308d77ee69fe3d59e503c84faa937e80a85f815` (`REBUILDING WEBSITE`). This is a local source identifier, not a deployed revision.
- Initial `git status --short`: only `?? .claude/`. No tracked modifications or deletions were present. Earlier handoff references to a modified specification and deleted historical PDF were historical; no PDF was restored. Local settings and configuration were preserved.
- Git inspection used invocation-scoped `safe.directory` for this checkout. Git warned that the user-level ignore file was inaccessible; status still completed. Global Git configuration was not changed.
- Read AGENTS, CURRENT_PHASE, CODEX_START, the complete marketing specification, README and DEPLOYMENT. Read both sibling product reference documents in full, as reference content only.
- Sibling product HEAD: `d7a92e4416d65c6beebc0348e702d3aa6a470820`; its phase file says `Phase 5`. Neither proves a deployed/accepted release. No product files, services or data were changed.
- Chosen launch scope: specification §6.1's nineteen canonical pages, three retained redirects and four future exact-path redirects. See the [route migration map](../content/route-migration.md).
- Design starts from zero using specification §§4–8, “Evidence, in focus”: warm ivory, forest/charcoal, restrained citron, editorial typography and a readable result/source interaction. Existing blue palette, fonts, section order, layout primitives and motion scenes impose no design constraints. The existing mark is an identity input only.

## Current architecture and dependencies

Evidence: root `package.json`, `package-lock.json`, `.nvmrc`, `tsconfig.json`, `tailwind.config.js`, `app/layout.tsx`, Dockerfiles and workflow.

| Area               | Observed baseline                                                                                                  | Disposition                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Source             | Root `app/`, `components/`, `lib/`; no `src/` implementation                                                       | Mechanical move and source boundaries in Phase 1                  |
| Runtime            | Local Node 24.14.0, npm 10.8.2; `.nvmrc` 20; package engines `>=20`; Docker and CI Node 20                         | Align to specification target in Phase 1; no runtime upgrade here |
| Framework/types    | Next 15.5.18; React/React DOM 18.3.1; TypeScript 5.9.3; React types 18.3.29 / DOM 18.3.7; Node types 20.19.41      | Resolve compatible target patches in Phase 1                      |
| Styling            | Tailwind 3.4.19; PostCSS 8.5.15; Autoprefixer 10.5.0; clsx 2.1.1; tailwind-merge 2.6.1                             | Retain tooling, replace visual tokens in Phase 2                  |
| UI                 | Framer Motion 11.18.2; Lucide 0.379.0; Sonner 1.7.4                                                                | Verify React compatibility; rewrite scenes; reassess toast need   |
| Forms              | React Hook Form 7.76.1; resolvers 3.10.0; Zod 3.25.76                                                              | Preserve wire contracts; shared schemas later                     |
| Integrations       | google-auth-library 9.15.1; Resend REST via native fetch; Vercel Analytics 2.0.1                                   | Sheets stays system of record; analytics adapter is future work   |
| Tooling            | ESLint 9.39.4; eslint-config-next 15.5.19; bundle analyser 16.2.7; Prettier 3.8.3; Husky 8.0.3; lint-staged 14.0.1 | Migrate `next lint` and legacy config; align analyser             |
| Type configuration | Strict; `@/*` maps to `./*`; includes `.next/types`; incremental                                                   | Move aliases and scan paths atomically in Phase 1                 |
| Fonts              | Inter 400/500/600/700 and JetBrains Mono 400/500 via `next/font/google`                                            | Manrope/Instrument Serif and licence records are Phase 2/3 work   |
| Tests              | No test, e2e, content-check or asset-check scripts                                                                 | Add meaningful contract tests in Phase 1; no invented test result |

Existing scripts: `dev` = `next dev`; `build` = `next build`; `start` = `next start`; `lint` = `next lint`; `check-types` = `tsc --noEmit`; `format` rewrites the whole repository; `prepare` installs Husky. The pre-commit hook sets `ESLINT_USE_FLAT_CONFIG=false` and runs lint-staged. Package-level legacy Husky configuration also exists.

## Route, rendering and interaction inventory

All sixteen existing page routes, APIs, redirects, metadata routes, public assets and fragment dispositions are enumerated in the [route map](../content/route-migration.md). The build generated all 27 static entries; its route table lists both APIs as dynamic.

| Area / source                                                                 | Current behaviour                                                                                                                                                     | Preserve or replace                                                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`, `components/sections/*`                                       | Twelve assembled homepage sections, including trust strip and Recipe claim                                                                                            | Replace composition entirely in Phase 4; do not reuse old order                                                                              |
| `CapabilityLayout`, `SolutionLayout`, `PageHero`, `LedgerRows`, `LegalLayout` | Shared page shells driven by `lib/content/*`                                                                                                                          | Replace all presentation in Phase 5                                                                                                          |
| `SiteHeader`, `SiteFooter`, `MobileNav`                                       | Flat Product/Security/Company/Support navigation; footer product/solution links; no sign-in; mobile dialog handles Escape, focus cycling, scroll lock and route close | Preserve useful semantics, rebuild disclosures. Current mobile CTA hidden below `sm`; no breakpoint reset or inert-background handling found |
| `WorkflowSection`, `UseCasesSection`, `use-step-sequence.ts`                  | Six workflow steps; four use cases; selectable tabs with arrows/Home/End                                                                                              | Behaviour may inform tests; new fixture and new compositions required                                                                        |
| `ExplainerSequence`, `ExceptionHandoff`, `lib/content/motion.ts`              | Client-controlled screenshot highlights and handoff illustration, not an audit execution                                                                              | Retire scenes; do not carry old IDs/counts/approval stories into new demo                                                                    |
| `ProductFrame`                                                                | Default 16:10; image fill with `object-cover object-top`; real/illustrative caption modes                                                                             | Replace with deliberate evidence crops and accessible summaries                                                                              |
| `app/layout.tsx`, `lib/seo.ts`                                                | Canonical base `https://docrack.ai`, global metadata, skip link and one main; production Analytics                                                                    | Keep semantics; audit page-specific metadata and analytics separately                                                                        |
| `app/sitemap.ts`, `lib/nav.ts`                                                | Sixteen URLs derived from navigation; every generation uses `new Date()`                                                                                              | Independent registry and real modification dates in Phase 1/5                                                                                |
| `lib/schema.ts`, `JsonLd`                                                     | Support FAQPage and glossary DefinedTermSet use visible content; `<` escaped during serialisation                                                                     | Retain builder concept and test malicious closing-script text in later checks                                                                |
| Error boundaries                                                              | 404 noindex; local/global retry boundaries; details only in development                                                                                               | Rebuild appearance; preserve safe production errors                                                                                          |

No rendered page/accessibility/performance acceptance was performed in Phase 0. Source comments claiming earlier axe or responsive success were not counted as fresh evidence. Two old asset files were visually inspected for content risk, not design inspiration; see [assets](../design/assets.md).

## Form and API contracts

Evidence: `components/forms/DemoForm.tsx`, `SupportForm.tsx`, `lib/forms.ts`, both `app/api/*/route.ts`, `lib/sheets.ts`, `lib/notify.ts`, `lib/rate-limit.ts`, and the setup script read as text only.

| Contract       | Demo                                                                      | Support                                        |
| -------------- | ------------------------------------------------------------------------- | ---------------------------------------------- |
| Browser route  | `/book-demo`                                                              | `/support`                                     |
| POST           | `/api/demo-booking`                                                       | `/api/support-ticket`                          |
| Fields         | `fullName`, `email`, `companyName`, `auditCount`, optional `_hp`          | `fullName`, `email`, `message`, optional `_hp` |
| Names          | 2–100 characters; Unicode letters, whitespace, apostrophe, hyphen, period | Same                                           |
| Email          | Valid email, max 254; server lowercases and trims **after validation**    | Same                                           |
| Other limits   | Company 2–200; audit count exactly `1-10`, `10-50`, `50-100`, `100+`      | Message 10–5000                                |
| Display labels | Up to 10; 11–50; 51–100; more than 100                                    | N/A                                            |
| Storage tab    | `Demo Bookings`                                                           | `Support Tickets`                              |
| Column order   | Timestamp, Full Name, Email, Company, Annual Audits                       | Timestamp, Full Name, Email, Message           |
| Limiter        | `demo:<derived IP>`; 3 per 20 minutes                                     | `support:<derived IP>`; 5 per 30 minutes       |

| Path through handler             | Response / effect                                                                                                                                           | Migration requirement                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Limiter first                    | 429 `{ error }`, `Retry-After` seconds; even malformed/bot requests consume allowance                                                                       | Preserve thresholds/namespaces; shared limiter and trusted proxy in Phase 6     |
| Invalid JSON                     | 400 `{ error: 'Invalid request body.' }`                                                                                                                    | Preserve                                                                        |
| Nonempty string `_hp`            | Generic 200 `{ success: true }`; no append/email (unless already rate limited)                                                                              | Preserve bot handling; do not count as genuine conversion                       |
| Schema invalid                   | 422 `{ error: 'Invalid form data.', fields: <field arrays> }`                                                                                               | Preserve mapping and accepted fields                                            |
| Genuine valid request            | Append first, then await best-effort notification; 201 `{ success: true }`                                                                                  | Preserve; no calendar booking or visitor confirmation email                     |
| Sheets failure                   | 500 `{ error }`; no notification; demo text “Failed to save your booking. Please try again.”; support text “Failed to send your message. Please try again.” | Preserve safe failure; redact logs in Phase 6                                   |
| Email skipped/fails after append | Still 201; missing API key/destination skips send                                                                                                           | Never make a saved enquiry fail or retry append due to email                    |
| GET                              | Explicit 405 `{ error: 'Method not allowed.' }`                                                                                                             | Preserve; other methods are framework-handled and need Phase 1 runtime coverage |

Current names/company/message are validated before trimming for storage; whitespace-only strings can therefore pass some minimum-length checks. Surrounding email whitespace may fail before its transform runs. Client/server schemas are separate, despite comments saying they mirror exactly. Shared normalisation before validation is a specified later correction, not existing behaviour.

Google ADC is constructed lazily. Sheets uses quoted tab range `'<tab>'!A1`, `valueInputOption=RAW`, `insertDataOption=INSERT_ROWS`; timestamps use `en-IN`, `Asia/Kolkata`, with `IST` appended. No automatic append retry/idempotency is implemented at application level; transport retry behaviour has not been accepted as exactly-once. Resend sends to internal `NOTIFY_EMAIL`, with optional `EMAIL_FROM` override. HTML values are escaped; messages preserve newlines. No application timeout is set on either provider. Errors log raw objects/provider text, which requires correction before claiming safe routine logging.

Forms validate on touch, show inline errors plus Sonner, map 422 errors to allowlisted fields and focus the first, disable the submit button while pending, preserve failed drafts, and reset after success. The shared helper treats any HTTP 2xx as success (even malformed/empty response), handles network failure, and translates Retry-After. Honeypots are present client and server side. There are no attachments, calendar integration or extra qualification fields. Keep these behaviours through Phase 1; improve confirmed-201 analytics, schema handling and feedback in Phase 6. Response-time promises, personal-email discouragement, and absolute data-use copy must be rewritten in Phase 5/6.

## Data, environment and deployment inventory

Only environment **names and file existence** were inspected; real env values and credentials were not printed or used to submit forms.

| Item                   | Local/source evidence                                                                                                                    | Status / required follow-up                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enquiry configuration  | `GOOGLE_SHEET_ID`, `GOOGLE_APPLICATION_CREDENTIALS`, `RESEND_API_KEY`, `NOTIFY_EMAIL`, `EMAIL_FROM`                                      | Existing five-name contract; actual access, destinations and sender verification unverified                                                                                                  |
| Runtime/tool variables | `NODE_ENV`, `ANALYZE`, `NEXT_TELEMETRY_DISABLED`, `PORT`, `HOSTNAME`, `WATCHPACK_POLLING`, hook `ESLINT_USE_FLAT_CONFIG`                 | Build/runtime settings, not new enquiry fields                                                                                                                                               |
| Local files            | `.env.local`, `.env.docker`, `.env.example` exist; `.env.docker` is tracked; `.env.docker.local` absent                                  | Preserve all; Compose expects the absent `.env.docker.local`. Contents of real config not inspected. Phase 1 must review tracked env/build-context hygiene privately before image validation |
| Ignore rules           | Git/Docker exclude `.env.local`, `.env.*.local`, `secrets`; literal `.env.docker` is not excluded                                        | Naming discrepancy remains; no deletion or secret rotation in this phase                                                                                                                     |
| Website hosting        | Workflow targets project/service `docrack-web`, region `asia-southeast1`                                                                 | Configured target only; no product residency inference                                                                                                                                       |
| CI                     | PR to main runs npm ci/lint/type/build; main push/manual dispatch can deploy after checks                                                | No push, dispatch, merge or deployment performed                                                                                                                                             |
| Identity               | WIF provider and deployer identifiers in `.github/workflows/deploy.yml`; runtime SA `docrack-web-sa@docrack-web.iam.gserviceaccount.com` | Keyless configuration; live IAM/provider restriction unverified                                                                                                                              |
| Docker                 | `node:20-alpine`; standalone; non-root runner; public and `.next/static` copied; `node server.js`                                        | No Docker image/boot check in Phase 0; Phase 1 must prove runtime without credentials                                                                                                        |
| Compose                | Dev/prod profiles share host port 3000; local key mounts; no dedicated staging service                                                   | Cannot treat localhost as integration isolation                                                                                                                                              |
| Release/rollback       | Local HEAD known; live traffic, ready revision, deployed image, rollback revision and URL not inspected                                  | Record verified service traffic and known-good revision before Phase 8; use DEPLOYMENT §5/8                                                                                                  |
| Staging                | No isolated Sheet ID, test inbox, approved sender, staging service or limiter database verified                                          | Phase 6 needs explicit isolated target + identity + Sheet with exact tabs/columns + test inbox + authorised submissions                                                                      |
| Setup script           | Can rename first tab, add support tab, overwrite both header rows                                                                        | Read only; never ran it. Historical rows untouched                                                                                                                                           |
| Analytics              | Production mounts Vercel Analytics; no delivery/proxy proof                                                                              | Phase 6 adapter disabled unless destination and processing are verified                                                                                                                      |

Current CSP permits production inline scripts; `connect-src 'self'`; Vercel script and YouTube frame origins are allowed. `X-Frame-Options: SAMEORIGIN` differs from CSP `frame-ancestors 'none'`. Other configured headers include nosniff, referrer and permissions policies. Effective live headers/TLS were not tested. The limiter trusts first forwarded-IP/fallback real-IP, holds raw IP keys per process, and replaces expired entries only when reused; no pruning/cap exists. Website enquiry data, provider handling and hosting logs must be assessed separately from product audit evidence.

## Product and public-truth review

The [claims register](../content/claims-register.md) is the publication control. Current product source and synthetic evidence were reviewed read-only:

- Product spec v1 and build plan v1, dated 23 August 2026, define meaning, not availability.
- `../DocRack/docs/evals/2026-09-06-eval-report.md` records engine 0.2.0 at commit `206fb25`, synthetic P2P/Pack recall, recorded-vision extraction and performance. It is dated evidence, not this session's test or current release acceptance. Its full-set section notes ten scans missing from the recording. Do not publish a general accuracy/speed promise from it.
- The synthetic P2P answer key records 210 received, 4 excluded, 206 eligible, 202 tested, 3 awaiting evidence, 1 processing failure. Product guide Pack sample totals differ from evaluation totals; datasets/denominators must be reconciled against the actual captured Run in Phase 3.
- Upload allowlist in `services/api/app/core/uploads.py` includes PDF, PNG/JPEG/TIFF, XLSX/XLS, CSV, DOCX, PPTX, EML, ZIP. File acceptance does not prove extraction quality or Indian-script support for each format. Guides and tests supply candidates; current end-to-end format demonstrations remain pending.
- Working-paper guide and `services/api/app/exports/*` describe Excel, Word, conditional PDF conversion, CSV exception register/evidence index, source references and locking/versioning. PDF can be unavailable when the converter is unavailable. No public-ready export was supplied or copied.
- Five Pack candidates are documented and have synthetic fixtures/tests: P2P, board-deck/MIS, credit/loan, IFC controls and expense/JE. Insurance is an example in the spec, not a verified built-in Pack.
- Product security guide, pilot kit and demo script exist. The partner/date fields in the pilot README are blank. A “Phase 5” marker, security prose and code/tests are not proof of deployed controls, a scheduled pilot or logo/publication rights.

A current authenticated synthetic walkthrough, fresh engine tests, export inspection, product deployment check and screenshot-to-Run attestation were **not performed**. No isolated authenticated synthetic session or current public release was established for this audit; launching/seeding the sibling product would write outside this website's scope. Apply specification §15: use explicitly labelled representative examples and omit shipped/available claims until current evidence is supplied. This limits Phase 3 publication proof, not Phase 0's inventory gate.

Company incorporation, founder identities/biographies, programme relationship/rights, public sign-in URL, security/provider terms, demo owner/agenda/SLA, legal review and samples remain unverified. Each has an owner role, due phase and fallback in the register; no fabricated identity, release or contact was introduced.

## Fresh validation

| Check (11 September 2026)                              | Result                           | Evidence / limits                                                                                                                                                                                           |
| ------------------------------------------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node --version`; `npm --version`                      | PASS                             | v24.14.0; 10.8.2                                                                                                                                                                                            |
| `npm run lint`                                         | PASS, exit 0                     | “No ESLint warnings or errors”; `next lint` deprecation notice                                                                                                                                              |
| `npm run check-types`                                  | PASS, exit 0                     | `tsc --noEmit`                                                                                                                                                                                              |
| `npm run build`                                        | PASS, exit 0                     | Next 15.5.18; compiled, 27/27 static entries, build traces completed; both APIs dynamic                                                                                                                     |
| Asset decoding and consumer search                     | PASS inventory; defects recorded | 26 files including three App Router icons; all decoded by installed Sharp; extension/content mismatches listed in manifest                                                                                  |
| Scoped Prettier, relative links and `git diff --check` | PASS                             | Five documents formatted; 21 local links/anchors; balanced fences/no trailing whitespace; tracked diff clean. Inventory checks confirmed 16 existing routes, 19 target rows, 47 unique claims and 26 assets |

Build used the existing dependency installation and reported `.env.local` loaded. It made no form submissions, but this is **not** a credential-free-build proof. `NEXT_TELEMETRY_DISABLED=1` was set for lint/build. No npm install/upgrade, product service start, live POST, Sheet setup, notification, cloud mutation, DNS or secret change occurred. No website test suite exists, and browser/standalone/container/live checks remain unperformed. Next's first-load table reported 126 kB for home and 156 kB for each form; these are build estimates, not measured transfer or Core Web Vitals.

## Findings carried to implementation

| ID  | Finding                                                                                                | Required phase/action                                                                        |
| --- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| B01 | Runtime/source/tool versions are not the target stack                                                  | Phase 1 supported foundation and boundary migration                                          |
| B02 | Five states; six-part Recipe anatomy; incomplete role lists; request-evidence copy/control             | Phases 2–5 canonical six states, fourteen components, six roles and excluded-feature removal |
| B03 | Absolute missing-evidence language and broad reproducibility/coverage claims                           | Phase 3/5 source-qualified copy; retain configured completeness exception                    |
| B04 | “Backed by”, company identity, architecture-derived security, operational promises unverified          | Claim register controls publication; no logo wall by default                                 |
| B05 | Privacy “nothing else”, retention-window and analytics/consent claims exceed evidence                  | Phase 6 processing/retention review; Phase 7 legal review                                    |
| B06 | Process-local limiter, raw IP retention, trusted proxy, unbounded provider calls and raw error logging | Phase 6 request guards/shared limiter/timeouts/safe logs                                     |
| B07 | Duplicate icons and misleading extensions; old screenshots lack attested provenance                    | Phase 2/3 re-export/recapture, Phase 7 remove only after consumer checks                     |
| B08 | Sitemap tied to nav and artificial dates; anchors need migration                                       | Phase 1 registry; Phase 5 coordinated canonical/redirect cutover                             |
| B09 | Mobile CTA/menu reset/inert behaviour and evidence crops need rendered checks                          | Phase 2 original shell/prototypes; full viewport acceptance later                            |
| B10 | Tracked `.env.docker` does not match Compose filename and ignore coverage                              | Phase 1 private configuration/build-context review; preserve values                          |

## Phase 0 exit gate

- [x] Every current route and form behaviour has a migration disposition in this audit and the route map.
- [x] Verified available, Pilot, Planned and Unverified statuses are defined and separated; no product capability is promoted on plan/code evidence alone.
- [x] No production data was used for fixtures or automated testing; no new demo data/assets were produced. Future fixtures are explicitly synthetic.
- [x] Unknown facts have explicit fallbacks and due phases. No old visual decision is a design constraint.

**Result: Phase 0 complete, with the named external/current-product checks pending.** This is not a product-readiness or release gate. Next action: execute Phase 1 when authorised, beginning with compatible runtime/package resolution and the source-boundary migration while preserving these contracts.
