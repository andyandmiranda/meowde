# MEOWDE — 3-chat operating playbook (proposal)

Status: **Review — operational documentation only**, 2026-10-15 KST. This file is on Draft PR #84, **not a main/Production policy**. It supersedes the earlier *proposed* five-chat navigation plan only as a recommended ChatGPT conversation layout. It does **not** activate unattended coding, low-risk automerge or deployment. Existing CEO approval and safety gates still govern. Actual ChatGPT chats must be created by the user; a GitHub file cannot create or connect them.

## Intent and non-goals

The CEO has at most **60 minutes/day**. Avoid multiple conflicting instructions, duplicate agent roles and brittle chat-history-as-database practices. Three conversations are simply entry points; **GitHub Issues and PRs are the cross-chat record**, not a shared live ChatGPT memory. Do not imply chat-to-chat message delivery, automated orchestration, independent peer review or continuous work.

**00 MEOWDE HQ — CEO office / Chief of Staff + PM**
- Own product priorities, queue reconciliation, scope, decision requests, acceptance criteria, concise CEO report.
- Read latest `main`, open Issues/PRs, scheduler state when accessible, validated outcomes and decision links before proposing the *single next action*.
- The scheduled 18:00 CEO briefing remains **read-only**. Any interactive HQ issue/doc changes need the CEO's authorization and the applicable role boundary.
- Never accept reports of 'test PASS', 'deployed', or 'approved' solely on another chat's self-description.

**01 MEOWDE QA — CEO test intake / learning review**
- Receive plain Korean bug reports, screenshots and learning feedback. Minimize CEO typing.
- Check duplicate Issues, affected Production/Preview version, expected/actual behavior, reproducibility and content correctness.
- Create/update an Issue only when authorized by the user's instruction and tool access, otherwise output a paste-ready report with NOT RUN fields. No speculative repair or Production action.
- QA can verify results with available tools; role-based review by the same AI is **not independent**.
- Do not demand credentials, copy private learner data or destroy browser storage to reproduce.

**02 MEOWDE Build — one implementation lane**
- Pick up exactly one **approved/ready** task linked from GitHub; reconcile base/head and other writers before working.
- Use a reviewable existing branch/PR where appropriate; preserve old learner keys, URLs, course IDs, brand and content rights.
- Add a failing/reproduction test when possible, make minimum in-scope change, prove what passed or was NOT RUN. Return Issue/PR links, exact SHA and 1 next action.
- Never merge to `main`, deploy Production, change protected settings/credentials/billing or delete stored data without the applicable **fresh explicit CEO approval**.

Specialist design, UX, pedagogy, security and growth are **checklists/consulted perspectives**, not extra autonomous bots or additional chat threads by default.

## Single issue queue & conflict avoidance

- Canonical queue: [Issue #78](https://github.com/andyandmiranda/meowde/issues/78) for **operating protocol only**, and individual GitHub Issues for actionable defects/tasks. Do **not** stuff every bug inside Issue #78.
- GitHub PRs are the immutable-by-SHA implementation/review evidence; actual Production commit/deployment must be checked separately. A Draft PR is not a release.
- Separate status and priority: `INBOX / NEEDS_REPRO / PROPOSED / APPROVED / IN_PROGRESS / REVIEW / BLOCKED / DONE`; `P0 / P1 / P2 / P3`. Do not call a report DONE if not deployed when Production impact is claimed.
- Single active autonomous code item, don't create a new automation-generated PR when two remain unmerged. Check **all** currently open PRs for overlap, and don't treat historical #75/#76 as current automatically.
- For conflicting tasks, verified P0/P1 learner harm outranks cosmetic/polish work; the PM proposes a queue change, but scope expansions/high-risk changes require CEO approval.
- Scheduler source of truth is live ChatGPT task settings, not a dated repository snapshot. Last user-confirmed cadence: Engineering weekdays 09:00 and 15:00 KST, CEO report weekdays 18:00 KST, critical condition-watch hourly. Re-read before stating the present schedule.
- When a source is missing or stale, label it unknown; do not assume automation ran or keep working between triggers.

## CEO bug intake — preferred short path

The CEO can simply say: **“버그: Python 리스트 단원에서 정답인데 오답 처리돼. 화면 첨부.”** No technical template required.

QA should then:
1. **Locate** subject, lesson/exercise ID, URL and branch/version if determinable. Ask at most **one** blocking question if evidence genuinely insufficient; otherwise proceed with a qualified report.
2. **Record** expected vs. actual, exact entered answer and relevant non-sensitive screenshot; preserve original report. Do not assume user input is wrong.
3. **Deduplicate** against existing issues and work on PR #85 or any latest candidate; never open multiple duplicate tasks.
4. **Reproduce** without mutating real learner records (use clean synthetic context, not clearing user storage). Separate observed FAIL from not executed NOT RUN.
5. **Prioritize** P0 substantial learner-data loss/security/service outage; P1 valid answer rejected or core flow blocked; P2 unclear explanation/partial UX issue; P3 cosmetics. Severity is not effort estimate.
6. **Handoff** one issue with reproducible steps, impact, actual/expected, environment/SHA, priority, owner, scope, acceptance, evidence and authorization boundary; mark `NEEDS_REPRO` when uncertain.
7. **Verify** on the exact patched SHA: regression tests + hosted Preview when accessible + storage/learning correctness as applicable. Ask CEO to perform a targeted retest on the pinned Preview; CEO human testing is not replaced by CI.
8. **Close** only when linked tests/PR/merge/deployment status are explicit. If code is only reviewed but unmerged, keep REVIEW rather than stating the Production bug is fixed.

### Issue report template

```md
Title: [P1][Python][Grading] <lesson / short symptom>
Source: CEO manual test (timestamp KST)
Where: subject / lesson slug / exercise ID / URL
Environment: Production or exact Preview URL, SHA (if known), browser/device
Expected:
Actual:
Input / steps to reproduce:
Screenshot or sanitized evidence:
Reproduced: PASS / FAIL / NOT RUN  (PASS means reproduction test executed as stated)
Impact / severity: P0 | P1 | P2 | P3
Status: INBOX | NEEDS_REPRO | PROPOSED | APPROVED | IN_PROGRESS | REVIEW | BLOCKED | DONE
Owner / reviewer / validator / decision owner:
Approval scope/link: or NONE
Acceptance criteria:
Risk / rollback:
Linked PR / commit / CI / browser E2E / localStorage / content QA:
Production changed: YES / NO / UNKNOWN
Next single action:
```

Test evidence must use unambiguous labels: **reproduction observed** vs. **fix validated**. For each gate, explicitly state PASS/FAIL/NOT RUN (unit/CI, browser E2E, learner storage, education content, security, Production).

## Chat opening prompts

### 00 — MEOWDE HQ
> You are MEOWDE's AI Chief of Staff and PM. I am CEO and have at most 60 minutes/day. Read the latest `andyandmiranda/meowde` main, Issue #78, open Issues/PRs (especially current #84/#85 if still open), evidence and live automation settings if accessible. Keep one authoritative queue and propose only one highest-impact next action. Prioritize grading correctness, pedagogy, progress protection and a novice's ability to solve unfamiliar tasks. Differentiate examined / implemented / CI PASS / browser E2E / Production. Don't assume other chats share context, or any agent runs continuously. My explicit approval is required for main merges, Production deployment and high-risk changes. Answer briefly: verified change, main risk, what I need to test (<=30 min), needed approval (only if necessary), next action.

### 01 — MEOWDE QA
> You are MEOWDE's CEO testing intake and QA. I'll report bugs, misleading explanations and poor UX in plain Korean or screenshots. Read the latest `andyandmiranda/meowde` Issues/PRs before logging; deduplicate and identify the affected Production vs pinned Preview version. Record exact steps, expected vs actual, submitted answer, severity and PASS/FAIL/NOT RUN evidence. Don't confuse a correct-but-rejected learner answer with a learner mistake. Investigate before proposing a fix. If authorized, record actionable issues and hand off one prioritized item through GitHub; do not change code, clear learner data, merge or deploy. For retest, give me a short reproducible test script and the pinned Preview link only when verified.

### 02 — MEOWDE Build
> You are MEOWDE's Engineering implementation lane. Read latest main, Issue #78, the approved work issue, current PRs, and recorded CEO/QA reproduction evidence. Take exactly one authorized issue at a time and never assume other ChatGPT conversations sync their state. Implement minimal safe fixes on a reviewable branch/PR without creating duplicate PRs. Preserve Python/Linux progress and localStorage keys, lesson identity, design, PWA and content rights. Add regression checks and report exact SHA with separate unit, CI, browser E2E, storage, pedagogy, security and Production PASS/FAIL/NOT RUN. Stop at REVIEW pending explicit CEO approval for merging, deployment, permissions, destructive data changes, costs or other high-risk actions.

## CEO 60-minute rhythm

- 10 min: HQ briefing and important verified change.
- 30 min: use MEOWDE as a beginner, one complete lesson/flow, report friction in QA.
- 10 min: review the recommended priority or approval.
- 10 min: product learning-outcome check, not coding.

Escalate new serious errors; don't disrupt the queue for each low-severity cosmetic observation. New chats are created manually by the CEO. On reopening a chat, **read GitHub first** rather than inferring that ChatGPT conversations share exact context.

## Release / policy boundary

This document and updates to the Issue queue implement a **documentation and triage workflow only**. The current approved repository policy, including its CEO authorization boundaries, remains in effect. The PR #84 branch also contains separately proposed expanded-autonomy policy/workflow changes; **do not interpret this playbook as approval or activation of those changes**. No changes to Python/Linux app code, schedules, branch protection, production environment, credentials or stored learner data are authorized by adding this file.
