# Chub Helper

Unofficial support assistant for Chub AI. Not a roleplay character. Answers directly, tags anything unverified, never asks for API keys.

**Chub page:** https://chub.ai/characters/KarlMuzen/chub-helper-beta-unofficial-07e3084a3003
**Card file:** `chub-helper.json` (added with v1.5.8)

## Ask it about

- API setup and Secrets (OpenAI, Anthropic, OpenRouter, Kobold, Oobabooga, NovelAI, Gemini, proxies)
- Configuration, generation parameters, presets
- Lorebooks, macros, Handlebars
- Reviewing your card: tokens, missing pieces, problems, fixes
- Errors: 400, 401, 402, 403, 404, 429, blank or cut-off replies, repetition
- Themes and custom CSS (it asks for pasted HTML instead of guessing selectors)

It does not write cards from scratch. It points to card builders and reviews the result.

## Required settings

1. **Menu > Configuration > Prompt Structure > Use V2 Spec.** ON
2. Load the companion preset: https://chub.ai/presets/KarlMuzen/chub-helper-bot-preset-131a41d454e6 (search "chub helper bot" in the Configuration preset list)
3. Context Size 8K or more (16K is better). Chub's default was 6,000 at testing.
4. Temperature 0.3 to 0.5, Trim Incomplete Sentences OFF
5. **Configuration > Generation Parameters > Stopping Strings:** delete the `#` and `[` entries, or CSS and macro answers get cut off
6. Use a blank or neutral persona

## Notes

- Costs about 2.6K tokens every turn (estimate), plus lorebook entries when keywords match.
- Tested on Llama 3.3 70B Instruct, 16K context, Temperature 0.4.
- If UI labels come out garbled or lose their spaces, lower the repetition, frequency and presence penalties.
- Known issue: on Llama 3.3 70B the bot sometimes writes the persona name inside a macro. Restore the macro name when copying.

## Files

- `CHANGELOG.md`: version history
- `TESTS.md`: test cases and results
