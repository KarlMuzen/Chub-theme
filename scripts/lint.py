#!/usr/bin/env python3
"""Reject CSS constructs blocked by Chub's custom CSS uploader."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
FILES = [ROOT / "themes/km-warm/source.css"] + sorted((ROOT / "dist").glob("*.css"))
ERRORS = []
PATTERNS = [
    (re.compile(r"@import\b", re.I), "@import"),
    (re.compile(r"@font-face\b", re.I), "@font-face"),
    (re.compile(r"@charset\b", re.I), "@charset"),
]
for path in FILES:
    text = path.read_text(encoding="utf-8")
    for pattern, label in PATTERNS:
        if pattern.search(text):
            ERRORS.append(f"{path.relative_to(ROOT)}: forbidden {label}")
    for match in re.finditer(r"url\(\s*([^)]*)\)", text, re.I):
        value = match.group(1).strip(" \t\r\n'\"")
        if not value.lower().startswith("data:"):
            ERRORS.append(f"{path.relative_to(ROOT)}: non-data url() is not allowed")
            break
if ERRORS:
    print("\n".join(ERRORS), file=sys.stderr)
    raise SystemExit(1)
print(f"CSS lint passed ({len(FILES)} file(s)).")
