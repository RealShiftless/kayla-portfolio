---
title: "Clockwork UI"
slug: "clockwork-ui"
type: "Retained UI"
status: "In progress"
summary: "A retained UI layer with views, layers, controls, layout, input routing, XML loading, and renderer-backed text/background drawing."
stack: ["C#", "Retained UI", "XML", "Layout", "Bindings"]
featured: true
navLabel: "UI system"
parent: "Clockwork"
order: 2
---

## What it is

Clockwork UI is a retained interface layer built on top of Clockwork's graphics abstractions. It owns UI views, layers, controls, fields, layout, input routing, pointer capture, popups, and rendering integration.

It also has XML view loading through a Clockwork-owned XAML-like subset, with explicit bindings such as `{Binding settings.Volume}`. The goal is to make UI prototypes and editor-style panels easier to define without hard-coding every tree by hand.

## Technical focus

- Retained element trees with layout, children, visuals, and input hooks.
- Layout primitives such as stack, grid, and scroll panels.
- Value controls and explicit binding models.
- XML loading that builds UI trees while code still owns behavior.
- Renderer boundaries between UI structure, text, textures, and graphics commands.

## Current limits

The system is still intentionally simple. There is no full style system, templates, commands, data-context inheritance, text selection, clipboard, or IME support yet.
