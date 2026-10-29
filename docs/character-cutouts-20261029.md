# Character cutout repair — 2026-10-29

The six v451 images had transparent outer margins but retained large rectangular/polygonal wall/floor fragments behind their subjects. All original files remain in git and on disk. New production UI references use `assets/characters/v452-cutouts/meowde-{coding,music,reading,happy,challenge,debug}.webp`.

Built-in image editing was used, one original edit target per asset, with true transparent output. Outputs were visually inspected, then encoded as WebP at quality 88 with alpha retained. These are model-derived cutouts, not a claim of pixel-identical extraction. The same pose/expression/accessory roles are retained; small drawn details may differ.

## Prompt set
Common: Background extraction of the provided MEOWDE asset. Preserve the original kitten identity, face, fur colours, pose, expression, proportions, accessories and illustration style as closely as possible. True RGBA transparency; remove backdrop, rectangles, polygon fragments, floor, glow and floating symbols. Keep the whole subject and retained props inside the square canvas. No redesign, text, watermark, frame or pedestal.

- coding: retain kitten, purple headphones, laptop and notebook; remove desk surface and wall.
- music: retain happy kitten, headphones, phone, purple speakers and drink; remove wall/floor and floating notes.
- reading: retain kitten, glasses, open book, lamp, stacked books and cup; remove desk surface and room.
- happy: retain cheerful kitten with raised paws and tail; remove confetti and stars.
- challenge: retain kitten in purple hoodie, raised paw and tail; remove stars and scene.
- debug: retain kitten, magnifying glass and purple laptop; remove room and code symbols.

## Verification and boundaries
- Six encoded assets have RGBA transparency, alpha range 0–255 and corner alpha at most 1/255. Each output was visually inspected for background fragments.
- JS syntax, direct character rendering validator and diff whitespace check PASS.
- Existing six character IDs, saved preferences, coaching modes, lesson content and grading are unchanged.
- Home's approved headphones SVG remains restored; loading uses the corrected reading image.
- New paths are added to offline precache; old image paths remain available. Main and Production unchanged.
