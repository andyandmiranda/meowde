# Meowde v4.52 Beginner Python curriculum

## Goal

A first-time Python learner should be able to follow Meowde from the beginning and finish by assembling a small program that combines data, decisions, loops, and functions.

## Progress-safety rule

v4.52 improves curriculum content **without reindexing persisted progress**.

The migration keeps:

- 30 Korean lessons and 30 English lessons
- every lesson index
- every lesson `slug`
- every exercise `id`
- every exercise `type`
- existing progress, mistake, reward, review, coach-mode, and growth storage keys

The effective curriculum is applied by `v452-curriculum.js`. Existing in-progress lesson queues remain snapshots and are not forcibly replaced or reset.

## Units

### Unit 1 — Python Basics / Python 기초

Lessons 1–10 cover output, strings, quotes, numbers, arithmetic, variables, assignment, naming, and modern string formatting.

Lesson 10 now explicitly teaches **f-strings**, while still connecting them to the earlier `+` concatenation model.

### Unit 2 — Input & Decisions / 입력과 조건

Lessons 11–20 cover input, type conversion, debugging names, comparisons, `if`, `else`, `elif`, logical operators, indentation, and the first list introduction.

Lesson 12 replaces a redundant quote-error lesson with the missing beginner concept that `input()` returns text and that `int()` / `str()` perform explicit type conversion.

### Unit 3 — Collections, Loops & Functions / 컬렉션·반복·함수

Lessons 21–30 cover indexing, list methods, `for`, `range`, `while`, loop exits, functions, parameters, `return`, an integrated project, and final debugging practice.

Lesson 25 now teaches `break` and highlights the need for a clear exit path in `while` loops.

Lesson 29 is now a genuine capstone rather than another formatting exercise. It combines:

- a list of values
- a `for` loop
- a function with a parameter
- an `if` decision
- `return`
- repeated function application

## Audit result

Run:

```bash
npm run audit:curriculum
```

The v4.52 effective-runtime audit reports:

- 30 Korean lessons / 170 Korean exercises
- 30 English lessons / 170 English exercises
- exercise balance: 30 concept, 50 predict, 30 fill, 30 bughunt, 30 write
- 170/170 exercises with hint coverage
- 170/170 exercises with explanation/body coverage
- 0 repeated exercise signatures
- 0 Korean/English structural alignment warnings
- no missing concepts in the defined Beginner Python v1 core

`tools/validate-curriculum-v452.js` separately executes the migration against a copy of canonical data and verifies that lesson slugs, exercise IDs, exercise types, counts, and untouched lessons remain stable.

## Deferred topics

These are useful next-stage topics, but are intentionally outside the current 30-lesson Beginner Python v1 path:

- dictionaries
- string methods in depth
- modules
- files
- exceptions beyond basic debugging
- object-oriented programming

They should be added as a later unit/course extension rather than compressed into the current progression.
