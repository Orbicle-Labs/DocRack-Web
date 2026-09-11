# Marketing rebuild — current phase

**Updated:** 11 September 2026

**Current phase:** Phase 0 — Confirm baseline and public truth

**Status:** Ready to start; the formal Phase 0 audit deliverables and exit gate are not complete.

**Last completed implementation phase:** None.

**Next action:** Use the first-session prompt in [CODEX_START.md](CODEX_START.md) to carry out specification §13, Phase 0.

## Completed preparation

- The marketing specification was rewritten as version 2.0 from both product documents, the website code, and public design references.
- The founder authorised increasing or decreasing page count; the chosen initial scope is nineteen core pages with conditional expansion.
- README and DEPLOYMENT were refreshed to distinguish current implementation from target architecture.
- Shared AGENTS/CLAUDE instructions and a new-session starter guide were added.
- No website UI, runtime dependencies, API behaviour, cloud infrastructure, or enquiry records were changed as part of this documentation preparation.

Preparation is not completion of Phase 0. The audit must be refreshed against the code at the time of execution.

## Phase tracking

| Phase | Scope                                      | State              |
| ----- | ------------------------------------------ | ------------------ |
| 0     | Baseline and public truth                  | Ready; not started |
| 1     | Supported foundation and source boundaries | Not started        |
| 2     | Visual system and prototypes               | Not started        |
| 3     | Content and asset production               | Not started        |
| 4     | Homepage and workflow                      | Not started        |
| 5     | Product, solution, and supporting pages    | Not started        |
| 6     | Conversion reliability and analytics       | Not started        |
| 7     | Release QA and cleanup                     | Not started        |
| 8     | Controlled launch                          | Not started        |
| 9     | Ongoing improvement                        | Not started        |

## Validation evidence

Supporting-document checks on 11 September 2026 passed: Prettier for all seven Markdown files, 37 local links, balanced code fences, the environment template's five existing variable names, and `git diff --check`. Application checks were not rerun for these documentation/template edits.

The specification-preparation session on 11 September 2026 reported successful `npm run lint` and `npm run check-types`; lint emitted a deprecation notice. That is historical evidence, not a fresh Phase 0 result.

No production build, formal website test suite, live form submission, spreadsheet write, notification delivery, or product readiness acceptance was verified by that preparation. Refresh the baseline and record actual commands/results in `docs/qa/baseline.md`.

## Existing working-tree context

At this handoff the branch was `redesign/marketing-v2`. The specification was modified, `.claude/` was untracked, and the historical Orvyn PDF was already deleted in the working tree. Preserve these changes and refresh git status rather than assuming this snapshot remains current.

## Phase 0 outputs to create

- `docs/qa/baseline.md`
- `docs/content/claims-register.md`
- `docs/content/route-migration.md`
- `docs/design/assets.md`
- An updated status/handoff in this file.

Populate these with findings and evidence, not just empty templates. Do not invent a live release ID, a passed product capability test, an approved logo, or a configured staging account.

## Inputs to verify without blocking independent work

Product capability/capture readiness; exact company and recognition facts; product sign-in URL; product security/deployment evidence; demo ownership; available staging integrations.

Use the fallbacks in specification §15. Record external checks that are pending and the phase that actually needs them; do not pretend they passed or stop unrelated local work.

## Handoff rules for the next session

Replace this status with the actual result after work. Include:

1. Current phase and state: in progress, complete, or limited by a named dependency.
2. Completed artifacts and changed paths.
3. Commands/results and links to screenshots or QA records.
4. Remaining tasks, unresolved facts, and any external validation still pending.
5. The exact next action; advance the phase only after its exit gate is satisfied.

Keep this file concise and current. Store detailed evidence in the relevant audit/QA documents.
