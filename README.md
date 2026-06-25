# ARE Helper

A gamified, installable study app for all six NCARB ARE 5.0 exam divisions:
Practice Management (PcM), Project Management (PjM), Programming & Analysis (PA),
Project Planning & Design (PPD), Project Development & Documentation (PDD), and
Construction & Evaluation (CE).

All practice questions are original content written from NCARB's publicly
published ARE 5.0 exam content outlines and general public-domain
architecture/professional-practice knowledge. This project is **not affiliated
with or endorsed by NCARB, AIA, Amber Book, or Black Spectacles**, and contains
no proprietary or copyrighted exam questions.

## Features

- 4 question formats modeled on the real exam: single-select, multi-select
  ("check all that apply"), numeric fill-in, and hotspot (click a point on an
  original SVG diagram)
- A no-repeat "deck" per division that shuffles through every question once
  before reshuffling, so practice never feels repetitive
- XP, levels, streaks, and badges to make repetition-based studying feel like
  a game instead of a chore
- Per-division stats, full answer history, and a stateless Exam Simulation
  mode for timed practice runs
- Installable on iOS via Safari's "Add to Home Screen" (and as a standard PWA
  elsewhere) - works fully offline once installed

## Stack

Vite + React + TypeScript + Tailwind CSS v4 + react-router-dom + zustand
(persisted to `localStorage`) + vite-plugin-pwa.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages. In the repository's Settings → Pages,
set the source to **GitHub Actions**.

## Content

Question banks live in `src/content/questions/*.json`, one file per
division, conforming to the schema in `src/content/types.ts`. Hotspot
questions reference named, pre-defined regions in
`src/content/diagrams/points.ts` so click targets always line up with what's
drawn on the corresponding SVG diagram.
