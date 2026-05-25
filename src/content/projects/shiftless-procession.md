---
title: "Shiftless Procession"
slug: "shiftless-procession"
type: "Moddable voxel engine"
status: "In progress"
summary: "An in-progress moddable voxel engine built around content packages, procedural chunk generation, asynchronous loading and meshing, Clockwork graphics, custom UI, and runtime debugging tools."
stack: ["C#", ".NET", "Clockwork", "Voxel systems", "Chunk meshing", "Procedural generation"]
logo: "img/shiftless/logo.png"
featured: true
navLabel: "Shiftless Procession"
order: 2
---

## Overview

Shiftless Procession is an in-progress moddable voxel engine. The project explores the structure behind a voxel world: content packages, registered blocks and biomes, procedural generation, chunk loading, mesh generation, rendering, scenes, input, UI, and debugging.

The strongest part of the project is the system design. It is built as more than a single demo scene: the runtime has separate areas for content bootstrap, world storage, generation, scheduling, rendering, UI, language assets, entities, and core gameplay content.

## Architecture

The project is split into a runtime project and a built-in content package.

- `Shiftless.Procession` owns the executable runtime, rendering, world systems, scheduling, scenes, UI, input, debugging, content loading, and engine-facing APIs.
- `Shiftless.Procession.Core` is the built-in content package. It supplies blocks, biomes, terrain features, entities, world types, generator settings, language files, and texture assets.
- `Shiftless.Procession.Host` and `Shiftless.Procession.Launcher` provide host/launcher infrastructure in the broader workspace shape.

This package split matters because it keeps engine infrastructure separate from content definitions. Blocks, biomes, world types, and assets are treated as registered content rather than hardcoded directly into every subsystem.

## Content and bootstrap model

The content model is based around package discovery, dependency resolution, registry creation, item registration, asset loading, and final sealing.

The main bootstrap flow is organized into stages such as discovering packages, resolving dependencies, registering asset types, creating registries, registering items, loading assets, finalizing, and sealing the runtime view.

This demonstrates an important engine idea: content should be loaded into a structured runtime model before gameplay systems depend on it.

## World generation and chunk loading

The world side uses procedural terrain generation, chunk demand tracking, asynchronous jobs, and renderer-side mesh queues.

The flow is roughly:

- load sources request nearby chunks,
- terrain shape jobs build cached terrain shape data,
- voxelization jobs fill chunk storage,
- loaded chunks trigger mesh jobs,
- mesh data is uploaded by the renderer,
- the world renderer draws visible chunks around the camera.

The project includes concepts such as chunk managers, load-source tracking, shape storage, palettized block storage, sparse-brick containers, subchunk builders, terrain pipelines, and biome/feature definitions.

## Rendering and UI

Rendering is built on Clockwork graphics. The renderer owns camera state, world drawing, sky rendering, chunk mesh upload, debug line rendering, UI rendering, text rendering, and shader outputs.

The UI side includes custom elements, layers, menus, debug overlays, console support, text fields, panels, buttons, images, and player-facing overlays. The project also includes language files and block texture assets, which makes it feel closer to a real runtime than a single isolated graphics test.

## What it demonstrates

- Designing a C# voxel runtime with separated engine and content package responsibilities.
- Building asynchronous chunk generation and mesh scheduling concepts.
- Thinking through block registries, biome registries, world types, assets, and content bootstrap stages.
- Connecting procedural generation, chunk storage, rendering, UI, input, and debug tools.
- Working with graphics-oriented runtime constraints such as shader compilation, chunk mesh upload, frustum culling, and render-distance-driven chunk iteration.

## Models

A small WebGL model viewer for imported model data from Shiftless Procession. It shows models exported from the game, with cube-style block models currently implemented first.
