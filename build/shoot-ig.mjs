// Wersja karuzel przeprojektowana pod Instagram / TikTok: 1080 × 1350 (4:5).
// Format 1:1 jest przycinany w podglądzie siatki na IG (siatka ~3:4) — tekst
// przy krawędziach znika. 4:5 wyświetla się w całości w feedzie, a w siatce
// traci tylko ~3% u góry/dołu, więc treść trzymamy z zapasem od krawędzi.
//
// Nie zmienia szerokości (1080) → łamanie tekstu identyczne jak w 1:1;
// dokłada tylko pionowego oddechu i odsuwa stopkę/strzałkę od dołu.
//
//   node build/shoot-ig.mjs                → wszystkie do ~/Desktop/…/instagram-4x5/
//   node build/shoot-ig.mjs SLU01S2 ROC01S1 → tylko wskazane (podgląd, do build/ig-preview/)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = fileURLToPath(new URL('.', import.meta.url));
const OUT_ROOT = join(homedir(), 'Desktop', 'faq-carousele-slajdy', 'instagram-4x5');
const PREVIEW = join(ROOT, 'ig-preview');
const only = process.argv.slice(2);

const W = 1080, H = 1350;

function to45(html) {
  return html
    .replace(/[ \t]*<script src="\.\/support\.js"><\/script>\n?/, '')
    .replace(/width: 1080px; height: 1080px;/, `width: ${W}px; height: ${H}px;`)
    .replace(/padding: 118px 112px 96px;/, 'padding: 160px 112px 150px;')   // FAQ .inner
    .replace(/padding: 116px 108px 92px;/, 'padding: 160px 108px 150px;')   // Kampanie .inner
    .replace(/(\.foot \{[^}]*?)bottom: 60px;/, '$1bottom: 92px;')
    .replace(/(\.arrow \{[^}]*?)bottom: 150px;/, '$1bottom: 190px;');
}

// art/pngmap.json lives in build/art/ ; pngmap-kampanie.json lives in build/
const mapPath = { art: join(ROOT, 'art', 'pngmap.json'), kampanie: join(ROOT, 'pngmap-kampanie.json') };

let n = 0;
for (const src of ['art', 'kampanie']) {
  const map = JSON.parse(readFileSync(mapPath[src], 'utf8'));
  const workDir = join(ROOT, `_ig_${src}`);
  mkdirSync(workDir, { recursive: true });
  for (const f of readdirSync(join(ROOT, src))) {
    if (f.endsWith('.jpg')) { copyFileSync(join(ROOT, src, f), join(workDir, f)); continue; }
    if (!f.endsWith('.dc.html')) continue;
    writeFileSync(join(workDir, f), to45(readFileSync(join(ROOT, src, f), 'utf8')));
  }
  for (const { file, out } of map) {
    const stem = file.replace('.dc.html', '');
    if (only.length && !only.includes(stem)) continue;
    const outPath = only.length ? join(PREVIEW, stem + '.png') : join(OUT_ROOT, out);
    mkdirSync(dirname(outPath), { recursive: true });
    execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--force-device-scale-factor=1', `--window-size=${W},${H}`,
      '--virtual-time-budget=3500', `--screenshot=${outPath}`, file,
    ], { cwd: workDir, stdio: 'ignore' });
    n++;
  }
}
console.log(only.length
  ? `podgląd: ${n} PNG -> ${PREVIEW}`
  : `gotowe: ${n} PNG (4:5) -> ${OUT_ROOT}`);
