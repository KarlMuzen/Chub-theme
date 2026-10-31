# KM Themes

**Make Chub feel like yours.**

KM Themes is an independent Chub customization ecosystem: thoughtfully designed themes, browser-based tools, configuration helpers and reusable presets. Built by [KarlMuzen](https://github.com/KarlMuzen). Not affiliated with or endorsed by Chub.

## Start here

- **[AI and contributor instructions](AGENTS.md)** — required reading and repository working contract.
- **[Canonical project brief](PROJECT.md)** — product scope, stable decisions and constraints.
- **[Current status](docs/STATUS.md)** — implementation state, known gaps and verification.
- **[Architecture](docs/ARCHITECTURE.md)** — current system and approved target structure.
- **[Decision record](docs/DECISIONS.md)** — accepted product and technical decisions.
- **[Roadmap](docs/ROADMAP.md)** — planned implementation phases.
- **[Documentation index](docs/README.md)** — all project documentation.

AI assistants should read AGENTS.md and PROJECT.md before doing work. The repository documentation is the source of truth; prior chat context is not.

## The ecosystem

| Product | Purpose |
|---|---|
| [KM Theme Studio](https://karlmuzen.github.io/KM-THEMES/) | Preview palettes, customize typography and card opacity, share configurations, and build standalone CSS locally in the browser |
| **KM Warm** | Flagship theme; v3.6 LITE is the current supplied source |
| **KM Theme Helper** | Companion assistant for theme choices, installation and troubleshooting |
| **Chub Helper** | Separate general-purpose Chub setup and configuration assistant |

## KM Warm

- [Open KM Theme Studio](https://karlmuzen.github.io/KM-THEMES/)
- [Download the latest LITE CSS](https://github.com/KarlMuzen/KM-THEMES/releases/latest/download/KM-Warm-lite-v3.6.min.css)
- [Download the compatibility CSS](https://github.com/KarlMuzen/KM-THEMES/releases/latest/download/KM-Warm-compat-v3.6.min.css)
- [Report a problem or request a feature](https://github.com/KarlMuzen/KM-THEMES/issues)

### Install in Chub

1. Download a CSS file or build a custom one in KM Theme Studio.
2. Open **Profile → Edit Theme**, or inside a chat use **bottom-left kebab → Change Theme**.
3. Choose **Upload Custom CSS**. Leave other theme settings on **Default**.

Chub accepts a CSS file upload; there is no paste box. Use **Clear Custom CSS** to remove the theme.

### Compatibility

The main LITE build requires a browser with light-dark() and color-mix() support. The compatibility build includes legacy colour fallbacks, but may look less exact in older browsers. The base theme is phone-tested; desktop remains beta.

A true FULL build is not published yet: it requires the original v3.5 full-effects stylesheet, which is not part of the supplied v3.6 LITE source.

## Brand identity

- **Mark:** geometric rosette
- **Style:** earthy, botanical, refined
- **Palette:** evergreen, warm paper, terracotta, sage and antique gold
- **Positioning:** independent Chub customization ecosystem
- **Tagline:** Make Chub feel like yours.

The KM Themes brand is the stable identity across the Studio and project materials. Individual theme previews retain their own selected palette.

## Repository layout

- themes/km-warm/ — original CSS source and build notes
- assets/js/ — browser-side project and CSS Workbench modules
- scripts/ — CSS build, lint and tests
- docs/ — architecture, status, research, decisions and specifications
- bots/ — bot cards and supporting material

## Build and test

Run:

    python scripts/build.py
    python scripts/lint.py
    python scripts/check_generator.py
    node --test scripts/test_theme_project.js scripts/test_css_workbench.js scripts/test_chub_reference_capture.js scripts/test_palettes.mjs scripts/test_chub_adapter.mjs
    python -m unittest scripts/test_build.py -v

GitHub Actions runs these checks on pushes and pull requests.

## License

MIT. See [LICENSE](LICENSE).
