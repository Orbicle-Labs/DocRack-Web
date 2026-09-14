# Marketing rebuild — current phase

**Updated:** 14 September 2026

**Current phase:** Phase 4 — Homepage and signature workflow

**Status:** Independent homepage implementation delivered using the expressly authorised labelled illustrations. All six functional exit conditions pass within the [recorded QA scope](qa/phase-4.md). **The handoff is qualified: mobile LCP misses its target; this is not an all-green release gate. Phase 3's full genuine capture/export gate remains BLOCKED.** Phase 5 has not started.

**Baseline / repository:** `49b000f` (independent Phase 3 content/assets), branch `redesign/marketing-v2`. The user authorised a local Phase 4 commit on 14 September. The implementation and this handoff are recorded in the commit containing this file; its parent is `49b000f`. This commit does not close the LCP or product-evidence gates. Last phase with its full gate completed: Phase 2, `c3e12ff`. No founder visual approval is inferred.

**Exact next action:** review the [Phase 4 QA](qa/phase-4.md), [screenshots](design/phase-4/index.html) and committed implementation. Retain the mobile LCP optimisation task and blocked product-evidence intake. The user requested the local Phase 4 commit only. Stop before Phase 5, further commits, push, deployment or live-service changes. A [copyable Phase 5 prompt](PHASE_5_PROMPT.md) is prepared for a later instruction; it is not being executed now.

## Implemented paths

- Homepage route, `src/components/sections/home/{Workflow,Chapters}.tsx`, `src/styles/home.css`: eight chapters in specification order, established visual direction, truthful commercial actions, separate procedure examples, six-state coverage, reviewer control, paper annotations and governance evaluation questions.
- `src/components/product-demo/WorkflowViewer.tsx`, retained `src/components/demos/SourceReview.tsx`: accessible six-step viewer, source selection/focus/return and native six-step transcript with exact Traces. Initial Review remains readable before JavaScript; no source/step selection approves anything.
- `src/content/pages/home.ts` and the existing `launch.ts`/fixtures: same P2P identity/amounts/versions and draft state throughout; credit/IFC stay separate. Only the route registry's homepage content pointer changes; paths/redirects/nav/sitemap stay intact.
- Twelve unused legacy homepage sections and unused copy removed; shared motion scenes, hooks, solution data and company/security copy retained for existing pages.
- `tests/e2e/phase-4.spec.ts`, `playwright.phase4.config.ts`, expanded content check and `scripts/measure-homepage.mjs`; isolated ignored browser report directories. README/DEPLOYMENT, claims, route and asset registers updated. Regular homepage accent font preloaded/reused without new font bytes.

## Validation and exit gate

Lint, strict types, 69 mocked/content/asset tests, credential-free standalone build, **44 Chromium + 10 Firefox + 10 WebKit checks** pass. The full homepage and steps are tested at 1440/1280/1024/768/390/320px; keyboard/touch source inspection, focus return, reduced motion, no-JS/blocked-font/media fallback, 200% text-size reflow, CTA routes and review invariants pass. Eighteen new homepage axe scans have no violations. Scoped formatting, documentation links and diff checks pass. [48 retained screenshots](design/phase-4/index.html) are website illustrations, never authenticated-product evidence.

Lighthouse mobile median **94 Performance / 100 Accessibility / 100 SEO**. Median simulated LCP **3.07 s** (FAIL against 2.5 s). All three CLS values are 0. Initial JS maximum 203.9 KiB gzip including the walkthrough; initial measured transfer maximum 318.7 KiB. JS, page-transfer, font/media and CLS budgets pass. Field INP/p75, actual mobile Safari, complete assistive-technology/OS scaling and release acceptance are not established.

| Phase 4 functional condition                                   | Result                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Eight chapters at required widths                              | PASS — all six widths, three engines                                     |
| Audience / inputs / procedure / reviewer / output identifiable | PASS for content coverage; fresh-reader timed comprehension not measured |
| Keyboard/touch source-open and focus/scroll                    | PASS                                                                     |
| Example remains accurate across steps                          | PASS — no approval; draft paper                                          |
| CTA/routes and no placeholder downloads                        | PASS                                                                     |
| No-motion / pre-hydration readability                          | PASS — SSR Review and native transcript/annotations                      |

## Remaining work by owner

**From implementation:** mobile LCP 3.07 s exceeds 2.5 s; investigate the heading's critical CSS/font/render path and main-thread work and repeat the three-run production check before release. Other pages retain Phase 5 adoption and existing legacy claim limitations. Full release/accessibility/device/legal/live-integration checks remain later-phase work.

**From the user/product owner:** genuine captures/export remain deliberately blocked. Supply approved synthetic artifacts with product commit, Run, Recipe/input versions and approval provenance or separately authorise an identified isolated synthetic session. Apply the [intake gate](content/product-evidence.md) before publication; never seed/reset the product or fabricate artifacts. Founder visual review and brand/legal/company/security/data-handling facts remain their existing inputs.

## Phase 3 evidence status — preserved

The independent content/illustration production in `49b000f` remains verified: nineteen launch copy/metadata/brief candidates, separate fixtures, six responsive illustrative scenes, source/provenance/claims/assets registers and OG output. [Phase 3 QA](qa/phase-3.md) retains its exact evidence. **Full gate NOT PASSED:** no genuine current-product capture or synthetic working-paper export was supplied; actual artifact confidentiality/macro/connection/source-link inspection remains NOT RUN. Independent Phase 4 authorisation does not change this status.

## Preservation and stop boundary

Both enquiry APIs/forms/fields/statuses, auditCount values, Sheets-first persistence and best-effort internal notification are unchanged. Published routes, redirects, navigation/sitemap, dependencies, public assets, secrets/env/local configuration and untracked `.claude/` are preserved. No sibling-repository writes or product-environment access, no live POST/provider/notification, no setup-sheet, no deployment or push. The subsequent local Phase 4 commit is explicitly requested by the user. Services on 3000/8000 were untouched. The temporary credential-free `docrack-web-phase4-qa` container on 3100 is stopped at handoff; final runtime image configuration is `sha256:6cb812f339b508451dc166fcf22b7976cd0db9adc18d9db94b946f42e67749e8`.

| Phase | Scope                    | State                                                                               |
| ----- | ------------------------ | ----------------------------------------------------------------------------------- |
| 0     | Baseline/public truth    | Complete, with recorded limitations                                                 |
| 1     | Foundation               | Complete, `1486ee4`                                                                 |
| 2     | Visual system/prototypes | Complete, `c3e12ff`; no inferred founder approval                                   |
| 3     | Content/assets           | Independent work committed `49b000f`; genuine capture/export gate BLOCKED           |
| 4     | Homepage/workflow        | Implementation committed with this handoff; functional checks pass; LCP budget open |
| 5     | Other pages              | Not started                                                                         |
| 6     | Conversion/analytics     | Not started                                                                         |
| 7     | Release QA/cleanup       | Not started                                                                         |
| 8     | Controlled launch        | Not started                                                                         |
| 9     | Ongoing improvement      | Not started                                                                         |
