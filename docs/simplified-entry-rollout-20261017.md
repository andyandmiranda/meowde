# MEOWDE simplification: verified state and safe rollout (2026-10-17)

## Confirmed from current code
- Python is served from `index.html`; it uses the existing localStorage key `meowde-v410-state`.
- Python's `renderHome()` already determines whether there is an in-progress lesson and uses `resumeLesson()` or `startLesson(...)` for its main action. Do **not** replace that logic with an unconditional link.
- Linux currently has a separate `linux-home.html` with multiple secondary links and its own guided progress scripts.
- The new `simple-start.html` is an **isolated static prototype**, not the live home; its Python link opens the old home, not a direct lesson.
- There is no evidence yet of a unified, safe cross-subject resume state. Do not infer the last-used subject from Python's localStorage key or overwrite Linux progress.

## Product decision
Target a single primary CTA that resumes the user's **actual last active subject and lesson**, with an accessible fallback for new users. Keep subject switching and course map as secondary affordances. Avoid duplicate overview cards, redundant subject selectors, and separate mode selection on every launch.

## Implementation sequence / gates
1. Inventory Python and Linux persisted progress schemas and their restore paths. Record fixtures for new user, Python-in-progress, Linux-in-progress, both subjects, malformed data, and browser with storage disabled.
2. Build a read-only progress adapter with a **versioned, non-destructive** last-active-subject preference. On ambiguity or invalid data, show a neutral choice instead of guessing.
3. Introduce one primary CTA on a feature-flagged entry; its target must be verified to reach the correct in-progress question. Never mutate XP or progress just by visiting the home.
4. Collapse secondary destinations into one accessible disclosure or exploration section. Retain original routes as direct links and preserve brand visual language.
5. Verify Chromium + WebKit, 320/390/768px, keyboard/screen reader semantics, cross-subject switching, resume correctness, corrupt storage, XP invariants, and real iPhone Safari.
6. Test with novice users: first-action time, wrong-navigation rate, perceived complexity, and learning continuation. Compare to existing home before switching the default entry.

## Release policy
PR #92 stays Draft and stacked on PR #91; PR #91 is stacked on PR #85. Do not merge to main or deploy Production without CEO approval. October 23 is a *conditional* stable-web release target, not a deadline to force unverified IA migration.
