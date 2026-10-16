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
