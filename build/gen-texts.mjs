// Generuje teksty-slajdow.txt — JEDEN opis (do 500 znaków) na karuzelę,
// do wklejenia jako treść posta na Instagramie.
// Kolejność i nazwy karuzel czytane z pngmap*.json + canvas.json (annotations),
// żeby lista zawsze zgadzała się z artefaktami. Opisy są redagowane ręcznie
// poniżej (CAPTIONS, klucz = slug karuzeli). Po dopisaniu/zmianie karuzeli
// dodaj wpis w CAPTIONS i uruchom:  node build/gen-texts.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { tagsFor } from './hashtags.mjs';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const LIMIT = 500;

const FAQ_CAT = { slub: 'Śluby', przywitanie: 'Przywitania', pogrzeb: 'Pożegnania', odnowienie: 'Odnowienia przysięgi' };

function collect(pngmapPath, canvasPath, kind) {
  const pngmap = JSON.parse(readFileSync(join(ROOT, pngmapPath), 'utf8'));
  const canvas = JSON.parse(readFileSync(join(ROOT, canvasPath), 'utf8'));
  const noteById = new Map(canvas.annotations.map((a) => [a.id, a.text]));
  const seen = new Set();
  const groups = [];
  for (const { out } of pngmap) {
    const dir = out.slice(0, out.lastIndexOf('/'));
    if (seen.has(dir)) continue;
    seen.add(dir);
    const seg = dir.split('/');
    const cat = seg[0].replace(/^\d+-/, '');
    const cc = seg[1].match(/^(\d+)-/)?.[1];
    const slug = seg[1].replace(/^\d+-/, '');
    const noteId = kind === 'faq' ? `note-${cat}-${cc}` : `note-${slug}`;
    groups.push({ cat, slug, note: noteById.get(noteId) || '' });
  }
  return groups;
}
const noteName = (note, fb) => note.split('\n')[0].split('·').slice(1).join('·').trim() || fb;
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

// ─────────────────────────────────────────────────────────────────────
// OPISY (≤ 500 znaków). Klucz = slug karuzeli.
// ─────────────────────────────────────────────────────────────────────
const CAPTIONS = {
  // ——— ŚLUBY ———
  'moc-prawna':
    'Ślub humanistyczny nie ma mocy prawnej — i dla większości Par to nie problem, a ogromna wolność. Formalności załatwiacie w USC „w trampkach": krótki termin, tylko podpisy, bez oprawy. A prawdziwe święto — z obrączkami, osobistymi przysięgami i Waszą historią — odbywa się tam i wtedy, gdzie chcecie. Zastanawiacie się, jak to poukładać u siebie? Napiszcie do mnie. marczykowska.com',
  'cywilny-i-humanistyczny':
    'Akt małżeństwa i osobista ceremonia tego samego dnia, w tym samym miejscu? Da się — potrzebna jest zgoda USC, a w razie potrzeby sama kontaktuję się z urzędnikiem. Najczęściej robimy ceremonię hybrydową: najpierw część humanistyczna z Waszymi przysięgami, potem przekazuję głos urzędnikowi na podpisy. Chcecie tak u siebie? Napiszcie, rozrysujemy scenariusz. marczykowska.com',
  'tradycyjna-rodzina':
    '„A co powie babcia?" To jedna z najczęstszych obaw przed ślubem humanistycznym. Na początku ceremonii mogę ciepło wprowadzić gości w to, czym ona jest — albo po prostu przejść do Waszej historii. Efekt bywa zawsze podobny: to najbardziej tradycyjni goście podchodzą później ze łzami w oczach, że nigdy nie byli na czymś tak pięknym. Porozmawiajmy o Waszej ceremonii — marczykowska.com',
  'dwa-jezyki':
    'Ceremonia po polsku i po angielsku — jedno z najbardziej naturalnych rozwiązań dla par międzynarodowych. Prowadzę płynnie w obu językach, a przejścia są rytmiczne, więc ceremonia trzyma tempo, bez słownikowych tłumaczeń zdanie po zdaniu. Dla gości możecie przygotować eleganckie karty z tłumaczeniem przysiąg — nikt nie czuje się widzem drugiej kategorii. Piszcie: marczykowska.com',
  'stres-przy-przysiedze':
    'Nie lubicie mówić publicznie i boicie się, że zablokujecie się przy przysiędze? Jestem obok Was właśnie po to, żeby ten stres zdjąć. Możemy powtarzać zdanie po zdaniu za mną, czytać z eleganckich kart albo przygotować krótką mikro-przysięgę. Pomogę Wam napisać tekst i tak ułożę przebieg ceremonii, żebyście czuli się w 100% swobodnie. Napiszcie do mnie — marczykowska.com',
  'jak-napisac-przysiege':
    'Jak napisać przysięgę, która brzmi jak Wy, a nie jak cytat z internetu? Każda z moich Par dostaje ode mnie autorski poradnik — z pytaniami pomocniczymi i sprawdzonymi strukturami wypowiedzi. Wersje robocze przesyłacie mi osobno, żeby zachować sekret; sprawdzam długość, rytm i to, czy oba teksty ze sobą współgrają. W dniu ślubu czytacie z eleganckich kart. marczykowska.com',
  'proces-przygotowan':
    'Jak wygląda przygotowanie ceremonii i ile spotkań Was czeka? Zaczynamy od bezpłatnej rozmowy zapoznawczej — online lub na żywo. Potem umowa online, Organizacyjny Planner Ceremonii i autorskie kwestionariusze (osobny dla Niej, osobny dla Niego). Na kolejnym spotkaniu przechodzimy przez scenariusz punkt po punkcie, aż powiecie: „tak, to w 100% my". marczykowska.com',
  'oprawa-muzyczna':
    'Muzyka i czysty dźwięk to emocjonalne serce ceremonii. Współpracuję ze sprawdzonymi muzykami — skrzypce, gitara, fortepian, wokal, harfa, kwartet smyczkowy — i razem dobieramy utwory do każdego etapu: wejście, rytuały, podpisanie certyfikatu, wyjście. Zwykle korzystam z nagłośnienia DJ-a lub obiektu, a przed ceremonią zawsze robię próbę mikrofonu. Piszcie: marczykowska.com',
  'poza-trojmiastem':
    'Ceremonia poza Trójmiastem? Na co dzień działam w Gdańsku i całym Trójmieście, ale chętnie przyjadę w dowolne miejsce w Polsce — szczegóły dojazdu ustalamy indywidualnie podczas naszej rozmowy. Macie na oku miejsce z dala od morza? Napiszcie, sprawdzimy termin i możliwości. marczykowska.com',
  'z-jakim-wyprzedzeniem':
    'Z jakim wyprzedzeniem najlepiej się zgłosić? Im wcześniej, tym spokojniej — na luzie zaplanujemy spotkania i dopracujemy scenariusz. Ale jeśli Wasza data jest już blisko, nie skreślajcie się z góry: napiszcie śmiało, a postaram się znaleźć rozwiązanie. marczykowska.com',
  'cos-naglego':
    'Co, jeśli tuż przed ślubem coś mi się stanie? Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów — często sama ich szkoliłam. W razie sytuacji losowej Wasz dopracowany scenariusz przejmuje zastępca i prowadzi uroczystość na tym samym poziomie. Nigdy nie zostajecie bez wsparcia. marczykowska.com',
  'deszcz-w-plenerze':
    'Ceremonia w plenerze, a prognoza straszy deszczem? Już na etapie planowania ustalamy „Plan B" — namiot, zadaszoną altanę, werandę albo przeniesienie strefy ceremonii do wnętrza. Jestem przygotowana na każdą ewentualność i płynnie dostosowuję prowadzenie, bez utraty magii wydarzenia. Porozmawiajmy o Waszym dniu — marczykowska.com',

  // ——— PRZYWITANIA ———
  'placz-malucha':
    'Co, jeśli maluch się rozpłacze albo zgłodnieje w środku ceremonii? Dziecko jest głównym bohaterem tego dnia — to ceremonia dopasowuje się do niego, a nie odwrotnie. Głód, zmęczenie, potrzeba przytulenia? Robimy pauzę: karmicie, uspokajacie, wracamy. Prowadzę wszystko elastycznie i płynnie reaguję na każdą potrzebę malucha. marczykowska.com',
  'gdzie-i-kiedy':
    'Gdzie i kiedy może odbyć się przywitanie dziecka? Nie macie żadnych ograniczeń — przydomowy ogród, wynajęta sala, park, a nawet zacisze Waszego salonu. Często łączymy przywitanie z pierwszymi urodzinami, ale równie dobrze witamy kilkumiesięczne niemowlęta i starsze dzieci. Napiszcie, opowiem o możliwościach. marczykowska.com',
  'proces-przygotowan-przywitanie':
    'Wiem, jak angażująca jest opieka nad małym dzieckiem, dlatego całe przygotowanie przywitania organizuję szybko i bezstresowo. Zaczynamy od krótkiej rozmowy online lub telefonicznej, rezerwacja odbywa się w całości bez wychodzenia z domu. Wypełniacie lekki Kwestionariusz Rodzicielski, a ja piszę dedykowany scenariusz — dopracowujemy go do pełnej satysfakcji. marczykowska.com',
  'presja-chrzest':
    'Rodzina naciska na tradycyjny chrzest? Zamiast wchodzić w spory światopoglądowe, pokażcie bliskim, że nie rezygnujecie ze świętowania — po prostu robicie to w zgodzie ze sobą. Przywitanie daje rodzinie dokładnie to, czego pragnie: możliwość zgromadzenia się, wyrażenia miłości i złożenia życzeń. Podczas ceremonii podkreślam, jak ważni są dziadkowie i bliscy. marczykowska.com',
  'rodzice-honorowi':
    'Rodzice Honorowi to humanistyczny odpowiednik Rodziców Chrzestnych — bliscy, których wybieracie na przewodników dziecka. Bez zaświadczeń z parafii i kryteriów wyznaniowych: liczy się autentyczna relacja — przyjaciel, siostra, brat, ciocia. Podczas ceremonii wypowiadają własne słowa obietnicy, a na koniec podpisują pamiątkowy Akt Nominacji. marczykowska.com',
  'przygotowanie-miejsca':
    'Jak przygotować miejsce na przywitanie dziecka? Przestrzeń — ogród, sala, park czy salon — ma przede wszystkim dawać swobodę Wam, maluszkowi i gościom. Wyznaczcie estetyczną strefę centralną (drewniana ścianka, łuk z kwiatów, ulubione drzewo) i wygodny fotel na przytulenie czy karmienie. Przyda się stolik na Akty Nominacji, kącik z kocykiem i ciche nagłośnienie. marczykowska.com',
  'ile-trwa-przywitanie':
    'Ile trwa ceremonia przywitania dziecka? Zazwyczaj około 25–30 minut. To czas, który buduje wzruszający klimat, ale nie męczy głównego bohatera dnia ani innych obecnych dzieci. Długość zależy od liczby rytuałów i potrzeb malucha — jeśli trzeba, robimy naturalną pauzę, bez pośpiechu. Napiszcie, ułożymy przebieg pod Wasze dziecko. marczykowska.com',
  'cos-naglego-przywitanie':
    'Co, jeśli tuż przed uroczystością coś mi się stanie? Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam. W razie sytuacji losowej Wasz dopracowany scenariusz przejmuje zastępca i prowadzi wszystko na tym samym poziomie. Nigdy nie zostajecie bez wsparcia. marczykowska.com',
  'deszcz-przywitanie':
    'Przywitanie w plenerze, a zanosi się na deszcz? Już na etapie planowania ustalamy „Plan B" — namiot, zadaszoną altanę, werandę albo wnętrze obiektu. Jestem przygotowana na każdą ewentualność i płynnie dostosowuję prowadzenie, bez utraty magii chwili. Porozmawiajmy o Waszym dniu — marczykowska.com',

  // ——— POŻEGNANIA ———
  'obyczaje-wierzacych':
    'Jak pogodzić humanistyczne pożegnanie z potrzebami wierzących członków rodziny? Taka ceremonia nie walczy z tradycją ani z uczuciami religijnymi — jej celem jest łączenie bliskich wokół pamięci o Zmarłym. Możemy zarezerwować w scenariuszu moment na cichą modlitwę, chwilę refleksji przy muzyce lub wybrany utwór. Prowadzę z wyczuciem, klasą i szacunkiem dla każdego. marczykowska.com',
  'zbieranie-wspomnien':
    'Rozumiem, jak trudno wracać do wspomnień w pierwszym okresie żałoby — cały proces prowadzę z delikatnością i bez presji. Spotykamy się na spokojnej rozmowie: pytam, jakim człowiekiem był Zmarły, co kochał, z czego był dumny. Przesyłam też delikatny formularz dla rodziny i przyjaciół. Na podstawie Waszych słów piszę mowę pożegnalną i daję ją do wglądu. marczykowska.com',
  'glos-rodziny':
    'Czy rodzina lub przyjaciele mogą zabrać głos podczas pożegnania? Tak — to bardzo poruszający, choć całkowicie dobrowolny akcent. Bliscy mogą odczytać krótkie wspomnienie, wiersz, list albo po prostu powiedzieć kilka słów od serca. A jeśli emocje nie pozwolą wystąpić na żywo, wystarczy przekazać mi tekst — przeczytam go w Waszym imieniu, z szacunkiem. marczykowska.com',
  'cos-naglego-pogrzeb':
    'Co, jeśli tuż przed ceremonią coś mi się stanie? Wasze bezpieczeństwo jest priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam. W razie sytuacji losowej dopracowany scenariusz przejmuje zastępca i prowadzi uroczystość na tym samym poziomie. Nigdy nie zostawiam Rodziny bez wsparcia. marczykowska.com',
  'deszcz-pogrzeb':
    'Pożegnanie w plenerze, a pada deszcz? Już na etapie planowania ustalamy „Plan B" — namiot, zadaszoną altanę, werandę albo wnętrze obiektu. Jestem przygotowana na każdą ewentualność i płynnie dostosowuję prowadzenie, bez utraty powagi chwili. marczykowska.com',

  // ——— ODNOWIENIA PRZYSIĘGI ———
  'dobry-moment':
    'Kiedy jest dobry moment na odnowienie przysięgi małżeńskiej? Każdy. Najczęściej Pary wybierają okrągłe rocznice — 5., 10., 20., 50. — ale nie ma tu żadnych sztywnych reguł. To piękny gest także po trudniejszym czasie w związku albo wtedy, gdy po prostu chcecie uroczystość na własnych zasadach, bez presji. Napiszcie, zaplanujemy Wasz dzień. marczykowska.com',
  'nowe-slowa':
    'Nie chcecie „powtarzać" starej przysięgi po latach? Nie musicie. Po latach wspólnego życia przysięga ma zupełnie inny wymiar — znacie się lepiej, wiecie, czym jest codzienne wsparcie i co razem zbudowaliście. Przesyłam Wam autorski poradnik i pomagam wyciągnąć najważniejsze punkty Waszej historii. W dniu ceremonii czytacie z eleganckich kart, bez tremy. marczykowska.com',
  'proces-przygotowan-odnowienie':
    'Jak wygląda przygotowanie odnowienia przysięgi? Zaczynamy od bezpłatnej rozmowy zapoznawczej, podczas której omawiamy Waszą wizję. Wypełniacie formularze o najpiękniejszych wspomnieniach, przełomowych momentach i tym, za co najbardziej się cenicie. Na tej podstawie piszę dedykowany scenariusz, dopracowujemy go razem, a w dniu wydarzenia dbam o całą reżyserię. marczykowska.com',
  'wlaczyc-dzieci':
    'Jak włączyć w odnowienie przysięgi dzieci i bliskich? To jeden z najpiękniejszych elementów tego dnia. Dzieci mogą wręczyć Wam nowe lub odświeżone obrączki, odczytać wiersz albo wypowiedzieć krótkie podziękowanie. Mogą też wziąć udział we wspólnym rytuale — świeca jedności, sadzenie drzewa. Cała rodzina czuje się wtedy ważną częścią uroczystości. marczykowska.com',
  'cos-naglego-odnowienie':
    'Co, jeśli tuż przed ceremonią coś mi się stanie? Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam. W razie sytuacji losowej Wasz dopracowany scenariusz przejmuje zastępca i prowadzi uroczystość na tym samym poziomie. marczykowska.com',
  'deszcz-odnowienie':
    'Odnowienie przysięgi w plenerze, a zapowiada się deszcz? Już na etapie planowania ustalamy „Plan B" — namiot, zadaszoną altanę, werandę albo wnętrze obiektu. Jestem przygotowana na każdą ewentualność i płynnie dostosowuję prowadzenie, bez utraty magii wydarzenia. marczykowska.com',

  // ——— KAMPANIE ———
  'rocznice-slubu':
    'Rocznica drewniana, srebrne gody, rocznica diamentowa — każdy jubileusz małżeński ma swoją nazwę i swój symbol. Drewno nabiera słojów, perła rośnie wokół ziarnka, które kiedyś uwierało, diament powstaje pod ciśnieniem, którego nic innego by nie przetrwało. Piękne metafory tego, co budujecie latami. Zbliża się Wasza okrągła rocznica? Zaplanujcie z nami odnowienie przysięgi. marczykowska.com',
  'jubileusze':
    'Wiecie, że każdy rok małżeństwa ma swoją nazwę? 1. papierowa, 5. drewniana, 15. kryształowa, 25. srebrna, 40. rubinowa, 50. złota, 60. diamentowa, aż po 80. dębową. Pełną listę — rok po roku — znajdziecie w tej karuzeli. Sprawdźcie, jaki jubileusz świętujecie w tym roku. A jeśli to ten okrągły — odnówcie przy tej okazji przysięgę. Napiszcie: marczykowska.com',
  'pary-lgbtq-promocja':
    'Od 23 sierpnia 2026 każdy urząd stanu cywilnego w Polsce może wpisać do rejestru zagraniczny akt małżeństwa pary jednopłciowej (źródło: rp.pl). To jeszcze nie równość małżeńska — ale realny krok i dobry moment, żeby świętować po swojemu. Ceremonia humanistyczna nigdy nie pytała o płeć ani o paragraf. Wszystkie ceremonie dla par LGBTQ+ z terminem w 2026 roku — 20% zniżki. Napiszcie do mnie: marczykowska.com',
  'mity':
    '„To nie jest prawdziwy ślub." „Bez księdza będzie zimno." „To moda, która minie." Ile z tych zdań słyszeliście, planując ślub humanistyczny? W tej karuzeli rozprawiam się po kolei z pięcioma najczęstszymi mitami — spokojnie i bez spinania się. Bo humanistyczna ceremonia bywa bardziej wzruszająca niż niejeden „prawdziwy" ślub. Macie wątpliwość, której tu nie ma? Napiszcie. marczykowska.com',
  'rytualy-jednosci':
    'Piasek, świeca jedności, sadzenie drzewa, list i wino zamknięte w skrzynce, handfasting — czyli wiązanie dłoni wstążką. Rytuały jedności to symboliczny moment ceremonii, który zostaje w pamięci gości i na zdjęciach. W tej karuzeli opisuję pięć z nich i podpowiadam, komu który pasuje. Nie wiecie, co wybrać? Pomogę Wam przy planowaniu scenariusza. marczykowska.com',
  'cennik':
    'Ceremonia trwa pół godziny — ale jej przygotowanie to tygodnie: rozmowy, kwestionariusze, pisanie scenariusza od zera pod Waszą historię, pomoc z przysięgami i muzyką, reżyseria dnia, próba mikrofonu, plan B na pogodę. Płacicie też za doświadczenie i sieć zastępców na wypadek sytuacji losowej. Konkretną wycenę podaję po bezpłatnej rozmowie, bez zobowiązań. marczykowska.com',
  'pory-roku':
    'Wiosna to świeża zieleń i długie światło, lato — ciepłe wieczory, jesień — złote słońce i mniej obłożone terminy, zima — świece, wnętrza i kameralny klimat. Każda pora roku daje ceremonii coś innego. W tej karuzeli podpowiadam, na co zwrócić uwagę przy każdej z nich. Wybraliście już swój sezon? Sprawdźmy wolne terminy — marczykowska.com',
  'wolne-terminy':
    'Sezon 2026 powoli domykamy — zostały pojedyncze wolne soboty. Kalendarz na 2027 jest już otwarty, a najlepsze terminy (długie weekendy, czerwcowe soboty) rezerwują się najszybciej. Rezerwacja jest prosta: krótka rozmowa, umowa online, zaliczka — i termin jest Wasz. Macie datę? Napiszcie, odpowiem szybko. marczykowska.com',
};
// Karuzele wymagające weryfikacji treści przed publikacją.
const REVIEW = { 'wolne-terminy': 'Zweryfikuj realną dostępność terminów 2026/2027 — liczby są szablonowe.' };

// ─────────────────────────────────────────────────────────────────────
const O = [];
const p = (x = '') => O.push(x);
let over = [];

p('OPISY POSTÓW — KARUZELE NA INSTAGRAM');
p('Milena Marczykowska · marczykowska.com');
p(`Wygenerowano: ${new Date().toISOString().slice(0, 10)}`);
p('');
p('Jeden opis na karuzelę, do 500 znaków — gotowy do wklejenia jako treść posta.');
p('„Hook" to propozycja pierwszego zdania / haczyka, jeśli wolisz zacząć od niego.');
p('Pod opisem 5 dopasowanych hashtagów — te same co w opisy-rozbudowane.txt.');

function emit(g, labelPrefix) {
  const name = noteName(g.note, g.slug);
  const hook = noteHook(g.note);
  const cap = CAPTIONS[g.slug];
  p('');
  p('───────────────────────────────────────────────');
  p(`${labelPrefix}${name}`);
  if (hook) p(`Hook: „${hook}"`);
  if (REVIEW[g.slug]) p(`⚠ ${REVIEW[g.slug]}`);
  p('');
  if (!cap) { p('[BRAK OPISU — dopisz w CAPTIONS]'); over.push(`${g.slug}: brak opisu`); return; }
  p(`Opis (${cap.length} znaków):`);
  p(cap);
  p('');
  p(`Hashtagi: ${tagsFor(g.cat, g.slug)}`);
  if (cap.length > LIMIT) over.push(`${g.slug}: ${cap.length} znaków (limit ${LIMIT})`);
}

p('');
p('═══════════════════════════════════════════════════════════════════');
p('  CZĘŚĆ 1 — FAQ');
p('═══════════════════════════════════════════════════════════════════');
const faq = collect('art/pngmap.json', 'art/canvas.json', 'faq');
const byCat = {};
for (const g of faq) (byCat[g.cat] ||= []).push(g);
for (const [cat, list] of Object.entries(byCat)) {
  p('');
  p('═══ KATEGORIA: ' + (FAQ_CAT[cat] || cat).toUpperCase() + ' ═══');
  list.forEach((g, i) => emit(g, `KARUZELA ${i + 1}/${list.length} — `));
}

p('');
p('');
p('═══════════════════════════════════════════════════════════════════');
p('  CZĘŚĆ 2 — KAMPANIE');
p('═══════════════════════════════════════════════════════════════════');
const kamp = collect('pngmap-kampanie.json', 'kampanie/canvas.json', 'kamp');
kamp.forEach((g) => emit(g, 'KARUZELA — '));

p('');
const text = O.join('\n') + '\n';
const targets = [fileURLToPath(new URL('../teksty-slajdow.txt', import.meta.url))];
const desktop = join(homedir(), 'Desktop', 'faq-carousele-slajdy');
if (existsSync(desktop)) targets.push(join(desktop, 'teksty-slajdow.txt'));
for (const t of targets) writeFileSync(t, text);

console.log('wrote:', targets.join(', '));
console.log(`karuzele: ${faq.length} FAQ + ${kamp.length} kampanie = ${faq.length + kamp.length}`);
const lens = [...faq, ...kamp].map((g) => CAPTIONS[g.slug]?.length).filter(Boolean);
console.log(`opisy: min ${Math.min(...lens)} / max ${Math.max(...lens)} znaków`);
if (over.length) { console.error('PROBLEMY:\n  ' + over.join('\n  ')); process.exit(1); }
console.log('wszystkie opisy ≤', LIMIT, 'znaków ✓');
