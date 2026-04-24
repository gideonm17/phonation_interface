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

- **Step-by-step narrative** — a guided tour through Galen's physiological model across three sections: Sequence of Phonation, Pneuma & Voice, and Textual Analysis
- **Anatomical glossary** — clickable Greek and medical terms open a popup with definitions and links to the [ATLOMY](https://www.atlomy.com) lexicon
- **Bibliography** — a sidebar button opens a modal listing all primary and secondary sources cited in the interface, with full references formatted to thesis standards
- **Pneuma Visualizer** — an SVG schematic animation tracing the path of *pneuma* from the brain (*hēgemonikon*) through the nerves, trachea, and larynx to the moment of *plēgē* (strike) and *phōnē* (voice)
- **Ekphysesis Diagram** — a detailed anatomical SVG diagram (stage 5) showing the full pathway of ἐκφύσησις from the lungs through the bronchi and trachea to the larynx, with all supporting structures labelled in Greek and English
- **Strike Animation** — a side-by-side animated SVG (stage 7) contrasting the insufficient impact in the trachea with the voice-producing impact in the larynx, illustrating the role of the glōttis in achieving proportionality (συμμετρία)
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
| **Sequence of Phonation** | 7 | Images, SVG diagram, animated SVG |
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
    media: 'image',           // 'image' | 'video' | 'schematic' | 'diagram' | 'strike_anim' | 'none'
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

## Version History

### v1.1 — 24 April 2026

**New visuals for the Sequence of Phonation section**
- Stages "The Larynx: Instrument of Voice" and "2. Laryngeal Muscles" now display a dedicated *The Larynx* anatomical image
- Stage "1. Cartilages of the Larynx" displays a dedicated *Cartilages of the Larynx* image
- Stage "3. Laryngeal Nerves" displays a dedicated *Laryngeal Nerves* image
- Image viewer background changed from black to parchment; images now fill the full media panel

**New interactive visuals (custom SVG components)**
- **Ekphysesis Diagram** (`EkphysesisDiagram`) — stage 5: a labelled anatomical diagram tracing the creation and upward movement of ἐκφύσησις from the lungs (with intercostal muscles, diaphragm, bronchi, C-ring tracheal structure) to the larynx, with Greek terminology and a bottom quote from PHP 2.5.53
- **Strike Animation** (`PlēgēAnimation`) — stage 7: a looping two-panel animated SVG contrasting the insufficient cartilaginous impact in the trachea (no φωνή) with the voice-producing impact in the larynx (glōttis narrows, ἐκφύσησις accelerates, sound waves and φωνή emerge)

**Expanded narrative descriptions**
- All eight stages in the Sequence of Phonation section updated to 5–6 sentence descriptions grounded directly in the thesis, covering cartilage anatomy, muscular organisation, neural innervation, glōttis structure, ἐκφύσησις physiology, the narrowing mechanism, and the Galenic theory of the strike

**Section renamed**
- Section title changed from "Anatomy of the Larynx" to "Sequence of Phonation"
- Sidebar navigation label changed from "Anatomy" to "Phonation"

---

### v1.0 — Initial release

Single-file interface (`index.html`) with three sections (Anatomy, Pneuma & Voice, Textual Analysis), Zustand state management, PneumaVisualizer schematic, ATLOMY-linked glossary, bibliography modal, dark mode, and URL sync.

---

## License

[To be added]
