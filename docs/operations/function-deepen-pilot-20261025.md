# Function deepen pilot — 2026-10-25

Owner: current Work conversation, founder request to finish the next Production release.
Baseline: PR #102, `980578a3efca8879b992f607d3f82ad66b73e5b9`; main remains `15f13f05dfd49e84781e1664b6de4c1c65e9c260`.

Learner story: Practice → function pilot → predict return versus print → guided scalar function → transfer to multiple bookings → real Python feedback → resume the same stage/draft after refresh or browser back → return to Learn with prior learning intact.

## Scope and preservation

Adds the independently authored `function-slots` unit alongside existing units. Three optional hash-addressed steps: `#function-slots/understand`, `/practice`, `/challenge`. No prerequisite lock or fabricated Together tab. Guided practice and challenge use the existing Worker/Pyodide engine with behavioral assertions, explanatory feedback, staged hints, and independent retry. Existing function unit/content IDs remain unchanged.

Storage is additive in the existing `meowde-python-lab-v1` key: challenge/understanding under `function-slots`, guided draft/results under `function-slots:practice`. No migration or deletion; unknown records survive. First code submission result is retained separately from later attempts. Hint-assisted passing does not set independentPassed. No legacy learning key or XP/churu mutation. Prediction choice/feedback now restores after refresh.

Stage navigation stops an active Worker; source code is saved on input. Unsupported/unreadable existing storage remains untouched and reports that saving is blocked. PWA cache is advanced to v484 and changed resources use new query versions. Existing deploys remain available for rollback.

## Validation checkpoints

- PASS local `npm run validate` (existing validation and Node suites plus content structure).
- PASS local `python tools/validate-python-lab.py`: 20 examples, 91 challenge criteria, four guided criteria, existing content hash contracts preserved; wrong return/print, unclamped negative, first-booking-only, input mutation and sample-only implementations rejected.
- PASS syntax / whitespace checks.
- Local Chromium: NOT RUN, executable download failed (truncated archive). Do not interpret as product failure.
- Exact new HEAD CI Chromium/WebKit: pending at initial checkpoint; update Issue #78 with final SHA and outcomes.
- Hosted Preview: NOT RUN at initial checkpoint; previous deployment is protected by login. Keep protection unchanged.
- Actual iPhone Safari and novice understanding/retention: NOT RUN. Automated WebKit is a distinct result.

## Release and rollback

Release only an exact SHA with completed CI and READY Preview, after checking branch lease and alias. User's current next-release instruction authorizes this bounded release, not a main merge. Previous Production `dpl_DvJvmXy7MyLcG4HQJAdXHBBrBE2x` / 980578a3 is rollback candidate; preserve older requested `dpl_GmmJN7TFzR3jjvgQjuZY7xomf8F9`. To roll back code, promote the verified prior deployment; never clear learner storage. Additive pilot records can remain on rollback. No new paid service, telemetry, security/auth changes or private course-material publication.

Next: exact-head CI/Preview, correct actual failures, hosted smoke and authorized production promotion. Issue #78 is the final release ledger.
