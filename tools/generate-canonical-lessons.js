const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");
const html = fs.readFileSync(indexPath, "utf8");

const match = html.match(/const DATA\s*=\s*(\{[\s\S]*?\});\s*const STORAGE/);

if (!match) {
  throw new Error("index.html에서 DATA 객체를 찾지 못했습니다.");
}

const context = {};
vm.createContext(context);
vm.runInContext(`DATA = ${match[1]}`, context);

const data = JSON.parse(JSON.stringify(context.DATA));

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

function output(lang, lessons) {
  const variable =
    lang === "ko" ? "MEOWDE_LESSONS_KO" : "MEOWDE_LESSONS_EN";
  const filename = `lessons-${lang}.js`;

  const content = [
    "/* Generated from index.html DATA. Do not edit manually. */",
    `window.${variable} = ${JSON.stringify(lessons, null, 2)};`,
    "",
  ].join("\n");

  fs.writeFileSync(path.join(root, "assets", filename), content, "utf8");
}

output("ko", data.ko);
output("en", data.en);

const report = {
  source: "index.html DATA",
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
