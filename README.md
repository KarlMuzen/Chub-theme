# KM Chub Bots

Unofficial helper bots and themes for [Chub AI](https://chub.ai), made by [KarlMuzen](https://github.com/KarlMuzen).

> Not affiliated with or endorsed by Chub. Built from [docs.chub.ai](https://docs.chub.ai) and live-app testing. Chub changes often, so labels can go stale. Anything unverified is marked "unverified".

## Get a bot

| Bot | What it does | Status | Get it |
|---|---|---|---|
| **Chub Helper** | Support for API setup, Configuration, presets, lorebooks, macros, card review, troubleshooting | v1.5.7 live, v1.5.8 in testing | [Chub page](https://chub.ai/characters/KarlMuzen/chub-helper-beta-unofficial-07e3084a3003) / [Folder](bots/chub-helper) |
| **Card & Lorebook Builder** | Writes and reviews character cards and lorebook entries | Planned | - |
| **Theme Builder** | Chub-only CSS themes, checked against the live UI | Planned | - |

## Install in 3 steps

**Easiest:** open the bot's Chub page above and start a chat. No download needed.

**From this repo:**
1. Open the bot's folder, open its `.json` file and tap **Raw** (or **Download raw file**). Save it.
2. In Chub, create a character and upload the file. Chub accepts Tavern / Character Card V2 cards; JSON import is unverified here, so if it is rejected use the Chub page instead.
3. In a chat, open **Menu > Configuration > Prompt Structure** and turn on **Use V2 Spec.** so the card's own instructions and lorebook apply.

Each bot's folder lists its own recommended settings.

## What is in this repo

```
bots/        one folder per bot: README, card file, CHANGELOG, tests
themes/      CSS themes for Chub, each with its tested date
docs/        shared notes on the live Chub UI (verified vs unverified)
```

## Roadmap

1. **Chub Helper v1.5.8**: contradiction and POV checks in card review, test-question output, reverse proxy steps, question-style greetings.
2. **Card & Lorebook Builder**: one bot or two, decided after Helper testing.
3. **Theme Builder**: only writes CSS for elements whose HTML was checked in the live app.

## Feedback

Open an [Issue](../../issues) with the bot name, your API and model, and what the bot said. Wrong answers and out-of-date UI labels are the most useful reports.

## Credits

Ideas for Chub Helper v1.5.8 came from community bots: Character Card Builder v3 by Xioro, Interviewer by nikkey2xx2, and Samantha (OpenRouter helper) by bleachbunny. Their cards are not included here.

## License

Not set yet.
