import type { FishSpecies } from '../types'

export const cyprinids: FishSpecies[] = [
    {
        id: 'karpfen',
        names: {
            de: 'Karpfen',
            en: 'Common Carp',
            scientific: 'Cyprinus carpio',
        },
        category: 'cyprinid',
        description: {
            de: 'Ob Schuppen-, Spiegel- oder Zeilkarpfen – der Karpfen ist der klassische Friedfisch der Region und kann in den nährstoffreichen Seen beachtliche Gewichte erreichen.',
            en: 'Whether fully scaled, mirror or linear – the carp is the classic coarse fish of the region and reaches remarkable weights in the nutrient-rich lakes.',
        },
        identification: [
            {
                de: 'Vier Bartfäden: zwei kurze an der Oberlippe, zwei lange in den Maulwinkeln',
                en: 'Four barbels: two short on the upper lip, two long at the mouth corners',
            },
            {
                de: 'Lange Rückenflosse mit gesägtem Hartstrahl vorn',
                en: 'Long dorsal fin with a serrated hard ray at the front',
            },
            {
                de: 'Beschuppung je nach Zuchtform: vollständig, spiegelnd-fleckig oder fast nackt',
                en: 'Scaling varies by strain: full, mirror-patched or nearly naked',
            },
        ],
        habitat: {
            de: 'Warme, nährstoffreiche Seen und Altarme; überall besetzt, z. B. Müggelsee, Seddinsee, Brandenburger Kiesgruben.',
            en: 'Warm, nutrient-rich lakes and backwaters; stocked everywhere, e.g. Müggelsee, Seddinsee, Brandenburg gravel pits.',
        },
        avgLengthCm: 50,
        maxLengthCm: 110,
        image: { svg: 'karpfen.svg' },
        regulations: {
            berlin: { minSizeCm: 35 },
            brandenburg: {
                note: {
                    de: 'Nach BbgFischO kein gesetzliches Mindestmaß und keine Schonzeit; viele Gewässerordnungen (z. B. LAVB) setzen eigene Maße (häufig 35 cm).',
                    en: 'No statutory minimum size or closed season in Brandenburg; many water rules (e.g. LAVB) set their own limits (often 35 cm).',
                },
            },
        },
    },
    {
        id: 'schleie',
        names: { de: 'Schleie', en: 'Tench', scientific: 'Tinca tinca' },
        category: 'cyprinid',
        description: {
            de: 'Die Schleie ist der »Doktorfisch« der krautigen Flachseen. Sie gründelt in der Dämmerung an weichen Ufern und kämpft am Haken erstaunlich stark.',
            en: 'The tench is the “doctor fish” of weedy shallow lakes. It roots along soft margins at dusk and fights surprisingly hard on the hook.',
        },
        identification: [
            {
                de: 'Olivgrüner, goldschimmernder Körper mit winzigen, tief sitzenden Schuppen',
                en: 'Olive-green, gold-sheened body with tiny deeply embedded scales',
            },
            {
                de: 'Auffällig rote bis orange Augen',
                en: 'Striking red to orange eyes',
            },
            {
                de: 'Alle Flossen abgerundet, dicker Schwanzstiel; ein kleiner Bartfaden je Maulwinkel',
                en: 'All fins rounded, thick tail wrist; one small barbel at each mouth corner',
            },
        ],
        habitat: {
            de: 'Verkrautete, schlammige Seen und Teiche, langsame Gräben in ganz Brandenburg.',
            en: 'Weedy, muddy lakes and ponds, slow ditches throughout Brandenburg.',
        },
        avgLengthCm: 35,
        maxLengthCm: 65,
        image: { svg: 'schleie.svg' },
        regulations: {
            berlin: { minSizeCm: 25 },
            brandenburg: { minSizeCm: 25 },
        },
    },
    {
        id: 'barbe',
        names: { de: 'Barbe', en: 'Barbel', scientific: 'Barbus barbus' },
        category: 'cyprinid',
        description: {
            de: 'Die strömungsliebende Barbe steht über Kies- und Sandbänken schnell fließender Flussabschnitte und ist in der Region vor allem in der Oder und unteren Spree zu finden.',
            en: 'The current-loving barbel holds over gravel and sand banks of fast river sections, found here mainly in the Oder and lower Spree.',
        },
        identification: [
            {
                de: 'Vier kräftige Bartfäden am unterständigen, rüsselartigen Maul',
                en: 'Four strong barbels on the underslung, snout-like mouth',
            },
            {
                de: 'Flacher Bauch und hoher Rücken – wie für die Strömung gebaut',
                en: 'Flat belly and arched back – built for the current',
            },
            {
                de: 'Bronzefarbene Flanken, rötliche Brust- und Afterflossen',
                en: 'Bronze flanks with reddish pectoral and anal fins',
            },
        ],
        habitat: {
            de: 'Strömungsreiche, kiesige Flussabschnitte; Oder, Neiße, untere Spree.',
            en: 'Fast, gravelly river stretches; Oder, Neiße, lower Spree.',
        },
        avgLengthCm: 45,
        maxLengthCm: 90,
        image: { svg: 'barbe.svg' },
        regulations: {
            berlin: {
                minSizeCm: 40,
                closedSeason: { from: '05-01', to: '06-30' },
            },
            brandenburg: {
                minSizeCm: 40,
                closedSeason: { from: '05-01', to: '07-31' },
            },
        },
    },
    {
        id: 'aland',
        names: { de: 'Aland', en: 'Ide / Orfe', scientific: 'Leuciscus idus' },
        category: 'cyprinid',
        description: {
            de: 'Der Aland ist ein kräftiger Weißfisch der großen Flüsse und Seen, der oft mit Döbel oder Plötze verwechselt wird.',
            en: 'The ide is a robust silver fish of large rivers and lakes, often confused with chub or roach.',
        },
        identification: [
            {
                de: 'Hochrückiger als der Döbel, mit kleinerem Kopf und engerer Beschuppung',
                en: 'Deeper-bodied than chub, with a smaller head and finer scales',
            },
            {
                de: 'Leicht nach innen gewölbte (konkave) Afterflosse',
                en: 'Slightly concave anal fin edge',
            },
            {
                de: 'Silbrige Flanken, im Alter messingfarben; rötliche Bauchflossen',
                en: 'Silvery flanks turning brassy with age; reddish pelvic fins',
            },
        ],
        habitat: {
            de: 'Große Flüsse und angebundene Seen; Havel, Spree, Oder.',
            en: 'Large rivers and connected lakes; Havel, Spree, Oder.',
        },
        avgLengthCm: 35,
        maxLengthCm: 75,
        image: { svg: 'aland.svg' },
        regulations: {
            berlin: {},
            brandenburg: { minSizeCm: 30 },
        },
    },
    {
        id: 'doebel',
        names: { de: 'Döbel', en: 'Chub', scientific: 'Squalius cephalus' },
        category: 'cyprinid',
        description: {
            de: 'Der Döbel ist ein misstrauischer Allesfresser der Fließgewässer, der von Brot über Käse bis zum kleinen Köderfisch fast alles nimmt.',
            en: 'The chub is a wary omnivore of flowing waters, taking nearly anything from bread and cheese to small baitfish.',
        },
        identification: [
            {
                de: 'Breiter Kopf mit großem, endständigem weißlichem Maul',
                en: 'Broad head with a large terminal whitish mouth',
            },
            {
                de: 'Große, dunkel gerandete Schuppen wirken wie ein Netzmuster',
                en: 'Large dark-edged scales create a net-like pattern',
            },
            {
                de: 'Nach außen gewölbte (konvexe) Afterflosse – wichtigstes Unterscheidungsmerkmal zum Aland',
                en: 'Convex anal fin edge – the key difference from the ide',
            },
        ],
        habitat: {
            de: 'Strömende Bereiche von Spree, Havel und Kanälen, gern unter überhängenden Bäumen.',
            en: 'Flowing sections of the Spree, Havel and canals, often under overhanging trees.',
        },
        avgLengthCm: 35,
        maxLengthCm: 70,
        image: { svg: 'doebel.svg' },
        regulations: {
            berlin: {},
            brandenburg: {},
        },
    },
    {
        id: 'ploetze',
        names: {
            de: 'Plötze (Rotauge)',
            en: 'Roach',
            scientific: 'Rutilus rutilus',
        },
        category: 'cyprinid',
        description: {
            de: 'Die Plötze ist der häufigste Fisch der Region und für viele Angler der Einstieg ins Hobby. Große »Klodeckel« von über 30 cm sind eine echte Herausforderung.',
            en: 'The roach is the most common fish of the region and the entry fish for many anglers. Big specimens over 30 cm are a real challenge.',
        },
        identification: [
            {
                de: 'Rote Iris im Auge (namensgebend)',
                en: 'Red iris in the eye (giving the German name “red eye”)',
            },
            {
                de: 'Rückenflosse beginnt senkrecht über den Bauchflossen',
                en: 'Dorsal fin starts directly above the pelvic fins',
            },
            {
                de: 'Silbrige Flanken, Flossen rötlich bis orange',
                en: 'Silvery flanks with reddish to orange fins',
            },
        ],
        habitat: {
            de: 'Praktisch jedes Gewässer – vom Landwehrkanal bis zum Werbellinsee.',
            en: 'Virtually every water – from the Landwehrkanal to Lake Werbellin.',
        },
        avgLengthCm: 20,
        maxLengthCm: 45,
        image: { svg: 'ploetze.svg' },
        regulations: {
            berlin: {},
            brandenburg: {},
        },
    },
    {
        id: 'rotfeder',
        names: {
            de: 'Rotfeder',
            en: 'Rudd',
            scientific: 'Scardinius erythrophthalmus',
        },
        category: 'cyprinid',
        description: {
            de: 'Die Rotfeder ähnelt der Plötze, lebt aber stärker im Kraut und frisst gern an der Oberfläche. Ihre Flossen leuchten intensiv blutrot.',
            en: 'The rudd resembles the roach but lives closer to weed and feeds readily at the surface. Its fins glow an intense blood red.',
        },
        identification: [
            {
                de: 'Deutlich oberständiges Maul – zur Oberflächennahrung ausgerichtet',
                en: 'Clearly upturned mouth – adapted to surface feeding',
            },
            {
                de: 'Rückenflosse beginnt hinter den Bauchflossen (bei der Plötze darüber)',
                en: 'Dorsal fin starts behind the pelvic fins (above them in roach)',
            },
            {
                de: 'Goldgelbe Iris und blutrote Flossen',
                en: 'Golden-yellow iris and blood-red fins',
            },
        ],
        habitat: {
            de: 'Krautreiche, stehende Gewässer; flache Buchten der Havel- und Dahmeseen.',
            en: 'Weedy still waters; shallow bays of the Havel and Dahme lakes.',
        },
        avgLengthCm: 20,
        maxLengthCm: 40,
        image: { svg: 'rotfeder.svg' },
        regulations: {
            berlin: {},
            brandenburg: {},
        },
    },
    {
        id: 'blei',
        names: {
            de: 'Blei (Brassen)',
            en: 'Common Bream',
            scientific: 'Abramis brama',
        },
        category: 'cyprinid',
        description: {
            de: 'Der Blei ist der Brotfisch der Friedfischangler an Havel und Spree. Große Exemplare werden wegen ihrer Körperform »Klodeckel« genannt.',
            en: 'The bream is the bread-and-butter fish of coarse anglers on the Havel and Spree. Large ones are nicknamed “toilet lids” for their shape.',
        },
        identification: [
            {
                de: 'Sehr hochrückiger, seitlich stark abgeflachter Körper',
                en: 'Very deep, strongly laterally compressed body',
            },
            {
                de: 'Lange Afterflosse und unterständiges, vorstülpbares Rüsselmaul',
                en: 'Long anal fin and an underslung, protrusible tube-like mouth',
            },
            {
                de: 'Alte Fische bronzefarben, junge silbrig; dunkle Flossen',
                en: 'Older fish bronze, young ones silvery; dark fins',
            },
        ],
        habitat: {
            de: 'Große Seen und langsam fließende Flüsse mit weichem Grund.',
            en: 'Large lakes and slow rivers with soft bottoms.',
        },
        avgLengthCm: 40,
        maxLengthCm: 75,
        image: { svg: 'blei.svg' },
        regulations: {
            berlin: {},
            brandenburg: {},
        },
    },
    {
        id: 'guester',
        names: {
            de: 'Güster',
            en: 'White Bream',
            scientific: 'Blicca bjoerkna',
        },
        category: 'cyprinid',
        description: {
            de: 'Die Güster wird ständig mit jungen Bleien verwechselt. Der Blick auf Brustflossen und Auge schafft Klarheit.',
            en: 'The white bream is constantly confused with young common bream. Checking the pectoral fins and the eye settles it.',
        },
        identification: [
            {
                de: 'Rötliche Basis der Brust- und Bauchflossen (beim Blei grau)',
                en: 'Reddish base of pectoral and pelvic fins (grey in common bream)',
            },
            {
                de: 'Auffällig großes Auge im Verhältnis zum Kopf',
                en: 'Noticeably large eye relative to the head',
            },
            {
                de: 'Silbrig bleibende, hochrückige Flanken auch im Alter',
                en: 'Flanks stay silvery even in old age, body deep',
            },
        ],
        habitat: {
            de: 'Stille Buchten und Unterläufe; überall in Havel- und Spreeseen häufig.',
            en: 'Calm bays and lower reaches; common in all Havel and Spree lakes.',
        },
        avgLengthCm: 20,
        maxLengthCm: 40,
        image: { svg: 'guester.svg' },
        regulations: {
            berlin: {},
            brandenburg: {},
        },
    },
    {
        id: 'karausche',
        names: {
            de: 'Karausche',
            en: 'Crucian Carp',
            scientific: 'Carassius carassius',
        },
        category: 'cyprinid',
        description: {
            de: 'Die zäh wie robuste Karausche bewohnt kleine, sauerstoffarme Teiche und Weiher. Ihre Bestände gehen stark zurück – schonender Umgang wird empfohlen.',
            en: 'The hardy crucian carp inhabits small, oxygen-poor ponds. Its stocks are declining sharply – considerate handling is recommended.',
        },
        identification: [
            {
                de: 'Keine Bartfäden (Unterschied zum Karpfen)',
                en: 'No barbels (unlike common carp)',
            },
            {
                de: 'Hochrückiger, goldbrauner Körper mit konvexer Rückenflosse',
                en: 'Deep, golden-brown body with a convex dorsal fin edge',
            },
            {
                de: 'Dunkler Fleck am Schwanzstiel bei Jungfischen',
                en: 'Dark blotch on the tail wrist in juveniles',
            },
        ],
        habitat: {
            de: 'Kleine, verkrautete Dorfteiche, Weiher und Altarme in Brandenburg.',
            en: 'Small weedy village ponds, pools and oxbows in Brandenburg.',
        },
        avgLengthCm: 20,
        maxLengthCm: 45,
        image: { svg: 'karausche.svg' },
        regulations: {
            berlin: {
                note: {
                    de: 'Kein gesetzliches Mindestmaß; wegen rückläufiger Bestände wird das Zurücksetzen empfohlen.',
                    en: 'No statutory minimum size; release is recommended due to declining stocks.',
                },
            },
            brandenburg: {
                note: {
                    de: 'Kein gesetzliches Mindestmaß; wegen rückläufiger Bestände wird das Zurücksetzen empfohlen.',
                    en: 'No statutory minimum size; release is recommended due to declining stocks.',
                },
            },
        },
    },
    {
        id: 'giebel',
        names: {
            de: 'Giebel',
            en: 'Prussian Carp',
            scientific: 'Carassius gibelio',
        },
        category: 'cyprinid',
        description: {
            de: 'Der Giebel ist der silbrige Doppelgänger der Karausche und deutlich häufiger. Er gilt als Stammform des Goldfisches.',
            en: 'The Prussian carp is the silvery double of the crucian carp and far more common. It is considered the wild form of the goldfish.',
        },
        identification: [
            {
                de: 'Silbrig-graue Flanken (Karausche goldbraun), keine Bartfäden',
                en: 'Silver-grey flanks (crucian is golden brown), no barbels',
            },
            {
                de: 'Leicht konkave Rückenflosse mit gesägtem Hartstrahl',
                en: 'Slightly concave dorsal fin with a serrated hard ray',
            },
            {
                de: 'Schwärzliches Bauchfell (bei der Karausche hell)',
                en: 'Blackish peritoneum (light in crucian carp)',
            },
        ],
        habitat: {
            de: 'Teiche, Altarme, Seen und langsame Flüsse in der ganzen Region.',
            en: 'Ponds, oxbows, lakes and slow rivers throughout the region.',
        },
        avgLengthCm: 25,
        maxLengthCm: 45,
        image: { svg: 'giebel.svg' },
        regulations: {
            berlin: {},
            brandenburg: {},
        },
    },
    {
        id: 'ukelei',
        names: {
            de: 'Ukelei (Laube)',
            en: 'Bleak',
            scientific: 'Alburnus alburnus',
        },
        category: 'cyprinid',
        description: {
            de: 'Der kleine Schwarmfisch steht dicht unter der Oberfläche und verrät sich durch blitzende Silberreflexe. Beliebter Köderfisch.',
            en: 'This small schooling fish sits just below the surface, giving itself away with silver flashes. A popular baitfish.',
        },
        identification: [
            {
                de: 'Schlanker Körper mit stark glänzenden, leicht abfallenden Schuppen',
                en: 'Slim body with highly reflective, easily shed scales',
            },
            {
                de: 'Stark oberständiges Maul',
                en: 'Strongly upturned mouth',
            },
            {
                de: 'Lange Afterflosse, Flossen farblos-grau',
                en: 'Long anal fin, fins colourless grey',
            },
        ],
        habitat: {
            de: 'Oberflächennah in Seen, Flüssen und Kanälen im gesamten Stadtgebiet.',
            en: 'Near the surface of lakes, rivers and canals across the whole city.',
        },
        avgLengthCm: 12,
        maxLengthCm: 20,
        image: { svg: 'ukelei.svg' },
        regulations: {
            berlin: {},
            brandenburg: {},
        },
    },
    {
        id: 'gruendling',
        names: { de: 'Gründling', en: 'Gudgeon', scientific: 'Gobio gobio' },
        category: 'cyprinid',
        description: {
            de: 'Der kleine Grundfisch mit den zwei Bartfäden bewohnt sandige Flachwasserzonen. In Brandenburg ist er inzwischen ganzjährig geschont.',
            en: 'This small bottom fish with two barbels inhabits sandy shallows. In Brandenburg it is now protected year-round.',
        },
        identification: [
            {
                de: 'Zwei Bartfäden in den Maulwinkeln',
                en: 'Two barbels at the mouth corners',
            },
            {
                de: 'Reihe dunkler Flecken entlang der Seitenlinie',
                en: 'Row of dark blotches along the lateral line',
            },
            {
                de: 'Unterständiges Maul, gedrungener runder Körper',
                en: 'Underslung mouth and a stocky rounded body',
            },
        ],
        habitat: {
            de: 'Sandige, flache Bereiche von Flüssen und klaren Seen.',
            en: 'Sandy shallow zones of rivers and clear lakes.',
        },
        avgLengthCm: 10,
        maxLengthCm: 20,
        image: { svg: 'gruendling.svg' },
        regulations: {
            berlin: {},
            brandenburg: {
                fullyProtected: true,
                note: {
                    de: 'In Brandenburg ganzjährig geschont – gefangene Tiere sofort schonend zurücksetzen.',
                    en: 'Protected year-round in Brandenburg – release any caught fish immediately and gently.',
                },
            },
        },
    },
    {
        id: 'nase',
        names: {
            de: 'Nase',
            en: 'Common Nase',
            scientific: 'Chondrostoma nasus',
        },
        category: 'cyprinid',
        description: {
            de: 'Die Nase weidet mit ihrer hornigen Unterlippe Algen von Steinen ab. Die Bestände sind stark zurückgegangen; in Brandenburg ist sie ganzjährig geschont.',
            en: 'The nase grazes algae off stones with its horny lower lip. Stocks have declined sharply; in Brandenburg it is protected year-round.',
        },
        identification: [
            {
                de: 'Deutlich unterständiges Maul mit scharfkantiger Hornlippe – die »Nase« steht vor',
                en: 'Clearly underslung mouth with a sharp horny lip – the “nose” protrudes',
            },
            {
                de: 'Schlanker silbriger Körper mit dunklem Rücken',
                en: 'Slender silvery body with a dark back',
            },
            {
                de: 'Rötliche Flossenansätze, schwärzliches Bauchfell',
                en: 'Reddish fin bases and a blackish peritoneum',
            },
        ],
        habitat: {
            de: 'Strömende, kiesige Flussabschnitte; heute vor allem Oder und Neiße.',
            en: 'Flowing gravelly river sections; today mainly the Oder and Neiße.',
        },
        avgLengthCm: 30,
        maxLengthCm: 50,
        image: { svg: 'nase.svg' },
        regulations: {
            berlin: {},
            brandenburg: {
                fullyProtected: true,
            },
        },
    },
]
