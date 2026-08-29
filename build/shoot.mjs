// Render every artboard to a 1080x1080 PNG under build/png/<category>/<carousel>/<slide>.png
import { readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const map = JSON.parse(readFileSync(new URL('./art/pngmap.json', import.meta.url)));
const artDir = fileURLToPath(new URL('./art/', import.meta.url));
const outRoot = new URL('./png/', import.meta.url);

let n = 0;
for (const { file, out } of map) {
  const outPath = fileURLToPath(new URL(out, outRoot));
  mkdirSync(dirname(outPath), { recursive: true });
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1', '--window-size=1080,1080',
    '--virtual-time-budget=3500',
    `--screenshot=${outPath}`,
    file,
  ], { cwd: artDir, stdio: 'ignore' });
  n++;
  if (n % 20 === 0) console.log(`${n}/${map.length}`);
}
console.log(`done: ${n} PNG -> build/png/`);
