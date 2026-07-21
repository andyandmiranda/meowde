# Meowde v4.23 Legacy Data Isolation

## Purpose

The old split lesson files were moved from `assets/` to `assets/legacy/`.

They are retained only for historical comparison and migration audits.

## Runtime source

The v4.23 runtime uses:

- `assets/lessons-ko.js`
- `assets/lessons-en.js`

`index.html` also retains embedded lesson data as a temporary fallback.

## Legacy source

The following files are not runtime assets:

- `assets/legacy/data-ko-1.js`
- `assets/legacy/data-ko-2.js`
- `assets/legacy/data-ko-3.js`
- `assets/legacy/data-en-1.js`
- `assets/legacy/data-en-2.js`

## Enforcement

Validation must fail if any legacy file is referenced from:

- `index.html`
- `v412.html`
- `sw.js`
- `v4*.js`

The legacy files may still be read by audit tooling.
