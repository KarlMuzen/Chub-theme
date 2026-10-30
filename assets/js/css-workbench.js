(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.KMCssWorkbench = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var MAX_BYTES = 1024 * 1024;

  function byteLength(value) {
    if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(value).length;
    return unescape(encodeURIComponent(value)).length;
  }

  function scanCss(css) {
    var braces = 0, parens = 0, quote = "", comment = false;
    var errors = [], i = 0;
    while (i < css.length) {
      var ch = css[i], next = css[i + 1] || "";
      if (comment) {
        if (ch === "*" && next === "/") { comment = false; i += 2; continue; }
        i += 1; continue;
      }
      if (quote) {
        if (ch === "\\") { i += 2; continue; }
        if (ch === quote) quote = "";
        i += 1; continue;
      }
      if (ch === "/" && next === "*") { comment = true; i += 2; continue; }
      if (ch === '"' || ch === "'") { quote = ch; i += 1; continue; }
      if (ch === "{") braces += 1;
      else if (ch === "}") {
        braces -= 1;
        if (braces < 0) { errors.push("Found a closing brace without a matching opening brace."); braces = 0; }
      } else if (ch === "(") parens += 1;
      else if (ch === ")") {
        parens -= 1;
        if (parens < 0) { errors.push("Found a closing parenthesis without a matching opening parenthesis."); parens = 0; }
      }
      i += 1;
    }
    if (comment) errors.push("The stylesheet contains an unterminated comment.");
    if (quote) errors.push("The stylesheet contains an unterminated string.");
    if (braces) errors.push("The stylesheet contains unclosed CSS blocks.");
    if (parens) errors.push("The stylesheet contains unclosed parentheses.");
    return errors;
  }

  function analyzeCss(css) {
    if (typeof css !== "string") css = "";
    var bytes = byteLength(css);
    var errors = [];
    var warnings = [];
    var empty = !css.trim();
    var oversized = bytes > MAX_BYTES;
    if (empty) errors.push("The CSS is empty.");
    if (oversized) errors.push("The CSS exceeds the 1 MB import limit.");
    if (!oversized) errors = errors.concat(scanCss(css));
    if (/@import\b/i.test(css)) warnings.push("Contains @import. Imported stylesheets are preserved, but the referenced files may not be available when exported or uploaded.");
    if (/url\(\s*(['"]?)(?:https?:)?\/\//i.test(css)) warnings.push("Contains remote URL references. External fonts or images may not load in Chub.");
    if (/@font-face\b/i.test(css)) warnings.push("Contains @font-face. Font availability and remote font loading depend on the target platform.");
    if (/\bexpression\s*\(/i.test(css) || /javascript\s*:/i.test(css)) warnings.push("Contains legacy or suspicious CSS patterns. Review the stylesheet before installing it.");
    return {
      valid: errors.length === 0,
      importable: !empty && !oversized,
      bytes: bytes,
      maxBytes: MAX_BYTES,
      errors: errors,
      warnings: warnings,
      preservedExactly: true
    };
  }

  function createImport(css, fileName) {
    var report = analyzeCss(css);
    if (!report.importable) return { ok: false, report: report, value: null };
    return {
      ok: true,
      report: report,
      value: {
        kind: "imported",
        label: typeof fileName === "string" ? fileName.slice(0, 100) : "Pasted CSS",
        originalCss: css,
        workingCss: css,
        overrides: ""
      }
    };
  }

  return {
    MAX_BYTES: MAX_BYTES,
    byteLength: byteLength,
    scanCss: scanCss,
    analyzeCss: analyzeCss,
    createImport: createImport
  };
});
