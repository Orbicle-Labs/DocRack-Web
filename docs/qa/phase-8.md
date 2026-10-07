# Phase 8 — release preparation; hosting deferred

**Started:** 23 September 2026. **Status:** local preparation underway; deployment and operational verification NOT RUN. The user explicitly authorised starting this phase while deferring items 1–6 until hosting. The [Phase 7 checkpoint decision](phase-7-checkpoint.md) records that exception; no historical failed or unverified gate is relabelled passed.

## Completed preparation

- Created the authorised local Phase 7 checkpoint: **`812d7ddcba6d24f5cc5f99be0375ae5f7d9e1d65`**, parent `8f9fa9b2330176e4f99d6b6e073ad9c3f062e5d5`, on `main`. Message: `fix: checkpoint Phase 7 QA with owner-deferred launch gates`. All 194 selected files are Phase 7 implementation, QA artifacts or handoff documentation; `.claude/` and local configuration were excluded.
- Ran the pre-commit ESLint/Prettier tasks explicitly with `npx lint-staged --no-stash --no-revert --max-arg-length 6000`. They passed. The automatic duplicate hook invocation was disabled only for the commit process because its default command would create a stash, contrary to the user's instruction. The hook itself and global configuration were unchanged; no work was stashed or reverted.
- Verified the existing tested source against its 24-file provenance. Application code was not changed during this transition. Retained 121 unit/integration passes, 138 final scoped browser passes, 57 payload/CLS contexts and all failed/performance experiments from [Phase 7 QA](phase-7-followup.md).
- Prepared the release worksheet below and updated the [current phase](../CURRENT_PHASE.md) and [continuation instructions](../PHASE_8_PROMPT.md). No hosting task was performed.

The Phase 8 documentation written after the checkpoint is **uncommitted**. No additional commit, push, PR, merge or workflow trigger is inferred from the user's Phase 7 commit instruction.

## 1. Candidate and CI

| Field                          | Actual value / required follow-up                                                                                                                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Local code candidate           | `812d7ddcba6d24f5cc5f99be0375ae5f7d9e1d65`; owner-authorised checkpoint, not an approved production release                                                                                                                                                      |
| Remote baseline                | Cached `origin/main` is `8f9fa9b`; last fresh read on 23 September matched it. Local main is one commit ahead; no push performed                                                                                                                                 |
| Candidate pipeline             | NOT RUN remotely: the new local commit has not been published                                                                                                                                                                                                    |
| Last inspected remote pipeline | [Run 35762388532](https://github.com/Orbicle-Labs/DocRack-Web/actions/runs/35762388532), attempt 1 at `8f9fa9b`: lint failed, deployment skipped. [Read-only record](phase-7-followup-pipeline.json)                                                             |
| Tested local image             | `docrack-web:phase7-followup-final`                                                                                                                                                                                                                              |
| Local manifest list            | `sha256:65dc051748b24e40aa39d5062839e4315dfbd456b13c434652f801518109400b`                                                                                                                                                                                        |
| Local image config             | `sha256:bdd01eb274466bcf742a26553b2b17cf58d7c2f0eae502bacae15bd5f992a27b`                                                                                                                                                                                        |
| Image/source relation          | Image predates the checkpoint and contains the tested implementation; [source hashes](phase-7-followup-provenance.json) establish that relation. This is not a registry digest or proof of a deployed commit                                                     |
| Future CI path                 | Existing workflow validates PRs targeting main and skips its deploy job for PR events. After separate authority, publish a feature branch/PR and record its exact checked-out SHA/result. A later merge candidate may differ and needs its own identified checks |
| Production image               | Not selected or built by this preparation; obtain immutable deployed digest and its candidate provenance during the later authorised release                                                                                                                     |

Do not push main or dispatch its workflow merely to obtain CI: the current workflow deploys qualifying main pushes/manual runs. Review the eventual branch/PR change set and release scope before asking for that action's authority. Current Phase 8 preparation is documentation only.

## 2. Deferred inputs and hosting decision

The owner has deferred these six items. Do not repeatedly request them or run their live tests now.

| Item                      | Owner / exact input before hosting                                                                                                                                                                                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Genuine product evidence  | Product owner: approved synthetic captures and original export, product/Run/Recipe/input/output/approval provenance, privacy/hidden-content/macro/connection/source-link checks                                                                                                     |
| Legal publication         | Founder/legal: final approved Privacy/Terms wording and company/contact/jurisdiction/retention/deletion/processor facts; publish only the approved text                                                                                                                             |
| Accessibility and devices | Reviewer: candidate-specific screen-reader/browser/OS versions and results, physical iOS/Safari and Android/Chrome checks, actual browser/OS zoom and keyboard settings                                                                                                             |
| Staging and operations    | Operator: isolated runtime/Sheet/inbox/database/region, exact RAW rows/internal notifications and saved 201 after notification failure; shared limits, observed TTL deletion, ingress overwrite/bypass checks, delivered alerts and named response/support/incident/deletion owners |
| Preview and recovery      | Already-authorised operator: protected candidate preview with test-data isolation; actual serving revision/digest/domain mapping, all traffic percentages/tags, verified compatible rollback revision and allocation                                                                |
| Performance               | Owner-deferred engineering work: retain ≤2.5s target and three-run method. Last medians: Home 2.416s PASS; Product 2.518s, Documents 2.673s, Demo 2.824s FAIL. Recheck the eventual candidate after any changes                                                                     |

Cloud Run inspection previously returned `PERMISSION_DENIED` / `CONSUMER_INVALID`. This preparation makes no further cloud lookup and no account/credential/permission changes. An already-authorised operator can supply the necessary redacted snapshot when the owner resumes hosting work.

Before hosting, reconcile the six inputs and candidate CI in one dated go/no-go record. Founder visual approval of the previously reviewed direction is recorded; new release changes must be assessed against the final candidate. Deferral permits preparation now, not a claim of complete release acceptance or production approval.

## 3. Domain and read-only verification worksheet

**Intended origin:** `https://docrack.ai`. No live check was performed in this Phase 8 start. At authorised release time, record UTC time, candidate, operator and redacted observations for every row. Use the canonical routes and seven redirect mappings from [the route registry](../../src/content/routes.ts), not a stale manually maintained list.

| Check               | Required result                                                                                                                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Domain / TLS        | Canonical domain serves the intended revision; certificate valid for the hostname; HTTPS redirects and any www policy match the owner's configured domain mapping; no redirect loop                                                                |
| Routes              | All 19 canonical routes respond correctly; intentional Privacy/Terms holds are resolved or explicitly retained in the hosting decision; usable 404 for an absent route                                                                             |
| Redirects           | Seven legacy mappings return one-hop 308 to their registered destinations; preserve query strings and meaningful browser fragments                                                                                                                 |
| Assets              | HTML, CSS, JS, local fonts, logo, icons and generated 1200×630 social image resolve; no unexpected external requests or browser console errors; source scenes remain readable                                                                      |
| Navigation / forms  | Keyboard bypass, menu, source-panel focus/return, six result states and mobile form access work; opening a form does not submit it                                                                                                                 |
| Headers             | Check effective HTML, API and redirect security headers, CSP, framing denial and MIME protection after real ingress; do not infer them solely from local config                                                                                    |
| Indexing            | Canonicals use the intended origin; robots/sitemap agree with the final approved route registry. Current local sitemap has 17 entries and excludes the two noindex legal holds; do not accidentally remove holds or leak preview-wide restrictions |
| API read-only check | GET `/api/demo-booking` and `/api/support-ticket` return 405. A GET does not establish successful live conversion                                                                                                                                  |
| Analytics           | Remains disabled; verify `/api/analytics-config` returns the intended disabled/no-store result. No account activation or analytics event is required for this release                                                                              |

No POST, remote failure injection or notification belongs to this read-only list. Store serving/rollback metadata separately from enquiry personal data; do not copy full environment or secret bindings into public QA records.

## 4. Proposed live smoke scope — not authorised or executed

This is a reviewable proposal for later hosting, not authority to send. The actual internal email address, Sheet ID, runtime and inbox are still required owner inputs. Do not substitute live targets from whatever credentials happen to exist.

| Field             | Proposed value / binding needed                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Run label         | `launch-smoke-<UTC timestamp>-<candidate short SHA>` recorded in the private operational ledger; keep the existing form schema unchanged                                                                                         |
| Identity          | Full name `DocRack release QA`, organisation `DocRack internal QA`; email must be a named, owner-controlled internal address approved before submission                                                                          |
| Demo request      | One `POST /api/demo-booking`: `fullName`, approved `email`, `companyName`, `auditCount: "1-10"`, empty honeypot                                                                                                                  |
| Demo target       | Approved Sheet ID, `Demo Bookings` tab; ordered columns Timestamp, Full Name, Email, Company, Annual Audits                                                                                                                      |
| Support request   | One `POST /api/support-ticket`: same approved name/email, message `Operational smoke test <run label>. Synthetic only.`, empty honeypot                                                                                          |
| Support target    | Same approved Sheet ID, `Support Tickets` tab; ordered columns Timestamp, Full Name, Email, Message                                                                                                                              |
| Notifications     | Internal team inbox and configured sender must be identified and explicitly approved. No visitor confirmation email or calendar booking                                                                                          |
| Expected evidence | Each request returns persisted 201, creates exactly one matching RAW row and produces its expected internal notification; record private row/time/receipt references and exclude test enquiries from sales reporting             |
| Failure handling  | A timeout/ambiguous append requires operator inspection before resubmission. A saved row with failed email must not create another enquiry. Preserve records; no deletion, setup-sheet or failure-injection authority is implied |

The later authorisation must cover both specific submissions, target records and internal notifications. Staging notification-failure injection is a separate deferred acceptance exercise. This proposal does not extend the user's present scope.

## 5. Monitoring and rollback proposal

**Named release operator, monitoring owner and backup:** unassigned; owner supplies names before hosting. **Proposed observation window:** 30 minutes of attended observation after verified traffic cutover, followed by a 24-hour follow-up. These times and triggers are proposals for owner agreement, not measurements already performed.

During the attended window, inspect existing approved signals for route/asset availability, 404s on canonical routes, API 5xx/429 and latency, storage failures, notification failure/skips and shared-limiter degradation. Compare with the recorded baseline. Confirm alerts actually reach the assigned owner; application logging alone is insufficient.

Proposed rollback triggers: reproducible broken critical navigation/assets or conversion; unintended publication of held/private content; incorrect serving revision/traffic; repeated storage failure or limiter degradation persisting across a five-minute observation interval. Investigate notification failures against saved rows before retrying any form. The operator may require stricter thresholds when agreeing the release plan.

Before cutover, record the verified known-good revision/digest, exact traffic allocation/tags and compatible configuration/secret versions. A previous/latest-ready revision is not automatically a rollback target. Rollback authority must be explicit and tied to that target. Use the [deployment rollback procedure](../../DEPLOYMENT.md#8-rollback), restoring only the approved allocation; never delete enquiry rows, reset Sheet headers or improvise secret changes. Verify domain/routes/headers again after rollback and record the result.

## Next action and boundaries

Local release preparation is recorded and reviewable. Leave these Phase 8 documents uncommitted for review; no new code/runtime work is needed for the owner's deferral. When the user returns to hosting, replace the deferred inputs with evidence, identify the exact accepted candidate and CI result, then obtain authority for the concrete release and any live smoke actions.

**No push, PR, merge, additional commit, workflow trigger, deployment, provisioning, secret change, live enquiry/notification, sibling-product write or Phase 9 has occurred.** The QA container remains stopped. Phase 8 operational acceptance is pending.

## Preparation validation

Scoped Prettier and `git diff --check` pass. Local documentation-target checks pass: **16 documents, 175 targets, zero broken targets**; remote URLs and fragment anchors are outside the script's scope. The 24 implementation/configuration/test hashes still match after the commit checks. Local main is one commit ahead and zero behind cached origin/main; the index is empty. Only the two updated Phase 8 handoff documents and this new worksheet remain as task worktree changes; unrelated `.claude/` is preserved and uncommitted. No build, browser rerun or cloud lookup was needed for this documentation-only Phase 8 start.
