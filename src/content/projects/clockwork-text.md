---
title: "Clockwork Text"
slug: "clockwork-text"
type: "Text rendering"
status: "In progress"
summary: "A renderer-neutral text layer for font loading, shaping, glyph rasterization, atlas placement, measurements, and UI rendering contracts."
stack: ["C#", "FreeType", "HarfBuzz", "Glyph atlas", "Text layout"]
featured: false
navLabel: "Text"
parent: "Clockwork"
order: 5
---

## What it is

Clockwork Text owns the font and glyph side of the UI/rendering stack. It loads fonts, shapes strings, rasterizes glyphs, packs glyph alpha into atlases, and exposes measurements and placements.

It deliberately does not own widgets, GPU upload, Vulkan/OpenGL details, font fallback, rich text, or SDF/MSDF. Those boundaries keep the text layer reusable for tools, tests, UI, and future renderers.

## Technical focus

- Font lifetime through `FontFace` and `ScaledFont`.
- HarfBuzz shaping and FreeType bitmap glyph rasterization.
- Glyph atlas placement and text measurements.
- Renderer-neutral contracts consumed by UI and graphics code.
