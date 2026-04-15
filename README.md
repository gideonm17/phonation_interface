# *Peri Phōnēs* — Galen's Phonatory System

![Interface screenshot](reference/main_page_photo.png)

An interactive scholarly web interface visualising Galen's anatomical and physiological theory of voice production (*φωνή*). Based on Gideon Manelis, "*Peri Phōnēs*: Galen's Anatomical and Physiological Understanding of Voice Production" (MA thesis, Classics, Hebrew University of Jerusalem, 2025; advisor: Prof. Orly Lewis).

The interface synthesises evidence from the Galenic corpus — principally *De Anatomicis Administrationibus* (Books XI and XIV, surviving in Arabic), *De usu partium* VII, *De Placitis Hippocratis et Platonis*, and the Latin adaptation of the lost *Περὶ Φωνής* — to reconstruct a unified model of phonation centred on the glōttis, laryngeal musculature, and the transformation of ἐκφύσησις into voice.

---

## Features

- **Step-by-step narrative** — a guided tour through Galen's physiological model across three sections: Anatomy, Pneuma & Voice, and Textual Analysis
- **Anatomical glossary** — clickable Greek and medical terms open a popup with definitions and links to the [ATLOMY](https://www.atlomy.com) lexicon
- **Pneuma Visualizer** — an SVG schematic animation tracing the path of *pneuma* from the brain (*hēgemonikon*) through the nerves, trachea, and larynx to the moment of *plēgē* (strike) and *phōnē* (voice)
- **Video and image media** — time-range-looped animations and anatomical illustrations from the ATLOMY project, synchronised to the narrative
- **Shareable URLs** — section and step are encoded in the URL query string; copying the address shares your exact position in the interface
- **Keyboard navigation** — arrow keys advance or retreat through steps within a section

---

## Two Implementations

The project ships in two forms that share the same content:

| | `index.html` | `phonation-app/` |
|---|---|---|
| **Purpose** | Portable, distributable | Active development |
| **Build step** | None | Vite + TypeScript |
| **Dependencies** | Loaded via CDN at runtime | Installed via npm |
| **Served** | Any HTTP server | `npm run dev` |

---

## Running Locally

### Standalone (`index.html`)

A local HTTP server is required (CORS blocks direct `file://` access):

```bash
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

### Vite App (`phonation-app/`)

```bash
cd phonation-app
npm install
npm run dev        # development server with hot reload
npm run build      # tsc + Vite production build
npm run preview    # preview production build
npm run sync       # sync glossary.json → index.html
```

---

## Project Structure

```
phonation_interface/
├── index.html              # Standalone single-file app (Babel Standalone)
├── user_guide.md           # End-user guide
├── reference/              # Static assets: images and videos
├── scripts/
│   └── sync-glossary.js    # Syncs glossary.json → index.html
└── phonation-app/
    ├── src/
    │   ├── App.tsx
    │   ├── store/index.ts          # Zustand state (activeSection, currentStepIndex, activeTerm)
    │   ├── data/
    │   │   ├── constants.ts        # All content: GLOSSARY, SCRIPT_LARYNX/PNEUMA/ANALYSIS
    │   │   └── glossary.json       # Single source of truth for glossary terms
    │   └── components/
    │       ├── NarrativePanel.tsx  # Scrolling step list with TermLink parser
    │       ├── MediaViewer.tsx     # Image / video / PneumaVisualizer switcher
    │       ├── PneumaVisualizer.tsx# SVG schematic animation
    │       ├── GlossaryCard.tsx    # Modal popup for glossary entries
    │       ├── Navigation.tsx      # Section switcher sidebar
    │       └── UrlSync.tsx         # Bidirectional URL ↔ state sync
    └── public/
        └── reference/              # Static assets for Vite app
```

---

## Content Editing

### Adding a narrative step

Add a `Step` object to the appropriate array in `phonation-app/src/data/constants.ts`:

```ts
{
    id: 'unique_id',
    title: 'Step Title',
    content: 'Narrative text. Use <TermKey>display text</TermKey> for glossary links.',
    media: 'image',          // 'image' | 'video' | 'schematic' | 'none'
    mediaUrl: 'reference/filename.png',
    reference: 'Galen, UP VII.8',
    greek: 'Optional Greek passage for the Analysis section.',
}
```

### Adding a glossary term

1. Add an entry to `phonation-app/src/data/glossary.json`
2. Run `npm run sync` from `phonation-app/` to propagate the change to `index.html`
3. Use `<TermKey>display text</TermKey>` in any step's `content` field to create a clickable link

---

## Technologies

- **React 18** with the new JSX transform
- **Zustand** — minimal state management
- **Tailwind CSS** — utility-first styling
- **Vite** — development server and build tool
- **Babel Standalone** — in-browser JSX compilation for `index.html`

---

## Scholarly Conventions

- Greek terms in Unicode (e.g. ἐκφύσησις, glōttis, φωνή), not transliteration, except where transliteration aids readability
- Ancient works cited by standard abbreviation: AA (*De Anatomicis Administrationibus*), UP (*De usu partium*), PHP (*De Placitis Hippocratis et Platonis*), DV (*De Voce*)
- Anatomical terminology follows Galen's own, not modern equivalents, unless explicitly comparing the two

---

## License

[To be added]
