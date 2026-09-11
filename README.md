# DocRack — marketing website

DocRack is an AI-assisted internal-audit fieldwork platform for Indian enterprises. It turns company policies, regulations, audit procedures, documents, and data into repeatable tests, source-linked exceptions, findings, and review-ready working papers.

This repository contains the **public website and its demo/support enquiry backend**. The authenticated audit product is maintained separately in `../DocRack`.

## Rebuild status and project documents

The website is being prepared for a complete redesign. The new specification and supporting instructions are ready; implementation starts at **Phase 0**. Check [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md) for the latest actual state.

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

Versions below are the lockfile/configuration snapshot checked on 11 September 2026. Refresh this table when implementation changes them.

| Area           | Implemented now                                                    | Planned rebuild                                                               |
| -------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Framework      | Next.js 15.5.18, React 18.3.1, App Router                          | Next.js 16 and compatible React 19                                            |
| Runtime        | Node 20 in `.nvmrc`, Docker, and CI; package engines `>=20`        | Supported Node 24 LTS patch, aligned everywhere                               |
| Language/style | TypeScript 5.9.3, Tailwind 3.4.19, custom CSS tokens               | Strict TypeScript, fresh tokens and components; retain Tailwind 3.4 initially |
| Source layout  | Root `app/`, `components/`, `lib/`                                 | Source moves under `src/` in Phase 1                                          |
| Fonts          | Inter and JetBrains Mono via `next/font/google`                    | Manrope with limited Instrument Serif accents                                 |
| Forms          | React Hook Form, Zod, inline feedback and Sonner                   | Preserve contracts; redesign presentation and unify schemas                   |
| Storage        | Google Sheets through server-side ADC                              | Preserve existing enquiry records and tab/column layout                       |
| Email          | Resend REST notifications to the internal team                     | Preserve best-effort delivery after storage; add reliability controls         |
| Abuse control  | Honeypot and process-local IP limiter                              | Shared counters and additional guards in Phase 6                              |
| Analytics      | Vercel Analytics mounted in production; delivery not verified here | Provider adapter, proposed Plausible, disabled until configured               |
| Deployment     | Docker standalone image, GCP Cloud Run, GitHub Actions             | Retain platform and keyless deployment                                        |
| Tests          | Lint/type/build scripts; no website test/e2e scripts yet           | Add focused unit/integration/browser/content/asset checks                     |

This table does not recommend installing Node 20 for new work. The local preparation checks used Node 24.14.0; complete the supported-runtime alignment in Phase 1 before release. Exact target versions are resolved during that phase.

## Run the current site locally

From this repository root:

```powershell
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Stop the dev server with Ctrl+C.

Production form credentials are not required to render pages. With no valid Sheets configuration, a genuine form submission cannot be saved. Do not use production credentials for automated tests or routine visual checks.

Next's Google font integration may need internet access at build time even though font requests are served locally at runtime. Record restricted-network failures accurately; do not disable validation to hide them.

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
npm run build
```

The current `lint` script uses deprecated `next lint`; migrate it in Phase 1. There is no `npm test` or `npm run test:e2e` yet. Do not report those checks as passing until the scripts and suites exist.

The supported container runtime entry point is the Dockerfile's standalone `node server.js`, with public and static files copied into the image. Validate that image during the build/release phases.

For file-scoped Markdown formatting, use the installed Prettier CLI:

```powershell
node node_modules/prettier/bin/prettier.cjs --check README.md DEPLOYMENT.md AGENTS.md CLAUDE.md docs/CURRENT_PHASE.md docs/CODEX_START.md
git diff --check
```

`npm run format` rewrites the whole repository; use scoped formatting for a small documentation change.

For an optional bundle analysis, set `ANALYZE=true` only for the build. The current analyser and framework majors differ, so validate compatibility as part of Phase 1. Do not treat this as a guaranteed working check today.

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

## Deployment and first rebuild session

The checked-in workflow runs checks for pull requests and deploys qualifying main-branch push/manual runs. **Pushing or merging to main can release the site.** Consult [DEPLOYMENT.md](DEPLOYMENT.md) before release work.

To begin the rebuild, open this checkout in a fresh local Codex session and paste the Phase 0 prompt from [docs/CODEX_START.md](docs/CODEX_START.md). The agent should populate the audit artifacts and update [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md), then proceed to implementation phases when requested.
