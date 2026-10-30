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
      "overrides": "",
      "workingCss": ""
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
  },
  "editorMode": "visual"
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

`source.originalCss` is the immutable restore point. `source.workingCss` is the editable stylesheet. Import processing stores the exact original string in both fields and never normalizes, minifies, sanitizes, or rewrites it. Raw edits update only `workingCss`. Restore copies `originalCss` back into `workingCss`. The current raw editor checks basic structure (balanced blocks, parentheses, comments and strings) and reports selected compatibility/security warnings; it is not a complete CSS parser. Imported CSS is not injected into the Studio preview. The current implementation does not map arbitrary third-party CSS into visual controls, so imported projects open in Raw mode.

The v1 browser modules validate and store the project structure, import a `.css` file or pasted CSS (up to 1 MB), provide raw editing, copy and download actions, and restore the original import. Project history and multi-project management remain future features.

## Compatibility

- Keep the schema string and integer version stable for v1.
- Introduce a new version when changing required structure or meaning.
- Migrations must preserve `source.originalCss` byte-for-byte.
- Unknown or unsupported schema versions must not be overwritten automatically.
