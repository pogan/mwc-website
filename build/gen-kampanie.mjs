import { writeFileSync, readFileSync, readdirSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { fixOrphans } from './orphans.mjs';

// ---------------------------------------------------------------------------
// Standalone generator for the "Kampanie — Marczykowska" canvas.
// The FAQ artifact hit the editor's 200-file ceiling, so the campaign
// carousels live in their own artifact. Writes a fresh build/kampanie/ tree
// (one .dc.html per slide, the bg images it uses, canvas.json with one page
// per campaign) plus pngmap-kampanie.json for the PNG export.
// No text sits in a top "kicker" strip — every label reads as normal body
// text inside the slide.
// ---------------------------------------------------------------------------

const PHONE = '+48 510 769 900';
const SIGN = 'Milena Marczykowska';
const SITE = 'marczykowska.com';

const SRC_IMG = new URL('./art/', import.meta.url);        // where bg-*.jpg live
const OUT = new URL('./kampanie/', import.meta.url);       // fresh output tree

const esc = (s) => fixOrphans(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');

const palettes = {
  cream: { bg: '#f2e8db', bg2: '#ece0d0', ink: '#4a3b30', soft: '#7a6552', foot: '#95836f', arrow: '#b58c68', photoOpacity: '0.12', photoBlend: 'multiply', sign: '#8a5a44' },
  sage: { bg: '#e8e9df', bg2: '#dce0d1', ink: '#3b4034', soft: '#63695a', foot: '#828a76', arrow: '#93a07e', photoOpacity: '0.12', photoBlend: 'multiply', sign: '#5f6b48' },
  blush: { bg: '#f3e6e2', bg2: '#ecd8d2', ink: '#4a352f', soft: '#7d6058', foot: '#9a7d74', arrow: '#c08d7d', photoOpacity: '0.12', photoBlend: 'multiply', sign: '#965448' },
  sand: { bg: '#efe6d5', bg2: '#e4d7c1', ink: '#453a2b', soft: '#776a53', foot: '#93856a', arrow: '#bfa072', photoOpacity: '0.13', photoBlend: 'multiply', sign: '#8a6a3f' },
  brown: { bg: '#7a5744', bg2: '#6a4938', ink: '#f6efe5', soft: '#e9dccb', foot: 'rgba(246,239,229,0.62)', arrow: 'rgba(246,239,229,0.72)', photoOpacity: '0.14', photoBlend: 'soft-light', sign: '#f3e6d5' },
  forest: { bg: '#40483b', bg2: '#333a2f', ink: '#f2f1e6', soft: '#d8dcc8', foot: 'rgba(242,241,230,0.6)', arrow: 'rgba(242,241,230,0.7)', photoOpacity: '0.15', photoBlend: 'soft-light', sign: '#e6ecd0' },
  aubergine: { bg: '#4b3540', bg2: '#3c2a33', ink: '#f5ece9', soft: '#e0cfd0', foot: 'rgba(245,236,233,0.6)', arrow: 'rgba(245,236,233,0.7)', photoOpacity: '0.15', photoBlend: 'soft-light', sign: '#efd7d6' },
  inkwarm: { bg: '#38322c', bg2: '#2b2622', ink: '#f4efe6', soft: '#d8cfc0', foot: 'rgba(244,239,230,0.58)', arrow: 'rgba(244,239,230,0.7)', photoOpacity: '0.16', photoBlend: 'soft-light', sign: '#e9d8c0' },
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
      font-variant-numeric: lining-nums;
      color: ${t.ink};
    }
    .slide .bg {
      position: absolute; inset: 0; width: 100%; height: 100%;
      object-fit: cover; opacity: ${t.photoOpacity};
      mix-blend-mode: ${t.photoBlend}; filter: grayscale(0.2);
    }
    .inner {
      position: absolute; inset: 0; padding: 116px 108px 92px;
      display: flex; flex-direction: column;
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
    .lead { display: block; font-weight: 600; margin-bottom: 22px; text-wrap: balance; }
    .lead.quote { font-size: 42px; }
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

function coverBody(t, qHtml, sub) {
  const s = sub
    ? `\n      <div style="margin-top:36px; font-size:35px; line-height:1.4; color:${t.soft};">${nl2br(sub)}</div>`
    : '';
  return `    <div style="flex:1; display:flex; flex-direction:column; justify-content:center;">
      <h1 style="margin:0; font-weight:600; font-size:80px; line-height:1.14; letter-spacing:0.3px; text-wrap:balance;">${qHtml}</h1>${s}
    </div>`;
}

function answerBody(t, label, text) {
  const isQuote = label.trimStart().startsWith('„');
  const cls = isQuote ? 'lead quote' : 'lead';
  return `    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
      <p style="margin:0; max-width:${isQuote ? 900 : 850}px; font-size:46px; line-height:1.44; letter-spacing:0.2px; text-wrap:pretty;">
        <span class="${cls}">${nl2br(label)}</span><span style="font-weight:500;">${nl2br(text)}</span>
      </p>
    </div>`;
}

function listBody(t, sub, rows) {
  const lis = rows.map((r) => `<div>${esc(r)}</div>`).join('\n        ');
  return `    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
      <div style="font-weight:600; font-size:42px; margin-bottom:34px;">${nl2br(sub)}</div>
      <div style="display:flex; flex-direction:column; gap:16px; font-size:37px; line-height:1.3;">
        ${lis}
      </div>
    </div>`;
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
// slide shapes:  ['bold lead', 'body text']  |  { list: 'heading', rows: [...] }
const carousels = [
  {
    prefix: 'ROC', slug: 'rocznice-slubu', name: 'Rocznice ślubu', pal: 'sand', photo: 'vows',
    cover: 'Rocznice ślubu —\nczy znasz\nje wszystkie?',
    slides: [
      ['5 lat — rocznica drewniana', 'Drewno z czasem ciemnieje i twardnieje — a piękne czynią je dopiero słoje: ślady wspólnych burz i słonecznych lat.'],
      ['20 lat — rocznica porcelanowa', 'Delikatna, a jednak codzienna. Piękno, którym się żyje, a nie tylko podziwia zza szyby.'],
      ['25 lat — srebrne gody', 'Srebro trzeba pielęgnować, żeby nie pociemniało. Wy nauczyliście się tego dawno temu.'],
      ['30 lat — rocznica perłowa', 'Perła narasta latami wokół ziarnka, które kiedyś uwierało. Z cierpliwości rodzi się blask.'],
      ['40 lat — rocznica rubinowa', 'Głęboka czerwień, która nie blaknie — namiętność, która przez lata dojrzała w oddanie.'],
      ['50 lat — złote gody', 'Złoto się nie utlenia. Pół wieku, a próba wciąż ta sama — i wciąż zdana.'],
      ['60 lat — rocznica diamentowa', 'Najtwardszy z minerałów — powstaje pod ciśnieniem, którego nic innego by nie przetrwało.'],
    ],
    cta: { lead: 'Każda z tych rocznic to osobna historia.', head: 'Zaplanuj z nami\nodnowienie przysięgi' },
    note: 'KAMPANIE · Rocznice ślubu\n\nProponowany hook do opisu posta:\n„Czy znasz je wszystkie?”\n\nCTA: Zaplanuj odnowienie swojej przysięgi razem z nami.\nPełna lista nazw — karuzela „Jubileusze ślubne”.',
  },
  {
    prefix: 'JUB', slug: 'jubileusze', name: 'Jubileusze ślubne', pal: 'blush', photo: 'candles',
    cover: 'Jubileusze ślubne —\nkażdy rok ma\nswoją nazwę.',
    coverSub: 'Znacie swoją?',
    slides: [
      { list: 'Co rok · lata 1–5', rows: ['1 — papierowa', '2 — bawełniana', '3 — skórzana', '4 — kwiatowa', '5 — drewniana'] },
      { list: 'Co rok · lata 6–10', rows: ['6 — cukrowa', '7 — wełniana / miedziana', '8 — spiżowa / brązowa', '9 — gliniana', '10 — cynowa / aluminiowa'] },
      { list: 'Co rok · lata 11–15', rows: ['11 — stalowa', '12 — płócienna / jedwabna', '13 — koronkowa', '14 — z kości słoniowej', '15 — kryształowa / szklana'] },
      { list: 'Potem co pięć lat · 20–40', rows: ['20 — porcelanowa', '25 — srebrna (srebrne gody)', '30 — perłowa', '35 — koralowa', '40 — rubinowa'] },
      { list: 'Co pięć lat · 45–65', rows: ['45 — szafirowa', '50 — złota (złote gody)', '55 — szmaragdowa / platynowa', '60 — diamentowa', '65 — żelazna'] },
      { list: 'Najdłuższe · 70–80', rows: ['70 — kamienna', '75 — brylantowa', '80 — dębowa'] },
    ],
    cta: { lead: 'Zbliża się okrągły jubileusz?', head: 'Zaplanuj z nami\nodnowienie przysięgi' },
    note: 'KAMPANIE · Jubileusze ślubne (pełna lista)\n\nHook: „Każdy rok ma swoją nazwę — znacie swoją?”\nNazewnictwo wg tradycji polskiej; przy części lat funkcjonują warianty (podano po ukośniku).',
  },
  {
    prefix: 'LGB', slug: 'pary-lgbtq-promocja', name: 'Pary LGBTQ+ (promo)', pal: 'aubergine', photo: 'arch',
    cover: 'Miłość nie czeka\nna pozwolenie.',
    coverSub: 'Ceremonie dla par LGBTQ+ — promocja na 2026.',
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
  {
    prefix: 'MIT', slug: 'mity', name: 'Mity', pal: 'forest', photo: 'cer',
    cover: '„To nie jest\nprawdziwy ślub”\ni inne mity.',
    slides: [
      ['„To nie jest prawdziwy ślub.”', 'Jest prawdziwy dla Was i dla gości. Nie ma tylko skutków prawnych — te załatwiacie w USC w kilka minut, w trampkach.'],
      ['„Goście nie będą wiedzieć, jak się zachować.”', 'Na początku ciepło wprowadzam wszystkich w to, co się właśnie dzieje. Po dwóch minutach nikt nie pamięta, że to coś nowego.'],
      ['„Bez księdza będzie zimno.”', 'Najczęściej jest odwrotnie. Ceremonia jest o Was — Waszej historii i Waszych słowach — więc wzrusza nawet tych, którzy „się nie wzruszają”.'],
      ['„To moda, która minie.”', 'Świeccy mistrzowie ceremonii prowadzą śluby od dziesięcioleci. W Polsce to wciąż nowość, na Zachodzie — norma od dawna.'],
      ['„Starsza rodzina tego nie przyjmie.”', 'To zwykle najbardziej sceptyczni goście podchodzą po ceremonii ze łzami, że nigdy nie byli na czymś tak pięknym.'],
    ],
    cta: { lead: 'Masz wątpliwość, której tu nie ma?', head: 'Napisz — rozwieję ją\nna spokojnie' },
    note: 'KAMPANIE · Mity o ślubie humanistycznym\n\nProponowany hook: „Ile z tych zdań słyszeliście?”\nFormat: mit w cudzysłowie + spokojne sprostowanie.',
  },
  {
    prefix: 'RYT', slug: 'rytualy-jednosci', name: 'Rytuały jedności', pal: 'cream', photo: 'candles',
    cover: 'Rytuały jedności —\nwybierz swój.',
    slides: [
      ['Piasek', 'Dwa kolory piasku przesypujecie do jednego naczynia. Warstw nie da się już rozdzielić — jak Waszych historii.'],
      ['Świeca jedności', 'Od dwóch osobnych płomieni zapalacie jeden wspólny. Pięknie wygląda o zmierzchu i w plenerze.'],
      ['Sadzenie drzewa', 'Podlewacie je wodą przyniesioną z Waszych rodzinnych domów. Rośnie razem z Wami przez kolejne lata.'],
      ['List i wino', 'Zamykacie w skrzynce list do siebie i butelkę wina. Otwieracie na pierwszą rocznicę albo w trudniejszy dzień.'],
      ['Handfasting', 'Wiązanie dłoni wstążką — najstarszy z rytuałów i źródło zwrotu „związać się węzłem”. Mocny wizualnie.'],
    ],
    cta: { lead: 'Nie wiecie, który wybrać?', head: 'Podpowiem przy\nplanowaniu scenariusza' },
    note: 'KAMPANIE · Rytuały jedności\n\nProponowany hook: „Wybierz swój rytuał.”\nMożna rozbić na osobne posty, jeśli któryś rytuał chwyci.',
  },
  {
    prefix: 'CEN', slug: 'cennik', name: 'Ile kosztuje ceremonia', pal: 'sage', photo: 'css',
    cover: 'Ile kosztuje\nceremonia —\nza co płacisz?',
    slides: [
      ['Nie za 20 minut mówienia', 'Ceremonia trwa pół godziny. Przygotowanie jej — tygodnie: rozmowy, kwestionariusze, pisanie i szlifowanie scenariusza.'],
      ['Za autorski scenariusz', 'Każde słowo pisane od zera, pod Waszą historię. Do tego pomoc z przysięgami i doborem muzyki.'],
      ['Za spokój w dniu ślubu', 'Reżyseria przebiegu, próba mikrofonu, kontakt z obsługą miejsca, plan B na pogodę i sytuacje losowe.'],
      ['Za doświadczenie', 'Setki poprowadzonych ceremonii i sieć zastępców, gdyby stało się coś nagłego. Nigdy nie zostajecie sami.'],
      ['Konkretna wycena', 'Zależy od miejsca, dojazdu, liczby języków i zakresu. Podaję ją po bezpłatnej rozmowie — bez zobowiązań.'],
    ],
    cta: { lead: 'Chcecie poznać wycenę?', head: 'Umów bezpłatną\nrozmowę' },
    note: 'KAMPANIE · Ile kosztuje ceremonia\n\nProponowany hook: „Za co właściwie płacisz?”\nCelowo bez kwot — jeśli chcesz podać widełki „od…”, dopisz je na slajdzie „Konkretna wycena”.',
  },
  {
    prefix: 'POR', slug: 'pory-roku', name: 'Pory roku', pal: 'brown', photo: 'rustic',
    cover: 'Kiedy wziąć\nślub humanistyczny?',
    coverSub: 'Ceremonia w cztery pory roku.',
    slides: [
      ['Wiosna', 'Świeża zieleń, długie światło, jeszcze bez upału. Idealna na ogród i plener — miej tylko gotowy plan B na deszcz.'],
      ['Lato', 'Najdłuższe dni i ciepłe wieczory. Ceremonię ustawiamy tak, by słońce nie świeciło Wam i gościom w oczy.'],
      ['Jesień', 'Złote światło, cieplejsze barwy, mniej obłożone terminy. Fotograficznie — często najpiękniejsza pora.'],
      ['Zima', 'Świece, wnętrza, kominek, kameralnie. Zimowa ceremonia ma klimat, jakiego lato nie da.'],
    ],
    cta: { lead: 'Wybraliście porę roku?', head: 'Sprawdźmy\nwolne terminy' },
    note: 'KAMPANIE · Ceremonia w cztery pory roku\n\nProponowany hook: „Kiedy wziąć ślub humanistyczny?”\nDobry do publikacji sezonowej — po jednym slajdzie na start każdej pory roku.',
  },
  {
    prefix: 'TER', slug: 'wolne-terminy', name: 'Wolne terminy', pal: 'inkwarm', photo: 'cer',
    cover: 'Sezon 2026\ndomykamy.\nMacie termin?',
    coverSub: 'Wolne terminy 2026 i 2027.',
    slides: [
      ['Rok 2026', 'Zostały pojedyncze wolne soboty. Jeśli macie datę — nie zwlekajcie z pytaniem.'],
      ['Rok 2027', 'Kalendarz już otwarty. Najlepsze terminy — długie weekendy i czerwcowe soboty — rezerwują się najszybciej.'],
      ['Blisko terminu?', 'Nawet jeśli data jest za kilka tygodni — napiszcie. Jeśli nie ja, to sprawdzony celebrant z mojej sieci.'],
      ['Jak rezerwujecie', 'Krótka rozmowa, umowa online, zaliczka. Termin jest Wasz — a przygotowania robimy spokojnie, krok po kroku.'],
    ],
    cta: { lead: 'Chcecie sprawdzić swój termin?', head: 'Napiszcie —\nodpowiem szybko' },
    note: 'KAMPANIE · Wolne terminy\n\nProponowany hook: „Sprawdź, czy Twój termin jest wolny.”\nUWAGA: zweryfikuj realną dostępność 2026/2027 przed publikacją — treść slajdów jest szablonowa.',
  },
];

// ---- generate a fresh standalone canvas -----------------------------
const SLIDE = 1080, COLGAP = 140;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const usedPhotos = [...new Set(carousels.map((c) => c.photo))];
for (const p of usedPhotos) copyFileSync(new URL(`bg-${p}.jpg`, SRC_IMG), new URL(`bg-${p}.jpg`, OUT));

const artboards = [];
const annotations = [];
const pages = [];
const pngmap = [];
let first = true;

carousels.forEach((c, ci) => {
  const t = palettes[c.pal];
  const bg = `bg-${c.photo}.jpg`;
  const cc = '01';
  const dir = `5-kampanie/${ci + 1}-${c.slug}`;
  const last = c.slides.length + 2;
  pages.push({ id: c.slug, name: c.name });
  let sIdx = 0;
  const push = (stem, html, label) => {
    const file = `${first ? 'Main' : stem}.dc.html`;
    first = false;
    writeFileSync(new URL(file, OUT), html);
    artboards.push({ file, x: sIdx * (SLIDE + COLGAP), y: 0, w: SLIDE, h: SLIDE, page: c.slug });
    pngmap.push({ file, out: `${dir}/${label}.png` });
    sIdx++;
  };

  push(`${c.prefix}${cc}S1`, page(t, coverBody(t, nl2br(c.cover), c.coverSub), { bg }), '1-tytul');
  c.slides.forEach((s, si) => {
    const body = Array.isArray(s) ? answerBody(t, s[0], s[1]) : listBody(t, s.list, s.rows);
    push(`${c.prefix}${cc}S${si + 2}`, page(t, body, { bg }), String(si + 2));
  });
  push(`${c.prefix}${cc}S${last}`, page(t, ctaBody(t, c.cta.lead, c.cta.head), { noArrow: true, noFoot: true, bg }), `${last}-kontakt`);

  annotations.push({ id: `note-${c.slug}`.slice(0, 40), x: 0, y: -320, w: 1080, page: c.slug, text: c.note });
});

const canvas = { artboards, annotations, pages, launch: { view: 'canvas', page: carousels[0].slug } };
writeFileSync(new URL('canvas.json', OUT), JSON.stringify(canvas, null, 2));
writeFileSync(new URL('./pngmap-kampanie.json', import.meta.url), JSON.stringify(pngmap, null, 2));

console.log(`Kampanie: ${carousels.length} karuzel, ${artboards.length} artboardów, ${pages.length} kart -> build/kampanie/`);
