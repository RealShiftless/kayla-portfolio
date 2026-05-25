---
title: "KM-OS"
slug: "km-os"
type: "Embedded QML media-box shell"
status: "On hold"
summary: "An embedded Qt/QML media-box operating layer on top of Arch Linux, built around a C++ backend, QML shell UI, Wayland app surfaces, controller-friendly navigation, theming, settings, and app metadata."
stack: ["C++", "Qt 6", "QML", "Wayland", "Arch Linux", "CMake"]
featured: true
navLabel: "KM-OS"
order: 3
---

## Overview

KM-OS is an embedded QML solution for a media-box style operating layer on top of Arch Linux. It is not trying to replace the whole operating system; it sits above the Linux base as a focused home shell for launching media, browser, and system-facing applications.

The project combines a C++ backend with a QML interface. The backend owns system-facing managers and app orchestration, while the QML layer handles the home screen, overlays, settings pages, controller hints, and user-facing shell behavior.

## Architecture

The project is structured around a small set of backend managers exposed into QML:

- `AppManager` scans app manifests, launches external Wayland apps, tracks running apps, and supports future QML bundle apps.
- `GamepadManager` reads Linux joystick devices, watches for controller hot-plugging, and maps controller input into navigation events.
- `InputModeManager` tracks whether controller, pointer, or keyboard input is currently preferred.
- `InternetManager`, `SettingsManager`, `ThemeManager`, `BrowserController`, and `YoutubeController` provide system, settings, theme, and app-specific control surfaces.

This keeps the QML side focused on shell composition while the C++ side handles process launching, device input, persisted settings, networking state, and integration with the underlying system.

## App model

Apps are described with `app_info.json` files instead of being hardcoded into the home screen. Each app can define its id, display name, icon, type, priority, launch command, window behavior, and extra metadata such as browser URLs or cursor requirements.

The current app model includes external Wayland applications such as Brave, YouTube TV through a browser-based smart-TV shell, RetroArch through a nested Weston/kiosk setup, and a Weston terminal entry for system validation.

This makes the shell feel closer to a small app platform: the home UI can discover entries from metadata, sort them, show icons, launch them, and track their running state without every app needing special-case UI code.

## Shell and Wayland integration

KM-OS uses Qt Quick for the shell UI and Qt Wayland compositor functionality for hosting external app surfaces. The main QML scene acts as the shell layer, with app views, overlays, controller hints, system pages, and brightness/settings surfaces living around the active application.

External apps are launched with a dedicated `WAYLAND_DISPLAY`, so the shell can manage media-box style applications while still keeping the user experience inside one focused interface.

## Controller and settings UX

The interface is designed around media-box navigation rather than only desktop mouse input. It includes controller hints, a settings page with category navigation, an on-screen keyboard, confirmation dialogs, input-mode switching, and controller-aware focus behavior.

The settings area includes preferences and internet panels. Theme data is loaded from JSON files, so the visual system can change without rewriting the QML components.

## What it demonstrates

- Building a C++/Qt backend that exposes system managers into a QML shell.
- Designing a media-box operating layer on top of Arch Linux instead of a normal desktop app.
- Using app metadata to keep launcher behavior data-driven and extendable.
- Working with Wayland app surfaces, process launching, fullscreen shell behavior, and embedded-style UI constraints.
- Supporting controller-first navigation, input mode tracking, settings panels, themes, and on-screen text entry.
- Keeping platform integration, UI state, app metadata, and user-facing shell layout in separate parts of the project.

## Screenshot notes

TODO: add screenshots of the home shell, settings page, app launcher state, controller hints, theme variations, and one active app surface once final screenshots are selected.
