"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function loadInlineData() {
  const context = { window: {} };
  vm.createContext(context);

  const files = [
    "assets/lessons-ko.js",
    "assets/lessons-en.js",
  ];

  for (const file of files) {
    vm.runInContext(read(file), context, { filename: file });
  }

  const ko = context.window.MEOWDE_LESSONS_KO;
  const en = context.window.MEOWDE_LESSONS_EN;

  if (!Array.isArray(ko) || !Array.isArray(en)) {
    throw new Error("canonical lesson arrays not found");
  }

  return { ko, en };
}

function loadAssetData() {
  const context = { window: {} };
  vm.createContext(context);
  const files = [
    "assets/legacy/data-ko-1.js",
    "assets/legacy/data-ko-2.js",
    "assets/legacy/data-ko-3.js",
    "assets/legacy/data-en-1.js",
    "assets/legacy/data-en-2.js",
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
