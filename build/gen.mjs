import { writeFileSync } from 'node:fs';

const HANDLE = '@milena_wolak_ceremonie';
const PHONE = '+48 510 769 900';
const SIGN = 'Milena Marczykowska';
const SITE = 'marczykowska.com';

// ---- 12 wedding-FAQ carousels, condensed to punchy slides -------------------
const carousels = [
  {
    slug: 'moc-prawna', menu: 'Moc prawna',
    q: 'Czy ślub humanistyczny\nma moc prawną?',
    faq: 'Czy ślub humanistyczny ma moc prawną? Jak pogodzić go z formalnościami?',
    caption: 'Ślub humanistyczny a formalności — jak to pogodzić bez stresu.',
    slides: [
      'Ślub humanistyczny to w pełni osobista ceremonia oparta na Waszych wartościach i historii. Nie wywołuje skutków prawnych — i dla większości Par to nie przeszkoda, a ogromna wolność.',
      'Jeśli zależy Wam na formalnym małżeństwie, najczęściej wybieramy „ślub cywilny w trampkach”: krótki termin w USC, tylko podpisy, bez oprawy.',
      'A właściwe święto — Wasz ślub humanistyczny — odbywa się w wybranym dniu i miejscu. Wtedy nakładacie obrączki i czytacie osobiste przysięgi.'
    ]
  },
  {
    slug: 'cywilny-i-humanistyczny', menu: 'Cywilny + humanistyczny',
    q: 'Czy można połączyć ślub\ncywilny z humanistycznym\n— w jednym miejscu i czasie?',
    faq: 'Czy można połączyć ślub cywilny ze ślubem humanistycznym w tym samym miejscu i czasie?',
    caption: 'Akt małżeństwa i osobista ceremonia jednego dnia — da się.',
    slides: [
      'Tak, z mojej strony jak najbardziej. Potrzebna jest zgoda Urzędu Stanu Cywilnego — w razie potrzeby kontaktuję się z urzędnikiem.',
      'Wariant 1: wspólna, zintegrowana ceremonia. Ja prowadzę część opartą na Waszej historii i przysięgach, urzędnik dopełnia formalności.',
      'Wariant 2 (najczęstszy): ceremonia hybrydowa. Najpierw część humanistyczna z przysięgami, potem przekazuję głos urzędnikowi na podpisy.'
    ]
  },
  {
    slug: 'tradycyjna-rodzina', menu: 'Tradycyjna rodzina',
    q: 'Jak na ślub humanistyczny\nreaguje tradycyjna\nczęść rodziny?',
    faq: 'Jak na ślub humanistyczny reaguje tradycyjna część rodziny i goście, którzy nigdy nie słyszeli o takiej ceremonii?',
    caption: 'Najczęstsza obawa Par Młodych — i jak się zwykle kończy.',
    slides: [
      'To jedna z najczęstszych obaw — i zarazem moment, który po ceremonii przynosi najwięcej wzruszeń.',
      'Możemy na początku ciepło wprowadzić gości w to, czym jest ślub humanistyczny — albo po prostu przejść do Waszej historii.',
      'Efekt? To najbardziej tradycyjni goście najczęściej podchodzą po ceremonii ze łzami w oczach, mówiąc, że nigdy nie byli na czymś tak pięknym.'
    ]
  },
  {
    slug: 'dwa-jezyki', menu: 'Dwa języki',
    q: 'Czy ślub humanistyczny\nmożna poprowadzić\nw dwóch językach?',
    faq: 'Czy ślub humanistyczny można poprowadzić w dwóch językach?',
    caption: 'Ceremonia dwujęzyczna dla par międzynarodowych.',
    slides: [
      'Tak — to jedno z najbardziej naturalnych rozwiązań dla par międzynarodowych. Prowadzę ceremonie płynnie po polsku i po angielsku.',
      'Przejścia między językami są rytmiczne i naturalne, więc ceremonia zachowuje świetne tempo — bez nudnych, słownikowych tłumaczeń.',
      'Dla gości możecie przygotować eleganckie karty z tłumaczeniem przysiąg. Nikt nie czuje się widzem „drugiej kategorii”.'
    ]
  },
  {
    slug: 'stres-przy-przysiedze', menu: 'Stres przy przysiędze',
    q: 'Boimy się stresu.\nCo, jeśli zablokujemy się\nprzy przysiędze?',
    faq: 'Nie lubimy mówić publicznie i boimy się stresu. Co jeśli zablokujemy się przy przysiędze?',
    caption: 'Trema przy przysiędze? Jestem obok właśnie po to.',
    slides: [
      'Jestem obok Was właśnie po to, by znieść ten stres.',
      'Możemy powtarzać zdanie po zdaniu za mną, czytać z eleganckich, wydrukowanych kart albo przygotować krótką mikro-przysięgę.',
      'Pomogę Wam napisać tekst i tak zaplanuję przebieg ceremonii, byście czuli się w 100% swobodnie.'
    ]
  },
  {
    slug: 'jak-napisac-przysiege', menu: 'Pisanie przysięgi',
    q: 'Jak napisać\nautentyczną przysięgę\nślubną?',
    faq: 'Jak napisać autentyczną przysięgę ślubną?',
    caption: 'Przysięga, która jest w 100% Wasza — krok po kroku.',
    slides: [
      'Każda z moich Par dostaje ode mnie autorski, praktyczny poradnik — ze wskazówkami, pytaniami pomocniczymi i sprawdzonymi strukturami wypowiedzi.',
      'Wersje robocze przesyłacie mi osobno, żeby zachować sekret. Sprawdzam je pod kątem długości, rytmu i tego, by ze sobą współgrały.',
      'W dniu ślubu nie uczycie się tekstu na pamięć — czytacie z eleganckich, sztywnych kart. Lekko i bezstresowo.'
    ]
  },
  {
    slug: 'proces-przygotowan', menu: 'Proces przygotowań',
    q: 'Jak wygląda proces\nprzygotowań i ile\nspotkań nas czeka?',
    faq: 'Jak wygląda proces przygotowań i ile spotkań nas czeka?',
    caption: 'Cały proces przygotowań — od pierwszej rozmowy do dnia ślubu.',
    slides: [
      'Zaczynamy od bezpłatnej rozmowy zapoznawczej — online lub na żywo. Poznajemy się i opowiadam Wam o możliwościach.',
      'Potem umowa online, Organizacyjny Planner Ceremonii i autorskie kwestionariusze — osobny dla Niej i osobny dla Niego.',
      'Na Spotkaniu #2 przechodzimy przez scenariusz punkt po punkcie — aż powiecie: „tak, to w 100% my”.',
      'Przez cały czas przygotowań jestem do Waszej dyspozycji: pomagam z przysięgami i muzyką, odpowiadam na każde pytanie.'
    ]
  },
  {
    slug: 'oprawa-muzyczna', menu: 'Oprawa muzyczna',
    q: 'Jak wygląda oprawa\nmuzyczna i nagłośnienie\nceremonii?',
    faq: 'Jak wygląda kwestia oprawy muzycznej i nagłośnienia podczas ceremonii?',
    caption: 'Muzyka i czysty dźwięk — serce emocjonalne ceremonii.',
    slides: [
      'Muzyka i czysty dźwięk to serce emocjonalne ceremonii. Współpracuję ze sprawdzonymi muzykami: skrzypce, gitara, fortepian, wokal, harfa, kwartet smyczkowy.',
      'Razem dobieramy utwory do każdego etapu — wejście, rytuały, podpisanie certyfikatu, wyjście — od klasyki po aranżacje filmowe i popowe.',
      'Zwykle korzystam z nagłośnienia DJ-a lub obiektu, by nie generować dodatkowych kosztów. Przed ceremonią zawsze robię próbę mikrofonu.'
    ]
  },
  {
    slug: 'poza-trojmiastem', menu: 'Poza Trójmiastem',
    q: 'Czy mogę zorganizować\nceremonię poza\nTrójmiastem?',
    faq: 'Czy mogę zorganizować ceremonię poza Trójmiastem?',
    caption: 'Gdańsk, całe Trójmiasto — i dowolne miejsce w Polsce.',
    slides: [
      'Tak. Na co dzień działam w Gdańsku i całym Trójmieście.',
      'Ale chętnie przyjadę w dowolne miejsce w Polsce — szczegóły dojazdu ustalamy indywidualnie podczas naszej rozmowy.'
    ]
  },
  {
    slug: 'z-jakim-wyprzedzeniem', menu: 'Wyprzedzenie',
    q: 'Z jakim wyprzedzeniem\nnajlepiej się zgłosić?',
    faq: 'Z jakim wyprzedzeniem najlepiej się zgłosić?',
    caption: 'Kiedy się odezwać? Im wcześniej, tym spokojniej.',
    slides: [
      'Im wcześniej, tym lepiej — spokojnie zaplanujemy spotkania i dopracujemy scenariusz.',
      'Jeśli jednak Wasza data jest już blisko — napiszcie śmiało. Postaram się znaleźć rozwiązanie.'
    ]
  },
  {
    slug: 'cos-naglego', menu: 'Sytuacja losowa',
    q: 'Co, jeśli zachorujesz\nalbo zdarzy się\ncoś nagłego?',
    faq: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
    caption: 'Plan na wypadek sytuacji losowej — nigdy nie zostajecie sami.',
    slides: [
      'Wasze bezpieczeństwo jest dla mnie priorytetem.',
      'Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam.',
      'W razie sytuacji losowej Wasz dopracowany scenariusz przejmuje zastępca i prowadzi uroczystość na tym samym poziomie. Nigdy nie zostawiam Par bez wsparcia.'
    ]
  },
  {
    slug: 'deszcz-w-plenerze', menu: 'Deszcz w plenerze',
    q: 'Ceremonia w plenerze,\na spadnie deszcz.\nCo wtedy?',
    faq: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
    caption: 'Pogoda bywa zmienna — dlatego zawsze mamy Plan B.',
    slides: [
      'Już na etapie planowania ustalamy „Plan B” — namiot, zadaszoną altanę, werandę albo przeniesienie strefy ceremonii do wnętrza obiektu.',
      'Jestem przygotowana na każdą ewentualność. Scenariusz i prowadzenie dostosowuję płynnie — bez utraty magii wydarzenia.'
    ]
  }
];

// ---- shared bits -----------------------------------------------------------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');

const tones = {
  cream: {
    bg: '#f2e8db', bg2: '#ece0d0', ink: '#4a3b30', soft: '#7a6552',
    foot: '#95836f', kicker: '#9c6f4f', arrow: '#b58c68',
    photoOpacity: '0.12', photoBlend: 'multiply', sign: '#8a5a44'
  },
  brown: {
    bg: '#7a5744', bg2: '#6a4938', ink: '#f6efe5', soft: '#e9dccb',
    foot: 'rgba(246,239,229,0.62)', kicker: '#ecceac', arrow: 'rgba(246,239,229,0.72)',
    photoOpacity: '0.14', photoBlend: 'soft-light', sign: '#f3e6d5'
  }
};

function arrowSVG(color) {
  return `<svg class="arrow" viewBox="0 0 240 140" fill="none" stroke="${color}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M10 40 C 68 6, 126 8, 150 58 C 160 80, 142 106, 120 95 C 104 87, 110 60, 138 64 C 178 70, 208 92, 226 74" />
      <path d="M226 74 l -24 -2 M226 74 l -9 20" />
    </svg>`;
}

function page(t, body, opts = {}) {
  const arrow = opts.noArrow ? '' : arrowSVG(t.arrow);
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
    .frame {
      position: absolute; inset: 54px; border: 1px solid ${t.arrow};
      opacity: 0.35; pointer-events: none;
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
      font-style: italic; font-size: 24px; letter-spacing: 0.06em;
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
  <img class="bg" src="bg.jpg" alt="">
  <div class="frame"></div>
  <div class="inner">
${body}
  </div>
  ${arrow}
  <div class="foot">${HANDLE}</div>
</div>
</x-dc>
</body>
</html>
`;
}

function coverBody(t, cIndex, total, qHtml) {
  return `    <div class="kicker">FAQ &middot; Śluby humanistyczne</div>
    <div style="flex:1; display:flex; flex-direction:column; justify-content:center;">
      <h1 style="margin:0; font-weight:600; font-size:82px; line-height:1.14; letter-spacing:0.3px; text-wrap:balance;">${qHtml}</h1>
    </div>
    <div style="font-family:'Jost',system-ui,sans-serif; font-weight:300; font-size:20px; letter-spacing:0.28em; text-transform:uppercase; color:${t.soft};">${String(cIndex).padStart(2,'0')} / ${String(total).padStart(2,'0')}</div>`;
}

function answerBody(t, qShort, text, idx, count) {
  return `    <div style="text-align:center; font-style:italic; font-size:30px; line-height:1.4; color:${t.soft}; max-width:640px; margin:0 auto;">${nl2br(qShort)}</div>
    <div style="flex:1; display:flex; align-items:center; justify-content:center;">
      <p style="margin:0; text-align:center; font-weight:500; font-size:46px; line-height:1.4; letter-spacing:0.2px; max-width:820px; text-wrap:pretty;">${nl2br(text)}</p>
    </div>
    <div style="display:flex; gap:14px; justify-content:center;">
      ${Array.from({length: count}, (_, i) =>
        `<span style="width:${i===idx?'34px':'10px'}; height:10px; border-radius:6px; background:${i===idx?t.kicker:t.foot}; opacity:${i===idx?1:0.5}; transition:all .2s;"></span>`
      ).join('\n      ')}
    </div>`;
}

function ctaBody(t) {
  return `    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:6px;">
      <div style="font-style:italic; font-size:40px; color:${t.soft};">Masz pytania?</div>
      <h2 style="margin:0 0 26px; font-weight:600; font-size:56px; line-height:1.2;">Napisz do mnie<br>lub zadzwoń</h2>
      <div style="font-family:'Jost',system-ui,sans-serif; font-weight:300; font-size:34px; letter-spacing:0.14em; color:${t.ink};">${PHONE}</div>
      <div style="font-family:'Parisienne',cursive; font-size:62px; line-height:1; margin-top:34px; color:${t.sign};">${SIGN}</div>
      <div style="font-family:'Jost',system-ui,sans-serif; font-weight:300; font-size:20px; letter-spacing:0.3em; text-transform:uppercase; color:${t.soft}; margin-top:14px;">${SITE}</div>
    </div>`;
}

// ---- generate ------------------------------------------------------------
const artboards = [];       // canvas.json entries
const annotations = [];
const pages = [];
let mainName = null;

carousels.forEach((c, ci) => {
  const tone = ci % 2 === 0 ? tones.cream : tones.brown;
  const pageId = 'c' + String(ci + 1).padStart(2, '0');
  pages.push({ id: pageId, name: `${ci + 1} · ${c.menu}` });

  const qShort = c.q; // reuse cover question (with line breaks) as the small header
  const total = 1 + c.slides.length + 1;
  let sIdx = 0;

  const push = (stem, html, y = 0) => {
    const file = `${stem}.dc.html`;
    writeFileSync(new URL(`./art/${file}`, import.meta.url), html);
    artboards.push({ file, x: sIdx * (1080 + 140), y, w: 1080, h: 1080, page: pageId });
    if (!mainName) mainName = file;
    sIdx++;
  };

  const stemBase = `C${String(ci + 1).padStart(2, '0')}`;
  // cover
  const coverStem = ci === 0 ? 'Main' : `${stemBase}S1`;
  push(coverStem, page(tone, coverBody(tone, ci + 1, carousels.length, nl2br(c.q))));
  // answers
  c.slides.forEach((txt, si) => {
    push(`${stemBase}S${si + 2}`, page(tone, answerBody(tone, qShort, txt, si + 1, total - 1)));
  });
  // cta
  push(`${stemBase}S${c.slides.length + 2}`, page(tone, ctaBody(tone), { noArrow: true }));

  annotations.push({
    id: `note-${pageId}`,
    x: 0, y: -220, w: 1080, page: pageId,
    text: `PYTANIE FAQ (${c.menu})\n${c.faq}\n\nProponowany hook do opisu posta:\n„${c.caption}”`
  });
});

const canvas = {
  artboards,
  annotations,
  pages,
  launch: { view: 'canvas', page: 'c01' }
};
writeFileSync(new URL('./art/canvas.json', import.meta.url), JSON.stringify(canvas, null, 2));

console.log(`main=${mainName} artboards=${artboards.length} pages=${pages.length}`);
