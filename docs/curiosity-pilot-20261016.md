# Curiosity-first learning pilot — CEO/PM handoff (2026-10-16)

Status: **isolated prototype only**. Based on PR #85 head `19de0aa79f5121d7665cc519a832a0909e8b9a79`. No main merge or Production release authorized.

## Product decision
- Primary user: beginner learners who want to experiment instead of memorizing long explanations. ADHD diagnosis is not a prerequisite or marketing claim.
- Preserve shipped brand, Python/Linux course engines, existing progress and XP. Do not replatform or replace existing lessons.
- One measurable pilot: a two-step zero-based Python list-index challenge, from cat positions to a transfer problem with fruits.
- A correct answer reveals the exact Python example and explanation. Wrong answers provide a recoverable cue. The optional hint is learner-controlled.
- No free-text typing for a concept that can be demonstrated by selecting; later Python code-writing practice remains essential for skill assessment.

## Files and boundary
- `curiosity-pilot.html`: optional, direct-URL pilot; intentionally **not added to navigation** until reviewed.
- `assets/curiosity-pilot.js`: fixed deterministic challenges and grading; no eval or Python execution.
- `tests/curiosity-pilot.test.cjs`: structural grading, invalid-input, and forbidden-write guardrails.
- Neither reads nor writes localStorage, course state, XP, or network. No learner metrics collected.
- The simulated selection is **not** evidence of Python proficiency. The production curriculum remains authoritative.

## Validation and acceptance
1. Run `node --test tests/curiosity-pilot.test.cjs`.
2. Preview the exact branch and manually verify at 320/375/390/768 px; keyboard-only, screen-reader announcement, reduced motion, and KO copy.
3. Verify wrong choice → retry → correct answer, optional hint, transfer challenge, and exit link.
4. Capture before/after snapshots of Python and Linux localStorage keys; confirm byte-for-byte unchanged.
5. Conduct 5–8 observed novice sessions, compare with the existing list-index lesson on task comprehension and unassisted transfer, and log confusion rather than infer efficacy from completion.
6. Only after these checks, decide whether to connect the pilot to a small existing lesson entry point.

## Release gate and risks
- PR #85 is Draft and must be independently verified. A green static test is not Hosted/real-device validation.
- No changes to main, Production, authentication, keys, or external spending.
- Existing CI on PR #85 and the separate Python depth branch must be checked before integration.
- If test or user observation reveals regressions, drop the isolated page and module; no migration or user data cleanup is needed.

## Next PM decision
Confirm whether this two-step pilot improves **unassisted transfer** over the current list-index learning flow. If not, revise or discard; do not scale across 60 lessons on aesthetic preference alone.
