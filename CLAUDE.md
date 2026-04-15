# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project
*Peri Phōnēs* — an interactive scholarly web interface visualising 
Galen's anatomical and physiological theory of voice production 
(*φωνή*). Based on Gideon Manelis, "*Peri Phōnēs*: Galen's Anatomical 
and Physiological Understanding of Voice Production" (MA thesis, 
Classics, Hebrew University of Jerusalem, 2025; advisor: Prof. Orly Lewis).

The interface synthesises evidence dispersed across the Galenic corpus — 
principally *De Anatomicis Administrationibus* (Books XI and XIV, 
surviving in Arabic), *De usu partium* VII, *De Placitis Hippocratis et Platonis*, and the Latin adaptation of the lost *Περὶ Φωνής* — to 
reconstruct a unified model of phonation centred on the glōttis, 
laryngeal musculature, and the transformation of ἐκφύσησις into voice.

## Scholarly conventions
- Greek terms in Unicode (e.g. ἐκφύσησις, glōttis, φωνή), not 
  transliteration, except where transliteration aids readability
- Ancient works cited by standard abbreviation (AA, UP, PHP, DV)
- Primary sources take precedence; secondary literature is 
  contextualising, not foundational
- Anatomical terminology follows Galen's own, not modern equivalents, 
  unless explicitly comparing the two The project has **two parallel implementations**:

1. **`index.html`** — Standalone single-file app using Babel Standalone for in-browser JSX compilation. No build step; served via any HTTP server. This is the portable/distributable version.
2. **`phonation-app/`** — Vite/React/TypeScript version for active development.

## Development Commands

All commands run from `phonation-app/`:

```bash
cd phonation-app
npm install       # install dependencies
npm run dev       # start dev server (Vite)
npm run build     # tsc + vite build
npm run preview   # preview production build
```

To run the standalone `index.html` (requires a server due to CORS):
```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

## Architecture

### State Management (`src/store/index.ts`)
Single Zustand store with three state values:
- `activeSection`: `'intro' | 'larynx' | 'pneuma' | 'analysis'` — controls which narrative script is loaded
- `currentStepIndex`: index into the active section's script array
- `activeTerm`: key into `GLOSSARY` for the currently open glossary popup

### Data Layer (`src/data/constants.ts`)
All content lives here as exported constants:
- `GLOSSARY`: `Record<string, GlossaryEntry>` — medical/Greek terms with definitions and Atlomy lexicon URLs
- `SCRIPT_LARYNX`, `SCRIPT_PNEUMA`, `SCRIPT_ANALYSIS`: arrays of `Step` objects for each section

The `Step` type (defined in `src/data/constants.ts`) supports `media: 'image' | 'video' | 'schematic' | 'none'` with optional `mediaUrl`, `timeRange`, `greek`, and `reference` fields.

### Layout (`src/App.tsx`)
Split-pane layout: left 2/5 = `NarrativePanel` (text), right 3/5 = `MediaViewer` (image/video/schematic). `Navigation` sits above; `GlossaryCard` and `UrlSync` are overlays.

### Content Rendering
`NarrativePanel` renders step content using a custom inline parser (not react-markdown) that recognizes `<TermKey>display text</TermKey>` tags in content strings and converts them into clickable `TermLink` buttons that trigger the glossary popup.

### Media Display (`src/components/MediaViewer.tsx`)
Switches between image, video (with `timeRange` loop support via `requestAnimationFrame`), and `PneumaVisualizer` (SVG schematic) based on the current step's `media` field.

### Static Assets
Media files (`reference/`) are served from the project root for `index.html` and from `phonation-app/public/reference/` for the Vite app.

## Adding Content

To add a new narrative step: add a `Step` object to the appropriate script array in `src/data/constants.ts`. To add a glossary term: add an entry to `GLOSSARY` and use `<TermKey>text</TermKey>` syntax in step content strings.
