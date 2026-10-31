# AI agent instructions

This repository is the canonical source of truth for KM Themes. These instructions apply to every AI coding assistant, automation, and human contributor working in this repository.

## Required reading order

Before planning or changing code, read:

1. PROJECT.md — canonical product brief, constraints, and locked decisions.
2. docs/STATUS.md — what exists now, what was last verified, and known limitations.
3. docs/ARCHITECTURE.md — current implementation and approved target architecture.
4. docs/DECISIONS.md — accepted architecture and product decisions.
5. The relevant research note, especially docs/chub-frontend-reference.md, before changing Chub compatibility.
6. docs/ROADMAP.md and README.md as needed.

Do not rely on an old chat transcript, a generated summary, memory, or assumptions when the repository contains a newer decision or implementation. If repository documents conflict, prefer the actual current source and tests for implementation facts, then record and resolve the documentation conflict.

## Source-of-truth rules

- PROJECT.md is the canonical product brief.
- docs/STATUS.md is the canonical record of current implementation state.
- docs/ARCHITECTURE.md is the canonical architecture contract.
- docs/DECISIONS.md records accepted decisions. Do not silently reverse them.
- Research notes describe evidence and its limitations; they are not promises of Chub API stability.
- README.md is an entry page, not a second competing specification.

When changing a feature, update the relevant documentation in the same commit. Update STATUS.md and ROADMAP.md when implementation state or priorities change.

## Working contract

- Work mobile-first. The primary development and usage constraint is an Android phone workflow.
- Keep the default Studio appearance dark. Preserve light and system choices for users who prefer them.
- Keep KM Themes independent and clearly unaffiliated with Chub.
- Chub is the only supported platform adapter in v1. Do not advertise SillyTavern or RisuAI support merely because the project schema reserves those platform values.
- Prefer incremental changes to the current static application. Do not migrate frameworks, add a bundler, or introduce a backend without an explicit product/architecture decision.
- Keep the site usable on GitHub Pages. Cloudflare is a later production deployment target, not a prerequisite for current development.
- Do not make the Studio depend on Chub credentials, private APIs, user sessions, browser storage from chub.ai, or server-side access to Chub.
- Keep imported third-party CSS isolated in the CSS Workbench. Never inject arbitrary imported CSS into the Studio page or its preview.
- Preserve the original themes/km-warm/source.css unless a change to that source is explicitly required and documented. Build products through scripts/build.py.
- Never claim that a FULL KM Warm build exists. The supplied v3.6 source is LITE; FULL needs the original full-effects source stylesheet.
- Generated Chub CSS must remain standalone and pass the repository's own lint and tests. Do not add external font, image, stylesheet, or script dependencies to exported theme CSS.
- Treat Chub selectors and internal settings as observed compatibility targets, not a stable public API. Re-verify against a fresh live build and DOM before relying on them.
- Do not commit Chub's compiled JavaScript, CSS, source maps, downloaded bundles, or copied component code. Keep only concise technical findings and KM-authored implementation.
- Do not put credentials, tokens, cookies, account data, private chat content, or user-specific DOM text into research captures or repository files.
- Do not claim a test, visual check, deployment, or browser verification occurred unless it actually did.

## Before and after changes

1. Inspect the current branch, working tree or latest commit, and relevant files before editing.
2. Make the smallest coherent change that satisfies the task.
3. Run the relevant tests. For application/compiler work, use the full checks listed in README.md when feasible.
4. Report tests that were not run; do not imply they passed.
5. Update STATUS.md, ROADMAP.md, architecture, decisions, and research notes when the change affects them.
6. Keep a clear commit message. Direct commits to main are an authorized project workflow; do not force-push or rewrite history.
7. Verify the resulting GitHub Actions CI and Pages deployment when a commit triggers them.

## Project commands

The repository's current CI runs:

- python scripts/build.py
- python scripts/lint.py
- python scripts/check_generator.py
- node --test scripts/test_theme_project.js scripts/test_css_workbench.js scripts/test_chub_reference_capture.js scripts/test_palettes.mjs scripts/test_chub_adapter.mjs
- python -m unittest scripts/test_build.py -v

Do not invent additional package-manager or build commands. Check the current workflow if CI changes.

## Evidence labels

Use precise language in documentation:

- Observed: directly present in captured source, the repository, or a test result.
- Inferred: a reasoned interpretation of observed evidence; identify it as such.
- Proposed: a target design not yet implemented.
- Verified: tested against a named commit, build, browser, device, or Chub route.
- Unverified: plausible but not tested against the relevant live environment.

Every Chub compatibility claim should include its evidence date or snapshot where practical.
