/**
 * Poradniki (/poradnik/…). Metadane do tras, stopki, sitemapy i danych strukturalnych;
 * treść każdego poradnika jest w osobnym szablonie views/pages/poradnik/<slug>.ejs.
 * `updated` aktualizujcie przy każdej merytorycznej zmianie treści (trafia do Article
 * w JSON-LD i do lastmod w sitemapie).
 */

const guides = [
  {
    slug: 'ile-kosztuje-slub-humanistyczny',
    path: '/poradnik/ile-kosztuje-slub-humanistyczny',
    title: 'Ile kosztuje ślub humanistyczny? Ceny i koszty dodatkowe | Milena Marczykowska',
    heading: 'Ile kosztuje ślub humanistyczny?',
    linkLabel: 'Ile kosztuje ślub humanistyczny',
    description:
      'Ile kosztuje ślub humanistyczny w Polsce: cena celebrantki (1800–3100 zł), oprawa muzyczna, dojazd i koszty ślubu cywilnego. Co wpływa na cenę i na czym nie oszczędzać.',
    excerpt: 'Cena celebrantki, muzyka, dojazd i formalności w USC – wszystkie koszty w jednym miejscu.',
    heroImage: '/images/wedding-rustic.webp',
    ogImage: '/images/wedding-rustic.jpg',
    published: '2026-10-16',
    updated: '2026-10-16'
  },
  {
    slug: 'jak-napisac-przysiege-slubna',
    path: '/poradnik/jak-napisac-przysiege-slubna',
    title: 'Jak napisać przysięgę ślubną? Struktura, długość, przykłady | Milena Marczykowska',
    heading: 'Jak napisać przysięgę ślubną?',
    linkLabel: 'Jak napisać przysięgę ślubną',
    description:
      'Jak napisać osobistą przysięgę ślubną krok po kroku: od czego zacząć, jaka długość, prosta struktura, przykładowe zdania i jak przeczytać ją bez stresu. Poradnik celebrantki.',
    excerpt: 'Prosta struktura, długość, przykładowe zdania i sposób na tremę – krok po kroku.',
    heroImage: '/images/wedding-vows.webp',
    ogImage: '/images/wedding-vows.jpg',
    published: '2026-10-16',
    updated: '2026-10-16'
  }
];

module.exports = { guides };
