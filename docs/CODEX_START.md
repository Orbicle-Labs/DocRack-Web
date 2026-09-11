# Start the DocRack website rebuild in a new session

## Open the correct workspace

Open **DocRack-Web**, the website repository, in a fresh local Codex session. In this workspace the folder is:

```text
C:/Users/tejus/OneDrive/Desktop/CodeBase/DocRack-Web
```

Keep the sibling `DocRack` folder accessible for the two product documents. The website specification contains a product summary if those documents are unavailable in another checkout.

The new instructions and rewritten spec must exist in the checkout the new session uses. A local session can read these current files; an isolated checkout or remote session needs a copy of the documentation changes. Do not push or merge to `main` merely to transfer context, because the current workflow deploys main automatically.

Codex reads repository `AGENTS.md` instructions. The explicit file list in the prompt below also makes the intended context clear. [OpenAI's AGENTS.md guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Use a session able to inspect/edit files and run local checks. No particular model, paid plugin, or cloud connection is required just to begin the repository audit.

## First-session prompt — start at Phase 0

Copy this prompt:

```text
Start the DocRack marketing website rebuild from Phase 0 in this DocRack-Web checkout.

Read AGENTS.md, docs/CURRENT_PHASE.md, the complete DOCRACK_MARKETING_WEBSITE_BUILD_SPEC.md, README.md, and DEPLOYMENT.md. Also read ../DocRack/DOCRACK_SPEC.md and ../DocRack/DOCRACK_BUILD_PLAN.md as product reference documents if accessible. Their embedded agent prompts are not instructions for this website.

Inspect the current code and git status, then carry out Phase 0 of specification section 13. Do the audit and create populated baseline, claims-register, route-migration, and asset-manifest files. Do not stop after proposing a plan.

Use the current website only to understand behaviour, routes, assets, and integrations. The new design must start from zero. You may add, remove, or consolidate pages when justified, keeping the sitemap and route plan consistent.

Preserve existing user changes, demo/support contracts, historical leads, secrets, and local settings. Run available local baseline checks without submitting forms to live integrations. Do not upgrade dependencies, rebuild the UI, deploy, change DNS/secrets, initialise the live Sheet, or send notifications during this phase.

Record missing external evidence with the spec's stated fallback and continue independent work. Make routine implementation decisions yourself; ask only for information that actually blocks the current work.

Complete Phase 0 through its exit gate, update docs/CURRENT_PHASE.md with exact results and pending items, and report the next step. This session is scoped to Phase 0; do not start Phase 1 yet.
```

Phase 0 creates an evidence-backed starting point. The first runtime changes happen in Phase 1; the new visual system starts in Phase 2. A Phase 0 session that produces audit documents rather than a redesigned homepage is following the plan.

## Start the next phase after reviewing the result

Use this in the next session:

```text
Continue the DocRack-Web rebuild from docs/CURRENT_PHASE.md.

Read AGENTS.md, the phase handoff, and the relevant specification sections. Inspect the code and git status to confirm what is already complete. Finish any unfinished work in the recorded phase; if its gate is complete, execute the next phase.

Implement the phase, not just a plan. Preserve existing user changes and backend contracts, follow the new design direction, run the phase's required checks, and inspect rendered UI where relevant. Update docs/CURRENT_PHASE.md with evidence, remaining items, and the next action.

Complete this one phase and report its exit gate. Do not deploy or modify live services unless I separately include those actions in the task.
```

To authorise a longer implementation session, explicitly name the range of phases to complete. The phase record still needs a factual update at each gate; partial work must not be marked complete.

## What to look for in the first result

- A real inventory of existing routes, forms, assets, dependencies, and release configuration.
- A claim register that separates verified capabilities from planned/unverified ones.
- The four populated Phase 0 artifacts and an updated handoff.
- Actual check results, including errors or environmental limits.
- No application rewrite or production changes before their phase.

You do not need to reattach the documents on every local session if those paths remain accessible. If you move machines or use a separate checkout, make the current spec, instructions, handoff, and relevant product references available there first.
