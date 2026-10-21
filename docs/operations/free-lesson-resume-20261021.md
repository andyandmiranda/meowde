# Issue #101 — free lesson choice with preserved resume

Owner: Work Autonomous Product Operator, 2026-10-21 KST. Continues existing Draft #102; no duplicate PR.
Base main `15f13f05dfd49e84781e1664b6de4c1c65e9c260`; prior #102 `475b144e6b2535681289337589072f6a915bb771`.
Parallel heads independently checked unchanged: #98 `0460537192080be88331f16d0875cf50615a5992`, #99 `3298ebf4ea233cd56e626e44c7bc85466c95a363`, #103 `87672c0146b00894098abc7b2d414fc8111cf5a5`.

## Reproduction and deployment
Cloud Chromium, official https://meowde.vercel.app/: UI displayed 0/60, 0 XP. Open 전체 학습 경로 보기, click 출력 캠프. Remained in map with toast `이전 레슨을 먼저 완료하세요`. No exercise submitted or record deleted. Public HTTP HEAD 200; authenticated Vercel metadata maps public alias to READY integration SHA `d9dee0e6bcceaa93920dbe06bdbcead23d18a700`, target=null, deployment `dpl_5fGpaKNNnUENqtvEyaYDhdqpUFno`. It differs from main/latest #98; left untouched.

## Changes
- Load existing selection policy before canonical Learn/state. Available lessons selectable regardless of next/done; invalid selections rejected.
- Existing switch confirmation explains preservation. Full queue, retries, answers, hints, editor/stdin, counters and mode saved under additive `lessonResumes` in existing state. Verify real snapshot write before transition; quota/read failure or unknown collection shape blocks transition. Selecting prior lesson/mode restores it after reload.
- Remove only finished snapshot atomically with completion/rewards; first-completion reward rules preserved. Out-of-order completion recommends first unfinished index.
- Unique PWA cache name; no storage-key rename or destructive migration.

## Verification
Local npm run validate PASS (34 Node cases including eight policy/resume cases; existing validators 18 lab units/80 criteria). Canonical Learn, ordered bootstrap, syntax and diff checks PASS.
New KO/EN browser tests exercise mobile map, wrong prediction, switch/reload/restored retry+answer and unchanged rewards; quota case asserts unchanged stored bytes. Full Chromium CI and targeted WebKit workflow added; exact-head result pending push.
Local Chromium NOT RUN: download yielded truncated archive (central-directory signature error). Cloud cannot reach executor localhost (connection refused). Hosted pre-change #102 Preview NOT RUN: Vercel login wall. No bypass/auth/protection changes. Real iPhone Safari and learner outcomes NOT RUN. Full robotics coverage and all wrong-answer explanations remain separate work.

## Integration / safety / rollback
No main merge, Production/alias writes, learner deletion, private teaching assets, new expense or weakened tests. #98 contains later reward safety fixes: do not release this main-based branch independently. Shared integration overlaps: v412.html, v413-core.js, v414-state.js, v414-reward.js, sw.js, package.json. #99 PWA change also needs reconciliation.
Rollback before release: drop scoped changes. After separately approved release, retain additive resume data or forward-fix: old serializers omit unknown fields. Never clear localStorage.
Next: exact-head CI, resolve regressions, authorized hosted UI QA, reconcile with #98; explicit approval still required for release.
