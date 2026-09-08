// Wypisuje po kolei teksty wszystkich slajdów obu karuzel (FAQ + Kampanie)
// do pliku TXT — do użycia jako treść posta i ALT-text na Instagramie.
// Źródło: build/art/*.dc.html + build/kampanie/*.dc.html (stan = opublikowane
// artefakty), kolejność z pngmap.json / pngmap-kampanie.json, nagłówki karuzel
// z notatek w canvas.json. Uruchom po każdej zmianie treści karuzel.
//   node build/gen-texts.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const ROOT = fileURLToPath(new URL('.', import.meta.url)); // .../build/

const decode = (s) => s
  .replace(/&nbsp;/g, ' ').replace(/ /g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function slideLines(srcDir, file) {
  const html = readFileSync(join(ROOT, srcDir, file), 'utf8');
  const m = html.match(/<div class="inner">([\s\S]*?)\n  <\/div>/);
  if (!m) return [];
  const s = m[1]
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<\/(h1|h2|p|div|span)>/g, '\n')
    .replace(/<[^>]+>/g, '');
  return decode(s).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

const FAQ_CAT = { slub: 'Śluby', przywitanie: 'Przywitania', pogrzeb: 'Pożegnania', odnowienie: 'Odnowienia przysięgi' };

function collect(pngmapPath, canvasPath, kind) {
  const pngmap = JSON.parse(readFileSync(join(ROOT, pngmapPath), 'utf8'));
  const canvas = JSON.parse(readFileSync(join(ROOT, canvasPath), 'utf8'));
  const noteById = new Map(canvas.annotations.map((a) => [a.id, a.text]));
  const groups = [];
  const byDir = new Map();
  for (const { file, out } of pngmap) {
    const dir = out.slice(0, out.lastIndexOf('/'));
    const label = out.slice(out.lastIndexOf('/') + 1).replace('.png', '');
    if (!byDir.has(dir)) {
      const seg = dir.split('/');
      const cat = seg[0].replace(/^\d+-/, '');
      const cc = seg[1].match(/^(\d+)-/)?.[1];
      const slug = seg[1].replace(/^\d+-/, '');
      const noteId = kind === 'faq' ? `note-${cat}-${cc}` : `note-${slug}`;
      const g = { dir, cat, slug, note: noteById.get(noteId) || '', slides: [] };
      byDir.set(dir, g); groups.push(g);
    }
    byDir.get(dir).slides.push({ label, lines: slideLines(kind === 'faq' ? 'art' : 'kampanie', file) });
  }
  return groups;
}

const firstNoteName = (note, fb) => note.split('\n')[0].split('·').slice(1).join('·').trim() || fb;
function noteHook(note) {
  const lines = note.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/hook/i.test(lines[i])) continue;
    const m = lines[i].match(/[„"]([^„"”]+)[„"”]/);
    if (m) return m[1].trim();
    for (let j = i + 1; j < lines.length; j++) if (lines[j].trim()) return lines[j].trim().replace(/^[\s„"]+|[\s"”]+$/g, '');
  }
  const q = lines.find((x) => /^\s*[„"]/.test(x));
  return q ? q.trim().replace(/^[\s„"]+|[\s"”]+$/g, '') : '';
}
const noteExtras = (note) => note.split('\n').filter((l) => /^\s*(Źródło:|UWAGA:|Oferta:|Kontekst:|CTA:)/i.test(l)).map((l) => l.trim());
const noteQuestion = (note) => note.match(/PYTANIE FAQ:\s*(.+)/)?.[1].trim() || '';

const O = [];
const p = (x = '') => O.push(x);

p('TEKSTY SLAJDÓW — KARUZELE NA INSTAGRAM');
p('Milena Marczykowska · marczykowska.com');
p(`Wygenerowano: ${new Date().toISOString().slice(0, 10)}`);
p('');
p('Do wykorzystania jako treść posta (opis) i ALT-text pod każdym slajdem.');
p('Kolejność = kolejność slajdów w karuzeli.');
p('W karuzelach FAQ nad odpowiedzią powtarza się to samo pytanie —');
p('podane raz w nagłówku karuzeli, żeby nie zaśmiecać listy.');

p('');
p('═══════════════════════════════════════════════════════════════════');
p('  CZĘŚĆ 1 — FAQ   (artefakt „FAQ Carousele — Śluby")');
p('═══════════════════════════════════════════════════════════════════');

const faq = collect('art/pngmap.json', 'art/canvas.json', 'faq');
const faqByCat = {};
for (const g of faq) (faqByCat[g.cat] ||= []).push(g);
for (const [cat, list] of Object.entries(faqByCat)) {
  p('');
  p('═══ KATEGORIA: ' + (FAQ_CAT[cat] || cat).toUpperCase() + ' ═══');
  list.forEach((g, i) => {
    const recap = g.slides[1]?.lines[0] || '';
    p('');
    p('───────────────────────────────────────────────');
    p(`KARUZELA ${i + 1}/${list.length} — ${firstNoteName(g.note, g.slug)}`);
    if (noteQuestion(g.note)) p(`Pytanie FAQ: ${noteQuestion(g.note)}`);
    if (noteHook(g.note)) p(`Hook do opisu posta: „${noteHook(g.note)}"`);
    if (recap) p(`Nagłówek nad odpowiedziami: „${recap}"`);
    p('───────────────────────────────────────────────');
    g.slides.forEach((s, si) => {
      const isCta = /kontakt/.test(s.label);
      p('');
      p(`[Slajd ${si + 1}${si === 0 ? ' — tytuł' : isCta ? ' — kontakt' : ''}]`);
      if (si === 0) p(s.lines.join('  |  '));
      else if (isCta) p(s.lines.join(' · '));
      else p(s.lines.slice(1).join(' ') || s.lines.join(' '));
    });
  });
}

p('');
p('');
p('═══════════════════════════════════════════════════════════════════');
p('  CZĘŚĆ 2 — KAMPANIE   (artefakt „Kampanie — Marczykowska")');
p('═══════════════════════════════════════════════════════════════════');

const kamp = collect('pngmap-kampanie.json', 'kampanie/canvas.json', 'kamp');
kamp.forEach((g) => {
  p('');
  p('───────────────────────────────────────────────');
  p(`KARUZELA — ${firstNoteName(g.note, g.slug)}`);
  if (noteHook(g.note)) p(`Hook do opisu posta: „${noteHook(g.note)}"`);
  for (const ex of noteExtras(g.note)) p(ex);
  p('───────────────────────────────────────────────');
  g.slides.forEach((s, si) => {
    const isCta = /kontakt/.test(s.label);
    p('');
    p(`[Slajd ${si + 1}${si === 0 ? ' — tytuł' : isCta ? ' — kontakt' : ''}]`);
    if (isCta) p(s.lines.join(' · '));
    else s.lines.forEach((l) => p(l));
  });
});

p('');
const text = O.join('\n').replace(/\n{4,}/g, '\n\n\n') + '\n';
const targets = [fileURLToPath(new URL('../teksty-slajdow.txt', import.meta.url))];
const desktop = join(homedir(), 'Desktop', 'faq-carousele-slajdy');
if (existsSync(desktop)) targets.push(join(desktop, 'teksty-slajdow.txt'));
for (const t of targets) writeFileSync(t, text);

console.log('wrote:', targets.join(', '));
console.log(`FAQ: ${faq.length} karuzel / ${faq.reduce((n, g) => n + g.slides.length, 0)} slajdów`);
console.log(`Kampanie: ${kamp.length} karuzel / ${kamp.reduce((n, g) => n + g.slides.length, 0)} slajdów`);
