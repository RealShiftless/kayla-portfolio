---
title: "KM8"
slug: "km8"
type: "8-bit fantasy console"
status: "Pre-alpha"
summary: "A pre-alpha 8-bit fantasy console and emulator core written primarily in C, with a custom CPU and bus model, cartridge/ROM format, desktop emulator frontend, and C# assembler tooling."
stack: ["C", "CMake", "CPU emulation", "Memory bus", "C# assembler"]
github: "https://github.com/RealShiftless/km8"
startDate: "2025-07-11"
featured: true
navLabel: "KM8"
order: 6
---

## Overview

KM8 is a pre-alpha 8-bit fantasy console and emulator project. The core is written primarily in C and is structured as a modular library rather than only a single executable.

The project explores the pieces behind a small console runtime: a custom CPU model, memory bus, cartridge format, ROM loading, fixed-step execution, desktop frontend, ROM examples, and assembler/tooling work around the KM8 instruction set.

## Architecture

The repository is split into the emulator core, frontend, ROM examples, and toolchain.

- `include/km8` exposes the public C headers for the core context, CPU, cartridge, and ROM-facing API.
- `internal` contains private CPU, bus, and address-map definitions.
- `src` owns the C implementation for the CPU, bus dispatch, cartridge ROM/RAM, BIOS, WRAM, and core stepping.
- `emulator` provides a small desktop frontend with platform-specific Win32/Linux/stub layers and software-rendered debug output.
- `roms` contains small assembly/ROM examples used while bringing the system up.
- `tools/kasm` is a C# assembler project for the KM8 ISA and ROM project format.

The important shape is that KM8 is not just an emulator window. The core library, platform frontend, cartridge model, bus devices, and assembler tooling are separate pieces that can evolve independently.

## CPU and bus model

The CPU is organized as a fetch/decode/fetch-operands/execute state machine. Instructions are decoded from an opcode table, operands are fetched through the bus, and execution can return pending, success, or failure states.

The bus routes reads and writes through registered devices instead of hardcoding every address directly into the CPU. Devices provide local address translation, read/write behavior, and latency information, so memory access can participate in the timing model.

The memory map includes areas for BIOS, fixed and switchable ROM, WRAM, VRAM, external RAM, OAM, I/O, HRAM, and open bus space. Not every subsystem is complete yet, but the address-space boundaries and device model are part of the design.

## Cartridge and ROM flow

KM8 cartridges use a fixed header with magic bytes, ROM/RAM sizing, flags, and a short title. The cartridge loader validates the header and maps ROM/RAM data into the runtime model.

That cartridge layer gives the emulator a cleaner boundary: the frontend loads a ROM file, the cartridge loader validates it, and the bus exposes the ROM and optional RAM to the CPU through devices.

## Assembler tooling

`kasm` is a C# assembler/tooling project built around the KM8 instruction set. It loads a JSON project file, tokenizes assembly source, parses statements, tracks symbols, resolves values, and works from an instruction-set definition file.

This keeps the ISA and ROM authoring workflow connected to the emulator instead of treating test ROMs as hand-written binary blobs.

## Technical focus

- Designing a C emulator core with public headers and private internal subsystems.
- Building a CPU step model with explicit states, instruction buffers, halt codes, and execution results.
- Routing memory access through registered bus devices with address ranges and latency.
- Defining a cartridge/ROM format with validation, bank sizing, flags, and title metadata.
- Keeping the desktop frontend separate from the platform-agnostic core library.
- Building supporting assembler tooling in C# around tokenization, parsing, symbols, resolution, and JSON instruction-set data.
