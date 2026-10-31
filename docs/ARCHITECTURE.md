# KM Themes architecture

Status: approved target architecture; the current application is still a compact static application and has not yet been fully refactored into every proposed module.

Last reviewed: 2026-10-30

## 1. Architecture goals

- Mobile-first use, especially Android browsers.
- No backend requirement for v1.
- Remain deployable on GitHub Pages.
- Generate standalone Chub-compatible CSS locally in the browser.
- Keep Studio UI styling separate from exported Chub theme styling.
- Keep imported third-party CSS isolated from the live Studio DOM.
- Make Chub-specific assumptions replaceable through a platform adapter.
- Make architecture and product state understandable from the repository alone.

## 2. Current implementation

The current repository contains:

- index.html: static Studio entry page, guide, controls, and preview markup/styles; its inline application is a native ES module.
- assets/js/palettes.mjs: native ES module containing the five preset palette definitions shared by preview and CSS generation.
- assets/js/chub-adapter.mjs: native ES module that emits the standalone Chub compatibility CSS patch.
- assets/js/theme-project.js: versioned browser project structure, validation, persistence, and project operations.
- assets/js/css-workbench.js: CSS import/edit/restore/export workbench behavior.
- themes/km-warm/source.css: preserved KM Warm v3.6 LITE source.
- scripts/build.py: release CSS assembly and output generation.
- scripts/lint.py: exported/source CSS policy checks.
- scripts/check_generator.py: Studio hooks and JavaScript syntax checks.
- scripts/test_theme_project.js, scripts/test_css_workbench.js, and scripts/test_chub_reference_capture.js: Node tests.
- scripts/test_build.py: Python build tests.
- GitHub Actions workflows for CI, Pages deployment and tagged releases.

Do not assume every target module described below exists today. Extract functionality incrementally from the current implementation.

## 3. Target logical layers

### Experience layer

Owns user-facing workflows:
- Guide and onboarding.
- Preset browser and visual theme editor.
- Live preview.
- Raw CSS Workbench.
- Copy, download, project import/export and share actions.

The Studio interface uses the KM brand system. The simulated Chub preview uses the selected theme tokens.

### Application core

Owns project state and application rules:
- Versioned project schema.
- Project creation, update, validation and migration.
- localStorage persistence and failure handling.
- URL configuration parsing and serialization.
- Preference defaults and reset behavior.

Current project schema: docs/theme-project-v1.md. Preserve its version 1 contract. Introduce a new schema version only when required semantics or structure change, and migrate without losing original imported CSS.

### Theme engine

Owns platform-neutral design values:
- Semantic color tokens for page, surface, raised surface, text, muted text, accent, border and controls.
- Typography tokens.
- Surface opacity and effect settings.
- Preset definitions.

A preset should be configuration data, not a separate copy of the CSS compiler. Controls update project state and the same state is consumed by preview and CSS generation.

### Platform adapter

Owns platform-specific mappings and selectors. Chub is the only v1 adapter.

The Chub adapter should:
1. Map KM semantic tokens to Chub's observed CSS custom properties.
2. Emit narrow, component-specific selector rules only when a token cannot control a surface.
3. Handle light/dark and mobile/desktop scopes.
4. Track selector evidence and last verification date.
5. Avoid broad global overrides of Ant Design classes.
6. Keep all exported rules standalone and compatible with Chub's uploader.

Do not place Chub selectors inside generic palette definitions. A future platform adapter should be able to consume the same semantic theme tokens without importing Chub-specific selectors.

### Preview engine

Owns a KM-authored simulation of relevant Chub interface regions:
- Chat navigation and message layout.
- Character cards and profile information.
- Chat composer and controls.
- Phone portrait and desktop layouts.

Preview components consume semantic tokens and viewport/appearance state. They do not import or execute Chub's compiled frontend code. The preview is an approximation and must be described as such unless a visual verification establishes a specific level of fidelity.

### CSS compiler and export

Owns deterministic stylesheet assembly:
1. Load the preserved KM Warm source sections.
2. Apply the selected preset and validated user settings.
3. Apply Chub adapter mappings and scoped compatibility overrides.
4. Append intentional user overrides only where the feature supports them.
5. Validate safety and output constraints.
6. Return a standalone CSS string for copy/download.

The compiler must not insert unvalidated raw URL values or fetch third-party assets. Preserve the original source file and use scripts/build.py for release builds.

### CSS Workbench

Remains a separate editing boundary:
- Preserve imported original CSS exactly as provided.
- Store edited CSS separately as workingCss.
- Imported CSS is not injected into the Studio page or preview.
- Raw editing, copy, download and restore remain available.
- Basic validation warnings are not a complete CSS parser.
- Do not silently rewrite, minify or sanitize the immutable original import.

## 4. Data flow

1. User selects a preset or edits a setting.
2. Application core validates the input and updates the versioned project.
3. Project state is persisted locally on a best-effort basis.
4. Preview engine renders the new semantic tokens.
5. Theme engine and Chub adapter compile the same state into CSS.
6. CSS validation runs before copy/download is offered.
7. Share-link serialization exports only supported, validated settings.

Preview and compiler must not maintain independent copies of the theme configuration. A visual change that does not affect the exported CSS, or an exported token that preview ignores, is a regression.

## 5. Appearance and responsive behavior

Studio appearance:
- Default: dark.
- User choices: dark, light, or system where available.
- Studio brand palette remains independent from the selected chat theme.

Chub output:
- Chub's own light/dark mode should remain authoritative when its mode-specific classes/settings are active.
- System preference is only a fallback where appropriate.
- Do not force a mode in exported CSS unless a deliberately specified user feature and complete token mapping support it.
- Validate the four combinations separately: dark desktop, light desktop, dark mobile and light mobile.
- Include phone portrait as the primary preview and test landscape/narrow viewport behavior.

## 6. Chub adapter boundary

Research evidence is in docs/chub-frontend-reference.md. The snapshot contains:
- Chub CSS custom properties for dark/light backgrounds, primary/header colors, alpha surfaces, quote color, message font size and line height.
- Mode scopes such as .chub-css-override, .light-mode-override, .mobile-override and .light-mobile-override.
- Candidate hooks for chat messages, composer, character cards and drawers.

These hooks are not a supported public API. Before depending on a selector in a released stylesheet:
1. Confirm it exists in a fresh live DOM capture for the target route.
2. Confirm it has the expected computed style and specificity.
3. Record the live build date/asset identifier and viewport.
4. Add a regression check or documented manual verification.
5. Keep unverified selectors behind a clearly marked compatibility section.

The adapter must not assume access to Chub application state, user credentials, internal APIs or localStorage. The user installs CSS through Chub's normal upload interface.

## 7. Project storage and privacy

The v1 application is static and local-first:
- Project schema: docs/theme-project-v1.md.
- Storage: browser localStorage, best-effort.
- Share links: documented query parameters in docs/generator-params.md.
- No server-side project storage, login, analytics endpoint, or account sync is required.

Never collect message contents, form values, cookies, tokens, request payloads or other personal data in the Chub reference capture helper. The existing capture tool is designed to collect structural and computed-style information only.

## 8. Repository target layout

The following is an intended logical organization, not a requirement to move files immediately:

- core: project schema, validation, persistence, URL state.
- themes: semantic tokens and preset data.
- compiler: CSS assembly and validation.
- adapters/chub: Chub variables, selector map and compatibility rules.
- preview: KM-owned preview components.
- workbench: isolated raw CSS import/edit/export.
- export: copy, download and project export.

Keep the current file organization until a refactor is justified. If extracting modules, preserve existing behavior and tests in small steps.

## 9. Non-goals

Do not introduce a frontend framework, bundler, backend, cloud database, authentication, or multi-platform adapters as part of routine cleanup. Each requires an explicit decision recorded in docs/DECISIONS.md.
