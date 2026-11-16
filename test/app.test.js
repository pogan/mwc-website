const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Baza statystyk testów w katalogu tymczasowym.
process.env.STATS_DB = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'mwc-')), 'stats.sqlite');
process.env.STATS_PASSWORD = 'haslo-testowe';
const app = require('../server');

const BROWSER = {
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
  'accept-language': 'pl-PL,pl;q=0.9',
};

let base, server;
test.before(async () => {
  server = await new Promise((resolve) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s));
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

test('strony publiczne odpowiadają 200, stopka z wersją', async () => {
  for (const p of ['/', '/o-mnie', '/ceremonie-slubne', '/cennik', '/kontakt', '/faq', '/poradnik', '/polityka-prywatnosci']) {
    const res = await fetch(base + p);
    assert.equal(res.status, 200, p);
    assert.ok((await res.text()).includes(app.locals.appVersion.label), `${p}: wersja w stopce`);
  }
});

test('/healthz w formacie vamude-kit', async () => {
  const res = await fetch(`${base}/healthz`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
  assert.equal(body.app, 'mwc-website');
});

test('statystyki: odsłona strony liczona, panel za hasłem', async () => {
  await fetch(`${base}/cennik`, { headers: BROWSER });
  await new Promise((r) => setTimeout(r, 20));
  assert.equal((await fetch(`${base}/stats.json`)).status, 401);
  const res = await fetch(`${base}/stats.json`, { headers: { authorization: 'Bearer haslo-testowe' } });
  assert.equal(res.status, 200);
  const s = await res.json();
  assert.ok(s.pages.some((p) => p.name === '/cennik'));
});
