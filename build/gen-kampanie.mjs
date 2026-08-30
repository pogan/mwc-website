import { writeFileSync, readFileSync, readdirSync, unlinkSync } from 'node:fs';

// ---------------------------------------------------------------------------
// ADDITIVE generator — appends a "Kampanie" page to the existing canvas.
// It writes only its own new artboards (ROC*/LGB*) into build/art/ and patches
// build/art/canvas.json in place; it never touches the FAQ artboards, which
// are now maintained directly in the published artifact. Idempotent: re-running
// replaces the Kampanie page cleanly.
// Shared rendering helpers are copied verbatim from gen.mjs.
// ---------------------------------------------------------------------------

const PHONE = '+48 510 769 900';
const SIGN = 'Milena Marczykowska';
const SITE = 'marczykowska.com';

const ART = new URL('./art/', import.meta.url);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');

const palettes = {
  cream: { bg: '#f2e8db', bg2: '#ece0d0', ink: '#4a3b30', soft: '#7a6552', foot: '#95836f', kicker: '#9c6f4f', arrow: '#b58c68', photoOpacity: '0.12', photoBlend: 'multiply', sign: '#8a5a44' },
  sage: { bg: '#e8e9df', bg2: '#dce0d1', ink: '#3b4034', soft: '#63695a', foot: '#828a76', kicker: '#6f7a5a', arrow: '#93a07e', photoOpacity: '0.12', photoBlend: 'multiply', sign: '#5f6b48' },
  blush: { bg: '#f3e6e2', bg2: '#ecd8d2', ink: '#4a352f', soft: '#7d6058', foot: '#9a7d74', kicker: '#a86f5f', arrow: '#c08d7d', photoOpacity: '0.12', photoBlend: 'multiply', sign: '#965448' },
  sand: { bg: '#efe6d5', bg2: '#e4d7c1', ink: '#453a2b', soft: '#776a53', foot: '#93856a', kicker: '#9a7b4f', arrow: '#bfa072', photoOpacity: '0.13', photoBlend: 'multiply', sign: '#8a6a3f' },
  brown: { bg: '#7a5744', bg2: '#6a4938', ink: '#f6efe5', soft: '#e9dccb', foot: 'rgba(246,239,229,0.62)', kicker: '#ecceac', arrow: 'rgba(246,239,229,0.72)', photoOpacity: '0.14', photoBlend: 'soft-light', sign: '#f3e6d5' },
  forest: { bg: '#40483b', bg2: '#333a2f', ink: '#f2f1e6', soft: '#d8dcc8', foot: 'rgba(242,241,230,0.6)', kicker: '#cdd7a8', arrow: 'rgba(242,241,230,0.7)', photoOpacity: '0.15', photoBlend: 'soft-light', sign: '#e6ecd0' },
  aubergine: { bg: '#4b3540', bg2: '#3c2a33', ink: '#f5ece9', soft: '#e0cfd0', foot: 'rgba(245,236,233,0.6)', kicker: '#e6bfc0', arrow: 'rgba(245,236,233,0.7)', photoOpacity: '0.15', photoBlend: 'soft-light', sign: '#efd7d6' },
  inkwarm: { bg: '#38322c', bg2: '#2b2622', ink: '#f4efe6', soft: '#d8cfc0', foot: 'rgba(244,239,230,0.58)', kicker: '#d8b98f', arrow: 'rgba(244,239,230,0.7)', photoOpacity: '0.16', photoBlend: 'soft-light', sign: '#e9d8c0' },
};

function arrowSVG(color) {
  return `<svg class="arrow" viewBox="0 0 240 140" fill="none" stroke="${color}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M10 40 C 68 6, 126 8, 150 58 C 160 80, 142 106, 120 95 C 104 87, 110 60, 138 64 C 178 70, 208 92, 226 74" />
      <path d="M226 74 l -24 -2 M226 74 l -9 20" />
    </svg>`;
}

function page(t, body, opts = {}) {
  const arrow = opts.noArrow ? '' : arrowSVG(t.arrow);
  const foot = opts.noFoot ? '' : `<div class="foot">${SITE}</div>`;
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@300;400;500&family=Parisienne&display=swap">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; }
    .slide {
      position: relative; width: 1080px; height: 1080px; overflow: hidden;
      background: radial-gradient(120% 120% at 30% 20%, ${t.bg} 0%, ${t.bg2} 100%);
      font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
      color: ${t.ink};
    }
    .slide .bg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; opacity: ${t.photoOpacity};
      mix-blend-mode: ${t.photoBlend}; filter: grayscale(0.2);
    }
    .inner {
      position: absolute; inset: 0; padding: 118px 112px 96px;
      display: flex; flex-direction: column;
    }
    .kicker {
      font-family: 'Jost', system-ui, sans-serif; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.34em; font-size: 21px;
      color: ${t.kicker};
    }
    .foot {
      position: absolute; left: 0; right: 0; bottom: 60px; text-align: center;
      font-family: 'Jost', system-ui, sans-serif; font-weight: 300;
      font-size: 20px; letter-spacing: 0.3em; text-transform: uppercase;
      color: ${t.foot};
    }
    .arrow {
      position: absolute; right: 104px; bottom: 150px; width: 132px; height: auto;
      opacity: 0.62;
    }
    a { color: ${t.sign}; } a:hover { color: ${t.sign}; }
  </style>
</helmet>
<div class="slide">
  <img class="bg" src="${opts.bg || 'bg-rustic.jpg'}" alt="">
  <div class="inner">
${body}
  </div>
  ${arrow}
  ${foot}
</div>
</x-dc>
</body>
</html>
`;
}

function coverBody(t, kicker, qHtml) {
  return `    <div class="kicker">${kicker}</div>
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center;">
      <h1 style="margin:0; font-weight:600; font-size:82px; line-height:1.14; letter-spacing:0.3px; text-wrap:balance;">${qHtml}</h1>
    </div>`;
}

function answerBody(t, tag, text) {
  return `    <div style="text-align:center; font-style:italic; font-size:30px; line-height:1.4; color:${t.soft}; max-width:640px; margin:0 auto;">${nl2br(tag)}</div>
    <div style="flex:1; display:flex; align-items:center; justify-content:center;">
      <p style="margin:0; text-align:center; font-weight:500; font-size:47px; line-height:1.42; letter-spacing:0.2px; max-width:830px; text-wrap:pretty;">${nl2br(text)}</p>
    </div>
    <div style="height:26px;"></div>`;
}

function ctaBody(t, lead, head) {
  return `    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:6px;">
      <div style="font-style:italic; font-size:40px; color:${t.soft};">${nl2br(lead)}</div>
      <h2 style="margin:0 0 26px; font-weight:600; font-size:56px; line-height:1.2;">${nl2br(head)}</h2>
      <div style="font-family:'Jost',system-ui,sans-serif; font-weight:300; font-size:34px; letter-spacing:0.14em; color:${t.ink};">${PHONE}</div>
      <div style="font-family:'Parisienne',cursive; font-size:62px; line-height:1; margin-top:34px; color:${t.sign};">${SIGN}</div>
      <div style="font-family:'Jost',system-ui,sans-serif; font-weight:300; font-size:20px; letter-spacing:0.3em; text-transform:uppercase; color:${t.soft}; margin-top:14px;">${SITE}</div>
    </div>`;
}

// ---- content ------------------------------------------------------------
const carousels = [
  {
    prefix: 'ROC', slug: 'rocznice-slubu', menu: 'Rocznice ślubu',
    pal: 'sand', photo: 'vows',
    kicker: 'Rocznice ślubu',
    cover: 'Rocznice ślubu —\nczy znasz\nje wszystkie?',
    slides: [
      ['5 lat razem', 'Rocznica drewniana. Drewno z czasem ciemnieje i twardnieje — a piękne czynią je dopiero słoje: ślady wspólnych burz i słonecznych lat.'],
      ['20 lat razem', 'Rocznica porcelanowa. Delikatna, a jednak codzienna. Piękno, którym się żyje, a nie tylko podziwia zza szyby.'],
      ['25 lat razem', 'Srebrne gody. Srebro trzeba pielęgnować, żeby nie pociemniało. Wy nauczyliście się tego dawno temu.'],
      ['30 lat razem', 'Rocznica perłowa. Perła narasta latami wokół ziarnka, które kiedyś uwierało. Z cierpliwości rodzi się blask.'],
      ['40 lat razem', 'Rocznica rubinowa. Głęboka czerwień, która nie blaknie — namiętność, która przez lata dojrzała w oddanie.'],
      ['50 lat razem', 'Złote gody. Złoto się nie utlenia. Pół wieku, a próba wciąż ta sama — i wciąż zdana.'],
      ['60 lat razem', 'Rocznica diamentowa. Najtwardszy z minerałów — powstaje pod ciśnieniem, którego nic innego by nie przetrwało.'],
    ],
    cta: { lead: 'Każda z tych rocznic to osobna historia.', head: 'Zaplanuj z nami\nodnowienie przysięgi' },
    note: 'KAMPANIE · Rocznice ślubu\n\nProponowany hook do opisu posta:\n„Czy znasz je wszystkie?”\n\nCTA: Zaplanuj odnowienie swojej przysięgi razem z nami.\nNazwy rocznic wg tradycji polskiej.',
  },
  {
    prefix: 'LGB', slug: 'pary-lgbtq-promocja', menu: 'Promocja — pary LGBTQ+',
    pal: 'aubergine', photo: 'arch',
    kicker: 'Ceremonie dla par LGBTQ+',
    cover: 'Miłość nie czeka\nna pozwolenie.',
    slides: [
      ['23 sierpnia 2026', 'Od tego dnia każdy urząd stanu cywilnego w Polsce może wpisać do rejestru zagraniczny akt małżeństwa pary jednopłciowej.'],
      ['Co to znaczy', 'To jeszcze nie równość małżeńska w Polsce. Ale to realny krok — i dobry moment, żeby świętować po swojemu.'],
      ['Ceremonia humanistyczna', 'Nigdy nie pytała o płeć ani o paragraf. Liczy się Wasza historia, Wasze słowa i ludzie, których kochacie.'],
      ['Promocja', 'Wszystkie ceremonie dla par LGBTQ+ z terminem w 2026 roku — 20% zniżki.'],
      ['Co poprowadzę', 'Ślub, przywitanie dziecka, odnowienie przysięgi — z klasą, ciepłem i pełnym zaangażowaniem.'],
    ],
    cta: { lead: 'Wasza historia zasługuje na święto.', head: 'Napiszcie do mnie' },
    note: 'KAMPANIE · Promocja dla par LGBTQ+\n\nKontekst: od 23.08.2026 USC w Polsce transkrybują zagraniczne akty małżeństw par jednopłciowych (wyroki NSA / TSUE, rozporządzenie z 22.05.2026). To NIE jest legalizacja małżeństw jednopłciowych w Polsce.\nŹródło: rp.pl, „Przełom w polskich urzędach…”, 23.08.2026\n\nOferta: 20% zniżki na wszystkie ceremonie dla par LGBTQ+ z terminem w 2026 r.',
  },
];

// ---- generate + patch canvas ------------------------------------------
const PAGE_ID = 'kampanie';
const PAGE_NAME = 'Kampanie';
const SLIDE = 1080, COLGAP = 140, ROWGAP = 520;

// wipe any previous Kampanie artboards
for (const f of readdirSync(ART)) {
  if (/^(ROC|LGB)\d/.test(f)) unlinkSync(new URL(f, ART));
}

const canvasURL = new URL('./canvas.json', ART);
const canvas = JSON.parse(readFileSync(canvasURL, 'utf8'));
canvas.artboards = canvas.artboards.filter((a) => a.page !== PAGE_ID);
canvas.annotations = canvas.annotations.filter((a) => a.page !== PAGE_ID);
canvas.pages = canvas.pages.filter((p) => p.id !== PAGE_ID);
canvas.pages.push({ id: PAGE_ID, name: PAGE_NAME });

carousels.forEach((c, ci) => {
  const t = palettes[c.pal];
  const bg = `bg-${c.photo}.jpg`;
  const rowY = ci * (SLIDE + ROWGAP);
  const cc = '01'; // one carousel per prefix
  let sIdx = 0;
  const push = (stem, html) => {
    writeFileSync(new URL(`${stem}.dc.html`, ART), html);
    canvas.artboards.push({ file: `${stem}.dc.html`, x: sIdx * (SLIDE + COLGAP), y: rowY, w: SLIDE, h: SLIDE, page: PAGE_ID });
    sIdx++;
  };
  push(`${c.prefix}${cc}S1`, page(t, coverBody(t, c.kicker, nl2br(c.cover)), { bg }));
  c.slides.forEach((s, si) => push(`${c.prefix}${cc}S${si + 2}`, page(t, answerBody(t, s[0], s[1]), { bg })));
  push(`${c.prefix}${cc}S${c.slides.length + 2}`, page(t, ctaBody(t, c.cta.lead, c.cta.head), { noArrow: true, noFoot: true, bg }));

  canvas.annotations.push({ id: `note-kampanie-${c.prefix.toLowerCase()}`, x: 0, y: rowY - 320, w: 1080, page: PAGE_ID, text: c.note });
});

canvas.launch = { view: 'canvas', page: PAGE_ID };
writeFileSync(canvasURL, JSON.stringify(canvas, null, 2));

const n = carousels.reduce((a, c) => a + c.slides.length + 2, 0);
console.log(`Kampanie: ${carousels.length} karuzele, ${n} artboardów; canvas pages -> ${canvas.pages.map((p) => p.id).join(', ')}`);
