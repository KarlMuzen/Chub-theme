# KM Theme Generator: URL parameter spec (v1)

Contract between the generator page, the Chub Theme Helper bot, and shared links. The page is static (GitHub Pages): no server, no third-party requests. It builds the CSS in the browser and offers a download.

Example: https://karlmuzen.github.io/KM-CHUB-THEME/?v=1&p=warm&a=5b8def&fs=1.16

Only changed parameters are needed. Unknown parameters are ignored. Invalid values use defaults.

## Parameters

| Key | Meaning | Allowed | Default | Emits |
|---|---|---|---|---|
| v | spec version | 1 | 1 | n/a |
| p | palette | warm (v1) | warm | selects the warm PRESET |
| a | accent colour | six hex digits, no # | c6613f | accent family |
| fs | message text size (rem) | 0.90–1.40 | 1.06 | --c-fs |
| lh | line height | 1.40–2.00 | 1.70 | --c-lh |
| ga | chat-card opacity | 0–1 | automatic dark .25 / light .55 | --c-ga when explicitly changed |
| rp | reading font | serif, sans, mono | serif | --c-rp |
| fx | effects | lite | lite | includes the LITE block |
| blur | glass blur px | 0–20 | 10 | reserved for a future FULL source |
| m | forced dark/light | reserved | n/a | n/a |

Planned palettes (oled, midnight, forest, parchment) are not shipped. Only warm is accepted in v1. The FULL profile is not offered because the supplied v3.6 source is already LITE; its effects were removed and cannot be reconstructed from that file. A genuine FULL profile requires the original v3.5 full-effects CSS.

## Font stacks

- serif = base file's --c-rp default
- sans = system-ui,-apple-system,"Segoe UI",Roboto,sans-serif
- mono = ui-monospace,SFMono-Regular,Menlo,Consolas,monospace

Only local/system font stacks are used.

## Why m is reserved

v3.6 keys light/dark tuning to prefers-color-scheme, not just color-scheme. Forcing the scheme without re-emitting all mode-dependent tokens can mix dark colours with light-mode opacity and icon filters. Chub's own Light Mode Active attribute selector has higher specificity.

## Accent derivation

The accent input is strictly validated against six hexadecimal digits before any CSS is generated. The generator emits these values into a plain html rule:

- --c-accent: selected colour
- --c-accent-hi: 78% selected colour mixed toward black in light mode and white in dark mode
- --c-btn: selected colour
- --c-btn-hv: 88% selected colour mixed toward black/light or white/dark
- --c-act: selected colour with mode-specific mix

All numeric inputs are parsed, checked for finiteness, clamped to the documented range, and formatted before CSS generation. No raw URL value is inserted into CSS.

## Source assembly

The original source.css is kept byte-for-byte as supplied. To avoid editing that source, the build script identifies the PRESET, CORE, LITE and OVERRIDES boundaries using their existing section headings. Assembly order is PRESET → CORE → LITE → generated OVERRIDES.

The browser generator fetches only the same-origin source.css file. It has no external CSS imports, remote assets, or server-side generation.

## Builds

- LITE: source preset + core + lite + generated options.
- Compat: a static legacy build with dark defaults, prefers-color-scheme light fallbacks, and rgba fallbacks for key derived colour tokens. Best effort for older browsers; verify visually before broad distribution.
- FULL: skipped until the original v3.5 full-effects source is supplied.

The release workflow publishes available LITE and Compat assets when a version tag is pushed.

## Safety and lint

The source and generated CSS must not contain @import, remote url(), @font-face, or @charset. A data: SVG URI already present in the source is allowed. CI builds the files, runs the CSS lint, and executes the build tests.

## Verify on a phone

- Confirm the release asset link downloads instead of opening as text.
- Upload the generated file in Chub without the harmful-content rejection.
- Check custom accent contrast in both light and dark modes.
- Confirm Clear Custom CSS restores the default theme.
