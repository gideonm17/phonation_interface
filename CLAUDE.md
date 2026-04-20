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
  unless explicitly comparing the two

## The product

The entire interface is **`index.html`** — a single self-contained file
using Babel Standalone for in-browser JSX compilation and Zustand for
state management. No build step is required. Serve it with any HTTP
server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

> A Vite/React/TypeScript version previously existed in `phonation-app/`
> and has been archived as `phonation-app-archive.zip`. It is no longer
> maintained. All development happens in `index.html`.

## Architecture (inside `index.html`)

All code lives in a single `<script type="text/babel">` block.

### State (Zustand store)
- `activeSection`: `'intro' | 'larynx' | 'pneuma' | 'analysis'`
- `currentStepIndex`: index into the active section's script array
- `activeTerm`: key into `GLOSSARY` for the open glossary popup
- `showBibliography`: boolean — controls the bibliography modal
- `glossaryOpen`: boolean — controls the full glossary browser panel
- `darkMode`: boolean — persisted to `localStorage`
- `greekVisible`: boolean — show/hide Greek passages in Analysis section

### Data
All content is defined as JavaScript constants near the top of the script block:
- `GLOSSARY`: object of `{ greek, term, def, url? }` entries
- `SCRIPT_LARYNX`, `SCRIPT_PNEUMA`, `SCRIPT_ANALYSIS`: arrays of step objects

Each step supports: `id`, `title`, `content`, `media` (`'image' | 'video' | 'schematic' | 'none'`), `mediaUrl`, `timeRange`, `greek`, `reference`.

### Components
| Component | Role |
|---|---|
| `Navigation` | Sidebar with section buttons, glossary toggle, bibliography button, dark mode toggle |
| `NarrativePanel` | Scrolling step list; parses `<TermKey>text</TermKey>` into clickable glossary links |
| `MediaViewer` | Switches between image, looping video, and `PneumaVisualizer` |
| `PneumaVisualizer` | SVG schematic animation of the phonation process |
| `GlossaryCard` | Modal popup for individual glossary term definitions |
| `GlossaryBrowser` | Full glossary panel (replaces narrative panel when open) |
| `BibliographyCard` | Modal popup listing all primary and secondary sources cited |
| `UrlSync` | Bidirectional URL ↔ state sync |

### Content syntax
Use `<TermKey>display text</TermKey>` in any step's `content` string to
create a clickable glossary link. The key must exactly match an entry in
`GLOSSARY`. Unrecognised keys render as plain text.

## Adding content

**New narrative step:** add a step object to the appropriate script array
(`SCRIPT_LARYNX`, `SCRIPT_PNEUMA`, or `SCRIPT_ANALYSIS`) inside the
script block of `index.html`.

**New glossary term:** add an entry to the `GLOSSARY` object, then use
`<TermKey>text</TermKey>` in step content.

**New bibliography entry:** add to the `primarySources` or
`secondarySources` arrays inside the `BibliographyCard` component.

## Static assets

Media files are served from `reference/` at the project root.
`mediaUrl` values in step objects are relative to this root
(e.g. `"reference/glottis_illustration(1).png"`).
