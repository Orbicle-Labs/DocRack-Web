# Marketing rebuild — current phase

**Updated:** 22 September 2026.

**Current phase:** Phase 7 — Release QA and complete cleanup.

**Status:** Independent implementation and executable local QA delivered; required acceptance gaps remain explicit. **Full Phase 7/release gate INCOMPLETE.** Phase 3 genuine capture/export remains **BLOCKED**; the mobile LCP target of **2.5 seconds remains OPEN**; Privacy/Terms publication holds remain. Phase 6 controlled staging delivery, Firestore/TTL, ingress and alert verification remain **NOT RUN / PENDING**. Analytics is explicitly disabled. No founder/legal/release approval is inferred.

**Repository baseline:** verified `main` and freshly fetched `origin/main` both at `e8f7973` (Phase 6), retaining `641e79d` and Phase 5 history. This handoff accompanies the authorised Phase 7 checkpoint on main; no separate merge is needed because the branches have no divergence. Pre-existing untracked `.claude/` and unrelated local configuration are preserved. Last complete dependency gate remains Phase 2, `c3e12ff`.

**Exact next action:** review [Phase 7 QA and every exit condition](qa/phase-7.md), [screenshots](design/phase-7/index.html), [content review](content/phase-7-review.md) and [enquiry operations](operations/enquiries.md). Complete the specifically recorded missing evidence and acceptance before starting Phase 8. The [Phase 7 prompt](PHASE_7_PROMPT.md) is the executed scope record. A [future Phase 8 prompt](PHASE_8_PROMPT.md) is prepared with mandatory gate and release-authority checks; it is not permission to release.

**Git authorisation:** after receiving the incomplete-gate report and the warning that main pushes trigger deployment, the user explicitly requested committing the delivered work, integrating into main and pushing origin. This supersedes the earlier conditional Git boundary for this checkpoint and its existing pipeline trigger. It does not establish release readiness or authorise separate provisioning, secret changes, live enquiry submissions or Phase 8 operational work. Verify the resulting commit/remote equality after push; pipeline and live acceptance are not certified by local QA.

**Pre-push cloud evidence:** a read-only Cloud Run service lookup was attempted and returned `PERMISSION_DENIED` for the configured project under the current cloud account. The serving revision, traffic split and rollback target remain unverified. No account/configuration change or cloud write was made to resolve that access gap.

## Delivered

- Fixed skip-link keyboard focus on the main region; removed the unnecessary extended-font preload while preserving glyph fallback.
- Removed seven unused legacy UI primitives (including the stale five-state badge), obsolete exports/hook, unused motion dependencies and two unreferenced programme marks after consumer checks.
- Added full three-engine regression configuration, nineteen-page crawl, all-width interaction/404 checks, production error-component coverage, public/source audit, screenshot board and documentation-link checks. Historical reports/captures are preserved.
- Rewrote README around actual final commands, env filenames and current limiter/provider behaviour. Updated release/rollback guidance and claims/asset/route review addenda without promoting product or live-service claims.

Lint/types, 119 unit/integration tests and 24 content/asset checks pass. All 19 pages have desktop/mobile captures (48 images including details). All 57 payload/CLS measurements meet those budgets. Latest three-run mobile LCP medians remain Home 3.109s, Product 2.667s, Documents 2.663s and Demo 2.822s against 2.5s. Exact browser limitations, all runs, image provenance and changed paths are recorded in [Phase 7 QA](qa/phase-7.md). Native Windows WebKit link Tab traversal remains FAIL; direct-focus activation coverage is explicitly distinguished from native traversal. Recorded browser coverage is 263 passes / 1 failure across 264 distinct cases, alongside 119 unit/integration passes. Physical devices and actual screen-reader acceptance remain NOT RUN.

## Remaining work by owner

**Engineering / QA:** resolve or independently verify the Windows WebKit native link-tab limitation; complete assistive-technology/physical-device review with an actual tool/device; continue measured mobile LCP work before accepting the unchanged budget. Local mocks and automated accessibility checks cannot close external gates.

**Product evidence — BLOCKED:** approved genuine synthetic captures/export with product commit, Run, Recipe/input versions and approval provenance, or separately authorised isolated synthetic product session. [Export intake](content/product-evidence.md) confidentiality, hidden-content, macro/connection and source-link checks remain NOT RUN. Website screenshots do not satisfy this requirement.

**Founder / legal:** visual review; responsible entity/contact/jurisdiction; approved retention/deletion/processor facts; final [Privacy](content/legal/privacy-review.md) and [Terms](content/legal/terms-review.md) approval. Hold pages remain noindex and absent from the sitemap.

**Operations:** identify isolated staging Sheet/inbox/runtime/database/region and exclusive ingress design; approve exact provisioning/secret/test-write scope; verify both forms' rows and internal notifications, saved 201 after notification failure, real multi-instance limits, TTL, ingress and alerts. Supply response/support/incident/deletion owners and a verified alternate contact. Record remote protected preview and live known-good revision/traffic/rollback evidence only under separate authority. The [runbook](operations/enquiries.md) is a prepared procedure, not proof it ran.

## Preservation and boundary

Both POST endpoints, fields/statuses, audit-count values, exact Sheets tabs/columns, RAW persistence-first and bounded best-effort internal notification remain unchanged. Analytics remains disabled. No genuine sample download was added. No env/key mounts, setup-sheet, live enquiry/notification, product-environment access or sibling-product write. Existing 3000/8000 services remain untouched. Only the credential-free website QA container uses 127.0.0.1:3100; it is now stopped, as confirmed in the QA report.

The current checkpoint commit/main push and its existing pipeline trigger are explicitly authorised. Stop before **Phase 8 operational work, separate deployment commands, provisioning, secret changes or live enquiry/notification writes**. All incomplete gates remain open after the checkpoint.

| Phase | State                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------ |
| 0–2   | Baseline/foundation/visual system complete; no inferred founder approval                         |
| 3     | Independent content/assets; genuine capture/export BLOCKED                                       |
| 4     | Homepage/workflow functional implementation; mobile LCP OPEN                                     |
| 5     | Nineteen pages and route cutover; legal/content acceptance partial                               |
| 6     | Independent implementation in `e8f7973`; staging/operational gate incomplete; analytics disabled |
| 7     | Independent cleanup and local release QA; full release gate INCOMPLETE                           |
| 8–9   | Not started; outside authorisation                                                               |
