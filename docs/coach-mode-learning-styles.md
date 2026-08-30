# Coach mode learning styles

Coach modes change guidance style, not grading, rewards, curriculum order, or lesson difficulty data.

| Mode | Lesson behavior |
| --- | --- |
| Focus | Keeps extra coach guidance minimal; existing learning metadata can still appear. |
| Dancing | Uses playful one-line guidance and lighter hint wording. |
| Study | Prioritizes concept-oriented guidance and concept-hint wording. |
| Cheer | Uses low-pressure encouragement before answering. |
| Challenge | Encourages a hint-free first attempt while keeping hints available. |
| Debug | Uses cause-tracing guidance, with specific wording for bug-hunt and code-writing exercises. |

## Guardrails

- `v413-lesson.js` remains the sole canonical Lesson DOM owner.
- `MeowCoachMode.current()` is read-only from the Lesson surface.
- The existing `meowde-v443-coach-mode` selection key remains the only coach-mode persistence key.
- No coach style can change correctness evaluation, XP, Churu, mistake recording, retry queues, Smart Review, lesson progress, or completion rewards.
- Only one pre-answer auxiliary line is rendered. Existing learning metadata and mode guidance are prioritized so they do not stack into multiple coach lines.
