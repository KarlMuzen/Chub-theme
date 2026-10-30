(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.KMThemeProject = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var SCHEMA = "km-theme-project";
  var VERSION = 1;
  var PROJECT_KEY = "km-themes:active-project:v1";
  var PROFILE_KEY = "km-themes:profile:v1";
  var PALETTES = ["warm", "oled", "midnight", "forest", "parchment"];
  var DEVICES = ["phone", "tablet", "desktop", "multiple"];
  var PLATFORMS = ["chub", "sillytavern", "risuai"];
  var SOURCES = ["preset", "remix", "scratch", "imported"];
  var MODES = ["system", "dark", "light"];
  var DEFAULT_SETTINGS = {
    p: "warm", a: "c6613f", fs: 1.06, lh: 1.70, ga: 0.25,
    gaTouched: false, rp: "serif", fx: "lite"
  };

  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function oneOf(value, options, fallback) {
    return options.indexOf(value) >= 0 ? value : fallback;
  }

  function boundedNumber(value, min, max, fallback) {
    var number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
  }

  function cleanSettings(input) {
    input = isObject(input) ? input : {};
    var palette = oneOf(input.p, PALETTES, DEFAULT_SETTINGS.p);
    var accent = typeof input.a === "string" && /^[0-9a-fA-F]{6}$/.test(input.a)
      ? input.a.toLowerCase() : DEFAULT_SETTINGS.a;
    var font = oneOf(input.rp, ["serif", "sans", "mono"], DEFAULT_SETTINGS.rp);
    return {
      p: palette,
      a: accent,
      fs: boundedNumber(input.fs, 0.90, 1.40, DEFAULT_SETTINGS.fs),
      lh: boundedNumber(input.lh, 1.40, 2.00, DEFAULT_SETTINGS.lh),
      ga: boundedNumber(input.ga, 0, 1, DEFAULT_SETTINGS.ga),
      gaTouched: input.gaTouched === true,
      rp: font,
      fx: "lite"
    };
  }

  function makeId() {
    return "kmtp-" + Date.now().toString(36) + "-" +
      Math.random().toString(36).slice(2, 9);
  }

  function timestamp() {
    return new Date().toISOString();
  }

  function createProject(input) {
    input = isObject(input) ? input : {};
    var theme = isObject(input.theme) ? input.theme : {};
    var source = isObject(theme.source) ? theme.source : {};
    var now = timestamp();
    return {
      schema: SCHEMA,
      version: VERSION,
      id: typeof input.id === "string" && input.id ? input.id : makeId(),
      name: typeof input.name === "string" && input.name.trim()
        ? input.name.trim().slice(0, 80) : "Untitled theme",
      platform: oneOf(input.platform, PLATFORMS, "chub"),
      device: oneOf(input.device, DEVICES, "phone"),
      appearance: oneOf(input.appearance, MODES, "system"),
      createdAt: typeof input.createdAt === "string" ? input.createdAt : now,
      updatedAt: now,
      theme: {
        source: {
          kind: oneOf(source.kind, SOURCES, "preset"),
          label: typeof source.label === "string" ? source.label.slice(0, 100) : "",
          originalCss: typeof source.originalCss === "string" ? source.originalCss : "",
          overrides: typeof source.overrides === "string" ? source.overrides : "",
          workingCss: typeof source.workingCss === "string" ? source.workingCss : ""
        },
        settings: cleanSettings(theme.settings)
      },
      editorMode: oneOf(input.editorMode, ["visual", "raw"], "visual")
    };
  }

  function validateProject(value) {
    var errors = [];
    if (!isObject(value)) return { valid: false, errors: ["Project must be an object."] };
    if (value.schema !== SCHEMA) errors.push("Unsupported project schema.");
    if (value.version !== VERSION) errors.push("Unsupported project version.");
    if (!isObject(value.theme)) errors.push("Project theme data is missing.");
    if (!isObject(value.theme) || !isObject(value.theme.source)) errors.push("Project source data is missing.");
    if (!isObject(value.theme) || !isObject(value.theme.settings)) errors.push("Project settings are missing.");
    return { valid: errors.length === 0, errors: errors };
  }

  function normalizeProject(value) {
    var result = validateProject(value);
    if (!result.valid) return null;
    return createProject(value);
  }

  function getStorage(storage) {
    if (storage) return storage;
    try {
      return typeof localStorage !== "undefined" ? localStorage : null;
    } catch (error) {
      return null;
    }
  }

  function saveProject(project, storage) {
    var target = getStorage(storage);
    var clean = normalizeProject(project);
    if (!target || !clean) return false;
    try {
      target.setItem(PROJECT_KEY, JSON.stringify(clean));
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadProject(storage) {
    var target = getStorage(storage);
    if (!target) return null;
    try {
      var raw = target.getItem(PROJECT_KEY);
      return raw ? normalizeProject(JSON.parse(raw)) : null;
    } catch (error) {
      return null;
    }
  }

  function clearProject(storage) {
    var target = getStorage(storage);
    if (!target) return false;
    try {
      target.removeItem(PROJECT_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  function cleanProfile(input) {
    input = isObject(input) ? input : {};
    return {
      device: oneOf(input.device, DEVICES, "phone"),
      platform: oneOf(input.platform, PLATFORMS, "chub"),
      appearance: oneOf(input.appearance, MODES, "system")
    };
  }

  function saveProfile(profile, storage) {
    var target = getStorage(storage);
    if (!target) return false;
    try {
      target.setItem(PROFILE_KEY, JSON.stringify(cleanProfile(profile)));
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadProfile(storage) {
    var target = getStorage(storage);
    if (!target) return cleanProfile({});
    try {
      var raw = target.getItem(PROFILE_KEY);
      return raw ? cleanProfile(JSON.parse(raw)) : cleanProfile({});
    } catch (error) {
      return cleanProfile({});
    }
  }

  return {
    schema: SCHEMA,
    version: VERSION,
    createProject: createProject,
    validateProject: validateProject,
    normalizeProject: normalizeProject,
    saveProject: saveProject,
    loadProject: loadProject,
    clearProject: clearProject,
    saveProfile: saveProfile,
    loadProfile: loadProfile,
    cleanSettings: cleanSettings
  };
});
