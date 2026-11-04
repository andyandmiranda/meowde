# My / Together simplification — 2026-10-29

User decision: remove unnecessary character/guest management emphasis and invitation form fields.

- My retains profile and learning summary; review is one action, history is expandable. Appearance and achievements are secondary collapsed settings. Removed the prominent character/coach card and redundant level progress display.
- Character selection is a small appearance screen with the existing six IDs. Guest gallery, coaching gallery, seasonal cards and growth cards are not rendered there. Their existing stored preferences are not deleted or migrated.
- Python profile and appearance navigation now consistently uses Home / Learn / Deepen / Together / My.
- Together has two direct actions: copy invitation URL and show a locally generated QR. No sender/subject form, native-share prerequisite or progress reads. Clipboard denial exposes a selectable read-only URL. New URLs contain only invite=1 and optional Linux subject; older topic links remain readable.
- qrcode-generator 2.0.4 is vendored from the npm registry with MIT attribution; QR data is not sent to an external service. No server service or billing dependency.
- New focused Node sharing tests 3/3 PASS: minimal URL, clipboard denial fallback, local Linux QR/toggle. Updated existing browser invite scenario; full Playwright suite not rerun.
- Original Smart Review primary-write regression remains a separate local investigation; this UX patch does not claim that release gate passed. Main, Production and real user records unchanged.
