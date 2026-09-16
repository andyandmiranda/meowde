"use strict";

const { loadInlineData } = require("./lib-meowde");

const { ko, en } = loadInlineData();
const UNIT_SIZE = 10;

const TARGET = [
  { id: "print", unit: 1, patterns: [/\bprint\s*\(/i, /print/i, /출력/] },
  { id: "strings", unit: 1, patterns: [/string/i, /문자열/, /따옴표/] },
  { id: "numbers", unit: 1, patterns: [/number/i, /숫자/, /int\b/i, /float\b/i] },
  { id: "variables", unit: 1, patterns: [/variable/i, /변수/, /\w+\s*=\s*[^=]/] },
  { id: "arithmetic", unit: 1, patterns: [/operator/i, /연산/, /\+|\-|\*|\/|%/] },
  { id: "input", unit: 1, patterns: [/\binput\s*\(/i, /입력/] },
  { id: "type-conversion", unit: 1, patterns: [/\bint\s*\(/i, /\bstr\s*\(/i, /형변환|타입 변환|변환/] },
  { id: "f-strings", unit: 1, patterns: [/f-string/i, /f\"|f'/, /포매팅|포맷/] },
  { id: "booleans", unit: 2, patterns: [/boolean/i, /bool/i, /True|False/, /불리언|참|거짓/] },
  { id: "comparisons", unit: 2, patterns: [/comparison/i, /비교/, /==|!=|>=|<=|>|</] },
  { id: "if", unit: 2, patterns: [/\bif\b/i, /조건문|조건/] },
  { id: "elif-else", unit: 2, patterns: [/\belif\b/i, /\belse\b/i] },
  { id: "logical-operators", unit: 2, patterns: [/\band\b|\bor\b|\bnot\b/i, /논리/] },
  { id: "for", unit: 2, patterns: [/\bfor\b/i, /for문|반복문/] },
  { id: "range", unit: 2, patterns: [/\brange\s*\(/i] },
  { id: "while", unit: 2, patterns: [/\bwhile\b/i, /while문/] },
  { id: "loop-control", unit: 2, patterns: [/\bbreak\b|\bcontinue\b/i] },
  { id: "lists", unit: 3, patterns: [/\blist\b/i, /리스트/, /\[[^\]]*\]/] },
  { id: "indexing", unit: 3, patterns: [/index/i, /인덱스/, /\[[0-9-]+\]/] },
  { id: "list-methods", unit: 3, patterns: [/\.append\s*\(/i, /\.remove\s*\(/i, /\.pop\s*\(/i] },
  { id: "functions", unit: 3, patterns: [/\bdef\s+\w+/i, /function/i, /함수/] },
  { id: "parameters", unit: 3, patterns: [/parameter|argument/i, /매개변수|인자/] },
  { id: "return", unit: 3, patterns: [/\breturn\b/i, /반환/] },
  { id: "dictionaries", unit: 3, patterns: [/dictionary|dict/i, /딕셔너리|사전/, /\{[^}]*:/] },
  { id: "string-methods", unit: 3, patterns: [/\.lower\s*\(|\.upper\s*\(|\.strip\s*\(|\.split\s*\(/i] },
  { id: "mini-project", unit: 3, patterns: [/project/i, /프로젝트|미니 앱|퀴즈|계산기|게임/] }
];

function textOf(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(textOf).join("\n");
  if (typeof value === "object") return Object.values(value).map(textOf).join("\n");
  return String(value);
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function lessonConcepts(lesson) {
  const text = textOf(lesson);
  return TARGET.filter(item => item.patterns.some(pattern => pattern.test(text))).map(item => item.id);
}

function exerciseSignature(exercise) {
  return normalize([
    exercise.type,
    exercise.prompt,
    exercise.title,
    exercise.body,
    exercise.code,
    exercise.model,
    exercise.fixed,
    exercise.testcase,
    exercise.expected
  ].filter(Boolean).join(" | "));
}

function summarizeLanguage(lessons) {
  const typeCounts = {};
  const focusCounts = {};
  const signatures = new Map();
  let totalExercises = 0;
  let hints = 0;
  let explanations = 0;
  let writeExercises = 0;

  lessons.forEach((lesson, lessonIndex) => {
    (lesson.focus || []).forEach(focus => focusCounts[focus] = (focusCounts[focus] || 0) + 1);
    (lesson.exercises || []).forEach(exercise => {
      totalExercises++;
      typeCounts[exercise.type] = (typeCounts[exercise.type] || 0) + 1;
      if (exercise.hint) hints++;
      if (exercise.explain || exercise.body) explanations++;
      if (exercise.type === "write") writeExercises++;
      const sig = exerciseSignature(exercise);
      if (!signatures.has(sig)) signatures.set(sig, []);
      signatures.get(sig).push(`${lessonIndex + 1}:${exercise.id || exercise.type}`);
    });
  });

  const duplicates = [...signatures.entries()]
    .filter(([sig, refs]) => sig && refs.length > 1)
    .map(([sig, refs]) => ({ refs, preview: sig.slice(0, 110) }));

  return { totalExercises, typeCounts, focusCounts, hints, explanations, writeExercises, duplicates };
}

function conceptCoverage(lessons) {
  return TARGET.map(target => {
    const hits = [];
    lessons.forEach((lesson, index) => {
      const text = textOf(lesson);
      if (target.patterns.some(pattern => pattern.test(text))) hits.push(index + 1);
    });
    return { ...target, hits };
  });
}

function unitRows(lessons) {
  const rows = [];
  for (let start = 0; start < lessons.length; start += UNIT_SIZE) {
    const unit = Math.floor(start / UNIT_SIZE) + 1;
    const chunk = lessons.slice(start, start + UNIT_SIZE);
    rows.push({
      unit,
      start: start + 1,
      end: start + chunk.length,
      lessons: chunk.map((lesson, offset) => ({
        n: start + offset + 1,
        slug: lesson.slug,
        title: lesson.title,
        focus: lesson.focus || [],
        exerciseCount: (lesson.exercises || []).length,
        types: [...new Set((lesson.exercises || []).map(exercise => exercise.type))],
        concepts: lessonConcepts(lesson)
      }))
    });
  }
  return rows;
}

function firstHitMap(coverage) {
  return Object.fromEntries(coverage.map(item => [item.id, item.hits[0] || null]));
}

function prerequisiteWarnings(coverage) {
  const first = firstHitMap(coverage);
  const rules = [
    ["variables", "input"],
    ["numbers", "type-conversion"],
    ["comparisons", "if"],
    ["if", "elif-else"],
    ["for", "range"],
    ["lists", "indexing"],
    ["functions", "parameters"],
    ["functions", "return"]
  ];
  return rules.flatMap(([before, after]) => {
    if (!first[after]) return [];
    if (!first[before]) return [`${after} appears at lesson ${first[after]} before prerequisite ${before} is covered`];
    if (first[after] < first[before]) return [`${after} first appears at lesson ${first[after]}, before ${before} at lesson ${first[before]}`];
    return [];
  });
}

function alignmentWarnings(koLessons, enLessons) {
  const warnings = [];
  if (koLessons.length !== enLessons.length) warnings.push(`lesson count mismatch: ko=${koLessons.length}, en=${enLessons.length}`);
  const length = Math.min(koLessons.length, enLessons.length);
  for (let index = 0; index < length; index++) {
    const a = koLessons[index], b = enLessons[index];
    if (a.slug !== b.slug) warnings.push(`lesson ${index + 1} slug mismatch: ${a.slug} vs ${b.slug}`);
    if ((a.exercises || []).length !== (b.exercises || []).length) warnings.push(`lesson ${index + 1} exercise count mismatch: ko=${(a.exercises || []).length}, en=${(b.exercises || []).length}`);
    const aTypes = (a.exercises || []).map(x => x.type).join(",");
    const bTypes = (b.exercises || []).map(x => x.type).join(",");
    if (aTypes !== bTypes) warnings.push(`lesson ${index + 1} exercise type mismatch`);
  }
  return warnings;
}

const koSummary = summarizeLanguage(ko);
const enSummary = summarizeLanguage(en);
const coverage = conceptCoverage(ko);
const units = unitRows(ko);
const alignment = alignmentWarnings(ko, en);
const prereq = prerequisiteWarnings(coverage);
const missing = coverage.filter(item => item.hits.length === 0);
const misplaced = coverage.filter(item => item.hits.length && Math.ceil(item.hits[0] / UNIT_SIZE) > item.unit);
const early = coverage.filter(item => item.hits.length && Math.ceil(item.hits[0] / UNIT_SIZE) < item.unit);

console.log("# Meowde Beginner Python Curriculum Audit\n");
console.log(`- Korean lessons: ${ko.length}`);
console.log(`- English lessons: ${en.length}`);
console.log(`- Korean exercises: ${koSummary.totalExercises}`);
console.log(`- English exercises: ${enSummary.totalExercises}`);
console.log(`- Exercise types (KO): ${JSON.stringify(koSummary.typeCounts)}`);
console.log(`- Write exercises (KO): ${koSummary.writeExercises}`);
console.log(`- Hint coverage (KO): ${koSummary.hints}/${koSummary.totalExercises}`);
console.log(`- Explanation/body coverage (KO): ${koSummary.explanations}/${koSummary.totalExercises}`);
console.log(`- Exact/near-exact exercise signatures repeated: ${koSummary.duplicates.length}`);
console.log(`- KO/EN alignment warnings: ${alignment.length}`);
console.log("");

for (const unit of units) {
  console.log(`## Unit ${unit.unit} — lessons ${unit.start}-${unit.end}`);
  for (const lesson of unit.lessons) {
    console.log(`${String(lesson.n).padStart(2, "0")}. ${lesson.title} [${lesson.slug}] | focus=${lesson.focus.join("/")} | exercises=${lesson.exerciseCount} | types=${lesson.types.join(",")} | concepts=${lesson.concepts.join(",")}`);
  }
  console.log("");
}

console.log("## Target concept coverage");
for (const item of coverage) {
  console.log(`- ${item.id} (target U${item.unit}): ${item.hits.length ? `lessons ${item.hits.join(",")}` : "MISSING"}`);
}
console.log("");

console.log("## High-signal findings");
console.log(`- Missing target concepts: ${missing.length ? missing.map(x => x.id).join(", ") : "none"}`);
console.log(`- First introduced later than target unit: ${misplaced.length ? misplaced.map(x => `${x.id}@L${x.hits[0]}`).join(", ") : "none"}`);
console.log(`- First introduced earlier than target unit: ${early.length ? early.map(x => `${x.id}@L${x.hits[0]}`).join(", ") : "none"}`);
console.log(`- Prerequisite-order warnings: ${prereq.length ? prereq.join("; ") : "none"}`);
console.log(`- KO/EN alignment warnings: ${alignment.length ? alignment.join("; ") : "none"}`);
console.log("");

console.log("## Repeated exercise signatures");
if (!koSummary.duplicates.length) console.log("- none");
for (const item of koSummary.duplicates.slice(0, 30)) console.log(`- ${item.refs.join(", ")} :: ${item.preview}`);

console.log("\n## Machine-readable summary");
console.log(JSON.stringify({
  lessonCount: ko.length,
  exerciseCount: koSummary.totalExercises,
  typeCounts: koSummary.typeCounts,
  missing: missing.map(x => x.id),
  misplaced: misplaced.map(x => ({ id: x.id, first: x.hits[0], targetUnit: x.unit })),
  early: early.map(x => ({ id: x.id, first: x.hits[0], targetUnit: x.unit })),
  prerequisiteWarnings: prereq,
  alignmentWarnings: alignment,
  duplicateCount: koSummary.duplicates.length
}, null, 2));
