# KM Theme Generator: URL parameter spec (v1)

Contract between the generator page, the KM Theme Studio bot, and shared links.
Page is static (GitHub Pages): no server, no remote fetches. It builds the CSS in the browser and offers it as a download.

Example: `{GEN}?v=1&p=warm&a=5b8def&fs=1.16`
Only changed params are needed. Unknown params are ignored. Invalid value = default.

## Parameters

| Key | Meaning | Allowed | Default | Emits |
|---|---|---|---|---|
| `v` | spec version | `1` | 1 | n/a |
| `p` | palette | `warm` (v1). Planned, not shipped: oled, midnight, forest, parchment | warm | selects PRESET block |
| `a` | accent colour | 6 hex digits, no `#` | palette's own | accent family (see below) |
| `fs` | message text size (rem) | 0.90 to 1.40 | 1.06 | `--c-fs` |
| `lh` | line height | 1.40 to 2.00 | 1.7 | `--c-lh` |
| `ga` | chat-card opacity | 0 to 1 | .25 dark / .55 light | `--c-ga` (one value covers both modes) |
| `rp` | reading font | `serif` `sans` `mono` | serif | `--c-rp` |
| `fx` | effects | `lite` `full` | lite | `lite` = include LITE block; `full` = omit it |
| `blur` | glass blur px (full only) | 0 to 20 | 10 | `--c-blur` |
| `m` | forced dark/light | **reserved, not in v1** | n/a | n/a |

Font stacks (local fonts only, remote fonts are blocked):
- `serif` = base file's `--c-rp` default
- `sans` = `system-ui,-apple-system,"Segoe UI",Roboto,sans-serif`
- `mono` = `ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`

### Why `m` is reserved
v3.6 keys its light/dark tuning (`--c-ga`, `--c-img`, `--c-bf`, `--c-icon`, `--c-fx-*`) to `@media (prefers-color-scheme:light)`, not to `color-scheme`. Emitting only `html{color-scheme:dark}` on a light-mode phone would give dark colours with light-mode icon filters and opacity. Ship `m` only after the generator also re-emits those tokens for the forced mode. Chub's own "Light Mode Active" attribute selector has higher specificity and will still win.

## Accent derivation (`a` = X)
Appended in the OVERRIDES block, same features the base file already uses (`light-dark`, `color-mix`):

```
--c-accent:X;
--c-accent-hi:light-dark(color-mix(in srgb,X 78%,#000),color-mix(in srgb,X 78%,#fff));
--c-btn:X;
--c-btn-hv:light-dark(color-mix(in srgb,X 88%,#000),color-mix(in srgb,X 88%,#fff));
--c-act:light-dark(color-mix(in srgb,X 72%,#000),color-mix(in srgb,X 55%,#fff));
```
Percentages are a starting point. Tune against screenshots in both modes, and check contrast of `--c-accent-hi` text on the light background.

## Output assembly
Order: PRESET (from `p`) → CORE → LITE block (only if `fx=lite`) → generated OVERRIDES.
Add explicit markers to the source so the build can split it: `/*@@PRESET*/` `/*@@CORE*/` `/*@@LITE*/` `/*@@OVERRIDES*/`.
Plain `html{...}` in OVERRIDES beats the `:where(html)` defaults (v3.4 behaviour).
Filename: `KM-Warm-<fx>-v<ver>.css`. Header comment lists version and the validated params only.

## Safety (required)
Links can be crafted by anyone, so the page must never put raw input in the CSS.
- Parse with `URLSearchParams`.
- `a`: regex `^[0-9a-fA-F]{6}$`, else ignore.
- Numbers: `Number()`, `isFinite`, clamp to range, format with `toFixed`.
- Enums: lookup table, else default.
- No other input reaches the output. The file never contains `@import`, remote `url()`, `@font-face`, or `@charset`. CI lint fails the build on any of them.
- Download via `Blob` with type `text/css` and a `download` attribute.

## Page behaviour
- Controls mirror the table. The page rewrites its own URL as options change (`history.replaceState`) so a look can be shared.
- Show 3 install lines: Download > profile Edit Theme (or chat Change Theme) > Upload Custom CSS.
- Show: latest version, tested-on date, "phone-tested, desktop beta", link to Releases (fallback files) and to Issues.
- Optional: static preview card using the same tokens.

## Test vectors
1. `?v=1` → stock LITE file, OVERRIDES block empty.
2. `?v=1&a=5b8def&fs=1.16&ga=0.5&fx=lite` → OVERRIDES contains:
```
html{
  --c-accent:#5b8def;
  --c-accent-hi:light-dark(color-mix(in srgb,#5b8def 78%,#000),color-mix(in srgb,#5b8def 78%,#fff));
  --c-btn:#5b8def;
  --c-btn-hv:light-dark(color-mix(in srgb,#5b8def 88%,#000),color-mix(in srgb,#5b8def 88%,#fff));
  --c-act:light-dark(color-mix(in srgb,#5b8def 72%,#000),color-mix(in srgb,#5b8def 55%,#fff));
  --c-fs:1.16rem;--c-ga:.5;
}
```
3. `?a=zzz&fs=9&rp=comic` → all invalid: output equals vector 1.
4. `?a=5b8def;}@import url(x)` → `a` fails the regex: output equals vector 1.

## Verify on a phone
- Release-asset link downloads instead of opening as text.
- Generated file uploads in Chub without the "harmful content" error.
- Both modes look right with a custom `a` (contrast).
