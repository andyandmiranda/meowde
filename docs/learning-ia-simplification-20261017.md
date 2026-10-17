# MEOWDE learning IA / 2026-10-17

## Decision
Learning and practice are one activity, not competing navigation destinations. Primary navigation: **배우기 / 복습 / 더 보기**. The lesson itself includes short explanation, a question, feedback and application. A separate Python lab remains available only as **추가 문제 풀기**, a supplementary advanced surface, not a required step. Linux's extra practice, review, full roadmap and legacy history are hidden under **더 보기**.

## User-visible first screen
- Python: one primary **오늘 학습 시작 / 이어서 배우기** button; current lesson summary; secondary subject switch; optional extras in collapsed details. XP, daily quest, ranking and cat customization are no longer competing home CTAs.
- Linux: one primary lesson button, optional resources in collapsed details.
- Separate `simple-start.html` remains opt-in while the integrated existing homes are reviewed.
- Canonical Python renderers in `v413-core.js` and `v414-screens.js` were updated directly: the initial `index.html` renderer was previously overwritten during enhancement bootstrap, which explains why earlier "simplifications" did not appear. Course map and Python lab are now secondary destinations under More. Review prioritizes mistakes; completed lessons, smart review and learning quality are collapsed. The existing Python and Linux learning engines, localStorage keys, lesson grading, XP awards and legacy links remain intact. No production routing change.

## Typography and design
The shared `assets/meowde-unified-ui.css` supplies the Pretendard family, code monospace boundary, and original mint/cream palette to Python home, Linux home and Python extra challenges. The existing Pretendard CDN is loaded by Python lab as well. Other legacy screens may still need auditing; don't claim all pages are fixed.

## Release gates
1. Full `npm run validate` and Chromium browser suite including `tests/unified-learning-ux.spec.cjs`.
2. Preview screenshots at 320, 375, 390, 430px for home, lesson, Linux, extra challenges. Confirm no unexpected overflow, clipping, hierarchy regressions.
3. Confirm Python saved lesson auto-resumes, Linux saved input/step resumes, XP/done values remain unchanged by navigation.
4. Human novice task test: locate **배우기**, finish one question, return to same point, find **복습** without explanation; measure confusion and misclicks.
5. Real iPhone Safari manual check, including font loading, focus/keyboard, navigation and browser back. This is not validated by Chromium CI.
6. CEO explicitly approves merge/production. No automatic merge or promotion.

## Deferred
Full migration of the Python extra-challenge engine into the main lesson would risk overwriting or fragmenting distinct progress keys. Keep it as optional advanced practice until a separately verified migration is available. Do not delete existing content or user records.

## Root-cause findings
- `v414-screens.js` redefined `renderHome` and `renderReview` after initial bootstrap, and its `canonicalTabs` rendered five destinations (홈/학습/복습/실습/마이). Changes limited to `index.html` could not fix the real app.
- `v413-core.js` separately overrode `tabs` with another five-item navigation for course and lesson screens. Both actual renderers are now modified.
- `assets/styles.css` kept a five-column tabbar grid; the unified stylesheet now uses three columns.
- Linux styles kept pink tokens and several hardcoded pink controls; shared overrides now load on all Linux learning/review/library/legacy pages.
- Python focused review previously injected a prominent experimental panel and technical copy. It is now collapsed and uses learner-facing copy.
- Full visual parity across every state, browser and older cached service-worker session remains unverified. Do not describe as fully resolved until device testing.

## Final product navigation contract
- **배우기**: one CTA for next/resumed lesson; concept and practice are one journey.
- **복습**: missed problems first; completed lessons and optional experimental review collapsed.
- **더 보기**: course map, optional advanced problems, records/customization, Linux switch.
- The Linux subject currently uses a standalone page and has not been migrated to a single SPA. Cross-subject visual consistency is improved, but seamless one-shell routing remains deferred to avoid risky storage migration.

## 2026-10-17 rollback after CEO feedback
The reduction to three tabs and aggressive collapse of course/practice/progress was rejected because it buried necessary learning functions. Restored the previous canonical `v413-core.js` and `v414-screens.js` from commit `f802857` on the draft branch. The five-tab model is a temporary discoverability-preserving baseline, **not** approved final IA. Do not claim the simplified three-tab structure is shipped. Next design must preserve direct access to course path, learning, hands-on practice, review and records, while reducing clutter inside each screen; validate task paths with users before any further removal. Existing visual/typography changes remain under review.

## Follow-up UX audit: preserve discoverability (2026-10-17)
- Keep the home learning journey, overall completion, current course, previous/current/next lesson, one resume CTA, and daily practice.
- Linux extra practice was **inaccessible**: `#more-learning` was closed by default and its `summary` was hidden by a `.learning-library` CSS rule. Restore the summary and default-open course/practice sections; retain all terminal, lesson, and Bash tools.
- Python review retains smart review and missed exercises first, displays the three most recently completed lessons immediately, offers older completed lessons via a labeled disclosure, and moves optional learning analytics into a labeled disclosure.
- Remove only the dead `unitCard()` helper; the visible `homeLearningJourney()` is the sole source of the home progress/course card. Do not delete core learning/practice/review tools or XP and localStorage.
- Browser regression is required before merging: `tests/ux-discoverability.spec.cjs`, `tests/home-learning-journey.spec.cjs`, `tests/focused-review.spec.cjs`, `tests/linux-design-unification.spec.cjs`. Preview READY alone is not release approval.
