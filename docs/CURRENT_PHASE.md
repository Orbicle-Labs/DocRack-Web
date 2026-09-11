# Marketing rebuild — current phase

**Updated:** 11 September 2026

**Current phase:** Phase 0 — Confirm baseline and public truth

**Status:** Complete through the Phase 0 exit gate, with explicitly recorded product/publication and external verification limits. Phase 1 has not started.

**Last completed phase:** Phase 0 audit. No runtime or UI implementation phase completed.

**Next action:** Execute specification §13, Phase 1 when authorised: resolve compatible runtime/package versions, align Node across local/CI/Docker, migrate source boundaries and lint tooling, add mocked baseline form/API contract tests and typed route/content registries, then prove the standalone build. Preserve all current routes and form contracts. Do not activate the four new redirects before replacement pages exist.

## Completed artifacts and scope

- [Baseline audit](qa/baseline.md): current source/versions, sixteen page routes, APIs/forms and exact Sheets contracts, UI/SEO behaviours, environment names, deployment/staging/rollback inventory, product evidence and fresh check results.
- [Claims register](content/claims-register.md): 47 populated claim records, exact candidate/existing wording, evidence, status, owner role, review date, publication decision and missing-input fallbacks.
- [Route migration map](content/route-migration.md): all current pages, APIs, three retained redirects, four future redirects, machine/error routes, fragments and coordinated navigation/sitemap acceptance ledger.
- [Asset manifest](design/assets.md): all 26 physical public/App Router assets, generated OG/font sources, measured formats/dimensions/bytes, consumers, provenance/rights limits and sixteen replacement production assignments.
- This handoff updated. Changed paths are these five Markdown files only. README/DEPLOYMENT commands and configuration remain accurate for the existing implementation and were not changed.

Chosen scope remains **nineteen canonical launch pages**: twelve retained paths, four moved product pages, three new pages. Expansion content stays unpublished until substantive evidence exists. The new visual direction starts from zero under specification §§4–8; old palette, typography, layouts, section sequence and motion scenes are not constraints. Brand-mark identity is preserved pending authoritative vector work.

## Validation evidence

Fresh local checks on 11 September 2026:

| Check                                   | Result                                                                                                          |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Runtime                                 | Node 24.14.0, npm 10.8.2; configured Node 20 mismatch recorded for Phase 1                                      |
| `npm run lint`                          | PASS, exit 0; no ESLint warnings/errors; `next lint` deprecation notice                                         |
| `npm run check-types`                   | PASS, exit 0                                                                                                    |
| `npm run build`                         | PASS, exit 0; Next 15.5.18; all 27 static entries generated; both APIs dynamic                                  |
| Asset decoding / reference inventory    | All 26 physical files decoded; format/extension and duplicate-icon findings recorded                            |
| File-scoped Prettier                    | PASS — all five changed Markdown files                                                                          |
| Local Markdown links / gate consistency | PASS — 21 local links/anchors, balanced fences, 16 existing routes, 19 target rows, 47 unique claims, 26 assets |
| `git diff --check`                      | PASS — tracked diff; all five docs also checked for trailing whitespace                                         |

Build used existing dependencies and reported `.env.local` loaded; it is not proof of a credential-free build. No form submissions, provider writes/notifications, Sheet setup, deployment, secret/DNS changes or product service/data mutations occurred. There is no website test/e2e suite yet. Browser/responsive/accessibility, container boot and live integration/release verification were not performed in Phase 0. They remain explicitly assigned to their implementation/release phases.

## Evidence limits and next-phase inputs

- Product references were read in full. Current sibling HEAD is `d7a92e4416d65c6beebc0348e702d3aa6a470820`; its Phase 5 marker is not acceptance evidence. Current source, guides, synthetic answer keys and the 6 September evaluation report were reviewed. That report refers to engine 0.2.0 / commit `206fb25`, not a current accepted public release.
- No current authenticated synthetic walkthrough or approved public export/capture set was established. No product capability was promoted to Verified available/Pilot. Use clearly labelled representative synthetic examples until Phase 3 verifies the current release, formats, Packs, citations/counts and exports.
- Company identity, programme wording/rights, founder biographies, security/provider/deployment guarantees and product sign-in URL remain unverified. Omit unsupported claims/marks/sign-in and use specification §15 fallbacks. Each input has an owner role and needed-by phase in the register.
- Demo ownership/agenda/SLA, isolated staging Sheet and test inbox, shared-limiter provisioning and analytics decision remain pending for Phase 6. Prepare mocks/emulator checks; do not assume local env points at test services. Analytics defaults to disabled once the adapter is implemented.
- Live service traffic/revision/image, rollback identifier, domain/TLS/headers and legal review remain pending before their release gates. No live release identifier was invented.
- Existing `.env.docker` is tracked but Compose expects absent `.env.docker.local`; its contents were not exposed. Phase 1 must privately review build-context/ignore hygiene while preserving configuration. Asset format mismatches and duplicate icons are recorded for brand production.

## Phase 0 gate

| Exit condition                                                     | Result / evidence                                                                                               |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Every current route and form behaviour has a migration disposition | PASS — route map and baseline API/form ledgers                                                                  |
| Verified/pilot/planned/unverified claims are separated             | PASS — register definitions, evidence-qualified rows and explicit no-current-product-acceptance statement       |
| No production data used for fixtures or automated tests            | PASS — no fixture generation, product data mutation or live form requests; future fixtures explicitly synthetic |
| Unknown facts have fallbacks; no old visual constraint             | PASS — register fallback ledger, asset production assignments and chosen new design scope                       |

Phase 0's gate is an evidence/inventory gate. Pending current-product demonstrations and external checks have not been marked passed, and this result is not launch approval.

## Phase tracking

| Phase | Scope                                      | State                          |
| ----- | ------------------------------------------ | ------------------------------ |
| 0     | Baseline and public truth                  | Complete; limitations recorded |
| 1     | Supported foundation and source boundaries | Next; not started              |
| 2     | Visual system and prototypes               | Not started                    |
| 3     | Content and asset production               | Not started                    |
| 4     | Homepage and workflow                      | Not started                    |
| 5     | Product, solution, and supporting pages    | Not started                    |
| 6     | Conversion reliability and analytics       | Not started                    |
| 7     | Release QA and cleanup                     | Not started                    |
| 8     | Controlled launch                          | Not started                    |
| 9     | Ongoing improvement                        | Not started                    |

## Working-tree handoff

Audit began on `redesign/marketing-v2`, website HEAD `7308d77ee69fe3d59e503c84faa937e80a85f815`, with only untracked `.claude/`. It remains preserved. No branch change, commit, push, merge, reset, stash, restoration or unrelated cleanup was performed. Refresh git status at the next session; do not assume earlier preparation notes describe current user changes.
