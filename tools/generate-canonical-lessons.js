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

function readCanonical(lang) {
  const variable =
    lang === "ko" ? "MEOWDE_LESSONS_KO" : "MEOWDE_LESSONS_EN";

  const filename = path.join(root, "assets", `lessons-${lang}.js`);
  const source = fs.readFileSync(filename, "utf8");

  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename });

  const lessons = context.window[variable];

  if (!Array.isArray(lessons)) {
    throw new Error(`${filename}: ${variable} array not found`);
  }

  return JSON.parse(JSON.stringify(lessons));
}

const data = {
  ko: readCanonical("ko"),
  en: readCanonical("en"),
};

const fallbackContent = [
  "/* Generated from v4.23 canonical lesson assets. Do not edit manually. */",
  `window.MEOWDE_FALLBACK_DATA = ${JSON.stringify(data, null, 2)};`,
  "",
].join("\n");

fs.writeFileSync(
  path.join(root, "assets", "lessons-fallback.js"),
  fallbackContent,
  "utf8"
);

const report = {
  source: "assets/lessons-ko.js + assets/lessons-en.js",
  ko: {
    lessons: data.ko.length,
    exercises: data.ko.reduce(
      (sum, lesson) => sum + lesson.exercises.length,
      0
    ),
    sha256: hash(data.ko),
  },
  en: {
    lessons: data.en.length,
    exercises: data.en.reduce(
      (sum, lesson) => sum + lesson.exercises.length,
      0
    ),
    sha256: hash(data.en),
  },
};

fs.writeFileSync(
  path.join(root, "docs", "v423-canonical-data.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8"
);

console.log(JSON.stringify(report, null, 2));
