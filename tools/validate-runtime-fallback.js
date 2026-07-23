#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function execute(source, context, filename) {
  vm.runInContext(source, context, { filename });
}

function makeContext() {
  const writes = [];
  const context = {
    window: {},
    document: {
      write(value) {
        writes.push(String(value));
      },
    },
    writes,
  };

  vm.createContext(context);
  return context;
}

const index = read("index.html");
const canonicalSources = {
  ko: read("assets/lessons-ko.js"),
  en: read("assets/lessons-en.js"),
};
const fallbackSource = read("assets/lessons-fallback.js");
const serviceWorkerSource = read("sw.js");

const unconditionalTag =
  '<script src="/assets/lessons-fallback.js?v=423"></script>';
assert(
  !index.includes(unconditionalTag),
  "fallback script is still loaded unconditionally"
);

const conditionalLoaderMatch = index.match(
  /<script>\s*if\s*\(\s*!Array\.isArray\(window\.MEOWDE_LESSONS_KO\)[\s\S]*?document\.write\([\s\S]*?lessons-fallback\.js\?v=423[\s\S]*?<\/script>/
);
assert(conditionalLoaderMatch, "conditional fallback loader was not found");

const dataBlockMatch = index.match(
  /const DATA = \(\(\) => \{([\s\S]*?)\n\}\)\(\);/
);
assert(dataBlockMatch, "DATA initialization block was not found");

assert(
  Buffer.byteLength(fallbackSource, "utf8") < 4096,
  "fallback bootstrap must remain below 4 KB"
);
assert(
  !fallbackSource.includes('"slug":'),
  "fallback bootstrap must not embed duplicate lesson data"
);
assert(
  !serviceWorkerSource.includes('"/assets/lessons-fallback.js"'),
  "conditional fallback must not be precached by the service worker"
);

function runIndexConditionalLoader(context) {
  const source = `
    if (
      !Array.isArray(window.MEOWDE_LESSONS_KO) ||
      !Array.isArray(window.MEOWDE_LESSONS_EN)
    ) {
      document.write(
        '<script src="/assets/lessons-fallback.js?v=423"><\\/script>'
      );
    }
  `;

  execute(source, context, "index-conditional-loader.js");
}

function initializeData(context) {
  const source = `
    window.__TEST_DATA__ = (() => {
      ${dataBlockMatch[1]}
    })();
  `;

  execute(source, context, "data-initializer.js");
  return context.window.__TEST_DATA__;
}

function executeWrittenMarkup(context, markup) {
  const externalPattern = /<script\s+src="([^"]+)"\s*><\/script>/g;
  let externalMatch;

  while ((externalMatch = externalPattern.exec(markup))) {
    const pathname = externalMatch[1].split("?")[0].replace(/^\//, "");
    execute(read(pathname), context, pathname);
  }

  const inlinePattern = /<script>([\s\S]*?)<\/script>/g;
  let inlineMatch;

  while ((inlineMatch = inlinePattern.exec(markup))) {
    execute(inlineMatch[1], context, "fallback-finalizer.js");
  }
}

function runFallbackBootstrap(context) {
  const before = context.writes.length;
  execute(fallbackSource, context, "assets/lessons-fallback.js");
  const markup = context.writes.slice(before).join("");

  if (markup) executeWrittenMarkup(context, markup);
}

function loadCanonical(context, lang) {
  execute(
    canonicalSources[lang],
    context,
    `assets/lessons-${lang}.js`
  );
}

// Scenario 1: both canonical assets are available.
{
  const context = makeContext();
  loadCanonical(context, "ko");
  loadCanonical(context, "en");
  runIndexConditionalLoader(context);

  assert(
    context.writes.length === 0,
    "canonical scenario unexpectedly requested fallback"
  );

  const data = initializeData(context);
  assert(
    context.window.__MEOWDE_DATA_SOURCE__ === "canonical-v423",
    "canonical scenario selected the wrong data source"
  );
  assert(
    Array.isArray(data.ko) && Array.isArray(data.en),
    "canonical scenario did not expose both lesson arrays"
  );

  console.log("PASS canonical scenario: fallback not requested");
}

// Scenario 2: English canonical asset is initially missing.
{
  const context = makeContext();
  loadCanonical(context, "ko");
  runIndexConditionalLoader(context);

  assert(
    context.writes.length === 1 &&
      context.writes[0].includes("lessons-fallback.js?v=423"),
    "missing-en scenario did not request the fallback bootstrap"
  );

  runFallbackBootstrap(context);
  const data = initializeData(context);

  assert(
    context.window.__MEOWDE_FALLBACK_STATUS__ === "retry-succeeded",
    "missing-en retry did not succeed"
  );
  assert(
    context.window.__MEOWDE_DATA_SOURCE__ === "external-fallback-v423",
    "missing-en scenario selected the wrong data source"
  );
  assert(
    Array.isArray(data.ko) && Array.isArray(data.en),
    "missing-en scenario did not recover both lesson arrays"
  );

  console.log("PASS missing-en scenario: English asset recovered");
}

// Scenario 3: Korean canonical asset is initially missing.
{
  const context = makeContext();
  loadCanonical(context, "en");
  runIndexConditionalLoader(context);
  runFallbackBootstrap(context);
  const data = initializeData(context);

  assert(
    context.window.__MEOWDE_FALLBACK_STATUS__ === "retry-succeeded",
    "missing-ko retry did not succeed"
  );
  assert(
    context.window.__MEOWDE_DATA_SOURCE__ === "external-fallback-v423",
    "missing-ko scenario selected the wrong data source"
  );
  assert(
    Array.isArray(data.ko) && Array.isArray(data.en),
    "missing-ko scenario did not recover both lesson arrays"
  );

  console.log("PASS missing-ko scenario: Korean asset recovered");
}

// Scenario 4: both canonical assets are initially missing.
{
  const context = makeContext();
  runIndexConditionalLoader(context);
  runFallbackBootstrap(context);
  const data = initializeData(context);

  assert(
    context.window.__MEOWDE_FALLBACK_STATUS__ === "retry-succeeded",
    "missing-both retry did not succeed"
  );
  assert(
    context.window.__MEOWDE_DATA_SOURCE__ === "external-fallback-v423",
    "missing-both scenario selected the wrong data source"
  );
  assert(
    Array.isArray(data.ko) && Array.isArray(data.en),
    "missing-both scenario did not recover both lesson arrays"
  );

  console.log("PASS missing-both scenario: both assets recovered");
}

console.log("Conditional runtime fallback validation passed.");
