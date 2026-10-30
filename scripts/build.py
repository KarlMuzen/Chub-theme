#!/usr/bin/env python3
"""Build KM Warm variants from the untouched v3.6 LITE source."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "themes/km-warm/source.css"
DIST = ROOT / "dist"
ANCHORS = {
    "preset": "/* ===== PRESET",
    "core": "/* KM Warm v2.1",
    "lite": "/* ===================================================================================\n   LITE — performance pass.",
    "overrides": "/* ===== YOUR OVERRIDES",
}

def split_source(source: str):
    positions = {key: source.find(anchor) for key, anchor in ANCHORS.items()}
    if any(pos < 0 for pos in positions.values()):
        raise ValueError("KM Warm source is missing a required section boundary")
    ordered = list(positions.values())
    if ordered != sorted(ordered) or len(set(ordered)) != len(ordered):
        raise ValueError("KM Warm source sections are missing, duplicated, or out of order")
    p, c, l, o = ordered
    return {"preset": source[p:c], "core": source[c:l], "lite": source[l:o], "overrides": source[o:]}

def minify(css: str) -> str:
    out, i, quote, comment, pending = [], 0, None, False, False
    while i < len(css):
        ch = css[i]
        nxt = css[i + 1] if i + 1 < len(css) else ""
        if comment:
            if ch == "*" and nxt == "/":
                comment = False
                i += 2
                continue
            i += 1
            continue
        if quote:
            out.append(ch)
            if ch == "\\" and i + 1 < len(css):
                i += 1
                out.append(css[i])
            elif ch == quote:
                quote = None
            i += 1
            continue
        if ch == "/" and nxt == "*":
            comment = True
            i += 2
            continue
        if ch in ("'", '"'):
            if pending and out and (out[-1].isalnum() or out[-1] in "_-)"):
                out.append(" ")
            pending = False
            quote = ch
            out.append(ch)
            i += 1
            continue
        if ch.isspace():
            pending = True
            i += 1
            continue
        if ch in "{}:;,>~":
            if ch == "}" and out and out[-1] == ";":
                out.pop()
            while out and out[-1] == " ":
                out.pop()
            out.append(ch)
            pending = False
            i += 1
            continue
        if pending and out:
            prev = out[-1]
            if (prev.isalnum() or prev in "_-)") and (ch.isalnum() or ch in "_-("):
                out.append(" ")
        pending = False
        out.append(ch)
        i += 1
    return "".join(out).strip()

def light_dark_to_dark(css: str) -> str:
    """Replace light-dark(light, dark) with dark argument, ignoring comments and strings."""
    out, i, needle = [], 0, "light-dark("
    while i < len(css):
        if css.startswith("/*", i):
            j = css.find("*/", i + 2)
            if j < 0:
                raise ValueError("Unterminated CSS comment")
            out.append(css[i:j + 2])
            i = j + 2
            continue
        if css[i] in ("'", '"'):
            quote, j = css[i], i + 1
            while j < len(css):
                if css[j] == "\\":
                    j += 2
                    continue
                if css[j] == quote:
                    j += 1
                    break
                j += 1
            out.append(css[i:j])
            i = j
            continue
        if css.startswith(needle, i):
            depth, quote, comma, j = 1, None, -1, i + len(needle)
            while j < len(css) and depth:
                ch = css[j]
                if quote:
                    if ch == "\\":
                        j += 2
                        continue
                    if ch == quote:
                        quote = None
                elif ch in ("'", '"'):
                    quote = ch
                elif ch == "(":
                    depth += 1
                elif ch == ")":
                    depth -= 1
                elif ch == "," and depth == 1 and comma < 0:
                    comma = j
                j += 1
            if depth or comma < 0:
                raise ValueError("Malformed light-dark() expression")
            out.append(css[comma + 1:j - 1].strip())
            i = j
        else:
            out.append(css[i])
            i += 1
    return "".join(out)

def chub_adapter_patch():
    """Compatibility rules appended during build without modifying source.css."""
    return """/* Chub compatibility adapter */
html:not(#_){--message-font-size:var(--c-fs)!important;--message-line-height:var(--c-lh)!important;--dark-primary-color:var(--c-btn)!important;--light-primary-color:var(--c-btn)!important;--bright-icon:var(--c-accent)!important}
html:is(.light-mode-override,.light-mobile-override){color-scheme:light}
:where(html:is(.light-mode-override,.light-mobile-override)){--c-ga:.85}
.msg-mkdn-container:not(#_){font-size:var(--c-fs)!important;line-height:var(--c-lh)!important}
"""

def compat_fallback():
    return """@supports not (color:light-dark(white,black)){html{--c-bg:#262624;--c-surface:#30302e;--c-raised:#3a3935;--c-text:#e3e1d7;--c-strong:#faf9f5;--c-muted:#a3a198;--c-accent:#d97757;--c-accent-hi:#e8936f;--c-btn:#bc5a3c;--c-btn-hv:#cc6a49;--c-act:#e2b295}
@media(prefers-color-scheme:light){html{--c-bg:#faf9f5;--c-surface:#fffdf9;--c-raised:#f0eee6;--c-text:#1f1e1d;--c-strong:#141413;--c-muted:#6b6a64;--c-accent:#c6613f;--c-accent-hi:#a8472a;--c-btn:#bc5a3c;--c-btn-hv:#a94e32;--c-act:#9a4a30}}}
@supports not (color:color-mix(in srgb,red,blue)){:where(html){--c-glass:rgba(48,48,46,.86);--c-glass-strong:rgba(38,38,36,.88);--c-chat:rgba(48,48,46,.82);--c-line:rgba(227,225,215,.14);--c-line-hi:rgba(227,225,215,.27);--c-ring:rgba(217,119,87,.30);--c-sel:rgba(217,119,87,.34);--c-glow:rgba(217,119,87,.10);--c-switch-off:rgba(227,225,215,.25);--c-shallow:transparent}
@media(prefers-color-scheme:light){:where(html){--c-glass:rgba(255,253,249,.86);--c-glass-strong:rgba(250,249,245,.88);--c-chat:rgba(255,253,249,.85);--c-line:rgba(31,30,29,.14);--c-line-hi:rgba(31,30,29,.27);--c-ring:rgba(198,97,63,.30);--c-sel:rgba(198,97,63,.34);--c-glow:rgba(198,97,63,.10);--c-switch-off:rgba(31,30,29,.25);--c-shallow:rgba(250,249,245,.72)}}}
"""

def main():
    source = SOURCE.read_text(encoding="utf-8")
    sections = split_source(source)
    DIST.mkdir(exist_ok=True)
    lite = sections["preset"] + sections["core"] + sections["lite"] + chub_adapter_patch() + sections["overrides"]
    compat = lite + compat_fallback()
    outputs = {
        "KM-Warm-lite-v3.6.min.css": minify(lite),
        "KM-Warm-compat-v3.6.min.css": minify(compat),
    }
    full_source = ROOT / "themes/km-warm/source-full.css"
    if full_source.exists():
        full = split_source(full_source.read_text(encoding="utf-8"))
        outputs["KM-Warm-full-v3.6.min.css"] = minify(full["preset"] + full["core"] + chub_adapter_patch() + full["overrides"])
    for name, content in outputs.items():
        (DIST / name).write_text(content + "\n", encoding="utf-8")
        print(f"{name}: {len(content.encode('utf-8'))} bytes")
    if not full_source.exists():
        print("Full build skipped: original v3.5 full-effects source is not present.")

if __name__ == "__main__":
    main()