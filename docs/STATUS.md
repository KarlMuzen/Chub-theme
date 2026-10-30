# Project status

Last synchronized: 2026-10-30  
Repository: KarlMuzen/KM-THEMES  
Branch: main

This file describes verified implementation state. Check the latest GitHub Actions runs before relying on the historical run status recorded here.

## Current baseline

At the start of this documentation synchronization, main pointed to commit fb7dc6a57898bc7635254fd2d1b7fcccf3108175 (message: Document Chub frontend theme compatibility findings).

On that baseline, the latest CSS validation workflow and GitHub Pages deployment both completed successfully on 2026-10-30. This is the pre-documentation baseline; recheck workflows for the commit containing this document update.

## Implemented

- Static KM Theme Studio entry page and brand identity.
- Guide-first onboarding and mobile-first layout.
- Dark default Studio appearance with light/system preferences.
- Five presets: Warm, OLED, Midnight, Forest and Parchment.
- Visual controls for accent, reading font, message size, line height and card opacity.
- Chub-inspired mobile chat preview.
- Shareable validated URL configuration.
- Browser-side CSS generation from the supplied KM Warm source.
- Raw CSS copy and download.
- CSS Workbench for CSS import, original preservation, working-copy editing, restore, copy and download.
- Versioned v1 project format and localStorage persistence.
- Privacy-conscious Chub reference capture helper.
- Python CSS build and lint scripts, Node tests, Python build tests, CI, Pages deployment and tagged release workflows.
- Dated Chub stylesheet and frontend research note, with a second targeted JavaScript chunk capture now available for analysis.

## Theme package status

- KM Warm v3.6 LITE source is present in themes/km-warm/source.css.
- LITE and compatibility builds are available through the release pipeline.
- FULL is unavailable. The original v3.5 full-effects source is required.
- The source file is intended to remain preserved; use the build script for generated artifacts.

## Research status

The user-provided Chub asset captures are from a build timestamped 2026-10-07 and were collected on 2026-10-30.

The available evidence includes:
- Entry HTML, app entry bundle, global stylesheet and manifest.
- Lazy-loaded App bundle.
- Targeted chat, character/favorites, account, theme-settings and related chunks.

The captured chat bundle contains chat API route strings, message control class names and composer class names. The theme settings module exposes the User Theme controls and CSS upload guard. Full route-by-route live visual verification has not yet been completed. Details and limitations are in docs/chub-frontend-reference.md.

## Known limitations and gaps

- The Chub preview remains an approximation, not a pixel-perfect renderer.
- The Chub frontend evidence is a dated 2026-10-07 build snapshot, not proof of the exact current live build.
- Selector presence in compiled CSS does not prove that a selector is active on every route or has suitable specificity.
- A fresh live DOM/computed-style capture for relevant phone and desktop routes is still needed before shipping substantial selector changes.
- KM Warm compatibility with every relevant Chub route has not yet been established by a systematic visual regression pass.
- Arbitrary imported CSS is not mapped to visual controls.
- Project history and multi-project management are not implemented in the v1 project format.
- SillyTavern and RisuAI are not supported adapters.
- FULL KM Warm is unavailable.
- Cloudflare production migration is deferred.

## Immediate next work

1. Audit KM Warm against Chub's observed global variables and candidate selectors without editing the preserved source stylesheet unnecessarily.
2. Confirm the highest-value selectors with a fresh live mobile DOM/computed-style capture.
3. Record a compatibility matrix with evidence date, route, viewport, selector, specificity and result.
4. Fix the highest-impact chat preview/adapter mismatches.
5. Only then refactor the application into additional logical modules, preserving behavior and CI coverage.

## Verification commands

Run the same checks used by CI:

- python scripts/build.py
- python scripts/lint.py
- python scripts/check_generator.py
- node --test scripts/test_theme_project.js scripts/test_css_workbench.js scripts/test_chub_reference_capture.js
- python -m unittest scripts/test_build.py -v

A successful static build is not proof of visual correctness in Chub. Record visual verification separately.
