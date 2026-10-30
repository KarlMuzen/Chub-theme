# KM Chub Themes & Bots

Independent Chub community tools by [KarlMuzen](https://github.com/KarlMuzen). Not affiliated with or endorsed by Chub.

## KM Warm theme

A warm, low-distraction Chub theme with automatic light/dark colours. The current public source is **KM Warm v3.6 LITE**.

- **[Open the mobile-first theme generator](https://karlmuzen.github.io/KM-CHUB-THEME/)**
- [Download the latest LITE CSS](https://github.com/KarlMuzen/KM-CHUB-THEME/releases/latest/download/KM-Warm-lite-v3.6.min.css)
- [Download the compatibility CSS](https://github.com/KarlMuzen/KM-CHUB-THEME/releases/latest/download/KM-Warm-compat-v3.6.min.css)
- [Report a problem or request a feature](https://github.com/KarlMuzen/KM-CHUB-THEME/issues)

### Install in Chub

1. Download a CSS file (or build a custom one with the generator).
2. Open **Profile → Edit Theme**, or inside a chat use **bottom-left kebab → Change Theme**.
3. Choose **Upload Custom CSS**. Leave other theme settings on **Default**.

Chub accepts a CSS file upload; there is no paste box. Use **Clear Custom CSS** to remove the theme.

### Compatibility

The main LITE build requires a browser with light-dark() and color-mix() support. The compatibility build includes legacy colour fallbacks, but may look less exact in older browsers. The base theme is phone-tested; desktop remains beta.

A true FULL build is not published yet: it requires the original v3.5 full-effects stylesheet, which is not part of the supplied v3.6 LITE source.

## Bots

| Bot | Purpose | Status |
|---|---|---|
| Chub Helper | Chub setup, configuration, presets, lorebooks, macros and troubleshooting | Existing bot; see its [Chub page](https://chub.ai/characters/KarlMuzen/chub-helper-beta-unofficial-07e3084a3003) |
| Chub Theme Helper | Explains KM Warm options, installation and troubleshooting | In development |

## Repository layout

- themes/km-warm/ — original CSS source and build notes
- scripts/ — CSS build, lint and tests
- docs/ — generator parameter contract
- bots/ — bot cards and supporting material

## Build locally

Run python scripts/build.py, python scripts/lint.py, and python -m unittest scripts/test_build.py -v.

The CI workflow runs these checks on pushes and pull requests.

## License

MIT. See [LICENSE](LICENSE).
