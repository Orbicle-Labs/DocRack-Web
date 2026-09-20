# Marketing rebuild - current phase

**Updated:** 20 September 2026 (runtime QA measured 15 September; Phase 5 committed 19 September; main integration and Phase 6 prompt prepared 20 September).

**Current phase:** Phase 5 - Product, solution and supporting pages

**Status:** Independent implementation delivered with explicitly labelled synthetic illustrations. The complete launch-content gate is **incomplete**: Privacy and Terms remain noindex holds with internal review drafts awaiting owner/legal approval. **Phase 3 genuine capture/export remains BLOCKED. Phase 4 mobile LCP remains open**, with the new homepage median 3.12 s against 2.5 s. No founder approval or release readiness is inferred.

**Repository:** Phase 5 implementation `85fd025` (parent `0b88094`) was committed on `redesign/marketing-v2`, then fast-forwarded into local `main`. On 20 September the user authorised merging fetched origin/main (`b62efb7`) and pushing main. The commit containing this update preserves both histories; reviewed legacy conflicts retain the verified Phase 5 runtime. See [integration record](qa/main-integration.md). Pre-existing untracked `.claude/` is preserved. Last full phase gate completed: Phase 2, `c3e12ff`.

**Exact next action:** after the authorised merge/push, review the [Phase 6 continuation prompt](PHASE_6_PROMPT.md) and invoke it when ready. Phase 6 is not started. Preserve the genuine-evidence, LCP and legal holds. The merge/push authorisation is specific to this integration; it does not authorise later phase commits, pushes, deployments or live-service work. The existing main push workflow may deploy; Git transfer and workflow/release success are separate results.

## Implemented paths

- All eight product pages, three solution pages, Company, Security, Support, Glossary and Demo; Privacy/Terms hold pages and concrete internal drafts; 404/error recovery. Fourteen Recipe components, six source roles and states, source Traces, versions, immutable completed Runs and explicit human approval boundaries remain central. Additional procedures do not invent executed results or available Packs.
- `src/components/sections/pages/{Editorial,Evidence,ProcedureDetails}.tsx`, `src/styles/pages.css`, recipe/solution/glossary/support content and explicit `src/app/(marketing)` routes provide the shared page system. P2P amounts and unresolved review stay consistent with the homepage; credit/IFC use separate fixtures.
- Route/navigation registries, metadata, breadcrumbs, related links and sitemap cover nineteen canonical paths, seventeen indexable pages and seven single-hop redirects. Four planned product redirects are active; three existing redirects retained. Homepage chapter structure preserved with canonical links.
- Retired fully replaced page shells, motion scenes, copy, ProductFrame, four old route files and eleven unused product PNGs after consumer checks. Original identity/fonts and Phase 3 illustrations retained.
- `tests/e2e/phase-5.spec.ts`, `tests/unit/phase-5.test.tsx`, `playwright.phase5.config.ts`, measurement/Lighthouse scripts, screenshot board and isolated report ignores added. Retained tests adapted for deliberate route/semantic changes. README/DEPLOYMENT, [claims](content/claims-register.md), [assets](design/assets.md) and [route acceptance](content/route-migration.md) updated.

## Validation and exit gate

Lint/types, **73 mocked/unit/content/asset tests**, content/asset scripts and credential-free standalone production build pass. **139 distinct browser checks** pass: 71 Chromium, 24 new-page checks plus 10 homepage checks each in Firefox and WebKit. After the final support success-copy change, the affected form check passes again in all three engines; the complete suite was not redundantly rerun for that string. Exact image provenance is in [QA](qa/phase-5.md).

Six viewport widths from 320 to 1440px, source legibility/bounds, keyboard/touch/focus, menu, reduced motion, forced colours, 200% text reflow, no-JS/blocked-font/media fallbacks, query/fragment redirects, metadata and sitemap are checked. New Phase 5 axe scans: **108, zero violations**, with retained scans also passing. Forms use mocked responses only and are tested after hydration. Seventy-two website screenshots are retained; these are never genuine product evidence.

All 57 local payload contexts have CLS 0. Homepage maximum JS is 200.6 KiB gzip; maximum initial measured transfer across nineteen paths is 403.7 KiB. Three-run Lighthouse medians: home **94/100/100, LCP 3.12 s**; Product/Documents **97/100/100, 2.67 s**; Demo **95/100/100, 2.96 s**. Score/payload/CLS budgets pass; **all four LCP medians fail 2.5 s**. Historical Phase 4's 3.07 s miss is preserved. Field INP/p75 is not established.

| Phase 5 exit condition                                         | Result                                                                                             |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Every launch route has useful reviewed content and next action | PARTIAL - seventeen content pages and two useful legal holds; final Privacy/Terms approval missing |
| Hierarchy, states, Traces, versions and approvals consistent   | PASS within labelled illustrations/content checks                                                  |
| Single-hop redirects with relevant queries/anchors             | PASS - all seven                                                                                   |
| No excluded features, fabricated customers or dead navigation  | PASS within source/content/browser review                                                          |
| No accidental publication of private/unverified content        | PASS for tested website output; actual product artifact inspection remains NOT RUN                 |

## Remaining work by owner

**From implementation, when separately authorised:** optimise the shared mobile LCP critical path and repeat production measurements. Phase 6 should address observed early-input loss before React hydration; current form success/failure tests wait for hydration and do not prove that behaviour. Full device/assistive-technology, analytics/provider, security and release acceptance remain later-phase work.

**From the user/product owner:** founder visual review; responsible entity/contact/jurisdiction and approved legal text; actual retention/deletion/processor/analytics facts; verified company/security/deployment and release/Pack evidence. See both [Privacy](content/legal/privacy-review.md) and [Terms](content/legal/terms-review.md) review drafts. Public holds omit substantive unapproved legal commitments and remain outside the sitemap.

**Phase 3 evidence - BLOCKED:** supply approved synthetic genuine captures/export with product commit, Run, Recipe/input versions and approval provenance, or separately authorise an identified isolated synthetic session. Apply the [intake gate](content/product-evidence.md). Actual artifact confidentiality, macro/connection and source-link inspection remains NOT RUN. No product environment was accessed and no artifacts fabricated. [Phase 3](qa/phase-3.md) and [Phase 4](qa/phase-4.md) historical reports remain unchanged.

## Preservation and stop boundary

Both enquiry POST endpoints, fields/statuses, auditCount choices, Sheets columns/tabs, Sheets-first persistence and best-effort internal notification remain unchanged. Form edits affect presentation copy only, including removing an inherited response-time promise. Dependencies/lockfile, credentials, unrelated local configuration and `.claude/` remain untouched. Phase 5 implementation performed no setup-sheet, live provider/form/notification, sibling-repository write, push or deployment. The later 20 September merge and push are explicitly authorised; the existing main workflow may deploy after successful CI. No manual deployment, production enquiry or cloud/secret mutation is part of this integration.

At the 19 September handoff, Docker inspection confirmed the temporary credential-free `docrack-web-phase5-qa` container on localhost:3100 no longer exists; no additional stop was necessary. Services on 3000/8000 were untouched. Final local image is `sha256:682353359144ac7a4e3fb0df6790059ae7b95b1e5994c65e482183053549e0c4`.

| Phase | State                                                                                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------------- |
| 0     | Baseline/public truth complete with recorded limitations                                                                        |
| 1     | Foundation complete, `1486ee4`                                                                                                  |
| 2     | Visual system/prototypes complete, `c3e12ff`; no inferred founder approval                                                      |
| 3     | Independent content/assets committed `49b000f`; genuine capture/export BLOCKED                                                  |
| 4     | Homepage/workflow committed `0b88094`; functional checks pass, LCP open                                                         |
| 5     | Independent pages implemented and committed with this handoff; legal/content gate partial, product evidence and LCP remain open |
| 6-9   | Not started; no authorisation inferred                                                                                          |
