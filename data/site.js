/**
 * Centralne dane strony – treści współdzielone przez wszystkie podstrony.
 * Dzięki temu nawigacja, oferta, cennik, FAQ i dane kontaktowe są w jednym miejscu.
 */

const url = 'https://milenawolakceremonie.pl';

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
  name: 'Milena Wolak',
  role: 'Celebrantka ceremonii humanistycznych',
  short: 'Milena Wolak Ceremonie Humanistyczne',
  tagline: 'Wasza historia, opowiedziana tak, jak Wam odpowiada.'
};

/** Pozycje głównego menu (kolejność ma znaczenie). */
const nav = [
  { path: '/', label: 'Start' },
  { path: '/ceremonie-slubne', label: 'Ceremonie ślubne' },
  { path: '/pary-jednoplciowe', label: 'Pary jednopłciowe' },
  { path: '/przywitanie-dziecka', label: 'Przywitanie dziecka' },
  { path: '/ceremonie-funeralne', label: 'Ceremonie funeralne' },
  { path: '/o-mnie', label: 'O mnie' },
  { path: '/cennik', label: 'Cennik' },
  { path: '/faq', label: 'FAQ' },
  { path: '/kontakt', label: 'Kontakt' }
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
    title: 'Pary jednopłciowe',
    path: '/pary-jednoplciowe',
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
    title: 'Ceremonie funeralne',
    path: '/ceremonie-funeralne',
    image: '/images/funerals.webp',
    icon: 'leaf',
    excerpt:
      'Godne, świeckie pożegnanie bliskiej osoby – opowieść o życiu, które warto uczcić słowem, ciszą i pamięcią.'
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

/** Pakiety cenowe (na podstawie oferty Mileny). */
const pricing = [
  {
    name: 'Ceremonia personalizowana',
    price: '2100 zł',
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
    name: 'Ceremonia stylizowana na cywilną',
    price: '1700 zł',
    highlight: false,
    features: [
      'Klasyczna struktura ceremonii stylizowana na ceremonię cywilną',
      'Bez autorskiej historii i rytuałów',
      'Certyfikat ślubu'
    ]
  },
  {
    name: 'Ceremonia personalizowana – dwujęzyczna',
    price: '2800 zł',
    highlight: false,
    features: [
      'Spersonalizowany scenariusz w dwóch językach',
      'Możliwość przeprowadzenia dodatkowych rytuałów',
      'Pomoc w napisaniu przysięgi',
      'Certyfikat ślubu',
      'Koordynacja z wykonawcami'
    ]
  },
  {
    name: 'Ceremonia stylizowana – dwujęzyczna',
    price: '2200 zł',
    highlight: false,
    features: [
      'Stylizacja na ceremonię cywilną',
      'Poprowadzenie w dwóch językach',
      'Bez autorskiej historii i rytuałów',
      'Certyfikat ślubu'
    ]
  }
];

/** Dodatkowe informacje cenowe. */
const pricingNotes = [
  'Oprawa muzyczna: od 1500 zł – skrzypce, gitara, pianino, wokal, kwartet smyczkowy lub harfa.',
  'Transport do 30 km od Gdańska w cenie ceremonii.',
  'Powyżej 30 km – koszt dojazdu według ustawowej stawki kilometrowej.',
  'Każdą wycenę przygotowuję indywidualnie, zgodnie z lokalizacją i charakterem Waszego wydarzenia.'
];

/** Najczęściej zadawane pytania. */
const faq = [
  {
    q: 'Czym jest ślub humanistyczny?',
    a: 'Ślub humanistyczny to ceremonia symboliczna, która nie ma charakteru prawnego, ale jest pełnoprawnym, emocjonalnym wydarzeniem celebrującym Wasz związek. Możecie wybrać miejsce, czas i formę – nie ma ograniczeń. To Wasza historia, opowiedziana tak, jak Wam odpowiada.'
  },
  {
    q: 'Czy mogę połączyć ślub humanistyczny z cywilnym?',
    a: 'Tak, absolutnie! Mogę pomóc w koordynacji obu ceremonii, a także przygotować spersonalizowany scenariusz, który połączy tradycyjny format z Waszą wyjątkową historią. Z Urzędem Stanu Cywilnego mogę również potwierdzić przebieg ceremonii.'
  },
  {
    q: 'Jak wygląda przygotowanie do przysięgi?',
    a: 'Pomogę Wam napisać przysięgę, która rzeczywiście odda Wasze emocje i oczekiwania. Możemy przygotować wspólną przysięgę lub osobne wersje – wszystko zależy od Was. Ważne, aby była autentyczna i oddawała Waszą relację.'
  },
  {
    q: 'Czy współpracujesz z oprawą muzyczną?',
    a: 'Tak, współpracuję z wykwalifikowanymi muzykami – skrzypkami, gitarzystami, pianistami, wokalistami, kwartetami smyczkowymi i harfistkami. Oprawa muzyczna zaczyna się od 1500 zł i może być dostosowana do Waszych preferencji i budżetu.'
  },
  {
    q: 'Jakie są koszty dojazdu?',
    a: 'Transport do 30 km od Gdańska jest wliczony w cenę. Dla wydarzeń dalej niż 30 km koszt dojazdu obliczany jest według ustawowej stawki kilometrowej. Zawsze przygotuję dokładną wycenę zgodnie z lokalizacją Waszego wydarzenia.'
  },
  {
    q: 'Czy prowadzisz ceremonie dla par jednopłciowych?',
    a: 'Oczywiście. Prowadzę ceremonie z pasją i wrażliwością dla każdej pary – bez wyjątku. Ślub humanistyczny nie ma ograniczeń prawnych, dlatego jest piękną formą celebracji miłości każdej pary, która chce publicznie wyrazić swoje uczucie.'
  },
  {
    q: 'Czy mogę zorganizować ceremonię poza Trójmiastem?',
    a: 'Tak. Na co dzień działam w Gdańsku i całym Trójmieście, ale chętnie przyjadę w dowolne miejsce w Polsce. Szczegóły dojazdu ustalimy indywidualnie podczas naszej rozmowy.'
  },
  {
    q: 'Z jakim wyprzedzeniem najlepiej się zgłosić?',
    a: 'Im wcześniej, tym lepiej – dzięki temu spokojnie zaplanujemy spotkania i dopracujemy scenariusz. Jeśli jednak Wasza data jest już blisko, napiszcie śmiało; postaram się znaleźć rozwiązanie.'
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
  faq,
  testimonials,
  year: new Date().getFullYear()
};
