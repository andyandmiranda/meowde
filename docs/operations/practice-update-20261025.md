# Standalone practice PWA update

Owner: current Work conversation. Baseline PR #102 / c829e2fcdd23e2706ed39d3d8dac5a13862b6e7c.

Observed during the prior release: an existing controlled Production tab opened the new function hash but rendered the first old task even after reload. Home → Practice started the update and exposed the new unit without clearing records. `python-lab.html` never checks an existing SW registration; old SW asset lookup ignores query strings, so changing `?v=2` cannot independently invalidate its cached engine/content.

## Minimal correction

New independent `assets/python-lab-update.js` is loaded by the network-first practice HTML, outside the old cached engine. It checks only an existing root registration, observes update readiness and offers an explicit new-screen action. It does not force PWA installation on a fresh standalone visit, auto-reload, submit answers, grant rewards or write storage. Offline check failures keep the editor and retry on the online event.

Before the requested reload: block an active run; if the editor changed since render, compare its text with the engine's persisted draft in `meowde-python-lab-v1` (resolved current unit and separate function practice record). On read/format/quota-related mismatch, retain the editor and old bytes and explain that reload was blocked. Existing waiting-worker activation requires a click and rechecks safety on controller change. Retain the exact URL/hash. Cache v485 precaches the new asset atomically.

## Verification

PASS local existing npm validate (53 Node +2 PWA), syntax and whitespace at initial checkpoint. Real Chromium/WebKit regression is pending CI: real prior-style SW/cache seeded with old 19-unit content → new HTML/checker while engine still renders old task → no automatic reload → changed draft saved → running guard → explicit update → original function practice deep link, legacy/unknown bytes preserved. Separate quota-denial case must block reload and preserve unsaved text and original bytes. The fixture mimics the old cache/content behavior; it is not a physical iPhone or a byte-identical archived build.

NOT RUN local browser (known browser executable download failure), physical iPhone, novice learning outcomes, new Production release. Previous c829e2fc CI applies only to unchanged earlier release; do not report it as this head's evidence.

## Rollback / next

Remove the added HTML script reference and updater/cache entries together, or keep the existing Production unchanged. No learner storage migration/deletion is needed. Recheck HEAD before leased branch update; verify exact new CI/Preview, correct actual failures. Current Production c829e2fc / dpl_FzJtVEcT697KzmEkRMAa8DGH2pPv is preserved. This follow-up does not reuse prior one-off Production approval; a new release awaits concrete approval after verification.

First CI1f542971: original function tests PASS, cached-update tests FAIL because the fixture changed only the hash, leaving the old HTML without the new checker loaded. Corrected setup explicitly reloads the document (the actual observed reproduction included reload). Assertions and product code unchanged. Pure hash changes in an already running old document cannot load a newly deployed script; the correction applies when the new practice HTML is fetched.
