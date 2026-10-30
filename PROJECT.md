# KM Themes — canonical project brief

Last curated: 2026-10-30

This document is the authoritative product brief. AI assistants and contributors must read AGENTS.md and this file before making project changes.

## Product identity

**Name:** KM Themes  
**Tagline:** Make Chub feel like yours.  
**Positioning:** An independent Chub customization ecosystem created by KarlMuzen. KM Themes is not affiliated with, endorsed by, or operated by Chub.

The parent identity is KM THEMES. KM Theme Studio is the main browser-based customization tool. KM Warm is the flagship theme. KM Theme Helper is the dedicated theme support assistant. Chub Helper is a separate general-purpose Chub setup and configuration assistant.

Brand direction is locked:
- Geometric rosette mark.
- Earthy, botanical, refined visual language.
- Evergreen #19221C.
- Warm paper #F2EBDD / #F4F2EA.
- Terracotta #C66A4B.
- Sage #8FA78B.
- Antique gold #D2B98C.

The Studio's default appearance is dark. Users must retain light and system appearance choices. The actual chat preview reflects the selected theme palette, not the Studio brand palette.

## Product goals

1. Make Chub themes understandable and usable on phones, especially Android.
2. Let users browse a preset, customize it, preview it, and export standalone CSS.
3. Provide a guided path for less technical users and a raw CSS path for advanced users.
4. Make generated CSS compatible with Chub's custom CSS uploader.
5. Preserve source CSS and user work safely.
6. Keep the product lightweight, static, privacy-conscious, and easy to deploy.
7. Make the repository sufficient for a new AI assistant to continue work without depending on previous chat context.

## Current product surface

### KM Theme Studio
- Static browser application hosted on GitHub Pages.
- Guide mode is the first entry point.
- The guide gathers device and platform context, then offers browsing or custom creation.
- Phone is the primary device workflow.
- Current theme presets: Warm, OLED, Midnight, Forest, and Parchment.
- Current visual controls include accent colour, font family, message size, line height, card opacity, and preview appearance.
- Shareable links encode validated configuration parameters.
- CSS is generated in the browser; there is no required application backend.
- Users can copy raw CSS and download a CSS file.
- The preview is a Chub-inspired KM-owned simulation, not a pixel-perfect or official Chub renderer.

### KM Warm
- Flagship theme.
- Current supplied source is v3.6 LITE.
- LITE and compatibility output are built from themes/km-warm/source.css.
- A genuine FULL build is unavailable because the original v3.5 full-effects source is not in the repository. Do not reconstruct or advertise FULL from the LITE source.

### CSS Workbench
- Imports CSS and preserves the original imported text.
- Keeps an editable working copy separate from the original.
- Supports raw editing, copy, download, and restore.
- Arbitrary imported CSS is not injected into the Studio preview and is not automatically mapped to visual controls.
- Its syntax checks and compatibility warnings are not a complete CSS parser.

## Supported platform scope

Chub is the only supported platform target in v1.

The versioned project schema currently reserves values for chub, sillytavern, and risuai. Those reserved values are not evidence of working adapters. Do not expose or document other platforms as supported until separately researched, implemented, and tested.

## User and device constraints

- Assume the primary development and testing workflow is an Android phone, not a desktop workstation.
- Prefer commands and instructions that can be pasted and executed in Termux.
- Avoid workflows requiring manual inspection of many individual DOM nodes.
- Optimize controls, preview, export and documentation for narrow screens.
- Keep defaults dark while allowing user choice.

## Technical constraints

- Current deployment model: static files on GitHub Pages.
- Future production deployment target: Cloudflare, only when the product is ready.
- No backend, account system, cloud project synchronization, or user login is required for v1.
- Project data is stored in browser localStorage on a best-effort basis.
- Shareable settings use validated URL query parameters.
- JavaScript is currently plain browser JavaScript; retain the existing implementation unless an explicit decision approves a framework or bundler.
- Python scripts build and validate release CSS.
- The application must remain deployable as a static site.

## Chub integration boundary

KM Themes generates a CSS file for the user to upload through Chub's own theme settings. It does not connect to Chub accounts, change Chub settings remotely, call private APIs, or control Chub's internal local data.

The observed Chub custom CSS uploader rejects CSS containing:
- remote HTTP or HTTPS URL references in url(...)
- @import
- expression(

The repository's local lint is intentionally stricter in some areas. See docs/chub-frontend-reference.md and scripts/lint.py. Never treat the dated frontend research as a supported Chub API contract.

## Installation guidance

Current documented flow:
1. Build or download a KM Themes CSS file.
2. In Chub, open Profile → Edit Theme, or from a chat use the bottom-left menu → Change Theme.
3. Upload Custom CSS.
4. Leave other Chub theme settings on Default unless the user intentionally wants Chub's native controls to override generated styling.
5. Use Clear Custom CSS to remove the uploaded theme.

Chub's exact UI labels and navigation may change; recheck current UI before changing these instructions.

## Deployment policy

- GitHub Pages is the development and preview deployment.
- Current expected site: https://karlmuzen.github.io/KM-THEMES/
- Cloudflare is the planned production platform at the final deployment stage.
- Do not migrate to Cloudflare early or add Workers just because they are available. Current v1 does not need server-side compute.

## Non-goals for v1

- Cloud accounts or project sync.
- User authentication.
- Remote theme hosting that requires an API.
- Direct Chub account integration or automatic theme installation.
- Reproducing Chub's proprietary frontend bundle or component implementation.
- Claiming full preview fidelity.
- Shipping an unavailable FULL KM Warm build.
- Supporting multiple roleplay platforms before a real adapter exists.

## Source-of-truth hierarchy

1. Current source code, tests, and successful workflow output establish implementation facts.
2. AGENTS.md defines the working contract for contributors and AI assistants.
3. PROJECT.md defines product goals, scope, and stable constraints.
4. docs/STATUS.md defines current progress and known gaps.
5. docs/ARCHITECTURE.md defines current and target system structure.
6. docs/DECISIONS.md records accepted decisions.
7. Research notes provide dated evidence and must preserve uncertainty.
8. ROADMAP.md tracks planned work; it does not mean planned functionality already exists.

When evidence contradicts a document, update the document with the evidence and date. Do not silently invent a reconciliation.
