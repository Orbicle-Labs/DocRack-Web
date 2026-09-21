# DocRack-Web — deployment and operations

**Documentation refreshed:** 21 September 2026.

This runbook describes the existing website deployment configuration and the planned rebuild release gates. It does not certify the current cloud state, domain mapping, secret values, Sheet sharing, or email delivery. Verify those facts when performing operations.

Phase 1 migrated the runtime and source boundaries and added mocked unit/browser tests. Phase 2 added the visual system and locally served licensed fonts; the build no longer downloads Google fonts. Its standalone image and browser checks are local validation only, not a deployment. Phase 6 implements shared-limiter code, reliability controls and disabled analytics; provisioning, ingress and staging acceptance remain pending. Follow [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md) and [the rebuild specification](DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md).

## 1. Configured deployment topology

```text
GitHub Actions → Workload Identity Federation → Cloud Build
               → standalone Next.js Docker image → Cloud Run

Cloud Run service identity → Google Sheets
Cloud Run + Secret Manager → Resend → internal notification inbox
```

Values below come from the checked-in workflow and previous runbook, not a fresh cloud inspection.

| Setting                 | Configured / recorded value                                                                          | Evidence                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Repository              | `Orbicle-Labs/DocRack-Web`                                                                           | Workflow comments and recorded WIF setup                |
| GCP project             | `docrack-web`                                                                                        | Workflow deploy arguments                               |
| Cloud Run service       | `docrack-web`                                                                                        | Workflow deploy arguments                               |
| Region                  | `asia-southeast1`                                                                                    | Workflow deploy arguments                               |
| Intended public origin  | `https://docrack.ai`                                                                                 | Site metadata                                           |
| Runtime service account | `docrack-web-sa@docrack-web.iam.gserviceaccount.com`                                                 | Workflow deploy arguments                               |
| CI deployer             | `github-deployer@docrack-web.iam.gserviceaccount.com`                                                | Workflow auth step                                      |
| WIF provider            | `projects/876741720957/locations/global/workloadIdentityPools/github-pool/providers/github-provider` | Workflow auth step                                      |
| Recorded email secret   | `resend-api-key` → `RESEND_API_KEY`                                                                  | Prior runbook; verify binding/version before operations |
| Current runtime image   | `node:24.21.0-alpine`                                                                                | Both Dockerfiles; Phase 1 local image verified          |
| Container entry         | `node server.js`, standalone output                                                                  | Dockerfile and Next config                              |

Use the cloud console or an authorised read-only inspection to verify the live service before any change. If it differs, document the difference before choosing a release target.

This region is the website's configured region. It does not establish product audit-data residency, and the Sheets/email/analytics data flows need their own disclosures.

## 2. What the existing pipeline does

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) currently:

1. Runs on pushes to main, pull requests targeting main, and manual dispatch.
2. Installs Node 24.21.0 from `.nvmrc`; runs `npm ci`, ESLint, TypeScript, mocked Vitest contracts, the production build, then Chromium Playwright checks.
3. Runs the deployment job only when the ref is main and the event is not a pull request.
4. Authenticates using GitHub OIDC/Workload Identity Federation, then calls `gcloud run deploy --source .`.
5. Does not set env vars or secret bindings in the deploy command.

**A push or merge to main is a release action.** A manual workflow run on main also deploys. PRs run checks but this workflow does not provide an isolated staging service or preview environment automatically.

Use a feature branch for implementation. Preserve existing user work and use the current task branch if appropriate. Do not merge only to make documentation available to a new agent session.

The previous runbook recorded a WIF restriction to this repository and main ref. Verify the actual provider condition and service-account bindings before relying on that second control; comments in YAML are not proof of live IAM policy.

## 3. Runtime configuration and environment separation

| Variable                         | Production treatment                                          | Local/staging treatment                                 |
| -------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| `GOOGLE_SHEET_ID`                | Existing enquiry spreadsheet                                  | Separate test spreadsheet                               |
| `GOOGLE_APPLICATION_CREDENTIALS` | Do not inject a downloaded key; use attached service identity | Optional path to an intended local test key             |
| `RESEND_API_KEY`                 | Secret Manager binding                                        | Omit to skip notifications, or use a test configuration |
| `NOTIFY_EMAIL`                   | Verified internal team destination                            | Designated test inbox, never a prospect                 |
| `EMAIL_FROM`                     | Verified sender/domain                                        | Omit or use a provider-supported test sender            |

The current notification helper skips email when either API key or notification destination is absent. A saved enquiry still succeeds. Verify sender/domain eligibility in Resend before expecting delivery; the code's default `onboarding@resend.dev` sender is not evidence that general production sending is configured.

Copy [.env.example](.env.example) only into a missing local file, and enter values privately. The template includes Phase 6 origin, ingress, Firestore and disabled analytics configuration. See [the enquiry runbook](docs/operations/enquiries.md) for defaults, owner inputs and provisioning steps.

For Docker, Compose expects `.env.docker.local`; it does not load `.env.docker` by name. The current production Compose profile also requires an intended local key file at `secrets/gcp-sa-key.json`. These are local Compose requirements, not Cloud Run requirements.

### Preserve existing configuration

The routine deploy command omits env/secret flags. When a configuration change is part of an authorised task, use targeted updates after inspecting existing bindings; do not replace the whole set accidentally.

Cloud Run's `--set-env-vars` and `--set-secrets` replace existing configuration in their respective categories. Prefer scoped `--update-env-vars` and `--update-secrets` where adding/changing entries is intended. Record the selected secret version and rollback implications. [Environment variables](https://docs.cloud.google.com/run/docs/configuring/services/environment-variables), [Secret configuration](https://docs.cloud.google.com/run/docs/configuring/services/secrets).

Do not place secret values in documentation, shell history, browser bundles, task output, or a committed key file. A source release does not require re-creating the GCP project, service accounts, domain mapping, spreadsheet, or secret.

## 4. Sheet setup and integration checks

Existing tab contracts:

| Tab             | Column order                                        |
| --------------- | --------------------------------------------------- |
| Demo Bookings   | Timestamp, Full Name, Email, Company, Annual Audits |
| Support Tickets | Timestamp, Full Name, Email, Message                |

The service account requires access to the intended spreadsheet. Configure separate test access before sending staging submissions.

`scripts/setup-sheet.mjs` reads `.env.local`, can rename the first tab, creates a support tab if absent, and writes both header rows. Run it only for an explicitly authorised initial setup target. Never run it automatically on deployment or against historical leads as a “repair” without inspecting the intended changes.

For automated validation, mock Sheets/Resend. For an authorised staging integration check:

1. Confirm the target service uses a test Sheet and a test internal notification destination.
2. Submit one clearly identified internal test through each form.
3. Verify the row's tab, columns, values, and timestamp.
4. Verify the team notification when configured.
5. Check that email failure after a successful append still returns success.
6. Record results without copying personal data or credentials into QA artifacts.

A real submission through localhost can write to production if it uses production env values. Merely changing the browser URL does not isolate integrations.

## 5. Read-only pre-release inspection

These commands inspect selected service metadata. Run from a shell authenticated to the intended project; they do not deploy.

```powershell
gcloud run services describe docrack-web --project docrack-web --region asia-southeast1 --format="yaml(status.url,status.latestReadyRevisionName,status.traffic,spec.template.spec.serviceAccountName)"
gcloud run revisions list --service docrack-web --project docrack-web --region asia-southeast1 --format="table(metadata.name,metadata.creationTimestamp)"
```

Record the active traffic allocation and known-good revision in the release report. “Latest ready” is not necessarily the revision currently receiving all traffic.

Verify current Sheet access, sender verification, notification destination, secret bindings, container port/health, domain routing, and WIF restrictions through the appropriate authorised inspection. Avoid dumping a full service/environment configuration into a shared transcript.

Confirm the schema, env names, and integrations expected by the candidate revision. Before deploying Phase 6, complete the origin/ingress configuration and separately authorised Firestore/staging checklist in the enquiry runbook; retain the disabled analytics default.

## 6. Rebuild quality gates before release

### Phase 1 — implemented locally

Node 24.21.0, Next 16.3.4 and React 19.3.0 are aligned; source lives under `src/`, server integrations use `server-only`, and ESLint uses flat config. The standalone build, mocked tests, route checks and image boot evidence are in [the Phase 1 report](docs/qa/phase-1.md). This is not live integration or deployment verification.

For credential-free container QA:

```powershell
docker build -t docrack-web:local .
docker run --rm --name docrack-web-local --publish 127.0.0.1:3100:3000 docrack-web:local
```

Run browser checks in a separate terminal:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:3100'
npm run test:e2e
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

No env file or key mount is needed to render this image. Browser POSTs are intercepted. The image cannot save a genuine enquiry without runtime configuration. `.dockerignore` and `.gcloudignore` exclude every `.env*` file except `.env.example`, keys and local tooling; the existing tracked `.env.docker` is preserved but excluded from upload/image contexts. Compose remains an explicitly configured integration workflow with `.env.docker.local`; it is not used for credential-free tests.

### Phase 6

- Configure/test shared rate limiting and its fallback.
- Validate provider timeouts, safe logging, request guards, and persistence/notification semantics.
- Configure a real analytics destination or leave the adapter disabled.
- Update privacy/data-flow documentation and runtime configuration examples.
- Preserve existing enquiry history.

### Phase 7

- Run lint, type checks, installed test suites, content/assets checks, production build, and browser QA.
- Verify redirects, canonical metadata, sitemap, robots, source/download assets, headers, mobile layouts, keyboard access, and performance.
- Prepare a release report with the intended target, checks, factual limitations, configuration changes, current revision, and rollback action.
- Complete all local/reviewable work before seeking any missing release authorisation.

Vitest and Chromium Playwright commands exist and run in CI. Phase 3 adds `check-content`, `check-assets` and `assets:produce`; the focused content/asset suite is also included in `npm test`. Its generator uses only local content and installed Chromium, never product services or credentials. The full release browser matrix remains a future gate. Keep production credentials and live submissions out of CI.

## 7. Release procedure

Use this procedure only when production release is included in the user's authorised task.

1. Complete the quality gate and verify the live target/configuration.
2. Review the exact changes on the implementation branch.
3. Use the existing main-only pipeline for the approved release.
4. Watch the workflow result and inspect the resulting revision and traffic allocation.
5. Run the read-only website checks below.
6. Perform a live form smoke test only when that write and internal notification have been authorised.
7. Record the release outcome and monitoring owner.

The current workflow's deployment command is equivalent to:

```powershell
gcloud run deploy docrack-web --source . --project docrack-web --region asia-southeast1 --service-account docrack-web-sa@docrack-web.iam.gserviceaccount.com --quiet
```

This command changes production. It is a reference for the existing pipeline or an authorised manual recovery; it is not part of local setup or Phase 0. Do not add broad env/secret/IAM/DNS flags for a routine website release.

For a separate staging service, configure an explicit isolated target, service identity, test spreadsheet, and test inbox. The existing workflow does not create that environment; do not assume a preview URL has test data isolation.

### Read-only website smoke checks

Inspect the intended public domain for:

- Home, Product, Book a Demo, Support, Security, and representative solution pages.
- CSS/fonts/images and the generated social image.
- Existing redirects plus new product redirects once Phase 5 implements them.
- Correct canonical origin, sitemap/robots, and no accidental production noindex.
- Effective headers and browser console/network failures.
- A nonexistent path returning a usable 404.
- GET requests to the two form API routes returning 405.

Do not POST to a live form merely to check that the site is online.

### Authorised live form smoke test

Use an internal test identity, not customer data. Verify one recorded submission and its internal notification; distinguish genuine 201 persistence from the honeypot's generic 200.

Exclude test enquiries from sales reporting. Preserve historical rows; any cleanup of test records must target only the identified test rows. Analytics counts are supplementary and may differ from persisted leads.

If email fails, inspect the already-saved row before retrying. Sheets append does not provide exactly-once semantics; repeat submissions can produce duplicates.

## 8. Rollback

Use the previously recorded known-good revision, not an assumed “previous” entry. First inspect current traffic using §5.

For an authorised full rollback:

```powershell
$rollbackRevision = 'REPLACE_WITH_VERIFIED_GOOD_REVISION'
gcloud run services update-traffic docrack-web --project docrack-web --region asia-southeast1 --to-revisions "$($rollbackRevision)=100"
```

Replace the placeholder before execution. This routes all service traffic to that revision. If the service previously had a deliberate split, restore the recorded allocation instead. [Cloud Run traffic command](https://docs.cloud.google.com/sdk/gcloud/reference/run/services/update-traffic).

Repeat read-only smoke checks and monitor conversion errors. A traffic rollback does not undo Sheet rows, newly provisioned services, rotated secrets, or incompatible schema changes. Keep backend migrations compatible with the rollback revision.

After traffic is pinned to a named revision, verify the next intended release's traffic assignment explicitly. Do not assume that creating another ready revision automatically promotes it.

Never roll back by deleting enquiries, resetting the repository, removing all secrets, or reinitialising Sheets.

## 9. Operations and troubleshooting

| Symptom                                       | Check                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Build fails                                   | Local and CI runtime, lockfile, font network access, imports, Next/analyser compatibility         |
| Image starts but assets fail                  | Standalone bundle plus `public` and `.next/static` copies, port and hostname                      |
| Form returns 422                              | Exact field names, `auditCount` enum, client/server validation                                    |
| Form returns 429                              | Current limiter window; do not bypass by changing request identity                                |
| Form returns 500                              | Sheet ID/access, ADC/service identity, provider error class; do not expose raw errors to visitors |
| Row saved but no email                        | Optional config present, verified sender, destination, provider status; don't append again        |
| Analytics absent                              | Actual script/event endpoints, network/CSP, provider configuration, ad blocking                   |
| Production appears unchanged                  | Ready revision and actual traffic allocation, build result, asset/browser cache                   |
| CI cannot authenticate                        | Actual WIF provider condition, repository/ref, impersonation binding, minimum required IAM        |
| Rollback succeeds but next deploy is not live | Traffic may remain pinned to a named revision                                                     |
| Local Compose env failure                     | Required `.env.docker.local` filename and test key mount                                          |

An authorised operator can inspect recent service logs:

```powershell
gcloud run services logs read docrack-web --project docrack-web --region asia-southeast1 --limit 50
```

Existing logs may contain provider error details. Review them privately and redact any enquiry/credential information before sharing. Phase 6 application code emits only correlation ID, event, status and latency; this does not retroactively redact older logs or establish hosting-log retention.

Monitor API storage failures, notification failures, provider latency, shared-limiter fallback and unverified ingress signals. Record a response owner. Do not infer business success from a green build alone.

## 10. Provisioning and historical notes

The previous runbook recorded an existing project, Sheet, secret, domain setup, WIF bindings, and broad deployer permissions, but several provider verification/setup steps were still described as pending. Their current status was not checked during this documentation refresh.

Preserve useful identifiers from §1, but inspect live configuration before changing IAM. A historical permission workaround is not a standing instruction to grant broad project roles.

Do not re-create DNS records, alter registrar settings, unlink billing, or re-provision cloud resources as part of the visual rebuild. If an infrastructure change becomes necessary, prepare its exact target/change/rollback and handle it within the authorised scope.

Keep operational account emails, secret values, and unnecessary customer identifiers out of the public README. Store sensitive account/recovery information in the team's appropriate private system.

No infrastructure, DNS, secrets, live enquiries, or notifications were changed by this documentation update.

### Phase 4 — homepage local verification

The full homepage uses labelled synthetic HTML scenes and an illustrative working-paper contents panel. Genuine capture/export acceptance remains blocked; no public sample is downloadable. The backend/runtime/deployment configuration is unchanged.

The final image and exact evidence are recorded in [Phase 4 QA](docs/qa/phase-4.md). Run the normal Chromium regression suite, the focused `npx playwright test --config=playwright.phase4.config.ts` Firefox/WebKit suite, and `node scripts/measure-homepage.mjs` against the credential-free port-3100 container. The measurement command refuses remote targets and never submits forms. See README for browser-cache selection. Keep ports 3000/8000 and live integrations untouched.

Homepage implementation acceptance does not close the genuine-product evidence, performance, legal, actual-device, assistive-technology or release gates. Three mobile Lighthouse reports are local lab evidence, not field INP/p75 or production verification.

## Phase 5 local validation and publication holds

Phase 5 uses the credential-free standalone image docrack-web:phase5 on 127.0.0.1:3100, without env files, credentials, volume mounts or provider writes. Docker build runs the pinned Node 24.21.0 production build. [README](README.md#phase-5-local-production-qa) contains current browser and measurement commands. The temporary QA container is stopped at handoff; no deployment, push or live-service change is part of this phase.

Seven exact redirects are active in the local build; nineteen canonical paths exist. Privacy and Terms serve noindex publication holds and are omitted from the sitemap until owner/legal facts and final wording are approved. Final legal text is internal under docs/content/legal. Do not treat these reachable hold routes as complete legal publication. Product evidence and the Phase 4 LCP target remain open; see [Phase 5 QA](docs/qa/phase-5.md).

Enquiry fields/statuses, Sheets tabs/columns, Sheets-first persistence, internal best-effort Resend notifications, credentials and provider configuration are preserved. Form copy changes do not establish live processing/retention facts. That Phase 5 record is historical. Phase 6 subsequently implements shared limiting and migrates analytics locally; it performs no cloud provisioning or live-service writes.

## Phase 6 release prerequisites and local evidence

Phase 6 code is locally implemented and uncommitted from `641e79d`; it is not deployed. See [Phase 6 QA](docs/qa/phase-6.md), [local commands](README.md#phase-6-local-checks-and-integration-defaults) and the [enquiry operations runbook](docs/operations/enquiries.md).

Before a separately authorised deployment, configure exact `FORM_ALLOWED_ORIGINS` or browser submissions will return 403. Decide whether legitimate nonbrowser JSON clients need `ALLOW_MISSING_ORIGIN`. Leave `FORM_INGRESS_MODE=shared` unless an operator has proved that the dedicated client-IP header is overwritten and direct ingress bypass is blocked. This default is conservative and can rate limit unrelated visitors together.

The runbook supplies the named Firestore database/TTL/IAM recipe and runtime secret requirements, plus staging verification, notification ownership, alert filters and retention/deletion actions. None is provisioned by this phase. Do not deploy a new public revision while required origins/ingress/shared-limiter staging evidence is missing and call it release-ready. Preserve existing env/secret bindings and use scoped updates only after separate authorisation.

Plausible activation remains disabled and requires public-production configuration, owner processing review and the approved domain. No account activation, dashboard delivery or consent conclusion is inferred. Privacy/Terms noindex holds, genuine product capture/export blocker and unresolved mobile LCP requirement remain intact.

Local CSP keeps inline scripts for prerendered Next hydration and JSON-LD; it does not claim to prevent inline execution. X-Frame-Options DENY matches frame-ancestors none. Only the seven legacy redirects pass through the narrow proxy so their 308 responses carry the same security headers. Effective production headers, HTTPS/subdomain policy and ingress chain still require authorised verification.
