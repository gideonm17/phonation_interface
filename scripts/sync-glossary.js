#!/usr/bin/env node
// Previously synced phonation-app/src/data/glossary.json → index.html.
// The Vite app (phonation-app/) has been removed. The glossary now lives
// directly in index.html between the GLOSSARY:BEGIN and GLOSSARY:END markers.
// This script is kept as a no-op so the pre-commit hook does not break.
console.log('sync-glossary: no-op (Vite app removed; edit GLOSSARY directly in index.html)');
