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

function readRuntime() {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const match = html.match(/const DATA\s*=\s*(\{[\s\S]*?\});\s*const STORAGE/);

  if (!match) {
    throw new Error("index.html DATA를 찾지 못했습니다.");
  }

  const context = {};
  vm.createContext(context);
  vm.runInContext(`DATA = ${match[1]}`, context);
  return JSON.parse(JSON.stringify(context.DATA));
}

function readCanonical(lang) {
  const variable = lang === "ko" ? "MEOWDE_LESSONS_KO" : "MEOWDE_LESSONS_EN";
  const source = fs.readFileSync(
    path.join(root, "assets", `lessons-${lang}.js`),
    "utf8"
  );

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context);

  return JSON.parse(JSON.stringify(context.window[variable]));
}

function validateLanguage(lang, runtime, canonical) {
  const runtimeHash = hash(runtime);
  const canonicalHash = hash(canonical);

  if (runtimeHash !== canonicalHash) {
    throw new Error(
      `${lang}: canonical 데이터가 index.html DATA와 일치하지 않습니다.\n` +
        `runtime:   ${runtimeHash}\n` +
        `canonical: ${canonicalHash}`
    );
  }

  const lessons = canonical.length;
  const exercises = canonical.reduce(
    (sum, lesson) => sum + lesson.exercises.length,
    0
  );

  console.log(
    `PASS ${lang}: ${lessons} lessons, ${exercises} exercises, sha256 ${canonicalHash}`
  );
}

const runtime = readRuntime();

validateLanguage("ko", runtime.ko, readCanonical("ko"));
validateLanguage("en", runtime.en, readCanonical("en"));

console.log("Canonical lesson validation passed.");
