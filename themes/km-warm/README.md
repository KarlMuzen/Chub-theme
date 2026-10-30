# KM Warm v3.6

The canonical upload file is the original source.css (56,582 bytes), preserved as supplied. The generator assembles validated options in the browser; it does not fetch third-party assets or inject arbitrary URL input into CSS.

## Available builds

- **LITE**: generated from the supplied v3.6 LITE source.
- **Compat**: dark/light fallbacks for browsers without light-dark() and color-mix(). Best-effort legacy build; modern browsers should use LITE.
- **FULL**: not available. The v3.6 source says the embers/dust and paper-grain layers were removed from the LITE file. A genuine FULL build requires the original v3.5 full-effects CSS. The build skips FULL until source-full.css is supplied.

## Build

Run python scripts/build.py, then python scripts/lint.py.

## Install

Chub accepts a CSS file upload only: profile → Edit Theme, or in chat bottom-left kebab → Change Theme → Upload Custom CSS. Leave other theme settings on Default. Use Clear Custom CSS to remove it.
