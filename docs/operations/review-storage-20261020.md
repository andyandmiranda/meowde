# Smart Review record preservation — 2026-10-20 KST

Baseline: PR #98 `5df21d874f6f06480b8f03edc191788da3b07cff`; main `15f13f05dfd49e84781e1664b6de4c1c65e9c260`. Existing first-attempt accuracy fix from #86 is present; no duplicate fix made. No AGENTS.md found in the baseline tree. Implementation and review are by the same AI, not independent QA.

## Reproduced problem

`v417-review.js` treated malformed/unsupported records and storage read exceptions as an empty review history, then persisted that empty history when review started. A read exception could hide an existing daily claim and allow a second +10 XP/+5 churu reward. This was reproduced against the unchanged shipped module in a Node VM: 7 new preservation cases failed; the valid daily-reward control passed. This is module-level evidence, not an observed Production-user incident.

## Scoped correction

- Preserve unreadable `meowde-v417-review` bytes and stop all writes from this module for that page session.
- Show a Korean/English warning, disable Smart Review start, and guard direct start plus resumed-review completion before progress/reward mutation.
- Keep ordinary lessons available. Do not reset data, migrate keys or change valid review rewards.
- Validate only supported top-level record/days/history shapes; preserve unknown extra fields on valid records.
- Include regression in standard validation, add corrupted/read-denied storage browser checks to the existing Chromium/WebKit spec, and change only the service-worker cache name for asset refresh.

## Verification and limits

Local after fix: 11/11 module tests PASS (8 preservation/reward tests plus 3 existing recommendation tests); JS syntax checks PASS. Tests verify exact 123 XP/57 churu remain unchanged while blocked, valid completion gives exactly 133/62, and reload/repeat does not grant another reward. Head-specific remote CI/browser results must be recorded in PR #98 after the commit. Previous-head CI does not prove this patch.

Hosted interactive Preview is blocked by Google device verification; physical iPhone Safari NOT RUN. Local module tests stub the underlying lesson engine; remote browser checks are required. Mid-session storage write failures, multi-tab claims and cross-key atomicity are separate risks not solved by this read-preservation patch. No Production, main, permissions or real learner records changed.

## Resume and rollback

Check the resulting #98 head and CI; inspect the new storage cases in Chromium and automated WebKit, plus existing learner-driven review/reload. Do not repeat passing tests on an unchanged head without a concrete reason. If a test fails, distinguish harness from product failure. Roll back by reverting this scoped commit on the branch, retaining all learner-storage keys; never clear stored records. Merge and Production deployment require separate user approval.
