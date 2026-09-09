// Po 5 najlepiej dopasowanych hashtagów na karuzelę (marka + lokalizacja +
// temat). Wspólne źródło dla gen-texts.mjs i gen-opisy-long.mjs.

// Kategorie FAQ.
export const HT_CAT = {
  slub: '#ślubhumanistyczny #mistrzceremonii #ślubtrójmiasto #przysięgaślubna #ślub2027',
  przywitanie: '#przywitaniedziecka #ceremoniapowitania #rodzicehonorowi #alternatywadlachrztu #mistrzceremonii',
  pogrzeb: '#pożegnaniehumanistyczne #ceremoniapożegnania #mowapożegnalna #świeckipogrzeb #mistrzceremonii',
  odnowienie: '#odnowienieprzysięgi #rocznicaślubu #jubileuszmałżeński #mistrzceremonii #ślubtrójmiasto',
};

// Karuzele kampanijne (klucz = slug).
export const HT_KAMP = {
  'rocznice-slubu': '#rocznicaślubu #odnowienieprzysięgi #jubileuszmałżeński #srebrnegody #złotegody',
  'jubileusze': '#jubileuszmałżeński #rocznicaślubu #nazwyrocznic #odnowienieprzysięgi #tradycjaślubna',
  'pary-lgbtq-promocja': '#ślublgbtq #loveislove #ceremoniahumanistyczna #ślubtrójmiasto #promocjaślubna',
  'mity': '#ślubhumanistyczny #mityoślubie #ślubbezksiędza #ślubcywilnywtrampkach #mistrzceremonii',
  'rytualy-jednosci': '#rytuałjedności #świecajedności #handfasting #ceremoniahumanistyczna #ślubneinspiracje',
  'cennik': '#cennikślubny #ilekosztujeślub #mistrzceremonii #ślubnybudżet #ślubhumanistyczny',
  'pory-roku': '#ślubwplenerze #ślubhumanistyczny #ślub2027 #ślubneinspiracje #mistrzceremonii',
  'wolne-terminy': '#wolneterminy2027 #ślub2027 #mistrzceremonii #ślubtrójmiasto #rezerwacjaterminu',
};

// cat: 'slub' | 'przywitanie' | 'pogrzeb' | 'odnowienie' | 'kampanie'
export function tagsFor(cat, slug) {
  return cat === 'kampanie' ? (HT_KAMP[slug] || HT_CAT.slub) : (HT_CAT[cat] || HT_CAT.slub);
}
