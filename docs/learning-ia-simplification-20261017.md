# MEOWDE learning IA / 2026-10-17

## Decision
Learning and practice are one activity, not competing navigation destinations. Primary navigation: **배우기 / 전체 과정 / 더 보기**. The lesson itself includes short explanation, a question, feedback and application. A separate Python lab remains available only as **추가 문제 풀기**, a supplementary advanced surface, not a required step. Linux's extra practice, review, full roadmap and legacy history are hidden under **더 보기**.

## User-visible first screen
- Python: one primary **배우기 시작 / 이어서 배우기** button; current lesson summary; secondary subject switch; optional extras in collapsed details. XP, daily quest, ranking and cat customization are no longer competing home CTAs.
- Linux: one primary lesson button, optional resources in collapsed details.
- Separate `simple-start.html` remains opt-in while the integrated existing homes are reviewed.
- The existing Python and Linux learning engines, localStorage keys, lesson grading, XP awards and legacy links remain intact. No production routing change.

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
