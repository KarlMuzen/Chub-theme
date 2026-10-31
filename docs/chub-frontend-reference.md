# Chub frontend compatibility reference

Research snapshot: Chub asset build timestamp 2026-10-07  
Archives supplied by the project owner and inspected: 2026-10-30  
Status: dated technical reference; not a public Chub API contract.

## 1. Evidence and provenance

The research was performed on user-supplied downloads of public-facing Chub web assets. Two archives were inspected. They are not committed to this repository because they contain Chub's compiled frontend code and stylesheets.

### Initial archive

The initial archive contains:
- search.html: 2,264 bytes.
- manifest: manifest-20261007T172809077Z-BdAyOY0s.json, 12,742 bytes.
- entry JavaScript: index-20261007T172809077Z-Ci4IISAQ.js, 184,683 bytes.
- main stylesheet: index-20261007T172809077Z-D9wZgLkk.css, 174,627 bytes.
- lazy-loaded App bundle: App-20261007T172809077Z-ERVMRKOe.js, 12,972,777 bytes.
- favicon.

The first archive initially lacked the App bundle; the owner later downloaded it and supplied an updated archive. The App bundle is therefore no longer a missing research input.

### Targeted archive

The second archive contains:
- index-20261007T172809077Z-DDbVZ1ue.js, 808,955 bytes.
- index-20261007T172809077Z-cI-S1NHQ.js, 169,927 bytes.
- index-20261007T172809077Z-3F1lK23c.js, 86,524 bytes.
- MarsPrice-20261007T172809077Z-CWgRp40j.js, 31,219 bytes.
- StageManager-20261007T172809077Z-Cab0Ilqq.js, 124,846 bytes.
- TagFormItem-20261007T172809077Z-DkVugSu5.js, 5,271 bytes.
- ProgressBar-20261007T172809077Z-D1Y-H6w0.js, 839 bytes.
- antd-img-crop.esm-20261007T172809077Z-CAzp6Ot0.js, 32,208 bytes.
- empty-20261007T172809077Z-8jb3Ej7A.js, 201,214 bytes.
- index-20261007T172809077Z-Cy8LOuom.css, 19,423 bytes.
- empty-20261007T172809077Z-WkBljMO6.css, 399 bytes.

The large App bundle references the targeted chunks by their timestamped asset names. The downloaded chunks are useful for static string and selector analysis; their compiled source is not a complete supported development API.

## 2. Global stylesheet findings

The main stylesheet exposes Chub theme variables and layout hooks. High-value observed root variables include:

| Variable | Value in captured build |
|---|---|
| --dark-background-color | #001529 |
| --light-background-color | #DBDADA |
| --dark-primary-color | #3c38a8 |
| --light-primary-color | #3c38a8 |
| --dark-header-color | #C74900 |
| --light-header-color | #DBDADA |
| --background-deep-alpha | rgb(36, 37, 37, .94) |
| --background-shallow-alpha | rgb(219, 218, 218, .9) |
| --background-shallow-solid | rgb(219, 218, 218, 1) |
| --ribbon-color | rgb(29, 37, 60) |
| --bright-border | #3c38a8 |
| --bright-icon | #3C74A6 |
| --quote-color | #e5e0d8 |
| --opposite-color | white |
| --message-font-size | 1rem |
| --message-line-height | 1.5 |

Other variables cover button states, muted/strong text, integration badges and syntax highlighting. Preserve Chub variable names in the adapter; KM's internal --c-* variables are not interchangeable unless an explicit mapping exists.

### Mode scopes and candidate selectors

Mode scopes present in the captured stylesheet:
- .chub-css-override
- .light-mode-override
- .mobile-override
- .light-mobile-override

Application layout and surfaces:
- .main-layout-content
- .bg-color-main
- .galaxy-bg
- .alpha-background
- .fake-ribbon
- .char-card-class
- #chara-list

Chat and message surfaces:
- #chat-messages
- .message-full
- .message-title
- .message-control-buttons
- .font-size-message
- .msg-mkdn-container
- .chat-input-background
- .chat-input-container
- .message-details

Other panels:
- .chub-drawer-body
- .tools-and-connectors
- .notif-sidebar

The stylesheet combines some selectors with Ant Design classes, including .ant-layout, .ant-layout-header, .ant-layout-footer, .ant-card, .ant-menu, .ant-input, .ant-select, .ant-dropdown and .ant-drawer.

These selectors are research candidates, not guaranteed stable hooks. Their presence in a compiled stylesheet does not prove they are active on every route or have sufficient specificity against current runtime styles.

### Responsive evidence

The stylesheet includes media-query breakpoints at 480, 576, 767, 768, 769, 992, 1080 and 1200 pixels, plus minimum-width rules at 768 and 992 pixels. It contains mobile-specific mode scopes. Verify current behavior against a live viewport rather than copying breakpoint assumptions without testing.

## 3. Targeted JavaScript findings

### Chat-related chunk: index-...-DDbVZ1ue.js

Observed strings include:
- my_chats query key.
- /api/core/chats endpoint.
- .message-control-buttons class.
- .chat-input-container class.
- .font-size-message class.
- character/chat references.

This is strong evidence that the chunk contains chat-list and chat-interface logic. It is suitable for identifying candidate chat structures and control names, but not for copying React components or implementation code.

### Character/favorites-related chunk: index-...-cI-S1NHQ.js

Observed strings include:
- Character and favorites UI text.
- Favorites tab identifiers and related character data.
- Character API paths.
- An edit path fragment.

This supports classifying it as character/favorites-related code. Do not infer a complete route map from these strings alone.

### Account/profile-related chunk: index-...-3F1lK23c.js

Observed strings include account endpoints, account preferences, sorting controls and an Edit Theme label. This indicates account/profile settings code is present. The dedicated User Theme controls are in the MarsPrice chunk described below.

### User Theme settings chunk: MarsPrice-...-CWgRp40j.js

The captured User Theme dialog exposes controls for:
- Light Mode Active / Dark Mode Active.
- Custom CSS Enabled / Disabled.
- Show / Hide Background Image.
- Font Size.
- Line Height.
- Card Font Size.
- In-Chat Avatar Size.
- Text Color and Emphasis Color.
- Quote Color and Link Color.
- Chat Background Color and Message Background Color.
- Site Background Color, Menu Color and Sub Menu Color.
- Sidebar Enabled / Disabled.
- Upload Custom CSS and Clear Custom CSS.
- Theme presets.

Observed theme object properties include mode, show_custom_css, show_background, font_size, line_height, card_font_size, chat_avatar_size, text_color, em_color, quote_color, quote_color_light, link_color, light/dark chat and message background values, and sidebar state.

The compiled code updates a localData object through an updateLocalData context function. This is evidence about that captured frontend implementation only; KM Themes must not access or manipulate Chub's internal localData.

### Other targeted chunks

- StageManager, TagFormItem, ProgressBar, antd-img-crop and the empty chunk were downloaded because the App bundle referenced them. Their precise product responsibilities have not been established for KM compatibility work. Do not assign them roles without further inspection.
- The 19,423-byte CSS chunk is separate from the main 174,627-byte stylesheet. Its precise relevance to theme generation has not been established here.

## 4. Chub custom CSS uploader checks

The captured User Theme code checks CSS text against three patterns before upload:
- HTTP or HTTPS references inside url(...).
- @import.
- expression(.

The UI reports a potentially harmful CSS error when one of these checks matches.

This is a snapshot of client-side checks in the captured build, not a complete security model or guarantee of server-side acceptance. Do not rely on bypassing these checks.

The KM repository's own scripts/lint.py is intentionally stricter in some respects: it rejects @import, @font-face and @charset, and rejects non-data url(...) except its recognized url(x) feature-test placeholder. Keep project lint policy authoritative for KM output.

The existing KM Warm source contains a data-URI SVG. The build and lint pipeline should preserve and validate it.

## 5. Phase 1 KM Warm / Chub compatibility matrix (Audit: 2026-10-30)

This matrix compares `themes/km-warm/source.css` against the 2026-10-07 Chub frontend snapshot and records adapter mitigations applied in `scripts/build.py` and `assets/js/chub-adapter.mjs` for Studio-generated CSS.

| Target / Hook | Status in `source.css` | Evidence in 2026-10-07 Snapshot | Classification & Adapter Action |
|---|---|---|---|
| `--dark-background-color`, `--light-background-color`, `--ribbon-color`, `--background-deep-alpha`, `--background-shallow-alpha`, `--quote-color`, `--link-color`, `--opposite-color` | Mapped in `html:not(#_)` | Observed in main stylesheet & `MarsPrice` chunk | **Confirmed.** Preserved. |
| `--message-font-size`, `--message-line-height` | Missing in `source.css` | Observed in main stylesheet | **Patched in Adapter.** Mapped to `var(--c-fs)!important` and `var(--c-lh)!important`. |
| `--dark-primary-color`, `--light-primary-color`, `--bright-icon` | Missing in `source.css` | Observed in main stylesheet | **Patched in Adapter.** Mapped to `var(--c-btn)!important` and `var(--c-accent)!important`. |
| `.light-mode-override`, `.light-mobile-override` | Missing in `source.css` (only checks inline `--opposite-color: black`) | Observed in main stylesheet | **Patched in Adapter.** Added light-mode scheme and `--c-ga:.85` fallback for these classes. |
| `@media (max-width:640px) .msg-mkdn-container` | Hardcodes `font-size:1rem;line-height:1.62` in `source.css` line 236 | Observed `.msg-mkdn-container` in main stylesheet | **Fixed in Adapter.** Appended `.msg-mkdn-container:not(#_){font-size:var(--c-fs)!important;line-height:var(--c-lh)!important}` so phone screens respect user `fs` and `lh` controls. |
| `--c-ga` default opacity | `source.css` LITE block sets `.82` dark / `.85` light (overriding earlier `.25`/`.55`) | Observed in `source.css` lines 455–457 | **Synchronized.** Studio preview and default slider now match LITE's `.82` dark / `.85` light. |
| `#chat-messages`, `.msg-mkdn-container` | Active in `source.css` | Observed in main stylesheet & chat chunk | **Confirmed.** |
| `.chat-layout-bigbox .w-full.transition-all.duration-500` | Active in `source.css` for composer bar | Chat chunk also exposes `.chat-input-container` and `.chat-input-background` | **Candidate / Fragile.** Works when Tailwind classes match, but should be verified against a fresh live DOM capture and paired with `.chat-input-container`. |
| `[class*="subscribe" i]`, `[class*="bg-indigo" i]` | Active in `source.css` | Inferred from screenshots | **Unverified Guess.** Retain until live DOM capture confirms exact class names. |

## 6. Compatibility implications for KM Themes

1. Prefer mapping semantic KM tokens to Chub's existing CSS variables before writing selector-level overrides.
2. Use narrow component overrides only when a variable cannot control the required surface.
3. Keep dark/light and mobile/desktop cases distinct in tests.
4. Avoid broad overrides of all .ant-* classes.
5. Keep Chub selectors in a dedicated adapter, not inside generic palette data.
6. The preview must remain KM-authored and only approximate Chub's DOM/layout.
7. The user's CSS is uploaded through Chub's own UI. KM Themes does not have account integration or an automatic installation API.

## 7. Required next research

Before a high-impact Chub selector is relied on in released CSS:
- Capture the current live build's asset names and date.
- Inspect a fresh mobile chat route and character route.
- Capture only structural DOM paths, computed styles, viewport and CSS custom properties.
- Do not collect message text, form contents, cookies, tokens, local storage, request bodies or response payloads.
- Confirm selector presence, specificity and computed effect.
- Record route, viewport, build ID/date and verification result in the compatibility matrix.

The existing privacy-conscious capture helper is in chub-capture.html and tools/chub-reference-capture.js.

## 8. Handling and licensing boundary

The archives were provided for private technical analysis. Do not commit or redistribute Chub's compiled JavaScript, CSS, source maps, copied component source or large excerpts. Record concise observations, selectors, variable names and compatibility conclusions only. Implement KM-owned CSS and preview code independently.