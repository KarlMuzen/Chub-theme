"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const projectApi = require("../assets/js/theme-project.js");

function memoryStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
}

test("creates a versioned Chub theme project with safe defaults", () => {
  const project = projectApi.createProject({ device: "phone", platform: "chub" });
  assert.equal(project.schema, "km-theme-project");
  assert.equal(project.version, 1);
  assert.equal(project.platform, "chub");
  assert.equal(project.device, "phone");
  assert.equal(project.theme.settings.p, "warm");
  assert.equal(project.theme.source.kind, "preset");
});

test("preserves imported CSS byte-for-byte", () => {
  const originalCss = "/* original */\n:root { --custom: 1; }\n";
  const project = projectApi.createProject({
    theme: { source: { kind: "imported", originalCss } }
  });
  assert.equal(project.theme.source.originalCss, originalCss);
  assert.equal(project.theme.source.workingCss, "");
  assert.equal(project.editorMode, "visual");
});

test("sanitizes settings and rejects unsupported project schemas", () => {
  const project = projectApi.createProject({
    theme: { settings: { p: "not-a-palette", a: "red; } body{", fs: 99, lh: 0, ga: 5, rp: "script" } }
  });
  assert.equal(project.theme.settings.p, "warm");
  assert.equal(project.theme.settings.a, "c6613f");
  assert.equal(project.theme.settings.fs, 1.4);
  assert.equal(project.theme.settings.lh, 1.4);
  assert.equal(project.theme.settings.ga, 1);
  assert.equal(project.theme.settings.rp, "serif");
  assert.equal(projectApi.validateProject(project).valid, true);
  assert.equal(projectApi.validateProject({ schema: "other", version: 1 }).valid, false);
});

test("saves and reloads project and device preferences", () => {
  const storage = memoryStorage();
  const project = projectApi.createProject({ device: "phone", platform: "chub" });
  assert.equal(projectApi.saveProject(project, storage), true);
  assert.equal(projectApi.loadProject(storage).id, project.id);
  assert.equal(projectApi.clearProject(storage), true);
  assert.equal(projectApi.loadProject(storage), null);
  assert.equal(projectApi.saveProfile({ device: "desktop", platform: "risuai", appearance: "dark" }, storage), true);
  assert.deepEqual(projectApi.loadProfile(storage), {
    device: "desktop", platform: "risuai", appearance: "dark"
  });
});


test("preserves original and working CSS through local project storage", () => {
  const storage = memoryStorage();
  const originalCss = "/* source */\\r\\n.card { color: #eee; }\\r\\n";
  const workingCss = originalCss + "\\n/* local edit */";
  const project = projectApi.createProject({
    editorMode: "raw",
    theme: { source: { kind: "imported", originalCss, workingCss } }
  });
  assert.equal(projectApi.saveProject(project, storage), true);
  const restored = projectApi.loadProject(storage);
  assert.equal(restored.theme.source.originalCss, originalCss);
  assert.equal(restored.theme.source.workingCss, workingCss);
  assert.equal(restored.editorMode, "raw");
});

test("defaults new profiles to dark appearance while allowing system preference", () => {
  assert.equal(projectApi.loadProfile(memoryStorage()).appearance, "dark");
  assert.equal(projectApi.cleanSettings({}).p, "warm");
  const storage = memoryStorage();
  projectApi.saveProfile({ device: "phone", platform: "chub", appearance: "system" }, storage);
  assert.equal(projectApi.loadProfile(storage).appearance, "system");
});
test("handles unavailable or invalid storage without throwing", () => {
  const storage = {
    getItem() { throw new Error("blocked"); },
    setItem() { throw new Error("quota"); }
  };
  assert.equal(projectApi.saveProject(projectApi.createProject(), storage), false);
  assert.equal(projectApi.loadProject(storage), null);
  assert.deepEqual(projectApi.loadProfile(storage), {
    device: "phone", platform: "chub", appearance: "dark"
  });
});
