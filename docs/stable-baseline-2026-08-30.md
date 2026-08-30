# Meowde stable baseline — 2026-08-30

This file records the last Production baseline before coach-mode learning-style behavior was added.

## Baseline

- GitHub main: `72116c51051dbe1030e759ac90ea9a91acf2082f`
- Vercel Production: READY
- Git commit verification: verified
- Validation CI: success
- Production mobile E2E: success at 390×844 with touch emulation

## Verified behavior

- Home / Learn / Review / Meowde persistent navigation stays at four tabs.
- Meowde exposes exactly six selectable modes: Focus, Dancing, Study, Cheer, Challenge, Debug.
- Each mode maps to its approved v4.51 WebP character asset.
- Mode selection persists through `meowde-v443-coach-mode` and survives reload.
- Selected mode is used for the pre-answer Lesson coach.
- Correct/wrong/runtime feedback temporarily overrides the selected pose and the selected mode returns afterward.
- No console/page errors or HTTP 4xx/5xx were observed in the final Production E2E.
- Existing progress, XP, Churu, achievements, growth, events, review and learning-state keys remain intact.

## Rollback boundary

If coach-mode learning-style work introduces a product regression, use this SHA as the known-good behavioral baseline. Do not roll back by deleting localStorage data or renaming persistence keys.
