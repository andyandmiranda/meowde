#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");

const unconditionalTag =
  '<script src="/assets/lessons-fallback.js?v=423"></script>';

if (index.includes(unconditionalTag)) {
  throw new Error("fallback script is still loaded unconditionally");
}

const conditionalLoaderMatch = index.match(
  /<script>\s*if\s*\(\s*!Array\.isArray\(window\.MEOWDE_LESSONS_KO\)[\s\S]*?document\.write\([\s\S]*?lessons-fallback\.js\?v=423[\s\S]*?<\/script>/
);

if (!conditionalLoaderMatch) {
  throw new Error("conditional fallback loader was not found");
}

const dataBlockMatch = index.match(
  /const DATA = \(\(\) => \{([\s\S]*?)\n\}\)\(\);/
);

if (!dataBlockMatch) {
  throw new Error("DATA initialization block was not found");
}

const canonicalKo = fs.readFileSync(
  path.join(root, "assets/lessons-ko.js"),
  "utf8"
);
const canonicalEn = fs.readFileSync(
  path.join(root, "assets/lessons-en.js"),
  "utf8"
);
const fallbackSource = fs.readFileSync(
  path.join(root, "assets/lessons-fallback.js"),
  "utf8"
);

function execute(source, context, filename) {
  vm.runInContext(source, context, { filename });
}

function makeContext() {
  const writes = [];

  const context = {
    window: {},
    document: {
      write(value) {
        writes.push(value);
      },
    },
    writes,
  };

  vm.createContext(context);
  return context;
}

function runConditionalLoader(context) {
  const loaderBody = `
    if (
      !Array.isArray(window.MEOWDE_LESSONS_KO) ||
      !Array.isArray(window.MEOWDE_LESSONS_EN)
    ) {
      document.write(
        '<script src="/assets/lessons-fallback.js?v=423"><\\\\/script>'
      );
    }
  `;

  execute(loaderBody, context, "conditional-fallback-loader.js");
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

// Scenario 1: canonical assets both available
{
  const context = makeContext();

  execute(canonicalKo, context, "lessons-ko.js");
  execute(canonicalEn, context, "lessons-en.js");
  runConditionalLoader(context);

  if (context.writes.length !== 0) {
    throw new Error(
      "canonical scenario unexpectedly requested fallback"
    );
  }

  const data = initializeData(context);

  if (
    context.window.__MEOWDE_DATA_SOURCE__ !== "canonical-v423" ||
    !Array.isArray(data.ko) ||
    !Array.isArray(data.en)
  ) {
    throw new Error("canonical scenario failed");
  }

  console.log(
    "PASS canonical scenario: fallback not requested"
  );
}

// Scenario 2: one canonical asset missing
{
  const context = makeContext();

  execute(canonicalKo, context, "lessons-ko.js");
  runConditionalLoader(context);

  if (
    context.writes.length !== 1 ||
    !context.writes[0].includes("lessons-fallback.js?v=423")
  ) {
    throw new Error(
      "missing-canonical scenario did not request fallback"
    );
  }

  execute(fallbackSource, context, "lessons-fallback.js");

  const data = initializeData(context);

  if (
    context.window.__MEOWDE_DATA_SOURCE__ !==
      "external-fallback-v423" ||
    !Array.isArray(data.ko) ||
    !Array.isArray(data.en)
  ) {
    throw new Error("fallback scenario failed");
  }

  console.log(
    "PASS fallback scenario: external fallback selected"
  );
}

console.log("Conditional runtime fallback validation passed.");
