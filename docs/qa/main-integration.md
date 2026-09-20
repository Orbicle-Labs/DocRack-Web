# Main integration - 20 September 2026

The user explicitly requested merging origin/main, preserving work, pushing main, and preparing the next-phase prompt. No force push, rebase, reset or branch deletion is used. The existing main push workflow can deploy; the user was informed before the push. Release/evidence/legal gates are not made complete by this integration.

## Preserved history and conflict resolutions

Local Phase 5 parent: `85fd025`. Fetched origin/main parent: `b62efb7`, including `2dcd331` (legacy frosted-glass theme/interactivity). Original local main `fc919ca` is already an ancestor of `85fd025`. Both parents and their complete historical files remain reachable through this merge. The redesign and existing hotfix branches are retained. Pre-existing `.claude/settings.local.json` is excluded and unchanged.

The remote change affects seven retired presentation files, with no enquiry backend changes. Reviewed resolutions:

| Remote file                                               | Resolution and reason                                                                                                                                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`                                         | Keep removal of the old root application. The new `src/styles` system replaces the legacy glass/theme CSS.                                                                                              |
| `app/page.tsx`                                            | Keep the Phase 4/5 homepage and its manual, accessible source review. Do not restore the auto-advancing wheel or unverified cryptographic-seal marketing claim.                                         |
| `app/workflow/page.tsx`                                   | Keep its deliberate canonical redirect/product replacement and current labelled fixtures. The obsolete automatic reconciliation presentation is superseded.                                             |
| `components/Navbar.tsx`                                   | Keep SiteHeader/MobileNav/SiteFooter. The old theme/navigation dependencies were retired.                                                                                                               |
| `components/AuditSealDemo.tsx`                            | Keep out of active source; its signed/Merkle/offline-verification assertions lack current publication evidence. Original file remains in the remote parent.                                             |
| `components/ReconciliationDemo.tsx`                       | Keep out of active source; current SourceReview/EvidenceScene supply the replacement with explicit source/approval boundaries. Original file remains in the remote parent.                              |
| `app/template.tsx` (Git suggested `src/app/template.tsx`) | Do not activate the inherited initial-opacity-zero route wrapper; it would hide essential server content before JavaScript and invalidate the verified fallback. Original remains in the remote parent. |

The active runtime/configuration tree is identical to `85fd025`; only integration/handoff documentation is added or updated by this merge. This preserves the reviewed rebuild while retaining all remote work in Git history. Recover any original file with `git show b62efb7:<original-path>`; do not restore the root application over the rebuild.

## Verification and remaining scope

Verify no unresolved index entries, runtime tree equality with `85fd025`, both-parent ancestry, unchanged settings hash, scoped documentation formatting/links and diff checks. Normal pre-commit checks apply. The prior production build, 73 tests and 139 browser checks remain the implementation evidence; this documentation-only resolved tree does not justify claiming those checks were rerun during integration.

After the normal non-force push, verify remote main equals local HEAD. GitHub workflow/deployment outcome must be reported separately from successful Git transfer; no production form submissions, manual deployment, cloud resource/secret changes or setup-sheet are part of this task.

Phase 3 genuine product capture/export remains BLOCKED. Phase 4/5 LCP is open. Privacy/Terms remain publication holds. Phase 6 is **not started**; [the continuation prompt](../PHASE_6_PROMPT.md) authorises work only when the user invokes it in a later instruction.
