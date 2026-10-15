# MEOWDE — Shared Operations Ledger
Updated: 2026-10-15 KST (release-candidate reconciliation; this update is not yet on main)
Status: ACTIVE only when this file exists on `main`; branch and PR copies are proposals. Changes to this policy require CEO approval.

## System of record
- Live code and release: `main`, GitHub PRs/checks, and Vercel **production** deployment (not a READY preview).
- Work backlog: GitHub Issues when adopted. Never infer approval from an old chat, a PR, or this proposed ledger.
- Decisions and approvals: the user's Product Owner role and current project instructions govern approvals. Record the scope and date in [project-decisions.md](project-decisions.md) and the related PR. Existing CEO references denote the same user decision authority, not an additional approver. No approval is implied by silence.
- Current implementation and verification: [project-status.md](project-status.md). Brand baseline and unresolved provenance: [brand-assets.md](brand-assets.md). These supplement this ledger rather than duplicate its operating policy.
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

## Current reconciliation queue (NOT production approval)
| Priority | Link | Status at last verification | Next action |
|---|---|---|---|
| P0 | PR #83 | Active release candidate | Complete local/CI/hosted Preview checks, preserve records, then present exact scope for PO release approval |
| Superseded implementation | PR #76 | Targets retired external exercise page | Keep original page retired; new guided task tests cover blank/wrong/valid inputs and actual simulated result. Do not import old corpus |
| Superseded implementation | PR #75 | Targets retired quiz implementation | Current optional quiz permits retries; browser regression checks correct result and reload. Do not restore old page |
| Consolidated intent | PR #73 | Python↔Linux navigation and resume incorporated in #83 | No unapproved expansion courses or second Linux curriculum imported |
| Consolidated change | PR #74 | Root rewrite incorporated in #83 | Root URL, legacy bootstrap and offline resume checked locally; hosted Preview remains a separate gate |
| Needs separate reconciliation | PR #55 | Older real-input proposal; differs from present `v454` implementation | Current validation confirms stdin plumbing; do not merge conflicting older branch wholesale or claim all of its curriculum intent was delivered |
| Hold | PR #52 | Temporary validation PR | DO NOT MERGE; archive/close only after confirming purpose |

Last checked: 2026-10-15 KST. Main and latest listed Production deployment point to `ebdb63cc70a1525366ee12573def4b2296119543`. PR #83 preparation started from `3e92cdc88f4df21d58bf0105095e8024567a1a52`. This work does not merge main or deploy Production. Exact final validation belongs in the PR and project-status.md. All facts may change.

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
