# Marketing rebuild — current phase

**Updated:** 13 September 2026

**Current phase:** Phase 2 — New visual system and reviewable prototypes

**Status:** Complete through the local Phase 2 prototype exit gate. New visual direction is reviewable; founder feedback has not yet been received. Phase 2 changes are recorded in the commit containing this handoff, at the user's request. Phase 3 has not started. No push, deployment or live-service changes occurred.

**Last completed phase:** Phase 2. Phases 0 and 1 remain complete with their recorded limits.

**Next action:** Review the [original board and prototype screenshots](design/direction.md). When authorised, execute specification §13 Phase 3: establish current product/release and synthetic export evidence; finish source-grounded page copy/metadata and shared fixtures; capture readable current-product scenes and a genuine working-paper export; update the claim and asset registers. Use the selected Phase 2 direction. Do not expand into the full Phase 4 homepage during Phase 3.

## Phase 2 completed work and paths

- New original reference board: `docs/design/references/board.html`; selected direction, implementation index and retained screenshots: [design/direction.md](design/direction.md), `docs/design/screenshots/phase-2/`.
- Design system: `src/styles/{tokens,typography,visual-system}.css`, `src/app/globals.css`, `tailwind.config.js`; warm ivory, forest and restrained citron; original button/field visuals; new `ProductFigure`, `OutcomeLabel`, `Disclosure`.
- Licensed local Manrope variable/Latin Extended and Instrument Serif regular/italic: `public/fonts/` with SIL OFL files; `src/app/layout.tsx` uses local font loading. Four WOFF2 files total 81.2 KiB; no build-time font network dependency.
- New header/footer/navigation in `src/components/layout/`: Product/Solutions disclosures, mobile modal, inert background, explicit focus wrapping, Escape/restoration, route close and desktop reset. Navigation uses published existing routes; the route registry, sitemap and redirects are unchanged.
- Reviewable prototypes on existing `/`, `/#workflow`, `/product` and `/book-demo`; `src/components/demos/{HeroEvidence,SourceReview}.tsx`; canonical fixed display fixture in `src/content/demos/p2p.ts`.
- Six labelled/icon result states, source page/cell and policy v3 §4.2 selection, raw/normalised Traces, immutable Run explanation and explicit human approval boundaries. No authenticated engine or real data execution.
- Demo page uses the existing form contract with new styling and truthful enquiry/success/privacy copy. Unsupported next-day response and absolute no-sharing promises were removed; fields, enums, validation and persistence/notification behaviour remain unchanged.
- Browser coverage: `tests/e2e/phase-2.spec.ts` replaces the retired workflow-tab assertion with meaningful state/source/navigation/form checks. [QA report](qa/phase-2.md) and [measurements](qa/phase-2-measurements.json) record evidence.

## Phase 2 exit gate

| Exit condition                                              | Result                                                                                                                               |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Original new direction reviewable at 1440, 768, 390px       | PASS — homepage opening, source review, representative product and demo screenshots; 320px reflow also checked                       |
| No old homepage layout or UI styling template               | PASS — new editorial split, broad evidence chapter and compact procedure rows; inherited sections are not imported by the prototypes |
| Category, CTA, result and source readable without animation | PASS — reduced motion and JS/font-blocked checks; 1280×720 opening CTA remains visible                                               |
| All six states and keyboard controls work                   | PASS — Enter selection, source focus/return, disclosure/menu controls, Escape and focus wrapping/reset                               |
| Form easy to reach on mobile                                | PASS — short introduction, direct form anchor, fields before agenda, mocked submission at all four widths                            |

Validation: lint and strict types pass; 45 mocked tests pass; credential-free standalone production build passes; 29 Chromium checks pass, including all sixteen existing routes and preserved redirects/form contracts. Twelve axe scans report no violations. Text and control/focus contrast pairs pass their applicable ratios. Source amounts and citations, keyboard focus, mobile form and short-landscape menu were inspected. File-scoped formatting, documentation targets and diff checks pass. Detailed boundaries are in [Phase 2 QA](qa/phase-2.md).

This is a prototype gate, not final content, current-product availability, founder approval or release acceptance. Full eight-chapter homepage/six-step workflow remains Phase 4; remaining page compositions remain Phase 5. Phase 3 capture/export/content evidence, full screen-reader/zoom/device/browser coverage and performance/release gates remain outstanding.

## Preserved Phase 1 implementation and paths

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
- Phase 2 adds axe checks on the three prototypes and a forced-colour keyboard-focus spot-check. Full-site accessibility, manual screen-reader, Firefox/WebKit, zoom/OS scaling, performance, legal review, release/rollback metadata and live domain/TLS/header checks remain later gates.
- Existing `.env.docker` is preserved and excluded from image/upload contexts. Compose still expects `.env.docker.local` and an intended test key; credential-free QA uses plain Docker without either.
- Phase 2 replaced the Google font integration with licensed local WOFF2 files. Builds need neither font-provider access nor production credentials.

## Phase tracking

| Phase | Scope                                      | State                                 |
| ----- | ------------------------------------------ | ------------------------------------- |
| 0     | Baseline and public truth                  | Complete; limitations recorded        |
| 1     | Supported foundation and source boundaries | Complete; local exit gate passed      |
| 2     | Visual system and prototypes               | Complete; local prototype gate passed |
| 3     | Content and asset production               | Not started                           |
| 4     | Homepage and workflow                      | Not started                           |
| 5     | Product, solution, and supporting pages    | Not started                           |
| 6     | Conversion reliability and analytics       | Not started                           |
| 7     | Release QA and cleanup                     | Not started                           |
| 8     | Controlled launch                          | Not started                           |
| 9     | Ongoing improvement                        | Not started                           |

## Working-tree handoff

Branch remains `redesign/marketing-v2`; Phase 1 baseline is `1486ee4`, Phase 0 baseline is `2ea1346`. This session began with only untracked `.claude/`. The user subsequently requested the Phase 2 commit. Existing env files, keys, local configuration and `.claude/` are excluded from that commit and preserved.

No Phase 3 execution, branch switch, push, merge, product-repository write, Sheet setup, real notification, deployment, DNS or secret change occurred. Temporary QA containers were stopped after validation. Local tools and automated reports remain ignored; selected screenshots are retained in the design docs. Refresh status before the next phase and preserve any new user changes.

## What remains for Phase 2

- **Founder:** review the board and desktop/tablet/mobile prototypes linked above, then share acceptance or concrete visual feedback. No credentials, live-service setup or new product captures are required to close this prototype gate. Visual feedback has not yet been recorded; the gate requires reviewable work, not an inferred approval.
- **Implementation:** no required Phase 2 implementation or verification remains. Apply any requested design revisions and rerun the affected checks if feedback changes the prototypes.
- **Later work:** current-product release/capture/export evidence and final source-grounded content belong to Phase 3; the full homepage, remaining pages, conversion hardening and release QA remain their documented phases. Starting Phase 3 is a separate authorisation.
