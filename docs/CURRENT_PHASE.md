# Marketing rebuild — current phase

**Updated:** 23 September 2026.

**Current phase:** Phase 8 — local release preparation started; hosting deferred.

The user explicitly authorised committing Phase 7 and starting Phase 8, and deferred items 1–6 to before hosting. This supersedes the previous stop-before-Phase-8 instruction. The [checkpoint decision](qa/phase-7-checkpoint.md) records the exact scope. **Phase 7 implementation/local QA is accepted for checkpoint; full release acceptance remains incomplete.** Deferred requirements are not failed again or relabelled passed.

## Completed work

Native Windows WebKit skip-link traversal and narrow-header resize overflow are fixed. Font fallback remains stable under delayed loading; disabled analytics defers strict validation and rechecks configuration/privacy before sending. Enquiry contracts, local configuration, legal holds and disabled analytics are preserved.

The [follow-up](qa/phase-7-followup.md) retains 121 unit/integration passes, lint/types/build passes, 138 final scoped browser passes, 57 payload/CLS contexts, 44 screenshot captures and source/content/asset checks. The earlier 272/273 run and repaired failure remain recorded. The [candidate provenance](qa/phase-7-followup-provenance.json) identifies the tested local image and source hashes. No historical evidence is overwritten.

## Deferred until hosting

The user will address genuine product capture/export provenance; approved Privacy/Terms wording/facts; actual screen-reader/device/zoom records; staging delivery/shared limits/TTL/ingress/alerts and ownership; protected preview/production traffic/rollback; and mobile LCP. Home median is 2.416s; Product 2.518s, Documents 2.673s and Demo 2.824s still miss the unchanged 2.5s requirement. Do not restart those items or repeatedly ask for records during local Phase 8 preparation.

The earlier “yes all done” is retained in historical records; the latest instruction explicitly defers these requirements. Founder visual approval of the reviewed direction remains recorded. Privacy/Terms stay noindex and no genuine sample is published until the relevant facts/artifacts are available.

## Git, CI and authority

Baseline main/origin is `8f9fa9b2330176e4f99d6b6e073ad9c3f062e5d5`; its verified [pipeline](https://github.com/Orbicle-Labs/DocRack-Web/actions/runs/35762388532) failed lint and skipped deploy. The follow-up is committed locally as `812d7ddcba6d24f5cc5f99be0375ae5f7d9e1d65` on main, one commit ahead of cached origin/main. No push occurred. No new remote CI or serving revision is claimed. Cloud Run metadata access remains denied; keep accounts/credentials/permissions unchanged.

The authorised Phase 7 local commit is complete. Phase 8 local preparation/documentation is active; this does not authorise further commits. **No push, PR creation, merge, workflow dispatch/retry, deployment, provisioning, secret change, live enquiry/notification write or Phase 9.** The workflow supports PR-only validation without deployment, but publishing that branch/PR needs separate authority. A main push deploys.

## Exact next action

The [Phase 8 worksheet](qa/phase-8.md) now identifies the exact checkpoint/local image, CI path, domain/routes/assets/headers/indexing checks, proposed smoke records/notifications and monitoring/rollback criteria. Preparation documents are uncommitted for review. When the user resumes hosting, fill the deferred inputs, verify candidate CI through a separately authorised path, and agree the concrete release scope. Do not restart deferred performance or external checks now. See [Phase 8 instructions](PHASE_8_PROMPT.md), [deployment procedure](../DEPLOYMENT.md) and [enquiry runbook](operations/enquiries.md).

The credential-free QA container is stopped. Existing services, sibling product, historical QA, `.claude/` and local settings remain untouched.

**Transition verification:** 194 reviewed files committed; equivalent pre-commit tasks passed with `--no-stash --no-revert` to preserve the no-stash instruction. All 24 tested implementation/configuration/test hashes are retained. Phase 8 changes are documentation only; formatting, local-link and diff checks apply.
