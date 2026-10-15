# MEOWDE — Shared Operations Ledger
Updated: 2026-10-14 KST
Status: ACTIVE only when this file exists on `main`; branch and PR copies are proposals. Changes to this policy require CEO approval.

## System of record
- Live code and release: `main`, GitHub PRs/checks, and Vercel **production** deployment (not a READY preview).
- Work backlog: GitHub Issues when adopted. Never infer approval from an old chat, a PR, or this proposed ledger.
- Decisions and approvals: explicit CEO approval recorded in an issue/PR with scope and timestamp. No approval is implied by silence.
- When the ledger is stale or inaccessible, STOP new code work; verify current state first.

## Expanded autonomy authorization — 2026-10-15 KST (owner instruction)

The product owner authorized implementation of an automated development, validation, low-risk merge and deployment system, with stop-and-ask for high-risk actions, costs and security changes. This authorizes building the system and its guardrails; it does **not** mean an untested workflow may immediately merge or deploy. The earlier per-change approval requirement is superseded **only** for changes that pass the policy and technical gates below. A proposal branch is not an active production policy until merged.

### Eligibility and risk

- **Low risk:** documentation, non-executable copy, and tightly scoped UI or learning-content changes only after automated tests and content QA demonstrate no impact on user data, navigation, progress, cache or security. A code change is never low risk merely because it is small.
- **Always high risk / human approval:** dependencies and lockfiles, GitHub Actions and other CI definitions, permissions and credentials, authentication, network behavior, arbitrary code execution/Pyodide sandbox, user data/localStorage schemas, service worker and offline cache, routing/bootstrap, payments, third-party content rights, destructive changes, paid resources and production configuration.
- Existing draft PRs (#83/#84), older PRs (#55/#52), or unreviewed changes are **not** automatically eligible for merge.
- Product owner approval of expanded autonomy is **not** approval to disable branch protection, add tokens, incur API costs, or publish any particular unvalidated release.

### Mandatory gates for unattended progression

1. Use a single queued task, isolated branch, least-privilege agent identity, and a concurrency lock. No overlapping automation-generated PRs; stop if two remain unmerged.
2. Independently validate changed-file allowlist and risk classification, exact base/head SHA, required GitHub status checks, unit tests, browser E2E, progress persistence, learning correctness and (when applicable) preview smoke tests. Unknown/NOT RUN is not PASS.
3. Merge only via a narrowly scoped trusted workflow after all checks and branch protection pass. Never give an untrusted PR workflow write credentials or deployment secrets.
4. Production release requires an independently verified deployment gate, an exact commit and target project/environment, a working rollback target, and post-deploy smoke tests. Automatic release is **disabled** until these gates are implemented, exercised in a non-production rehearsal and recorded as PASS. Existing Vercel Git integration may deploy automatically on main; therefore no automated main merges before production gates are verified.
5. At most three **meaningfully different** repair attempts per failure; then stop the affected task. Do not mask failures by skipping tests, weakening checks or deleting stored progress.
6. Fail closed on missing permission, stale SHA, unavailable agent, missing CI or preview evidence, budget uncertainty, conflicting active work, unexpected files, security alerts, or missing rollback proof. Alert with issue/PR link, exact SHA, failure evidence and one recommended next action. Do not repeatedly notify for an unchanged state.
7. No agent is claimed to run continuously unless an actual scheduler, credentials, execution logs and notifications are verified. Maintain audit records of each action and the specific owner authorization.

### Activation stages

- **Stage 0 (current):** policy proposal and read-only audit checks; no automatic code authoring, merge or deploy.
- **Stage 1:** connected coding agent and issue queue, PR creation, protected CI, independent QA and exception alerts; require proof of working execution.
- **Stage 2:** guarded low-risk auto-merge, only after branch protections, Vercel deployment behavior and end-to-end release gates have been verified.
- **Stage 3:** guarded low-risk auto-deploy with verified rollback and post-release monitoring; high-risk work always stops for approval.

## Operating roles and cadence
- CEO: product direction, budget, high-impact decisions, production deployment approval.
- Engineering Lead (weekdays 09/11/13/15/17 KST): inspect state, continue one approved work item, isolated branch + reviewable PR and evidence, no production action.
- Chief of Staff (weekdays 09/12/15/18 KST): independently inspect records and report meaningful changes, risks, one recommendation, and CEO decisions; **report-only**.
- Product & UX / Learning & Game / Market & Growth / Funding & Business / Quality & Security: specialist review domains, NOT independent running workers unless separate execution evidence exists.

## Hard operational limits
1. One active autonomous development item at a time.
2. If two or more **automation-generated** unmerged PRs exist, do not create another. Focus on validation/consolidation.
3. Main write, merge and production deployment are allowed without per-change approval only after the expanded-autonomy gates above are activated and pass for an eligible low-risk change. Destructive storage changes, credential/permissions alteration, paid commitments and contracts still require explicit owner approval.
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
