#!/usr/bin/env node
"use strict";

const { loadInlineData, loadAssetData, equalData } = require("./lib-meowde");

const errors = [];
const warnings = [];
const allowedTypes = new Set(["concept", "predict", "fill", "bughunt", "write"]);

function requireString(value, label) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${label}: non-empty string required`);
}

function validateLanguage(lang, lessons) {
  if (!Array.isArray(lessons) || lessons.length === 0) {
    errors.push(`${lang}: lessons must be a non-empty array`);
    return;
  }

  const slugs = new Set();
  const ids = new Set();
  let exerciseCount = 0;

  lessons.forEach((lesson, lessonIndex) => {
    const lp = `${lang}[${lessonIndex}]`;
    requireString(lesson.slug, `${lp}.slug`);
    requireString(lesson.title, `${lp}.title`);
    requireString(lesson.short, `${lp}.short`);
    requireString(lesson.description, `${lp}.description`);

    if (slugs.has(lesson.slug)) errors.push(`${lang}: duplicate lesson slug "${lesson.slug}"`);
    slugs.add(lesson.slug);

    if (!Array.isArray(lesson.exercises) || lesson.exercises.length === 0) {
      errors.push(`${lp}.exercises: non-empty array required`);
      return;
    }

    lesson.exercises.forEach((exercise, exerciseIndex) => {
      exerciseCount += 1;
      const ep = `${lp}.exercises[${exerciseIndex}]`;
      requireString(exercise.id, `${ep}.id`);
      requireString(exercise.type, `${ep}.type`);
      if (ids.has(exercise.id)) errors.push(`${lang}: duplicate exercise id "${exercise.id}"`);
      ids.add(exercise.id);
      if (!allowedTypes.has(exercise.type)) errors.push(`${ep}.type: unsupported type "${exercise.type}"`);

      if (exercise.type === "predict") {
        if (!Array.isArray(exercise.choices) || exercise.choices.length < 2) errors.push(`${ep}.choices: at least two choices required`);
        if (!Number.isInteger(exercise.answer) || exercise.answer < 0 || exercise.answer >= (exercise.choices || []).length) {
          errors.push(`${ep}.answer: choice index out of range`);
        }
      }

      if (exercise.type === "fill") {
        if (!Array.isArray(exercise.tokens) || exercise.tokens.length < 2) errors.push(`${ep}.tokens: at least two tokens required`);
        if (!(exercise.tokens || []).includes(exercise.answer)) errors.push(`${ep}.answer: answer must appear in tokens`);
      }

      if (exercise.type === "bughunt") {
        if (!Array.isArray(exercise.lines) || exercise.lines.length === 0) errors.push(`${ep}.lines: non-empty array required`);
        if (!Number.isInteger(exercise.buggy) || exercise.buggy < 0 || exercise.buggy >= (exercise.lines || []).length) {
          errors.push(`${ep}.buggy: line index out of range`);
        }
        requireString(exercise.fixed, `${ep}.fixed`);
      }

      if (exercise.type === "write") {
        requireString(exercise.expected, `${ep}.expected`);
        requireString(exercise.model, `${ep}.model`);
      }
    });
  });

  console.log(`PASS ${lang}: ${lessons.length} lessons, ${exerciseCount} exercises, unique slugs and IDs`);
}

try {
  const inlineData = loadInlineData();
  const assetData = loadAssetData();

  for (const lang of ["ko", "en"]) validateLanguage(lang, inlineData[lang]);

  for (const lang of ["ko", "en"]) {
    validateLanguage(`${lang}-assets`, assetData[lang]);
    if (!equalData(inlineData[lang], assetData[lang])) {
      warnings.push(`${lang}: index.html DATA and assets/data-${lang}-*.js differ; index.html remains runtime canonical until Phase 2`);
    } else {
      console.log(`PASS ${lang}: inline DATA matches split asset data`);
    }
  }

  const koSlugs = inlineData.ko.map((lesson) => lesson.slug);
  const enSlugs = inlineData.en.map((lesson) => lesson.slug);
  if (JSON.stringify(koSlugs) !== JSON.stringify(enSlugs)) errors.push("ko/en lesson slug order differs");
  else console.log("PASS ko/en: lesson slug order matches");
} catch (error) {
  errors.push(error.stack || error.message);
}

warnings.forEach((message) => console.warn(`WARN ${message}`));
if (errors.length) {
  errors.forEach((message) => console.error(`FAIL ${message}`));
  process.exit(1);
}
console.log("Lesson validation passed.");
