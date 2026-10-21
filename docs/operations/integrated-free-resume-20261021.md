# Integration checkpoint — Issue #101 / PR #102

Work owner, 2026-10-21 KST. Existing Draft #102 now combines #102 `37300850ded76e338dae32e7bf34c4c8d8b52ace` with #98 `0460537192080be88331f16d0875cf50615a5992` using a merge commit; neither #98 nor main is edited. #99 remains separate at `3298ebf`.

## Reconciliation
Two text conflicts: package.json validation scripts now include all tests from both parents; service worker uses a unique cache name retaining the approved-icon cache marker required by the existing unchanged icon regression. The approved PWA icon replacements, six canonical characters, compact My/navigation, honest empty-history review and review-storage claim protection from #98 are preserved. The free-selection policy, additive per-lesson snapshots, earliest-bootstrap preservation and first-unfinished recommendation from #102 are retained. Automatic merge of index.html inspected; v417-review.js, v443-single-companion.js and v420-profile.js are byte-identical to #98. No existing tests weakened.

New integration browser regression: enter Smart Review with a seeded completed lesson, answer through real controls, switch to lesson 60, reload, return to the same Smart Review and verify its counters/queue, finish through actual grading, repeat and verify daily XP/churu once, then restore lesson 60. This is a test fixture, not a real learner record. Both Chromium and targeted free-resume WebKit workflows discover it. The separate #98 WebKit test sets are retained. Full-course KO/EN workflow is retained; its model-guided completion does not measure human comprehension.

## Local verification
npm validate PASS: 52 Node cases plus two PWA icon cases; curriculum/lab validators PASS (18 lab units / 80 criteria). All 18 additional CI static validators, syntax and diff checks PASS. Browser execution NOT RUN locally: prior browser install returned a truncated archive. New combined HEAD CI/Preview pending; parent CI evidence is not transferred to the merged tree.

## Boundaries
No main merge, Production release, alias change, learner-data deletion or destructive migration, paid service, auth changes or private lecture transfer. Existing #98 icon retirement is carried forward; canonical six character sources retained. Hosted Preview interaction remains blocked by an existing sign-in wall; no protection changes or share links. Actual iPhone Safari and learner outcomes NOT RUN. Official alias last verified d9dee0e, production-target main15f13f0; must be rechecked before any release.

Rollback before release: drop the integration merge only; both parent branches are preserved. After any separately approved release, retain additive lessonResumes while rolling back or forward-fix; old serializers omit unknown fields. Next: exact combined-head Chromium/WebKit/60-lesson results, address genuine failures, record immutable deployment and remaining gates. No release authorization is implied.
