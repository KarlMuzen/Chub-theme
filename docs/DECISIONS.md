# Accepted architecture and product decisions

This is the decision record. Proposed ideas belong in docs/ROADMAP.md or docs/ARCHITECTURE.md and must not be described as implemented.

## ADR-001 — Static, local-first v1

**Status:** Accepted  
**Date:** 2026-10-30

KM Theme Studio remains a static browser application for v1. Theme customization and CSS generation run locally. Project persistence uses browser localStorage on a best-effort basis. No backend, login, analytics endpoint, or cloud project sync is required.

**Reason:** Keep hosting simple, privacy surface small, and the product deployable on GitHub Pages.

## ADR-002 — Keep plain browser JavaScript for now

**Status:** Accepted  
**Date:** 2026-10-30

Do not migrate to React, Vue, another frontend framework, or a bundler as part of the current architecture work. Use native JavaScript modules and progressively separate responsibilities from the existing static application.

**Reason:** The current application is small enough to maintain as a static site, and a framework migration would add complexity without a demonstrated requirement.

## ADR-003 — Chub is the only supported platform in v1

**Status:** Accepted  
**Date:** 2026-10-30

Chub is the only production target adapter. SillyTavern and RisuAI values reserved in the project schema do not constitute working support.

**Reason:** Chub has the available source research and existing theme upload workflow. Other platforms require independent discovery and verification.

## ADR-004 — Chub is the authority for its active appearance mode

**Status:** Accepted  
**Date:** 2026-10-30

Generated CSS should respect Chub's own light/dark setting and mode-specific selectors. Do not force a conflicting mode from KM CSS. System appearance can be used as a fallback where the source design supports it.

**Reason:** Avoid mixed dark/light token sets and conflicts with Chub's own mode specificity.

## ADR-005 — Preserve the supplied KM Warm v3.6 LITE source

**Status:** Accepted  
**Date:** 2026-10-30

Treat themes/km-warm/source.css as the canonical supplied source and preserve it byte-for-byte unless an explicit source change is approved. Build release variants through scripts/build.py. Do not claim a FULL build exists without the original v3.5 full-effects source.

**Reason:** The supplied source is LITE and cannot restore effects that were removed before it was provided.

## ADR-006 — Export standalone CSS with conservative resource policy

**Status:** Accepted  
**Date:** 2026-10-30

Export CSS must not require remote stylesheets, fonts, images or imports. It must pass repository lint and build tests. Chub's observed uploader rejects remote HTTP/HTTPS url(...) references, @import and expression(. Repository lint is intentionally stricter in some cases.

**Reason:** Predictable upload behavior, reduced security risk and no runtime dependency on third-party assets.

## ADR-007 — Keep imported CSS isolated from the preview

**Status:** Accepted  
**Date:** 2026-10-30

Imported third-party CSS is preserved and edited in the CSS Workbench, but is not automatically injected into the Studio page or preview. Visual mapping of arbitrary CSS is not a v1 promise.

**Reason:** Avoid executing untrusted CSS in the application and avoid claiming reliable semantic extraction from arbitrary stylesheets.

## ADR-008 — Preview is a KM-owned approximation

**Status:** Accepted  
**Date:** 2026-10-30

The preview simulates relevant Chub structures but does not embed or copy Chub's compiled frontend. It must not be described as pixel-perfect unless a particular state has been verified visually against the live platform.

**Reason:** Keep the preview maintainable and avoid redistributing Chub implementation code.

## ADR-009 — GitHub Pages first, Cloudflare at production stage

**Status:** Accepted  
**Date:** 2026-10-30

Use GitHub Pages for ongoing development and preview. Move to Cloudflare only when the product reaches its final production stage and there is a concrete operational reason.

**Reason:** Preserve Cloudflare resources and avoid introducing edge infrastructure before it is needed.

## ADR-010 — Mobile-first, dark default, user-selectable appearance

**Status:** Accepted  
**Date:** 2026-10-30

Design and test phone layouts first. The Studio defaults to dark appearance while preserving light and system choices. The selected theme preview remains independent of the Studio's brand palette.

**Reason:** The primary workflow is phone-based; defaults must not remove choices from other users.

## Changing an accepted decision

Do not silently edit an accepted decision to make a new implementation appear approved. Add a superseding ADR with date, reason, consequences and migration notes. Update PROJECT.md, ARCHITECTURE.md and STATUS.md where relevant.
