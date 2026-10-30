# KM Theme Project Format — v1

KM Theme Studio stores the active project in the user's browser. The format is versioned so future Studio releases can migrate projects without discarding their source CSS.

## Storage

- Active project key: `km-themes:active-project:v1`
- Workspace preference key: `km-themes:profile:v1`
- Storage: browser `localStorage`
- No account, server-side project storage, or analytics endpoint is required.

Local storage is best-effort. If browser storage is disabled or full, the editor remains usable but cannot promise that the project will be restored after the tab or browser is closed.

## Top-level shape

```json
{
  "schema": "km-theme-project",
  "version": 1,
  "id": "kmtp-...",
  "name": "Forest theme",
  "platform": "chub",
  "device": "phone",
  "appearance": "dark",
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp",
  "theme": {
    "source": {
      "kind": "preset",
      "label": "Forest",
      "originalCss": "",
      "overrides": ""
    },
    "settings": {
      "p": "forest",
      "a": "638a62",
      "fs": 1.06,
      "lh": 1.7,
      "ga": 0.25,
      "gaTouched": false,
      "rp": "serif",
      "fx": "lite"
    }
  }
}
```

## Enumerations and validation

- `platform`: `chub`, `sillytavern`, or `risuai`.
- `device`: `phone`, `tablet`, `desktop`, or `multiple`.
- `appearance`: `system`, `dark`, or `light`.
- `source.kind`: `preset`, `remix`, `scratch`, or `imported`.
- Palette is limited to the five current Studio palettes.
- Accent must be a six-digit hexadecimal colour without a leading `#`.
- Message size is clamped to 0.90–1.40 rem.
- Line height is clamped to 1.40–2.00.
- Card opacity is clamped to 0–1.
- Font is limited to `serif`, `sans`, or `mono`.
- Effects are currently fixed to `lite`; the project format does not claim support for the unavailable FULL source.

## CSS preservation contract

`source.originalCss` is reserved for the exact imported stylesheet. Import processing must not normalize, minify, or rewrite this field. Visual changes belong in `source.overrides`. A future import implementation must preserve unsupported CSS and report what the visual editor cannot represent. It must never silently discard imported rules.

The v1 browser module validates and stores the project structure. CSS file import, raw CSS editing, project history, and multi-project management are separate product features and are not claimed as complete by this format.

## Compatibility

- Keep the schema string and integer version stable for v1.
- Introduce a new version when changing required structure or meaning.
- Migrations must preserve `source.originalCss` byte-for-byte.
- Unknown or unsupported schema versions must not be overwritten automatically.
