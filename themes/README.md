# Themes

CSS themes for Chub. Planned.

Each theme will have its own folder with the `.css` file, a screenshot, and the date and device it was tested on. Chub's layout changes, so every theme is marked with the last date it was checked.

## How themes are applied (live app, Oct 2026)

- **Profile page > Edit Theme**, or inside a chat: **kebab menu (bottom left) > Change Theme**.
- **Upload Custom CSS** adds a file. There is no paste box: file upload only (tested on a phone, Oct 2026).
- A file containing `@import` is rejected with a "potentially harmful content"-style error (exact wording not recorded), so themes must be single self-contained files.
- **Clear Custom CSS** removes it if the layout breaks.

## Rule

No selector is written until the element's HTML has been inspected in the live app. Guessed class names are not shipped.
