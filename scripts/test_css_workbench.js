"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const css = require("../assets/js/css-workbench.js");

test("preserves imported CSS without normalizing whitespace or line endings", () => {
  const original = "/* imported */\r\n.chat {\r\n  color: #eee;\r\n}\r\n";
  const result = css.createImport(original, "theme.css");
  assert.equal(result.ok, true);
  assert.equal(result.value.originalCss, original);
  assert.equal(result.value.workingCss, original);
  assert.equal(result.report.preservedExactly, true);
});

test("reports remote resources without deleting or rejecting them", () => {
  const original = '@import url("https://example.com/theme.css");\n@font-face{src:url(https://example.com/font.woff2)}';
  const result = css.createImport(original, "remote-theme.css");
  assert.equal(result.ok, true);
  assert.ok(result.report.warnings.some(item => item.includes("@import")));
  assert.ok(result.report.warnings.some(item => item.includes("remote URL")));
  assert.equal(result.value.originalCss, original);
});

test("allows malformed but size-safe CSS to be imported for repair", () => {
  const broken = ".chat { color: red;";
  const result = css.createImport(broken, "broken.css");
  assert.equal(result.ok, true);
  assert.equal(result.report.valid, false);
  assert.equal(result.report.importable, true);
  assert.equal(result.value.originalCss, broken);
  assert.equal(result.value.workingCss, broken);
});

test("rejects empty and oversized CSS", () => {
  assert.equal(css.createImport("   ").ok, false);
  assert.equal(css.analyzeCss("a{}".repeat(css.MAX_BYTES)).valid, false);
});

test("detects unbalanced blocks, parentheses, comments and strings", () => {
  assert.equal(css.analyzeCss(".chat { color: red;").valid, false);
  assert.equal(css.analyzeCss(".chat { color: rgb(1, 2, 3; }").valid, false);
  assert.equal(css.analyzeCss("/* incomplete").valid, false);
  assert.equal(css.analyzeCss('a::after { content: "broken; }').valid, false);
});

test("does not treat braces inside comments or strings as CSS blocks", () => {
  const source = '/* } */ .chat::after { content: "}"; color: red; }';
  assert.equal(css.analyzeCss(source).valid, true);
});
