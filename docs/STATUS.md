# Project status

Last synchronized: 2026-10-31  
Repository: KarlMuzen/KM-THEMES  
Branch: main

This file describes verified implementation state. Check the latest GitHub Actions runs before relying on the historical run status recorded here.

## Current baseline

At the start of this implementation update, main pointed to commit 46aa8ab956398e568aa9d6bc5fe0b5ae25eb10a8 (message: Update test_build.py).

Phase 1 (KM Warm / Chub compatibility audit and high-impact generator/preview synchronization fixes) has been completed on top of that baseline while preserving `themes/km-warm/source.css` byte-for-byte.

The Phase 2 palette extraction is committed on `main` at `139f60f00deeda12e59ff1c9192fa700c25a8c12`. GitHub Actions verified that commit successfully: [CSS validation run 41200731807](https://github.com/KarlMuzen/KM-THEMES/actions/runs/41200731807) and [GitHub Pages deployment run 41200731837](https://github.com/KarlMuzen/KM-THEMES/actions/runs/41200731837).

## Implemented

- Static KM Theme Studio entry page and brand identity.
- Guide-first onboarding and mobile-first layout.
- Dark default Studio appearance (`data-studio-theme="dark"`) with user-selectable light and system preferences.
- Five presets: Warm, OLED, Midnight, Forest and Parchment.
- Visual controls for accent, reading font, message size, line height and card opacity.
- Synchronized LITE card opacity defaults (`0.82` dark / `0.85` light) across preview, slider and exported CSS.
- Upgraded Chub-inspired mobile chat preview with Cover Art vs. Solid backdrop switcher, bot + user conversation cards, and accurate roleplay typography (`em` action colour `--pv-act`, spoken quotes and bold emphasis).
- Chub compatibility adapter patch emitted in both browser-generated CSS and `scripts/build.py` release outputs:
  - Fixes `@media (max-width:640px)` in `source.css` overriding user `--c-fs` and `--c-lh` on phones.
  - Maps Chub native `--message-font-size`, `--message-line-height`, `--dark-primary-color`, `--light-primary-color`, and `--bright-icon`.
  - Adds `.light-mode-override` and `.light-mobile-override` support alongside inline `--opposite-color`.
- Shareable validated URL configuration.
- Browser-side CSS generation from the supplied KM Warm source.
- Extracted the five preset palette definitions into `assets/js/palettes.mjs`; the Studio application imports the same data used by preview and CSS generation. Palette values are unchanged and covered by `scripts/test_palettes.mjs`.
- Raw CSS copy and download.
- CSS Workbench for CSS import, original preservation, working-copy editing, restore, copy and download.
- Versioned v1 project format and localStorage persistence.
- Updated `bots/km-theme-studio/CARD.md` aligned with `KM-THEMES` URLs and all five palettes.
- Privacy-conscious Chub reference capture helper.
- Python CSS build and lint scripts, Node tests, Python build tests, CI, Pages deployment and tagged release workflows.
- Dated Chub stylesheet and frontend research note with the Phase 1 compatibility matrix.

## Theme package status

- KM Warm v3.6 LITE source is present and preserved untouched in `themes/km-warm/source.css`.
- LITE and compatibility builds are available through the release pipeline and include the Chub compatibility adapter patch.
- FULL is unavailable. The original v3.5 full-effects source is required.

## Research status

The user-provided Chub asset captures are from a build timestamped 2026-10-07 and were collected on 2026-10-30.

The Phase 1 audit comparing `themes/km-warm/source.css` against the captured Chub stylesheet and JS chunks is recorded in `docs/chub-frontend-reference.md` (Section 5). Full route-by-route live DOM verification using `chub-capture.html` remains open.

## Known limitations and gaps

- The Chub preview remains an approximation, not a pixel-perfect renderer.
- The Chub frontend evidence is a dated 2026-10-07 build snapshot, not proof of the exact current live build.
- A fresh live DOM/computed-style capture for relevant phone and desktop routes is still needed to replace screenshot-inferred selectors (`.w-full.transition-all.duration-500`, `[class*="subscribe"]`).
- Arbitrary imported CSS is not mapped to visual controls.
- Project history and multi-project management are not implemented in the v1 project format.
- SillyTavern and RisuAI are not supported adapters yet.
- FULL KM Warm is unavailable.
- Cloudflare production migration is deferred.

## Immediate next work

1. Continue Phase 2 modularization by extracting the Chub adapter and then preview/guide responsibilities from `index.html` while keeping current behavior and CI checks green.
2. Run `chub-capture.html` on live mobile Chub routes (chat and character browse) to verify candidate selectors in the compatibility matrix.
3. Expand the semantic token engine (Phase 3) for independent roleplay dialogue/action tokens.

## Verification commands

Run the same checks used by CI:

- python scripts/build.py
- python scripts/lint.py
- python scripts/check_generator.py
- node --test scripts/test_theme_project.js scripts/test_css_workbench.js scripts/test_chub_reference_capture.js scripts/test_palettes.mjs
- python -m unittest scripts/test_build.py -v

A successful static build is not proof of visual correctness in Chub. Record visual verification separately.