"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function loadInlineData() {
  const html = read("index.html");
  const startToken = "const DATA = ";
  const start = html.indexOf(startToken);
  if (start < 0) throw new Error("index.html: const DATA declaration not found");
  const valueStart = start + startToken.length;
  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;
  for (let i = valueStart; i < html.length; i += 1) {
    const char = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') { inString = true; continue; }
    if (char === "{" || char === "[") depth += 1;
    else if (char === "}" || char === "]") {
      depth -= 1;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end < 0) throw new Error("index.html: DATA value boundary not found");
  return JSON.parse(html.slice(valueStart, end));
}

function loadAssetData() {
  const context = { window: {} };
  vm.createContext(context);
  const files = [
    "assets/data-ko-1.js",
    "assets/data-ko-2.js",
    "assets/data-ko-3.js",
    "assets/data-en-1.js",
    "assets/data-en-2.js",
  ];
  for (const file of files) {
    vm.runInContext(read(file), context, { filename: file });
  }
  return {
    ko: context.window.MEOWDE_DATA_KO || [],
    en: context.window.MEOWDE_EN_LESSONS || [],
  };
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function equalData(a, b) {
  return JSON.stringify(stable(a)) === JSON.stringify(stable(b));
}

module.exports = { ROOT, read, loadInlineData, loadAssetData, equalData };
