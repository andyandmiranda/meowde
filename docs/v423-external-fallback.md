# Meowde v4.23 External Fallback

## Runtime data order

Meowde now resolves lesson data in this order:

1. `assets/lessons-ko.js`
2. `assets/lessons-en.js`
3. `assets/lessons-fallback.js`

The Korean and English canonical files are the primary runtime source.

The combined fallback file is generated from the canonical files and is used
only if either canonical global array is unavailable.

## Removed structure

The large embedded `const DATA = {...}` object was removed from `index.html`.

`index.html` now contains only the data resolver and application logic.

## Source of truth

The canonical lesson files are:

- `assets/lessons-ko.js`
- `assets/lessons-en.js`

`tools/generate-canonical-lessons.js` reads those files and generates:

- `assets/lessons-fallback.js`
- `docs/v423-canonical-data.json`

## Runtime source marker

The app exposes one of these values through
`window.__MEOWDE_DATA_SOURCE__`:

- `canonical-v423`
- `external-fallback-v423`
- `unavailable`
