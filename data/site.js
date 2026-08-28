/**
 * Centralne dane strony – treści współdzielone przez wszystkie podstrony.
 * Dzięki temu nawigacja, oferta, cennik, FAQ i dane kontaktowe są w jednym miejscu.
 */

const url = 'https://marczykowska.com';

const contact = {
  phoneDisplay: '510 769 900',
  phoneHref: '+48510769900',
  email: 'marczykowska@gmail.com',
  city: 'Gdańsk i całe Trójmiasto',
  serviceArea: 'Pomorze i cała Polska',
  /** Miejscowości/regiony do areaServed w danych strukturalnych i lokalnego SEO. */
  areaServedList: ['Gdańsk', 'Trójmiasto', 'Województwo pomorskie', 'Polska'],
  facebook: 'https://www.facebook.com/milenawolakceremonie',
  instagram: 'https://www.instagram.com/milena_wolak_ceremonie',
  instagramHandle: '@milena_wolak_ceremonie'
};

const brand = {
  name: 'Milena Marczykowska',
  role: 'Celebrantka ceremonii humanistycznych',
  short: 'Milena Marczykowska Ceremonie Humanistyczne',
  tagline: 'Wasza historia, opowiedziana tak, jak Wam odpowiada.'
};

/** Pozycje głównego menu (kolejność ma znaczenie). */
const nav = [
  // { path: '/', label: 'Start' },
  { path: '/ceremonie-slubne', label: 'Ceremonie ślubne' },
  { path: '/pary-lgbt', label: 'Pary LGBT+' },
  { path: '/przywitanie-dziecka', label: 'Przywitanie dziecka' },
  { path: '/ceremonie-pozegnania', label: 'Ceremonie pożegnania' },
  { path: '/odnowienie-przysiegi', label: 'Odnowienie przysięgi' },
  { path: '/o-mnie', label: 'O mnie' },
  { path: '/cennik', label: 'Cennik' },
  { path: '/faq', label: 'FAQ' }
  // { path: '/kontakt', label: 'Kontakt' }
];

/** Skrótowa oferta pokazywana na stronie głównej. */
const services = [
  {
    title: 'Ceremonie ślubne',
    path: '/ceremonie-slubne',
    image: '/images/wedding-beach.webp',
    icon: 'rings',
    excerpt:
      'Spersonalizowany scenariusz oparty na Waszej historii, pomoc w napisaniu przysięgi i rytuały szyte na miarę.'
  },
  {
    title: 'Pary LGBT+',
    path: '/pary-lgbt',
    image: '/images/couple-samesex.webp',
    icon: 'heart',
    excerpt:
      'Ceremonia bez ograniczeń i uprzedzeń – równie piękna, osobista i pełna emocji, na jaką zasługuje każda miłość.'
  },
  {
    title: 'Przywitanie dziecka w rodzinie',
    path: '/przywitanie-dziecka',
    image: '/images/family-children.webp',
    icon: 'child',
    excerpt:
      'Symboliczne powitanie nowego członka rodziny – ciepła uroczystość celebrująca miłość, więzi i wspólną przyszłość.'
  },
  {
    title: 'Ceremonie pożegnania',
    path: '/ceremonie-pozegnania',
    image: '/images/funerals.webp',
    icon: 'leaf',
    excerpt:
      'Godne, świeckie pożegnanie bliskiej osoby – opowieść o życiu, które warto uczcić słowem, ciszą i pamięcią.'
  },
  {
    title: 'Odnowienie przysięgi małżeńskiej',
    path: '/odnowienie-przysiegi',
    image: '/images/wedding-candles.webp',
    icon: 'rings',
    excerpt:
      'Celebracja Waszej historii, miłości i drogi, którą przeszliście razem – świętujcie na własnych zasadach, po latach.'
  }
];

/** Etapy współpracy – wykorzystywane na kilku podstronach. */
const process = [
  {
    step: '01',
    title: 'Poznajmy się',
    text:
      'Zapraszam na spotkanie osobiste lub online. Poznamy się bliżej, rozwiejemy wszelkie wątpliwości i opowiem, w jaki sposób będziemy działać. To czas na poznanie Waszej historii.'
  },
  {
    step: '02',
    title: 'Tworzenie scenariusza',
    text:
      'Wspólnie stworzymy spersonalizowany scenariusz, który uwzględni Wasze życzenia, ulubione elementy i oczekiwania. Pomogę Wam napisać przysięgę i zaproponuję znaczące rytuały.'
  },
  {
    step: '03',
    title: 'Koordynacja',
    text:
      'Skontaktuję się z wykonawcami, aby wszystko przebiegło zgodnie z planem – od muzyki po ustawienie krzeseł. W razie potrzeby potwierdzę przebieg z Urzędem Stanu Cywilnego.'
  },
  {
    step: '04',
    title: 'Dzień ceremonii',
    text:
      'Poprowadzę ceremonię z pasją i wrażliwością, dbając o każdy detal. Mój cel to uczynić ten dzień niezapomnianym wydarzeniem, które idealnie odda Waszą relację.'
  }
];

/**
 * Pakiety cenowe, pogrupowane wg kategorii usług.
 * Każda kategoria renderowana jest jako osobna sekcja na stronie /cennik.
 */
const pricing = [
  {
    category: 'Ceremonie ślubne',
    items: [
      {
        name: 'Ceremonia stylizowana na cywilną',
        price: '1800 zł',
        duration: 'ok. 15–20 min',
        highlight: false,
        features: [
          'Klasyczna struktura ceremonii stylizowana na ceremonię cywilną',
          'Bez autorskiej historii i rytuałów',
          'Certyfikat ślubu'
        ]
      },
      {
        name: 'Ceremonia stylizowana na cywilną – dwujęzyczna',
        price: '2300 zł',
        highlight: false,
        features: [
          'Stylizacja na ceremonię cywilną',
          'Poprowadzenie w dwóch językach',
          'Bez autorskiej historii i rytuałów',
          'Certyfikat ślubu'
        ]
      },
      {
        name: 'Ceremonia personalizowana',
        price: '2600 zł',
        duration: '30–40 min',
        highlight: true,
        badge: 'Najczęściej wybierana',
        features: [
          'Spersonalizowany scenariusz oparty na Waszej historii',
          'Możliwość przeprowadzenia dodatkowych rytuałów',
          'Pomoc w napisaniu przysięgi',
          'Certyfikat ślubu',
          'Koordynacja z wykonawcami'
        ]
      },
      {
        name: 'Ceremonia personalizowana – dwujęzyczna',
        price: '3100 zł',
        highlight: false,
        features: [
          'Spersonalizowany scenariusz w dwóch językach',
          'Możliwość przeprowadzenia dodatkowych rytuałów',
          'Pomoc w napisaniu przysięgi',
          'Certyfikat ślubu',
          'Koordynacja z wykonawcami'
        ]
      }
    ]
  },
  {
    category: 'Przywitanie dziecka w rodzinie',
    items: [
      {
        name: 'Przywitanie dziecka w rodzinie',
        price: '1400 zł',
        highlight: false,
        features: [
          'Spersonalizowany scenariusz ceremonii',
          'Rozmowa przygotowawcza z rodziną',
          'Możliwość złożenia Deklaracji rodziców i Rodziców Honorowych',
          'Pamiątkowy Certyfikat'
        ]
      },
      {
        name: 'Przywitanie dwujęzyczne',
        price: '1900 zł',
        highlight: false,
        features: [
          'Spersonalizowany scenariusz ceremonii',
          'Poprowadzenie w dwóch językach',
          'Rozmowa przygotowawcza z rodziną',
          'Pamiątkowy Certyfikat'
        ]
      }
    ]
  },
  {
    category: 'Ceremonie pożegnania',
    items: [
      {
        name: 'Ceremonia Pożegnania Standardowa',
        price: '1500 zł',
        duration: 'ok. 15–20 min',
        highlight: false,
        features: [
          'Podstawowy wywiad o życiu Zmarłej Osoby',
          'Przygotowanie i odczytanie profesjonalnej, spersonalizowanej mowy pożegnalnej',
          'Prowadzenie krótkiej ceremonii'
        ]
      },
      {
        name: 'Ceremonia Pożegnania Personalizowana',
        price: '2500 zł',
        duration: 'ok. 45 min',
        highlight: false,
        features: [
          'Spokojna, osobista rozmowa z Rodziną (osobiście w Trójmieście lub online)',
          'Autorski scenariusz i wielowymiarowa mowa',
          'Prowadzenie ceremonii w sali pożegnań lub przy grobie',
          'Dodatkowe rytuały pożegnalne'
        ]
      }
    ]
  },
  {
    category: 'Odnowienie przysięgi małżeńskiej',
    items: [
      {
        name: 'Odnowienie przysięgi małżeńskiej',
        price: '2300 zł',
        highlight: false,
        features: [
          'Niespieszna rozmowa o Waszej wspólnej historii',
          'Autorski scenariusz i mowa celebracka',
          'Pomoc w napisaniu nowych, dojrzałych przysiąg',
          'Symboliczny rytuał (opcjonalnie)'
        ]
      },
      {
        name: 'Odnowienie przysięgi małżeńskiej – dwujęzyczna',
        price: '2800 zł',
        highlight: false,
        features: [
          'Niespieszna rozmowa o Waszej wspólnej historii',
          'Poprowadzenie w dwóch językach',
          'Pomoc w napisaniu nowych, dojrzałych przysiąg',
          'Symboliczny rytuał (opcjonalnie)'
        ]
      }
    ]
  }
];

/** Dodatkowe informacje cenowe. */
const pricingNotes = [
  'Oprawa muzyczna: od 1500 zł – skrzypce, gitara, pianino, wokal, kwartet smyczkowy lub harfa.',
  'Transport do 30 km od Gdańska w cenie ceremonii.',
  'Powyżej 30 km – koszt dojazdu według ustawowej stawki kilometrowej.',
  'W przypadku uroczystości oddalonych o ponad 150 km / 2 godziny jazdy od Trójmiasta – prośba o zapewnienie skromnego noclegu ze śniadaniem (w miejscu wesela lub w pobliżu). Pozwala mi to być na miejscu z odpowiednim wyprzedzeniem, w pełni gotowości i bez ryzyka losowych opóźnień na trasie.'
];

/**
 * Najczęściej zadawane pytania, pogrupowane wg kategorii usługi.
 * category: 'slub' | 'przywitanie' | 'pogrzeb' | 'odnowienie'
 * Każda podstrona usługi renderuje tylko pytania ze swojej kategorii (jeśli istnieją).
 * Strona /faq renderuje wszystkie kategorie.
 */
const faqCategories = [
  { key: 'slub', label: 'Śluby' },
  { key: 'przywitanie', label: 'Przywitania' },
  { key: 'pogrzeb', label: 'Pożegnania' },
  { key: 'odnowienie', label: 'Odnowienia przysięgi' }
];

const faq = [
  {
    category: 'slub',
    q: 'Czy ślub humanistyczny ma moc prawną? Jak pogodzić go z formalnościami?',
    a: 'Ślub humanistyczny to w pełni personalizowana ceremonia, skoncentrowana na Waszych wartościach, emocjach i autentycznej historii – bez sztywnych schematów i urzędowego pośpiechu. Nie wywołuje jednak skutków prawnych w rozumieniu polskiego prawa. Dla większości moich Par nie jest to jednak przeszkoda, a ogromna wolność. Jeśli zależy Wam na formalnym statusie małżeństwa, idealnym i najczęściej wybieranym rozwiązaniem jest tzw. „ślub cywilny w trampkach”. Jak to wygląda w praktyce? Formalności na luzie – umawiacie się w Urzędzie Stanu Cywilnego na krótki termin (często w środku tygodnia, bez zbędnej oprawy), składacie podpisy – tylko Wy, urzędnik i świadkowie lub najbliższa rodzina. Prawdziwe święto na Waszych zasadach – w wybranym przez Was dniu, w wymarzonym miejscu (w ogrodzie, na plaży, w stodole czy na dachu) odbywa się Wasz właściwy Ślub Humanistyczny. To wtedy nakładacie obrączki, czytacie osobiste przysięgi i świętujecie z wszystkimi gośćmi tak, jak naprawdę tego chcecie. Dzięki temu formalności macie „odhaczone” bez stresu, a sam dzień ślubu należy w 100% do Was – bez dostosowywania się do grafiku urzędnika czy ograniczeń lokalowych.'
  },
  {
    category: 'slub',
    q: 'Czy można połączyć ślub cywilny ze ślubem humanistycznym w tym samym miejscu i czasie?',
    a: 'Tak, z mojej strony jak najbardziej! To świetne rozwiązanie, jeśli zależy Wam zarówno na uzyskaniu aktu małżeństwa, jak i na osobistej, emocjonalnej oprawie, bez konieczności rozbijania wydarzenia na dwa osobne dni. Niemniej jednak wymagana jest zgoda Urzędu Stanu Cywilnego na połączenie ceremonii – jeśli będzie taka potrzeba, mogę skontaktować się z urzędnikiem. Realizujemy to na jeden z dwóch sposobów: „Wspólna, zintegrowana ceremonia” (za zgodą urzędnika) – jeśli Kierownik USC wyrazi zgodę na płynne połączenie części urzędowej i humanistycznej, tworzymy jeden spójny scenariusz: ja prowadzę część opartą na Waszej historii, osobistych przysięgach i wybranym symbolizmie, a urzędnik w odpowiednim momencie dopełnia wymaganych prawem procedur i przyjmuje oficjalne oświadczenia. Albo „Ceremonia hybrydowa krok po kroku” (wariant najczęstszy) – jeśli urzędnik woli przeprowadzić swoją procedurę niezależnie, układa się to w płynną całość: np. o 15:30 rozpoczynamy Waszą ceremonię humanistyczną – wprowadzamy gości w Waszą historię, czytacie swoje osobiste przysięgi i przeżywacie najważniejsze emocje, a o 16:00 przekazuję głos urzędnikowi, który przechodzi do zwięzłej formalności i złożenia podpisów.'
  },
  {
    category: 'slub',
    q: 'Jak na ślub humanistyczny reaguje tradycyjna część rodziny i goście, którzy nigdy nie słyszeli o takiej ceremonii?',
    a: 'To jedna z najczęstszych obaw Par Młodych – i zarazem moment, który po ceremonii przynosi najwięcej wzruszeń. Wielu gości ze starszych pokoleń jest przyzwyczajonych do utartych schematów (ślubu kościelnego czy krótkiej urzędowej formułki) i na początku po prostu nie wie, czego się spodziewać. Możemy to złagodzić na dwa sposoby: albo na początku ceremonii ciepło i prosto wprowadzę gości w to, czym jest ślub humanistyczny i dlaczego wybraliście taką formę celebrowania miłości, albo w ogóle pomijamy etykiety i po prostu przechodzimy do Waszej historii – dla gości będzie to po prostu piękna, wzruszająca i osobista uroczystość. Zamiast sztywnych regułek rodzina słyszy opowieść o miłości i wspólnych wartościach, a całość prowadzę z klasą, wyczuciem i szacunkiem do wszystkich obecnych. Efekt? To właśnie najbardziej tradycyjni członkowie rodziny najczęściej podchodzą po ceremonii ze łzami w oczach, mówiąc, że nigdy na czymś takim nie byli, a było to najpiękniejsze, co widzieli.'
  },
  {
    category: 'slub',
    q: 'Czy ślub humanistyczny można poprowadzić w dwóch językach?',
    a: 'Tak, to jedno z najbardziej naturalnych rozwiązań dla par międzynarodowych, dla których ślub w Polsce bywa wyzwaniem – urzędowe bariery, sztywny styl, poczucie wykluczenia połowy gości czy obowiązkowa obecność tłumacza przysięgłego odbierają całą magię chwili. Prowadzę ceremonie płynnie w języku polskim i angielskim, dbając o to, by słowa miały dokładnie taką samą wagę dla obu stron sali, bez nudnych, słownikowych tłumaczeń. Przejścia między językami w trakcie opowiadania Waszej historii są naturalne i rytmiczne, dzięki czemu ceremonia zachowuje świetne tempo. Jeśli chcecie przeczytać przysięgi bez przerywania (np. w całości po angielsku lub po polsku), możecie przygotować dla gości eleganckie, wydrukowane karty z tłumaczeniem – w ten sposób słyszą Wasze autentyczne emocje i głos, a jednocześnie słowo w słowo rozumieją sens. Dzięki temu ceremonia staje się prawdziwym pomostem łączącym dwie kultury, a żaden z gości nie czuje się widzem „drugiej kategorii”.'
  },
  {
    category: 'slub',
    q: 'Nie lubimy mówić publicznie i boimy się stresu. Co jeśli zablokujemy się przy przysiędze?',
    a: 'Jestem obok Was właśnie po to, by znieść ten stres. Jeśli obawiacie się czytania własnych słów przed wszystkimi, możemy zastosować formułę powtarzania zdanie po zdaniu za mną, skorzystać z eleganckich, wydrukowanych kart, a nawet przeprowadzić mikro-przysięgę. Pomogę Wam napisać tekst i tak zaplanujemy przebieg ceremonii, byście czuli się w 100% swobodnie.'
  },
  {
    category: 'slub',
    q: 'Jak napisać autentyczną przysięgę ślubną?',
    a: 'Napisanie osobistej przysięgi to dla wielu Par najbardziej poruszający, ale i najbardziej stresujący element przygotowań – pytania typu „od czego zacząć” czy „co jeśli zablokuje mnie trema” są zupełnie naturalne, ale nie musicie zostawać z nimi sami. Każda z moich Par otrzymuje ode mnie autorski, praktyczny poradnik po pisaniu przysięgi – ze wskazówkami, pytaniami pomocniczymi i sprawdzonymi strukturami wypowiedzi. Przesyłacie mi swoje wersje robocze osobno (by zachować sekret przed drugą połówką), a ja sprawdzam je pod kątem długości, rytmu i dynamiki, podpowiadam szlify i dbam o to, by Wasze wypowiedzi idealnie ze sobą współgrały. W dniu ślubu nie musicie uczyć się tekstu na pamięć – większość moich Par czyta z eleganckich, sztywnych kart, z których czyta się lekko i bezstresowo. A jeśli bardzo obawiacie się dłuższego tekstu, możemy ułożyć przysięgę w formie krótkich zdań powtarzanych za mną lub mikro-deklaracji. Dzięki temu tekst, który wypowiecie, będzie w 100% Wasz, głęboki i prawdziwy.'
  },
  {
    category: 'slub',
    q: 'Jak wygląda proces przygotowań i ile spotkań nas czeka?',
    a: 'Proces jest prosty, bezstresowy i poukładany tak, aby przygotowania były przyjemnością, a nie kolejnym obowiązkiem na ślubnej liście zadań. Zaczynamy od bezpłatnej, niezobowiązującej rozmowy zapoznawczej (online lub na żywo), podczas której poznajemy się bliżej i opowiadam Wam o możliwościach. Jeśli poczujecie, że to jest to, przechodzimy do formalności – cały proces podpisania umowy odbywa się szybko i wygodnie online. Następnie przesyłam Wam Organizacyjny Planner Ceremonii oraz autorskie kwestionariusze – osobny dla Niej i osobny dla Niego – które pomagają mi odkryć najważniejsze momenty Waszej relacji, Wasz język emocji i poczucie humoru. Gdy spłyną do mnie odpowiedzi, tworzę wstępny scenariusz i spotykamy się ponownie (Spotkanie #2), by przejść przez niego punkt po punkcie, dopasować rytuały i oprawę muzyczną, aż stwierdzicie: „tak, to w 100% my”. Nasza relacja nie kończy się na dwóch spotkaniach – przez cały okres przygotowań jestem do Waszej pełnej dyspozycji, pomagam w pisaniu przysiąg, konsultuję dobór muzyki i odpowiadam na każde pytanie, które pojawi się po drodze. Dzięki temu w dniu ślubu nie ma miejsca na przypadek.'
  },
  {
    category: 'slub',
    q: 'Jak wygląda kwestia oprawy muzycznej i nagłośnienia podczas ceremonii?',
    a: 'Muzyka i czysty dźwięk to serce emocjonalne każdej ceremonii – budują napięcie przy wejściu, podkreślają najpiękniejsze momenty przysięgi i sprawiają, że każdy gość słyszy Wasze słowa. Współpracuję z wykwalifikowanymi muzykami – skrzypkami, gitarzystami, pianistami, wokalistami, harfistkami czy kwartetami smyczkowymi – których polecam wyłącznie po wcześniejszej współpracy na żywo. Razem przechodzimy przez poszczególne etapy ceremonii (wejście, rytuały, podpisanie certyfikatu, wyjście) i dobieramy utwory, które idealnie oddają Wasz klimat – od klasyki po aranżacje filmowe czy popowe. Zwykle wykorzystuję nagłośnienie i mikrofony zapewnione przez Waszego DJ-a, zespół lub obiekt, tak aby nie generować dodatkowych kosztów – a jeśli nie macie własnej oprawy z nagłośnieniem, zorganizuję jego wynajem. Przed ceremonią zawsze robię odprawę z osobą odpowiedzialną za dźwięk i próbę mikrofonu, aby mieć pewność, że wszystko działa bez zarzutu, i dbam o pełną synchronizację mowy z muzyką – dzięki temu oprawa płynie naturalnie z moimi słowami, a Wy możecie skupić się wyłącznie na emocjach.'
  },
  {
    category: 'slub',
    q: 'Czy mogę zorganizować ceremonię poza Trójmiastem?',
    a: 'Tak. Na co dzień działam w Gdańsku i całym Trójmieście, ale chętnie przyjadę w dowolne miejsce w Polsce. Szczegóły dojazdu ustalimy indywidualnie podczas naszej rozmowy.'
  },
  {
    category: 'slub',
    q: 'Z jakim wyprzedzeniem najlepiej się zgłosić?',
    a: 'Im wcześniej, tym lepiej – dzięki temu spokojnie zaplanujemy spotkania i dopracujemy scenariusz. Jeśli jednak Wasza data jest już blisko, napiszcie śmiało; postaram się znaleźć rozwiązanie.'
  },
  {
    category: 'slub',
    q: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
    a: 'Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam. W razie sytuacji losowej (np. nagłej choroby) Wasz dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi uroczystość na tym samym, najwyższym poziomie – nigdy nie zostawiam Par bez wsparcia.'
  },
  {
    category: 'slub',
    q: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
    a: 'Pogoda bywa zmienna, dlatego już na etapie planowania ustalamy tzw. „Plan B” – np. namiot, zadaszoną altanę, werandę lub przeniesienie strefy ceremonii do wnętrza obiektu. Jestem przygotowana na każdą ewentualność, a scenariusz i prowadzenie dostosowuję płynnie do nowych warunków, bez utraty magii wydarzenia.'
  },
  {
    category: 'przywitanie',
    q: 'Co jeśli maluszek zacznie płakać, będzie głodny albo potrzebuje przewinięcia?',
    a: 'Dziecko jest głównym bohaterem tego dnia – to ceremonia dostosowuje się do niego, a nie dziecko do ceremonii. Nie ma tu żadnego stresu ani sztywnego reżimu: jeśli maluch poczuje głód, zmęczenie lub potrzebę przytulenia, robimy pauzę, karmicie lub uspokajacie dziecko. Prowadzę wydarzenie elastycznie i potrafię płynnie zareagować na każdą potrzebę malucha, dbając o to, byście Wy i Wasza pociecha czuli pełen komfort i spokój.'
  },
  {
    category: 'przywitanie',
    q: 'Gdzie i kiedy może odbyć się taka ceremonia?',
    a: 'Nie macie żadnych ograniczeń lokalizacyjnych ani kalendarzowych. Przywitanie dziecka może odbyć się w Waszym przydomowym ogrodzie, w wynajętej sali restauracyjnej, w parku, a nawet w zaciszu Waszego salonu. Często łączone jest z pierwszymi urodzinami dziecka (Roczkiem), ale nie ma tu sztywnej reguły – witamy zarówno kilkumiesięczne niemowlęta, jak i nieco starsze dzieci.'
  },
  {
    category: 'przywitanie',
    q: 'Jak wygląda proces przygotowań i ile czasu musimy na to poświęcić?',
    a: 'Wiem, jak angażująca jest opieka nad małym dzieckiem, dlatego cały proces organizuję szybko i bezstresowo. Zaczynamy od krótkiej rozmowy wstępnej online lub telefonicznej, podczas której poznajemy się i omawiamy Waszą wstępną wizję. Rezerwacja odbywa się w pełni online, bez wychodzenia z domu. Następnie przesyłam Wam lekki Kwestionariusz Rodzicielski z pytaniami o maluszka, Wasze wartości i historię wybrania imienia, a na tej podstawie piszę dedykowany scenariusz, który wspólnie dopracowujemy do 100% satysfakcji.'
  },
  {
    category: 'przywitanie',
    q: 'Czujemy presję ze strony rodziny na tradycyjny chrzest. Jak wytłumaczyć im naszą decyzję?',
    a: 'To jeden z najtrudniejszych momentów dla młodych rodziców. Zamiast wchodzić w spory światopoglądowe, warto pokazać bliskim, że nie rezygnujecie ze świętowania – po prostu robicie to w zgodzie ze sobą. Przywitanie dziecka daje rodzinie dokładnie to, czego pragnie: możliwość zgromadzenia się, wyrażenia miłości, złożenia życzeń i podarowania maluszkowi wsparcia. Podczas ceremonii w piękny sposób pokazuję, jak ważną rolę w życiu dziecka pełnią dziadkowie i bliscy, co natychmiast rozbraja wszelkie napięcia.'
  },
  {
    category: 'przywitanie',
    q: 'Kim są Rodzice Honorowi i jaka jest ich rola podczas ceremonii?',
    a: 'Rodzice Honorowi (nazywani też Rodzicami Wspierającymi lub Przewodnikami) to odpowiednik tradycyjnych Rodziców Chrzestnych – wyznaczeni przez Was bliscy, którzy mają być dla dziecka źródłem mądrości, wsparcia i serca. Podczas ceremonii humanistycznej nie wymagamy żadnych zaświadczeń z parafii ani spełniania kryteriów wyznaniowych – liczy się autentyczna relacja, więc mogą to zostać Wasi ulubieni bliscy: przyjaciele, siostra, brat czy ciocia. Podczas uroczystości Rodzice Honorowi mogą wypowiedzieć własne słowa obietnicy dla maluszka – deklarując obecność, wsparcie w trudnych momentach i wspólne odkrywanie świata – a zwieńczeniem tej roli jest podpisanie i wręczenie pamiątkowych, eleganckich Aktów Nominacji na Rodziców Honorowych.'
  },
  {
    category: 'przywitanie',
    q: 'Jak przygotować miejsce na Ceremonię Przywitania Dziecka?',
    a: 'Przywitanie Dziecka ma ciepły, rodzinny charakter, dlatego przestrzeń – niezależnie od tego, czy to przydomowy ogród, wynajęta sala, park czy Wasz salon – powinna przede wszystkim dawać poczucie swobody Wam, maluszkowi i gościom. Warto wyznaczyć estetyczną strefę centralną, w której stanę ja, Wy z dzieckiem i Rodzice Honorowi (eleganckie tło, drewniana ścianka, łuk z kwiatami czy ulubione drzewo w ogrodzie), a obok niej wygodny fotel lub kanapę dla Was, na wypadek gdyby maluch potrzebował przytulenia czy nakarmienia. Przyda się też mały stolik na Akty Nominacji dla Rodziców Honorowych i akcesoria do rytuałów (np. Kapsułę Czasu czy Księgę Życzeń), a dla najmłodszych gości warto przewidzieć swobodniejszy kącik z kocykiem czy pufami. Miejsce na nagłośnienie ustawiamy dyskretnie, dbając o to, by głośność była bezpieczna i komfortowa dla wrażliwych uszu malucha.'
  },
  {
    category: 'przywitanie',
    q: 'Ile trwa ceremonia przywitania dziecka w rodzinie?',
    a: 'Ceremonia trwa zazwyczaj około 25–30 minut – to optymalny czas, który pozwala zbudować piękny, wzruszający klimat bez ryzyka zmęczenia głównego bohatera dnia i obecnych na uroczystości dzieci. Dokładny czas zależy od liczby wybranych rytuałów (np. osobistych obietnic Rodziców Honorowych, sadzenia drzewka czy wpisów do księgi pamiątkowej), oprawy muzycznej oraz potrzeb samego maluszka – jeśli dziecko będzie potrzebowało chwili na przytulenie czy wyciszenie, robimy naturalną pauzę, bez pośpiechu.'
  },
  {
    category: 'przywitanie',
    q: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
    a: 'Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam. W razie sytuacji losowej (np. nagłej choroby) Wasz dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi uroczystość na tym samym, najwyższym poziomie – nigdy nie zostawiam Was bez wsparcia.'
  },
  {
    category: 'przywitanie',
    q: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
    a: 'Pogoda bywa zmienna, dlatego już na etapie planowania ustalamy tzw. „Plan B” – np. namiot, zadaszoną altanę, werandę lub przeniesienie strefy ceremonii do wnętrza obiektu. Jestem przygotowana na każdą ewentualność, a scenariusz i prowadzenie dostosowuję płynnie do nowych warunków, bez utraty magii wydarzenia.'
  },
  {
    category: 'pogrzeb',
    q: 'Jak pogodzić ceremonię z obyczajami lub potrzebami wierzących członków rodziny?',
    a: 'Humanistyczne pożegnanie nie walczy z tradycją ani uczuciami religijnymi – jego celem jest łączenie bliskich wokół pamięci o Zmarłym. Prowadzę ceremonię z ogromnym wyczuciem, klasą i szacunkiem dla wszystkich obecnych. Jeśli wśród rodziny są osoby wierzące, możemy zarezerwować w scenariuszu moment na cichą, osobistą modlitwę, chwilę refleksji przy muzyce lub odtworzenie wybranego utworu – dzięki temu każdy uczestnik pożegnania czuje się uszanowany.'
  },
  {
    category: 'pogrzeb',
    q: 'Jak zbierasz wspomnienia do scenariusza i ile czasu musimy na to poświęcić?',
    a: 'Doskonale rozumiem, jak wielkim ciężarem jest organizacja pożegnania i jak trudne bywa wracanie do wspomnień w pierwszym okresie żałoby, dlatego cały proces prowadzę z najwyższą delikatnością i bez presji. Spotykamy się na żywo lub online, w spokojnej atmosferze – pytam, jakim człowiekiem była osoba Zmarła, co kochała, jakie miała poczucie humoru, z czego była dumna i jakie wspomnienia są dla Was najważniejsze. Poza rozmową przesyłam Wam delikatny formularz, który możecie przekazać również innym członkom rodziny czy przyjaciołom Zmarłego, by każdy mógł we własnym tempie opisać swoje wspomnienie lub anegdotę – wszystkie te wątki tworzą wielobarwny, autentyczny portret. Na podstawie Waszych słów piszę dedykowaną mowę pożegnalną i scenariusz, który przesyłam Wam do wglądu, abyście mieli pewność, że każde słowo jest prawdziwe i oddaje ducha Waszego Bliskiego.'
  },
  {
    category: 'pogrzeb',
    q: 'Czy rodzina lub przyjaciele mogą zabrać głos podczas ceremonii?',
    a: 'Tak, to bardzo piękny i poruszający, choć całkowicie dobrowolny akcent. Bliscy mogą odczytać krótkie wspomnienie, wiersz, list lub po prostu wypowiedzieć kilka słów od serca. Jeśli obawiacie się, że emocje uniemożliwią Wam wystąpienie na żywo, możecie przekazać mi swoje teksty – przeczytam je w Waszym imieniu z odpowiednim wyczuciem i szacunkiem.'
  },
  {
    category: 'pogrzeb',
    q: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
    a: 'Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam. W razie sytuacji losowej (np. nagłej choroby) dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi uroczystość na tym samym, najwyższym poziomie – nigdy nie zostawiam Rodziny bez wsparcia.'
  },
  {
    category: 'pogrzeb',
    q: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
    a: 'Pogoda bywa zmienna, dlatego już na etapie planowania ustalamy tzw. „Plan B” – np. namiot, zadaszoną altanę, werandę lub przeniesienie strefy ceremonii do wnętrza obiektu. Jestem przygotowana na każdą ewentualność, a scenariusz i prowadzenie dostosowuję płynnie do nowych warunków, bez utraty magii wydarzenia.'
  },
  {
    category: 'odnowienie',
    q: 'Kiedy jest dobry moment na odnowienie przysięgi małżeńskiej?',
    a: 'Każdy moment jest idealny! Najczęściej Pary decydują się na ten krok przy okrągłych rocznicach (np. 5., 10., 20. czy 50. rocznicy ślubu), ale nie ma tu żadnych sztywnych reguł. Odnowienie przysięgi to piękny gest także wtedy, gdy przetrwaliście trudniejszy czas w związku, chcecie uczcić ważny przełom w Waszym życiu, albo po prostu zorganizować uroczystość na własnych zasadach – bez presji i stresu, które mogły towarzyszyć Waszemu pierwszemu ślubowi.'
  },
  {
    category: 'odnowienie',
    q: 'Nie chcemy „powtarzać” starej przysięgi. Jak napisać nowe słowa po latach?',
    a: 'Wypowiadanie przysięgi po kilku lub kilkunastu latach wspólnego życia ma zupełnie inny wymiar niż w dniu pierwszego ślubu – dziś znacie się lepiej, wiecie, czym jest codzienne wsparcie i co razem zbudowaliście. Nie zostawiam Was z tym samych: przesyłam Wam autorski poradnik, pomagam wyciągnąć najważniejsze punkty Waszego wspólnego życia i szlifuję z Wami teksty tak, by idealnie oddawały Wasz język emocji. W dniu ceremonii przygotowuję też eleganckie karty, z których czytacie bez stresu o tremę czy pamięć.'
  },
  {
    category: 'odnowienie',
    q: 'Jak wygląda proces przygotowań i ile spotkań nas czeka?',
    a: 'Przygotowania są proste i bezstresowe. Zaczynamy od bezpłatnej rozmowy zapoznawczej online lub na żywo, podczas której omawiamy Waszą wizję. Następnie przesyłam Wam formularze z pytaniami o Wasze najpiękniejsze wspomnienia, przełomowe momenty i to, za co najbardziej się cenicie, a na tej podstawie piszę dedykowany scenariusz, który wspólnie dopracowujemy do idealnej formy. W dniu wydarzenia dbam o całą reżyserię i płynny przebieg, abyście mogli po prostu celebrować swoją miłość.'
  },
  {
    category: 'odnowienie',
    q: 'Jak włączyć w ceremonię nasze dzieci lub bliskich?',
    a: 'Obecność dzieci czy wieloletnich przyjaciół to jeden z najpiękniejszych elementów odnowienia przysięgi. Możemy wpleść ich w scenariusz na wiele sposobów: dzieci mogą wręczyć Wam nowe lub odświeżone obrączki, odczytać osobisty wiersz, wypowiedzieć krótkie podziękowanie lub wziąć udział we wspólnym rytuale rodzinnym (np. zapaleniu świecy jedności czy sadzeniu drzewa). Dążymy do tego, aby cała rodzina czuła się ważną częścią tej uroczystości.'
  },
  {
    category: 'odnowienie',
    q: 'Co jeśli zachorujesz albo zdarzy się coś nagłego?',
    a: 'Wasze bezpieczeństwo jest dla mnie priorytetem. Współpracuję z siecią sprawdzonych, profesjonalnych celebrantów, których często sama szkoliłam. W razie sytuacji losowej (np. nagłej choroby) Wasz dopracowany scenariusz zostaje przekazany zastępcy, który poprowadzi uroczystość na tym samym, najwyższym poziomie – nigdy nie zostawiam Par bez wsparcia.'
  },
  {
    category: 'odnowienie',
    q: 'Co w sytuacji, gdy ceremonia ma odbyć się w plenerze, a spadnie deszcz?',
    a: 'Pogoda bywa zmienna, dlatego już na etapie planowania ustalamy tzw. „Plan B” – np. namiot, zadaszoną altanę, werandę lub przeniesienie strefy ceremonii do wnętrza obiektu. Jestem przygotowana na każdą ewentualność, a scenariusz i prowadzenie dostosowuję płynnie do nowych warunków, bez utraty magii wydarzenia.'
  }
];

/** Krótkie opinie / cytaty (na podstawie charakteru pracy Mileny). */
const testimonials = [
  {
    quote:
      'Milena sprawiła, że nasza ceremonia była w 100% nasza. Goście do dziś wspominają, jak bardzo ich wzruszyła.',
    author: 'Ania & Tomek'
  },
  {
    quote:
      'Naturalna, lekka i pełna emocji – dokładnie taka, jakiej potrzebowaliśmy. Przysięga, którą pomogła nam napisać, była wyjątkowa.',
    author: 'Kasia & Marek'
  },
  {
    quote:
      'Profesjonalizm i ogromna wrażliwość. Milena naprawdę wsłuchała się w naszą historię i opowiedziała ją pięknie.',
    author: 'Paweł & Michał'
  }
];

module.exports = {
  url,
  brand,
  contact,
  nav,
  services,
  process,
  pricing,
  pricingNotes,
  faqCategories,
  faq,
  testimonials,
  year: new Date().getFullYear()
};
