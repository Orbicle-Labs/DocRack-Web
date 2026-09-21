# Marketing rebuild - current phase

**Updated:** 21 September 2026.

**Current phase:** Phase 6 - Conversion reliability, abuse controls and analytics.

**Status:** Independent implementation and local verification delivered. **Full Phase 6 gate INCOMPLETE:** controlled staging row/notification delivery is NOT RUN. Analytics is explicitly disabled. Firestore/TTL provisioning and ingress verification remain pending. **Phase 3 genuine capture/export remains BLOCKED; Phase 4/5 mobile LCP remains OPEN; Privacy/Terms publication holds remain.** No release or founder approval is inferred.

**Repository:** Phase 6 is recorded in the local commit containing this handoff on `phase-6/conversion-reliability`, with parent main `641e79d`. The user separately authorised this commit on 21 September 2026; it does not mark staging acceptance complete. Phase 5 implementation `85fd025` and the reviewed main integration are retained. No push, deployment, provisioning, secret change or live-service write in Phase 6. Pre-existing `.claude/` and unrelated work remain untouched. Last complete phase gate remains Phase 2, `c3e12ff`.

**Exact next action:** review the [Phase 6 QA and exit table](qa/phase-6.md), [visual board](design/phase-6/index.html) and [enquiry operations runbook](operations/enquiries.md). Separately authorise identified isolated staging targets and specific provisioning/test writes to complete the pending Phase 6 gate. A [Phase 7 continuation prompt](PHASE_7_PROMPT.md) is prepared for independent local release QA when explicitly invoked; it preserves the incomplete dependency gates and does not authorise release. Phase 7 has not started. The original [Phase 6 prompt](PHASE_6_PROMPT.md) remains a historical scope record.

## Delivered and verified

Shared schemas preserve both enquiry contracts. Pre-hydration drafts survive and submit unchanged. Forms retain failed drafts, prevent concurrent clicks and focus inline errors/receipts. JSON/origin and streaming body guards, explicit ingress trust, Firestore transactional HMAC counters, bounded fallback, actual provider deadlines and PII-minimised operational logs are implemented. Sheets persists before awaited best-effort internal notification; ambiguous appends are never automatically replayed. Analytics uses fixed allowlisted events and remains disabled; obsolete Vercel/toast dependencies and vendor allowances are removed. Redirect headers agree with canonical HTML/API policy while pages remain static.

Lint, strict types, **117 unit/integration tests**, content/asset checks (**24 each**) and credential-free standalone production build pass. **166 distinct browser checks** pass across Chromium/Firefox/WebKit, including retained page/homepage coverage and both forms' delayed hydration, keyboard/focus, offline/touch, repeated clicks and analytics-blocked journeys. New form checks include **30 axe scans, zero violations**, 320/390/768/1440px and 200% text reflow. Three hydration-wait timeouts under concurrent load passed on sequential rerun with an explicit functional timeout; this is not performance acceptance. See [QA](qa/phase-6.md) for image provenance, commands, exact scope and report links.

Performance was remeasured into new Phase 6 reports: 57 cold page contexts and twelve Lighthouse mobile runs. Historical Phase 4/5 reports remain unchanged, including Home 3.07 s / 3.12 s and Phase 5 Product/Documents 2.67 s, Demo 2.96 s versus the 2.5 s target. Current medians and budget results are recorded in [Phase 6 performance evidence](qa/phase-6.md#performance-evidence). Mobile LCP remains an unresolved requirement; field INP/p75 is not established.

## Changed paths

- Forms/API: `src/lib/forms/{schemas,submit}.ts`, `src/components/forms/{DemoForm,SupportForm}.tsx`, `src/app/api/{demo-booking,support-ticket}/route.ts`.
- Server: `src/lib/server/{request-guards,deadline,enquiry,log,rate-limit,sheets,notify}.ts`.
- Analytics/header integration: `src/lib/analytics/{events,client}.ts`, `src/lib/analytics/Analytics.tsx`, `src/app/api/analytics-config/route.ts`, `src/app/layout.tsx`, `src/components/demos/SourceReview.tsx`, `src/components/product-demo/WorkflowViewer.tsx`, `src/lib/security-headers.ts`, `src/proxy.ts`, `next.config.ts`.
- Public copy/config: `src/content/pages/launch.ts`, `package.json`, `package-lock.json`, `.env.example`, `.gitignore`, `.dockerignore`, `eslint.config.mjs`.
- Checks: `tests/setup.ts`, `tests/integration/enquiry-routes.test.ts`, `tests/e2e/phase-6.spec.ts`, `tests/unit/forms.test.tsx`, `tests/unit/{providers,analytics,analytics-config,firestore-deadlines,rate-limit,redirect-headers,request-guards}.test.ts`, `playwright.phase6.config.ts`, `scripts/{measure-pages,lighthouse-pages}.mjs`.
- Docs/evidence: `README.md`, `DEPLOYMENT.md`, this handoff, `docs/content/claims-register.md`, `docs/content/legal/privacy-review.md`, `docs/operations/enquiries.md`, `docs/qa/phase-6.md`, measurement JSON/twelve Lighthouse JSON files and twelve screenshots plus review board in `docs/design/phase-6/`. Historical screenshots/reports and Terms draft unchanged.

## Remaining work by owner

**From implementation:** no independent authorised Phase 6 code task remains. Review the candidate, then complete separately authorised isolated staging acceptance: exact rows and internal notification, saved 201 after notification failure, real multi-instance limits, TTL, verified ingress, alert delivery and effective headers. These are **NOT RUN**, not silently passed. No staging resources, owners or permission are invented. Analytics remains disabled unless separately configured and approved.

**From the user/operations owner:** approved staging Sheet/inbox/runtime/database/region and ingress design; named enquiry/support/incident/privacy owners; verified alternate contact; secret-handling and test-row cleanup authorisation; retention/deletion/processor decisions. The [runbook](operations/enquiries.md) contains a concrete provisioning recipe and acceptance procedure, neither executed against cloud services.

**Product evidence - BLOCKED:** approved genuine synthetic captures/export with product commit, Run, Recipe/input versions and approval provenance, or separately authorised isolated synthetic product session. Follow the [intake gate](content/product-evidence.md); confidentiality/macro/connection/source-link inspection remains NOT RUN. Website screenshots do not close this gate.

**Legal and performance:** founder visual review; approved responsible entity/contact/jurisdiction and [Privacy](content/legal/privacy-review.md)/[Terms](content/legal/terms-review.md) text. Both public holds remain noindex and outside the sitemap. Mobile LCP needs separately scoped remediation and repeated production measurements before acceptance. Actual devices, assistive technology and complete release QA remain later work.

## Preservation and stop boundary

`POST /api/demo-booking` and `POST /api/support-ticket`, fields, auditCount choices, exact Sheets tabs/columns and Sheets-first/internal-notification semantics remain. Dependencies changed only for the Phase 6 Firestore integration and verified unused runtime removals. No env/key mounts, live form POSTs, notifications, setup-sheet or sibling-product writes. Existing 3000/8000 services are untouched. The temporary local QA container is stopped at final handoff; image provenance is in QA.

The user authorised the local Phase 6 commit only. Stop before **Phase 7 execution, push, deployment, provisioning, secret changes and live-service writes**. Prior main merge/push permission was specific to that earlier integration.

| Phase | State                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------ |
| 0     | Baseline/public truth complete with recorded limitations                                               |
| 1     | Foundation complete, `1486ee4`                                                                         |
| 2     | Visual system complete, `c3e12ff`; no inferred founder approval                                        |
| 3     | Independent content/assets `49b000f`; genuine capture/export BLOCKED                                   |
| 4     | Homepage/workflow `0b88094`; functional checks pass, mobile LCP open                                   |
| 5     | Independent pages `85fd025`, integrated in `641e79d`; legal/content gate partial                       |
| 6     | Independent implementation locally committed; full gate incomplete pending staging; analytics disabled |
| 7-9   | Not started; no authorisation inferred                                                                 |
