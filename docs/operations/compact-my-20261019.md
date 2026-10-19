# Compact My follow-up — 2026-10-19

Existing PR #95 reconciled with main 15f13f0 in its own branch only. The prior compact My proposal removed its character-room entry and retained a different tab order than Home. Restore the direct Meowde button and make tabs Home/Learn/Practice/Review/My. Retain compact profile, language and collapsed optional records. Restore the original validator assertion for character access in addition to the accessible My-label assertion. No test weakening, progress storage or grading change.

Local PASS: npm run validate (26 Node tests), original plus additional secondary-renderer assertions, syntax and diff checks. New browser regression covers tab order, removed dense headings, collapsed records, character access, review routing and unchanged learning state after reload. Exact-head CI pending; local browser unavailable from earlier corrupt installation. Hosted Preview NOT RUN. Production unchanged, merge/release approval not granted.

Correction to #78 initial 2026-10-19 comment: levelInfo DOES return xp. No undefined-XP defect was established; no XP-display calculation change was necessary.

Next: inspect exact-head CI and new browser test; verify fixed Preview through authorized access. Before integrating with #96, reconcile their service-worker cache versions and rerun combined regressions. Do not merge either PR based solely on this document. Rollback: scoped UI/cache revert, never clear learner storage.
