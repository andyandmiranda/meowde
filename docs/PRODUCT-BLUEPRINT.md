# MEOWDE — Product Blueprint v2.0

**Design reference date:** 2026-10-23 KST  
**Status:** Product design proposal; not implemented, released, or approved for production.  
**Authority:** Founder discussion on 2026-10-23; GitHub Issue #78 remains the execution ledger.  
**Scope:** Target architecture, learning experience, preservation requirements and phased delivery.

## 1. Product vision

MEOWDE helps beginner Python and Linux learners start easily, understand concepts, solve unfamiliar problems independently, learn from mistakes and return to study. Six existing cat characters and independent coaching modes support motivation, but XP, churu and screen time are not proof of learning.

Value pillars: low-friction basics; progressive independent skill; optional social motivation. Optimize for learning outcomes, service reliability, lawful content and validated growth rather than feature count.

## 2. Target navigation: five tabs

| Tab | User question | Primary responsibilities |
|---|---|---|
| 홈 (Home) | What should I do now? | One prominent resume/start CTA, relevant review link, concise progress and rewards |
| 학습 (Learn) | What does this mean? | Preserve existing short concepts, examples, basic questions, Python/Linux roadmap, free unit selection and revisits |
| 심화 (Deepen) | Can I solve it alone? | Three-stage learning, coding practice, error diagnosis, Smart Review, wrong-answer retries, optional free coding |
| 함께 (Together) | How can I keep going with others? | Proposed public study rooms with cat avatars and focus timers; later friends, optional camera study and virtual village |
| 마이 (My) | How have I progressed? | Six existing characters, independent coach selection, XP/churu, completed lessons, detailed records and settings |

One feature has one canonical home; other tabs may deep-link. Bottom navigation should not duplicate exercise engines. Existing Home/Learn/Practice/Review/My implementations are **current/historical reality**, not proof that the target five-tab design has shipped. No standalone Review tab in the target blueprint; preserve review behavior and deep links when relocating it.

## 3. Learn — preserve the simple baseline

Keep beginner concept → short example → simple question → immediate feedback. Do not replace the effective existing basics with long lectures or hard application tasks. Provide '자세히 이해하기' link to the matching advanced concept. Maintain progression, completion status, free selection and ability to revisit without reset. Python and Linux have different execution environments; label capabilities honestly.

## 4. Deepen — three progressive stages

**Shared teaching pattern:** one small concept → immediate action → explanatory feedback. Avoid front-loading all detailed theory. Allow return to an earlier stage and optional skip to challenge; assisted completion is not independent mastery.

1. **이해 (Understand):** explain one deeper mechanism, compare code, highlight a common misconception, require a short prediction or trace.
2. **연습 (Practice):** teach additional detail just in time, guide code completion or debugging, reveal hints in stages, run and explain results.
3. **도전 (Challenge):** unfamiliar transfer task, independent code writing, executable tests and debugging, optional fallback. Track hint dependence separately.

Inside Deepen, expose **문제 해결 / 집중 복습 / 자유 코딩**. Smart Review derives from actual completed lessons/mistakes; zero-history users see an honest empty state, not unseen material mislabeled as review. On mistakes, distinguish what was attempted, why it failed, the exact expected behavior, and how to retry. Reveal model code only in the appropriate post-attempt state. Preserve existing grading and alternate-solution tests.

## 5. Together — staged and safety-gated

**Phase A:** optional camera-free public study room, cat avatar and focus timer; room remains useful for solo focus when no others attend. Never fabricate active users.  
**Phase B:** friends, reconnecting and opt-in shared goals; privacy-first sharing.  
**Phase C:** optional camera study/screen sharing only after consent, reporting/blocking, age policies, abuse response and moderation capability are verified.  
**Later:** richer navigable cat village and collaborative missions only after demand and retention evidence.

Public interactions must not expose exercise answers, drafts, progress details, identity or other private information without explicit choices. Social expansion must not postpone core grading/storage reliability. Do not ship an empty Together tab with fake affordances.

## 6. Primary journeys and buttons

- First visit: Home → Learn → first concept/example/basic question.
- Returning learner: Home resume → exact saved lesson/question/attempt.
- Needs deeper explanation: Learn → matched Deepen Understand → return to original context.
- After basics: Deepen Understand → Practice → Challenge; steps can be revisited or skipped with accurate mastery reporting.
- Wrong answer: feedback with exact cause → staged help/retry → later focus review.
- Due review: Home link → Deepen/집중 복습 → precise saved review items.
- Together: opt-in focus room → optional linked Learn/Deepen study target.
- My: record details → specific previously completed lesson; independent coach/avatar selection.

Buttons must have honest destination labels and work with mobile touch/keyboard. Back-navigation should restore the previous learning context, not unexpectedly route Home. Present one primary CTA on Home. Do not restore the removed 1-minute challenge to satisfy obsolete tests.

## 7. Non-negotiable preservation

Maintain existing Python/Linux lesson and exercise identities, learning progress, completed/revisit state, drafts, grading behavior, mistakes, Smart Review, XP/churu balances and one-time reward guards, preferences, six original characters and independent coach choices. Preserve valid deep links and PWA/offline behavior. Any changes to localStorage/sessionStorage or service worker require explicit compatibility and recovery verification. Linux simulator is not a host terminal; preserve its own session semantics. No silent storage-key rename, reset or migration.

The current runtime has ordered versioned enhancement scripts and multiple persisted keys. Avoid mass refactors or file renames as a prerequisite of this blueprint.

## 8. QA, rights, and release gates

Distinguish static tests, exact-HEAD GitHub CI, Preview READY, hosted Chromium, WebKit, real iPhone Safari, learner QA, storage/rewards and actual learning outcomes. A PASS in one category never substitutes for another. Run the smallest meaningful regression for changed behavior and expand only with evidence.

Create independently written and technically accurate questions/explanations. Check content and asset licenses, commercial-use rights and AI-generated similarities. Never republish uploaded private materials. Unverified public assets are blocked from release. Public social/video features require a separate privacy/security/moderation review.

Main merge, Production/alias changes, destructive data changes, paid spend and major security/auth/payment/pricing/brand changes need new explicit founder approval tied to exact scope/SHA.

## 9. Delivery plan and evidence

**Phase 0 (P0/P1):** stabilize existing PR #102 release gates, grading, progress, offline storage, rewards and rights.  
**Phase 1 (P1):** map every current screen/action to five target tabs; relocate links without loss; preserve existing Learn; test routing/deep links/back/history.  
**Phase 2 (P1):** pilot Deepen's Understand/Practice/Challenge on one representative unit, evaluate novice independence, confusion and hint reliance before scaling.  
**Phase 3 (P2):** test camera-free study room participation and repeat use with safety controls; do not assume product-market fit.  
**Phase 4 (P3):** add more social or village functionality only on measured demand.

Success metrics: first start/resume success, grading correctness, first-attempt and unfamiliar-transfer accuracy, hint dependency, repeat retention and verified storage safety; for social, meaningful sessions and return visits balanced against safety events. Avoid invented adoption/revenue claims.

## 10. Status and traceability

This document records the **desired product design**, not current shipped status. PR #102 and related drafts must be inspected at their current exact SHAs; this blueprint alone authorizes no implementation or merge. GitHub Issue #78 owns the prioritized execution ledger and handoff. Existing tests and workflows must not be weakened merely to mark a gate green.

**Documentation-only draft:** Changes to this document do not alter app code, production, learner data, costs, or permissions.
