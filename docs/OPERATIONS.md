# MEOWDE — Shared Operations Ledger
Updated: 2026-10-14 KST
Status: PROPOSED / DRAFT PR ONLY. This file is not authoritative until reviewed and merged into main.

## System of record
- Live code and release: `main`, GitHub PRs/checks, and Vercel **production** deployment (not a READY preview).
- Work backlog: GitHub Issues when adopted. Never infer approval from an old chat, a PR, or this proposed ledger.
- Decisions and approvals: explicit CEO approval recorded in an issue/PR with scope and timestamp. No approval is implied by silence.
- When the ledger is stale or inaccessible, STOP new code work; verify current state first.

## Operating roles and cadence
- CEO: product direction, budget, high-impact decisions, production deployment approval.
- Engineering Lead (weekdays 09/11/13/15/17 KST): inspect state, continue one approved work item, isolated branch + reviewable PR and evidence, no production action.
- Chief of Staff (weekdays 09/12/15/18 KST): independently inspect records and report meaningful changes, risks, one recommendation, and CEO decisions; **report-only**.
- Product & UX / Learning & Game / Market & Growth / Funding & Business / Quality & Security: specialist review domains, NOT independent running workers unless separate execution evidence exists.

## Hard operational limits
1. One active autonomous development item at a time.
2. If two or more **automation-generated** unmerged PRs exist, do not create another. Focus on validation/consolidation.
3. No main write, merge, production deployment, destructive storage changes, credential/permissions alteration, paid commitments or contracts without explicit CEO approval.
4. Preserve Linux/Python progress and localStorage keys, PWA cache behavior, brand assets; validate educational correctness and content rights.
5. CI / browser E2E / storage preservation / content QA are separate gates. Mark each PASS / FAIL / NOT RUN; never treat READY preview as passed.
6. Each work item has owner, reviewer, validator, decision owner, scope, risk, rollback and acceptance criteria; AI role labels do not constitute independent review.
7. Record outcomes in issue/PR, not only in transient chats. Never claim that report automation itself created or tested code.

## Initial reconciliation queue (NOT blanket approval to merge or extend scope)
| Priority | Link | Status at last verification | Next action |
|---|---|---|---|
| P0 | PR #76 | Draft, Linux command drills | CI, blank/wrong/correct/multistep E5-E7, storage, preview E2E |
| P0 | PR #75 | Draft, wrong-answer quiz retry | wrong→right and locked-correct checks; reconcile with #76 |
| P1 | PR #73 | Draft, subject switch/Python resume | existing progress, refresh and subject switching |
| P1 | PR #74 | Draft, clean root path | URL/bootstrap/PWA/service-worker verification |
| P2 | PR #55 | Open, real input practice | compare with current main and check potential conflicts |
| Hold | PR #52 | Temporary validation PR | DO NOT MERGE; archive/close only after confirming purpose |

Last checked: 2026-10-14, production main commit `424ab1cb1c6a514b1edbab3c2758f6f88ff2d727`. All facts may change.

## Per-run handoff template
- Timestamp (KST):
- Source commit / production deployment:
- Approved issue and approval link (or **NONE**):
- Active work item, owner, reviewer, validator:
- Change since last run, evidence (PR/commit/check URLs):
- Tests: unit / CI / browser E2E / storage / content / security (PASS, FAIL, NOT RUN):
- Production changed? (default NO):
- Risk/blocker:
- Next single action:
- CEO decision needed? (YES/NO, with options if YES):

## CEO briefing policy
Report only verified differences since last briefing; say “no verified changes” when appropriate. Separate reviewed / implemented / tested / merged / deployed. Escalate only time-sensitive/high-impact items, and recommend one high-value next step.
