// Wersja karuzel przeprojektowana pod Instagram / TikTok: 1080 × 1350 (4:5).
//
// Slajdy z odpowiedziami: nie zmienia szerokości (1080) → łamanie tekstu jak
// w 1:1; dokłada tylko pionowego oddechu i odsuwa stopkę/strzałkę od dołu.
// Slajdy tytułowe (okładki): siatka IG kadruje kafelek mocno po bokach, więc
// nagłówek jest wyśrodkowany w centralnych ~62% szerokości (padding 205px),
// górny pasek „FAQ · …" i strzałka ukryte, stopień auto-dopasowany (cap 104).
// Symulacja kadru: crops w /Users/…/tmp/cropsim.mjs — tekst przeżywa nawet 2:3.
//
//   node build/shoot-ig.mjs           → wszystkie slajdy → ~/Desktop/…/instagram-4x5/
//   node build/shoot-ig.mjs covers    → tylko okładki (1-tytul) → j.w.
//   node build/shoot-ig.mjs SLU02S1 … → wskazane stemy → podgląd build/ig-preview/
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = fileURLToPath(new URL('.', import.meta.url));
const OUT_ROOT = join(homedir(), 'Desktop', 'faq-carousele-slajdy', 'instagram-4x5');
const PREVIEW = join(ROOT, 'ig-preview');

const args = process.argv.slice(2);
const coversOnly = args[0] === 'covers';
const only = coversOnly ? [] : args;

const W = 1080, H = 1350;

function to45(html) {
  html = html
    .replace(/[ \t]*<script src="\.\/support\.js"><\/script>\n?/, '')
    .replace(/width: 1080px; height: 1080px;/, `width: ${W}px; height: ${H}px;`)
    .replace(/padding: 118px 112px 96px;/, 'padding: 160px 112px 150px;')   // FAQ .inner
    .replace(/padding: 116px 108px 92px;/, 'padding: 160px 108px 150px;')   // Kampanie .inner
    .replace(/(\.foot \{[^}]*?)bottom: 60px;/, '$1bottom: 92px;')
    .replace(/(\.arrow \{[^}]*?)bottom: 150px;/, '$1bottom: 190px;');

  if (/<h1\b/.test(html)) {                       // slajd tytułowy
    html = html
      // górny pasek „FAQ · …" i tak jest przycinany w siatce — chowamy go
      .replace(/(\.kicker\s*\{)/, '$1 display: none;')
      // strzałka-bazgroł zbędna na okładce i wpada pod kadr siatki
      .replace(/(\.arrow\s*\{)/, '$1 display: none;')
      // BARDZO duży margines bezpieczeństwa — siatka IG kadruje mocno po bokach,
      // tekst ma się zmieścić z zapasem w środkowych ~62% szerokości
      .replace(/padding: 160px 112px 150px;/, 'padding: 176px 205px 176px;')
      .replace(/padding: 160px 108px 150px;/, 'padding: 176px 205px 176px;')
      .replace(/(\.foot \{[^}]*?)bottom: 92px;/, '$1bottom: 132px;')
      .replace(/(<h1[^>]*style=")/, '$1text-align: center; ')
      .replace(/(<h1[^>]*style="[^"]*?line-height:)\s*[\d.]+/, '$1 1.1')
      .replace(/(<h1[^>]*>)([\s\S]*?)(<\/h1>)/, (_m, a, inner, z) => a + inner.replace(/<br\s*\/?>/g, ' ') + z)
      .replace(/margin-top:36px; font-size:35px;/, 'text-align:center; margin-top:40px; font-size:40px;')   // podtytuł okładki (Kampanie)
      .replace(/(<div[^>]*margin-top:36px[^>]*>)([\s\S]*?)(<\/div>)/, (_m, a, inner, z) => a + inner.replace(/<br\s*\/?>/g, ' ') + z)
      // auto-dopasowanie: największy stopień mieszczący się w bezpiecznej strefie
      .replace('</x-dc>', `<script>
document.fonts.ready.then(function(){
  var h=document.querySelector('h1'); if(!h) return;
  var w=h.parentElement, cap=104;
  function contentH(){ var t=0,k=w.children; for(var i=0;i<k.length;i++){ var c=getComputedStyle(k[i]); t+=k[i].offsetHeight+(parseFloat(c.marginTop)||0)+(parseFloat(c.marginBottom)||0); } return t; }
  function over(){ return h.scrollWidth>w.clientWidth+1 || contentH()>w.clientHeight*0.9; }
  var s=cap; h.style.fontSize=s+'px';
  while(s>44 && over()){ s-=2; h.style.fontSize=s+'px'; }
});
</script>
</x-dc>`);
  }
  return html;
}

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
    if (coversOnly && !out.endsWith('1-tytul.png')) continue;
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
console.log(only.length ? `podgląd: ${n} PNG -> ${PREVIEW}` : `gotowe: ${n} PNG (4:5) -> ${OUT_ROOT}`);
