import test from "node:test";
import assert from "node:assert/strict";
import { palettes } from "../assets/js/palettes.mjs";

const expectedNames = ["warm", "oled", "midnight", "forest", "parchment"];
const colorKeys = [
  "bg", "surface", "raised", "text", "strong", "muted",
  "accent", "accentHi", "btn", "btnHover", "act"
];

test("exports the five supported Studio palettes in stable order", () => {
  assert.deepEqual(Object.keys(palettes), expectedNames);
});

test("each palette contains valid light and dark theme colors", () => {
  for (const key of expectedNames) {
    const palette = palettes[key];
    assert.equal(typeof palette.name, "string", key);
    assert.match(palette.accent, /^[0-9a-f]{6}$/i, key);
    assert.equal(palette.light.accent, "#" + palette.accent, key);

    for (const mode of ["light", "dark"]) {
      for (const colorKey of colorKeys) {
        assert.match(
          palette[mode][colorKey],
          /^#[0-9a-f]{6}$/i,
          key + "." + mode + "." + colorKey
        );
      }
    }
  }
});
