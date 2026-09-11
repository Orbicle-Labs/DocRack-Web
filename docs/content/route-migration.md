# Route migration map — Phase 0

**Reviewed:** 11 September 2026 against `app/**/page.tsx`, both API handlers, `next.config.ts`, `lib/nav.ts`, metadata routes and content/interaction IDs. **Chosen scope:** nineteen canonical launch pages from marketing specification §6.1. No route, redirect, navigation or sitemap implementation changes in Phase 0.

Current site: sixteen page routes, two API endpoints and three configured permanent redirects. Target: retain twelve page paths, move four, add three. All nineteen target pages belong in the future canonical registry; redirected source paths and expansion placeholders do not.

## Page registry and launch acceptance ledger

This table is the Phase 0 planning registry. Phase 1 will add the typed `src/content/routes.ts` implementation. A target path below does not mean it exists today. **All launch acceptance entries remain pending.** Canonicals use the intended origin `https://docrack.ai`; live apex/www routing is not verified here.

| ID  | Existing route / source                        | Canonical launch route               | Disposition and content acceptance                                                                                                  | Navigation / discovery                                           | Implementation phase / launch gate                  |
| --- | ---------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------- |
| R01 | `/` — `app/page.tsx`                           | `/`                                  | Full new eight-chapter homepage; synthetic six-step example; visible result/evidence; demo CTA                                      | Logo/home entry; sitemap                                         | Phase 4 / pending                                   |
| R02 | `/product` — `app/product/page.tsx`            | `/product`                           | Full workflow; engagement/workspace hierarchy; Test versus Run; AI/code/human roles; links to eight product routes including itself | Product overview + footer; sitemap                               | Phase 5 / pending                                   |
| R03 | `/product/audit-test-recipes` — matching page  | `/product/audit-test-recipes`        | Fourteen components, six source roles, six states, draft/approval and version logic                                                 | Product panel + footer; sitemap                                  | Phase 5 / pending                                   |
| R04 | `/documents` — `app/documents/page.tsx`        | `/product/documents`                 | Build replacement before exact 308; six roles, source Traces, readiness by input format                                             | Product panel + footer; sitemap target only after cutover        | Phase 5 / pending                                   |
| R05 | `/reconciliation-and-checks` — matching page   | `/product/reconciliation-and-checks` | Build replacement before exact 308; Extract/Reconcile/Checks inside Tests, cascade/tolerances/typed verdicts                        | Product panel + footer; sitemap target after cutover             | Phase 5 / pending                                   |
| R06 | `/review-and-findings` — matching page         | `/product/review-and-findings`       | Build replacement before exact 308; source review, six states, maker-checker, overrides and grouped findings                        | Product panel + footer; sitemap target after cutover             | Phase 5 / pending                                   |
| R07 | `/working-papers` — matching page              | `/product/working-papers`            | Build replacement before exact 308; complete contents, honest exports, source index, lock/version semantics                         | Product panel + footer; sitemap target after cutover             | Phase 5 / pending                                   |
| R08 | None; partial sections on `/product`           | `/product/knowledge-hub-and-copilot` | New substantive page; three categories, policy update/reapproval, cited assistance, draft compiler                                  | Product panel + footer; sitemap                                  | Phase 5 / pending                                   |
| R09 | None                                           | `/product/test-library`              | New substantive page; three worked Pack summaries, clone/customise/version/approval, honest availability                            | Product overview + footer; sitemap; not required in header panel | Phase 5 / pending                                   |
| R10 | `/solutions/internal-audit` — matching page    | `/solutions/internal-audit`          | Rebuild enterprise IA explanation with P2P procedure and evidence                                                                   | Solutions panel + footer; sitemap                                | Phase 5 / pending                                   |
| R11 | `/solutions/credit-loan-audit` — matching page | `/solutions/credit-loan-audit`       | Rebuild loan-specific supplied-evidence procedure; no registry/live regulatory verification                                         | Solutions panel + footer; sitemap                                | Phase 5 / pending                                   |
| R12 | None                                           | `/solutions/ifc-sox`                 | New page: journal/authority/cut-off/control-operation examples; no certification promise                                            | Solutions panel + footer; sitemap                                | Phase 5 / pending                                   |
| R13 | `/security` — matching page                    | `/security`                          | Rebuild with scoped verified facts, evaluation questions and website/product data distinction                                       | Header + footer; sitemap                                         | Phase 5 / pending                                   |
| R14 | `/company` — matching page                     | `/company`                           | Rebuild original story; company/recognition/bios only when confirmed                                                                | Header + footer; sitemap                                         | Phase 5 / pending                                   |
| R15 | `/book-demo` — matching page                   | `/book-demo`                         | Retain demo request route and fields; original responsive form presentation; no calendar or response SLA promise                    | Primary Book a demo CTA throughout; footer; sitemap              | Phase 5 presentation, Phase 6 reliability / pending |
| R16 | `/support` — matching page                     | `/support`                           | Retain Name/Email/Message; separate FAQ and enquiry; no confidential evidence upload                                                | Footer, relevant secondary CTAs; sitemap                         | Phase 5 presentation, Phase 6 reliability / pending |
| R17 | `/glossary` — matching page                    | `/glossary`                          | Preserve useful anchors; add Test, Run, Trace, Test Pack, Knowledge Hub, six states; align DefinedTermSet                           | Footer and contextual links; sitemap                             | Phase 5 / pending                                   |
| R18 | `/privacy` — matching page                     | `/privacy`                           | Website-only processing notice reflecting integrations/IP/analytics/retention; final review                                         | Footer/legal + form privacy links; sitemap                       | Phase 5/6 copy, Phase 7 legal gate / pending        |
| R19 | `/terms` — matching page                       | `/terms`                             | Website-only terms; company/rights facts verified; separate product contract                                                        | Footer/legal; sitemap                                            | Phase 5 copy, Phase 7 legal gate / pending          |

## Redirect ledger

| Source                       | Destination                          | Current state                          | Target / activation condition              |
| ---------------------------- | ------------------------------------ | -------------------------------------- | ------------------------------------------ |
| `/intake`                    | `/book-demo`                         | Exact `permanent: true` configured     | Retain 308; query preserved; no chain      |
| `/workflow`                  | `/product`                           | Exact `permanent: true` configured     | Retain 308; query preserved; no chain      |
| `/about`                     | `/company`                           | Exact `permanent: true` configured     | Retain 308; query preserved; no chain      |
| `/documents`                 | `/product/documents`                 | Source serves page; destination absent | Phase 5 exact 308 after replacement passes |
| `/reconciliation-and-checks` | `/product/reconciliation-and-checks` | Source serves page; destination absent | Phase 5 exact 308 after replacement passes |
| `/review-and-findings`       | `/product/review-and-findings`       | Source serves page; destination absent | Phase 5 exact 308 after replacement passes |
| `/working-papers`            | `/product/working-papers`            | Source serves page; destination absent | Phase 5 exact 308 after replacement passes |

No wildcard `/product/*` or `/api/*` redirects. No blanket homepage redirects for unimplemented features. At cutover test all seven sources with a harmless query, confirm one hop to a 200 canonical page and retain the query. Test fragment landing in a browser separately: fragments do not reach the redirect handler. Do not implement four new redirects during Phase 1 before destinations exist.

## APIs, machine endpoints and error routes

| Route / surface                                             | Existing source / behaviour                                                   | Migration disposition                                                                                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /api/demo-booking`                                    | `app/api/demo-booking/route.ts`; append Demo Bookings then internal email     | Same endpoint; move source in Phase 1; exact fields/enums/columns/statuses preserved; guards/reliability Phase 6                      |
| `POST /api/support-ticket`                                  | `app/api/support-ticket/route.ts`; append Support Tickets then internal email | Same endpoint; move source in Phase 1; preserve contract; Phase 6 hardening                                                           |
| GET on both APIs                                            | Explicit JSON 405; other methods framework-handled                            | Preserve; verify method matrix in Phase 1. No sitemap inclusion                                                                       |
| `/sitemap.xml`                                              | `app/sitemap.ts`; sixteen nav-derived current pages with generation dates     | Move in Phase 1; registry-driven canonical published routes, nineteen at complete launch; real dates or omit; no redirect/API entries |
| `/robots.txt`                                               | `app/robots.ts`; allow all, intended-domain sitemap                           | Retain endpoint; production indexing and staging noindex/access controls validated separately at release                              |
| `/opengraph-image`                                          | `app/opengraph-image.tsx`; code-rendered 1200×630 PNG                         | Rebuild identity/copy in Phase 3/5; no obsolete `/og-image.png` link; not a content sitemap route                                     |
| `/icon.png`, `/apple-icon.png`, `/favicon.ico`              | App Router file conventions                                                   | Preserve served identity endpoints through source move; deterministic brand regeneration later                                        |
| Public root asset URLs and `/product/*.png`, `/logos/*.png` | 23 static public files                                                        | No blanket redirects; retain until consumers switch; see complete asset manifest                                                      |
| Unknown paths / internal `/_not-found`                      | `app/not-found.tsx`, noindex                                                  | Preserve useful 404 home/support actions; noindex; do not publish internal route as launch page                                       |
| Segment/global errors                                       | `app/error.tsx`, `app/global-error.tsx`, retry controls                       | Preserve safe production error boundaries and rebuild identity; neither is a normal public route                                      |
| Framework `/_next/*`, image optimisation                    | Next-generated resources                                                      | Keep framework routing; no marketing redirect or sitemap entry                                                                        |

The [baseline API ledger](../qa/baseline.md#form-and-api-contracts) records all fields, validation, honeypot, limiter, error bodies, persistence and notification behaviours. All are assigned to Phase 1 preservation and Phase 6 deliberate improvements; no Sheet/header migration is planned.

## Fragment inventory and disposition

| Existing fragment / location                                                                         | Destination behaviour planned                                                                                               | Verification                                          |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `/#workflow`                                                                                         | Retain ID for new six-step walkthrough                                                                                      | Phase 4 keyboard/touch/scroll offset                  |
| `/product#copilot`                                                                                   | Retain meaningful short Copilot section/link to new detail page; no server fragment redirect                                | Phase 5 direct fragment landing                       |
| `/review-and-findings#evidence-trace`                                                                | Retain `#evidence-trace` on new Review source scene                                                                         | Phase 5 redirect + browser fragment landing           |
| `/product/audit-test-recipes#recipe-run`                                                             | Retain ID on new Recipe/Run explanation                                                                                     | Phase 5 browser fragment landing                      |
| `/working-papers#exception-handoff`                                                                  | Retain ID on new exception-to-paper explanation                                                                             | Phase 5 redirect + browser fragment landing           |
| `#main-content`                                                                                      | Retain skip-link target in rebuilt shell                                                                                    | Phase 2 focus and scroll check                        |
| `#workflow-tab-{documents,recipe,run,review,findings,working-paper}` and matching `workflow-panel-*` | Component-generated control IDs, not discovered authored inbound links. Old controls retire; retain workflow section access | Phase 4 new ARIA control relationships                |
| `#use-case-tab-{invoice,credit,board-deck,claims}` and matching `use-case-panel-*`                   | Old component IDs retire with scene; new P2P/credit/IFC content remains discoverable                                        | Phase 4 new controls and no stale internal references |
| `{evidence-trace,recipe-run,exception-handoff}-step-*`                                               | Old generated step IDs retire; parent section IDs retained                                                                  | Phase 5 no stale aria-controls references             |

Preserve all eleven existing glossary IDs at `/glossary` and use them in visible content and DefinedTermSet `@id`:

| Existing ID             | Content disposition                                                     |
| ----------------------- | ----------------------------------------------------------------------- |
| `audit-test-recipe`     | Expand canonical fourteen-component definition                          |
| `configured-tests`      | Retain scope qualification; add separate Test and Run definitions       |
| `population`            | Explicit received/eligible/tested/excluded/failures/awaiting accounting |
| `evidence`              | Correct all six source roles                                            |
| `source-linked-result`  | Retain and link new Trace definition                                    |
| `exception`             | Record-level issue, distinct from finding                               |
| `insufficient-evidence` | Include completeness-procedure exception                                |
| `review`                | Remove evidence-request action; retain attributable decisions           |
| `human-approval`        | Preserve human Recipe/conclusion approval boundary                      |
| `finding`               | Group related confirmed exceptions                                      |
| `working-paper`         | Source references, limitations, versions and approvals                  |

No search-console, traffic or backlink data was accessed; the fragment list is repository-derived. Before Phase 5 cutover, inspect any available authorised inbound-link data for other historical anchors and add compatibility IDs where meaningful. Do not claim external fragments were audited.

## Coordinated cutover and navigation

1. Phase 1: populate typed current route/content registries during source migration. Keep all sixteen current URLs working. Do not create empty expansion directories.
2. Phases 2–4: design a new Product/Solutions disclosure shell. Header: Product, Solutions, Security, Company, visible Book a demo; omit Sign in without verified URL. Menus expose only destinations that exist in that build.
3. Phase 5: add three new pages and four replacements. Switch header/footer, contextual links, metadata canonicals, glossary hrefs/JSON-LD and sitemap together, then activate exact redirects. Every row R01–R19 needs useful reviewed content and a next action.
4. Phase 7: crawl all nineteen routes, seven redirects, metadata/social assets, public references and unknown-path behaviour against production output. Confirm no future/redirect/API URL in sitemap, no private previews indexed, and no dead downloads. Run responsive/accessibility checks per specification §12.3.
5. Phase 8: verify intended domain/TLS and current production traffic before release; do not change DNS just to implement the redesign. Search-console inspection is pending, not a Phase 0 success.

Conditional routes remain unpublished: `/test-packs`, `/test-packs/[slug]`, `/resources`, `/resources/[slug]`, `/customers/[slug]`, additional operational/compliance/finance solutions, pricing and languages. No nav or sitemap entry until substantive evidence-backed content exists. Any scope change must update this table, typed registry, navigation, sitemap and acceptance ledger together.

**Phase 0 route gate: complete.** Every discovered current page, API, redirect and machine/error surface has a disposition. Runtime redirect/browser checks and target-page launch acceptance remain assigned to later phases.
