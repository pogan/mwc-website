/**
 * Strony lokalne „Ślub humanistyczny w …” – jeden szablon (views/pages/lokalizacja.ejs),
 * treść per miasto. Każde miasto ma własny opis miejsc i logistyki, żeby strony nie były
 * kopiami z podmienioną nazwą (Google traktuje takie strony jak „doorway pages”).
 *
 * Nie wpisujemy tu konkretnych obiektów, w których Milena prowadziła ceremonie –
 * opisy realizacji z miejscem dodamy, gdy będą prawdziwe treści i zdjęcia.
 */

const locations = [
  {
    slug: 'gdansk',
    path: '/slub-humanistyczny-gdansk',
    city: 'Gdańsk',
    cityLocative: 'Gdańsku',
    heroImage: '/images/wedding-arch.webp',
    ogImage: '/images/wedding-arch.jpg',
    title: 'Ślub Humanistyczny Gdańsk – Celebrantka Milena Marczykowska',
    description:
      'Ślub humanistyczny w Gdańsku: celebrantka z Gdańska, autorski scenariusz, pomoc w przysiędze i koordynacja dnia ślubu. Plener, sala, nad morzem. Ceny od 1800 zł.',
    heroSubtitle: 'Celebrantka z Gdańska – ceremonia oparta na Waszej historii, w miejscu, które sami wybierzecie.',
    intro: [
      'Gdańsk to moje miasto – tu mieszkam i stąd wyjeżdżam na większość ceremonii. Dzięki temu znam lokalne realia: wiem, jak wygląda dojazd na Wyspę Sobieszewską w wakacyjny weekend, ile czasu potrzeba na przejazd przez centrum i jak przygotować plan B, gdy nad Zatoką zerwie się wiatr.',
      'Ślub humanistyczny w Gdańsku możecie zorganizować praktycznie wszędzie – w ogrodzie, w historycznym wnętrzu, na plaży czy w sali weselnej. To Wy decydujecie o miejscu, godzinie i przebiegu, a ja dbam o to, żeby ceremonia była osobista, płynna i naprawdę Wasza.'
    ],
    places: [
      {
        name: 'Nad morzem',
        text: 'Plaże w Brzeźnie, Jelitkowie i na Wyspie Sobieszewskiej dają szeroki horyzont i naturalne tło. Najlepiej sprawdzają się poza ścisłym sezonem lub wcześnie rano – wtedy jest ciszej i łatwiej o intymną atmosferę.'
      },
      {
        name: 'W historycznym otoczeniu',
        text: 'Kamienice Głównego Miasta, nabrzeża Motławy czy Oliwa mają klimat, którego nie da się zbudować dekoracjami. Ceremonie w takich miejscach zwykle odbywają się w wynajętych wnętrzach, ogrodach lub na tarasach obiektów.'
      },
      {
        name: 'W ogrodzie i plenerze',
        text: 'Dwory, pałace i ogrody na obrzeżach Gdańska oraz na pobliskich Kaszubach to najczęstszy wybór par, które chcą mieć ceremonię i przyjęcie w jednym miejscu, bez przejazdów.'
      },
      {
        name: 'W sali lub restauracji',
        text: 'Jeśli przyjęcie odbywa się w hotelu lub restauracji, ceremonię można poprowadzić w osobnej części sali lub na tarasie – goście nie muszą się nigdzie przemieszczać.'
      }
    ],
    logistics: [
      'Dojazd w granicach Gdańska jest wliczony w cenę ceremonii (do 30 km od centrum).',
      'Ślub humanistyczny nie wywołuje skutków prawnych – formalności możecie załatwić wcześniej w Urzędzie Stanu Cywilnego w Gdańsku (tzw. „ślub cywilny w trampkach”) albo połączyć obie ceremonie tego samego dnia, za zgodą urzędu.',
      'W miejscach publicznych, np. w parkach czy na plaży, warto wcześniej zapytać zarządcę terenu, czy uroczystość wymaga zgody.'
    ]
  },
  {
    slug: 'sopot',
    path: '/slub-humanistyczny-sopot',
    city: 'Sopot',
    cityLocative: 'Sopocie',
    heroImage: '/images/wedding-beach.webp',
    ogImage: '/images/wedding-beach.jpg',
    title: 'Ślub Humanistyczny Sopot – ceremonia nad morzem | Milena Marczykowska',
    description:
      'Ślub humanistyczny w Sopocie: ceremonia na plaży, w hotelu nad morzem lub w ogrodzie. Celebrantka z Trójmiasta, autorski scenariusz, dojazd w cenie. Ceny od 1800 zł.',
    heroSubtitle: 'Ceremonia nad morzem – osobista, swobodna i dopasowana do Waszego rytmu dnia.',
    intro: [
      'Sopot to naturalny wybór dla par, które marzą o ceremonii z widokiem na morze. Szeroka plaża, nadmorskie hotele z tarasami i zielone wzgórza tuż za centrum sprawiają, że na niewielkiej przestrzeni macie do wyboru bardzo różne scenerie.',
      'Z Gdańska dojeżdżam do Sopotu w kilkanaście minut, więc dojazd jest wliczony w cenę ceremonii. Pomogę Wam zaplanować przebieg tak, żeby uwzględnić to, co w Sopocie najważniejsze: sezonowy ruch turystów, wiatr od morza i porę dnia.'
    ],
    places: [
      {
        name: 'Na plaży',
        text: 'Ceremonia na piasku wymaga kilku przygotowań: stabilnego podłoża pod krzesła lub ławki, osłony od wiatru dla nagłośnienia i planu B na deszcz. Rano lub poza sezonem plaża jest spokojniejsza, a światło łagodniejsze do zdjęć.'
      },
      {
        name: 'Na tarasie hotelu nad morzem',
        text: 'Wiele nadmorskich obiektów ma tarasy lub ogrody z widokiem na Zatokę. To dobre połączenie: morze w tle, a jednocześnie zaplecze, toalety i przyjęcie kilka kroków dalej.'
      },
      {
        name: 'W zieleni Górnego Sopotu',
        text: 'Wille i ogrody w górnej części miasta są cichsze i bardziej kameralne niż deptak. Sprawdzają się przy mniejszych uroczystościach i ceremoniach dla najbliższej rodziny.'
      },
      {
        name: 'W sali',
        text: 'Jeśli pogoda nie dopisze albo wolicie przewidywalność, ceremonię poprowadzę we wnętrzu – często w tym samym obiekcie, w którym odbywa się przyjęcie.'
      }
    ],
    logistics: [
      'Dojazd do Sopotu jest wliczony w cenę ceremonii.',
      'W sezonie letnim planujcie zapas czasu na dojazd gości i parkowanie – centrum Sopotu bywa wtedy mocno zatłoczone.',
      'Ceremonia na plaży to przestrzeń publiczna – warto sprawdzić u zarządcy plaży, czy uroczystość wymaga zgłoszenia, i zawsze mieć gotowy plan B pod dachem.',
      'Formalności prawne możecie załatwić w dowolnym Urzędzie Stanu Cywilnego przed ceremonią albo połączyć obie uroczystości tego samego dnia, za zgodą urzędu.'
    ]
  },
  {
    slug: 'gdynia',
    path: '/slub-humanistyczny-gdynia',
    city: 'Gdynia',
    cityLocative: 'Gdyni',
    heroImage: '/images/wedding-candles.webp',
    ogImage: '/images/wedding-candles.jpg',
    title: 'Ślub Humanistyczny Gdynia – Celebrantka z Trójmiasta | Milena Marczykowska',
    description:
      'Ślub humanistyczny w Gdyni: ceremonia nad morzem, na klifie, w plenerze lub w sali. Celebrantka z Trójmiasta, autorski scenariusz i pomoc w przysiędze. Ceny od 1800 zł.',
    heroSubtitle: 'Morze, klify i nowoczesne miasto – ceremonia, która pasuje do Was, nie do szablonu.',
    intro: [
      'Gdynia łączy morski charakter z dużą ilością zieleni. Nadmorskie bulwary, okolice Orłowa i Kamiennej Góry czy lasy Trójmiejskiego Parku Krajobrazowego tuż za miastem dają wiele możliwości – od ceremonii z widokiem na Zatokę po kameralną uroczystość wśród drzew.',
      'Prowadzę ceremonie w całym Trójmieście, a z Gdańska do Gdyni mam niedaleko. Pomogę Wam wybrać porę i miejsce tak, żeby goście dotarli bez stresu, a nagłośnienie i plan B były gotowe na każdą pogodę.'
    ],
    places: [
      {
        name: 'Nad morzem',
        text: 'Plaże w Orłowie i Śródmieściu oraz nadmorskie bulwary to scenerie, które same budują nastrój. Przy ceremonii na zewnątrz nad Zatoką zawsze uwzględniamy wiatr – ma znaczenie i dla nagłośnienia, i dla fryzur.'
      },
      {
        name: 'Z widokiem z góry',
        text: 'Wzgórza nad miastem i nadmorskie klify dają szerokie panoramy. To dobre miejsca na kameralne ceremonie – trzeba tylko sprawdzić dojście dla starszych gości.'
      },
      {
        name: 'W lesie i parku',
        text: 'Gdynia graniczy z Trójmiejskim Parkiem Krajobrazowym. Leśne polany i obiekty na skraju lasu to propozycja dla par, które chcą ciszy, zieleni i naturalnego światła.'
      },
      {
        name: 'W sali lub na tarasie',
        text: 'Hotele i restauracje w Gdyni często mają tarasy lub ogrody, w których można poprowadzić ceremonię tuż przed przyjęciem – bez przejazdów i z zapleczem na wypadek deszczu.'
      }
    ],
    logistics: [
      'Dojazd do 30 km od Gdańska jest wliczony w cenę ceremonii – obejmuje to zdecydowaną większość Gdyni. Dokładną odległość sprawdzę przy wycenie.',
      'Ślub humanistyczny nie wywołuje skutków prawnych – podpisy możecie złożyć wcześniej w Urzędzie Stanu Cywilnego w Gdyni albo połączyć obie ceremonie tego samego dnia, za zgodą urzędu.',
      'Przy ceremonii w plenerze ustalamy plan B (namiot, taras, sala) już na etapie przygotowań.'
    ]
  }
];

module.exports = { locations };
