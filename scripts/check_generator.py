#!/usr/bin/env python3
"""Static checks for the browser-side KM Theme Studio."""
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "index.html"
PROJECT_MODULE = ROOT / "assets/js/theme-project.js"
CSS_MODULE = ROOT / "assets/js/css-workbench.js"
PALETTE_MODULE = ROOT / "assets/js/palettes.mjs"
html = PAGE.read_text(encoding="utf-8")
scripts = re.findall(r'<script type="module">([\s\S]*?)</script>', html)
if len(scripts) != 1:
    raise SystemExit(f"Expected one inline application module, found {len(scripts)}")
palette_source = PALETTE_MODULE.read_text(encoding="utf-8")

required = [
    'src="assets/js/theme-project.js"',
    'src="assets/js/css-workbench.js"',
    '<script type="module">',
    'import { palettes } from "./assets/js/palettes.mjs";',
    'id="open-css-import"',
    'id="load-imported-css"',
    'id="raw-css-editor"',
    'id="copy-raw-css"',
    'id="download-raw-css"',
    'id="restore-original-css"',
    'id="guide"',
    'id="guide-step"',
    'id="guide-next"',
    'id="studio-workspace"',
    'id="change-guide"',
    'class="brand-lockup"',
    'class="brand-symbol"',
    "KM THEMES",
    "Make Chub feel like yours.",
    'id="mock-shell"',
    'class="mock-nav"',
    'class="mock-message-text"',
    'class="mock-composer-bar"',
    'id="share"',
    'id="download"',
    'fetch("themes/km-warm/source.css")',
]
missing = [item for item in required if item not in html]
if missing:
    raise SystemExit("Missing Studio feature hooks: " + ", ".join(missing))

for palette in ("warm", "oled", "midnight", "forest", "parchment"):
    if not re.search(r"\b" + palette + r":\{name:", palette_source):
        raise SystemExit(f"Palette definition is missing from palettes.mjs: {palette}")

with tempfile.NamedTemporaryFile("w", suffix=".mjs", encoding="utf-8", delete=False) as handle:
    handle.write(scripts[0])
    js_path = Path(handle.name)
try:
    subprocess.run(["node", "--check", str(js_path)], check=True)
    subprocess.run(["node", "--check", str(PROJECT_MODULE)], check=True)
    subprocess.run(["node", "--check", str(CSS_MODULE)], check=True)
    subprocess.run(["node", "--check", str(PALETTE_MODULE)], check=True)
finally:
    js_path.unlink(missing_ok=True)

print("KM Themes branding, onboarding, project modules, palette module, CSS import/raw editor hooks and five presets: OK")
