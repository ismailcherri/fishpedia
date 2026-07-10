import type { WaterArea } from './types'

/**
 * Waters permitted by the DAV Berlin Fischereierlaubnisvertrag (Angelkarte),
 * as printed on the permit.
 *
 * ⚠️ GEOMETRIES ARE HAND-DRAWN APPROXIMATIONS (drawn without live map data).
 * They show roughly where each water lies and where permitted sections start
 * and end – they are NOT survey-accurate boundaries.
 *
 * To replace a geometry with an exact one:
 *  1. Open https://overpass-turbo.eu and run e.g.
 *       way["name"="Landwehrkanal"]({{bbox}}); out geom;
 *     (zoom the map to Berlin first)
 *  2. Export → GeoJSON, take the feature's `geometry` object
 *  3. Paste it as the `geometry` value below (coordinates are [lng, lat])
 *     and remove the `approximate` flag.
 */
export const berlinWaters: WaterArea[] = [
  // ---------------------------------------------------------------- canals
  {
    id: 'landwehrkanal',
    name: 'Landwehrkanal',
    kind: 'canal',
    approximate: true,
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.453, 52.4965],
        [13.442, 52.4925],
        [13.431, 52.493],
        [13.418, 52.4935],
        [13.4055, 52.493],
        [13.391, 52.4975],
        [13.379, 52.5005],
        [13.371, 52.504],
        [13.356, 52.506],
        [13.34, 52.5065],
        [13.328, 52.5115],
      ],
    },
  },
  {
    id: 'verbindungskanal',
    name: 'Verbindungskanal',
    kind: 'canal',
    approximate: true,
    note: {
      de: 'Charlottenburger Verbindungskanal (Spree – Westhafenkanal).',
      en: 'Charlottenburg connecting canal (Spree – Westhafen canal).',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.3035, 52.525],
        [13.3065, 52.53],
        [13.309, 52.535],
      ],
    },
  },
  {
    id: 'westhafenkanal',
    name: 'Westhafenkanal',
    kind: 'canal',
    approximate: true,
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.303, 52.5355],
        [13.318, 52.537],
        [13.332, 52.537],
        [13.342, 52.538],
      ],
    },
  },
  {
    id: 'berlin-spandauer-schifffahrtskanal',
    name: 'Berlin-Spandauer Schifffahrtskanal',
    kind: 'canal',
    approximate: true,
    note: {
      de: 'Zwischen Schleuse Plötzensee und Humboldthafen.',
      en: 'Between Plötzensee lock and Humboldthafen.',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.33, 52.54],
        [13.3435, 52.5378],
        [13.356, 52.5375],
        [13.365, 52.5365],
        [13.369, 52.533],
        [13.3695, 52.5295],
      ],
    },
  },
  {
    id: 'neukoellner-schifffahrtskanal',
    name: 'Neuköllner Schifffahrtskanal',
    kind: 'canal',
    approximate: true,
    note: {
      de: 'Von der Lohmühlenbrücke bis Britzer Hafen.',
      en: 'From Lohmühlen bridge to Britz harbour.',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.4505, 52.4925],
        [13.4485, 52.4855],
        [13.447, 52.479],
        [13.4465, 52.473],
        [13.446, 52.4675],
      ],
    },
  },
  {
    id: 'britzer-zweigkanal',
    name: 'Britzer Zweigkanal',
    kind: 'canal',
    approximate: true,
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.446, 52.4655],
        [13.456, 52.464],
        [13.465, 52.4665],
        [13.4705, 52.472],
      ],
    },
  },
  {
    id: 'gosener-kanal',
    name: 'Gosener Kanal',
    kind: 'canal',
    approximate: true,
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.672, 52.438],
        [13.668, 52.429],
        [13.662, 52.42],
      ],
    },
  },
  {
    id: 'oder-spree-kanal',
    name: 'Oder-Spree-Kanal',
    kind: 'canal',
    approximate: true,
    note: {
      de: 'Vom Seddinsee bis Wernsdorfer See.',
      en: 'From Seddinsee to Wernsdorfer See.',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.695, 52.403],
        [13.715, 52.3985],
        [13.733, 52.3945],
      ],
    },
  },
  {
    id: 'wuhle',
    name: 'Wuhle / Wuhlebecken',
    kind: 'river',
    approximate: true,
    note: {
      de: 'Von der B1 bis zur Spree.',
      en: 'From the B1 road to the Spree.',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.556, 52.506],
        [13.56, 52.495],
        [13.562, 52.483],
        [13.565, 52.47],
        [13.5645, 52.458],
      ],
    },
  },
  // ----------------------------------------------------------------- Spree
  {
    id: 'spree',
    name: 'Spree',
    kind: 'river',
    approximate: true,
    note: {
      de: 'Vom Einlauf Britzer Zweigkanal bis Mühlendammschleuse (inkl. Kupfergraben und Rummelsburger See).',
      en: 'From the Britzer Zweigkanal inlet to Mühlendamm lock (incl. Kupfergraben and Rummelsburger See).',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.472, 52.474],
        [13.465, 52.483],
        [13.456, 52.49],
        [13.453, 52.496],
        [13.445, 52.502],
        [13.434, 52.502],
        [13.423, 52.508],
        [13.419, 52.5135],
        [13.4075, 52.514],
      ],
    },
  },
  {
    id: 'kupfergraben',
    name: 'Kupfergraben',
    kind: 'river',
    approximate: true,
    note: {
      de: 'Spreearm an der Museumsinsel (gehört zur Spree-Strecke).',
      en: 'Spree arm at Museum Island (part of the Spree section).',
    },
    geometry: {
      type: 'LineString',
      coordinates: [
        [13.4, 52.515],
        [13.3965, 52.5185],
        [13.394, 52.5225],
      ],
    },
  },
  {
    id: 'rummelsburger-see',
    name: 'Rummelsburger See',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Bucht der Spree (gehört zur Spree-Strecke).',
      en: 'Bay of the Spree (part of the Spree section).',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.456, 52.4995],
          [13.468, 52.4975],
          [13.476, 52.493],
          [13.4735, 52.4898],
          [13.462, 52.4928],
          [13.4545, 52.4972],
          [13.456, 52.4995],
        ],
      ],
    },
  },
  // ----------------------------------------------------------------- lakes
  {
    id: 'weisser-see',
    name: 'Weißer See',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Parkgewässer – nur Bootsangeln!',
      en: 'Park water – boat fishing only!',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.461, 52.5555],
          [13.4638, 52.5562],
          [13.4662, 52.5552],
          [13.466, 52.5533],
          [13.4632, 52.5525],
          [13.4606, 52.5536],
          [13.461, 52.5555],
        ],
      ],
    },
  },
  {
    id: 'malchower-see',
    name: 'Malchower See',
    kind: 'lake',
    approximate: true,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.475, 52.5765],
          [13.4778, 52.5758],
          [13.4785, 52.5722],
          [13.4768, 52.57],
          [13.4742, 52.571],
          [13.4738, 52.5745],
          [13.475, 52.5765],
        ],
      ],
    },
  },
  {
    id: 'orankesee',
    name: 'Oranke See',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Uferangeln nur an gekennzeichneten Stellen.',
      en: 'Bank fishing only at marked spots.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.4738, 52.5572],
          [13.4768, 52.5578],
          [13.479, 52.5566],
          [13.4782, 52.555],
          [13.475, 52.5546],
          [13.473, 52.5558],
          [13.4738, 52.5572],
        ],
      ],
    },
  },
  {
    id: 'obersee',
    name: 'Obersee',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Uferangeln auf der Grundstücksseite.',
      en: 'Bank fishing on the property side.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.4805, 52.5578],
          [13.4832, 52.5582],
          [13.4848, 52.557],
          [13.4838, 52.5555],
          [13.481, 52.5553],
          [13.4796, 52.5566],
          [13.4805, 52.5578],
        ],
      ],
    },
  },
  {
    id: 'bucher-teiche',
    name: 'Bucher Teich I–II',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Lage ungefähr – vor Ort prüfen.',
      en: 'Location approximate – verify on site.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.495, 52.6335],
          [13.4985, 52.634],
          [13.5005, 52.6325],
          [13.499, 52.6308],
          [13.4952, 52.631],
          [13.494, 52.6323],
          [13.495, 52.6335],
        ],
      ],
    },
  },
  {
    id: 'butzer-see',
    name: 'Butzer See',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Kaulsdorfer Seen.',
      en: 'Kaulsdorf lakes.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.587, 52.4938],
          [13.5905, 52.4942],
          [13.5922, 52.4928],
          [13.5908, 52.4912],
          [13.5872, 52.4912],
          [13.5858, 52.4926],
          [13.587, 52.4938],
        ],
      ],
    },
  },
  {
    id: 'habermannsee',
    name: 'Habermann See',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Kaulsdorfer Seen.',
      en: 'Kaulsdorf lakes.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.593, 52.4972],
          [13.5978, 52.4975],
          [13.6, 52.4955],
          [13.5985, 52.4932],
          [13.594, 52.493],
          [13.5918, 52.495],
          [13.593, 52.4972],
        ],
      ],
    },
  },
  {
    id: 'kiessee',
    name: 'Kiessee',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Lage unbestätigt (vermutlich Kiessee Arkenberge) – bitte prüfen.',
      en: 'Location unconfirmed (presumably Kiessee Arkenberge) – please verify.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.392, 52.6152],
          [13.3968, 52.6158],
          [13.399, 52.614],
          [13.3972, 52.6118],
          [13.3925, 52.6115],
          [13.3905, 52.6133],
          [13.392, 52.6152],
        ],
      ],
    },
  },
  {
    id: 'koerner-see',
    name: 'Körner See',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Lage unbestätigt – bitte prüfen.',
      en: 'Location unconfirmed – please verify.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.613, 52.509],
          [13.6165, 52.5095],
          [13.6182, 52.508],
          [13.6168, 52.5065],
          [13.6132, 52.5065],
          [13.6118, 52.5078],
          [13.613, 52.509],
        ],
      ],
    },
  },
  {
    id: 'grabensprung',
    name: 'Grabensprung',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Baggersee am Grabensprung (Biesdorf); Lage ungefähr.',
      en: 'Gravel-pit lake at Grabensprung (Biesdorf); location approximate.',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.571, 52.5098],
          [13.5748, 52.5102],
          [13.5765, 52.5086],
          [13.575, 52.507],
          [13.5712, 52.507],
          [13.5698, 52.5085],
          [13.571, 52.5098],
        ],
      ],
    },
  },
  {
    id: 'griebnitzsee',
    name: 'Griebnitzsee',
    kind: 'lake',
    approximate: true,
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [13.1075, 52.396],
          [13.118, 52.3952],
          [13.129, 52.3938],
          [13.136, 52.3922],
          [13.1352, 52.3908],
          [13.125, 52.392],
          [13.114, 52.3936],
          [13.1068, 52.3946],
          [13.1075, 52.396],
        ],
      ],
    },
  },
]
