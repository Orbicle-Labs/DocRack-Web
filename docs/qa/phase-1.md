# Phase 1 — supported foundation and source boundaries

**Verification:** 11–12 September 2026. Local implementation only; no deployment or live integration exercise.

## Implementation

- Node **24.21.0** is pinned in package engines, `.nvmrc`, both Dockerfiles and CI (via `.nvmrc`). Local checks use the official Windows archive, verified against its SHA-256 release manifest, in ignored `.local-tools/`. The machine-wide Node installation is unchanged.
- Next **16.3.4**, React/React DOM and their types **19.3.0**, matching Next ESLint/analyser packages, Framer Motion **13.2.0**, Lucide **1.45.0**, and Sonner **2.0.8** resolve without invalid peers. Strict TypeScript and Tailwind 3.4 remain.
- Google auth **11.0.2** replaces the old gaxios/uuid dependency chain. Its lazy `GoogleAuth().getClient().request()` boundary and the exact RAW Sheets append contract are covered by mocks. No real ADC or provider access was exercised. Targeted transitive advisory updates and lint-staged **17.5.1** leave the final install with **zero npm audit vulnerabilities**.
- ESLint CLI/flat config replaces `next lint` and `.eslintrc.json`. Husky uses its existing shell hook with flat config; the obsolete package-level hook declaration was removed. New React rules prompted two small compatibility fixes: route-keyed header state closes the menu on navigation, and step index refs update in event handlers instead of during render.
- All root source moved under `src/`. The root layout owns HTML, fonts, metadata and providers; `(marketing)/layout.tsx` owns the header, main, footer and skip link. Root error/404 content has an independent main landmark. APIs remain outside the marketing group.
- Sheets, notifications and the current limiter are guarded by `server-only`. Form submission, hooks and SEO helpers have separate directories. Existing copy moved to `src/content/pages/`; no redesigned copy, visual system or product claims were introduced.
- The typed route/content registry lists **16 published pages**, **7 planned destinations**, and **3 active redirects**. Navigation accepts only published paths; the sitemap reads publication/indexability independently of header/footer links. Four future product redirects remain inactive. The final redesigned launch scope remains nineteen canonical pages.
- Vitest/RTL and localhost-only Chromium Playwright suites now run in CI before the existing main-only deployment job. Unit tests do not load Next env files; provider calls are mocked. Browser tests abort external requests and intercept form POSTs before the application server.
- `.dockerignore` now excludes all environment files except the example, credentials and local tools. `.gcloudignore` applies the same protection to future source uploads. Existing `.env.docker`, private config, keys and `.claude/` were preserved; none was printed or used for tests.

Version selection used the [Next 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16), the [official Node release manifest](https://nodejs.org/dist/v24.21.0/SHASUMS256.txt), npm package/peer/engine/license metadata, and installed Google auth documentation. Primary runtime packages use MIT, ISC or Apache-2.0 licenses; no new commercial SDK or media license was introduced. Next's ordinary build uses Turbopack; `npm run analyze` explicitly uses webpack and writes reports without opening a browser.

## Validation evidence

| Check                                                                   | Result                                                                                                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci --ignore-scripts` on Node 24.21.0                               | PASS — lockfile reproduces; zero audit vulnerabilities                                                                                                              |
| `npm ls --depth=0`                                                      | PASS — compatible installed dependency tree                                                                                                                         |
| `npm run lint`                                                          | PASS — explicit ESLint CLI, zero warnings                                                                                                                           |
| `npm run check-types`                                                   | PASS — strict source and test type checking                                                                                                                         |
| `npm test`                                                              | PASS — 45 tests across 4 files                                                                                                                                      |
| `docker build -t docrack-web:phase1 .` / `npm run build` inside builder | PASS — Next 16.3.4 Turbopack, 26 generated static entries, both APIs dynamic; no env files or credentials supplied                                                  |
| Standalone boot                                                         | PASS — Node 24.21.0, non-root UID 1001, bound to localhost:3100 for QA                                                                                              |
| Image credential/bundle inspection                                      | PASS — no env files/keys/integration configuration; 25 client chunks contain no credential names, provider endpoints or Google auth implementation markers          |
| Image HTTP checks                                                       | PASS — 16 initial static assets, logo, favicon, automatic icons, OG, robots and sitemap served; nosniff retained                                                    |
| Credential-free API smoke                                               | PASS — both endpoints return GET 405, malformed 400, invalid 422, honeypot 200 and missing-config 500; no provider writes                                           |
| `npm run test:e2e` against the standalone image                         | PASS — 23 Chromium tests; all sixteen pages, redirects with query preservation, 404, hydrated mocked forms, menu/step keyboard behaviour                            |
| Responsive inspection                                                   | PASS for foundation reflow — home, product, demo and support at 320/390/768/1440px, no page-wide overflow, reduced motion, loaded images and visible headings/forms |

The contract suite covers all four audit-count strings, malformed and invalid JSON, per-field errors, existing email/name normalisation, honeypot short circuit, both thresholds/reset windows, persistence ordering, awaited notification, storage failure and non-fatal email failure. Form tests cover invalid-field focus, exact JSON payloads, duplicate-click prevention, server 422 focus/mapping, Retry-After, draft preservation, network retry and genuine success.

Screenshots are generated under ignored `test-results/foundation-responsive-shell-and-forms-at-<width>px-chromium/`. The QA report contains the browser test results in ignored `playwright-report/`. Representative openings and form screenshots were visually inspected at desktop, tablet and narrow mobile widths. Full-page captures explicitly scroll/load lazy images before capture; initial captures without this step were replaced.

## Limits and follow-up

- This gate preserves current functionality; it does **not** approve the inherited visual design or public claims. The existing five-state copy, unsupported programme/security/SLA wording, small screenshot evidence, and old visual scenes remain recorded Phase 2–5 replacement work. The new six-state prototype must be built from the specification, not these screenshots.
- Browser verification is Chromium only. Full axe, screen-reader, Firefox/WebKit, zoom/forced-colour, performance and release QA remain their later phase gates. No live analytics delivery, current-product capture attestation or staging integration is claimed.
- Shared schemas, trim-before-validation, trusted proxy handling, provider timeouts, safe logging, Firestore counters and the analytics adapter remain Phase 6. Tests deliberately pin the current validation behaviour, including email whitespace rejection; that expectation must change with the explicitly scoped schema migration.
- Google fonts still require build-time network access. Both build paths need no production credentials. Licensed new local fonts are Phase 2 work.
- Vitest emits a forward-looking Vite warning about ESM syntax in a CommonJS package's `.ts` config; tests pass using the current supported loader. A transitive `node-domexception` deprecation notice is informational. Neither is a skipped check or suppressed failure.
- An intermediate browser rerun started during Docker's asynchronous removal of the prior temporary container and failed to connect. After starting the final container, the full suite passed. A container smoke initially combined requests under Next's forwarded loopback identity and hit the intended limiter; separate synthetic forwarded identities resolved the fixture issue.

No phase beyond Phase 1 was implemented. Next: specification §13 Phase 2 — the new visual system and reviewable prototypes.

## Final review

- `npm run analyze` passed in the credential-free Docker builder using webpack; client and Node reports were generated under `.next/analyze/`. The unused Edge report notes that no Edge bundles were parsed.
- File-scoped Prettier and `git diff --check` passed. Thirty local documentation links resolve; Markdown fences are balanced.
- All 82 original source files have their intended destination. All 26 physical assets match the original Git blobs byte-for-byte. The tracked `.env.docker` is unchanged.
- Local standalone image checked: `docrack-web:phase1` (image ID `sha256:ab789b6ee5049465a737fbe35df9abf69e11ca0aa1f71931173afa7cf2713a67`). The subsequent analyser-only configuration sets `openAnalyzer: false`; its ordinary Turbopack build and webpack analysis both passed. Runtime rendering and provider behaviour are unchanged by that setting.
- Temporary local QA containers were stopped at handoff. Browser screenshots/reports and the portable Node/browser tools remain ignored local artifacts; no service is deployed by these checks.

Commit verification: the initial lint-staged run exceeded the Windows command-line limit on the source relocation. The hook now caps argument batches at 6,000 characters; no checks were disabled. The failed hook restored the original staged state before retry.
