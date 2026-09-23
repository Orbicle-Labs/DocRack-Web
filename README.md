# DocRack — marketing website

This repository contains the public DocRack website and demo/support enquiry backend. The authenticated audit product lives separately in `../DocRack`.

The owner has authorised a Phase 7 local checkpoint and **Phase 8 local release preparation**, deferring items 1–6 until hosting. The [checkpoint decision](docs/qa/phase-7-checkpoint.md) records that scope; [current status](docs/CURRENT_PHASE.md) identifies the active milestone. Full release acceptance is not certified: product/legal/device/staging evidence, protected preview/traffic/rollback and three mobile LCP misses remain deferred. The old `8f9fa9b` pipeline failed lint and skipped deployment; the tested local repair has no new remote CI result. Analytics remains disabled and legal publication holds remain. Historical [follow-up QA](docs/qa/phase-7-followup.md) and [operations](docs/operations/enquiries.md) retain the evidence.

## Implementation

Node 24.21.0, Next.js 16.3.4, React 19.3.0, strict TypeScript, npm and standalone Docker output. The lockfile is authoritative. Nineteen canonical pages include two noindex legal holds; seventeen pages enter the sitemap. Seven permanent redirects preserve queries and browser fragments.

- `src/app`: App Router pages, metadata, error boundaries and Node API handlers. No parallel root application.
- `src/components`, `src/styles`: responsive UI and labelled synthetic demonstrations.
- `src/content`: route registry, copy, claim references, six-state fixtures and asset provenance.
- `src/lib/forms`, `src/lib/server`: shared validation, request controls, rate limiting and provider integrations.
- `src/lib/analytics`: disabled-by-default, allowlisted optional analytics.
- `public`: identity, licensed local fonts and illustrative assets. No genuine working-paper download.

The [marketing specification](DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md) governs the rebuild; [AGENTS.md](AGENTS.md) governs project work. Product plans and website illustrations are not current product acceptance evidence. Historical reports remain under `docs/qa`.

## Development

Use the Node version in [.nvmrc](.nvmrc):

```powershell
npm ci
npm run dev
```

Development normally uses port 3000. During isolated QA leave existing 3000/8000 services alone and use the container on 3100 below. Fonts are vendored; the build requires no production credentials or font-provider connection.

Only when explicitly configuring test integrations, copy [.env.example](.env.example) to a missing `.env.local`. Preserve existing files. Compose expects **`.env.docker.local`**, not `.env.docker`; its production profile also mounts `secrets/gcp-sa-key.json`. Compose is an integration workflow and is not used for credential-free QA. Cloud Run uses its attached service identity.

## Local production release QA

Build without env-file/key mounts, then run on loopback only:

```powershell
docker build -t docrack-web:phase7 .
docker run --detach --rm --name docrack-web-phase7-qa --publish 127.0.0.1:3100:3000 --env FORM_ALLOWED_ORIGINS=http://127.0.0.1:3100 docrack-web:phase7
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:3100'
$env:QA_PHASE = '7'
$env:QA_RUN_ID = 'review-20260923' # Choose a new unused suffix for each QA session.
npm run lint
npm run check-types
npm test
npm run check-content
npm run check-assets
npx playwright install chromium firefox webkit
npx playwright test --config playwright.phase7.config.ts
node scripts/release-audit.mjs
# After browser suites finish, without competing QA load:
node scripts/measure-pages.mjs
node scripts/lighthouse-pages.mjs
docker stop docrack-web-phase7-qa
Remove-Item Env:PLAYWRIGHT_BASE_URL, Env:QA_PHASE
```

When reusing this checkout's ignored tools, put `.local-tools/node-v24.21.0-win-x64` on PATH and set `PLAYWRIGHT_BROWSERS_PATH` to the absolute `.local-tools/browsers` path. Browser installation is unnecessary if those exact engines are already installed. The Phase 7 config runs the complete retained suite in Chromium, Firefox and WebKit with one worker and separate reports; it sets `QA_PHASE=7` to preserve historical screenshots. `npm run test:e2e` remains the default Chromium CI suite. Without an external base URL it starts a production server on 3100 after a build.

Vitest does not load Next env files and blocks unmocked fetch. Browser form POSTs and optional analytics transport are intercepted. The QA container has no provider credentials. Native skip-link checks now use actual Tab/Enter in all engines, with and without JavaScript; ordinary-link activation helpers retain their labelled Windows WebKit limitation. Automated browser and axe checks do not establish physical-device, Safari keyboard-settings, screen-reader or actual zoom acceptance. See the follow-up for exact results; a passing browser suite alone does not close Phase 7.

`check-content` and `check-assets` each execute the same 24-test suite, also included in `npm test`. `release-audit.mjs` inventories/hashes public assets and checks specified obsolete phrases, duplicate runtime roots and unsafe public file types. This limited scan supplements manual review; it is not a general secret scanner. After captures, `node scripts/release-board.mjs` refreshes the offline board/hash manifest and `node scripts/check-release-docs.mjs` checks local documentation/image targets.

Pass additional documents to include new evidence without changing historical reports, for example `node scripts/check-release-docs.mjs docs/qa/phase-7-followup.md docs/qa/phase-8-preflight.md docs/PHASE_8_PROMPT.md docs/operations/enquiries.md`. This checks local file targets; it does not validate remote URLs or Markdown fragment anchors.

`measure-pages.mjs` records 57 cold local contexts. `lighthouse-pages.mjs` records three simulated-mobile runs for Home, Product, Documents and Demo using a separate local Lighthouse installation (13.4.1 here). Default module: `.local-tools/performance/node_modules/lighthouse/core/index.js`; `LIGHTHOUSE_MODULE` can select an installed alternative. Both refuse remote targets. `QA_PHASE` accepts 5, 6 or 7; select 7 for this candidate. Default output remains Phase 5 for historical compatibility. Set a unique `QA_RUN_ID` (lowercase letters, numbers and single hyphens) for follow-ups; never overwrite historical evidence. Measurement/audit JSON writes fail if the file exists. Browser JSON/HTML results use `test-results-phase7/phase-7-<run>/` and `playwright-report-phase7/phase-7-<run>/`; captures use `docs/design/phase-7-<run>/`. Do not reuse a browser run label. Lab evidence is not field p75 or INP.

`npm run assets:produce` regenerates illustrative/brand artifacts from controlled local inputs, not product captures or exports. `npm run analyze` performs optional webpack bundle analysis; normal builds use Turbopack. Use file-scoped Prettier and `git diff --check`; `npm run format` rewrites the repository.

## Enquiry contracts and operations

| Endpoint                   | Fields                                                           | Sheets tab / ordered columns                                       |
| -------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| `POST /api/demo-booking`   | `fullName`, `email`, `companyName`, `auditCount`, optional `_hp` | Demo Bookings: Timestamp, Full Name, Email, Company, Annual Audits |
| `POST /api/support-ticket` | `fullName`, `email`, `message`, optional `_hp`                   | Support Tickets: Timestamp, Full Name, Email, Message              |

Audit-count values remain `1-10`, `10-50`, `50-100`, `100+`. Names/values are normalised through shared schemas. Sheets RAW persistence precedes awaited bounded best-effort internal Resend notification. Saved enquiries return 201 even if notification fails; no visitor email or calendar reservation is created. Ambiguous appends are never automatically retried.

Malformed JSON returns 400, schema errors 422, rate limits 429 with Retry-After, storage failures 500 and GET 405. Additional origin/size/content-type guards return 403/413/415. Nonempty honeypots return generic 200 without persistence. Forms preserve pre-hydration typing and failed drafts, prevent concurrent clicks and focus errors/receipts.

Firestore transaction counters implement 3 demo attempts/20 minutes and 5 support attempts/30 minutes. Keys are HMAC-derived and contain no form values. The bounded in-process fallback prunes expired entries and emits degradation signals; it does not enforce a global limit. Real multi-instance, TTL, ingress and alert delivery acceptance remains pending.

`FORM_ALLOWED_ORIGINS` must list approved exact origins; blank fails closed. Missing-Origin requests default to rejected. Default shared ingress identity ignores arbitrary forwarded headers. Per-client operation requires separately verified ingress overwrite and bypass restrictions. The primary limiter requires `FIRESTORE_PROJECT_ID`, `FIRESTORE_DATABASE_ID` and server-only `RATE_LIMIT_HMAC_SECRET`. Other configuration and ownership/retention decisions are in [.env.example](.env.example) and the [enquiry runbook](docs/operations/enquiries.md).

Optional analytics remains disabled. The strict event validator loads only for an enabled, allowed event; pending events recheck configuration and DNT/GPC before sending. Form success never waits for telemetry. No live provider delivery, product residency or certification is inferred. Production CSP allows inline Next bootstrap/JSON-LD; do not describe it as blocking inline scripts.

Never run `scripts/setup-sheet.mjs` as part of QA, builds or deployment: it mutates tab names/header rows. Local forms can write live records when supplied live credentials.

## Release boundary

The checked-in pipeline deploys qualifying pushes/manual runs on main. **A push or merge to main can release the site.** See [DEPLOYMENT.md](DEPLOYMENT.md) for the concrete release/rollback procedure and [the release report](docs/qa/phase-7.md) for missing evidence. The user explicitly authorised the Phase 7 checkpoint commit/main push and its existing pipeline trigger after reviewing the incomplete gate. That authorisation does not close acceptance gaps or extend to Phase 8 operational work, separate deployment commands, provisioning, secret changes or live enquiry submissions.
