import { writeFileSync } from 'node:fs';

const PHONE = '+48 510 769 900';
const SIGN = 'Milena Marczykowska';
const SITE = 'marczykowska.com';

// ---------------------------------------------------------------------------
// FAQ carousels grouped by service category. One canvas page ("card") per
// category; every carousel in that category is laid out as a row on the page.
// Each long site.js answer is condensed to 2-4 punchy slides.
// Per-carousel look = one of 8 palettes + one of the background photos, chosen
// so neighbouring carousels never look identical.
// ---------------------------------------------------------------------------
const categories = [
  {
    key: 'slub', prefix: 'SLU', label: 'Śluby', kicker: 'FAQ · Śluby humanistyczne',
    items: [
      {
        slug: 'moc-prawna', menu: 'Moc prawna', theme: { pal: 'cream', photo: 'rustic' },
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
        slug: 'cywilny-i-humanistyczny', menu: 'Cywilny + humanistyczny', theme: { pal: 'brown', photo: 'vows' },
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
        slug: 'tradycyjna-rodzina', menu: 'Tradycyjna rodzina', theme: { pal: 'sage', photo: 'cer' },
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
        slug: 'dwa-jezyki', menu: 'Dwa języki', theme: { pal: 'aubergine', photo: 'css' },
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
        slug: 'stres-przy-przysiedze', menu: 'Stres przy przysiędze', theme: { pal: 'blush', photo: 'arch' },
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
        slug: 'jak-napisac-przysiege', menu: 'Pisanie przysięgi', theme: { pal: 'inkwarm', photo: 'candles' },
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
        slug: 'proces-przygotowan', menu: 'Proces przygotowań', theme: { pal: 'sand', photo: 'beach' },
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
        slug: 'oprawa-muzyczna', menu: 'Oprawa muzyczna', theme: { pal: 'forest', photo: 'rustic' },
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
        slug: 'poza-trojmiastem', menu: 'Poza Trójmiastem', theme: { pal: 'cream', photo: 'cer' },
        q: 'Czy mogę zorganizować\nceremonię poza\nTrójmiastem?',
        faq: 'Czy mogę zorganizować ceremonię poza Trójmiastem?',
        caption: 'Gdańsk, całe Trójmiasto — i dowolne miejsce w Polsce.',
        slides: [
          'Tak. Na co dzień działam w Gdańsku i całym Trójmieście.',
          'Ale chętnie przyjadę w dowolne miejsce w Polsce — szczegóły dojazdu ustalamy indywidualnie podczas naszej rozmowy.'
        ]
      },
      {
        slug: 'z-jakim-wyprzedzeniem', menu: 'Wyprzedzenie', theme: { pal: 'brown', photo: 'css' },
        q: 'Z jakim wyprzedzeniem\nnajlepiej się zgłosić?',
        faq: 'Z jakim wyprzedzeniem najlepiej się zgłosić?',
        caption: 'Kiedy się odezwać? Im wcześniej, tym spokojniej.',
        slides: [
          'Im wcześniej, tym lepiej — spokojnie zaplanujemy spotkania i dopracujemy scenariusz.',
          'Jeśli jednak Wasza data jest już blisko — napiszcie śmiało. Postaram się znaleźć rozwiązanie.'
        ]
      },
      {
        slug: 'cos-naglego', menu: 'Sytuacja losowa', theme: { pal: 'sage', photo: 'arch' },
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
        slug: 'deszcz-w-plenerze', menu: 'Deszcz w plenerze', theme: { pal: 'aubergine', photo: 'beach' },
        q: 'Ceremonia w plenerze,\na spadnie deszcz.\nCo wtedy?',
        faq: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
        caption: 'Pogoda bywa zmienna — dlatego zawsze mamy Plan B.',
        slides: [
          'Już na etapie planowania ustalamy „Plan B” — namiot, zadaszoną altanę, werandę albo przeniesienie strefy ceremonii do wnętrza obiektu.',
          'Jestem przygotowana na każdą ewentualność. Scenariusz i prowadzenie dostosowuję płynnie — bez utraty magii wydarzenia.'
        ]
      }
    ]
  },

  {
    key: 'przywitanie', prefix: 'PRZ', label: 'Przywitania', kicker: 'FAQ · Przywitanie dziecka',
    items: [
      {
        slug: 'placz-malucha', menu: 'Płacz malucha', theme: { pal: 'cream', photo: 'family' },
        q: 'Co, jeśli maluch się\nrozpłacze albo\nzgłodnieje?',
        faq: 'Co jeśli maluszek zacznie płakać, będzie głodny albo potrzebuje przewinięcia?',
        caption: 'Dziecko jest głównym bohaterem — ceremonia dopasowuje się do niego.',
        slides: [
          'Dziecko jest głównym bohaterem tego dnia — to ceremonia dopasowuje się do niego, a nie odwrotnie.',
          'Głód, zmęczenie, potrzeba przytulenia? Robimy pauzę — karmicie, uspokajacie, wracamy. Bez sztywnego reżimu.',
          'Prowadzę wydarzenie elastycznie i płynnie reaguję na każdą potrzebę malucha. Wy i Wasza pociecha macie mieć pełen spokój.'
        ]
      },
      {
        slug: 'gdzie-i-kiedy', menu: 'Gdzie i kiedy', theme: { pal: 'brown', photo: 'candles' },
        q: 'Gdzie i kiedy\nmoże odbyć się\ntaka ceremonia?',
        faq: 'Gdzie i kiedy może odbyć się taka ceremonia?',
        caption: 'Żadnych ograniczeń co do miejsca ani terminu.',
        slides: [
          'Nie macie żadnych ograniczeń lokalizacyjnych ani kalendarzowych.',
          'Przydomowy ogród, wynajęta sala, park, a nawet zacisze Waszego salonu.',
          'Często łączymy przywitanie z pierwszymi urodzinami (Roczkiem) — ale witamy zarówno kilkumiesięczne niemowlęta, jak i starsze dzieci.'
        ]
      },
      {
        slug: 'proces-przygotowan-przywitanie', menu: 'Proces przygotowań', theme: { pal: 'sage', photo: 'arch' },
        q: 'Jak wyglądają\nprzygotowania i ile\nczasu zajmują?',
        faq: 'Jak wygląda proces przygotowań i ile czasu musimy na to poświęcić?',
        caption: 'Cały proces szybko i bezstresowo — wiem, ile zabiera mały człowiek.',
        slides: [
          'Wiem, jak angażująca jest opieka nad małym dzieckiem, dlatego cały proces organizuję szybko i bezstresowo.',
          'Zaczynamy od krótkiej rozmowy online lub telefonicznej. Rezerwacja odbywa się w pełni online, bez wychodzenia z domu.',
          'Wypełniacie lekki Kwestionariusz Rodzicielski, a ja piszę dedykowany scenariusz — dopracowujemy go do 100% satysfakcji.'
        ]
      },
      {
        slug: 'presja-chrzest', menu: 'Presja na chrzest', theme: { pal: 'aubergine', photo: 'family' },
        q: 'Rodzina naciska na\ntradycyjny chrzest.\nJak to wytłumaczyć?',
        faq: 'Czujemy presję ze strony rodziny na tradycyjny chrzest. Jak wytłumaczyć im naszą decyzję?',
        caption: 'Nie rezygnujecie ze świętowania — robicie to w zgodzie ze sobą.',
        slides: [
          'Zamiast wchodzić w spory światopoglądowe, pokażcie bliskim, że nie rezygnujecie ze świętowania — po prostu robicie to w zgodzie ze sobą.',
          'Przywitanie daje rodzinie dokładnie to, czego pragnie: możliwość zgromadzenia się, wyrażenia miłości i złożenia życzeń.',
          'Podczas ceremonii podkreślam, jak ważną rolę w życiu dziecka pełnią dziadkowie i bliscy. To natychmiast rozbraja napięcia.'
        ]
      },
      {
        slug: 'rodzice-honorowi', menu: 'Rodzice Honorowi', theme: { pal: 'blush', photo: 'family' },
        q: 'Kim są\nRodzice Honorowi\ni jaka jest ich rola?',
        faq: 'Kim są Rodzice Honorowi i jaka jest ich rola podczas ceremonii?',
        caption: 'Humanistyczny odpowiednik Rodziców Chrzestnych — bez zaświadczeń z parafii.',
        slides: [
          'To humanistyczny odpowiednik Rodziców Chrzestnych — bliscy, których wybieracie na przewodników dziecka.',
          'Bez zaświadczeń z parafii i kryteriów wyznaniowych. Liczy się autentyczna relacja: przyjaciel, siostra, brat, ciocia.',
          'Podczas ceremonii wypowiadają własne słowa obietnicy, a na koniec podpisują pamiątkowy Akt Nominacji.'
        ]
      },
      {
        slug: 'przygotowanie-miejsca', menu: 'Przygotowanie miejsca', theme: { pal: 'forest', photo: 'beach' },
        q: 'Jak przygotować\nmiejsce na ceremonię\nprzywitania dziecka?',
        faq: 'Jak przygotować miejsce na Ceremonię Przywitania Dziecka?',
        caption: 'Przestrzeń ma dawać swobodę Wam, maluszkowi i gościom.',
        slides: [
          'Przestrzeń — ogród, sala, park czy salon — ma przede wszystkim dawać poczucie swobody Wam, maluszkowi i gościom.',
          'Wyznaczcie estetyczną strefę centralną (drewniana ścianka, łuk z kwiatów, ulubione drzewo) i wygodny fotel na przytulenie czy karmienie.',
          'Przyda się stolik na Akty Nominacji i akcesoria do rytuałów, kącik z kocykiem dla najmłodszych i dyskretne, ciche nagłośnienie.'
        ]
      },
      {
        slug: 'ile-trwa-przywitanie', menu: 'Ile trwa', theme: { pal: 'sand', photo: 'family' },
        q: 'Ile trwa ceremonia\nprzywitania dziecka\nw rodzinie?',
        faq: 'Ile trwa ceremonia przywitania dziecka w rodzinie?',
        caption: 'Około 25–30 minut — tyle, by wzruszyć, ale nie zmęczyć malucha.',
        slides: [
          'Ceremonia trwa zazwyczaj około 25–30 minut.',
          'To czas, który buduje wzruszający klimat, ale nie męczy głównego bohatera dnia ani obecnych dzieci.',
          'Długość zależy od liczby rytuałów i potrzeb malucha — jeśli trzeba, robimy naturalną pauzę, bez pośpiechu.'
        ]
      },
      {
        slug: 'cos-naglego-przywitanie', menu: 'Sytuacja losowa', theme: { pal: 'inkwarm', photo: 'candles' },
        q: 'Co, jeśli zachorujesz\nalbo zdarzy się\ncoś nagłego?',
        faq: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
        caption: 'Plan na wypadek sytuacji losowej — nigdy nie zostajecie sami.',
        slides: [
          'Wasze bezpieczeństwo jest dla mnie priorytetem.',
          'Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam.',
          'W razie sytuacji losowej Wasz dopracowany scenariusz przejmuje zastępca i prowadzi uroczystość na tym samym poziomie.'
        ]
      },
      {
        slug: 'deszcz-przywitanie', menu: 'Deszcz w plenerze', theme: { pal: 'cream', photo: 'arch' },
        q: 'Ceremonia w plenerze,\na spadnie deszcz.\nCo wtedy?',
        faq: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
        caption: 'Pogoda bywa zmienna — dlatego zawsze mamy Plan B.',
        slides: [
          'Już na etapie planowania ustalamy „Plan B” — namiot, zadaszoną altanę, werandę albo wnętrze obiektu.',
          'Jestem przygotowana na każdą ewentualność. Scenariusz i prowadzenie dostosowuję płynnie — bez utraty magii.'
        ]
      }
    ]
  },

  {
    key: 'pogrzeb', prefix: 'POZ', label: 'Pożegnania', kicker: 'FAQ · Humanistyczne pożegnanie',
    items: [
      {
        slug: 'obyczaje-wierzacych', menu: 'Wierzący w rodzinie', theme: { pal: 'inkwarm', photo: 'funeral' },
        q: 'Jak pogodzić ceremonię\nz potrzebami wierzących\nczłonków rodziny?',
        faq: 'Jak pogodzić ceremonię z obyczajami lub potrzebami wierzących członków rodziny?',
        caption: 'Humanistyczne pożegnanie nie walczy z tradycją — łączy bliskich.',
        slides: [
          'Humanistyczne pożegnanie nie walczy z tradycją ani uczuciami religijnymi — jego celem jest łączenie bliskich wokół pamięci o Zmarłym.',
          'Możemy zarezerwować w scenariuszu moment na cichą modlitwę, chwilę refleksji przy muzyce lub wybrany utwór.',
          'Prowadzę ceremonię z wyczuciem, klasą i szacunkiem — tak, by każdy uczestnik pożegnania czuł się uszanowany.'
        ]
      },
      {
        slug: 'zbieranie-wspomnien', menu: 'Zbieranie wspomnień', theme: { pal: 'sage', photo: 'candles' },
        q: 'Jak zbierasz\nwspomnienia\ndo scenariusza?',
        faq: 'Jak zbierasz wspomnienia do scenariusza i ile czasu musimy na to poświęcić?',
        caption: 'Cały proces prowadzę z najwyższą delikatnością i bez presji.',
        slides: [
          'Rozumiem, jak trudne bywa wracanie do wspomnień w pierwszym okresie żałoby — cały proces prowadzę z delikatnością i bez presji.',
          'Spotykamy się na spokojnej rozmowie: pytam, jakim człowiekiem był Zmarły, co kochał, z czego był dumny.',
          'Przesyłam też delikatny formularz dla rodziny i przyjaciół — każdy we własnym tempie opisuje swoje wspomnienie lub anegdotę.',
          'Na podstawie Waszych słów piszę mowę pożegnalną i przesyłam ją do wglądu — by każde słowo było prawdziwe.'
        ]
      },
      {
        slug: 'glos-rodziny', menu: 'Głos rodziny', theme: { pal: 'brown', photo: 'funeral' },
        q: 'Czy rodzina lub\nprzyjaciele mogą\nzabrać głos?',
        faq: 'Czy rodzina lub przyjaciele mogą zabrać głos podczas ceremonii?',
        caption: 'Poruszający, choć całkowicie dobrowolny akcent.',
        slides: [
          'Tak — to bardzo piękny i poruszający, choć całkowicie dobrowolny akcent.',
          'Bliscy mogą odczytać krótkie wspomnienie, wiersz, list albo po prostu powiedzieć kilka słów od serca.',
          'Jeśli emocje nie pozwolą wystąpić na żywo — przekażcie mi tekst, przeczytam go w Waszym imieniu z wyczuciem i szacunkiem.'
        ]
      },
      {
        slug: 'cos-naglego-pogrzeb', menu: 'Sytuacja losowa', theme: { pal: 'cream', photo: 'arch' },
        q: 'Co, jeśli zachorujesz\nalbo zdarzy się\ncoś nagłego?',
        faq: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
        caption: 'W razie sytuacji losowej Rodzina nigdy nie zostaje bez wsparcia.',
        slides: [
          'Wasze bezpieczeństwo jest dla mnie priorytetem.',
          'Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam.',
          'W razie sytuacji losowej dopracowany scenariusz przejmuje zastępca i prowadzi uroczystość na tym samym poziomie. Nigdy nie zostawiam Rodziny bez wsparcia.'
        ]
      },
      {
        slug: 'deszcz-pogrzeb', menu: 'Deszcz w plenerze', theme: { pal: 'forest', photo: 'funeral' },
        q: 'Ceremonia w plenerze,\na spadnie deszcz.\nCo wtedy?',
        faq: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
        caption: 'Pogoda bywa zmienna — dlatego zawsze mamy Plan B.',
        slides: [
          'Już na etapie planowania ustalamy „Plan B” — namiot, zadaszoną altanę, werandę albo wnętrze obiektu.',
          'Jestem przygotowana na każdą ewentualność. Scenariusz i prowadzenie dostosowuję płynnie — bez utraty powagi chwili.'
        ]
      }
    ]
  },

  {
    key: 'odnowienie', prefix: 'ODN', label: 'Odnowienia przysięgi', kicker: 'FAQ · Odnowienie przysięgi',
    items: [
      {
        slug: 'dobry-moment', menu: 'Dobry moment', theme: { pal: 'blush', photo: 'vows' },
        q: 'Kiedy jest dobry moment\nna odnowienie przysięgi\nmałżeńskiej?',
        faq: 'Kiedy jest dobry moment na odnowienie przysięgi małżeńskiej?',
        caption: 'Każdy moment jest idealny — bez sztywnych reguł.',
        slides: [
          'Każdy moment jest idealny.',
          'Najczęściej Pary wybierają okrągłe rocznice — 5., 10., 20., 50. — ale nie ma tu żadnych sztywnych reguł.',
          'To piękny gest także po trudniejszym czasie w związku albo gdy chcecie uroczystość na własnych zasadach, bez presji.'
        ]
      },
      {
        slug: 'nowe-slowa', menu: 'Nowe słowa', theme: { pal: 'brown', photo: 'candles' },
        q: 'Nie chcemy „powtarzać”\nstarej przysięgi.\nJak napisać nowe słowa?',
        faq: 'Nie chcemy „powtarzać” starej przysięgi. Jak napisać nowe słowa po latach?',
        caption: 'Po latach przysięga ma zupełnie inny wymiar.',
        slides: [
          'Po latach wspólnego życia przysięga ma inny wymiar — znacie się lepiej, wiecie, czym jest codzienne wsparcie i co razem zbudowaliście.',
          'Przesyłam Wam autorski poradnik i pomagam wyciągnąć najważniejsze punkty Waszej wspólnej historii.',
          'Szlifujemy teksty razem, a w dniu ceremonii czytacie z eleganckich kart — bez stresu o tremę czy pamięć.'
        ]
      },
      {
        slug: 'proces-przygotowan-odnowienie', menu: 'Proces przygotowań', theme: { pal: 'sage', photo: 'css' },
        q: 'Jak wyglądają\nprzygotowania i ile\nspotkań nas czeka?',
        faq: 'Jak wygląda proces przygotowań i ile spotkań nas czeka?',
        caption: 'Prosto i bezstresowo — od rozmowy do reżyserii dnia.',
        slides: [
          'Zaczynamy od bezpłatnej rozmowy zapoznawczej — online lub na żywo — podczas której omawiamy Waszą wizję.',
          'Wypełniacie formularze o najpiękniejszych wspomnieniach, przełomowych momentach i tym, za co najbardziej się cenicie.',
          'Na tej podstawie piszę dedykowany scenariusz — dopracowujemy go razem, a w dniu wydarzenia dbam o całą reżyserię.'
        ]
      },
      {
        slug: 'wlaczyc-dzieci', menu: 'Udział dzieci', theme: { pal: 'aubergine', photo: 'rustic' },
        q: 'Jak włączyć\nw ceremonię nasze\ndzieci lub bliskich?',
        faq: 'Jak włączyć w ceremonię nasze dzieci lub bliskich?',
        caption: 'Jeden z najpiękniejszych elementów odnowienia przysięgi.',
        slides: [
          'Obecność dzieci i wieloletnich przyjaciół to jeden z najpiękniejszych elementów odnowienia przysięgi.',
          'Dzieci mogą wręczyć Wam nowe lub odświeżone obrączki, odczytać wiersz, wypowiedzieć krótkie podziękowanie.',
          'Albo wziąć udział we wspólnym rytuale — świeca jedności, sadzenie drzewa. Cała rodzina czuje się ważną częścią dnia.'
        ]
      },
      {
        slug: 'cos-naglego-odnowienie', menu: 'Sytuacja losowa', theme: { pal: 'cream', photo: 'cer' },
        q: 'Co, jeśli zachorujesz\nalbo zdarzy się\ncoś nagłego?',
        faq: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
        caption: 'Plan na wypadek sytuacji losowej — nigdy nie zostajecie sami.',
        slides: [
          'Wasze bezpieczeństwo jest dla mnie priorytetem.',
          'Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam.',
          'W razie sytuacji losowej Wasz dopracowany scenariusz przejmuje zastępca i prowadzi uroczystość na tym samym poziomie.'
        ]
      },
      {
        slug: 'deszcz-odnowienie', menu: 'Deszcz w plenerze', theme: { pal: 'forest', photo: 'arch' },
        q: 'Ceremonia w plenerze,\na spadnie deszcz.\nCo wtedy?',
        faq: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
        caption: 'Pogoda bywa zmienna — dlatego zawsze mamy Plan B.',
        slides: [
          'Już na etapie planowania ustalamy „Plan B” — namiot, zadaszoną altanę, werandę albo wnętrze obiektu.',
          'Jestem przygotowana na każdą ewentualność. Scenariusz i prowadzenie dostosowuję płynnie — bez utraty magii wydarzenia.'
        ]
      }
    ]
  }
];

// ---- shared bits -----------------------------------------------------------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');

const palettes = {
  // --- light grounds (dark text) ---
  cream: {
    bg: '#f2e8db', bg2: '#ece0d0', ink: '#4a3b30', soft: '#7a6552',
    foot: '#95836f', kicker: '#9c6f4f', arrow: '#b58c68',
    photoOpacity: '0.12', photoBlend: 'multiply', sign: '#8a5a44'
  },
  sage: {
    bg: '#e8e9df', bg2: '#dce0d1', ink: '#3b4034', soft: '#63695a',
    foot: '#828a76', kicker: '#6f7a5a', arrow: '#93a07e',
    photoOpacity: '0.12', photoBlend: 'multiply', sign: '#5f6b48'
  },
  blush: {
    bg: '#f3e6e2', bg2: '#ecd8d2', ink: '#4a352f', soft: '#7d6058',
    foot: '#9a7d74', kicker: '#a86f5f', arrow: '#c08d7d',
    photoOpacity: '0.12', photoBlend: 'multiply', sign: '#965448'
  },
  sand: {
    bg: '#efe6d5', bg2: '#e4d7c1', ink: '#453a2b', soft: '#776a53',
    foot: '#93856a', kicker: '#9a7b4f', arrow: '#bfa072',
    photoOpacity: '0.13', photoBlend: 'multiply', sign: '#8a6a3f'
  },
  // --- dark grounds (light text) ---
  brown: {
    bg: '#7a5744', bg2: '#6a4938', ink: '#f6efe5', soft: '#e9dccb',
    foot: 'rgba(246,239,229,0.62)', kicker: '#ecceac', arrow: 'rgba(246,239,229,0.72)',
    photoOpacity: '0.14', photoBlend: 'soft-light', sign: '#f3e6d5'
  },
  forest: {
    bg: '#40483b', bg2: '#333a2f', ink: '#f2f1e6', soft: '#d8dcc8',
    foot: 'rgba(242,241,230,0.6)', kicker: '#cdd7a8', arrow: 'rgba(242,241,230,0.7)',
    photoOpacity: '0.15', photoBlend: 'soft-light', sign: '#e6ecd0'
  },
  aubergine: {
    bg: '#4b3540', bg2: '#3c2a33', ink: '#f5ece9', soft: '#e0cfd0',
    foot: 'rgba(245,236,233,0.6)', kicker: '#e6bfc0', arrow: 'rgba(245,236,233,0.7)',
    photoOpacity: '0.15', photoBlend: 'soft-light', sign: '#efd7d6'
  },
  inkwarm: {
    bg: '#38322c', bg2: '#2b2622', ink: '#f4efe6', soft: '#d8cfc0',
    foot: 'rgba(244,239,230,0.58)', kicker: '#d8b98f', arrow: 'rgba(244,239,230,0.7)',
    photoOpacity: '0.16', photoBlend: 'soft-light', sign: '#e9d8c0'
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

function answerBody(t, qShort, text) {
  return `    <div style="text-align:center; font-style:italic; font-size:30px; line-height:1.4; color:${t.soft}; max-width:640px; margin:0 auto;">${nl2br(qShort)}</div>
    <div style="flex:1; display:flex; align-items:center; justify-content:center;">
      <p style="margin:0; text-align:center; font-weight:500; font-size:47px; line-height:1.42; letter-spacing:0.2px; max-width:830px; text-wrap:pretty;">${nl2br(text)}</p>
    </div>
    <div style="height:26px;"></div>`;
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
const SLIDE = 1080;
const COLGAP = 140;   // horizontal gap between slides of one carousel
const ROWGAP = 520;   // vertical gap between carousel rows (room for sticky note)

const artboards = [];
const annotations = [];
const pages = [];
const pngmap = [];            // { file, out } — for the PNG export script
let firstFile = true;
let mainName = null;

categories.forEach((cat, catIdx) => {
  pages.push({ id: cat.key, name: cat.label });

  cat.items.forEach((c, ci) => {
    const tone = palettes[c.theme.pal];
    const bg = `bg-${c.theme.photo}.jpg`;
    const rowY = ci * (SLIDE + ROWGAP);
    const cc = String(ci + 1).padStart(2, '0');
    const lastSlide = 1 + c.slides.length + 1;   // 1-based index of the CTA slide
    const dir = `${catIdx + 1}-${cat.key}/${cc}-${c.slug}`;
    let sIdx = 0;

    const push = (stem, html, label) => {
      const file = `${firstFile ? 'Main' : stem}.dc.html`;
      firstFile = false;
      writeFileSync(new URL(`./art/${file}`, import.meta.url), html);
      artboards.push({ file, x: sIdx * (SLIDE + COLGAP), y: rowY, w: SLIDE, h: SLIDE, page: cat.key });
      pngmap.push({ file, out: `${dir}/${label}.png` });
      if (!mainName) mainName = file;
      sIdx++;
    };

    push(`${cat.prefix}${cc}S1`, page(tone, coverBody(tone, cat.kicker, nl2br(c.q)), { bg }), '1-tytul');
    c.slides.forEach((txt, si) => {
      push(`${cat.prefix}${cc}S${si + 2}`, page(tone, answerBody(tone, c.q, txt), { bg }), String(si + 2));
    });
    push(`${cat.prefix}${cc}S${c.slides.length + 2}`, page(tone, ctaBody(tone), { noArrow: true, noFoot: true, bg }), `${lastSlide}-kontakt`);

    annotations.push({
      id: `note-${cat.key}-${cc}`,
      x: 0, y: rowY - 320, w: 1080, page: cat.key,
      text: `${cat.label.toUpperCase()} · ${c.menu}\nPYTANIE FAQ: ${c.faq}\n\nProponowany hook do opisu posta:\n„${c.caption}”`
    });
  });
});

const canvas = {
  artboards,
  annotations,
  pages,
  launch: { view: 'canvas', page: 'slub' }
};
writeFileSync(new URL('./art/canvas.json', import.meta.url), JSON.stringify(canvas, null, 2));
writeFileSync(new URL('./art/pngmap.json', import.meta.url), JSON.stringify(pngmap, null, 2));

const totalCarousels = categories.reduce((n, c) => n + c.items.length, 0);
console.log(`main=${mainName} artboards=${artboards.length} carousels=${totalCarousels} pages=${pages.length}`);
