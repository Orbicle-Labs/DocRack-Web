# DocRack — marketing website

DocRack is an AI-assisted internal-audit fieldwork platform for Indian enterprises. It turns company policies, regulations, audit procedures, documents, and data into repeatable tests, source-linked exceptions, findings, and review-ready working papers.

This repository contains the **public website and its demo/support enquiry backend**. The authenticated audit product is maintained separately in `../DocRack`.

## Rebuild status and project documents

Phase 2 has implemented the new visual system and reviewable homepage/source-review, product and demo prototypes. The full content/capture and remaining page rebuild phases are still pending. Review [the design direction and screenshots](docs/design/direction.md). Check [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md) for the latest actual state.

| Document                                                                           | Purpose                                                                                  |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md](DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md) | New design, sitemap, product truth, migration map, stack, and phased acceptance criteria |
| [AGENTS.md](AGENTS.md)                                                             | Shared project instructions for coding agents                                            |
| [CLAUDE.md](CLAUDE.md)                                                             | Claude entry point to the same shared instructions                                       |
| [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md)                                     | Current phase, evidence, remaining work, and handoff                                     |
| [docs/CODEX_START.md](docs/CODEX_START.md)                                         | Copyable first-session and continuation prompts                                          |
| [DEPLOYMENT.md](DEPLOYMENT.md)                                                     | Existing deployment configuration, staging, release verification, and rollback           |
| [Product specification](../DocRack/DOCRACK_SPEC.md)                                | Canonical product meaning and boundaries                                                 |
| [Product build plan](../DocRack/DOCRACK_BUILD_PLAN.md)                             | Product architecture and intended implementation; not website setup instructions         |

The current website is a source for backend behaviour and route migration. Its design/UI/UX is not a reference for the rebuild. Page count may increase or decrease; the current plan selects nineteen core launch pages.

## Current implementation versus planned changes

Versions below are the lockfile/configuration snapshot checked on 12 September 2026. Refresh this table when implementation changes them.

| Area           | Implemented now                                                   | Remaining rebuild                                              |
| -------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| Framework      | Next.js 16.3.4, React/React DOM 19.3.0, App Router                | New visual composition and page content                        |
| Runtime        | Node 24.21.0 in engines, .nvmrc, both Dockerfiles and CI          | Recheck security patches before release                        |
| Language/style | Strict TypeScript 5.9.3, Tailwind 3.4.19, new ivory/forest tokens | Final page adoption in Phases 3–5                              |
| Source         | src/app, src/components, src/content, src/lib                     | New content and demos in Phases 3–5                            |
| Forms          | Existing React Hook Form/Zod contracts and inline/Sonner feedback | Shared schema and reliability hardening in Phase 6             |
| Integrations   | Server-only Google auth 11.0.2, Sheets and best-effort Resend     | Shared limiter, provider timeouts and safe logging in Phase 6  |
| Analytics      | Existing Vercel integration; delivery unverified                  | Disabled-until-configured adapter in Phase 6                   |
| Tests          | ESLint CLI, TypeScript, Vitest/RTL and Chromium Playwright        | Broader accessibility/browser/content/asset QA in later phases |
| Deployment     | Docker standalone image and main-only Cloud Run pipeline          | No deployment performed in Phase 1                             |

Use the exact Node version in [.nvmrc](.nvmrc), for example with your Node version manager. Phase 1 checks also used a checksum-verified portable Node installation in the ignored local tools directory; the machine-wide Node installation was not changed.

### Source boundaries

- `src/app/layout.tsx`: document markup, fonts, metadata and global providers.
- `src/app/(marketing)/layout.tsx`: header, one main landmark, footer and skip link. Existing public paths are unchanged.
- `src/styles/`, `src/components/demos/`, `src/content/demos/p2p.ts`: Phase 2 visual system and clearly labelled synthetic source-review prototypes.
- `src/content/pages/`: inherited typed copy on the remaining pages, pending replacement. `src/content/routes.ts` records sixteen published pages and seven planned destinations; the sitemap uses publication status, independently of navigation.
- `src/lib/server/`: Sheets, notifications and the current process-local limiter, guarded by `server-only`.
- `src/lib/forms/submit.ts`, `src/lib/hooks/`, `src/lib/seo/`: browser submission, headless interaction and SEO helpers. `@/*` resolves into `src/*`.

Public assets remain in `public/`; their URLs do not change. The four future product redirects remain inactive until replacement pages ship. Phase 0 registers retain historical source paths; the phase report documents the move.

## Run the current site locally

From this repository root:

```powershell
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Stop the dev server with Ctrl+C.

Production form credentials are not required to render pages. With no valid Sheets configuration, a genuine form submission cannot be saved. Do not use production credentials for automated tests or routine visual checks.

Manrope and Instrument Serif are licensed, vendored WOFF2 files in `public/fonts/`, loaded with `next/font/local`. Neither build nor runtime requires a font-provider connection.

### Optional local integration configuration

Create `.env.local` from [.env.example](.env.example) only if it does not already exist, then fill it locally. Preserve any existing values.

```powershell
if (-not (Test-Path -LiteralPath .env.local)) {
  Copy-Item -LiteralPath .env.example -Destination .env.local
}
```

| Variable                         | Used for                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `GOOGLE_SHEET_ID`                | Required to persist enquiries; use a dedicated development/staging spreadsheet      |
| `GOOGLE_APPLICATION_CREDENTIALS` | Local ADC key-file path when needed; not used as a production key file on Cloud Run |
| `RESEND_API_KEY`                 | Optional internal notification delivery                                             |
| `NOTIFY_EMAIL`                   | Internal destination; use a designated test inbox for staging                       |
| `EMAIL_FROM`                     | Optional verified sender override                                                   |

Keep keys in gitignored local files/Secret Manager. Never commit real credentials or print them in task output. The presence of `.env.local` does not make it safe to send test submissions: it can point to live services.

For a new **test** spreadsheet, use these exact tabs and headers:

- `Demo Bookings`: Timestamp, Full Name, Email, Company, Annual Audits.
- `Support Tickets`: Timestamp, Full Name, Email, Message.

Share only the intended sheet with the service identity used by that environment. Existing lead storage must retain its headers and rows.

`scripts/setup-sheet.mjs` is an optional one-time setup utility. It loads `.env.local`, can rename the first tab, and writes header rows. It is not a build, migration, test, or health-check command. Run it only for an explicitly intended setup target.

### Local Docker

[docker-compose.yml](docker-compose.yml) expects **`.env.docker.local`**. A file named `.env.docker` does not satisfy that setting. Create the expected file from the example if missing; configure only test services.

```powershell
if (-not (Test-Path -LiteralPath .env.docker.local)) {
  Copy-Item -LiteralPath .env.example -Destination .env.docker.local
}
docker compose --profile dev up --build
```

The development container mounts this repository at `/app`, uses polling for Windows file watching, and keeps Linux dependency/build-cache volumes separate. It can read a local test key under `secrets/` if supplied.

A production-like local container uses:

```powershell
docker compose --profile prod up --build
```

Both profiles use port 3000, so run one at a time. The current production Compose profile binds `secrets/gcp-sa-key.json` as a file; provision an intended local test key before using that profile. Cloud Run uses its attached service identity instead.

## Current checks

```powershell
npm run lint
npm run check-types
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Vitest runs without Next env loading; Sheets/Resend are mocked and unmocked fetch calls are blocked. Playwright targets localhost only, blocks external traffic, and intercepts form POSTs. It starts a production server on port 3100 after a build; do not point it at live services. The content/asset scripts are still planned, and the baseline Chromium suite is not the full release accessibility or cross-browser gate.

The supported container runtime entry point is the Dockerfile's standalone `node server.js`, with public and static files copied into the image. Validate that image during the build/release phases.

For file-scoped Markdown formatting, use the installed Prettier CLI:

```powershell
node node_modules/prettier/bin/prettier.cjs --check README.md DEPLOYMENT.md AGENTS.md CLAUDE.md docs/CURRENT_PHASE.md docs/CODEX_START.md
git diff --check
```

`npm run format` rewrites the whole repository; use scoped formatting for a small documentation change.

Use `npm run analyze` for optional webpack bundle analysis. Normal `npm run build` uses the Next 16 Turbopack default; the matching analyser runs only in its separate webpack command.

## Enquiry backend

```text
Demo/support form → same-origin API → validation/anti-spam
                 → Google Sheets append → best-effort Resend notification → response
```

- `POST /api/demo-booking`: `fullName`, `email`, `companyName`, `auditCount`, optional empty `_hp`.
- `POST /api/support-ticket`: `fullName`, `email`, `message`, optional empty `_hp`.
- Demo audit-count values: `1-10`, `10-50`, `50-100`, `100+`.
- Genuine persisted submissions return 201. Nonempty honeypots return generic 200 without storage/email.
- Malformed JSON returns 400; validation 422 with field errors; rate limit 429 with Retry-After; storage failure 500; GET 405.
- Sheets is the system of record. Email errors are logged without making a saved enquiry fail.
- Email goes to `NOTIFY_EMAIL`, not the submitting visitor. No calendar reservation is created.
- Notification delivery is awaited so it does not depend on work continuing after the Cloud Run response.

Current limits are three demo requests per 20 minutes and five support requests per 30 minutes per derived IP, **per process**. Counters reset with process restarts and do not provide global enforcement. Expired entries are not actively pruned today.

## Security and data-flow facts

The current Next config sets security headers, including CSP. Production `script-src` still permits `'unsafe-inline'`; the old README's claim that inline scripts were blocked was incorrect.

The repository does not establish live delivery of Vercel Analytics, product tenant isolation, certifications, or India residency. The website workflow targets Cloud Run `asia-southeast1`; the separate product's intended India deployment is a different system.

The rebuild includes claim verification, privacy-text correction, shared abuse control, provider timeouts, and header review. Those requirements remain planned until implemented and tested.

## Deployment and continuation

The checked-in workflow runs checks for pull requests and deploys qualifying main-branch push/manual runs. **Pushing or merging to main can release the site.** Consult [DEPLOYMENT.md](DEPLOYMENT.md) before release work.

Continue from [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md). Phase 2's local prototype gate is complete; review [the direction and screenshots](docs/design/direction.md). The next implementation phase, when authorised, is Phase 3: source-grounded content and asset production. Validation is recorded in [Phase 2 QA](docs/qa/phase-2.md); [Phase 1 QA](docs/qa/phase-1.md) retains foundation evidence.
