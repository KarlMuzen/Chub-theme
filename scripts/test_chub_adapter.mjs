import test from "node:test";
import assert from "node:assert/strict";
import { chubAdapterFixes } from "../assets/js/chub-adapter.mjs";

const expected = [
  "",
  "/* Chub compatibility adapter (phone typography & native token sync) */",
  "html:not(#_){--message-font-size:var(--c-fs)!important;--message-line-height:var(--c-lh)!important;--dark-primary-color:var(--c-btn)!important;--light-primary-color:var(--c-btn)!important;--bright-icon:var(--c-accent)!important}",
  "html:is(.light-mode-override,.light-mobile-override){color-scheme:light}",
  ":where(html:is(.light-mode-override,.light-mobile-override)){--c-ga:.85}",
  ".msg-mkdn-container:not(#_){font-size:var(--c-fs)!important;line-height:var(--c-lh)!important}",
  ""
].join("\n");

test("Chub adapter output remains byte-for-byte stable", () => {
  assert.equal(chubAdapterFixes(), expected);
});
