# Chub UI facts

Shared notes for all bots in this repo. Sources: docs.chub.ai (checked 2026-10-27) and live-app testing, Oct 2026. Where they disagree, the live app wins. Verify before relying on anything marked unverified.

## Chat page
- Header: pencil icon (Sharing Settings), broadcast icon (multiplayer, subscriber-only beta), hamburger menu (top right).
- Hamburger: Configuration, Secrets, Chat Settings, Character Settings, Chat Memory, New Chat, All Chats, View Full Chat Tree, View Discussion.
- Kebab (bottom left, by the input box): Change Persona, Impersonate Me, Change Theme, Tools, Send Image.
- Secrets and Configuration are only reachable inside a chat.

## Secrets
- Providers: Chub Mars, Chub Mercury, OpenAI, Anthropic, Kobold, Oobabooga, OpenRouter, ElevenLabs, Palm2 (Gemini key field), NovelAI.
- OpenAI and Anthropic: My Own API Key or Reverse Proxy, plus Check API Key.
- Then Menu > Configuration > Prompt Structure: set API and Model.

## Configuration
- Prompt Structure: API, Model, Pre History Instructions, Post History Instructions, Impersonation Prompt, toggles (Include Names, Ban Emojis, Text streaming, Use Lorebooks, Use Auto Summarization), Advanced (Assistant Prefill, Prompt Note, Prompt Note Depth).
- Use V2 Spec. lets a card's own system prompt, post history and lorebook apply.
- Defaults seen: Context Size 6,000 (up to 60,000), Max new token 300, Temperature 0.75.
- Lorebook settings (Scan Depth, Token Budget, Recursive Scanning, Match Whole Words) are under Generation Parameters in the live app.

## Publishing
- Fewer than 3 tags hides a character in search. Cards under 50 tokens are excluded from search.
- Rating: SFW or NSFW. Type: Public, Private, Unlisted.

## To verify
- Is there a Save Settings button after choosing a model? (community guides say yes; Chub Helper does not mention it)
- Is there an "OpenAI/proxy" option in the API dropdown for reverse proxies?
- Does Chub's character creation accept the JSON card file directly?
- Does Upload Custom CSS accept pasted text?
