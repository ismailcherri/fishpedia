import type { FishSpecies } from '../types'

export const salmonids: FishSpecies[] = [
  {
    id: 'bachforelle',
    names: {
      de: 'Bachforelle',
      en: 'Brown Trout',
      scientific: 'Salmo trutta fario',
    },
    category: 'salmonid',
    description: {
      de: 'Die Bachforelle besiedelt die wenigen kühlen, schnell fließenden Bäche der Region, etwa im Barnim und in der Schorfheide. Sie ist standorttreu und sehr scheu.',
      en: 'The brown trout inhabits the region’s few cool, fast-flowing brooks, for instance in the Barnim and Schorfheide. It is territorial and very shy.',
    },
    identification: [
      {
        de: 'Rote, hell umrandete Punkte auf den Flanken neben schwarzen Flecken',
        en: 'Red, pale-ringed spots on the flanks alongside black spots',
      },
      {
        de: 'Fettflosse zwischen Rücken- und Schwanzflosse',
        en: 'Adipose fin between dorsal and tail fin',
      },
      {
        de: 'Schwanzflosse kaum eingebuchtet, kräftiger Körper',
        en: 'Tail fin barely forked, stocky body',
      },
    ],
    habitat: {
      de: 'Kühle, sauerstoffreiche Bäche und kleine Flüsse mit Kiesgrund.',
      en: 'Cool, oxygen-rich brooks and small rivers with gravel beds.',
    },
    avgLengthCm: 30,
    maxLengthCm: 80,
    image: { svg: 'bachforelle.svg' },
    regulations: {
      berlin: {
        minSizeCm: 35,
        closedSeason: { from: '10-16', to: '04-15' },
      },
      brandenburg: {
        minSizeCm: 30,
        closedSeason: { from: '10-16', to: '04-15' },
      },
    },
  },
  {
    id: 'regenbogenforelle',
    names: {
      de: 'Regenbogenforelle',
      en: 'Rainbow Trout',
      scientific: 'Oncorhynchus mykiss',
    },
    category: 'salmonid',
    description: {
      de: 'Die aus Nordamerika stammende Regenbogenforelle wird vor allem in Angelteichen und einzelnen Fließgewässern besetzt.',
      en: 'Originally from North America, the rainbow trout is stocked mainly in fishing ponds and a few streams.',
    },
    identification: [
      {
        de: 'Rosafarbenes bis violettes Band entlang der Flanke',
        en: 'Pink to violet band along the flank',
      },
      {
        de: 'Dichte schwarze Tupfen auch auf Rücken- und Schwanzflosse',
        en: 'Dense black speckles including on dorsal and tail fin',
      },
      {
        de: 'Fettflosse vorhanden; keine roten Punkte',
        en: 'Adipose fin present; no red spots',
      },
    ],
    habitat: {
      de: 'Besatzgewässer: Forellenteiche und einige Bäche und Baggerseen.',
      en: 'Stocked waters: trout ponds and some brooks and gravel-pit lakes.',
    },
    avgLengthCm: 35,
    maxLengthCm: 80,
    image: { svg: 'regenbogenforelle.svg' },
    regulations: {
      berlin: { minSizeCm: 25 },
      brandenburg: { minSizeCm: 25 },
    },
  },
  {
    id: 'seeforelle',
    names: {
      de: 'Seeforelle',
      en: 'Lake Trout',
      scientific: 'Salmo trutta lacustris',
    },
    category: 'salmonid',
    description: {
      de: 'Die große Wanderform der Forelle lebt in tiefen, klaren Seen wie dem Werbellinsee und steigt zum Laichen in Zuflüsse auf.',
      en: 'The large migratory form of the trout lives in deep clear lakes such as Lake Werbellin and ascends tributaries to spawn.',
    },
    identification: [
      {
        de: 'Silbrige Flanken mit unregelmäßigen schwarzen Flecken, ohne rote Punkte',
        en: 'Silvery flanks with irregular black spots, without red spots',
      },
      {
        de: 'Fettflosse vorhanden, kräftiger Schwanzstiel',
        en: 'Adipose fin present, powerful tail wrist',
      },
      {
        de: 'Deutlich größer als Bachforellen desselben Gewässersystems',
        en: 'Considerably larger than brown trout of the same water system',
      },
    ],
    habitat: {
      de: 'Tiefe, sauerstoffreiche Klarwasserseen; in Brandenburg v. a. Werbellinsee.',
      en: 'Deep, oxygen-rich clear lakes; in Brandenburg chiefly Lake Werbellin.',
    },
    avgLengthCm: 60,
    maxLengthCm: 100,
    image: { svg: 'seeforelle.svg' },
    regulations: {
      berlin: {
        minSizeCm: 60,
        closedSeason: { from: '10-16', to: '04-15' },
      },
      brandenburg: {
        minSizeCm: 60,
        closedSeason: { from: '10-16', to: '04-15' },
      },
    },
  },
  {
    id: 'aesche',
    names: {
      de: 'Äsche',
      en: 'Grayling',
      scientific: 'Thymallus thymallus',
    },
    category: 'salmonid',
    description: {
      de: 'Die Äsche mit ihrer fahnenartigen Rückenflosse ist ein Charakterfisch sauberer Fließgewässer und in der Region selten geworden.',
      en: 'With its banner-like dorsal fin, the grayling is a character fish of clean flowing waters and has become rare in the region.',
    },
    identification: [
      {
        de: 'Auffallend große, bunt schillernde Rückenflosse (»Fahne«)',
        en: 'Strikingly large, iridescent dorsal fin (“banner”)',
      },
      {
        de: 'Kleines Maul, große Augen mit birnenförmiger Pupille',
        en: 'Small mouth, large eyes with pear-shaped pupils',
      },
      {
        de: 'Fettflosse vorhanden, silbergraue Flanken mit Längsstreifen',
        en: 'Adipose fin present, silver-grey flanks with longitudinal stripes',
      },
    ],
    habitat: {
      de: 'Sommerkühle, klare Flüsse mit Kiesgrund; vereinzelt in Brandenburger Fließen.',
      en: 'Summer-cool clear rivers with gravel bottom; sporadic in Brandenburg streams.',
    },
    avgLengthCm: 30,
    maxLengthCm: 50,
    image: { svg: 'aesche.svg' },
    regulations: {
      berlin: {
        minSizeCm: 30,
        closedSeason: { from: '12-01', to: '05-31' },
      },
      brandenburg: {
        minSizeCm: 30,
        closedSeason: { from: '12-01', to: '05-31' },
      },
    },
  },
  {
    id: 'grosse-maraene',
    names: {
      de: 'Große Maräne',
      en: 'Common Whitefish',
      scientific: 'Coregonus maraena',
    },
    category: 'salmonid',
    description: {
      de: 'Die Große Maräne lebt im kühlen Tiefenwasser klarer Brandenburger Seen wie Werbellin- und Stechlinsee und wird meist mit feinen Hegenen gefangen.',
      en: 'The common whitefish lives in the cool depths of clear Brandenburg lakes such as Werbellinsee and Stechlinsee, usually caught on fine jig rigs.',
    },
    identification: [
      {
        de: 'Silbriger, seitlich abgeflachter Körper mit kleinem Kopf',
        en: 'Silvery, laterally compressed body with a small head',
      },
      {
        de: 'Fettflosse vorhanden (Unterschied zu Weißfischen)',
        en: 'Adipose fin present (unlike cyprinids)',
      },
      {
        de: 'Kleines, leicht unterständiges Maul, große Schuppen',
        en: 'Small, slightly underslung mouth and large scales',
      },
    ],
    habitat: {
      de: 'Tiefe, nährstoffarme Klarwasserseen Nordbrandenburgs.',
      en: 'Deep, nutrient-poor clear lakes of northern Brandenburg.',
    },
    avgLengthCm: 35,
    maxLengthCm: 60,
    image: { svg: 'grosse-maraene.svg' },
    regulations: {
      berlin: {
        minSizeCm: 30,
        closedSeason: { from: '10-01', to: '12-31' },
        note: {
          de: 'Schonzeit gilt für Besatzbestände in stehenden Gewässern; in Fließgewässern ganzjährig geschont.',
          en: 'Closed season applies to stocked fish in still waters; protected year-round in flowing waters.',
        },
      },
      brandenburg: {
        minSizeCm: 30,
        closedSeason: { from: '10-01', to: '12-31' },
        note: {
          de: 'In Fließgewässern ganzjährig geschont; Schonzeit und Mindestmaß gelten für Seen (Besatz).',
          en: 'Protected year-round in flowing waters; season and size apply to lakes (stocked fish).',
        },
      },
    },
  },
  {
    id: 'lachs',
    names: {
      de: 'Atlantischer Lachs',
      en: 'Atlantic Salmon',
      scientific: 'Salmo salar',
    },
    category: 'salmonid',
    description: {
      de: 'Der Lachs wird in Elbe-Zuflüssen wiederangesiedelt und taucht als seltener Wandergast auch im Einzugsgebiet von Havel und Oder auf. Er ist ganzjährig geschont.',
      en: 'Salmon are being reintroduced in Elbe tributaries and appear as rare migrants in the Havel and Oder catchments. They are protected year-round.',
    },
    identification: [
      {
        de: 'Schlanker Schwanzstiel – Lachs lässt sich daran »am Schwanz greifen«',
        en: 'Slim tail wrist – a salmon can be “tailed” by hand',
      },
      {
        de: 'X-förmige schwarze Flecken meist nur oberhalb der Seitenlinie',
        en: 'X-shaped black spots mostly above the lateral line only',
      },
      {
        de: 'Leicht eingebuchtete Schwanzflosse, spitzer Kopf; Fettflosse vorhanden',
        en: 'Slightly forked tail, pointed head; adipose fin present',
      },
    ],
    habitat: {
      de: 'Wanderfisch; einzelne Aufsteiger in Elbe-, Oder- und Havelsystem.',
      en: 'Migratory; individual fish ascend the Elbe, Oder and Havel systems.',
    },
    avgLengthCm: 70,
    maxLengthCm: 150,
    image: { svg: 'lachs.svg' },
    regulations: {
      berlin: {
        fullyProtected: true,
      },
      brandenburg: {
        fullyProtected: true,
      },
    },
  },
  {
    id: 'meerforelle',
    names: {
      de: 'Meerforelle',
      en: 'Sea Trout',
      scientific: 'Salmo trutta trutta',
    },
    category: 'salmonid',
    description: {
      de: 'Die Wanderform der Forelle steigt vereinzelt aus der Ostsee über die Oder in Brandenburger Fließgewässer auf. Sie ist ganzjährig geschont.',
      en: 'The migratory form of the trout occasionally ascends from the Baltic via the Oder into Brandenburg streams. It is protected year-round.',
    },
    identification: [
      {
        de: 'Silberner Körper mit schwarzen Punkten auch unterhalb der Seitenlinie',
        en: 'Silver body with black spots also below the lateral line',
      },
      {
        de: 'Kräftiger Schwanzstiel, gerade Schwanzflossenkante',
        en: 'Thick tail wrist and a straight tail edge',
      },
      {
        de: 'Fettflosse vorhanden; Maulspalte reicht hinter das Auge',
        en: 'Adipose fin present; mouth gape extends past the eye',
      },
    ],
    habitat: {
      de: 'Wanderfisch zwischen Ostsee und Flussoberläufen; Oder, Uecker, einzelne Fließe.',
      en: 'Migrates between the Baltic and upper river reaches; Oder, Uecker, some streams.',
    },
    avgLengthCm: 60,
    maxLengthCm: 100,
    image: { svg: 'meerforelle.svg' },
    regulations: {
      berlin: {
        fullyProtected: true,
      },
      brandenburg: {
        fullyProtected: true,
      },
    },
  },
]
