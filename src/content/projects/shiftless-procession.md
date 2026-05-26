---
title: "Procession"
slug: "procession"
type: "Moddable voxel game"
status: "In progress"
summary: "An in-progress factory-building voxel game built on Clockwork Runtime, focused on high-performance world systems, moddable game content, procedural generation, asynchronous chunk loading and meshing, Clockwork graphics/UI, and runtime debugging tools."
stack: ["C#", ".NET", "Clockwork", "Voxel game", "Chunk meshing", "Procedural generation"]
logo: "img/procession/logo.png"
startDate: "2026-02-10"
showcaseRank: 2
featured: true
navLabel: "Procession"
order: 2
---

## Overview

Procession is my in-progress factory-building voxel game. It is a moddable voxel game built to run on top of Clockwork Runtime and the broader Clockwork stack, so the game can focus on high-performance voxel world simulation, game content, procedural terrain, chunk loading, mesh generation, voxel rendering flow, UI screens, and debugging without every engine layer living directly inside the game project.

The strongest part of the project is the system design behind the game. Procession is built as more than a single demo scene: the game has clear boundaries for world storage, generation, chunk scheduling, language assets, entities, and gameplay-facing content, while Clockwork provides the reusable runtime, bootstrap/frame graphs, service composition, registration, resources, graphics, UI, presentation, and tooling foundation.

## Architecture

The project is split into game integration code and a built-in game/content package.

- `Shiftless.Procession` is the game/runtime integration namespace. It connects Procession-specific world systems, chunk scheduling, scenes, debugging, and game-facing APIs to Clockwork Runtime services, bootstrap/frame contribution, registration, resources, graphics, UI, and presentation.
- `Shiftless.Procession.Core` is the game/content package layered on top. It supplies blocks, biomes, terrain features, entities, world types, generator settings, language files, texture assets, and the early gameplay-facing content for Procession.
- `Shiftless.Procession.Host` and `Shiftless.Procession.Launcher` provide host/launcher infrastructure in the broader workspace shape.

This package split matters because it keeps game systems separate from content definitions while Clockwork owns the reusable infrastructure. Blocks, biomes, world types, and assets are treated as registered game content rather than hardcoded directly into every subsystem.

## Content and Clockwork integration

The Procession content model is designed to plug into Clockwork rather than replace it. Clockwork provides service composition, bootstrap/frame graph contribution, registration infrastructure, resource lifetime, UI, and presentation flow; Procession contributes game-specific packages, registries, world systems, and content definitions.

The game-side flow is still organized around package discovery, dependency resolution, item registration, asset loading, finalization, and a sealed runtime content view. The difference is that those steps are meant to sit on top of Clockwork's runtime services and registration/resource systems instead of becoming a separate general-purpose engine layer.

This is the core idea behind the content pipeline: gameplay systems depend on a structured runtime model instead of scattered setup code.

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

Rendering is built on Clockwork graphics. Procession uses the Clockwork stack for the reusable runtime, graphics, UI, text, resources, and presentation layers, while the game owns voxel-specific rendering flow such as camera state, world drawing, sky rendering, chunk mesh upload, debug line rendering, and shader outputs.

The UI side includes custom elements, layers, menus, debug overlays, console support, text fields, panels, buttons, images, and player-facing overlays. The project also includes language files and block texture assets, which makes it feel closer to a real runtime than a single isolated graphics test.

## Technical focus

- Designing a factory-building voxel game that uses Clockwork for runtime, bootstrap, registration, resources, graphics, UI, and presentation.
- Building asynchronous chunk generation and mesh scheduling concepts.
- Thinking through block registries, biome registries, world types, assets, and game content stages on top of Clockwork infrastructure.
- Connecting procedural generation, chunk storage, rendering, UI, input, debug tools, and gameplay-facing content.
- Working with graphics-oriented runtime constraints such as shader compilation, chunk mesh upload, frustum culling, and render-distance-driven chunk iteration.

## Models

A small WebGL model viewer for imported model data from Procession. It shows models exported from the game, with cube-style block models currently implemented first.
