# Phase 8 — authorised local preparation

**23 September 2026 scope update:** the user explicitly authorised a Phase 7 local commit and starting Phase 8, deferring items 1–6 until hosting. The [checkpoint record](qa/phase-7-checkpoint.md) governs this transition. This is an intentional owner-directed phase transition, not a declaration that the historical acceptance gaps passed.

Continue with this scope:

```text
Continue DocRack-Web Phase 8 — release preparation, with hosting deferred by the owner.

Read AGENTS.md, docs/CURRENT_PHASE.md, docs/qa/phase-7-checkpoint.md, docs/qa/phase-7-followup.md, docs/operations/enquiries.md, README.md, DEPLOYMENT.md and marketing specification sections 13–15. Read docs/qa/phase-8.md when present. Inspect Git before editing and preserve unrelated work, .claude/, secrets, local configuration and all historical QA evidence. Never reset, stash or discard work.

The user explicitly deferred genuine captures/export, final legal facts/text, actual accessibility/device/zoom records, staging/operations evidence, preview/serving traffic/rollback and remaining mobile LCP until hosting. Do not repeatedly ask for those records or restart LCP optimisation now. Keep their exact status in the pre-hosting ledger. This authorises local Phase 8 preparation despite the incomplete historical release gate; it does not certify that gate green.

Prepare and maintain the release worksheet with:
1. Exact local candidate commit and tested image/source provenance; distinguish old failed CI from a future candidate CI result.
2. Slots for actual production serving digest/revision/traffic and a verified compatible rollback target. Current cloud read access was denied; do not change accounts, credentials or permissions to bypass it.
3. Domain/TLS, route/redirect, asset/header and indexing verification checklist, preserving legal publication holds until resolved.
4. Proposed synthetic internal smoke identity and exact form/Sheet/inbox scope for a later explicit write authorisation; actual target identifiers remain owner inputs. No live submission or notification now.
5. Proposed monitoring owner responsibilities, observation window and rollback triggers; clearly label proposals and unknown named owners.

The existing workflow runs validation for PRs to main and skips deployment for PR events. A future branch push/PR can verify CI without deploying, but requires separate explicit authority. Main pushes and qualifying manual runs deploy. The Phase 7 local commit authority is not authority for additional commits, pushes, merges, workflow triggers or deployment.

Use credential-free mocks only if new local code needs checks. Do not mount real env files/keys, run setup-sheet, mutate live services or write to the sibling product. Keep enquiry contracts and analytics disabled. Documentation-only work requires scoped Prettier, local documentation-link checks and git diff --check; no unnecessary rebuild or cloud lookup.

Update docs/CURRENT_PHASE.md and docs/qa/phase-8.md with actual preparation results and exact next action. Stop before push/PR/merge, further commit, workflow trigger, hosting/deployment, provisioning, secret changes, live enquiry/notification writes or Phase 9 unless separately authorised. Phase 8 operational acceptance stays pending until the deferred inputs, candidate CI and authorised release verification are complete.
```
