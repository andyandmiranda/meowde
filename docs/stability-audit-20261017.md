# MEOWDE stability audit — 2026-10-17

## Scope and verified baseline
CEO Development OS instruction: preserve five tabs (Home, Learn, Practice, Review, My), independent state, learner records and existing engines. No new framework, main write, merge or Production action.

Repository: andyandmiranda/meowde. Default branch main at 144f168.
PRs #85, #91, #92, #93 are open Drafts, not merged. #91 is based on #85; #92 on #91; #93 on #85. Reuse #93 for the current practice stability fix. Remote branch is receiving concurrent updates; integrate before publishing and use an expected-head lease.

At inspection, #85 head 8cfe196 has four successful PR workflow runs. #93 head fb4f7a8 has successful isolated workflow 39007238755. These are baseline results, not validation of this change. Main has a successful Vercel commit status; Production runtime and exact deployment alias were not independently verified.

## Findings and priority
1. High: assets/python-lab.js could replace unreadable JSON, unsupported version/shape, or unreadable storage with an empty in-memory record after typing or requesting a hint. Reproduced using actual initialization/save functions in Node VM. First fix below.
2. Navigation: canonical Python renderers and standalone lab provide five tabs; Linux home and course pages do not share that navigation. Requires a scoped route/state design and browser regression tests before changes.
3. Coverage: #93 isolated CI runs a subset, while the main-targeted full workflow does not automatically apply to this stacked PR. Concurrent changes through 792a9df expanded path coverage and added focused-review and WebKit checks; those changes are preserved. A successful isolated run is not full product acceptance.
4. Linux Bash exercise uses a constrained five-line parser and four sample inputs, not a shell. Alternative valid Bash syntax may be rejected. Review simulator limitation wording and supported alternatives before expanding grading.
5. Python lab uses disposable Pyodide workers with execution criteria, staged hints, separate per-unit drafts and attempts. Full runtime/network/error/tab/reload scenarios remain a separate verification gate.

## Implemented first fix
Block persistent writes when initial records cannot be read or have an unsupported version/shape. Preserve the original bytes. Allow in-memory practice and clearly tell learners that new work is not saved. Valid v1 records and normal new-user persistence retain the same key and schema. No automatic repair, deletion or migration.

Files: assets/python-lab.js; tests/python-lab-storage.test.cjs; tests/five-tab-practice-nav.spec.cjs; package.json; this report.

## Verification
- Actual storage function regression: 10 Node cases pass (broken/empty JSON, null, unknown version, invalid units/records, read failure, valid/new persistence, write failure).
- Original code fails the preservation regression; modified code passes.
- Existing pnpm validate passed before and after the source change; final combined validation also passes, including 26 Node cases.
- Five Playwright storage cases added to the existing isolated suite, alongside eight existing navigation/layout cases. Test collection succeeds (13 cases).
- Local Chromium execution blocked by corrupt browser download; not a product failure and not a pass. Hosted CI results must be checked for the published SHA.
- Full browser suite, real iPhone/Safari, full educational content accuracy and Production remain NOT RUN in this audit.

Rollback: revert this scoped commit on the PR branch. No learner data migration or production changes occurred. Implementation and review are by the same AI; no independent review claimed.
