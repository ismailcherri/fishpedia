import type { FishSpecies } from '../types'

// Species anglers must never keep – shown so bycatch can be identified
// and released correctly.

export const protectedSpecies: FishSpecies[] = [
  {
    id: 'stoer',
    names: { de: 'Baltischer Stör', en: 'Baltic Sturgeon', scientific: 'Acipenser oxyrinchus' },
    category: 'protected',
    description: {
      de: 'Der Stör wird in Oder und Elbe im Rahmen von Wiederansiedlungsprojekten besetzt. Jeder Fang muss sofort schonend zurückgesetzt und sollte gemeldet werden.',
      en: 'Sturgeon are stocked in the Oder and Elbe as part of reintroduction projects. Any catch must be released immediately and should be reported.',
    },
    identification: [
      {
        de: 'Fünf Reihen von Knochenplatten statt Schuppen',
        en: 'Five rows of bony plates instead of scales',
      },
      {
        de: 'Vier Bartfäden vor dem unterständigen, vorstülpbaren Maul',
        en: 'Four barbels in front of the underslung, protrusible mouth',
      },
      {
        de: 'Haiähnliche, asymmetrische Schwanzflosse und spitze Schnauze',
        en: 'Shark-like asymmetric tail fin and pointed snout',
      },
    ],
    habitat: {
      de: 'Wanderfisch; Besatz in Oder und Elbe, Einzelfänge in Havel möglich.',
      en: 'Migratory; stocked in Oder and Elbe, single catches possible in the Havel.',
    },
    avgLengthCm: 100,
    maxLengthCm: 300,
    image: { svg: 'stoer.svg' },
    regulations: {
      berlin: {
        fullyProtected: true,
        note: {
          de: 'Ganzjährig geschont. Fang bitte an das Fischereiamt bzw. das Leibniz-IGB melden.',
          en: 'Protected year-round. Please report catches to the fisheries office or Leibniz-IGB.',
        },
      },
      brandenburg: {
        fullyProtected: true,
        note: {
          de: 'Ganzjährig geschont. Fang bitte an die Fischereibehörde melden.',
          en: 'Protected year-round. Please report catches to the fisheries authority.',
        },
      },
    },
  },
  {
    id: 'bitterling',
    names: { de: 'Bitterling', en: 'European Bitterling', scientific: 'Rhodeus amarus' },
    category: 'protected',
    description: {
      de: 'Der kleine Bitterling legt seine Eier in lebende Teich- und Flussmuscheln. Er ist streng geschützt und darf nicht entnommen werden.',
      en: 'The little bitterling lays its eggs inside living freshwater mussels. It is strictly protected and must not be taken.',
    },
    identification: [
      {
        de: 'Nur 5–8 cm klein, hochrückig und silbrig',
        en: 'Only 5–8 cm, deep-bodied and silvery',
      },
      {
        de: 'Blaugrüner Längsstreifen auf dem hinteren Flankendrittel',
        en: 'Blue-green stripe along the rear third of the flank',
      },
      {
        de: 'Zur Laichzeit Männchen mit rosa Schimmer, Weibchen mit Legeröhre',
        en: 'In spawning season males show pink hues, females an ovipositor tube',
      },
    ],
    habitat: {
      de: 'Stille, krautige Gewässer mit Großmuschel-Beständen.',
      en: 'Still weedy waters holding freshwater mussel beds.',
    },
    avgLengthCm: 6,
    maxLengthCm: 10,
    image: { svg: 'bitterling.svg' },
    regulations: {
      berlin: { fullyProtected: true },
      brandenburg: { fullyProtected: true },
    },
  },
  {
    id: 'steinbeisser',
    names: { de: 'Steinbeißer', en: 'Spined Loach', scientific: 'Cobitis taenia' },
    category: 'protected',
    description: {
      de: 'Der Steinbeißer gräbt sich tagsüber in sandigen Grund ein und kaut Sand nach Nahrung durch. Er ist ganzjährig geschont.',
      en: 'The spined loach buries itself in sandy bottoms by day and sifts sand for food. It is protected year-round.',
    },
    identification: [
      {
        de: 'Schlanker, bandförmiger Körper mit Reihe dunkler Flecken',
        en: 'Slender ribbon-like body with a row of dark blotches',
      },
      {
        de: 'Sechs Bartfäden am kleinen, unterständigen Maul',
        en: 'Six barbels on the small underslung mouth',
      },
      {
        de: 'Aufstellbarer Dorn unter jedem Auge',
        en: 'Erectable spine beneath each eye',
      },
    ],
    habitat: {
      de: 'Sandige Flachufer von Seen und langsamen Fließgewässern.',
      en: 'Sandy shallows of lakes and slow-flowing waters.',
    },
    avgLengthCm: 8,
    maxLengthCm: 13,
    image: { svg: 'steinbeisser.svg' },
    regulations: {
      berlin: { fullyProtected: true },
      brandenburg: { fullyProtected: true },
    },
  },
  {
    id: 'schlammpeitzger',
    names: { de: 'Schlammpeitzger', en: 'Weatherfish', scientific: 'Misgurnus fossilis' },
    category: 'protected',
    description: {
      de: 'Der »Wetterfisch« kann Luft schlucken und über den Darm atmen – so überlebt er in sauerstoffarmen Gräben. Er ist ganzjährig geschont.',
      en: 'The “weatherfish” can gulp air and breathe through its gut, surviving in oxygen-poor ditches. It is protected year-round.',
    },
    identification: [
      {
        de: 'Aalähnlicher, walzenförmiger Körper mit zehn Bartfäden',
        en: 'Eel-like cylindrical body with ten barbels',
      },
      {
        de: 'Dunkle Längsbänder über gelbbraunem Grund',
        en: 'Dark longitudinal bands on a yellow-brown base',
      },
      {
        de: 'Kleine, abgerundete Flossen',
        en: 'Small rounded fins',
      },
    ],
    habitat: {
      de: 'Schlammige Gräben, Altarme und flache Weiher, v. a. im Spreewald.',
      en: 'Muddy ditches, oxbows and shallow ponds, especially the Spreewald.',
    },
    avgLengthCm: 20,
    maxLengthCm: 30,
    image: { svg: 'schlammpeitzger.svg' },
    regulations: {
      berlin: { fullyProtected: true },
      brandenburg: { fullyProtected: true },
    },
  },
]
