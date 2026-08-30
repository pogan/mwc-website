// Typografia PL: nie zostawiaj jednoliterowych wyrazów (a i o u w z) na końcu
// wiersza — sklej je z następnym słowem twardą spacją (U+00A0).
// Trzy przebiegi obsługują ciągi typu "a i o".
const RE = /(^|[\s(\[„”"'‚’«»—–-])([aiouwzAIOUWZ]) +/g;

export function fixOrphans(s) {
  if (typeof s !== 'string') return s;
  for (let i = 0; i < 3; i++) s = s.replace(RE, '$1$2 ');
  return s;
}

// Naprawa gotowego .dc.html "w miejscu": tylko węzły tekstowe poza <helmet>
// (czyli poza blokiem <style>), bez dotykania znaczników i atrybutów.
export function fixOrphansHtml(html) {
  const i = html.indexOf('</helmet>');
  const head = i === -1 ? '' : html.slice(0, i + '</helmet>'.length);
  const body = i === -1 ? html : html.slice(i + '</helmet>'.length);
  const fixed = body.replace(/(^|>)([^<>]+)(?=<|$)/g, (_m, pre, txt) => pre + fixOrphans(txt));
  return head + fixed;
}
