# *Peri Phōnēs* — Galen's Phonatory System

![Interface screenshot](reference/main_page_photo.png)

An interactive scholarly web interface visualising Galen's anatomical and physiological theory of voice production (*φωνή*). Based on Gideon Manelis, "*Peri Phōnēs*: Galen's Anatomical and Physiological Understanding of Voice Production" (MA thesis, Classics, Hebrew University of Jerusalem, 2025; advisor: Prof. Orly Lewis).

The interface synthesises evidence from the Galenic corpus — principally *De Anatomicis Administrationibus* (Books XI and XIV, surviving in Arabic), *De usu partium* VII, *De Placitis Hippocratis et Platonis*, and the Latin adaptation of the lost *Περὶ Φωνής* — to reconstruct a unified model of phonation centred on the glōttis, laryngeal musculature, and the transformation of ἐκφύσησις into voice.

---

## Running Locally

The entire interface is a single file: **`index.html`**. A local HTTP server is required (CORS blocks direct `file://` access):

```bash
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

No build step, no dependencies to install.

---

## Features

- **Step-by-step narrative** — a guided tour through Galen's physiological model across three sections: Anatomy, Pneuma & Voice, and Textual Analysis
- **Anatomical glossary** — clickable Greek and medical terms open a popup with definitions and links to the [ATLOMY](https://www.atlomy.com) lexicon
- **Bibliography** — a sidebar button opens a modal listing all primary and secondary sources cited in the interface, with full references formatted to thesis standards
- **Pneuma Visualizer** — an SVG schematic animation tracing the path of *pneuma* from the brain (*hēgemonikon*) through the nerves, trachea, and larynx to the moment of *plēgē* (strike) and *phōnē* (voice)
- **Video and image media** — time-range-looped animations and anatomical illustrations, synchronised to the narrative
- **Dark mode** — toggleable via the navigation sidebar
- **Shareable URLs** — section and step are encoded in the URL query string
- **Keyboard navigation** — arrow keys advance or retreat through steps

---

## Project Structure

```
phonation_interface/
├── index.html                  # The entire interface — single self-contained file
├── reference/                  # Static assets: images, video, thesis text
├── user_guide.md               # End-user guide
├── CLAUDE.md                   # Developer guidance for Claude Code
└── phonation-app-archive.zip   # Archived Vite/TypeScript version (no longer maintained)
```

---

## Content Map

| Section | Steps | Media |
|---|---|---|
| **Anatomy** | 7 | Images, video |
| **Pneuma & Voice** | 7 | SVG schematic (PneumaVisualizer) |
| **Textual Analysis** | 10 | Images, video |

---

## Editing Content

All content lives in the `<script type="text/babel">` block of `index.html`.

**Add a narrative step** — append a step object to `SCRIPT_LARYNX`, `SCRIPT_PNEUMA`, or `SCRIPT_ANALYSIS`:

```js
{
    id: 'unique_id',
    title: 'Step Title',
    content: 'Narrative text. Use <TermKey>display text</TermKey> for glossary links.',
    media: 'image',           // 'image' | 'video' | 'schematic' | 'none'
    mediaUrl: 'reference/filename.png',
    reference: 'Galen, UP VII.8',
    greek: 'Optional Greek passage (shown in Textual Analysis section).',
}
```

**Add a glossary term** — add an entry to the `GLOSSARY` object, then reference it with `<TermKey>text</TermKey>` in any step's `content`.

**Add a bibliography entry** — add to the `primarySources` or `secondarySources` arrays inside the `BibliographyCard` component.

---

## Technologies

- **React 18** with Babel Standalone (in-browser JSX compilation — no build step)
- **Zustand** — state management
- **Tailwind CSS** — styling via CDN

---

## Scholarly Conventions

- Greek terms in Unicode (e.g. ἐκφύσησις, glōttis, φωνή), not transliteration, except where transliteration aids readability
- Ancient works cited by standard abbreviation: AA (*De Anatomicis Administrationibus*), UP (*De usu partium*), PHP (*De Placitis Hippocratis et Platonis*), DV (*De Voce*)
- Anatomical terminology follows Galen's own, not modern equivalents, unless explicitly comparing the two

---

## License

[To be added]
