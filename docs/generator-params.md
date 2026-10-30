# KM Theme Studio: URL parameter spec (v1)

Contract between KM Theme Studio, the KM Theme Helper bot, and shareable configuration links. The page is static (GitHub Pages): no server, no third-party requests. It builds CSS in the browser and offers a download.

Studio: https://karlmuzen.github.io/KM-THEMES/

Example: https://karlmuzen.github.io/KM-THEMES/?v=1&p=midnight&a=5b8def&fs=1.16

Only changed parameters are needed. Unknown parameters are ignored. Invalid values use defaults.

## Parameters

| Key | Meaning | Allowed | Default | Emits |
|---|---|---|---|---|
| v | spec version | 1 | 1 | n/a |
| p | palette | warm, oled, midnight, forest, parchment | warm | selects a palette token set |
| a | accent colour | six hex digits, no # | selected palette accent | accent family |
| fs | message text size (rem) | 0.90–1.40 | 1.06 | --c-fs and --message-font-size |
| lh | line height | 1.40–2.00 | 1.70 | --c-lh and --message-line-height |
| ga | chat-card opacity | 0–1 | automatic dark .82 / light .85 (LITE) | --c-ga when explicitly changed |
| rp | reading font | serif, sans, mono | serif | --c-rp |
| fx | effects | lite | lite | includes the LITE block |
| blur | glass blur px | 0–20 | 10 | reserved for a future FULL source |
| m | forced dark/light | reserved | n/a | n/a |

The Studio includes five palettes: Warm, OLED, Midnight, Forest and Parchment. A true FULL profile is not offered because the supplied v3.6 source is already LITE; its effects were removed and cannot be reconstructed from that file. A genuine FULL profile requires the original v3.5 full-effects CSS.

## Brand system

KM Themes is the parent identity and independent Chub customization ecosystem. The visual identity uses a geometric rosette, earthy botanical styling, evergreen, warm paper, terracotta, sage and antique gold. The tagline is **Make Chub feel like yours.** The Studio's interface defaults to dark mode using the stable brand palette (while preserving light and system choices); the chat preview continues to display the user's selected theme palette.

## Live preview and sharing

- The preview is a Chub-inspired mobile layout reference, not a pixel-perfect reproduction of Chub.
- Users can toggle between a simulated character cover-art backdrop and a solid backdrop in the preview to test chat-card opacity (`ga`) readability.
- The preview displays roleplay formatting (italicized actions using `--c-act`, spoken dialogue in quotes, and bold text) across bot and user messages.
- Light/dark preview mode affects only the preview. Generated CSS retains automatic light/dark behaviour based on the user's system and Chub settings.
- Share links encode only changed, validated settings in the query string. Opening a link preloads those values. No account, analytics endpoint, or backend is used.
- The page's CSS source is fetched from the same GitHub Pages origin; all configuration and CSS assembly runs in the browser.

## Font stacks

- serif = base file's --c-rp default
- sans = system-ui,-apple-system,"Segoe UI",Roboto,sans-serif
- mono = ui-monospace,SFMono-Regular,Menlo,Consolas,monospace

Only local/system font stacks are used.

## Why m is reserved

v3.6 keys light/dark tuning to prefers-color-scheme and Chub's own mode attributes/classes, not just color-scheme. Forcing the scheme without re-emitting all mode-dependent tokens can mix dark colours with light-mode opacity and icon filters. Chub's own Light Mode Active setting remains authoritative.

## Accent derivation

The accent input is strictly validated against six hexadecimal digits before any CSS is generated. The generator emits these values into a plain html rule:

- --c-accent: selected colour
- --c-accent-hi: 78% selected colour mixed toward black in light mode and white in dark mode
- --c-btn: selected colour
- --c-btn-hv: 88% selected colour mixed toward black/light or white/dark
- --c-act: selected colour with mode-specific mix (72% toward black in light mode, 55% toward white in dark mode)

All numeric inputs are parsed, checked for finiteness, clamped to the documented range, and formatted before CSS generation. No raw URL value is inserted into CSS.

## Source assembly and Chub compatibility adapter

The original source.css is kept byte-for-byte as supplied. To avoid editing that source, the browser generator identifies the PRESET, CORE, LITE and OVERRIDES boundaries using their existing section headings. Assembly order is PRESET → CORE → LITE → source overrides → selected palette → generated options → Chub compatibility adapter rules.

The appended Chub compatibility adapter block:
- Maps `--message-font-size` to `var(--c-fs)` and `--message-line-height` to `var(--c-lh)`.
- Maps `--dark-primary-color`, `--light-primary-color` to `var(--c-btn)` and `--bright-icon` to `var(--c-accent)`.
- Supports `.light-mode-override` and `.light-mobile-override` mode scopes alongside inline `--opposite-color`.
- Ensures `.msg-mkdn-container` retains `font-size: var(--c-fs)!important` and `line-height: var(--c-lh)!important` on phone viewports (`<= 640px`).

## Builds

- LITE: source preset + core + lite + Chub adapter patch + overrides.
- Compat: a static legacy build with dark defaults, prefers-color-scheme light fallbacks, and rgba fallbacks for key derived colour tokens. Best effort for older browsers; verify visually before broad distribution.
- FULL: skipped until the original v3.5 full-effects source is supplied.

The release workflow publishes available LITE and Compat assets when a version tag is pushed.

## Safety and lint

The source and generated CSS must not contain @import, remote url(), @font-face, or @charset. A data: SVG URI already present in the source is allowed. CI builds the files, runs the CSS lint, and executes the build tests.

## Verify on a phone

- Preview Warm, OLED, Midnight, Forest and Parchment in both preview modes and both backdrop modes (Cover art / Solid).
- Change accent, font, message size, line height and card opacity; confirm the preview reacts accurately.
- Copy a share link, open it in a fresh tab, and confirm the same settings load.
- Download the generated file and upload it in Chub without the harmful-content rejection.
- Confirm Clear Custom CSS restores the default theme.