# Implementation roadmap

This roadmap records planned work, not implemented features. Reorder only when evidence or a product decision justifies it.

## Phase 0 — Research and repository handoff

**State:** Initial research collected; ongoing live verification remains.

Completed:
- Captured Chub entry page, app shell, global stylesheet, manifest and lazy-loaded App bundle.
- Captured selected route and feature chunks for chat, character/favorites, account/theme settings and related shared modules.
- Documented high-value CSS variables, candidate selectors, Chub theme controls and uploader CSS checks.
- Added a repository-wide AI working contract and canonical product/architecture documentation.

Still open:
- Verify live DOM and computed styles for chat and character routes on a current Chub build using `chub-capture.html`.
- Verify responsive states on actual mobile browser widths.

## Phase 1 — KM Warm / Chub compatibility audit

**State:** Completed for the 2026-10-07 snapshot; live DOM verification open.

Completed:
1. Inventoried the selectors and Chub tokens used by KM Warm (`docs/chub-frontend-reference.md` Section 5).
2. Identified and patched the `@media (max-width:640px)` phone typography override bug that blocked `--c-fs` and `--c-lh` on mobile screens.
3. Synchronized LITE card opacity (`--c-ga` `.82` dark / `.85` light) and italic action color (`--c-act`) between the Studio preview and exported CSS.
4. Mapped Chub native variables (`--message-font-size`, `--message-line-height`, `--dark-primary-color`, `--light-primary-color`, `--bright-icon`) and mode classes (`.light-mode-override`, `.light-mobile-override`) in the adapter layer without modifying `themes/km-warm/source.css`.
5. Synchronized `bots/km-theme-studio/CARD.md` and `docs/generator-params.md`.

Still open:
- Confirm candidate chat composer (`.chat-input-container`) and card selectors against a fresh live DOM capture.

## Phase 2 — Incremental application modularization

**Priority:** Current implementation task.

Completed:
- Extracted all five preset palette definitions from the inline Studio script into `assets/js/palettes.mjs` and imported them from the inline application ES module. Values and consumers were preserved.
- Added palette structure regression tests and extended `scripts/check_generator.py`, CI and Pages packaging for the new module.

Remaining tasks:
- Identify responsibilities currently embedded in `index.html`.
- Extract the remaining responsibilities into native JavaScript modules (`chub-adapter`, `preview`, `guide`) while updating `scripts/check_generator.py` in lockstep.
- Keep the guide, theme preview, generated CSS, URL parameters and CSS Workbench behavior unchanged.
- Reuse `theme-project.js` and `css-workbench.js` rather than duplicate their logic.
- Add regression tests before moving complex behavior.

Acceptance criteria:
- No framework or bundler introduced.
- Static GitHub Pages deployment still works.
- Existing share links and v1 project data remain compatible.
- Existing CI is green after each extraction.

## Phase 3 — Semantic token engine and Chub adapter

Tasks:
- Define a platform-neutral roleplay token vocabulary (including narration, spoken dialogue and action/thought tokens).
- Extend the extracted preset definitions into the platform-neutral semantic roleplay token model.
- Implement one deterministic compiler path from project state to preview tokens and exported CSS.
- Isolate Chub custom properties and selectors in the Chub adapter.
- Preserve source CSS assembly boundaries and compatibility output.

Acceptance criteria:
- Preview and compiler consume the same validated project state.
- Same input produces deterministic CSS.
- Invalid settings cannot inject arbitrary CSS fragments or URLs.
- Export passes repository lint and tests.
- Chub-specific selectors do not leak into generic preset definitions.

## Phase 4 — Preview fidelity

Priority order:
1. Mobile portrait chat and message layout (bot + user messages, cover art backdrop toggle).
2. Chat composer and controls.
3. Character cards and profile presentation.
4. Desktop chat and navigation.
5. Narrow and landscape responsive checks.

Acceptance criteria:
- Preview states are labelled as simulations.
- All preview variants consume shared tokens.
- Visual comparisons record Chub build, route, viewport and date.
- No Chub compiled frontend code is copied into the preview.

## Phase 5 — Release hardening

Tasks:
- Complete regression passes for dark/light and mobile/desktop.
- Verify CSS uploader acceptance in Chub.
- Document browser requirements and compatibility fallback behavior.
- Review accessible controls, focus states, narrow-screen layout and reduced motion.
- Confirm Pages preview and release artifacts.
- Plan Cloudflare migration only once production requirements are concrete.

Acceptance criteria:
- CI is green.
- Pages deploy succeeds.
- Release artifacts are generated from the canonical source.
- Installation and limitations are documented.
- No unsupported FULL or multi-platform claims.

## Deferred work

- Multi-project manager and project history.
- Cloud project synchronization or user accounts.
- SillyTavern and RisuAI adapters.
- Cloudflare Workers or other backend services.
- Additional effects or a FULL KM Warm package unless the missing original source is obtained or a dedicated full-effects compiler module is approved.