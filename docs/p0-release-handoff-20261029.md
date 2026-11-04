# PR #114 P0 handoff — 2026-10-29 KST

Parent: 61b1d356472f3ba5a00d1fc973ff1e06e4cb1f48. User explicitly assigned this execution sole integration responsibility. Existing other worktrees and uncommitted work preserved. Main/Production/domain/user records/billing untouched.

## Proven defects and changes
- Root routes to v412.html, which asynchronously fetches and replaces its document with index.html and then loads overrides. index.html-only completion/start fixes were replaced by v412/v414 implementations.
- v414 reward override failed the new rollback assertion before the fix. It now restores active answer/grading/progress/rewards on primary failure and ignores repeat completion without an active session. Season counts require successful completion.
- Failed fresh/resumed start restores the previous session and suppresses onStarted.
- v425 previously performed multiple primary writes plus backup, and reported backup failure as failure after the durable reward was committed. New regression failed before the fix. Deferred fields/schema/timestamp are prepared before one primary write; backup denial does not reverse a committed reward.
- Future done indexes were clamped into the last available lesson, falsely completing it. Deferred regression reproduced this; out-of-range indexes are now filtered from runtime while preserved on disk.

## Existing failure evidence, fetched once
Run 40871969663 / browser job 123441152453: home-storage-safety immediately called startLesson/save after root navigation; release-scope-smoke line 6 immediately accessed DATA. The root asynchronous document replacement explains these ReferenceErrors. Normal-boot tests now await MeowRelease and ordered enhancements. Corrupt/read-denied root intentionally stops in the loader, so tests assert its recovery UI and unchanged bytes/zero writes instead of expecting unloaded shell functions.
Validate job 123441151969 first failed Korean and English Unit 04 label expectations. This is separate from DATA/save/startLesson and remains outside this P0 patch. Other existing screen/content expectation failures were not changed or rerun.

## Verification
- Target Node lesson-resume suite: 13/13 PASS, including five added P0 tests. Actual v414/v425 source executes in isolated storage/DOM harnesses; this is not full browser PASS.
- Storage key validator PASS (existing unregistered-key warnings); Phase 2 daily validator PASS; edited JS syntax and git diff --check PASS.
- Parent deployment dpl_6R8WWjfjhZHXuvVQhDEFKwibCMK4 is READY for exactly parent SHA. Actual cloud browser home → start → concept → next prediction observed. Does not validate this patch.
- New candidate browser storage-fault regression and candidate Preview flow remain required. Local Playwright browser executable unavailable. No new Actions runs requested; commit skips CI to avoid redundant workflows.

## Release decision
HOLD. Exact candidate browser fault/reload flow, remaining failed release checks, final SHA/deployment/rollback verification and explicit Production approval required. No merge/deploy authorization requested before verification is complete.
