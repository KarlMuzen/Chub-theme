# Chub Frontend Compatibility Reference

## Source and scope

Analyzed from the user-provided `chub_frontend.zip` on 2026-10-30. The archive contains:

- `index.html` (2,255 bytes)
- Vite-style entry bundle `index-20261007T172809077Z-Ci4IISAQ.js` (184,683 bytes)
- Stylesheet `index-20261007T172809077Z-D9wZgLkk.css` (174,627 bytes)
- Web app manifest and favicon

The hashed asset names indicate a build timestamp of 2026-10-07. Treat this as a dated compatibility snapshot, not proof of the exact assets currently served by Chub.

## Important completeness limitation

The HTML mounts the app at `#root`. The entry bundle uses React and React Query, then lazy-loads `./App-20261007T172809077Z-ERVMRKOe.js`. That App chunk is not present in the supplied archive. The archive therefore contains useful global styles and some runtime code, but not the complete application component tree or all dynamically imported route chunks. Do not treat it as a complete offline copy or as proof that every selector is active on every route.

## Findings useful to the theme adapter

### Global CSS variables

The stylesheet declares 36 unique custom properties in `:root` (some repeated). High-value theme tokens include:

| Token | Snapshot value |
|---|---|
| `--dark-background-color` | `#001529` |
| `--light-background-color` | `#DBDADA` |
| `--dark-primary-color` | `#3c38a8` |
| `--light-primary-color` | `#3c38a8` |
| `--dark-header-color` | `#C74900` |
| `--light-header-color` | `#DBDADA` |
| `--background-deep-alpha` | `rgb(36, 37, 37, .94)` |
| `--background-shallow-alpha` | `rgb(219, 218, 218, .9)` |
| `--background-shallow-solid` | `rgb(219, 218, 218, 1)` |
| `--ribbon-color` | `rgb(29, 37, 60)` |
| `--bright-border` | `#3c38a8` |
| `--bright-icon` | `#3C74A6` |
| `--quote-color` | `#e5e0d8` |
| `--opposite-color` | `white` |
| `--message-font-size` | `1rem` |
| `--message-line-height` | `1.5` |

Other root properties cover button colours, muted/strong text, integration badges and syntax highlighting. Preserve the original token names in the Chub adapter; KM's internal `--c-*` variables should map to platform tokens rather than assume the names are interchangeable.

### Runtime class scopes observed in the stylesheet

These selectors are present in the supplied stylesheet and are useful inspection targets. Runtime presence and specificity still need confirmation on the corresponding live screen.

**Theme / mode scopes**

- `.chub-css-override`
- `.light-mode-override`
- `.mobile-override`
- `.light-mobile-override`

**Application layout and surfaces**

- `.main-layout-content`
- `.bg-color-main`
- `.galaxy-bg`
- `.alpha-background`
- `.fake-ribbon`
- `.char-card-class`
- `#chara-list`

**Chat and message surfaces**

- `#chat-messages`
- `.message-full`
- `.message-title`
- `.message-control-buttons`
- `.font-size-message`
- `.msg-mkdn-container`
- `.chat-input-background`
- `.chat-input-container`
- `.message-details`

**Other panels**

- `.chub-drawer-body`
- `.tools-and-connectors`
- `.notif-sidebar`

Many selectors are combined with Ant Design classes such as `.ant-layout`, `.ant-layout-header`, `.ant-layout-footer`, `.ant-card`, `.ant-menu`, `.ant-input`, `.ant-select`, `.ant-dropdown` and `.ant-drawer`. The implementation should scope overrides narrowly and avoid broad overrides of every `.ant-*` element.

### Responsive and mobile behaviour

The stylesheet includes media query breakpoints at 480, 576, 767, 768, 769, 992, 1080 and 1200 pixels, plus minimum-width rules at 768 and 992 pixels. It contains 33 media rules and 4 keyframe definitions in the top-level stylesheet parse.

Mobile-specific scopes include `.mobile-override` and `.light-mobile-override`. Examples in the snapshot include zero horizontal padding on `.ant-layout-header`, explicit mobile border widths on `.ant-card-bordered`, and separate light-mobile layout/background rules.

### Practical implications

1. Build the Chub adapter around Chub's own CSS custom properties first, then apply targeted component rules where a token does not cover the surface.
2. Keep dark, light, mobile-dark and mobile-light behaviour as separate test cases. The stylesheet itself contains separate override scopes for these combinations.
3. Keep the preview's Chub layout structurally distinct from KM's Studio UI. Theme tokens can be shared; platform DOM and component selectors cannot be assumed portable.
4. Prefer stable class hooks and platform variables. Avoid broad selectors such as `[class*=...]` unless a live inspection proves they are necessary.
5. Treat selectors in this file as candidates from a dated stylesheet, not as a guaranteed supported public API. Confirm them against a fresh live DOM capture before relying on them in released CSS.

## Missing material for a higher-fidelity reference

The most valuable missing file is the lazy-loaded App bundle:

`https://chub.ai/assets/App-20261007T172809077Z-ERVMRKOe.js`

The browser may load additional lazy chunks for individual routes or features. A fresh resource capture from the current Chub build should include those assets, plus one privacy-safe DOM/computed-style capture for the mobile chat route. Avoid collecting message text, form values, cookies, tokens or request payloads.

## Usage in KM Themes

This document is a compatibility note derived from the supplied public-facing asset snapshot. Do not redistribute Chub's compiled JavaScript or stylesheet as KM Themes assets. Use the observed variable names, selector hooks and layout behaviour to write KM-owned theme CSS and preview code.