#!/usr/bin/env node
// Syncs phonation-app/src/data/glossary.json → index.html
// Run manually:  node scripts/sync-glossary.js
// Runs automatically via the pre-commit hook on every commit.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const GLOSSARY_JSON = path.join(ROOT, 'phonation-app/src/data/glossary.json');
const INDEX_HTML = path.join(ROOT, 'index.html');

const BEGIN_MARKER = '// GLOSSARY:BEGIN';
const END_MARKER = '// GLOSSARY:END';

const glossary = JSON.parse(fs.readFileSync(GLOSSARY_JSON, 'utf8'));

// Format with 12-space indent for inner keys (8 outer + 4 per JSON level)
const outerIndent = '        ';
const innerIndent = '            ';
const json = JSON.stringify(glossary, null, 4)
    .split('\n')
    .map((line, i) => (i === 0 ? line : innerIndent + line))
    .join('\n');

const block =
    `${outerIndent}${BEGIN_MARKER} — do not edit here; edit phonation-app/src/data/glossary.json instead\n` +
    `${outerIndent}const GLOSSARY = ${json};\n` +
    `${outerIndent}${END_MARKER}`;

const html = fs.readFileSync(INDEX_HTML, 'utf8');

const beginIdx = html.indexOf(BEGIN_MARKER);
const endIdx   = html.indexOf(END_MARKER);

if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
    console.error('ERROR: GLOSSARY:BEGIN / GLOSSARY:END markers not found in index.html. Sync aborted.');
    process.exit(1);
}

// Walk back to the start of the line containing BEGIN_MARKER
const lineStart = html.lastIndexOf('\n', beginIdx) + 1;
// Walk forward to the end of the line containing END_MARKER
const lineEnd = html.indexOf('\n', endIdx);
const afterEnd = lineEnd === -1 ? html.length : lineEnd;

const updated = html.slice(0, lineStart) + block + html.slice(afterEnd);

fs.writeFileSync(INDEX_HTML, updated, 'utf8');
console.log('glossary.json → index.html synced');
