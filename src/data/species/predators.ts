import type { FishSpecies } from '../types'

// Regulations: LFischO Berlin (berlin.de/fischereiamt) and BbgFischO Anlage 1.
// Values marked "verify" in notes should be re-checked against the official
// tables when updating STAND in src/data/meta.ts.

export const predators: FishSpecies[] = [
  {
    id: 'hecht',
    names: { de: 'Hecht', en: 'Northern Pike', scientific: 'Esox lucius' },
    category: 'predator',
    description: {
      de: 'Der Hecht ist der bekannteste Raubfisch der Berliner und Brandenburger Gewässer. Als Lauerjäger steht er bevorzugt im Kraut oder an Schilfkanten und packt seine Beute mit einem blitzschnellen Vorstoß.',
      en: 'The pike is the best-known predator in Berlin and Brandenburg waters. An ambush hunter, it lurks in weed beds and along reed edges, seizing prey with a lightning-fast strike.',
    },
    identification: [
      {
        de: 'Langgestreckter Körper mit entenschnabelartigem, flachem Maul voller spitzer Zähne',
        en: 'Elongated body with a flat, duckbill-like snout full of sharp teeth',
      },
      {
        de: 'Rücken- und Afterflosse weit hinten am Schwanz – typische Pfeilform',
        en: 'Dorsal and anal fins set far back near the tail – typical arrow shape',
      },
      {
        de: 'Grün-goldene Marmorierung mit hellen, länglichen Flecken an den Flanken',
        en: 'Green-golden marbling with light, elongated spots along the flanks',
      },
    ],
    habitat: {
      de: 'Krautreiche Ufer von Seen und langsam fließenden Flüssen, z. B. Havel, Müggelsee, Scharmützelsee.',
      en: 'Weedy margins of lakes and slow rivers, e.g. Havel, Müggelsee, Scharmützelsee.',
    },
    avgLengthCm: 60,
    maxLengthCm: 130,
    image: { svg: 'hecht.svg' },
    regulations: {
      berlin: {
        minSizeCm: 45,
        closedSeason: { from: '01-01', to: '04-30' },
      },
      brandenburg: {
        minSizeCm: 45,
        closedSeason: { from: '02-01', to: '03-31' },
      },
    },
  },
  {
    id: 'zander',
    names: {
      de: 'Zander',
      en: 'Zander / Pikeperch',
      scientific: 'Sander lucioperca',
    },
    category: 'predator',
    description: {
      de: 'Der Zander ist ein dämmerungs- und nachtaktiver Raubfisch klarer bis leicht trüber Gewässer. In den großen Havelseen und der Spree ist er einer der beliebtesten Zielfische.',
      en: 'The zander is a crepuscular and nocturnal predator of clear to slightly turbid waters. It is one of the most popular target fish in the large Havel lakes and the Spree.',
    },
    identification: [
      {
        de: 'Spindelförmiger Körper mit zwei getrennten Rückenflossen, die erste mit harten Stachelstrahlen',
        en: 'Spindle-shaped body with two separate dorsal fins, the first with hard spiny rays',
      },
      {
        de: 'Große, glasig wirkende Augen und sichtbare Hundszähne im Maul',
        en: 'Large, glassy-looking eyes and visible fang-like canine teeth',
      },
      {
        de: 'Graugrüner Rücken mit dunklen Querbinden, heller Bauch',
        en: 'Grey-green back with dark vertical bands and a pale belly',
      },
    ],
    habitat: {
      de: 'Freiwasser und harte Grundstrukturen großer Seen und Flüsse; Havel, Spree, Dahme, Oder.',
      en: 'Open water and hard bottom structure of large lakes and rivers; Havel, Spree, Dahme, Oder.',
    },
    avgLengthCm: 50,
    maxLengthCm: 100,
    image: { svg: 'zander.svg' },
    regulations: {
      berlin: {
        minSizeCm: 45,
        closedSeason: { from: '01-01', to: '05-31' },
      },
      brandenburg: {
        minSizeCm: 45,
        closedSeason: { from: '04-01', to: '05-31' },
      },
    },
  },
  {
    id: 'barsch',
    names: {
      de: 'Flussbarsch',
      en: 'European Perch',
      scientific: 'Perca fluviatilis',
    },
    category: 'predator',
    description: {
      de: 'Der Flussbarsch ist in praktisch jedem Gewässer der Region zu Hause und oft der erste Fisch am Haken. Größere Exemplare jagen im Schwarm kleine Fische.',
      en: 'The perch is at home in virtually every water body of the region and often the first fish on the hook. Larger specimens hunt small fish in schools.',
    },
    identification: [
      {
        de: 'Hochrückiger Körper mit 6–9 dunklen Querstreifen',
        en: 'Deep body with 6–9 dark vertical stripes',
      },
      {
        de: 'Zwei Rückenflossen – die vordere stachelig mit dunklem Fleck am Ende',
        en: 'Two dorsal fins – the front one spiny with a dark blotch at its rear',
      },
      {
        de: 'Leuchtend rote Bauch- und Afterflossen',
        en: 'Bright red pelvic and anal fins',
      },
    ],
    habitat: {
      de: 'Seen, Flüsse, Kanäle – vom Stadtspreearm bis zum Baggersee überall verbreitet.',
      en: 'Lakes, rivers, canals – ubiquitous from urban Spree arms to gravel pits.',
    },
    avgLengthCm: 25,
    maxLengthCm: 55,
    image: { svg: 'barsch.svg' },
    regulations: {
      berlin: {
        note: {
          de: 'Kein Mindestmaß, keine Schonzeit. Aber: Vom 01.01. bis 31.05. ist das Angeln mit Kunstködern, toten Köderfischen und Fischfetzen in Berlin verboten (Raubfischschonzeit).',
          en: 'No minimum size, no closed season. However: from 1 Jan to 31 May fishing with artificial lures, dead bait fish and fish strips is prohibited in Berlin (predator closed season).',
        },
      },
      brandenburg: {
        note: {
          de: 'Kein Mindestmaß, keine Schonzeit nach BbgFischO. Gewässerordnungen (z. B. LAVB) können während der Raubfischschonzeiten Kunstköderverbote vorsehen.',
          en: 'No minimum size or closed season under state law. Water-specific rules (e.g. LAVB) may ban artificial lures during predator closed seasons.',
        },
      },
    },
  },
  {
    id: 'wels',
    names: { de: 'Wels', en: 'Wels Catfish', scientific: 'Silurus glanis' },
    category: 'predator',
    description: {
      de: 'Der Wels ist der größte Süßwasserfisch Europas und hat sich in den warmen Sommern der letzten Jahre in Havel, Spree und Oder stark vermehrt.',
      en: 'The wels is Europe’s largest freshwater fish and has multiplied strongly in the Havel, Spree and Oder during recent warm summers.',
    },
    identification: [
      {
        de: 'Riesiges, breites Maul mit zwei langen Bartfäden am Oberkiefer und vier kurzen am Unterkiefer',
        en: 'Huge broad mouth with two long barbels on the upper jaw and four short ones below',
      },
      {
        de: 'Schuppenloser, langgestreckter Körper mit sehr langer Afterflosse',
        en: 'Scaleless elongated body with a very long anal fin',
      },
      {
        de: 'Winzige Rückenflosse, marmorierte dunkle Färbung',
        en: 'Tiny dorsal fin and dark marbled colouration',
      },
    ],
    habitat: {
      de: 'Tiefe Bereiche großer Flüsse und Seen mit Unterständen; Havel, Oder, große Brandenburger Seen.',
      en: 'Deep sections of large rivers and lakes with cover; Havel, Oder, large Brandenburg lakes.',
    },
    avgLengthCm: 100,
    maxLengthCm: 250,
    image: { svg: 'wels.svg' },
    regulations: {
      berlin: {
        note: {
          de: 'Kein Mindestmaß und keine Schonzeit in Berlin.',
          en: 'No minimum size and no closed season in Berlin.',
        },
      },
      brandenburg: {
        note: {
          de: 'Seit 01.10.2010 in Brandenburg weder Schonzeit noch Mindestmaß (wachsende Bestände).',
          en: 'Since 1 Oct 2010 neither closed season nor minimum size in Brandenburg (growing stocks).',
        },
      },
    },
  },
  {
    id: 'aal',
    names: {
      de: 'Europäischer Aal',
      en: 'European Eel',
      scientific: 'Anguilla anguilla',
    },
    category: 'predator',
    description: {
      de: 'Der Aal wandert als Jungfisch aus der Sargassosee in unsere Flüsse und Seen. Der Bestand ist europaweit stark gefährdet – maßvolle Entnahme wird dringend empfohlen.',
      en: 'Eels migrate from the Sargasso Sea into our rivers and lakes as juveniles. The stock is critically endangered across Europe – restrained harvest is strongly encouraged.',
    },
    identification: [
      {
        de: 'Schlangenförmiger Körper mit durchgehendem Flossensaum aus Rücken-, Schwanz- und Afterflosse',
        en: 'Snake-like body with one continuous fin fringe formed by dorsal, tail and anal fins',
      },
      {
        de: 'Sehr kleine Schuppen tief in der dicken, schleimigen Haut – wirkt nackt',
        en: 'Tiny scales embedded deep in thick slimy skin – appears scaleless',
      },
      {
        de: 'Unterständiges Maul, Färbung je nach Stadium gelblich bis silbrig',
        en: 'Protruding lower jaw; colour from yellowish to silvery depending on life stage',
      },
    ],
    habitat: {
      de: 'Nahezu alle Gewässer der Region, gern an schlammigem Grund und Unterständen.',
      en: 'Nearly all waters of the region, preferring muddy bottoms and hideouts.',
    },
    avgLengthCm: 60,
    maxLengthCm: 120,
    image: { svg: 'aal.svg' },
    regulations: {
      berlin: {
        minSizeCm: 50,
        note: {
          de: 'Fangbeschränkungen (z. B. Tagesfangmengen) nach Gewässerordnung möglich; EU-Aalschutz beachten.',
          en: 'Bag limits per water rules possible; note EU eel protection measures.',
        },
      },
      brandenburg: {
        minSizeCm: 50,
      },
    },
  },
  {
    id: 'quappe',
    names: { de: 'Quappe', en: 'Burbot', scientific: 'Lota lota' },
    category: 'predator',
    description: {
      de: 'Die Quappe ist der einzige Süßwasser-Dorsch. Sie ist kälteliebend, laicht mitten im Winter und beißt vor allem in den dunklen Monaten.',
      en: 'The burbot is the only freshwater cod. It loves cold water, spawns in midwinter and bites mainly during the dark months.',
    },
    identification: [
      {
        de: 'Einzelner Bartfaden mittig am Kinn',
        en: 'A single barbel centred on the chin',
      },
      {
        de: 'Zwei Rückenflossen, die zweite sehr lang bis zur Schwanzflosse',
        en: 'Two dorsal fins, the second very long, reaching the tail',
      },
      {
        de: 'Marmorierte gelbbraune Zeichnung auf schleimiger Haut',
        en: 'Marbled yellow-brown pattern on slimy skin',
      },
    ],
    habitat: {
      de: 'Kühle, sauerstoffreiche Flüsse und tiefe Seen; Oder, Spree, tiefe Havelseen.',
      en: 'Cool, oxygen-rich rivers and deep lakes; Oder, Spree, deep Havel lakes.',
    },
    avgLengthCm: 40,
    maxLengthCm: 80,
    image: { svg: 'quappe.svg' },
    regulations: {
      berlin: { minSizeCm: 30 },
      brandenburg: { minSizeCm: 30 },
    },
  },
  {
    id: 'rapfen',
    names: { de: 'Rapfen', en: 'Asp', scientific: 'Leuciscus aspius' },
    category: 'predator',
    description: {
      de: 'Der Rapfen ist ein räuberischer Karpfenfisch, der an der Oberfläche mit lautem Platschen Kleinfische jagt – ein spektakulärer Sommerfisch an Spree, Havel und Oder.',
      en: 'The asp is a predatory cyprinid that hunts baitfish at the surface with loud splashes – a spectacular summer fish on the Spree, Havel and Oder.',
    },
    identification: [
      {
        de: 'Torpedoförmiger, silbriger Körper mit kräftigem Schwanzstiel',
        en: 'Torpedo-shaped silvery body with a powerful tail wrist',
      },
      {
        de: 'Stark oberständiges, tief gespaltenes Maul ohne Zähne im Kiefer',
        en: 'Strongly upturned, deeply cleft mouth without jaw teeth',
      },
      {
        de: 'Harter Kiel zwischen Bauch- und Afterflosse, spitze Flossen',
        en: 'Hard keel between pelvic and anal fins, pointed fins',
      },
    ],
    habitat: {
      de: 'Strömung großer Flüsse und Windkanten großer Seen; Spree, Havel, Oder.',
      en: 'Currents of large rivers and windward edges of big lakes; Spree, Havel, Oder.',
    },
    avgLengthCm: 50,
    maxLengthCm: 90,
    image: { svg: 'rapfen.svg' },
    regulations: {
      berlin: {
        note: {
          de: 'In Berlin nicht in der Schonzeiten-Tabelle geführt; Raubfisch-Köderverbot 01.01.–31.05. beachten.',
          en: 'Not listed in Berlin’s protection table; note the lure ban 1 Jan – 31 May.',
        },
      },
      brandenburg: {
        minSizeCm: 40,
        closedSeason: { from: '04-01', to: '06-30' },
      },
    },
  },
  {
    id: 'kaulbarsch',
    names: {
      de: 'Kaulbarsch',
      en: 'Ruffe',
      scientific: 'Gymnocephalus cernua',
    },
    category: 'predator',
    description: {
      de: 'Der kleine, schleimige Verwandte des Barsches ist ein häufiger Beifang beim Grundangeln, besonders in der Nacht.',
      en: 'This small, slimy relative of the perch is a common bycatch when bottom fishing, especially at night.',
    },
    identification: [
      {
        de: 'Zusammengewachsene stachelige und weiche Rückenflosse (beim Barsch getrennt)',
        en: 'Spiny and soft dorsal fins fused into one (separate in perch)',
      },
      {
        de: 'Olivbraune Färbung mit dunklen Flecken, keine Querstreifen',
        en: 'Olive-brown colour with dark speckles, no vertical stripes',
      },
      {
        de: 'Sehr schleimiger Körper, große Augen',
        en: 'Very slimy body and large eyes',
      },
    ],
    habitat: {
      de: 'Grundnah in Seen, Flüssen und Kanälen mit sandigem oder schlammigem Boden.',
      en: 'Near the bottom of lakes, rivers and canals with sandy or muddy beds.',
    },
    avgLengthCm: 12,
    maxLengthCm: 25,
    image: { svg: 'kaulbarsch.svg' },
    regulations: {
      berlin: {},
      brandenburg: {},
    },
  },
]
