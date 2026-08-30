import { waterGeometries } from './geometries'
import type { WaterArea } from './types'

/**
 * Waters in the official LAV Berlin register at
 * https://landesanglerverband.berlin/angelgewaesser/.
 * Names, water numbers, sections and restrictions verified in August 2026.
 *
 * Geometries come from OpenStreetMap data, clipped to the permitted
 * sections in the register. Regenerate with:
 *   node scripts/fetch-waters.mjs
 */
const meta: Omit<WaterArea, 'geometry'>[] = [
  {
    id: 'landwehrkanal',
    permitId: 'B 10-209',
    name: 'Landwehrkanal',
    kind: 'canal',
    note: {
      de: 'Von Oberspree (Oberschleuse) bis Stadtspree, einschließlich der Umflutgräben an beiden Schleusen und Urbanhafen.',
      en: 'From Oberspree (upper lock) to Stadtspree, including the bypass channels at both locks and Urbanhafen.',
    },
  },
  {
    id: 'verbindungskanal',
    permitId: 'B 10-208',
    name: 'Charlottenburger Verbindungskanal',
    kind: 'canal',
    note: {
      de: 'Vom Westhafenkanal bis zur Spree.',
      en: 'From the Westhafen canal to the Spree.',
    },
  },
  {
    id: 'westhafenkanal',
    permitId: 'B 10-211',
    name: 'Westhafenkanal',
    kind: 'canal',
    note: {
      de: 'Vom Westhafen bis zur Einmündung in die Spree – ohne Westhafen.',
      en: 'From Westhafen to the Spree confluence – excluding Westhafen.',
    },
  },
  {
    id: 'berlin-spandauer-schifffahrtskanal',
    permitId: 'B 10-206',
    name: 'Berlin-Spandauer Schifffahrtskanal',
    kind: 'canal',
    note: {
      de: 'Vom Humboldthafen bis zur Mündung Westhafen, einschließlich Nordhafen.',
      en: 'From Humboldthafen to the Westhafen entrance, including Nordhafen.',
    },
  },
  {
    id: 'hohenzollernkanal',
    permitId: 'B 10-207',
    name: 'Hohenzollernkanal',
    kind: 'canal',
    note: {
      de: 'Vom Westhafen bis zur Schleuse Plötzensee, einschließlich des Kolkes.',
      en: 'From Westhafen to Plötzensee lock, including the lock pool.',
    },
  },
  {
    id: 'neukoellner-schifffahrtskanal',
    permitId: 'B 10-210',
    name: 'Neuköllner Schiffahrtskanal',
    kind: 'canal',
    note: {
      de: 'Vom Britzer Hafensteg bis zur Lohmühlenbrücke.',
      en: 'From the Britzer Hafen footbridge to Lohmühlenbrücke.',
    },
  },
  {
    id: 'britzer-zweigkanal',
    permitId: 'B 10-202',
    name: 'Britzer Zweigkanal',
    kind: 'canal',
    note: {
      de: 'Ab Spree bis zum Britzer Hafen.',
      en: 'From the Spree to Britzer Hafen.',
    },
  },
  {
    id: 'gosener-kanal',
    permitId: 'B 10-204',
    name: 'Gosener Kanal',
    kind: 'canal',
    note: {
      de: 'Vom Dämnitzsee bis Seddinsee.',
      en: 'From Dämnitzsee to Seddinsee.',
    },
  },
  {
    id: 'oder-spree-kanal',
    permitId: 'B 10-205',
    name: 'Oder-Spree-Kanal',
    kind: 'canal',
    note: {
      de: 'Vom Seddinsee bis Wernsdorfer See.',
      en: 'From Seddinsee to Wernsdorfer See.',
    },
  },
  {
    id: 'wuhle',
    permitId: 'B 10-203',
    name: 'Wuhle-Strom',
    kind: 'river',
    note: {
      de: 'Von der B1/B5 bis zur Mündung in die Spree.',
      en: 'From the B1/B5 road to the Spree confluence.',
    },
  },
  {
    id: 'spree',
    permitId: 'B 10-201',
    name: 'Spree mit Kupfergraben',
    kind: 'river',
    note: {
      de: 'Vom Einlauf Britzer Zweigkanal bis zur Mühlendamm-Schleuse.',
      en: 'From the Britzer Zweigkanal inlet to Mühlendamm lock.',
    },
  },
  {
    id: 'rummelsburger-see',
    permitId: 'B 06-101',
    name: 'Rummelsburger See',
    kind: 'lake',
  },
  {
    id: 'weisser-see',
    permitId: 'B 01-101',
    name: 'Weißer See',
    kind: 'lake',
    note: {
      de: 'Parkgewässer – Uferangeln verboten!',
      en: 'Park water – bank fishing prohibited!',
    },
  },
  {
    id: 'malchower-see',
    permitId: 'B 02-101',
    name: 'Malchower See',
    kind: 'lake',
  },
  {
    id: 'orankesee',
    permitId: 'B 02-102',
    name: 'Oranke See',
    kind: 'lake',
    note: {
      de: 'Uferangeln nur an gekennzeichneten Stellen.',
      en: 'Bank fishing only at marked spots.',
    },
  },
  {
    id: 'obersee',
    permitId: 'B 02-103',
    name: 'Obersee',
    kind: 'lake',
    note: {
      de: 'Parkgewässer – nur die Grundstücksseite ist beangelbar!',
      en: 'Park water – fishing is allowed only from the property side!',
    },
  },
  {
    id: 'bucher-teiche',
    permitId: 'B 03-102',
    name: 'Bucher Teich I–II',
    kind: 'lake',
    note: {
      de: 'Karpfenteiche im Mittelbruch (Bucher Forst); Teich III gesperrt – Naturschutz.',
      en: 'Carp ponds in the Mittelbruch (Buch forest); pond III closed – nature reserve.',
    },
  },
  {
    id: 'butzer-see',
    permitId: 'B 04-101',
    name: 'Butzer See',
    kind: 'lake',
    note: {
      de: 'Kaulsdorfer Seen.',
      en: 'Kaulsdorf lakes.',
    },
  },
  {
    id: 'habermannsee',
    permitId: 'B 04-102',
    name: 'Habermann See',
    kind: 'lake',
    note: {
      de: 'Kaulsdorfer Seen.',
      en: 'Kaulsdorf lakes.',
    },
  },
  {
    id: 'kiessee',
    permitId: 'B 04-103',
    name: 'Kiessee',
    kind: 'lake',
    approximate: true,
    note: {
      de: 'Südteil des Kaulsdorfer Baggersees (Badestelle Mannheimer Straße); Abgrenzung zum Habermannsee schematisch.',
      en: 'Southern basin of the Kaulsdorf gravel-pit lake (Mannheimer Straße bathing spot); boundary to Habermannsee schematic.',
    },
  },
  {
    id: 'koerner-see',
    permitId: 'B 04-104',
    name: 'Körner See',
    kind: 'lake',
    note: {
      de: 'Parkteich an der Kohlisstraße (Mahlsdorf-Süd).',
      en: 'Park pond at Kohlisstraße (Mahlsdorf-Süd).',
    },
  },
  {
    id: 'grabensprung',
    permitId: 'B 05-101',
    name: 'Grabensprung',
    kind: 'lake',
    note: {
      de: 'Biesdorfer Baggersee.',
      en: 'Biesdorf gravel-pit lake.',
    },
  },
  {
    id: 'wuhlebecken',
    permitId: 'B 05-102',
    name: 'Wuhlebecken',
    kind: 'lake',
    note: {
      de: 'An der Wuhle in Biesdorf.',
      en: 'On the Wuhle in Biesdorf.',
    },
  },
]

export const berlinWaters: WaterArea[] = meta.map((m) => {
  const geometry = waterGeometries[m.id]
  if (!geometry) throw new Error(`missing geometry for water: ${m.id}`)
  return { ...m, geometry }
})
