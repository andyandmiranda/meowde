# Python beginner-to-lists audit — 2026-10-16 sprint

Status: **PARTIAL**. Source stack and CPython answer execution checked; actual novice learning and hosted acceptance remain unverified. Owner, author and validator are the same AI. No independent QA or release approval.

## Scope and reproducibility

Starting PR #85 SHA: `ad9f83ce838d062a8cf7a1e706fc9bb87c52fca6`; main observed `144f168e5166e6527edaa401bfda6e9d9a118818`. Results below apply to the content tree containing this report, not Production. Final tested SHA and CI links are recorded in #78 / #85 to avoid a self-referential commit hash.

- Effective KO/EN arrays loaded in patch order by `tools/effective-curriculum.cjs`: Python lessons 1–22, 130 exercises per language, **260 total**. The ordered browser bootstrap is a separate CI gate.
- Reproduce: `python tools/audit-python-beginner.py report.json` (Python + Node, standard libraries only). Uses fresh isolated CPython processes and explicit missing-variable fixtures for partial snippets. Checks prediction output/error class, every writing model's visible output, every selected fill answer's output, and that concepts/corrected bughunt fragments run. Corrected bughunt execution without an exception does **not** by itself validate the explanation or every acceptable solution.
- Existing `npm run validate` PASS (including Node 16/16 and effective 60-lesson structure); `npm run validate:fallback`, canonical data validation, renderer validation and `git diff --check` PASS locally.
- New browser regression cases in `tests/curriculum-corrections.spec.cjs`: each language checks every comparison choice with actual Pyodide and the UI grader, elif outputs at 69/70/89/90/95, and hint wording/quoted starter/progress and reward preservation. Local browser **NOT RUN**: Chromium download returned a corrupt ZIP. Remote CI must run these cases before acceptance.

## Verified defects and bounded changes

| IDs (both languages) | Reproduction / severity | Correction |
|---|---|---|
| `compare-gate-f` | P1: original `print(10 ____ 4)` produces True for both `>` and `!=`; one answer is accepted | Equal operands (10/10) and `==` key make exactly one supplied comparison True; hints explain all distractors |
| `elif-mushroom-w` | P2: original prompt says B for any score >= 70; model returns A at 95 | Prompt explicitly states A for >=90, B for >=70 and <90, C otherwise; existing model and default expected output preserved |
| `index-tower-b`, `append-dock-b` | P2: actual error is a missing opening print parenthesis; canonical and supplementary hints discuss index bounds or append instead | Both hint layers and answer reasons identify matching parentheses; code and answer lines unchanged |
| `append-dock-w` | P2: supplementary hint shows `snacks = [milk]`, unlike the actual quoted string starter | Safely serialize the JS hint strings with `snacks = ["milk"]` in both languages |

IDs, lesson order, exercise types, storage keys, grading functions and reward logic are unchanged. Only the new comparison question's operands/key and related content change. Existing saved queues keep their original exercise snapshots; this patch does not rewrite a learner's active question or retrospectively regrade it. Consequently an old saved comparison exercise can retain the old ambiguity until a fresh lesson starts. A migration is outside this change. Cache generation advances to v468 so corrected assets refresh through the existing PWA update path; no storage migration or new cache policy.

## Traceable execution matrix

Every ID in each row is checked in **both KO and EN**. `C/P/F/B/W` = concept / prediction / fill / bughunt / writing. Execution PASS is limited to the checks above, not full pedagogical acceptance. Inspect JSON from the reproducible command for individual output records.

| # / lesson | Exact exercise IDs | CPython execution | Source quality finding |
|---|---|---|---|
| 01 `start-field` | `start-field-c`, `start-field-p1`, `start-field-p2`, `start-field-f`, `start-field-b`, `start-field-w` | PASS (6 × 2) | PARTIAL: introductory parentheses/string terminology remains terse |
| 02 `print-camp` | `print-camp-c`, `print-camp-p1`, `print-camp-p2`, `print-camp-f`, `print-camp-b`, `print-camp-w` | PASS (6 × 2) | No new contradiction found in reviewed prompts/hints/reasons |
| 03 `string-bridge` | `string-bridge-c`, `string-bridge-p1`, `string-bridge-p2`, `string-bridge-f`, `string-bridge-b`, `string-bridge-w` | PASS (6 × 2) | No new contradiction found |
| 04 `quote-gate` | `quote-gate-c`, `quote-gate-p1`, `quote-gate-p2`, `quote-gate-f`, `quote-gate-b`, `quote-gate-w` | PASS (6 × 2) | PARTIAL: Korean explanation describes matching quotes as safer rather than required |
| 05 `number-pond` | `number-pond-c`, `number-pond-p1`, `number-pond-p2`, `number-pond-f`, `number-pond-b`, `number-pond-w` | PASS (6 × 2) | PARTIAL: writing checks visible output, not use of arithmetic |
| 06 `math-stone` | `math-stone-c`, `math-stone-p1`, `math-stone-p2`, `math-stone-f`, `math-stone-b`, `math-stone-w` | PASS (6 × 2) | PARTIAL: writing checks output, not use of grouping |
| 07 `variable-pond` | `variable-pond-c`, `variable-pond-p1`, `variable-pond-p2`, `variable-pond-f`, `variable-pond-b`, `variable-pond-w` | PASS (6 × 2) | PARTIAL: assignment direction not explicitly traced |
| 08 `value-swap` | `value-swap-c`, `value-swap-p1`, `value-swap-p2`, `value-swap-f`, `value-swap-b`, `value-swap-w` | PASS (6 × 2) | PARTIAL: before/after trace primarily in question feedback |
| 09 `name-rules` | `name-rules-c`, `name-rules-p1`, `name-rules-p2`, `name-rules-f`, `name-rules-b`, `name-rules-w` | PASS (6 × 2) | No new contradiction found |
| 10 `concat-bridge` | `concat-bridge-c`, `concat-bridge-p1`, `concat-bridge-p2`, `concat-bridge-f`, `concat-bridge-b`, `concat-bridge-w` | PASS (6 × 2) | f-string example and model agree |
| 11 `input-window` | `input-window-c`, `input-window-p1`, `input-window-p2`, `input-window-f`, `input-window-b`, `input-window-w` | PASS (6 × 2) | Input model PASS; existing extra-input test remains; dynamic UI tested separately |
| 12 `debug-missing-quote` | `debug-missing-quote-c`, `debug-missing-quote-p1`, `debug-missing-quote-p2`, `debug-missing-quote-f`, `debug-missing-quote-b`, `debug-missing-quote-w` | PASS (6 × 2) | int/str example and model agree |
| 13 `debug-typo` | `debug-typo-c`, `debug-typo-p1`, `debug-typo-p2`, `debug-typo-f`, `debug-typo-b`, `debug-typo-w` | PASS (6 × 2) | Expected NameError and corrected names agree |
| 14 `compare-gate` | `compare-gate-c`, `compare-gate-p1`, `compare-gate-p2`, `compare-gate-f`, `compare-gate-b`, `compare-gate-w` | PASS (6 × 2) | FIXED: multiple True-producing choices |
| 15 `if-gate` | `if-gate-c`, `if-gate-p1`, `if-gate-p2`, `if-gate-f`, `if-gate-b`, `if-gate-w` | PASS (6 × 2) | PARTIAL: >= introduced without an explicit operator definition |
| 16 `else-cabin` | `else-cabin-c`, `else-cabin-p1`, `else-cabin-p2`, `else-cabin-f`, `else-cabin-b`, `else-cabin-w` | PASS (6 × 2) | PARTIAL: bughunt snippet needs score from context |
| 17 `elif-mushroom` | `elif-mushroom-c`, `elif-mushroom-p1`, `elif-mushroom-p2`, `elif-mushroom-f`, `elif-mushroom-b`, `elif-mushroom-w` | PASS (6 × 2) | FIXED: prompt/model grade ranges; partial snippets need temp context |
| 18 `logic-lantern` | `logic-lantern-c`, `logic-lantern-p1`, `logic-lantern-p2`, `logic-lantern-f`, `logic-lantern-b`, `logic-lantern-w` | PASS (6 × 2) | PARTIAL: fill snippet needs age/ticket context; not has no dedicated task |
| 19 `indent-valley` | `indent-valley-c`, `indent-valley-p1`, `indent-valley-p2`, `indent-valley-f`, `indent-valley-b`, `indent-valley-w` | PASS (6 × 2) | Expected indentation failure and correction agree |
| 20 `list-garden` | `list-garden-c`, `list-garden-p1`, `list-garden-p2`, `list-garden-f`, `list-garden-b`, `list-garden-w` | PASS (6 × 2) | Index bounds and model agree |
| 21 `index-tower` | `index-tower-c`, `index-tower-p`, `index-tower-f`, `index-tower-b`, `index-tower-w` | PASS (5 × 2) | FIXED: canonical + supplementary syntax hint |
| 22 `append-dock` | `append-dock-c`, `append-dock-p`, `append-dock-f`, `append-dock-b`, `append-dock-w` | PASS (5 × 2) | FIXED: syntax hint and quoted starter; len is taught but not independently assessed |

## Acceptance areas still open

| Area | Status / evidence limit |
|---|---|
| Objectives / prerequisites / terminology | PARTIAL — source review identifies the specific gaps above; no claim of self-sufficient instruction |
| Concepts / examples / model outputs | CPython execution PASS for 260 exercises; reviewer inspected prompt/hint/reason consistency; not an independent educational review |
| Alternative correct answers / grading | PARTIAL — comparison ambiguity repaired; most early writing tasks lack multi-case or structural verification, so output-only success must not be called mastery |
| Hint progression | PARTIAL — only selected difficult problems have supplementary hints, not two progressive steps for every question |
| Wrong-answer diagnosis / revealed solution / retry | Shared renderer has diagnosis and on-demand answer review; per-exercise live behavior NOT RUN locally, covered only where the current browser suite explicitly tests it |
| Progress preservation | No persistence code changes; new hint regression compares the full saved learning state except hint flag and timestamp; refresh/subject isolation/legacy/offline remain separate existing browser tests |
| Independent application / mastery | NOT RUN — model execution and automated completion cannot measure a novice's independent transfer |
| Hosted Preview / real devices / Production | NOT RUN in this source audit; remote CI is distinct from Hosted acceptance |
| Branch protection required-check configuration | NOT VERIFIED — four observed successful workflows must not be described as an exhaustive enforced required-check list |

Priority next action after current CI: verify exact-SHA hosted beginner behavior and continue output-only grading/prerequisite remediation in bounded changes. Do not proceed to Village on the assumption that educational acceptance is complete.

Rollback: revert only this content/test/cache/report change on the existing PR branch, with no deletion or migration of progress. Main merge and Production deployment remain excluded.

---

## Preserved initial historical audit

The following earlier source-only observations predate this effective-data pass. They are historical, not current completion status.

# Python beginner-to-lists learning audit — 2026-10-16

Scope: effective lesson ordering to be independently verified against runtime patches; this first pass inspected the 30 base Korean lessons in `assets/lessons-ko.js`. **It is not a completed effective-runtime KO/EN semantic audit.** Neither browser content nor independent learner outcomes have been verified by this report.

## Observed content gaps

| Lesson | Evidence in base Korean data | Why this matters | Minimum educational acceptance test |
| --- | --- | --- | --- |
| 01 `start-field` | One-sentence concept about top-to-bottom and print; first write hint says only to put a string in print | No explanation of expressions, parentheses or literals for an absolute beginner | Given a new literal, learner can explain quotation marks and write a print call unassisted |
| 07–08 `variable-pond`, `value-swap` | Variable described as a name storing a value; reassignment in one sentence | Missing before/after trace of variable values | Learner traces an assignment sequence and explains left vs right side |
| 15 `if-gate`, 19 `indent-valley` | `if` uses indented code, dedicated indentation taught four lessons later | Essential prerequisite arrives too late | At first `if`, example distinguishes colon/indentation, true and false execution, common syntax error |
| 20 `list-garden` | Concept states brackets, commas and zero-based indexing; one-line explanation | Insufficient model for elements, index vs value, out-of-range | Learner draws element/index map, accesses both first and last, identifies IndexError |
| 21 `index-tower` | Concept only “first position is zero” | Does not explain the range of valid positions or retrieval | Novel list exercise including last valid index and invalid index |
| 22 `append-dock` | Concept only “append adds to list end” | No explicit before/after mutation model | Learner predicts before/after list and independently appends novel item |

## Quality gates before declaring the segment teachable without outside resources

1. Effective runtime KO+EN inventory, including all patch overrides, exercise IDs, and prerequisite ordering. Preserve existing slugs/indices and saved records.
2. Each lesson: objective, plain-language explanation of every introduced term, annotated runnable example, one common misconception and a changed-value demonstration.
3. Each exercise: at least two *progressive* useful hints (interpret goal → identify rule or step), accurate why-it-works explanation, and on-demand correct answer after miss. Never reveal a full answer as an unearned mastery pass.
4. Unfamiliar application requiring combining previous concepts; accept equivalent correct Python, diagnose wrong alternative and explain why.
5. Independent no-hint assessment and at least one print→variables→conditions→lists mini-project, with retry and spaced review retaining original misses.
6. Playwright checks for first lesson through index/append, language, persisted state across reload/switch, accessibility and offline. Content validity needs educational review beyond static schema checks.

## Implementation order

- First: verify current PR #85 browser CI after the timestamp-only test fix.
- Second: strengthen instruction *before* changing lesson progression: introductory if/indentation and index/append, KO+EN parity.
- Third: add evidence-based validation of hint steps and novel list transfer, then extend coverage backward through foundational lessons.
- Fourth: evaluate with first-time learners; test completion/XP does not prove mastery.

Status: source audit PARTIAL; runtime semantics, production, educational outcomes and real browser teaching flow NOT RUN. No release authorization.
