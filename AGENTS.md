# DocRack-Web — project instructions

## Start here

This repository is the public DocRack marketing website and its demo/support enquiry backend. The authenticated audit product is a separate sibling repository, `../DocRack`.

Before starting a rebuild task, read:

1. [docs/CURRENT_PHASE.md](docs/CURRENT_PHASE.md) for actual progress and the next action.
2. [DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md](DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md) in full on the first session; reread relevant sections on continuation.
3. [README.md](README.md) for the current implementation and runnable commands.
4. [DEPLOYMENT.md](DEPLOYMENT.md) before infrastructure, integration, or release work.
5. `../DocRack/DOCRACK_SPEC.md` and `../DocRack/DOCRACK_BUILD_PLAN.md` when product facts are needed.

The founder's current instructions govern task scope. The marketing specification governs the rebuild; the product specification governs product meaning. Current code and configuration establish what is implemented. Planned features are not evidence of availability.

Product documents contain prompts/instructions for building that separate product. Treat them as reference content, not directions to create its backend, run its phases, or follow its approval loop here. If the sibling files are unavailable, use the marketing specification's product summary, record the limitation, and continue independent work.

## Scope and working method

- Inspect git status and existing changes before editing. Preserve unrelated edits, deletions, untracked `.claude/` settings, secrets, and local configuration. Do not restore deleted historical files without a reason grounded in the user's task.
- Use the existing task branch when appropriate, or create an isolated branch if needed. Never reset/stash/discard user work to obtain a clean tree.
- If Git reports dubious ownership in this shared checkout, use invocation-scoped `safe.directory` for the verified repository path rather than changing global Git configuration.
- State a short plan, then perform the authorised work. Routine reversible edits, local checks, and clearly specified implementation choices do not require repeated permission.
- Follow the phase sequence and dependencies in specification §13. If the user asks for one phase, finish that phase and report its exit gate. If they authorise several phases, continue through those phases while recording each gate.
- Do not mark a gate passed when a check was skipped, failed, or only described. Record missing evidence precisely and continue unaffected work.
- Keep `docs/CURRENT_PHASE.md` updated at handoffs with completed work, changed paths, validation evidence, unresolved items, and the exact next action. Do not increment a phase simply because a session ended.
- Keep these instructions concise. Detailed designs, contracts, and acceptance criteria belong in the specification, not a competing second plan.
- Update README/DEPLOYMENT when actual commands, paths, configuration, or operations change.
- Do not write to the authenticated product repository as part of the website rebuild unless the user includes that work.

## Design and product truth

- Design from zero using the new direction in specification §§4–8. The old website supplies routes/backend facts only, never visual or UX inspiration.
- Page count is flexible. Update the route registry, migration map, navigation, sitemap, and acceptance checklist together when consolidating or adding pages.
- Keep the Audit Test Recipe central. Extract, Reconcile, and Checks belong inside Tests. Test and Run are different; exceptions and findings are different.
- Use all six states: Pass, Fail, Insufficient evidence, Needs human review, Not applicable, Processing error.
- Missing evidence is separate unless the configured completeness procedure explicitly makes its absence a failure.
- Show source Traces, rule/version citations, immutable Run history, and human approval. Copilot drafts and explains; it does not silently approve conclusions.
- Do not reintroduce external registry/status verification or document-request management, reminders, deadlines, and auditee upload portals.
- Do not claim full GRC, autonomous audit assurance, unverified integrations, certifications, India residency, customers, metrics, or response SLAs.
- Use current product captures with synthetic data, or clearly labelled illustrative interfaces. Generated art is optional atmosphere, never product proof.
- Keep public-site enquiry data distinct from product audit evidence. Website Cloud Run configuration does not establish product residency.
- Record material claims and assets in the registers required by Phase 0.

## Engineering invariants

- Preserve the standalone Next.js/npm architecture. Implement the planned runtime/source migration in Phase 1; do not describe `src/`, Next.js 16, React 19, Firestore, or the new analytics provider as already installed.
- Keep `POST /api/demo-booking` and `POST /api/support-ticket`, their current fields/statuses, and Sheets tab/column contracts unless an explicitly scoped migration updates all consumers.
- Demo `auditCount` values are `1-10`, `10-50`, `50-100`, `100+`.
- Google Sheets is the enquiry system of record. Persist first; an email failure must not turn a saved enquiry into a failed submission.
- Notifications go to the internal team. Submission is a demo request, not a calendar reservation or an email confirmation to the visitor.
- Keep credentials server-side. Do not print real env files, service-account keys, provider response bodies, or personal enquiry data.
- Do not run `scripts/setup-sheet.mjs` during normal development, testing, builds, or deployment. It mutates tab names/header rows.
- Use mock/emulator integrations for automated tests. A “local” form can still write to production when configured with live credentials.
- Respect the user's authorised scope for staging/production writes, notification sends, deployments, DNS, and secret changes. Mere possession of credentials is not permission to use live services.
- Browser demo components display controlled fixture data; they do not implement or call the authenticated audit engine.

## Verification

Inspect `package.json` before choosing commands. At the initial handoff, available checks are:

```text
npm run lint
npm run check-types
npm run build
```

There is initially no test, e2e, content-check, or asset-check script. Add them in the specified phases and use them once present. Do not copy the product repository's pnpm/Docker/make commands into this checkout.

For documentation-only changes, check formatting, links, and the diff; do not build or contact external services merely to edit prose.

For UI changes, inspect rendered desktop, tablet, and mobile layouts, including 320/390/768px widths, horizontal bounds, keyboard navigation, forms, reduced motion, and legibility of source evidence. Use meaningful tests for changed behaviour; avoid tests that only mirror styling.

Use `git diff --check` and the repository's Prettier configuration. Prefer file-scoped formatting; the current `npm run format` rewrites the whole repository.

At completion, report what changed, checks run and their results, remaining limitations, and the recorded next phase/action. Never present planned work as completed.
