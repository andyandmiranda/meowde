# Meowde v4.23 Architecture Baseline

## Scope

Phase 1 adds validation and documentation only. It does not change the rendered UI, lesson behavior, rewards, saved user data, PWA behavior, or deployment routes.

## Current runtime

`v412.html` fetches `index.html`, then injects versioned CSS and JavaScript patches in a strict order. The order is part of the runtime contract because later files wrap or replace functions defined earlier.

### JavaScript order

1. `v412-hotfix.js`
2. `v413-core.js`
3. `v413-lesson.js`
4. `v414-state.js`
5. `v414-reward.js`
6. `v414-screens.js`
7. `v415-retention.js`
8. `v416-journey.js`
9. `v417-review.js`
10. `v418-coach.js`
11. `v419-achievements.js`
12. `v420-profile.js`
13. `v421-vault.js`
14. `v422-pwa.js`

## Known coupling

The patch chain wraps or replaces global functions such as `renderHome`, `renderLesson`, `renderRoom`, `renderProfile`, `finish`, `tabs`, and `save`. Reordering or deleting a patch can change behavior without a syntax error.

## Lesson data

The canonical runtime data is currently embedded in `index.html` as `const DATA`. Equivalent split copies exist under `assets/data-ko-*.js` and `assets/data-en-*.js`. Phase 1 verifies that the two representations are identical. Phase 2 may switch the runtime to the split assets only after an explicit migration and browser regression test.

## Persistence

User state is distributed across versioned localStorage keys. The Data Vault intentionally collects keys with the `meowde-` prefix. Renaming or consolidating keys requires a migration that preserves existing users' progress and backup compatibility.

## Phase 1 validation commands

```bash
node tools/validate-v423.js
node --check sw.js
python3 -m json.tool manifest.webmanifest >/dev/null
```

## Refactoring rule

Only one subsystem should be consolidated per release. Every consolidation must preserve the current load order until the replacement has passed local UI, lesson, persistence, PWA, GitHub, and Vercel Production verification.
