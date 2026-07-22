const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");

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

function evaluateFile(relativePath) {
  const filename = path.join(root, relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const context = { window: {} };

  vm.createContext(context);
  vm.runInContext(source, context, { filename });

  return JSON.parse(JSON.stringify(context.window));
}

function readCanonical(lang) {
  const variable =
    lang === "ko" ? "MEOWDE_LESSONS_KO" : "MEOWDE_LESSONS_EN";

  const windowObject = evaluateFile(`assets/lessons-${lang}.js`);
  const lessons = windowObject[variable];

  if (!Array.isArray(lessons)) {
    throw new Error(`${lang}: canonical lesson array not found`);
  }

  return lessons;
}

function readFallback() {
  const windowObject = evaluateFile("assets/lessons-fallback.js");
  const fallback = windowObject.MEOWDE_FALLBACK_DATA;

  if (
    !fallback ||
    !Array.isArray(fallback.ko) ||
    !Array.isArray(fallback.en)
  ) {
    throw new Error("fallback: MEOWDE_FALLBACK_DATA not found");
  }

  return fallback;
}

function validateLanguage(lang, canonical, fallback) {
  const canonicalHash = hash(canonical);
  const fallbackHash = hash(fallback);

  if (canonicalHash !== fallbackHash) {
    throw new Error(
      `${lang}: canonical and fallback data differ\n` +
        `canonical: ${canonicalHash}\n` +
        `fallback:  ${fallbackHash}`
    );
  }

  const lessons = canonical.length;
  const exercises = canonical.reduce(
    (sum, lesson) => sum + lesson.exercises.length,
    0
  );

  if (lessons !== 30) {
    throw new Error(`${lang}: expected 30 lessons, received ${lessons}`);
  }

  if (exercises !== 170) {
    throw new Error(`${lang}: expected 170 exercises, received ${exercises}`);
  }

  console.log(
    `PASS ${lang}: ${lessons} lessons, ${exercises} exercises, sha256 ${canonicalHash}`
  );
}

const canonical = {
  ko: readCanonical("ko"),
  en: readCanonical("en"),
};

const fallback = readFallback();

validateLanguage("ko", canonical.ko, fallback.ko);
validateLanguage("en", canonical.en, fallback.en);

console.log("Canonical and external fallback validation passed.");
