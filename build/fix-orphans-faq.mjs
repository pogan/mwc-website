// Applies the Polish orphan fix (fixOrphansHtml) in place to every FAQ artboard
// in build/art/. Safe to re-run — U+00A0 is idempotent under the same regex.
// Use this for the FAQ set because its .dc.html files carry the user's own
// in-editor text edits and are NOT reproduced by gen.mjs.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fixOrphansHtml } from './orphans.mjs';

const dir = new URL('./art/', import.meta.url);
let changed = 0;
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.dc.html')) continue;
  const p = new URL(f, dir);
  const before = readFileSync(p, 'utf8');
  const after = fixOrphansHtml(before);
  if (after !== before) { writeFileSync(p, after); changed++; }
}
console.log(`fix-orphans-faq: ${changed} plików zaktualizowanych`);
