# Phase 2 — visual system and reviewable prototypes

**Verification:** 12–13 September 2026. **Baseline:** `1486ee4`, branch `redesign/marketing-v2`. Initial status contained only untracked `.claude/`, preserved throughout. Phase 2 is recorded in the commit containing this report at the user's subsequent request; no push or deployment was requested.

## Evidence

| Check                                                | Result                                                                                                                                                                                                                                         |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ESLint (`npm run lint`)                              | PASS, zero warnings                                                                                                                                                                                                                            |
| TypeScript (`npm run check-types`)                   | PASS                                                                                                                                                                                                                                           |
| Mocked unit/integration/component suite (`npm test`) | PASS, 45 tests across 4 files; existing form and provider contracts unchanged                                                                                                                                                                  |
| Standalone production build                          | PASS, `docker build -t docrack-web:phase2 .` runs `npm run build`; Next 16.3.4, 26 generated entries, both APIs dynamic, no env/keys supplied                                                                                                  |
| Production browser suite (`npm run test:e2e`)        | PASS, 29 Chromium tests against the credential-free localhost image                                                                                                                                                                            |
| Route compatibility                                  | All sixteen existing pages return 200; existing query-preserving 308 redirects, 404 and API GET 405 retained                                                                                                                                   |
| Responsive prototypes                                | `/`, `/product`, `/book-demo` at 1440×1000, 768×900, 390×844, 320×740; no page-wide overflow; all six outcome selections also checked at each width                                                                                            |
| Accessibility scan                                   | Zero axe violations for WCAG A/AA tags on the twelve prototype page/viewport combinations                                                                                                                                                      |
| Keyboard                                             | Six native state buttons, exact-source activation, source focus, Escape/return-to-result, Product/Solutions disclosures, product details, skip link, modal focus wrapping, Escape, focus restoration, route close and desktop breakpoint reset |
| Mobile forms                                         | First field visible after the form anchor; successful intercepted submission at all four widths; controls and agenda remain reachable; no overlay CTA                                                                                          |
| Reduced motion/fallback                              | Responsive suite uses reduced motion; source/result HTML and citations remain legible with JS and fonts blocked                                                                                                                                |
| Additional focus inspection                          | Mobile form, 768×420 menu scrolling and forced-colour keyboard source focus inspected; [measurements](phase-2-measurements.json)                                                                                                               |
| Formatting/diff                                      | File-scoped Prettier and `git diff --check`; local documentation links and screenshot targets checked                                                                                                                                          |

No real form POST, Google Sheets append, notification send, setup-sheet script, live analytics validation, deployment or product-repository write was performed. Browser suites intercept form POSTs before the server, block external hosts, and stub the inherited analytics script. The image has no credentials even if an interception were to fail.

The obsolete baseline workflow-tab assertion was replaced by explicit Phase 2 source/state keyboard coverage. Remaining baseline route/form checks were retained. The initial browser run found native-dialog Shift+Tab could reach browser chrome; explicit first/last focus wrapping fixed it, and the complete suite passed afterward. An initial sandboxed Vitest invocation did not finish promptly; the approved worker-capable run passed. Vite's existing forward-looking configuration warning remains informational.

## Contrast and font checks

Computed from the implemented palette using WCAG relative luminance. Full values are retained in [phase-2-measurements.json](phase-2-measurements.json). Axe additionally checks rendered page text.

| Pair                                        | Ratio                  |
| ------------------------------------------- | ---------------------- |
| Ink / ivory                                 | 13.74:1                |
| Muted text / ivory                          | 5.64:1                 |
| White / forest                              | 12.19:1                |
| Muted text / forest                         | 7.23:1                 |
| Ink / citron                                | 12.05:1                |
| Control boundary / white, ivory, soft       | 3.87:1, 3.47:1, 3.16:1 |
| Focus / white, ivory; citron focus / forest | 7.80:1, 6.98:1, 9.56:1 |
| Six state text colours / white              | 6.30:1–8.45:1          |

Fonts are local WOFF2 with the original family licences. Chromium reports custom Manrope glyphs for the complete `₹5,000` amount; the Indian digit grouping and Asha Rao form identity are exercised in the browser. Instrument Serif remains an optional editorial accent. Four files total 81.2 KiB, under the specified combined 160 KiB font target. This is not a full page-performance or layout-shift measurement.

## Visual inspection and artifacts

The [design direction](../design/direction.md) indexes the original board and all retained screenshots. Desktop has an editorial split and broad side-by-side source panel. Tablet stacks the opening and retains readable side-by-side review. Phones stack result before source; 320px uses one-column state controls, wrapped citations and normal document text. Product uses six connected workflow steps, Recipe rows and a fixed Run snapshot; the demo form follows the short mobile introduction before the agenda.

Automated screenshots remain under ignored `test-results/`; selected final captures are retained under `docs/design/screenshots/phase-2/` for review and future handoff. Evidence-only screenshots suppress the sticky shell solely during capture so it does not overlay a tall crop. Other screenshots show the actual shell. The board is an original internal HTML artifact outside public route delivery.

## Phase 2 exit gate

- PASS — original visual direction reviewable at 1440, 768 and 390px, plus 320px reflow.
- PASS — new homepage opening, source-review composition, representative product/demo pages; no inherited homepage section sequence or styling template.
- PASS — category, CTA, result and evidence readable without animation; 1280×720 opening CTA verified.
- PASS — all six states and source/navigation/form keyboard controls work.
- PASS — form easy to reach on mobile, with a direct anchor and accessible controls before the agenda.

This is the local Phase 2 prototype gate. Founder feedback, current authenticated-product capture/export acceptance, final core page copy, security/legal truth, Firefox/WebKit and actual-device checks, manual screen-reader/full zoom/OS scaling, performance and release checks remain outstanding for their later phases. Focus/contrast spot-checks and axe do not establish complete WCAG conformance.

Next: Phase 3 only after authorisation, as specified in [CURRENT_PHASE](../CURRENT_PHASE.md). No Phase 3, push or deployment occurred. The subsequent Phase 2 commit does not change the prototype gate or clear the later-phase limitations.

Final review: all 29 browser tests passed against the final image, `docrack-web:phase2` (image configuration ID `sha256:ca08ca0d9de93fddcb3187d38b52e9b04a7e16dc44d9fc8ef658457fe98d12d9`). Twenty-one screenshots are retained. Documentation targets resolve and code fences are balanced. A baseline comparison confirms both API handlers, server integrations, browser submission helper, package/lockfile, route registry, sitemap, redirects/config and tracked local env configuration are unchanged. The temporary credential-free QA container was stopped at handoff.
