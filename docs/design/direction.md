# Phase 2 — Evidence, in focus

**Selected direction:** original editorial composition in warm ivory, forest green and restrained citron. **Date:** 12 September 2026. **Scope:** reviewable prototypes and shared visual foundation; not launch-ready page/content acceptance.

Final handoff review completed 13 September 2026. The [font provenance record](font-provenance.json) retains exact vendored file hashes and package versions.

## Reference board and composition decisions

Open the [original HTML reference board](references/board.html) or its [rendered board](screenshots/phase-2/reference-board.png). It contains the palette, typography specimen, source/result composition study, three layout principles and reference observations. No competitor imagery, CSS, words or exact compositions were copied; the old website was used only for route and behaviour facts.

Public page content was rechecked on 12 September: [Linear](https://linear.app/) supplies a useful example of explaining work through concrete interface scenes; [Trullion](https://trullion.com/) foregrounds category and a demo action; [White Desert](https://white-desert.com/) separates an experience from practical enquiry information; [Retool](https://retool.com/) places capability and evaluation context together. These are design interpretations. This session did not conduct a fresh rendered or mobile audit of those sites, and makes no conversion claim about them.

The DocRack composition choices are:

- **Editorial split:** left-aligned outcome/category across roughly seven columns, one readable amount exception across five. Mobile presents the positioning and demo action before the scene.
- **Evidence chapter:** a full-width forest field gives the visitor-controlled source inspection room. White source paper, readable Indian amounts and citron subtotal/cell/clause highlights provide the visual signature.
- **Procedure rows:** a connected workflow, Scope/Logic/Control rows, one versioned Run snapshot and responsibility disclosures. Cards are used for distinct surfaces and controls, not repeated feature grids.
- **Conversion:** a concise introduction and a single-step enquiry form. Mobile puts the form before the agenda and offers a direct form anchor. No promised session duration, live custom build, calendar reservation or visitor confirmation email.

Founder feedback: no review of these new screenshots has been received yet. The selected implementation follows the founder's supplied Phase 2 brief and specification; it is reviewable, not labelled founder-approved.

## Review the implementation

Run the normal local site and open these existing URLs. The canonical registry remains sixteen published routes; no new public route, sitemap entry or redirect was introduced.

| Prototype                   | URL          | Implementation                                                              |
| --------------------------- | ------------ | --------------------------------------------------------------------------- |
| Homepage opening            | `/`          | `src/app/(marketing)/page.tsx`, `src/components/demos/HeroEvidence.tsx`     |
| Source-review scene         | `/#workflow` | `src/components/demos/SourceReview.tsx`                                     |
| Representative product page | `/product`   | `src/app/(marketing)/product/page.tsx`                                      |
| Demo page                   | `/book-demo` | `src/app/(marketing)/book-demo/page.tsx`, existing `DemoForm.tsx` behaviour |

The homepage deliberately stops after the opening, source-review prototype and a short product link. Its full eight-chapter narrative and six-step walkthrough remain Phase 4. Product here is a representative overview; the other product/solution/supporting pages retain their later-phase composition/content work.

## Tokens, typography and primitives

`src/styles/tokens.css` defines canvas `#f5f2eb`, ink `#182823`, forest `#153c31`, citron `#d9ed91`, white evidence surfaces, semantic result colours and distinct decorative/control borders. Existing Tailwind semantic roles map to these new values for preserved pages. `typography.css` and `visual-system.css` implement the new responsive compositions. Old blue/grey root palette, gradient assumptions and downloaded Google font integration were replaced.

Manrope variable (200–800) serves headings, body and form controls. Instrument Serif regular is used sparingly for editorial phrases; italic is available locally. Demonstration amounts use tabular numerals. Two Manrope subsets include Latin Extended/currency coverage. The body stack uses local Manrope, local extended glyphs, then Arial; the editorial fallback is Georgia. A blocked-font/no-JavaScript browser check retains readable positioning, source values and citations without overflow. Live font/metric observations are in [measurements](../qa/phase-2-measurements.json).

The four vendored WOFF2 files total **83,116 bytes (81.2 KiB)**. They were taken without modification from `@fontsource-variable/manrope@5.3.0` and `@fontsource/instrument-serif@5.3.0` npm archives; package downloads did not add runtime dependencies or change the lockfile. Each family carries its original SIL OFL 1.1 licence in `public/fonts/`. Original Google Fonts GitHub downloads failed at the network/TLS boundary; the npm distributions supplied the licensed artifacts. Builds and runtime font delivery now need no font-provider connection.

Shared implementations:

- `Button.tsx` and `Field.tsx`: fresh forest/outlined controls and persistent labels; semantic props, refs, validation wiring and pending-state behaviour preserved.
- `ProductFigure.tsx`: synthetic-data banner, representative-interface caption and readable source surface.
- `OutcomeLabel.tsx`: six state names, distinct icons and semantic colours. Labels do not rely on colour alone.
- `Disclosure.tsx`: native keyboard-operable details/summary for product explanations.
- `SiteHeader.tsx`, `MobileNav.tsx`, `SiteFooter.tsx`: original shell with compact Product/Solutions disclosures, published destination links, visible mobile demo CTA, modal navigation, focus wrapping/restoration, Escape, scrolling and desktop breakpoint reset. Existing brand mark is preserved; authoritative vector work remains Phase 3.

Controls use 44px minimum targets. Standard controls change colour over 160ms; no essential text or evidence waits on animation. Reduced motion removes transitions. Source focus scrolls directly, without animated travel. Main anchors account for the sticky header.

## Synthetic example and review boundaries

`src/content/demos/p2p.ts` is display data, not an evaluator. The same DEMO-0042 fixture drives the opening and review scene: expected ₹1,20,000, actual ₹1,25,000, difference ₹5,000, tolerance ₹1, Recipe v3 and Synthetic Procurement Policy v3 §4.2. Buttons reveal the invoice page/subtotal, approved PO `Orders!H43` and effective-dated policy clause. Source Traces expose raw/normalised values, input versions and illustrative extraction/correction context.

All six selectable results work with a keyboard: Pass, Fail, Insufficient evidence, Needs human review, Not applicable, Processing error. Each has a reason and source/rule context. Missing/failed inputs have no fabricated preview. Not applicable uses a separately labelled illustration outside DEMO-RUN-018. The product disclosure preserves the specification's single-check population accounting; completion is separate from review resolution.

Selecting a state or source never approves anything. The example remains awaiting reviewer confirmation. Copilot drafts/explains; people approve Recipes and conclusions, and overrides require a reason and attributable record. A Run is distinct from its Recipe; version changes do not rewrite completed history. A record-level exception is distinct from a grouped finding. No account, upload, audit API, inference, live integration or generated product capture exists in these scenes.

## Screenshot review

These are final local production-rendered captures with synthetic data, not current authenticated-product captures. Evidence-only crops hide the sticky shell for an unobstructed record; full-page captures retain the normal shell.

| Width | Opening                                              | Source review                                          | Product page                                    | Demo page                                 |
| ----- | ---------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------- | ----------------------------------------- |
| 1440  | [Opening](screenshots/phase-2/home-opening-1440.png) | [Evidence](screenshots/phase-2/source-review-1440.png) | [Product](screenshots/phase-2/product-1440.png) | [Demo](screenshots/phase-2/demo-1440.png) |
| 768   | [Opening](screenshots/phase-2/home-opening-768.png)  | [Evidence](screenshots/phase-2/source-review-768.png)  | [Product](screenshots/phase-2/product-768.png)  | [Demo](screenshots/phase-2/demo-768.png)  |
| 390   | [Opening](screenshots/phase-2/home-opening-390.png)  | [Evidence](screenshots/phase-2/source-review-390.png)  | [Product](screenshots/phase-2/product-390.png)  | [Demo](screenshots/phase-2/demo-390.png)  |
| 320   | [Opening](screenshots/phase-2/home-opening-320.png)  | [Evidence](screenshots/phase-2/source-review-320.png)  | [Product](screenshots/phase-2/product-320.png)  | [Demo](screenshots/phase-2/demo-320.png)  |

Additional inspection: [1280×720 opening](screenshots/phase-2/home-opening-1280.png), [mobile form focus](screenshots/phase-2/demo-form-focus-390.png), [mobile navigation](screenshots/phase-2/mobile-navigation-390.png), [forced-colour keyboard source focus](screenshots/phase-2/source-focus-forced-colours-390.png).

## Validation and limits

[Phase 2 QA](../qa/phase-2.md) records lint, TypeScript, 45 existing mocked tests, standalone build, 29 Chromium tests, twelve axe page/viewport scans, six-state keyboard interactions, contrast measurements, form access and visual inspection. No horizontal overflow was found at the four required widths. The 1280×720 opening keeps the category and demo CTA in view. The reference board and these screenshot artifacts are reviewable locally without a deployed preview.

This gate does not establish current-product release acceptance, final marketing claims, founder approval, legal review, full screen-reader support, Firefox/WebKit/device Safari, full zoom/OS scaling acceptance, performance budgets or release readiness. Existing pages outside the prototypes still contain inherited content and scenes; their claims remain unverified. No analytics adapter or enquiry reliability migration was included.

**Exact next action:** review these concrete Phase 2 artifacts; when Phase 3 is authorised, execute §13 Phase 3 using this visual direction: verify current product/release evidence, finish source-grounded page briefs/copy and shared fixtures, capture synthetic current-product scenes and a genuine working-paper export, then update claim/asset registers. Do not expand the homepage into Phase 4 during that work.
