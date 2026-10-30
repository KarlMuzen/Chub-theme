# Themes

Theme releases within the KM Themes independent Chub customization ecosystem.

## KM Warm v3.6

The standalone source is in [themes/km-warm](km-warm/). Configure and build it with [KM Theme Studio](https://karlmuzen.github.io/KM-THEMES/).

- **LITE**: current supplied theme, one self-contained CSS file.
- **Compat**: legacy fallback build; best effort.
- **FULL**: awaiting the original v3.5 full-effects stylesheet.

## How themes are applied (live app, Oct 2026)

- **Profile page > Edit Theme**, or inside a chat: **kebab menu (bottom left) > Change Theme**.
- **Upload Custom CSS** adds a file. There is no paste box: file upload only.
- A file containing @import is rejected, so themes must be single self-contained files.
- **Clear Custom CSS** removes it if the layout breaks.

## Rule

No selector is written until the element's HTML has been inspected in the live app.
