// Generuje opisy-rozbudowane.txt — jeden ROZBUDOWANY opis (do 4000 znaków)
// na karuzelę, do wklejenia jako pełna treść posta (Instagram / Facebook / blog).
// Kolejność i nazwy karuzel z pngmap*.json + canvas.json. Opisy redagowane
// ręcznie poniżej (LONG, klucz = slug). Hashtagi dobierane per kategoria.
//   node build/gen-opisy-long.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const LIMIT = 4000;
const FAQ_CAT = { slub: 'Śluby', przywitanie: 'Przywitania', pogrzeb: 'Pożegnania', odnowienie: 'Odnowienia przysięgi' };

function collect(pngmapPath, canvasPath, kind) {
  const pngmap = JSON.parse(readFileSync(join(ROOT, pngmapPath), 'utf8'));
  const canvas = JSON.parse(readFileSync(join(ROOT, canvasPath), 'utf8'));
  const noteById = new Map(canvas.annotations.map((a) => [a.id, a.text]));
  const seen = new Set(); const groups = [];
  for (const { out } of pngmap) {
    const dir = out.slice(0, out.lastIndexOf('/'));
    if (seen.has(dir)) continue; seen.add(dir);
    const seg = dir.split('/');
    const cat = seg[0].replace(/^\d+-/, '');
    const cc = seg[1].match(/^(\d+)-/)?.[1];
    const slug = seg[1].replace(/^\d+-/, '');
    groups.push({ cat, slug, note: noteById.get(kind === 'faq' ? `note-${cat}-${cc}` : `note-${slug}`) || '' });
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

const CTA = 'Napiszcie do mnie w wiadomości prywatnej lub przez marczykowska.com — pierwsza rozmowa zapoznawcza jest bezpłatna i do niczego nie zobowiązuje.';
const CTA_R = CTA;
const CTA_ODN = 'Jeśli zbliża się Wasza rocznica — napiszcie do mnie w wiadomości prywatnej lub przez marczykowska.com. Zaplanujemy odnowienie przysięgi na Waszych zasadach.';
const CTA_POZ = 'Jeśli mogę Wam w tym pomóc, jestem do dyspozycji — przez marczykowska.com lub w wiadomości prywatnej.';

const HT_CORE = '#ślubhumanistyczny #ceremoniahumanistyczna #mistrzceremonii #celebrantka #ślubtrójmiasto #ślubgdańsk #ślubsopot #ślubgdynia';
const HT = {
  slub: `${HT_CORE} #ślub2026 #ślub2027 #ślubwplenerze #paramłoda #pannamłoda #przysięgaślubna #ślubneinspiracje #wesele #zaślubiny`,
  przywitanie: '#przywitaniedziecka #ceremoniapowitania #powitaniedziecka #rodzicehonorowi #humanistyczneprzywitanie #alternatywadlachrztu #roczek #celebrantka #trójmiasto #gdańsk #rodzina #maluch',
  pogrzeb: '#pożegnaniehumanistyczne #ceremoniapożegnania #humanistycznypożegnanie #mowapożegnalna #świeckipogrzeb #celebrantka #mistrzceremonii #trójmiasto #gdańsk #pamięć',
  odnowienie: `${HT_CORE} #odnowienieprzysięgi #odnowienieprzysiegimałżeńskiej #rocznicaślubu #jubileuszmałżeński #paramałżeńska #miłośćpolatach`,
};

// ─────────────────────────────────────────────────────────────────────
// ROZBUDOWANE OPISY (≤ 4000 znaków). Klucz = slug karuzeli.
// ─────────────────────────────────────────────────────────────────────
const LONG = {
  // ═══ ŚLUBY ═══
  'moc-prawna': `Czy ślub humanistyczny ma moc prawną? To pytanie słyszę najczęściej i doskonale rozumiem, skąd bierze się niepokój. Odpowiedź jest prosta: nie, ślub humanistyczny nie wywołuje skutków prawnych w rozumieniu polskiego prawa. Ale dla większości moich Par nie jest to przeszkoda, tylko ogromna wolność.

Ślub humanistyczny to w pełni personalizowana ceremonia, skoncentrowana na Waszych wartościach, emocjach i autentycznej historii — bez sztywnych schematów i urzędowego pośpiechu. Jeśli zależy Wam również na formalnym statusie małżeństwa, najczęściej wybieranym rozwiązaniem jest tzw. „ślub cywilny w trampkach".

Jak to wygląda w praktyce? Formalności załatwiacie na luzie: umawiacie się w Urzędzie Stanu Cywilnego na krótki termin, często w środku tygodnia, bez zbędnej oprawy. Składacie podpisy — tylko Wy, urzędnik oraz świadkowie lub najbliższa rodzina. A prawdziwe święto na Waszych zasadach, czyli właściwy ślub humanistyczny, odbywa się w wybranym przez Was dniu i wymarzonym miejscu: w ogrodzie, na plaży, w stodole czy na dachu. To wtedy nakładacie obrączki, czytacie osobiste przysięgi i świętujecie ze wszystkimi gośćmi dokładnie tak, jak naprawdę tego chcecie.

Dzięki temu formalności macie „odhaczone" bez stresu, a sam dzień ślubu należy w 100% do Was — bez dostosowywania się do grafiku urzędnika i ograniczeń lokalowych.

Zastanawiacie się, jak poukładać to u siebie? ${CTA}`,

  'cywilny-i-humanistyczny': `Akt małżeństwa i osobista, emocjonalna ceremonia tego samego dnia, w tym samym miejscu — bez rozbijania wydarzenia na dwa terminy? Z mojej strony jak najbardziej się da. To świetne rozwiązanie, jeśli zależy Wam zarówno na formalnym statusie, jak i na oprawie, która naprawdę o Was opowiada.

Wymagana jest zgoda Urzędu Stanu Cywilnego na połączenie ceremonii — jeśli będzie taka potrzeba, sama kontaktuję się z urzędnikiem. Realizujemy to na jeden z dwóch sposobów.

Wspólna, zintegrowana ceremonia. Jeśli Kierownik USC wyrazi zgodę na płynne połączenie części urzędowej i humanistycznej, tworzymy jeden spójny scenariusz: ja prowadzę część opartą na Waszej historii, osobistych przysięgach i wybranym symbolizmie, a urzędnik w odpowiednim momencie dopełnia wymaganych prawem procedur i przyjmuje oficjalne oświadczenia.

Ceremonia hybrydowa krok po kroku — wariant najczęstszy. Jeśli urzędnik woli przeprowadzić swoją procedurę niezależnie, układamy to w płynną całość: na przykład o 15:30 zaczynamy Waszą ceremonię humanistyczną — wprowadzam gości w Waszą historię, czytacie osobiste przysięgi i przeżywacie najważniejsze emocje — a o 16:00 przekazuję głos urzędnikowi, który przechodzi do zwięzłej formalności i podpisów.

W obu wariantach goście dostają jedno spójne, piękne wydarzenie, a Wy — akt małżeństwa i ceremonię, którą naprawdę zapamiętacie.

${CTA}`,

  'tradycyjna-rodzina': `„A co powie babcia?" To jedna z najczęstszych obaw Par Młodych przed ślubem humanistycznym — i zarazem moment, który po ceremonii przynosi najwięcej wzruszeń.

Wielu gości ze starszych pokoleń jest przyzwyczajonych do utartych schematów: ślubu kościelnego albo krótkiej urzędowej formułki. Na początku po prostu nie wiedzą, czego się spodziewać. Możemy to złagodzić na dwa sposoby.

Albo na początku ceremonii ciepło i prosto wprowadzę gości w to, czym jest ślub humanistyczny i dlaczego wybraliście taką formę celebrowania miłości. Albo w ogóle pomijamy etykiety i po prostu przechodzimy do Waszej historii — dla gości będzie to piękna, wzruszająca i osobista uroczystość, bez potrzeby tłumaczenia.

Zamiast sztywnych regułek rodzina słyszy opowieść o miłości i wspólnych wartościach. Całość prowadzę z klasą, wyczuciem i szacunkiem do wszystkich obecnych.

Efekt? To właśnie najbardziej tradycyjni członkowie rodziny najczęściej podchodzą po ceremonii ze łzami w oczach, mówiąc, że nigdy na czymś takim nie byli — a było to najpiękniejsze, co widzieli.

${CTA}`,

  'dwa-jezyki': `Ślub w dwóch językach to jedno z najbardziej naturalnych rozwiązań dla par międzynarodowych, dla których ślub w Polsce bywa wyzwaniem. Urzędowe bariery, sztywny styl, poczucie wykluczenia połowy gości czy obowiązkowa obecność tłumacza przysięgłego potrafią odebrać całą magię chwili.

Prowadzę ceremonie płynnie po polsku i po angielsku, dbając o to, żeby słowa miały dokładnie taką samą wagę dla obu stron sali — bez nudnych, słownikowych tłumaczeń zdanie po zdaniu. Przejścia między językami w trakcie opowiadania Waszej historii są naturalne i rytmiczne, dzięki czemu ceremonia zachowuje świetne tempo.

Jeśli chcecie przeczytać przysięgi bez przerywania — na przykład w całości po angielsku albo po polsku — możecie przygotować dla gości eleganckie, wydrukowane karty z tłumaczeniem. Słyszą wtedy Wasze autentyczne emocje i głos, a jednocześnie słowo w słowo rozumieją sens.

Dzięki temu ceremonia staje się prawdziwym pomostem między dwiema kulturami, a żaden z gości nie czuje się widzem „drugiej kategorii".

${CTA}`,

  'stres-przy-przysiedze': `„Nie lubimy mówić publicznie. Co, jeśli zablokujemy się przy przysiędze?" Jestem obok Was właśnie po to, żeby ten stres zdjąć.

Jeśli obawiacie się czytania własnych słów przed wszystkimi, mamy kilka sprawdzonych rozwiązań. Możecie powtarzać przysięgę zdanie po zdaniu za mną. Możecie czytać z eleganckich, sztywnych kart, z których czyta się lekko i bez tremy. Możecie też przygotować krótką mikro-przysięgę — kilka mocnych zdań zamiast długiego tekstu.

Pomogę Wam napisać ten tekst i tak zaplanuję przebieg całej ceremonii, żebyście czuli się w 100% swobodnie. Nikt Was nie zostawia sam na sam z mikrofonem i tremą.

Najczęściej okazuje się, że moment, którego Para bała się najbardziej, jest później tym, który wspomina jako najpiękniejszy.

${CTA}`,

  'jak-napisac-przysiege': `Jak napisać przysięgę, która brzmi jak Wy, a nie jak cytat z internetu? Dla wielu Par to najbardziej poruszający, ale i najbardziej stresujący element przygotowań. Pytania „od czego zacząć" albo „co, jeśli zablokuje mnie trema" są zupełnie naturalne — i nie musicie zostawać z nimi sami.

Każda z moich Par otrzymuje ode mnie autorski, praktyczny poradnik po pisaniu przysięgi: ze wskazówkami, pytaniami pomocniczymi i sprawdzonymi strukturami wypowiedzi. Przesyłacie mi swoje wersje robocze osobno, żeby zachować sekret przed drugą połówką, a ja sprawdzam je pod kątem długości, rytmu i dynamiki. Podpowiadam szlify i dbam o to, żeby Wasze wypowiedzi idealnie ze sobą współgrały — żeby jedna nie była trzy razy dłuższa od drugiej i żeby razem tworzyły całość.

W dniu ślubu nie musicie uczyć się niczego na pamięć. Większość moich Par czyta z eleganckich, sztywnych kart. A jeśli bardzo obawiacie się dłuższego tekstu, możemy ułożyć przysięgę w formie krótkich zdań powtarzanych za mną albo mikro-deklaracji.

Dzięki temu tekst, który wypowiecie, będzie w 100% Wasz — głęboki i prawdziwy.

${CTA}`,

  'proces-przygotowan': `Jak wygląda przygotowanie ceremonii i ile spotkań Was czeka? Proces jest prosty, bezstresowy i poukładany tak, żeby przygotowania były przyjemnością, a nie kolejnym obowiązkiem na ślubnej liście zadań.

Zaczynamy od bezpłatnej, niezobowiązującej rozmowy zapoznawczej — online lub na żywo. Poznajemy się bliżej, a ja opowiadam Wam o możliwościach. Jeśli poczujecie, że to jest to, przechodzimy do formalności: cały proces podpisania umowy odbywa się szybko i wygodnie online.

Następnie przesyłam Wam Organizacyjny Planner Ceremonii oraz autorskie kwestionariusze — osobny dla Niej i osobny dla Niego. Pomagają mi odkryć najważniejsze momenty Waszej relacji, Wasz język emocji i poczucie humoru.

Gdy spłyną do mnie odpowiedzi, tworzę wstępny scenariusz i spotykamy się ponownie (Spotkanie #2), żeby przejść przez niego punkt po punkcie, dopasować rytuały i oprawę muzyczną — aż stwierdzicie: „tak, to w 100% my".

Nasza relacja nie kończy się na dwóch spotkaniach. Przez cały okres przygotowań jestem do Waszej pełnej dyspozycji: pomagam w pisaniu przysiąg, konsultuję dobór muzyki i odpowiadam na każde pytanie, które pojawi się po drodze.

${CTA}`,

  'oprawa-muzyczna': `Muzyka i czysty dźwięk to serce emocjonalne każdej ceremonii. Budują napięcie przy wejściu, podkreślają najpiękniejsze momenty przysięgi i sprawiają, że każdy gość naprawdę słyszy Wasze słowa.

Współpracuję z wykwalifikowanymi muzykami — skrzypaczkami, gitarzystami, pianistami, wokalistami, harfistkami czy kwartetami smyczkowymi — których polecam wyłącznie po wcześniejszej współpracy na żywo. Razem przechodzimy przez poszczególne etapy ceremonii: wejście, rytuały, podpisanie certyfikatu, wyjście — i dobieramy utwory, które oddają Wasz klimat, od klasyki po aranżacje filmowe i popowe.

Zwykle korzystam z nagłośnienia i mikrofonów zapewnionych przez Waszego DJ-a, zespół lub obiekt, żeby nie generować dodatkowych kosztów. Jeśli nie macie własnej oprawy z nagłośnieniem, zorganizuję jego wynajem.

Przed ceremonią zawsze robię odprawę z osobą odpowiedzialną za dźwięk i próbę mikrofonu — chcę mieć pewność, że wszystko działa bez zarzutu. Dbam też o pełną synchronizację mowy z muzyką, żeby oprawa płynęła naturalnie z moimi słowami, a Wy mogli skupić się wyłącznie na emocjach.

${CTA}`,

  'poza-trojmiastem': `Ceremonia poza Trójmiastem? Jak najbardziej.

Na co dzień działam w Gdańsku i całym Trójmieście, ale chętnie przyjadę w dowolne miejsce w Polsce — nad jezioro, w góry, do rodzinnej wsi, do dworu czy stodoły, w którą się zakochaliście. Szczegóły dojazdu i ewentualnego noclegu ustalamy indywidualnie podczas naszej rozmowy, spokojnie i transparentnie.

Miejsce, w którym bierzecie ślub, powinno mieć dla Was znaczenie — a nie być kompromisem podyktowanym tym, kto akurat jest w okolicy.

Macie na oku lokalizację z dala od morza? Sprawdzimy termin i możliwości razem. ${CTA_R}`,

  'z-jakim-wyprzedzeniem': `Z jakim wyprzedzeniem najlepiej się zgłosić?

Im wcześniej, tym spokojniej. Dzięki temu bez pośpiechu zaplanujemy spotkania, dopracujemy scenariusz, dacie sobie czas na napisanie przysiąg i wybór oprawy muzycznej. Najlepsze terminy — długie weekendy, soboty w pełni sezonu — rezerwują się z dużym wyprzedzeniem.

Ale jeśli Wasza data jest już blisko, nie skreślajcie się z góry. Napiszcie śmiało — sprawdzę kalendarz i postaram się znaleźć rozwiązanie. Jeśli sama nie będę mogła, mam sieć sprawdzonych celebrantów, których często osobiście szkoliłam.

${CTA_R}`,

  'cos-naglego': `„Co, jeśli tuż przed ślubem coś Ci się stanie?" To ważne pytanie i cieszę się, gdy Pary je zadają — bo znaczy, że myślą o swoim dniu poważnie.

Wasze bezpieczeństwo jest dla mnie priorytetem. Nie działam w pojedynkę: współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam i którym ufam.

W razie sytuacji losowej — nagłej choroby, wypadku, zdarzenia rodzinnego — Wasz dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi uroczystość na tym samym, najwyższym poziomie. Cała praca, którą razem włożyliśmy w Waszą ceremonię, nie przepada.

Nigdy nie zostawiam Par bez wsparcia. ${CTA}`,

  'deszcz-w-plenerze': `Ceremonia w plenerze, a prognoza straszy deszczem? Pogoda bywa zmienna — dlatego już na etapie planowania ustalamy „Plan B".

To może być namiot, zadaszona altana, weranda albo przeniesienie strefy ceremonii do wnętrza obiektu. Omawiamy to z Wami i z obiektem zawczasu, żeby w dniu ślubu nikt nie musiał podejmować nerwowych decyzji w ostatniej chwili.

Jestem przygotowana na każdą ewentualność. Scenariusz i prowadzenie dostosowuję płynnie do nowych warunków — krótsze wejście, inne ustawienie, zmiana kolejności — bez utraty magii wydarzenia. Deszczowy ślub potrafi być równie piękny jak słoneczny, a często daje najbardziej klimatyczne zdjęcia.

Porozmawiajmy o Waszym dniu i o tym, jak zabezpieczyć go na każdą pogodę. ${CTA_R}`,

  // ═══ PRZYWITANIA ═══
  'placz-malucha': `„Co, jeśli maluszek się rozpłacze, zgłodnieje albo będzie potrzebował przewinięcia w środku ceremonii?"

Dziecko jest głównym bohaterem tego dnia — to ceremonia dostosowuje się do niego, a nie dziecko do ceremonii. Nie ma tu żadnego stresu ani sztywnego reżimu.

Jeśli maluch poczuje głód, zmęczenie albo potrzebę przytulenia, po prostu robimy pauzę: karmicie, uspokajacie, wracamy. Prowadzę wydarzenie elastycznie i potrafię płynnie zareagować na każdą potrzebę malucha — skrócić fragment, przesunąć rytuał, dać Wam chwilę.

Chodzi o to, żebyście Wy i Wasza pociecha czuli pełen komfort i spokój, a goście — że uczestniczą w czymś naturalnym i ciepłym, a nie w sztywnej inscenizacji.

${CTA_R}`,

  'gdzie-i-kiedy': `Gdzie i kiedy może odbyć się przywitanie dziecka? Nie macie żadnych ograniczeń — ani lokalizacyjnych, ani kalendarzowych.

Ceremonia może odbyć się w Waszym przydomowym ogrodzie, w wynajętej sali restauracyjnej, w parku, a nawet w zaciszu Waszego salonu. Liczy się to, żeby miejsce było Wasze i wygodne dla maluszka oraz gości.

Przywitanie często łączone jest z pierwszymi urodzinami dziecka (Roczkiem), ale nie ma tu sztywnej reguły. Witamy zarówno kilkumiesięczne niemowlęta, jak i nieco starsze dzieci — czasem rodzeństwo naraz.

Pomogę Wam wybrać moment, który będzie najlepszy dla Waszej rodziny. ${CTA_R}`,

  'proces-przygotowan-przywitanie': `Jak wygląda przygotowanie przywitania dziecka i ile czasu musicie na to poświęcić? Wiem, jak angażująca jest opieka nad małym dzieckiem, dlatego cały proces organizuję szybko i bezstresowo.

Zaczynamy od krótkiej rozmowy wstępnej — online lub telefonicznej — podczas której poznajemy się i omawiamy Waszą wstępną wizję. Rezerwacja odbywa się w pełni online, bez wychodzenia z domu.

Następnie przesyłam Wam lekki Kwestionariusz Rodzicielski: pytania o maluszka, o Wasze wartości i o historię wybrania imienia. Na tej podstawie piszę dedykowany scenariusz, który wspólnie dopracowujemy do 100% satysfakcji.

Nie zabieram Wam wieczorów ani energii, których teraz potrzebujecie gdzie indziej. Prowadzę Was za rękę przez cały proces.

${CTA_R}`,

  'presja-chrzest': `Czujecie presję ze strony rodziny na tradycyjny chrzest? To jeden z najtrudniejszych momentów dla młodych rodziców.

Zamiast wchodzić w spory światopoglądowe, warto pokazać bliskim, że nie rezygnujecie ze świętowania — po prostu robicie to w zgodzie ze sobą. Przywitanie dziecka daje rodzinie dokładnie to, czego pragnie: możliwość zgromadzenia się, wyrażenia miłości, złożenia życzeń i podarowania maluszkowi wsparcia.

Podczas ceremonii w piękny sposób pokazuję, jak ważną rolę w życiu dziecka pełnią dziadkowie i najbliżsi. Wyznaczacie Rodziców Honorowych, są osobiste obietnice, wspólne rytuały. To wszystko sprawia, że napięcie zwykle rozbraja się samo — bo babcia i dziadek dostają swoje miejsce w tej historii.

Chętnie opowiem, jak może wyglądać taka uroczystość u Was. ${CTA_R}`,

  'rodzice-honorowi': `Kim są Rodzice Honorowi i jaka jest ich rola? To humanistyczny odpowiednik tradycyjnych Rodziców Chrzestnych — wyznaczeni przez Was bliscy, którzy mają być dla dziecka źródłem mądrości, wsparcia i serca. Bywają nazywani też Rodzicami Wspierającymi albo Przewodnikami.

Podczas ceremonii humanistycznej nie wymagamy żadnych zaświadczeń z parafii ani spełniania kryteriów wyznaniowych. Liczy się autentyczna relacja — więc mogą to być Wasi ulubieni ludzie: przyjaciele, siostra, brat, ciocia.

W trakcie uroczystości Rodzice Honorowi wypowiadają własne słowa obietnicy dla maluszka — deklarują obecność, wsparcie w trudnych momentach i wspólne odkrywanie świata. Zwieńczeniem tej roli jest podpisanie i wręczenie pamiątkowych, eleganckich Aktów Nominacji na Rodziców Honorowych.

To gest, który zostaje z rodziną na lata. ${CTA_R}`,

  'przygotowanie-miejsca': `Jak przygotować miejsce na przywitanie dziecka? Ceremonia ma ciepły, rodzinny charakter, dlatego przestrzeń — ogród, sala, park czy Wasz salon — powinna przede wszystkim dawać poczucie swobody Wam, maluszkowi i gościom.

Warto wyznaczyć estetyczną strefę centralną, w której stanę ja, Wy z dzieckiem i Rodzice Honorowi: eleganckie tło, drewniana ścianka, łuk z kwiatów albo ulubione drzewo w ogrodzie. Obok niej przyda się wygodny fotel lub kanapa dla Was — na wypadek, gdyby maluch potrzebował przytulenia czy nakarmienia.

Przyda się też mały stolik na Akty Nominacji dla Rodziców Honorowych oraz akcesoria do rytuałów (np. Kapsułę Czasu czy Księgę Życzeń). Dla najmłodszych gości warto przewidzieć swobodniejszy kącik z kocykiem albo pufami.

Nagłośnienie ustawiamy dyskretnie i cicho — tak, żeby głośność była bezpieczna i komfortowa dla wrażliwych uszu malucha.

Wszystko to omawiamy wcześniej, żebyście w dniu ceremonii nie musieli o niczym myśleć. ${CTA_R}`,

  'ile-trwa-przywitanie': `Ile trwa ceremonia przywitania dziecka? Zazwyczaj około 25–30 minut.

To optymalny czas: pozwala zbudować piękny, wzruszający klimat, ale nie męczy głównego bohatera dnia ani innych obecnych na uroczystości dzieci.

Dokładna długość zależy od kilku rzeczy — liczby wybranych rytuałów (osobiste obietnice Rodziców Honorowych, sadzenie drzewka, wpisy do księgi pamiątkowej), oprawy muzycznej oraz potrzeb samego maluszka. Jeśli dziecko będzie potrzebowało chwili na przytulenie albo wyciszenie, robimy naturalną pauzę, bez pośpiechu.

Krótko, ciepło, na temat — i z przestrzenią na emocje.

${CTA_R}`,

  'cos-naglego-przywitanie': `„Co, jeśli tuż przed uroczystością coś Ci się stanie?" Cieszę się, gdy rodzice o to pytają.

Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam.

W razie sytuacji losowej — nagłej choroby czy zdarzenia rodzinnego — Wasz dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi ceremonię na tym samym, najwyższym poziomie. Cała praca, którą razem włożyliśmy w przywitanie Waszego dziecka, nie przepada.

Nigdy nie zostawiam rodzin bez wsparcia. ${CTA_R}`,

  'deszcz-przywitanie': `Przywitanie dziecka w plenerze, a zanosi się na deszcz? Pogoda bywa zmienna — dlatego już na etapie planowania ustalamy „Plan B".

To może być namiot, zadaszona altana, weranda albo przeniesienie strefy ceremonii do wnętrza. Ustalamy to z Wami i z obiektem wcześniej, żeby w dniu uroczystości nikt nie musiał nerwowo improwizować.

Jestem przygotowana na każdą ewentualność i płynnie dostosowuję prowadzenie do nowych warunków — bez utraty ciepła i magii chwili. Maluch i tak nie zauważy różnicy, a Wy będziecie mieli spokojną głowę.

${CTA_R}`,

  // ═══ POŻEGNANIA ═══
  'obyczaje-wierzacych': `Jak pogodzić humanistyczne pożegnanie z obyczajami lub potrzebami wierzących członków rodziny?

Humanistyczne pożegnanie nie walczy z tradycją ani z uczuciami religijnymi. Jego celem jest łączenie bliskich wokół pamięci o Zmarłym — a nie dzielenie ich.

Prowadzę ceremonię z ogromnym wyczuciem, klasą i szacunkiem dla wszystkich obecnych. Jeśli wśród rodziny są osoby wierzące, możemy zarezerwować w scenariuszu moment na cichą, osobistą modlitwę, chwilę refleksji przy muzyce albo odtworzenie wybranego utworu. Każdy uczestnik pożegnania czuje się wtedy uszanowany, niezależnie od światopoglądu.

Ceremonia skupia się na tym, co łączy wszystkich obecnych: na człowieku, którego żegnacie, na jego życiu, wartościach i śladzie, jaki zostawił.

${CTA_POZ}`,

  'zbieranie-wspomnien': `Jak zbieram wspomnienia do scenariusza pożegnania i ile czasu musicie na to poświęcić?

Doskonale rozumiem, jak wielkim ciężarem jest organizacja pożegnania i jak trudne bywa wracanie do wspomnień w pierwszym okresie żałoby. Dlatego cały proces prowadzę z najwyższą delikatnością i bez presji.

Spotykamy się na żywo lub online, w spokojnej atmosferze. Pytam, jakim człowiekiem była osoba Zmarła, co kochała, jakie miała poczucie humoru, z czego była dumna i jakie wspomnienia są dla Was najważniejsze.

Poza rozmową przesyłam Wam delikatny formularz, który możecie przekazać również innym członkom rodziny i przyjaciołom Zmarłego. Każdy we własnym tempie opisuje swoje wspomnienie lub anegdotę — a wszystkie te wątki tworzą wielobarwny, autentyczny portret.

Na podstawie Waszych słów piszę dedykowaną mowę pożegnalną i scenariusz, który przesyłam Wam do wglądu — żebyście mieli pewność, że każde słowo jest prawdziwe i oddaje ducha Waszego Bliskiego.

${CTA_POZ}`,

  'glos-rodziny': `Czy rodzina lub przyjaciele mogą zabrać głos podczas pożegnania?

Tak — to bardzo piękny i poruszający, choć całkowicie dobrowolny akcent. Nikt nie musi występować, jeśli nie czuje się na siłach.

Bliscy mogą odczytać krótkie wspomnienie, wiersz, list albo po prostu wypowiedzieć kilka słów od serca. Czasem to jedno zdanie potrafi powiedzieć więcej niż długa mowa.

A jeśli obawiacie się, że emocje uniemożliwią Wam wystąpienie na żywo, możecie przekazać mi swoje teksty. Przeczytam je w Waszym imieniu — z odpowiednim wyczuciem, spokojem i szacunkiem.

Wszystko ustalamy wcześniej, żeby w dniu ceremonii nie było niespodzianek ani presji.

${CTA_POZ}`,

  'cos-naglego-pogrzeb': `„Co, jeśli tuż przed ceremonią coś Ci się stanie?"

Wasze bezpieczeństwo i spokój Rodziny są dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam.

W razie sytuacji losowej dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi uroczystość na tym samym, najwyższym poziomie — z tą samą delikatnością i szacunkiem. Mowa pożegnalna, którą razem przygotowaliśmy, zostaje wygłoszona tak, jak zaplanowaliście.

Nigdy nie zostawiam Rodziny bez wsparcia, zwłaszcza w tak trudnym momencie.

${CTA_POZ}`,

  'deszcz-pogrzeb': `Pożegnanie w plenerze, a pada deszcz? Pogoda bywa zmienna — dlatego już na etapie planowania ustalamy „Plan B".

To może być namiot, zadaszona altana, weranda albo przeniesienie strefy ceremonii do wnętrza. Ustalamy to zawczasu, żeby w tak trudnym dniu nikt nie musiał podejmować nerwowych decyzji.

Jestem przygotowana na każdą ewentualność i płynnie dostosowuję prowadzenie do nowych warunków — bez utraty powagi i godności chwili.

${CTA_POZ}`,

  // ═══ ODNOWIENIA PRZYSIĘGI ═══
  'dobry-moment': `Kiedy jest dobry moment na odnowienie przysięgi małżeńskiej? Każdy.

Najczęściej Pary decydują się na ten krok przy okrągłych rocznicach — 5., 10., 20. czy 50. — ale nie ma tu żadnych sztywnych reguł.

Odnowienie przysięgi to piękny gest także wtedy, gdy przetrwaliście trudniejszy czas w związku i chcecie postawić nową kropkę. Gdy uczcić chcecie ważny przełom w Waszym życiu. Albo gdy pierwszy ślub odbył się w pośpiechu, pod presją rodziny lub budżetu — a teraz chcecie uroczystość naprawdę na własnych zasadach, bez stresu.

To nie jest „powtórka". To osobna ceremonia, z nowymi słowami, w miejscu, które dziś coś dla Was znaczy, z ludźmi, których sami wybraliście.

${CTA_ODN}`,

  'nowe-slowa': `„Nie chcemy powtarzać starej przysięgi. Jak napisać nowe słowa po latach?"

Wypowiadanie przysięgi po kilku lub kilkunastu latach wspólnego życia ma zupełnie inny wymiar niż w dniu pierwszego ślubu. Dziś znacie się lepiej. Wiecie, czym jest codzienne wsparcie, kryzys i pogodzenie się. Wiecie, co razem zbudowaliście — dom, dzieci, wspólne nawyki, prywatne żarty.

Nie zostawiam Was z tym samych. Przesyłam Wam autorski poradnik, pomagam wyciągnąć najważniejsze punkty Waszego wspólnego życia i szlifuję z Wami teksty tak, żeby idealnie oddawały Wasz język emocji — bez patosu, za to prawdziwie.

W dniu ceremonii przygotowuję też eleganckie karty, z których czytacie bez stresu o tremę czy pamięć.

Nowa przysięga po latach potrafi wzruszyć jeszcze mocniej niż ta pierwsza — bo stoją za nią lata dowodów.

${CTA_ODN}`,

  'proces-przygotowan-odnowienie': `Jak wygląda przygotowanie odnowienia przysięgi i ile spotkań Was czeka? Przygotowania są proste i bezstresowe.

Zaczynamy od bezpłatnej rozmowy zapoznawczej — online lub na żywo — podczas której omawiamy Waszą wizję: kameralnie czy z rozmachem, w plenerze czy w wnętrzu, z dziećmi w rolach głównych czy we dwoje.

Następnie przesyłam Wam formularze z pytaniami o Wasze najpiękniejsze wspomnienia, przełomowe momenty i to, za co najbardziej się cenicie. Na tej podstawie piszę dedykowany scenariusz, który wspólnie dopracowujemy do idealnej formy.

W dniu wydarzenia dbam o całą reżyserię i płynny przebieg — wejścia, muzykę, rytuały, tempo — żebyście mogli po prostu być obok siebie i celebrować swoją miłość.

${CTA_ODN}`,

  'wlaczyc-dzieci': `Jak włączyć w ceremonię odnowienia przysięgi nasze dzieci lub bliskich?

Obecność dzieci i wieloletnich przyjaciół to jeden z najpiękniejszych elementów odnowienia przysięgi — i coś, czego zwykle nie było na pierwszym ślubie.

Możemy wpleść ich w scenariusz na wiele sposobów. Dzieci mogą wręczyć Wam nowe lub odświeżone obrączki. Mogą odczytać osobisty wiersz albo list. Mogą wypowiedzieć krótkie podziękowanie za dom, który im daliście. Mogą też wziąć udział we wspólnym rytuale rodzinnym — zapaleniu świecy jedności czy sadzeniu drzewa, które będzie rosło razem z Waszą rodziną.

Dążymy do tego, żeby każdy poczuł się ważną częścią tej uroczystości, a nie widzem.

${CTA_ODN}`,

  'cos-naglego-odnowienie': `„Co, jeśli tuż przed ceremonią coś Ci się stanie?"

Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam.

W razie sytuacji losowej Wasz dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi uroczystość na tym samym, najwyższym poziomie. Wszystko, co razem przygotowaliśmy — nowe przysięgi, rytuały, muzyka — zostaje zrealizowane zgodnie z planem.

Nigdy nie zostawiam Par bez wsparcia. ${CTA_ODN}`,

  'deszcz-odnowienie': `Odnowienie przysięgi w plenerze, a zapowiada się deszcz? Pogoda bywa zmienna — dlatego już na etapie planowania ustalamy „Plan B".

To może być namiot, zadaszona altana, weranda albo przeniesienie strefy ceremonii do wnętrza. Omawiamy to z Wami i z obiektem wcześniej, żeby w Waszym dniu nikt nie musiał podejmować nerwowych decyzji.

Jestem przygotowana na każdą ewentualność. Scenariusz i prowadzenie dostosowuję płynnie do nowych warunków — bez utraty magii wydarzenia. Po tylu wspólnych latach jeden deszcz Wam niestraszny.

${CTA_ODN}`,

  // ═══ KAMPANIE ═══
  'rocznice-slubu': `Rocznica drewniana, srebrne gody, rocznica diamentowa — każdy jubileusz małżeński ma swoją nazwę i swój symbol. I każdy z tych symboli mówi coś o tym, co budujecie latami.

Drewno z czasem ciemnieje i twardnieje — a piękne czynią je dopiero słoje: ślady wspólnych burz i słonecznych lat. Porcelana (20 lat) jest delikatna, a jednak codzienna: to piękno, którym się żyje, a nie tylko podziwia zza szyby. Srebro (25 lat) trzeba pielęgnować, żeby nie pociemniało — Wy nauczyliście się tego dawno temu. Perła (30 lat) narasta latami wokół ziarnka, które kiedyś uwierało: z cierpliwości rodzi się blask. Rubin (40 lat) to głęboka czerwień, która nie blaknie — namiętność, która dojrzała w oddanie. Złoto (50 lat) się nie utlenia: pół wieku, a próba wciąż ta sama. Diament (60 lat) to najtwardszy z minerałów — powstaje pod ciśnieniem, którego nic innego by nie przetrwało.

Piękne metafory, prawda? Jeśli zbliża się Wasza okrągła rocznica, nie musi minąć bez śladu. Odnowienie przysięgi to ceremonia na Waszych zasadach — z nowymi słowami, w miejscu, które dziś coś dla Was znaczy, z dziećmi i przyjaciółmi w rolach, których nie było na pierwszym ślubie.

${CTA_ODN}`,

  'jubileusze': `Wiecie, że każdy rok małżeństwa ma swoją nazwę? Tradycja jest zaskakująco szczegółowa — nazwana jest każda rocznica od pierwszej aż po osiemdziesiątą.

Pierwsze lata, rok po roku: 1. papierowa, 2. bawełniana, 3. skórzana, 4. kwiatowa, 5. drewniana, 6. cukrowa, 7. wełniana, 8. spiżowa, 9. gliniana, 10. cynowa, 11. stalowa, 12. płócienna, 13. koronkowa, 14. z kości słoniowej, 15. kryształowa.

Potem co pięć lat: 20. porcelanowa, 25. srebrna, 30. perłowa, 35. koralowa, 40. rubinowa, 45. szafirowa, 50. złota, 55. szmaragdowa, 60. diamentowa, 65. żelazna, 70. kamienna, 75. brylantowa, 80. dębowa.

Pełną listę — z wariantami nazw — znajdziecie slajd po slajdzie w tej karuzeli. Zapiszcie ją sobie i sprawdźcie, jaki jubileusz świętujecie w tym roku.

A jeśli to akurat ta okrągła rocznica — nie pozwólcie jej przejść bez ceremonii. Odnowienie przysięgi to piękny sposób, żeby ją zaznaczyć.

${CTA_ODN}`,

  'pary-lgbtq-promocja': `Od 23 sierpnia 2026 każdy urząd stanu cywilnego w Polsce może wpisać do rejestru zagraniczny akt małżeństwa pary jednopłciowej. Rozporządzenie wprowadza nowe wzory dokumentów, dostosowane do trzech typów par. Zmiana wynika z orzecznictwa — wyroków Naczelnego Sądu Administracyjnego i Trybunału Sprawiedliwości UE (źródło: rp.pl, 23.08.2026).

To jeszcze nie równość małżeńska w Polsce — dotyczy wyłącznie transkrypcji małżeństw zawartych za granicą. Ale to realny krok. I dobry moment, żeby świętować po swojemu.

Ceremonia humanistyczna nigdy nie pytała o płeć ani o paragraf. Liczy się Wasza historia, Wasze słowa i ludzie, których kochacie. Prowadzę śluby, przywitania dzieci i odnowienia przysięgi dla par LGBTQ+ z taką samą klasą, ciepłem i pełnym zaangażowaniem jak każdą inną ceremonię.

Promocja: wszystkie ceremonie dla par LGBTQ+ z terminem w 2026 roku — 20% zniżki.

Napiszcie do mnie w wiadomości prywatnej albo przez marczykowska.com i opowiedzcie swoją historię. Pierwsza rozmowa jest bezpłatna.`,

  'mity': `„To nie jest prawdziwy ślub." „Ludzie nie będą wiedzieć, jak się zachować." „Bez księdza będzie zimno." „To moda, która minie." „Starsza rodzina tego nie przyjmie."

Ile z tych zdań słyszeliście, odkąd zaczęliście planować ślub humanistyczny? W tej karuzeli rozprawiam się z nimi po kolei — spokojnie, bez spinania się.

Ślub humanistyczny jest prawdziwy dla Was i dla gości. Nie ma tylko skutków prawnych — te załatwiacie w USC w kilka minut, w trampkach. Goście po dwóch minutach przestają myśleć, że to coś nowego. Ceremonia jest o Was — Waszej historii i Waszych słowach — więc wzrusza nawet tych, którzy „się nie wzruszają". Świeccy mistrzowie ceremonii prowadzą śluby od dziesięcioleci; w Polsce to wciąż nowość, na Zachodzie — norma. A najbardziej sceptyczni goście najczęściej podchodzą później ze łzami, że nigdy nie byli na czymś tak pięknym.

Macie wątpliwość, której tu nie ma? Chętnie rozwieję ją na spokojnie. ${CTA}`,

  'rytualy-jednosci': `Piasek, świeca jedności, sadzenie drzewa, list i wino zamknięte w skrzynce, handfasting — czyli wiązanie dłoni wstążką. Rytuały jedności to symboliczny moment ceremonii, który zostaje w pamięci gości i na zdjęciach.

Rytuał piasku: dwa kolory przesypujecie do jednego naczynia, a warstw nie da się już rozdzielić — jak Waszych historii. Świeca jedności: od dwóch osobnych płomieni zapalacie jeden wspólny, co pięknie wygląda o zmierzchu i w plenerze. Sadzenie drzewa: podlewacie je wodą przyniesioną z Waszych rodzinnych domów, a potem rośnie razem z Wami przez lata. List i wino: zamykacie w skrzynce list do siebie i butelkę, którą otwieracie na pierwszą rocznicę albo w trudniejszy dzień. Handfasting: najstarszy z rytuałów i źródło zwrotu „związać się węzłem" — mocny wizualnie.

W tej karuzeli opisuję każdy z nich i podpowiadam, komu który pasuje. Nie wiecie, co wybrać? Pomogę Wam przy planowaniu scenariusza — dobierzemy rytuał, który naprawdę o Was opowiada.

${CTA}`,

  'cennik': `„Ile kosztuje ceremonia i za co właściwie płacę?" Uczciwe pytanie — odpowiadam wprost.

Sama ceremonia trwa pół godziny. Ale jej przygotowanie to tygodnie pracy: rozmowy, autorskie kwestionariusze, pisanie scenariusza od zera pod Waszą historię, pomoc w napisaniu i wyszlifowaniu przysiąg, konsultacje doboru muzyki.

Płacicie za spokój w dniu ślubu: reżyserię przebiegu, odprawę i próbę mikrofonu, kontakt z obsługą miejsca, gotowy plan B na pogodę i na sytuacje losowe. Płacicie też za doświadczenie — setki poprowadzonych ceremonii — i za sieć sprawdzonych zastępców, gdyby przede mną coś się wydarzyło. Nigdy nie zostajecie sami.

Konkretna wycena zależy od miejsca, dojazdu, liczby języków i zakresu współpracy. Podaję ją po bezpłatnej rozmowie zapoznawczej, bez zobowiązań — żeby liczba, którą usłyszycie, dotyczyła naprawdę Waszej ceremonii, a nie abstrakcyjnego pakietu.

${CTA}`,

  'pory-roku': `Kiedy najlepiej wziąć ślub humanistyczny? Każda pora roku daje ceremonii coś innego — w tej karuzeli podpowiadam, na co zwrócić uwagę.

Wiosna to świeża zieleń, długie światło i jeszcze bez upału — idealna na ogród i plener, ale miejcie gotowy plan B na deszcz. Lato to najdłuższe dni i ciepłe wieczory; ceremonię ustawiamy tak, żeby słońce nie świeciło Wam i gościom w oczy. Jesień daje złote światło, cieplejsze barwy i mniej obłożone terminy — fotograficznie często najpiękniejsza pora. Zima to świece, wnętrza, kominek i kameralny klimat, jakiego lato nie da.

Nie ma pory „złej" na ślub humanistyczny — jest tylko ta, która pasuje do Waszej wizji i do miejsca, w którym chcecie stanąć obok siebie.

Wybraliście już swój sezon? Sprawdźmy wolne terminy. ${CTA_R}`,

  'wolne-terminy': `Sezon 2026 powoli domykamy — zostały pojedyncze wolne soboty. Jeśli macie już datę, nie zwlekajcie z pytaniem.

Kalendarz na 2027 jest natomiast otwarty i to najlepszy moment, żeby zarezerwować termin. Najbardziej oblegane daty — długie weekendy i czerwcowe soboty — znikają najszybciej, często z rocznym wyprzedzeniem.

Rezerwacja jest prosta: krótka rozmowa zapoznawcza (bezpłatna), umowa online, zaliczka — i termin jest Wasz. Resztę przygotowań robimy potem spokojnie, krok po kroku, bez presji.

A jeśli Wasza data jest już blisko i wydaje się, że „za późno" — i tak napiszcie. Sprawdzę kalendarz, a jeśli sama nie dam rady, mam sieć sprawdzonych celebrantów, których osobiście szkoliłam.

Macie datę na oku? Napiszcie w wiadomości prywatnej albo przez marczykowska.com — odpowiem szybko.`,
};

// per-carousel hashtag overrides for Kampanie
const HT_KAMP = {
  'rocznice-slubu': `${HT_CORE} #rocznicaślubu #odnowienieprzysięgi #jubileuszmałżeński #miłośćpolatach #srebrnegody #złotegody`,
  'jubileusze': `${HT_CORE} #rocznicaślubu #jubileuszmałżeński #odnowienieprzysięgi #tradycjaślubna #miłośćpolatach #nazwyrocznic`,
  'pary-lgbtq-promocja': `#ślublgbt #ślublgbtq #paryjednopłciowe #miłośćtomiłość #loveislove #ceremoniahumanistyczna #mistrzceremonii #ślubtrójmiasto #ślubgdańsk #równość #promocjaślubna`,
  'mity': `${HT_CORE} #ślubbezksiędza #ślubcywilnywtrampkach #ślubneinspiracje #mityoślubie #paramłoda`,
  'rytualy-jednosci': `${HT_CORE} #rytuałjedności #świecajedności #handfasting #rytuałpiasku #ceremoniaślubna #ślubneinspiracje`,
  'cennik': `${HT_CORE} #cennikślubny #ilekosztujeślub #ślubnybudżet #ślubneporady #wycenaceremonii`,
  'pory-roku': `${HT_CORE} #ślubwiosna #ślublato #ślubjesień #ślubzima #ślubwplenerze #ślubneinspiracje #ślub2027`,
  'wolne-terminy': `${HT_CORE} #wolneterminy2026 #wolneterminy2027 #ślub2026 #ślub2027 #rezerwacjaterminu #mistrzceremoniitrójmiasto`,
};

const REVIEW = { 'wolne-terminy': 'Zweryfikuj realną dostępność terminów 2026/2027 — liczby są szablonowe.' };

// ─────────────────────────────────────────────────────────────────────
const O = [];
const p = (x = '') => O.push(x);
const over = [];

p('ROZBUDOWANE OPISY POSTÓW — KARUZELE');
p('Milena Marczykowska · marczykowska.com');
p(`Wygenerowano: ${new Date().toISOString().slice(0, 10)}`);
p('');
p('Jeden pełny opis na karuzelę (do 4000 znaków) — do wklejenia jako treść posta.');
p('Uwaga: Instagram wyświetla max ok. 2200 znaków; wszystkie opisy poniżej mieszczą się w tym limicie.');
p('Hashtagi są propozycją — dobierz/utnij wedle uznania (IG liczy je do limitu znaków).');

function emit(g, prefix) {
  const name = noteName(g.note, g.slug);
  const hook = noteHook(g.note);
  const body = LONG[g.slug];
  const tags = g.cat === 'kampanie' ? (HT_KAMP[g.slug] || HT_CORE) : (HT[g.cat] || HT_CORE);
  p('');
  p('═══════════════════════════════════════════════════════════════════');
  p(`${prefix}${name}`);
  if (hook) p(`Hook (haczyk na start): „${hook}"`);
  if (REVIEW[g.slug]) p(`⚠ ${REVIEW[g.slug]}`);
  p('═══════════════════════════════════════════════════════════════════');
  p('');
  if (!body) { p('[BRAK OPISU — dopisz w LONG]'); over.push(`${g.slug}: brak opisu`); return; }
  p(`OPIS (${body.length} znaków):`);
  p('');
  p(body);
  p('');
  p(`HASHTAGI: ${tags}`);
  if (body.length > LIMIT) over.push(`${g.slug}: ${body.length} znaków (limit ${LIMIT})`);
}

const faq = collect('art/pngmap.json', 'art/canvas.json', 'faq');
const byCat = {};
for (const g of faq) (byCat[g.cat] ||= []).push(g);
p('');
p('╔═════════════════════════════════════════════════════════════════╗');
p('║  CZĘŚĆ 1 — FAQ                                                   ║');
p('╚═════════════════════════════════════════════════════════════════╝');
for (const [cat, list] of Object.entries(byCat)) {
  p('');
  p(`▓▓▓  KATEGORIA: ${(FAQ_CAT[cat] || cat).toUpperCase()}  ▓▓▓`);
  list.forEach((g, i) => emit(g, `KARUZELA ${i + 1}/${list.length} — `));
}

const kamp = collect('pngmap-kampanie.json', 'kampanie/canvas.json', 'kamp');
p('');
p('');
p('╔═════════════════════════════════════════════════════════════════╗');
p('║  CZĘŚĆ 2 — KAMPANIE                                              ║');
p('╚═════════════════════════════════════════════════════════════════╝');
kamp.forEach((g) => { g.cat = 'kampanie'; emit(g, 'KARUZELA — '); });

p('');
const text = O.join('\n') + '\n';
const targets = [fileURLToPath(new URL('../opisy-rozbudowane.txt', import.meta.url))];
const desktop = join(homedir(), 'Desktop', 'faq-carousele-slajdy');
if (existsSync(desktop)) targets.push(join(desktop, 'opisy-rozbudowane.txt'));
for (const t of targets) writeFileSync(t, text);

console.log('wrote:', targets.join(', '));
const lens = [...faq, ...kamp].map((g) => LONG[g.slug]?.length).filter(Boolean);
console.log(`karuzele: ${faq.length + kamp.length} | opisy: min ${Math.min(...lens)} / max ${Math.max(...lens)} znaków`);
if (over.length) { console.error('PROBLEMY:\n  ' + over.join('\n  ')); process.exit(1); }
console.log(`wszystkie opisy ≤ ${LIMIT} znaków ✓`);
