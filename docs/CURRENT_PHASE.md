# Marketing rebuild — current phase

**Updated:** 14 September 2026

**Current phase:** Phase 3 — Source-grounded content and asset production

**Status:** Independent content and illustrative asset production implemented and locally verified. **The full Phase 3 exit gate is blocked on genuine current-product captures and a synthetic working-paper export**, as explicitly requested by the user. Phase 4 has not started.

**Last completed phase:** Phase 2, committed as `c3e12ff`. Its visual direction is retained; founder approval is not inferred.

**Next action:** Keep Phase 3 open. When the user supplies an approved synthetic capture/export set or specifically authorises an identified isolated synthetic session, verify product commit/Run/input/Recipe/approval provenance, obtain the required real captures/export, inspect private data, macros/connections and source references, reconcile all fixtures/captions, produce readable responsive treatments and rerun affected checks. Do not seed, reset or change the product. The user authorised a local Phase 3 commit on 14 September; it does not close the evidence gate. Do not start Phase 4, push or deploy under this handoff. A proposed [Phase 4 prompt](PHASE_4_PROMPT.md) is prepared for a later explicit instruction.

## Implemented work

- `src/content/pages/launch.ts`: nineteen complete launch-page copy/metadata/FAQ/brief contracts, per-section claim references, proof assets and publication holds. [Readable briefs](content/page-briefs.md). Metadata titles exclude the inherited site suffix. No new page route or redirect activated; adoption remains Phase 4/5.
- `src/content/readiness.ts`: separates format admission, extraction, preview and export evidence. [Claims register](content/claims-register.md) updated through C51; no product capability promoted to Verified available or Pilot.
- [Read-only product evidence](content/product-evidence.md) and [source hashes](content/product-source-manifest.json): product HEAD `d7a92e4416d65c6beebc0348e702d3aa6a470820`, implementation/test source versus historical evaluation and current acceptance distinguished.
- `src/content/demos/fixtures.ts`: separate P2P, credit and IFC illustrations with arithmetic, six-state counters, source roles/Traces, periods, policy/Recipe/input versions, explicit illustrative approval, unresolved result review and draft paper state. Existing `p2p.ts` is now an adapter; Phase 2 interaction/appearance preserved.
- `scripts/produce-content-assets.mjs`, `src/content/assets.ts`, `public/illustrations/`, `public/brand/`: six code-rendered scenes × desktop/tablet/mobile/320px variants, traced existing mark/wordmark, six PNG favicon sizes and a proper ICO. Source/rights/bytes/dimensions/hash/limitations recorded in [asset manifest](design/phase-3/asset-manifest.json) and [asset register](design/assets.md). Existing active marks retained.
- `src/app/opengraph-image.tsx`: new 1200×630 ivory/forest/citron OG image using existing identity and qualified headline. `src/lib/seo/metadata.ts` explicitly retains its OG/Twitter image across page metadata overrides.
- `tests/unit/content-assets.test.ts`, `tests/e2e/phase-3.spec.ts`: content/fixture/provenance/brand/browser verification. `check-content`, `check-assets`, `assets:produce` commands added; existing Sharp 0.35.4 declared directly as an asset-tool dev dependency. README/DEPLOYMENT updated.
- [Phase 3 QA](qa/phase-3.md), [measurements](qa/phase-3-measurements.json), [review board](design/phase-3/index.html), and 26 retained review images in `docs/design/screenshots/phase-3/`.

## Exit gate

| Condition                                                                                                            | Result                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All core content exists; material claims have source/status/publication decisions                                    | PASS for the nineteen-page candidate set. Privacy/terms are concrete review drafts held for owner/legal inputs. Page adoption remains later work.                                       |
| Example amounts/counts/references agree across text and media                                                        | PASS for controlled illustrative fixtures and their generated assets. Actual product Run/export agreement is BLOCKED because neither was supplied.                                      |
| Required captures have readable mobile treatments                                                                    | BLOCKED for genuine product captures. Six labelled illustrative scenes pass at 1440/768/390/320px; these do not substitute for missing product proof.                                   |
| Missing optional photo/video/customer quote leaves no broken section                                                 | PASS — omitted without placeholders or dead downloads.                                                                                                                                  |
| No confidential data, generated product screenshot, fabricated customer proof or outdated five-state visual included | PASS for new Phase 3 deliverables. Genuine export confidentiality/macro/link inspection is NOT RUN. Existing still-used legacy assets remain untouched with their recorded limitations. |

Validation details and exact image evidence are in [QA](qa/phase-3.md). Lint, strict types, 69 mocked/content/asset tests, credential-free standalone build and 34 Chromium checks pass; file-scoped Prettier, documentation links and diff checks pass. Four new board axe scans plus twelve retained prototype scans report no violations. Source evidence fits all four widths; minimum small-label text is 14px, primary body text 17px, with loaded local fonts. This is not full release accessibility/legal/current-product acceptance.

## Remaining work by owner

**From the user / product owner:** captures and export are deliberately blocked. To resume them, provide approved synthetic artifacts with commit/Run/version/approval provenance or authorise a specific safe synthetic session. Do not send passwords or tokens. An authoritative brand master or confirmation of inherited identity/rights remains useful before replacing active marks. Legal entity, privacy/retention/contact, programme/security facts and final legal review remain their documented later-phase inputs; unsupported claims are omitted/held.

**From implementation:** no known required independent Phase 3 content or asset-production task remains. Once the evidence boundary changes, capture/download and inspect genuine artifacts, reconcile actual results without altering screenshots, create remaining responsive treatments, update registers and rerun affected checks. Only then reassess the complete Phase 3 gate. Applying these briefs to the full homepage and remaining pages is Phase 4/5 and is not authorised by this task.

## Preservation and repository state

Branch `redesign/marketing-v2`; Phase 2 baseline is `c3e12ff`. Independent Phase 3 work is recorded in the commit containing this handoff, at the explicit request of the user. The evidence gate remains blocked. Initial status contained only untracked `.claude/`; it, secrets, env files and local configuration were preserved. Product repository status remained clean, and no files there were modified.

Existing sixteen routes, navigation/sitemap, three active redirects, both API handlers, form fields/statuses, auditCount values and Sheets-first/best-effort-email contract remain unchanged. No setup-sheet command, live form POST, product login/seed/build, notification, deployment or push occurred. The subsequent local commit was explicitly requested by the user. Services on ports 3000/8000 were left untouched. QA used a credential-free website container on 127.0.0.1:3100; it was stopped after validation.

## Phase tracking

| Phase | Scope                                  | State                                                                  |
| ----- | -------------------------------------- | ---------------------------------------------------------------------- |
| 0     | Baseline and public truth              | Complete; limitations in baseline/registers                            |
| 1     | Foundation and source boundaries       | Complete, `1486ee4`; [QA](qa/phase-1.md)                               |
| 2     | Visual system and prototypes           | Complete, `c3e12ff`; [QA](qa/phase-2.md), no inferred founder approval |
| 3     | Content and asset production           | Independent work verified; genuine capture/export gate blocked         |
| 4     | Homepage and workflow                  | Not started                                                            |
| 5     | Product, solution and supporting pages | Not started                                                            |
| 6     | Conversion reliability and analytics   | Not started                                                            |
| 7     | Release QA and cleanup                 | Not started                                                            |
| 8     | Controlled launch                      | Not started                                                            |
| 9     | Ongoing improvement                    | Not started                                                            |

## Copyable continuation scope

> Continue Phase 3 only after the supplied product evidence/access boundary is explicitly changed. Inspect status; preserve the committed Phase 3 work and any new user changes, including .claude/. Read CURRENT_PHASE, phase-3 QA, product-evidence, claims and asset registers. Use the existing direction and fixtures. Obtain only the authorised genuine synthetic captures/export; verify commit/Run/versions, amounts/counts, source links, private data, macros/external connections and approval state. Preserve untouched originals; never fabricate product proof or seed/reset the product. Finish remaining responsive treatments and rerun affected content/asset/browser checks. Report each exit gate truthfully. Stop before Phase 4, commit, push, deployment or live-service changes.
