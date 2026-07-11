export const dict = {
  appName: { de: 'Fishpedia', en: 'Fishpedia' },
  tagline: {
    de: 'Dein Angel-Begleiter für Berlin & Brandenburg',
    en: 'Your fishing companion for Berlin & Brandenburg',
  },
  searchPlaceholder: {
    de: 'Fisch suchen (z. B. Hecht, Esox …)',
    en: 'Search fish (e.g. pike, Esox …)',
  },
  filterAll: { de: 'Alle', en: 'All' },
  filterOpen: { de: 'Fangbar', en: 'In season' },
  filterClosed: { de: 'Schonzeit', en: 'Closed season' },
  filterProtected: { de: 'Geschont', en: 'Protected' },
  statusOpen: { de: 'Fangbar', en: 'In season' },
  statusClosed: { de: 'Schonzeit', en: 'Closed season' },
  statusProtected: { de: 'Ganzjährig geschont', en: 'Protected year-round' },
  statusUnregulated: { de: 'Keine Beschränkung', en: 'No restrictions' },
  minSize: { de: 'Mindestmaß', en: 'Min. size' },
  closedSeason: { de: 'Schonzeit', en: 'Closed season' },
  none: { de: 'keine', en: 'none' },
  noMinSize: { de: 'kein Mindestmaß', en: 'no minimum size' },
  reopens: { de: 'fangbar ab', en: 'opens on' },
  closesOn: { de: 'Schonzeit ab', en: 'closes on' },
  identification: { de: 'Erkennungsmerkmale', en: 'Identification' },
  habitat: { de: 'Lebensraum', en: 'Habitat' },
  size: { de: 'Größe', en: 'Size' },
  avgLength: { de: 'Üblich', en: 'Typical' },
  maxLength: { de: 'Maximal', en: 'Maximum' },
  regulations: { de: 'Bestimmungen', en: 'Regulations' },
  regionBerlin: { de: 'Berlin', en: 'Berlin' },
  regionBrandenburg: { de: 'Brandenburg', en: 'Brandenburg' },
  categoryPredator: { de: 'Raubfische', en: 'Predators' },
  categoryCyprinid: { de: 'Friedfische', en: 'Coarse fish' },
  categorySalmonid: { de: 'Salmoniden', en: 'Salmonids' },
  categoryProtected: { de: 'Geschützte Arten', en: 'Protected species' },
  navFish: { de: 'Fische', en: 'Fish' },
  navMap: { de: 'Karte', en: 'Map' },
  navCalendar: { de: 'Kalender', en: 'Calendar' },
  navInfo: { de: 'Info', en: 'Info' },
  mapTitle: {
    de: 'Erlaubte Gewässer (Berlin)',
    en: 'Permitted waters (Berlin)',
  },
  mapIntro: {
    de: 'Diese Gewässer deckt die Angelkarte ab. Antippen zeigt Name und Auflagen.',
    en: 'These waters are covered by the permit. Tap an area for its name and conditions.',
  },
  mapLegendCanal: {
    de: 'Kanäle & Flussstrecken',
    en: 'Canals & river sections',
  },
  mapLegendLake: { de: 'Seen', en: 'Lakes' },
  mapApproximate: {
    de: 'Abgrenzung teils schematisch',
    en: 'boundary partly schematic',
  },
  mapDisclaimer: {
    de: 'Die Karte ersetzt nicht den Erlaubnisschein oder die Gewässerordnung. Sie benötigt Internet; die Gewässerliste funktioniert auch offline. Gewässerdaten © OpenStreetMap-Mitwirkende (ODbL).',
    en: 'The map does not replace the permit or the water rules. It needs internet; the water list also works offline. Water data © OpenStreetMap contributors (ODbL).',
  },
  mapKeyMissing: {
    de: 'Google-Maps-API-Schlüssel fehlt. VITE_GOOGLE_MAPS_API_KEY in .env.local setzen und neu bauen – die Gewässerliste unten funktioniert trotzdem.',
    en: 'Google Maps API key missing. Set VITE_GOOGLE_MAPS_API_KEY in .env.local and rebuild – the water list below still works.',
  },
  mapTitleBb: {
    de: 'Erlaubte Gewässer (Brandenburg)',
    en: 'Permitted waters (Brandenburg)',
  },
  mapIntroBb: {
    de: 'Gewässer des LAVB-Gewässerfonds (Angelkarte Brandenburg). Pin antippen für Details und Auflagen.',
    en: 'Waters of the LAVB water fund (Brandenburg permit). Tap a pin for details and restrictions.',
  },
  mapDisclaimerBb: {
    de: 'Die Karte ersetzt nicht den Erlaubnisschein oder die Gewässerordnung. Gewässerdaten © Landesanglerverband Brandenburg e.V. –',
    en: 'The map does not replace the permit or the water rules. Water data © Landesanglerverband Brandenburg e.V. –',
  },
  mapSourceLavb: {
    de: 'offizielle LAVB-Gewässerkarte',
    en: 'official LAVB water map',
  },
  mapSearchHintBb: {
    de: 'Suchen und Eintrag antippen, um das Gewässer auf der Karte zu zeigen.',
    en: 'Search and tap an entry to show the water on the map.',
  },
  mapSearchPlaceholderBb: {
    de: 'Gewässer suchen (Name oder Nummer) …',
    en: 'Search waters (name or number)…',
  },
  mapWaters: { de: 'Gewässer', en: 'Waters' },
  mapDirections: { de: 'Route', en: 'Directions' },
  mapZoomHint: {
    de: 'Eintrag antippen, um das Gewässer auf der Karte zu zeigen.',
    en: 'Tap an entry to show the water on the map.',
  },
  calendarTitle: { de: 'Schonzeiten-Kalender', en: 'Closed season calendar' },
  calendarHint: {
    de: 'Rote Felder markieren die Schonzeit, das Feld des aktuellen Monats ist umrandet. Ganzjährig geschonte Arten sind vollständig markiert.',
    en: 'Red cells mark the closed season; the current month is outlined. Fully protected species are marked across the year.',
  },
  today: { de: 'Heute', en: 'Today' },
  noResults: {
    de: 'Kein Fisch gefunden. Suchbegriff oder Filter anpassen.',
    en: 'No fish found. Adjust your search or filters.',
  },
  backToList: { de: 'Alle Fische', en: 'All fish' },
  photoLabel: { de: 'Foto', en: 'Photo' },
  illustrationLabel: { de: 'Illustration', en: 'Illustration' },
  protectedBanner: {
    de: 'Diese Art ist ganzjährig geschont und muss unverzüglich schonend zurückgesetzt werden!',
    en: 'This species is protected year-round and must be released immediately and gently!',
  },
  undersizedHint: {
    de: 'Untermaßige oder in der Schonzeit gefangene Fische unverzüglich schonend zurücksetzen.',
    en: 'Release undersized fish and fish caught in the closed season immediately and gently.',
  },
  infoTitle: { de: 'Rechtliches & Quellen', en: 'Legal notes & sources' },
  infoStand: { de: 'Datenstand', en: 'Data as of' },
  infoDisclaimer: {
    de: 'Diese App ist eine private Orientierungshilfe und ersetzt nicht die amtlichen Bekanntmachungen. Verbindlich sind allein die Landesfischereiordnung Berlin, die Fischereiordnung des Landes Brandenburg sowie die jeweilige Gewässer- bzw. Erlaubnisscheinordnung. Für einzelne Gewässer können abweichende (auch strengere) Regeln gelten. Alle Angaben ohne Gewähr.',
    en: 'This app is a private reference aid and does not replace official publications. Only the Berlin State Fisheries Ordinance, the Brandenburg Fisheries Ordinance and the rules of the specific water / permit are legally binding. Individual waters may have different (also stricter) rules. All information without guarantee.',
  },
  infoLicense: {
    de: 'Zum Angeln brauchst du einen Fischereischein und für das jeweilige Gewässer eine Angelkarte (Erlaubnisschein). In Brandenburg ist für das Friedfischangeln kein Fischereischein nötig (Fischereiabgabe genügt), in Berlin gilt Fischereischeinpflicht.',
    en: 'You need a fishing licence (Fischereischein) plus a permit (Angelkarte) for the specific water. In Brandenburg coarse fishing is possible without the licence (paying the fishing levy suffices); in Berlin the licence is always required.',
  },
  infoSources: { de: 'Offizielle Quellen', en: 'Official sources' },
  installHint: {
    de: 'Tipp: Über »Zum Startbildschirm hinzufügen« wird Fishpedia zur App und funktioniert auch offline am Wasser.',
    en: 'Tip: Use “Add to Home Screen” to install Fishpedia as an app - it also works offline at the water.',
  },
  footerNote: {
    de: 'Alle Angaben ohne Gewähr – amtliche Quellen sind verbindlich.',
    en: 'No guarantee – official sources are binding.',
  },
} as const

export type DictKey = keyof typeof dict
