#!/usr/bin/env node
"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function stable(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stable).join(",")}]`;
  }

  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stable(value[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

function hash(value) {
  return crypto.createHash("sha256").update(stable(value)).digest("hex");
}

function loadCanonical(lang) {
  const variable =
    lang === "ko" ? "MEOWDE_LESSONS_KO" : "MEOWDE_LESSONS_EN";
  const filename = `assets/lessons-${lang}.js`;
  const context = { window: {} };

  vm.createContext(context);
  vm.runInContext(read(filename), context, { filename });

  const lessons = context.window[variable];

  if (!Array.isArray(lessons)) {
    throw new Error(`${lang}: canonical lesson array not found`);
  }

  return JSON.parse(JSON.stringify(lessons));
}

function validateLanguage(lang, lessons) {
  const lessonCount = lessons.length;
  const exerciseCount = lessons.reduce(
    (sum, lesson) => sum + lesson.exercises.length,
    0
  );

  if (lessonCount !== 30) {
    throw new Error(`${lang}: expected 30 lessons, received ${lessonCount}`);
  }

  if (exerciseCount !== 170) {
    throw new Error(
      `${lang}: expected 170 exercises, received ${exerciseCount}`
    );
  }

  console.log(
    `PASS ${lang}: ${lessonCount} lessons, ${exerciseCount} exercises, sha256 ${hash(lessons)}`
  );
}

function runFallbackLoader(windowState) {
  const writes = [];
  const context = {
    window: JSON.parse(JSON.stringify(windowState)),
    document: {
      write(markup) {
        writes.push(String(markup));
      },
    },
  };

  vm.createContext(context);
  vm.runInContext(read("assets/lessons-fallback.js"), context, {
    filename: "assets/lessons-fallback.js",
  });

  return {
    window: context.window,
    markup: writes.join(""),
  };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const canonical = {
  ko: loadCanonical("ko"),
  en: loadCanonical("en"),
};

validateLanguage("ko", canonical.ko);
validateLanguage("en", canonical.en);

const fallbackSource = read("assets/lessons-fallback.js");
assert(
  Buffer.byteLength(fallbackSource, "utf8") < 4096,
  "fallback bootstrap must remain a small loader"
);
assert(
  !fallbackSource.includes('"slug":'),
  "fallback bootstrap must not embed a duplicate lesson dataset"
);

const normal = runFallbackLoader({
  MEOWDE_LESSONS_KO: canonical.ko,
  MEOWDE_LESSONS_EN: canonical.en,
});

assert(
  normal.window.__MEOWDE_FALLBACK_STATUS__ === "not-needed",
  "normal path must mark fallback as not needed"
);
assert(normal.markup === "", "normal path must not request retry scripts");
assert(
  normal.window.MEOWDE_FALLBACK_DATA === undefined,
  "normal path must not create a duplicate fallback object"
);
console.log("PASS normal runtime path: no duplicate fallback data requested");

const missingKo = runFallbackLoader({
  MEOWDE_LESSONS_EN: canonical.en,
});
assert(
  missingKo.window.__MEOWDE_FALLBACK_STATUS__ === "retry-requested",
  "missing-ko path must request a retry"
);
assert(
  missingKo.markup.includes("/assets/lessons-ko.js?v=423-fallback"),
  "missing-ko path must retry the Korean canonical asset"
);
assert(
  !missingKo.markup.includes("/assets/lessons-en.js?v=423-fallback"),
  "missing-ko path must not retry the available English asset"
);
console.log("PASS missing-ko runtime path: Korean asset retry requested");

const missingEn = runFallbackLoader({
  MEOWDE_LESSONS_KO: canonical.ko,
});
assert(
  missingEn.window.__MEOWDE_FALLBACK_STATUS__ === "retry-requested",
  "missing-en path must request a retry"
);
assert(
  missingEn.markup.includes("/assets/lessons-en.js?v=423-fallback"),
  "missing-en path must retry the English canonical asset"
);
assert(
  !missingEn.markup.includes("/assets/lessons-ko.js?v=423-fallback"),
  "missing-en path must not retry the available Korean asset"
);
console.log("PASS missing-en runtime path: English asset retry requested");

const missingBoth = runFallbackLoader({});
assert(
  missingBoth.markup.includes("/assets/lessons-ko.js?v=423-fallback") &&
    missingBoth.markup.includes("/assets/lessons-en.js?v=423-fallback"),
  "missing-both path must retry both canonical assets"
);
assert(
  missingBoth.markup.includes("MEOWDE_FALLBACK_DATA"),
  "retry finalizer must expose recovered data to the existing DATA selector"
);
console.log("PASS missing-both runtime path: both canonical assets retried");

console.log("Conditional canonical lesson fallback validation passed.");
