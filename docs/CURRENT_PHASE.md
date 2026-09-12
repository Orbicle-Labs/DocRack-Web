# Marketing rebuild — current phase

**Updated:** 12 September 2026

**Current phase:** Phase 1 — Supported foundation and source boundaries

**Status:** Complete through the local Phase 1 exit gate. Phase 2 has not started. No deployment or live-service changes occurred.

**Last completed phase:** Phase 1. Phase 0 remains complete with its recorded evidence/publication limits.

**Next action:** Execute specification §13 Phase 2 when authorised: produce the original reference board and visual direction; implement warm ivory/forest/citron tokens, licensed Manrope/Instrument Serif fonts, new primitives and shell; build homepage/source-review/product/demo prototypes and a synthetic click-to-source interaction. Verify all six states and keyboard controls at 1440/768/390px, plus 320px reflow. Do not use the preserved old presentation as a design template.

## Completed work and changed paths

- Runtime: Node **24.21.0**, Next **16.3.4**, React/React DOM **19.3.0**; aligned engines, `.nvmrc`, Dockerfiles, CI and local validation runtime. Compatible motion/icons/toast and Google auth upgrades; reproducible lockfile with zero npm audit vulnerabilities.
- Source: root `app/`, `components/` and `lib/` moved under `src/`. Public pages use `src/app/(marketing)/`; APIs remain `src/app/api/`. The marketing layout owns the header, main, footer and skip link; root error/404 content remains independently usable.
- Boundaries: `src/lib/server/{sheets,notify,rate-limit}.ts` use `server-only`; browser submission, hooks and SEO helpers are separated. Alias/Tailwind paths target `src/`. Existing copy moved to `src/content/pages/`; physical assets and current presentation remain preserved.
- Registries: `src/content/routes.ts` records sixteen published pages, seven planned destinations and three existing redirects. Navigation accepts published paths only; the sitemap is independent of navigation. Four future product redirects remain inactive. The nineteen-page redesigned launch scope is unchanged.
- Tooling: `eslint.config.mjs` replaces `.eslintrc.json`; Husky/lint-staged use flat config and bounded argument batches for Windows. `vitest.config.ts`, `playwright.config.ts`, `tests/` and `scripts/analyze.mjs` add mocked contract/component/browser checks and separate webpack analysis. CI runs tests and build before the existing main-only deployment job.
- Hygiene: `.dockerignore`, `.gcloudignore`, `.gitignore` and `.prettierignore` exclude credentials/local artifacts. Existing env files, keys and `.claude/` are preserved.
- Documentation: README, DEPLOYMENT, route migration map and asset manifest reflect current paths/runtime. [Phase 1 QA](qa/phase-1.md) records detailed evidence and limitations.

Small React compatibility fixes reset header menu state by route key and update step refs during events. Form fields, enums, statuses, Sheet tabs/columns and Sheets-first/awaited-best-effort-email semantics are unchanged. No product engine, new lead store, shared limiter or analytics adapter was introduced.

## Phase 1 exit gate

| Exit condition                                               | Evidence / result                                                                                                                                           |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lint, types, baseline tests and standalone build pass        | PASS — ESLint with zero warnings; strict TypeScript; 45 Vitest tests; credential-free Next 16 Turbopack Docker build                                        |
| Existing URLs and form contracts work with test integrations | PASS — 23 Chromium checks; sixteen pages, query-preserving redirects, 404/API GET; mocked hydrated forms and API/provider contracts                         |
| No server-only module enters the client bundle               | PASS — server-only guards, public-content import restriction, production build and 25 client chunks scanned without credential/provider/Google auth markers |
| One App Router implementation                                | PASS — only src/app; old root app/components/lib are absent                                                                                                 |

Additional evidence: clean `npm ci --ignore-scripts`, compatible `npm ls`, zero audit vulnerabilities; non-root standalone boot on Node 24.21.0; 16 initial assets and icon/OG/metadata routes served; credential-free API 400/422/200/500/405 checks; no horizontal overflow on home/product/demo/support at 320/390/768/1440px; reduced motion, menu/focus and workflow keyboard controls exercised. Optional webpack analysis builds and generates reports. Detailed scope is in [Phase 1 QA](qa/phase-1.md).

This foundation gate is not new-design, public-content, full accessibility, live-integration or release acceptance.

## Preserved Phase 0 evidence and later-phase limits

- [Baseline audit](qa/baseline.md), [claims register](content/claims-register.md), [route migration map](content/route-migration.md) and [asset manifest](design/assets.md) remain the inventory. Their original paths describe the historical snapshot; relocation notes identify current paths.
- Current product acceptance and approved synthetic capture/export sets remain unestablished. Use explicitly labelled representative examples until Phase 3 verifies release capabilities, formats, Packs, citations/counts and exports. No claim was promoted to Verified available/Pilot in Phase 1.
- Company identity, programme rights, biographies, security/provider/residency guarantees and sign-in URL remain unverified. Follow specification §15 omission/fallback rules. Inherited five-state copy, excluded request-management visuals and unsupported programme/security/response claims require replacement in Phases 2–5.
- Demo ownership/commitments, isolated staging Sheet/test inbox, shared-limiter provisioning and analytics decision remain Phase 6 inputs. Current limiter, duplicated schemas, provider logging and Vercel integration are unchanged. No live analytics delivery or staging writes were verified.
- Full axe/manual screen-reader, Firefox/WebKit, zoom/forced-colour, performance, legal review, release/rollback metadata and live domain/TLS/header checks remain later gates. Baseline Chromium checks do not establish those results.
- Existing `.env.docker` is preserved and excluded from image/upload contexts. Compose still expects `.env.docker.local` and an intended test key; credential-free QA uses plain Docker without either.
- Google fonts still need build-time network access; the build needs no production credentials. New licensed local fonts are Phase 2 work.

## Phase tracking

| Phase | Scope                                      | State                            |
| ----- | ------------------------------------------ | -------------------------------- |
| 0     | Baseline and public truth                  | Complete; limitations recorded   |
| 1     | Supported foundation and source boundaries | Complete; local exit gate passed |
| 2     | Visual system and prototypes               | Next; not started                |
| 3     | Content and asset production               | Not started                      |
| 4     | Homepage and workflow                      | Not started                      |
| 5     | Product, solution, and supporting pages    | Not started                      |
| 6     | Conversion reliability and analytics       | Not started                      |
| 7     | Release QA and cleanup                     | Not started                      |
| 8     | Controlled launch                          | Not started                      |
| 9     | Ongoing improvement                        | Not started                      |

## Working-tree handoff

Branch remains `redesign/marketing-v2`; the Phase 0 baseline commit is `2ea134641a899a4cd65e9594d1bf6a5f6838ee2a`. Initial implementation status showed only untracked `.claude/`, which remains untouched. Phase 1 implementation, source relocations, tests, configuration and documentation are recorded in the commit containing this handoff, at the user's request. Local configuration and `.claude/` are excluded. No push was requested.

No branch change, push, merge, unrelated cleanup, product-repository write, Sheet setup, deployment, DNS/secret change or real notification occurred. Local tools and browser artifacts are ignored. Refresh git status before the next phase and preserve all user changes.
