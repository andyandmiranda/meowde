# MEOWDE autonomous operations

Authority: CEO's 2026-10-18 Work instruction. This supersedes older multi-chat and 60-minute reporting requirements. Single user-facing interface: that Work conversation; product: https://meowde.vercel.app. Issue #78 is the current queue and execution ledger. Read its latest comments as well as its body before each session; this branch document is pending merge.

## Authorization
Safe fixes/refactoring, UX/accessibility/performance, content accuracy, existing six character assets, tests/CI, documentation/issues/PRs, Preview verification and prioritization are authorized. Separate explicit approval is required for main merges, Production releases, destructive learner-data changes, new paid services, material auth/payment/security changes, weakening tests, or fundamental brand changes. Never reuse old one-off release approval. No blanket release approval exists.

## Execution
Observe → reproduce → prioritize → minimal fix → tests → fixed-SHA Preview → GitHub checkpoint → next task. Existing PRs first; inspect concurrent head changes before updating. Keep stable lesson IDs/storage formats, six existing characters and the label 로드맵. Accuracy and preservation precede new features and growth. Implementer/reviewer is the same AI unless an independent review actually occurs.

Report at most three lines: 상태, actual verified 완료 (or 변경 없음), next action/one concrete approval. Keep details here and #78. Preview-only fixes are not Production fixes. Record PASS / FAIL / NOT RUN separately for static checks, browser, learning semantics, storage, mobile and Production. Never infer all-user learning success or retention from automated checks.

## Audit checkpoint: 2026-10-18
- main/Production metadata: 15f13f05dfd49e84781e1664b6de4c1c65e9c260; #85 already merged before this session. Production browser loads and 복습 opens the review screen.
- #96 starting head: 3b1f750b54cd8648be6a2d838863b9d7d0684ae2. Existing CI run 39130783825: browser success, validation failed because the canonical companion identity class was removed. Unit05, Unit06, content runs success.
- This change restores the identity class on the six-character grid. Existing later CSS retains the two-column layout. No validator weakened. Cache version changes so installed clients can receive changed JS/CSS after an approved release. Existing cache cleanup logic and learning keys unchanged.
- Added browser regression for all six choices, independent coaching selection, loaded assets, preference reload and unchanged learning fields. Existing PR Chromium workflow discovers it automatically.
- Local PASS: npm run validate (26 Node tests included), original Room validator and 18 standalone CI validator commands; diff whitespace check. Local browser NOT RUN: Chromium download returned a corrupt archive. Hosted Preview browser NOT RUN: Vercel sign-in wall. Protection unchanged; no access links created. New CI results must be read at the resulting commit before release.
- Production unresolved: My retains dense mastery/insight/goals sections and uses Home/Learn/Review/Practice/My order, different from Home's intended order. Review with zero completed lessons/mistakes nevertheless recommends four unseen tasks claiming completed-lesson provenance. Neither is fixed by this PR. Reconcile #95 and #93 before editing.
- Open experimental #91/#92 and legacy #52/#55 are not release candidates without independent reconciliation. No duplicate PR created.

## Automation and gaps
Seven old tasks were returned disabled. A single new daily evening task was created enabled in this Work conversation, Asia/Seoul. First run not yet observed; activation is not proof of execution. Other tasks remain disabled. The task reads #78/main/PR/CI/deployments and performs allowed work, records evidence and reports in three lines.
Existing GitHub Actions run on main-targeted PRs and include Chromium learning/storage/navigation tests. The targeted WebKit workflow only targets the old #85 branch: main coverage gap. No scheduled Production Actions workflow yet. Do not claim hourly monitoring, WebKit coverage on every PR or unattended deployments.

## Resume
1. Fetch main and #96; inspect exact SHA CI and latest #78 before changing anything.
2. On #96 run `npm run validate`, `node tools/validate-phase5-room-renderer.js`, and `npx playwright test tests/coach-character-preservation.spec.cjs` when Chromium is available. Resolve actual failures without weakening assertions.
3. Verify the fixed-SHA hosted Preview through authorized existing access; do not disable protection. Then present the exact change and risks for separate merge/release approval.
4. Reconcile #95 My/navigation changes, fix empty-history Smart Review, then add main WebKit and scheduled non-mutating Production smoke checks through the existing operations PR #84 after conflict review. Use deduplicated failure records.
