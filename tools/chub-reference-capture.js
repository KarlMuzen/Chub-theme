(function () {
  "use strict";

  var MAX_ELEMENTS = 1400;
  var STYLE_KEYS = [
    "display", "visibility", "position", "boxSizing", "zIndex",
    "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight",
    "top", "right", "bottom", "left",
    "flex", "flexDirection", "flexWrap", "flexGrow", "flexShrink",
    "alignItems", "alignContent", "alignSelf", "justifyContent", "justifyItems",
    "gridTemplateColumns", "gridTemplateRows", "gap", "rowGap", "columnGap",
    "overflow", "overflowX", "overflowY",
    "marginTop", "marginRight", "marginBottom", "marginLeft",
    "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
    "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
    "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle",
    "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
    "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius",
    "backgroundColor", "backgroundImage", "color",
    "fontFamily", "fontSize", "fontWeight", "fontStyle", "lineHeight",
    "letterSpacing", "textAlign", "textTransform", "whiteSpace",
    "opacity", "boxShadow", "textShadow", "transform"
  ];

  function safePath(value) {
    try {
      var url = new URL(value, location.href);
      return url.origin + url.pathname;
    } catch (error) {
      return "";
    }
  }

  function getRect(element) {
    var r = element.getBoundingClientRect();
    return {
      x: Math.round(r.x + window.scrollX),
      y: Math.round(r.y + window.scrollY),
      width: Math.round(r.width),
      height: Math.round(r.height)
    };
  }

  function isVisible(element) {
    var style = getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden") return false;
    var rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function makePath(element) {
    var parts = [];
    var current = element;
    for (var depth = 0; current && current.nodeType === 1 && depth < 6; depth++) {
      var tag = current.tagName.toLowerCase();
      if (current.id && /^[A-Za-z][A-Za-z0-9_-]{0,35}$/.test(current.id)) {
        parts.unshift(tag + "#" + current.id);
        break;
      }
      var classes = Array.from(current.classList || [])
        .filter(function (name) { return /^[A-Za-z_-][A-Za-z0-9_-]{0,45}$/.test(name); })
        .slice(0, 3);
      var segment = tag + (classes.length ? "." + classes.join(".") : "");
      var parent = current.parentElement;
      if (parent) {
        var siblings = Array.from(parent.children).filter(function (child) {
          return child.tagName === current.tagName;
        });
        if (siblings.length > 1) segment += ":nth-of-type(" + (siblings.indexOf(current) + 1) + ")";
      }
      parts.unshift(segment);
      current = parent;
    }
    return parts.join(" > ");
  }

  function styleSnapshot(element, pseudo) {
    var style = getComputedStyle(element, pseudo || null);
    var result = {};
    STYLE_KEYS.forEach(function (key) {
      var value = style[key];
      if (value && value !== "normal" && value !== "none" && value !== "auto") {
        result[key] = value;
      }
    });
    return result;
  }

  function pseudoSnapshot(element, pseudo) {
    var style = getComputedStyle(element, pseudo);
    if (!style || style.display === "none" || style.content === "none" || style.content === "normal") return null;
    return styleSnapshot(element, pseudo);
  }

  function captureElement(element, index) {
    var attributes = {};
    ["role", "type"].forEach(function (name) {
      var value = element.getAttribute(name);
      if (value) attributes[name] = value;
    });
    return {
      index: index,
      tag: element.tagName.toLowerCase(),
      id: element.id && /^[A-Za-z][A-Za-z0-9_-]{0,35}$/.test(element.id) ? element.id : "",
      classes: Array.from(element.classList || []).slice(0, 12),
      attributes: attributes,
      selectorPath: makePath(element),
      rect: getRect(element),
      styles: styleSnapshot(element),
      before: pseudoSnapshot(element, "::before"),
      after: pseudoSnapshot(element, "::after")
    };
  }

  function captureStylesheets() {
    return Array.from(document.styleSheets).map(function (sheet) {
      var rules = null;
      try {
        rules = sheet.cssRules ? sheet.cssRules.length : 0;
      } catch (error) {
        rules = "cross-origin";
      }
      return {
        href: sheet.href ? safePath(sheet.href) : "inline-style",
        media: sheet.media ? sheet.media.mediaText : "",
        disabled: !!sheet.disabled,
        accessibleRuleCount: rules
      };
    });
  }

  function captureCustomProperties() {
    var style = getComputedStyle(document.documentElement);
    var result = {};
    for (var i = 0; i < style.length && Object.keys(result).length < 300; i++) {
      var name = style[i];
      if (name && name.indexOf("--") === 0) {
        var value = style.getPropertyValue(name).trim();
        if (value) result[name] = value;
      }
    }
    return result;
  }

  var candidates = Array.from(document.querySelectorAll("body *")).filter(isVisible);
  var elements = candidates.slice(0, MAX_ELEMENTS).map(captureElement);
  var output = {
    format: "km-chub-ui-reference",
    version: 1,
    capturedAt: new Date().toISOString(),
    page: {
      origin: location.origin,
      path: location.pathname,
      title: document.title
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    },
    counts: {
      visibleElementsFound: candidates.length,
      elementsCaptured: elements.length,
      truncated: candidates.length > MAX_ELEMENTS
    },
    rootCustomProperties: captureCustomProperties(),
    stylesheets: captureStylesheets(),
    elements: elements,
    privacy: {
      pageTextCaptured: false,
      inputValuesCaptured: false,
      hrefsCaptured: false,
      cookiesCaptured: false,
      storageCaptured: false,
      networkRequestsCaptured: false,
      stylesheetSourceCodeCaptured: false
    }
  };

  var json = JSON.stringify(output, null, 2);
  var blob = new Blob([json], { type: "application/json;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var anchor = document.createElement("a");
  var suffix = location.pathname.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 35) || "page";
  anchor.href = url;
  anchor.download = "chub-ui-reference-" + suffix + ".json";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 30000);

  console.info("KM Chub UI Reference saved", output.counts, output.privacy);
  return output.counts;
})();