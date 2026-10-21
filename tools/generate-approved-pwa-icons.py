#!/usr/bin/env python3
"""Generate NEW MEOWDE PNG install icons from the existing approved SVG artwork."""
import base64
import io
import re
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
approved = (ROOT / "assets/meowde-approved-base.svg").read_text()
match = re.search(r'data:image/webp;base64,([^"]+)', approved)
if not match:
    raise SystemExit("Approved character art not found")
original = Image.open(io.BytesIO(base64.b64decode(match.group(1)))).convert("RGBA")
assert original.size == (124, 174), original.size

def render(size, maskable=False):
    scale = size / 512
    im = Image.new("RGBA", (size, size), "#53C7A0" if maskable else "#FFF9EF")
    draw = ImageDraw.Draw(im)
    if maskable:
        draw.ellipse(tuple(round(x * scale) for x in (54, 54, 458, 458)), fill="#FFF9EF")
        x, y, width = 130, 131, 252
    else:
        draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=round(118 * scale), fill="#FFF9EF")
        draw.ellipse(tuple(round(x * scale) for x in (37, 37, 475, 475)), fill="#53C7A0")
        x, y, width = 89, 91, 334
    # Match the existing approved SVG's 124:112 viewport, preserving the head framing.
    frame = original.crop((0, 0, 124, 112))
    frame = frame.resize((round(width * scale), round(width * scale)), Image.Resampling.LANCZOS)
    im.alpha_composite(frame, (round(x * scale), round(y * scale)))
    return im.convert("RGB")

outputs = [
    ("meowde-approved-192.png", 192, False),
    ("meowde-approved-512.png", 512, False),
    ("meowde-approved-maskable-192.png", 192, True),
    ("meowde-approved-maskable-512.png", 512, True),
    ("meowde-approved-touch-180.png", 180, False),
]
for filename, size, maskable in outputs:
    target = ROOT / "icons" / filename
    render(size, maskable).save(target, "PNG", optimize=True)
    with Image.open(target) as check:
        assert check.format == "PNG" and check.size == (size, size)
    print(f"Generated {target.relative_to(ROOT)}")
