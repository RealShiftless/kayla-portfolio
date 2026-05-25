---
title: "Clockwork Runtime"
slug: "clockwork-runtime"
type: "Runtime architecture"
status: "In progress"
summary: "A service-composition runtime layer over the graphics host, designed around explicit services, bootstrap contributors, and frame contributors."
stack: ["C#", ".NET", "Services", "Frame graph", "Architecture"]
featured: false
navLabel: "Runtime"
parent: "Clockwork"
order: 3
---

## What it is

Clockwork Runtime is the service-composition layer over the graphics host. It does not try to own every engine concern. Instead, runtime services contribute work into host-owned bootstrap and frame graphs.

This keeps the runtime smaller and makes optional systems explicit. Registration, resources, content modules, asset loading, editor metadata, and input bindings stay outside the core unless they are deliberately added.

## Technical focus

- `IRuntimeService` lifecycle management.
- Unique service keys and concrete service registration.
- Bootstrap and frame graph contributors.
- Reverse-order disposal and GPU-owning service shutdown rules.
- Keeping optional systems out of the runtime core.
