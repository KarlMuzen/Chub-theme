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
- Verify live DOM and computed styles for chat and character routes on a current Chub build.
- Verify responsive states on actual mobile browser widths.

## Phase 1 — KM Warm / Chub compatibility audit

**Priority:** First implementation task.

Tasks:
1. Inventory the selectors and Chub tokens currently used by KM Warm.
2. Compare them to the dated reference and current live DOM.
3. Classify each selector as confirmed, candidate, stale, missing, or overridden by Chub.
4. Map KM semantic colors and typography to Chub's own variables where suitable.
5. Check CSS specificity and the four mode/layout combinations.
6. Identify the smallest set of KM-owned adapter rules needed.
7. Record the result in a compatibility matrix.

Acceptance criteria:
- Every selector added or changed for compatibility has evidence and a verification state.
- No reliance on selectors observed only in a dated bundle without a warning.
- The original source.css is unchanged unless an explicit change is required.
- Existing build, lint and tests pass.
- Manual Chub checks are recorded separately from automated test results.

## Phase 2 — Incremental application modularization

Tasks:
- Identify responsibilities currently embedded in index.html.
- Extract one responsibility at a time into native JavaScript ES modules.
- Keep the guide, theme preview, generated CSS, URL parameters and CSS Workbench behavior unchanged.
- Reuse theme-project.js and css-workbench.js rather than duplicate their logic.
- Add regression tests before moving complex behavior.

Acceptance criteria:
- No framework or bundler introduced.
- Static GitHub Pages deployment still works.
- Existing share links and v1 project data remain compatible.
- Existing CI is green after each extraction.

## Phase 3 — Semantic token engine and Chub adapter

Tasks:
- Define a platform-neutral token vocabulary.
- Move preset values into data definitions.
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
1. Mobile portrait chat and message layout.
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
- Additional effects or a FULL KM Warm package unless the missing original source is obtained.
