# Legacy lesson data

This directory contains the pre-v4.23 split lesson data.

## Status

These files are archived for comparison and historical reference only.

They are not part of the Meowde runtime and must not be loaded by:

- `index.html`
- `v412.html`
- `sw.js`
- any `v4*.js` runtime patch

## Current canonical runtime

The active lesson files are:

- `assets/lessons-ko.js`
- `assets/lessons-en.js`

The embedded `index.html` data remains a temporary fallback while the v4.23 migration is stabilized.

## Known differences

The legacy data is intentionally not identical to the canonical runtime data:

- Korean legacy data: 30 lessons, 180 exercises
- English legacy data: 20 lessons, 120 exercises
- Canonical Korean data: 30 lessons, 170 exercises
- Canonical English data: 30 lessons, 170 exercises

Do not restore these legacy files to the runtime without a new content migration and full validation.
