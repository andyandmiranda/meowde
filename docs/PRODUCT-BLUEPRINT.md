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


## 11. Blueprint v2.1 implementation and release clarification (2026-10-25)

This addendum refines delivery criteria without claiming features are shipped. Preserve the five-tab destination and all v2.0 data/rights constraints. Current Production already includes the function-deepening pilot; do not repeat it. Subsequent Preview work on PR #102 is not Production.

### Navigation and learning ownership

- **Home:** one visually dominant resume/start CTA. Deepen, review and subject links are secondary and never compete as equal primary actions. Restore the precise previous question/attempt on resume.
- **Learn:** existing beginner concept → example → basic question stays accessible and revisitable. Add context-preserving '자세히 이해하기' only where a matched Deepen concept actually exists.
- **Deepen:** the canonical learning path is 이해 → 연습 → 도전, with optional skipping/backtracking and separate assisted versus independent mastery. Existing Python practice, Linux practice, focused review and free coding remain accessible as subordinate destinations. Do not duplicate exercise engines, silently redirect old URLs, or change storage keys.
- **Together:** do not expose a placeholder or fake participants. A solo focus timer can be tested separately; a public room is release-gated by actual multi-user functionality, accurate occupancy, opt-in participation, privacy controls and moderation readiness. Never imply that a solo timer is a public study room.
- **My:** preserve all six original cats, coach independence, XP/churu, settings and detailed progress.

### Answer feedback quality contract

For an incorrect answer, show (1) the learner's actual attempted choice/output, (2) the specific mismatch and causal explanation, (3) a minimal correction or progressive hint without premature answer leakage, and (4) a retry action with unchanged grading and one-time reward semantics. Handle alternative valid code, whitespace-sensitive requirements, runtime errors, and 'cannot determine' states explicitly. Evaluate explanations against representative beginner misconceptions before general rollout.

### Mobile, state and accessibility gates

For every navigation or practice change, check 320px viewport without horizontal clipping, touch targets at least 44×44 CSS pixels, keyboard focus and labels, browser Back/Forward, direct URLs, PWA cached-version updates, draft persistence across refresh/navigation, independent attempt/reward accounting, and no reset of pre-existing learning records. Distinguish Chromium, WebKit simulation and physical Safari; mark any unrun check NOT RUN rather than PASS. Never overwrite real user storage for QA.

### Evidence-driven staged releases

- **Release A — Safe entry:** validate PR #102's actual current HEAD, Home primary CTA hierarchy, Deepen secondary entry links, Python/Linux practice and review destinations, Back behavior and persisted records. Block release on a broken link, lost draft, wrong grade, duplicate reward or unexpected redirect.
- **Release B — Deepen integration:** one canonical Deepen destination with Understand/Practice/Challenge plus practice/review/free-code entry; retain legacy deep links and old keys. Pilot novice comprehension and hint independence before expanding units.
- **Release C — Five-tab destination:** enable 홈·학습·심화·함께·마이 only when Together offers real, safe, non-deceptive functionality. If Together is not ready, keep existing working navigation instead of an empty fifth tab.
- **Release D — Learning effectiveness:** evaluate first-attempt correctness, unfamiliar transfer, retries, hint reliance and delayed recall using privacy-respecting measurement; do not claim gains without data.

Each release requires exact-SHA change evidence, focused regression, Preview readiness, clearly stated unverified devices, and a founder approval for main/Production/alias operations. Estimate delivery time only after blockers and test scope are verified. Issue #78 remains the owner ledger. Do not weaken old tests to fit an unshipped navigation target.


## 12. Blueprint v2.1 — competitor-informed learning design (proposal, 2026-10-25 KST)

**Status and ownership:** additive design proposal, not shipped or approved for release. Preserve all v2.0 commitments and the staged release gates above. This document belongs to existing docs PR #109; implementation ownership remains with Issue #78 and the designated code PR/Work handoff. Competitor patterns are inspiration, not proof of efficacy or permission to copy proprietary assets/content.

### 12.1 What to adapt, and what not to copy

| Reference pattern | MEOWDE adaptation | Evidence gate |
| --- | --- | --- |
| Coding for Kids: small game actions with visible outcomes | Optional cat reaction to **actual** safe code execution; keep correctness independent of animation | Novice comprehension and accessibility; no fake success |
| CodeCombat: progressive hints and recovery when stuck | Error location/cause → one hint → scaffolded bridge → independent retry | Compare first-attempt and unaided transfer; avoid revealing model answer early |
| Tynker: block-to-text scaffolding | Read/predict → edit one line → complete partial code → independently write; no mandatory block editor | First-unit completion and learner interviews |
| Mimo: short lessons leading to usable projects | 3–8-minute concept-to-action sessions followed by optional authentic mini-project | Completion, transfer, repeat use; do not promise a fixed duration |
| Sololearn: peer learning | Later opt-in discussion or sharing without exposing answers/drafts by default | Moderation, privacy, demand and safety approval |
| Code.org: structured teaching and testing | Distinguish running code, visible output, grading against tests, and actual conceptual mastery | Exact-result regression, transparent test limitations |

### 12.2 Three independent axes (do not conflate)

- **Activity:** 이해 / 연습 / 도전 describes the learner's action, not difficulty.
- **Task difficulty:** proposed Lv.1 입문 (read/predict one operation); Lv.2 기초 (edit one known operation); Lv.3 응용 (apply a known concept to new inputs); Lv.4 심화 (combine concepts, trace/debug edge cases); Lv.5 실전 (independently design, implement and test an unfamiliar solution). These are **rubric candidates**, not automatic mappings of existing labels.
- **Learner mastery:** 미학습 / 도움받아 해결 / 독립 해결 / 나중에도 재현; store only after explicit data compatibility review. Never equate hints, rewards, activity completion or a skipped task with independent mastery.

For each exercise, a human-reviewed content audit must record concepts, prerequisite IDs, required operations, novelty, reasoning steps, rubric rationale and representative novice attempt. Existing lab labels (기초→이해, 응용, 전이, 심화, 프로젝트) and original exercise IDs stay unchanged until separately validated. Show unknown difficulty as **미분류**, never invent a numeric level.

### 12.3 P0 pilot: first Python lab difficulty bridge

**Observed source:** `assets/python-lab-content.json` first unit `values` has a basic prediction quiz but an application-level `pack(text, capacity)` writing task requiring function definition, `return`, `int()`, integer division `//`, remainder `%`, and tuple return. Its unit-level prerequisite array is empty; this is not evidence that learners already know those operations. Existing PR #102 home warning is explanatory only, **not a working bridge exercise**.

1. **Understand:** read a tiny example, predict `int("23")` and `23 // 6` / `23 % 6`; explain string conversion and remainder in plain Korean.
2. **Guided bridge:** fill only the missing expression in a prepared function and verify output/return, then explain why `print` is not `return`. Provide a hint before the solution.
3. **Independent challenge:** retain the existing original `pack` prompt, starter, grading tests and all edge cases unchanged. Optional bridge never silently submits, marks completion, grants XP/churu or overwrites a saved draft.
4. **Fallback:** from a failed attempt, return to the exact relevant concept or bridge and then to the same saved challenge context. Preserve Python/Linux route and PWA/back navigation.

**Acceptance:** original lab records byte-identical on optional bridge open/close, legacy and unknown storage keys untouched, no auto-submit/reward, original test suite unchanged, assisted vs independent results not conflated, mobile 320px/44px tap targets checked, Chromium/WebKit and real iPhone marked separately PASS/FAIL/NOT RUN. Pilot one unit before mass authoring.

### 12.4 P0 mistake explanation and data protection

- Feedback should state **attempt → actual result → expected result → exact cause → smallest next action**; distinguish syntax, conceptual and boundary-case errors when determinable. Avoid hallucinated causes or claiming certainty for ambiguous outputs.
- Retry the same or analogous task with progressively disclosed hints; label revealed model solutions and never award independent mastery for assisted completion.
- Before editing any persistence, enumerate and snapshot all known local/session storage, PWA cache, draft, completion, mistakes, one-time reward guards, cat/coach selections and Linux session invariants. Validate old/new version coexistence, reload, offline, quota failure and rollback. No destructive migration or changed grading criteria under this proposal.

### 12.5 Sequenced delivery and measurement

1. **P0 — safety:** reuse exact-SHA existing CI; run only missing targeted grading/draft/reward/route/mobile regressions on a new SHA. Production remains unchanged pending new scoped approval.
2. **P0 — one bridge:** add the optional `values` guided exercise in the existing owned implementation PR; evaluate novice confusion, bridge uptake, first-attempt and later unaided success. Do not add broad level labels yet.
3. **P0 — error explanations:** audit 5 representative failure cases, fix one reproducible explanation gap, verify no answer leakage or grading changes.
4. **P1 — curriculum:** audit and label exercises using the three-axis rubric; recommend next task from actual prerequisites, mistakes and independent attempts, while allowing voluntary skips.
5. **P1 — navigation:** reconcile the existing five screens with target 홈·학습·심화·함께·마이; relocate review without deleting records, preserve deep links/back and do not ship an empty Together screen.
6. **P2 — engagement:** test small cat code-response and short authentic projects. Gate optional peer rooms behind privacy, moderation and evidence of demand.

**Success metrics:** first learning start/resume, concept-to-independent challenge completion, hint reliance, error-specific retry success, delayed unfamiliar transfer and learner retention. Track baselines and denominators; no fabricated improvements, user counts or revenue.

### 12.6 Founder decision register — no silent scope changes

- **Decision needed:** whether to adopt the five-level rubric as a product-wide public label after sample content calibration; existing labels stay authoritative until then.
- **Decision needed:** whether/when to introduce any AI tutor, social account, camera, public sharing or paid API, with privacy, moderation, spend and approval gates.
- **No new decision:** v2.0 five-tab destination, existing six cats/coaches, protected learner data, exact-SHA testing, one main Home CTA, and explicit Production approval remain unchanged.
