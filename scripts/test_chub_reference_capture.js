"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");

test("capture helper is a standalone script and excludes page text, input values and cookies", () => {
  const source = fs.readFileSync("tools/chub-reference-capture.js", "utf8");
  assert.match(source, /format: "km-chub-ui-reference"/);
  assert.match(source, /pageTextCaptured: false/);
  assert.match(source, /inputValuesCaptured: false/);
  assert.match(source, /cookiesCaptured: false/);
  assert.doesNotMatch(source, /innerText|innerHTML|textContent|document\.cookie|localStorage|sessionStorage/);
  assert.doesNotMatch(source, /fetch\(|XMLHttpRequest|sendBeacon/);
});

test("capture helper parses as JavaScript", () => {
  const source = fs.readFileSync("tools/chub-reference-capture.js", "utf8");
  assert.doesNotThrow(() => new vm.Script(source));
});
