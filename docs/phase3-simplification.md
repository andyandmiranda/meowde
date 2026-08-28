# Meowde Simplification Phase 3

## Goal
Separate learning navigation from companion/gamification surfaces.

## Learn
- Keep the existing lesson path and unit tabs.
- Do not inject unit summary cards, NOW tags, milestone icons, or reward CTAs into Map.
- Remove decorative trail stones, bushes, flags, companion marker, and continuous current-node pulsing.
- Preserve unit reward state; unclaimed completed-unit rewards surface in Meowde instead.

## Meowde
Canonical order:
1. Companion identity / learning record
2. Companion card
3. Growth
4. Achievement summary
5. Pending learning milestone reward, only when applicable
6. Seasonal event
7. Rare visitor, only when applicable
8. Seasonal collection, only when applicable

## Persistence
No localStorage key is deleted or renamed. Existing journey, achievement, growth, event, lesson, and reward data remain compatible.
