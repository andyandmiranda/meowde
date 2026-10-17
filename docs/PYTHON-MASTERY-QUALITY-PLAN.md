# MEOWDE Python mastery: curriculum quality plan

Status: **proposal / not a claim of Python mastery**. No learner data migration or production change.

## Definition of mastery
A learner should independently (1) explain core concepts, (2) solve unfamiliar problems, (3) debug and test a program, and (4) build and explain a small project without hints. Completing lessons or accumulating XP alone is not evidence.

## Findings from source review
- The original Korean and English curricula each define 30 lessons; runtime enhancement modules append units 4–6 to target 60. Auditing only the 30 base lessons misses later content and patch replacements.
- The first two lessons both center on `print()`; their learning outcomes should be differentiated.
- Conditional indentation is explicitly taught after `if/else/elif`, despite being a prerequisite to using them. Introduce it at the first `if` and retain the later lesson as debugging practice.
- Fixed question patterns can encourage memorization. Add unseen transfer tasks and authentic mini-projects; do not silently change existing exercise IDs or indexes.
- Existing Smart Review prioritizes wrong answers, but a learner-flagged difficult lesson needs a separate, voluntary concept → similar → application pathway.
- Structural validators can detect missing fields and impossible option indexes; they cannot establish that an explanation is correct, that Pyodide grading is sound, or that a learner has mastered Python.

## Release sequence and acceptance gates
1. **P0 correctness**: evaluate all *effective runtime* 60 Korean + 60 English lessons after patches; check exercise ID uniqueness, concept/example/hint/explanation, exact output and Python runtime execution for safe deterministic samples, write grading across valid alternative solutions, input and timeout behavior. Record findings per slug/ID with reproduction steps. Quarantine incorrect exercises before adding more.
2. **P1 instruction**: explicit lesson objective, prerequisite, example, common misconception, short prediction, editable practice, independent transfer challenge, and optional beginner explanation. Preserve Python home/map/tab UX.
3. **P1 difficult markers**: learner-controlled flag at lesson and exercise levels. Show a separate Focus Review list; never auto-clear or overwrite existing progress. Provide review concept, *genuinely different* analogous problem, transfer problem, and self-assessment. Avoid rewarding repetitive easy farming.
4. **P1 sequencing**: teach indentation alongside first `if`; distinguish `print()` introduction vs output formatting; interleave debugging and projects. Avoid reordering existing indexed lessons without a migration plan and independent storage regression suite.
5. **P2 projects**: CLI utilities, files/JSON, data analysis, API/network safety, testing, modularization, and one independent capstone. Clearly mark network/library execution requirements and whether the browser sandbox supports them.
6. **P2 measurement**: first-attempt accuracy, hint dependency, transfer accuracy, time-to-completion (opt-in and privacy conscious), review success, and independent project rubric. No unsupported claims about revenue or learning efficacy.

## Release blockers
- CI PASS on structural tests is not content correctness or browser E2E PASS.
- Hosted preview: Python root navigation, lesson resume, Linux transition, mobile layout, Pyodide behavior, localStorage preservation, service worker/offline update, and independent grading must pass.
- No main merge, automatic deployment, permission/security changes, or storage migrations from this proposal.
