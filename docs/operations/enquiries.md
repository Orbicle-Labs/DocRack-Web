# Website enquiry operations - Phase 6

Implemented locally on 20–21 September 2026 from `641e79d`. This runbook concerns the public website only. Provisioning, ingress verification, staging delivery, retention decisions and named ownership remain pending. No command below has been run against cloud services during Phase 6.

## Request and provider behaviour

Both existing Node POST routes retain fields, audit-count values, Sheets tabs/column order and status contracts. Shared Zod schemas trim before validation and lowercase email. Nonempty honeypots return generic 200 without persistence. Only a persisted 201 produces a visitor receipt or conversion event.

JSON content type and exact configured Origin are checked before limiting and reading. `FORM_ALLOWED_ORIGINS` is a comma-separated allowlist: no wildcard, path or trailing slash. Empty configuration rejects browser POSTs with 403. `ALLOW_MISSING_ORIGIN=true` deliberately allows nonbrowser JSON clients without Origin, but not requests declaring cross-site/same-site fetch metadata; abuse controls still apply. Origin is not authentication.

Body reads stop at 16 KiB regardless of Content-Length, including chunked/multibyte input. A stalled body is cancelled after five seconds. Additional statuses are 413 (size), 415 (content type), 403 (origin); existing 400/422/429/500/405 and honeypot 200 remain. Guards consume quota before body parsing, including malformed attempts and honeypots, to bound repeated abuse.

Sheets append uses ADC headers plus one native fetch with `valueInputOption=RAW`, `insertDataOption=INSERT_ROWS`, fixed tabs and row order. The eight-second deadline includes credential lookup; transport aborts and late credential lookup cannot initiate a write. A failed/ambiguous append is never automatically retried. The remote provider may already have committed a timed-out write; a manual retry can duplicate it. This is not durable exactly-once delivery. Formula-leading values remain RAW; any future CSV/Excel export needs its own escaping policy. [Sheets append contract](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append).

After storage, the handler awaits an optional Resend notification, bounded to four seconds. Both missing notification settings mean skipped; partial/invalid configuration produces an operational failure signal. A notification failure still returns persisted 201. Messages go only to `NOTIFY_EMAIL`, contain the enquiry details in escaped HTML, and use a fixed subject. No visitor email, calendar reservation or response SLA is implemented. Sender/domain eligibility remains an operator input. [Resend API](https://resend.com/docs/api-reference/emails/send-email).

The browser retains drafts in page memory/DOM after failure; it uses no localStorage, cookies or persistent draft store. Uncontrolled fields initialise from existing DOM values, preserving pre-hydration typing. Submission is disabled until hydration, avoiding the browser's default GET submission of field values. A no-JavaScript explanation remains visible. A pending ref and disabled button prevent repeated clicks. Receipt headings receive focus; field errors and form failures are inline live feedback. The browser waits up to 25 seconds, longer than the combined server bounds; an interrupted response cannot prove whether storage occurred.

## Ingress trust and shared counters

Default `FORM_INGRESS_MODE=shared` ignores `X-Forwarded-For`, `X-Real-IP` and `X-DocRack-Client-IP`; all callers share a conservative identity. This can throttle unrelated visitors. It intentionally provides no per-client accuracy claim.

Enable `verified-header` only after an operator proves both conditions: the approved ingress overwrites `X-DocRack-Client-IP` with one validated client address, and requests cannot bypass that ingress to reach the website. A configured mode alone is not hosting evidence. Empty/malformed/comma-separated addresses use the shared identity; IPv6 spelling is canonicalised. No existing Cloud Run deployment has been verified to supply this header. Before promotion, retain test evidence that changing client-supplied forwarded/dedicated headers cannot change identity, including direct service-URL requests. Do not enable this mode for a publicly bypassable proxy.

Firestore SDK 9.2.0 is server-only and lazily initialised through ADC. `FIRESTORE_PROJECT_ID`, `FIRESTORE_DATABASE_ID` and a `RATE_LIMIT_HMAC_SECRET` of at least 32 characters are required for shared operation. Use a cryptographically random secret shared by instances; never use a public env prefix. Missing config enters degraded fallback without contacting Firestore.

Collection: `websiteRateLimits`. IDs: `demo_<HMAC-SHA256>` and `support_<HMAC-SHA256>`, with endpoint namespace inside the HMAC too. Documents contain only `count`, `windowStart`, `resetAt` (milliseconds) and `expiresAt` (Firestore Timestamp). No raw IP or form payload is stored. Demo allows 3 attempts/20 minutes; support 5/30 minutes. Transactions read then conditionally set counters, with at most three attempts. Expiry and reset are checked in application code. Firestore serialises conflicting transactional updates; local concurrency tests use a shared transactional mock, not a cloud/emulator acceptance claim. [Transactions](https://docs.cloud.google.com/firestore/native/docs/manage-data/transactions).

The shared operation has a three-second wall-clock bound and two-second SDK RPC timeouts. A late read cannot schedule a write after cancellation; an already-sent commit may still complete and conservatively consume quota. This never appends an enquiry by itself. A 30-second circuit breaker avoids hammering a failing store. The fallback map shadows all local attempts, holds at most 10,000 entries, rejects new identities at capacity, and removes expired entries on requests and a one-minute unref timer while CPU is available. Cold starts, multiple instances and transitions between shared/fallback operation do not provide global enforcement. `limiter_degraded` is emitted for every affected request; operator alert delivery is not provisioned.

Counter expiry is at the window end. TTL cleanup is eventual; Google documents typical deletion within 24 hours, not a deadline. Expired documents can remain visible before deletion. Provision and monitor TTL on `expiresAt`, including database backups/exports if later enabled. Until TTL is configured, expired documents can persist indefinitely despite no longer limiting a request. HMAC keys remain pseudonymous data, not a guarantee of anonymity. [TTL behaviour](https://docs.cloud.google.com/firestore/native/docs/ttl).

## Provisioning recipe - separate authorisation required

Owner inputs: approved project, region, isolated staging database, runtime service identity, test Sheet/inbox, ingress design, random secret and an operator who will receive alerts. Region choice concerns website anti-abuse data only and establishes no product residency. Keep staging and production databases/secrets distinct. Inspect existing IAM privately before adding any binding; inherited broad access can defeat a narrow added condition.

After those targets and changes are approved, replace the placeholders and use the following PowerShell commands. This is a prepared recipe, not permission or an executed checklist:

```powershell
$limiterProject = 'REPLACE_APPROVED_PROJECT'
$limiterDatabase = 'website-abuse-staging'
$limiterRegion = 'REPLACE_APPROVED_REGION'
$websiteIdentity = 'REPLACE_APPROVED_SERVICE_ACCOUNT_EMAIL'
gcloud services enable firestore.googleapis.com --project $limiterProject
gcloud firestore databases create --project $limiterProject --database $limiterDatabase --location $limiterRegion --type firestore-native --edition standard --delete-protection
$limiterCondition = 'expression=resource.name=="projects/' + $limiterProject + '/databases/' + $limiterDatabase + '",title=website-abuse-staging'
gcloud projects add-iam-policy-binding $limiterProject --member "serviceAccount:$websiteIdentity" --role roles/datastore.user --condition $limiterCondition
gcloud firestore fields ttls update expiresAt --project $limiterProject --database $limiterDatabase --collection-group websiteRateLimits --enable-ttl
gcloud firestore fields ttls list --project $limiterProject --database $limiterDatabase
```

[Database creation](https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create), [per-database IAM conditions](https://docs.cloud.google.com/firestore/native/docs/manage-databases#configure_per-database_access_permissions), [TTL command](https://docs.cloud.google.com/sdk/gcloud/reference/firestore/fields/ttls/update). Runtime uses data access only; it needs no database-creation, TTL-administration or project-editor role. Keep browser Firestore access denied; server SDK access is governed by IAM.

Create the HMAC secret through the approved private secret-handling process, recording its resource/version without printing its value. Bind only that secret to `RATE_LIMIT_HMAC_SECRET` and add the selected project/database/origins through targeted runtime updates described in [DEPLOYMENT](../../DEPLOYMENT.md). No secret is generated or bound here. Secret rotation changes identities and resets effective windows; coordinate a maintenance decision and retain rollback compatibility. Do not delete the database or old enquiry rows as a rollback step.

## Optional analytics and CSP

Vercel Analytics and Sonner are removed. The typed adapter sends only the seven implemented allowlisted events in specification §12.2; `sample_download` is unavailable because no verified sample exists. No automatic pageviews or form-success capture. Props are runtime validated against fixed values and canonical indexable paths. Extra properties, unknown events/pages and arbitrary query/fragment/UTM/referrer strings are discarded. Transport uses no cookies or referrer header and respects browser DNT/GPC. Provider failure/ad blocking cannot block forms or navigation.

`GET /api/analytics-config` reads runtime configuration and returns `Cache-Control: no-store`. It exposes only disabled status or the approved public domain. All conditions are necessary: production build, `SITE_ENVIRONMENT=public-production`, `ANALYTICS_ENABLED=true`, `ANALYTICS_PROCESSING_APPROVED=true`, `PLAUSIBLE_DOMAIN=docrack.ai`. Development/tests/private previews remain disabled. The default is disabled; Sheets remains the authoritative enquiry count.

Activation needs owner/account/domain approval, processing/consent/retention review and separately authorised browser/dashboard verification. The browser's direct request necessarily exposes network IP and browser headers to the provider; the adapter does not put raw IP in payloads, compute fingerprints or claim provider processing is absent. Reassess policy/disclosure before activation. Mocked HTTP 202 proves only the transport contract; even Plausible's 202 response does not prove dashboard acceptance. [Events API](https://plausible.io/docs/events-api).

`src/lib/security-headers.ts` defines CSP, DENY anti-framing, nosniff, referrer and permissions policies. Both `frame-ancestors` and X-Frame-Options deny framing. Obsolete Vercel/YouTube sources and unrestricted external image sources were removed after consumer checks. Only the optional `https://plausible.io` connection origin is added; its allowance alone sends no traffic. Scripts remain self plus `unsafe-inline` in production to preserve prerendered Next bootstrap/hydration and JSON-LD; styles also allow inline declarations. This does not block inline script injection. Nonce-based dynamic rendering/cache changes were not adopted. Development alone retains unsafe-eval. HSTS is not strengthened without HTTPS/subdomain verification.

The seven legacy 308s run in a narrowly matched `src/proxy.ts`, because local Next configured redirects omitted the security headers. The absolute same-origin Location changes only the registered destination path and preserves query strings; destination fragments remain browser-owned. Canonical pages remain prerendered. Verify effective HTML/API/redirect/404 headers in staging and production; local output is not proof of live headers.

## Monitoring, ownership and retention/deletion

Owner names and approved schedules are **PENDING**. Required assignments: enquiry-response owner; support escalation owner; runtime/notification incident owner; privacy/deletion owner. `NOTIFY_EMAIL` is configuration, not evidence of an actively monitored inbox. No independent fallback email/phone has been verified; Support is available only while the same backend works. An alternate verified contact is an explicit owner input.

Application logs contain only generated correlation ID, event, status/error class and latency. Provider HTTP status may be logged; values, messages, headers, tokens and provider bodies are not. Correlation IDs are newly generated, never taken from caller headers. Hosting/access logs and historical logs need their own retention/redaction review.

Prepare alerts (not created): any `limiter_degraded` or `ingress_unverified` event; `sheets` status other than `ok`; `notification` status other than `ok`/`skipped`; skipped notifications when sending is expected; high request 429/5xx rate and provider latency. Cloud Logging filters can match `jsonPayload.event="limiter_degraded"` and corresponding event/status fields. Select an owner-approved alert channel and test it independently; logging a signal does not prove anyone receives an alert.

For a missing notification, inspect the saved row first; never resubmit the enquiry merely to resend mail. For ambiguous storage, reconcile the intended Sheet privately using the recorded time and enquiry before any manual retry. Correlation IDs deliberately add no new Sheet column, so they are not a durable row identifier.

| Data store               | Implemented lifecycle                                               | Owner action before legal publication/release                                         |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Browser draft            | DOM/page memory; cleared on receipt; not persisted to storage       | Confirm UX is acceptable; reload/navigation loses unsent draft                        |
| Firestore counters       | Window-end expiry; TTL eventual cleanup once provisioned            | Approve location, verify TTL active and actual deletion, backups/exports policy       |
| Fallback map             | At most 10,000 keys; request/timer expiry cleanup; process lifetime | Monitor degraded operation; no global protection claim                                |
| Sheets enquiries         | Durable rows; no automatic deletion introduced                      | Approve purpose/schedule, access owner, retention and deletion procedure              |
| Resend + team mailbox    | Notifications may contain full enquiry details                      | Confirm provider retention, inbox/archive rules and deletion authority                |
| Hosting/application logs | Application payload minimised; live log retention unverified        | Approve access/retention and inspect older logs privately                             |
| Plausible                | Disabled                                                            | Review processor terms, network data, consent/opt-out and retention before activation |

For an authorised deletion request: verify the requester and scope privately; locate only their demo/support rows; record a non-PII case identifier and approved action; delete the exact rows after checking tab/position changes; address matching mailbox/provider copies and any authorised backups/exports; verify completion through each owner. Do not export the whole Sheet into QA artifacts, delete unrelated rows, rerun setup-sheet, or assert provider/backups deletion without evidence. Data subject rights, legal basis and timing are for final owner/legal review. Privacy and Terms remain internal drafts with public noindex holds.

## Pending controlled staging acceptance

Obtain a specifically authorised isolated Sheet/inbox/runtime and verified ingress. Verify each form creates the exact row then sends the internal notification; inspect one persisted 201 after an intentionally failed notification; verify shared concurrency across two instances and fallback alerts; verify TTL and header behaviour. Use synthetic identities only and record row/time/receipt evidence privately, not personal values in this repository. Record the candidate image/commit and explicit test-row cleanup authorisation. These checks are **NOT RUN**; the full Phase 6 gate stays incomplete until they pass. Analytics can remain disabled without an account or dashboard gate.
