---
title: "Block Stacker"
slug: "block-stacker"
type: "C / WinAPI game"
status: "Complete"
summary: "My first larger C project: a near feature-complete guideline-style block-stacking game built to learn C, raw WinAPI, software framebuffers, packed board storage, custom input handling, wall kicks, hold, ghost piece, scoring, levels, and a small pixel UI."
stack: ["C", "WinAPI", "Software framebuffer", "Bitpacked storage", "Game logic"]
github: "https://github.com/RealShiftless/Shiftless.BlockStacker"
startDate: "2025-07-10"
featured: true
navLabel: "Block Stacker"
order: 5
---

## Overview

Block Stacker is my first larger C project: a near feature-complete guideline-style block-stacking game built as a way to learn C and lower-level application structure. It uses raw WinAPI for the window and input layer, draws through a software framebuffer, and keeps the game logic in a compact custom runtime rather than relying on a game framework.

The project is small compared to Clockwork or Procession, but it shows a different side of my work: learning by building a complete interactive program close to the platform, with explicit control over rendering, timing, input, board storage, and gameplay rules.

## Architecture

The project is split into a small platform layer and the game implementation.

- `platform.c` owns the WinAPI window, message loop, keyboard events, timing, framebuffer presentation, debug output, and simple drawing helpers.
- `platform.h` exposes the platform API, framebuffer dimensions, callback types, and drawing functions.
- `main.c` owns the game state, board storage, tetromino data, input state, rotation logic, scoring, line clears, drawing, and screen states.
- `rng.c` and `rng.h` provide the random source used by the piece bag.
- `font8x8.h` provides the tiny bitmap font used by the pixel UI.

That split keeps platform concerns separate from gameplay. The game code can think in terms of board cells, piece state, input flags, and UI drawing while the platform layer handles the Windows-specific parts.

## Gameplay systems

The game includes most of the recognizable pieces of a guideline-style block-stacking implementation:

- 10x20 board.
- Tetromino set with rotation states.
- 7-bag randomizer.
- Hold piece.
- Ghost piece.
- Next piece preview.
- Soft drop and hard drop.
- DAS-style horizontal movement.
- Wall kick tables, including separate I-piece behavior.
- Line clears, scoring, levels, combo display, pause, main menu, and game-over states.

It is not described as fully guideline-compliant because details such as T-spin bonuses, exact lock-delay behavior, and every scoring edge case are not the focus of the current version.

## Rendering and storage

Rendering is done through a fixed-size software framebuffer. The platform layer presents that buffer to a WinAPI window using a DIB section and `StretchDIBits`, while the game draws rectangles and 8x8 bitmap-font text directly into pixel memory.

The board storage is packed: two board tiles are stored per byte, using four bits per tile. That keeps the board representation compact and makes cell access explicit through helper functions instead of using a larger object-heavy representation.

## Technical focus

- Building a complete C game loop with raw WinAPI, callbacks, timing, input, and software rendering.
- Learning C through a project that has real state, rendering, timing, input, and gameplay constraints.
- Implementing block-stacking rules such as 7-bag randomization, wall kicks, hold, ghost piece, line clears, scoring, and levels.
- Using compact bitpacked board storage rather than a larger per-cell structure.
- Keeping platform code, random number generation, drawing, game state, and gameplay rules in understandable modules.
- Working close to the framebuffer and windowing API instead of relying on an engine or UI framework.
