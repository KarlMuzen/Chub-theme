# Documentation index

The repository is the single source of truth for KM Themes. Start at the root AGENTS.md and PROJECT.md before doing implementation work.

## Canonical documents

| Document | Purpose |
|---|---|
| ../AGENTS.md | Instructions and working contract for all AI agents and contributors |
| ../PROJECT.md | Canonical product brief, scope, constraints and source-of-truth hierarchy |
| STATUS.md | Current implementation state, verified checks and known limitations |
| ARCHITECTURE.md | Existing architecture, target layers, boundaries and data flow |
| DECISIONS.md | Accepted product and technical decisions |
| ROADMAP.md | Sequenced implementation work and acceptance criteria |
| chub-frontend-reference.md | Dated Chub frontend research and compatibility evidence |
| generator-params.md | URL parameter contract |
| theme-project-v1.md | Version 1 browser project format and preservation rules |

## How to keep this documentation reliable

- Keep one authoritative document for each subject; use links rather than duplicate specifications.
- Record whether statements are observed, inferred, proposed, verified, or unverified.
- Add dates and build identifiers to external compatibility research.
- Update STATUS.md when implementation or test status changes.
- Update DECISIONS.md when an accepted decision changes; do not silently overwrite an old decision.
- Update ARCHITECTURE.md when system boundaries or data flow change.
- Keep ROADMAP.md focused on future work; move completed work into STATUS.md.
- Never add Chub's compiled bundles, copied component implementations, credentials, or private user data to this repository.
