# Linux five-tab continuity — 2026-10-17

Approved scope: continue the Linux navigation follow-up to the MEOWDE Development OS audit. Reuse Draft PR #93; no merge or Production approval.

## Behavior
- Linux home, guided lesson, concept/practice library, review and a read-only Linux My view expose Home / Learn / Practice / Review / My in that order.
- Learn opens concepts; Practice returns to the last terminal/condition/Bash mode. Within the library these two tabs change visibility without rebuilding engines. Other destinations preserve practice through same-tab sessionStorage.
- Terminal state is reconstructed by replaying its own commands through the restricted in-memory simulator, never the host shell. Mission, drafts, outputs, hint state and attempt count persist through navigation/reload. Explicit mission change/reset still resets the temporary filesystem. Existing persistent learning keys/schema remain unchanged.
- Linux My derives completion counts from existing records and links to existing legacy records and shared profile/settings. It does not write progress or invent completion.
- Quiz-to-practice duplicate buttons replaced with bottom-tab guidance; theory-only unit disclosure retained. Corresponding legacy tests now verify the approved single-entry behavior while retaining wrong/correct mission checks.
- New assets registered in PWA cache with version increment. Existing content retained.

## Verification and limitations
Local pnpm validate passes including 26 Node tests; syntax and whitespace checks pass. Added browser checks for six Linux destinations at 320px, five-tab round trips, wrong command/retry/hint, filesystem restoration, reload, mission change/reset, independent concept selection/Bash draft, corrupt-session preservation, and no duplicate entry. Existing Linux mobile/course/curriculum tests included in the existing CI job; WebKit runs the targeted tab suite. Exact-head CI must be verified after publishing.

Session storage is temporary and browser-tab scoped, not permanent learner progress or cross-device sync. A read/storage failure preserves the old value and shows a copy-work warning. Main/Production unchanged. Real iPhone keyboard/screen-reader/human usability and complete course semantic accuracy remain unverified. Same AI implementation/review is not independent review.

Rollback: revert this scoped change on the PR branch. No learner-data migration or destructive cleanup.
