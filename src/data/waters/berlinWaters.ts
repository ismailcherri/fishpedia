import { waterGeometries } from './geometries'
import type { WaterArea } from './types'

/**
 * Waters permitted by the DAV Berlin Fischereierlaubnisvertrag (Angelkarte).
 * Names, sections and restrictions verified against the printed permit.
 *
 * Geometries come from OpenStreetMap data, clipped to the permitted
 * sections printed on the permit; waters were identified against the DAV
 * Berlin water register (landesanglerverband.berlin). Regenerate with:
 *   node scripts/fetch-waters.mjs
 */
const meta: Omit<WaterArea, 'geometry'>[] = [
  {
    id: 'landwehrkanal',
    name: 'Landwehrkanal',
    kind: 'canal',
  },
  {
    id: 'verbindungskanal',
    name: 'Verbindungskanal',
    kind: 'canal',
    note: {
      de: 'Charlottenburger Verbindungskanal (Spree – Westhafenkanal).',
      en: 'Charlottenburg connecting canal (Spree – Westhafen canal).',
    },
  },
  {
    id: 'westhafenkanal',
    name: 'Westhafenkanal',
    kind: 'canal',
  },
  {
    id: 'berlin-spandauer-schifffahrtskanal',
    name: 'Berlin-Spandauer Schifffahrtskanal',
    kind: 'canal',
    note: {
      de: 'Zwischen Schleuse Plötzensee und Humboldthafen.',
      en: 'Between Plötzensee lock and Humboldthafen.',
    },
  },
  {
    id: 'neukoellner-schifffahrtskanal',
    name: 'Neuköllner Schifffahrtskanal',
    kind: 'canal',
    note: {
      de: 'Von der Lohmühlenbrücke bis Britzer Hafen.',
      en: 'From Lohmühlen bridge to Britz harbour.',
    },
  },
  {
    id: 'britzer-zweigkanal',
    name: 'Britzer Zweigkanal',
    kind: 'canal',
    note: {
      de: 'Auch Britzer Verbindungskanal (Teltowkanal – Spree).',
      en: 'Also known as Britzer Verbindungskanal (Teltow canal – Spree).',
    },
  },
  {
    id: 'gosener-kanal',
    name: 'Gosener Kanal',
    kind: 'canal',
    note: {
      de: 'Zwischen Seddinsee und Dämeritzsee.',
      en: 'Between Seddinsee and Dämeritzsee.',
    },
  },
  {
    id: 'oder-spree-kanal',
    name: 'Oder-Spree-Kanal',
    kind: 'canal',
    note: {
      de: 'Vom Seddinsee bis Wernsdorfer See.',
      en: 'From Seddinsee to Wernsdorfer See.',
    },
  },
  {
    id: 'wuhle',
    name: 'Wuhle / Wuhlebecken',
    kind: 'river',
    note: {
      de: 'Von der B1 bis zur Spree.',
      en: 'From the B1 road to the Spree.',
    },
  },
  {
    id: 'spree',
    name: 'Spree',
    kind: 'river',
    note: {
      de: 'Vom Einlauf Britzer Zweigkanal bis Mühlendammschleuse (inkl. Kupfergraben und Rummelsburger See).',
      en: 'From the Britzer Zweigkanal inlet to Mühlendamm lock (incl. Kupfergraben and Rummelsburger See).',
    },
  },
  {
    id: 'kupfergraben',
    name: 'Kupfergraben',
    kind: 'river',
    note: {
      de: 'Spreearm an der Museumsinsel (gehört zur Spree-Strecke).',
      en: 'Spree arm at Museum Island (part of the Spree section).',
    },
  },
  {
    id: 'rummelsburger-see',
    name: 'Rummelsburger See',
    kind: 'lake',
    note: {
      de: 'Bucht der Spree (gehört zur Spree-Strecke).',
      en: 'Bay of the Spree (part of the Spree section).',
    },
  },
  {
    id: 'weisser-see',
    name: 'Weißer See',
    kind: 'lake',
    note: {
      de: 'Parkgewässer – nur Bootsangeln!',
      en: 'Park water – boat fishing only!',
    },
  },
  {
    id: 'malchower-see',
    name: 'Malchower See',
    kind: 'lake',
  },
  {
    id: 'orankesee',
    name: 'Oranke See',
    kind: 'lake',
    note: {
      de: 'Uferangeln nur an gekennzeichneten Stellen.',
      en: 'Bank fishing only at marked spots.',
    },
  },
  {
    id: 'obersee',
    name: 'Obersee',
    kind: 'lake',
    note: {
      de: 'Uferangeln auf der Grundstücksseite.',
      en: 'Bank fishing on the property side.',
    },
  },
  {
    id: 'bucher-teiche',
    name: 'Bucher Teich I–II',
    kind: 'lake',
    note: {
      de: 'Karpfenteiche im Mittelbruch (Bucher Forst); Teich III gesperrt – Naturschutz.',
      en: 'Carp ponds in the Mittelbruch (Buch forest); pond III closed – nature reserve.',
    },
  },
  {
    id: 'butzer-see',
    name: 'Butzer See',
    kind: 'lake',
    note: {
      de: 'Kaulsdorfer Seen.',
      en: 'Kaulsdorf lakes.',
    },
  },
  {
    id: 'habermannsee',
    name: 'Habermann See',
    kind: 'lake',
    note: {
      de: 'Kaulsdorfer Seen.',
      en: 'Kaulsdorf lakes.',
    },
  },
  {
    id: 'kiessee',
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
    name: 'Körner See',
    kind: 'lake',
    note: {
      de: 'Parkteich an der Kohlisstraße (Mahlsdorf-Süd).',
      en: 'Park pond at Kohlisstraße (Mahlsdorf-Süd).',
    },
  },
  {
    id: 'grabensprung',
    name: 'Grabensprung',
    kind: 'lake',
    note: {
      de: 'Biesdorfer Baggersee.',
      en: 'Biesdorf gravel-pit lake.',
    },
  },
  {
    id: 'griebnitzsee',
    name: 'Griebnitzsee',
    kind: 'lake',
  },
]

export const berlinWaters: WaterArea[] = meta.map((m) => {
  const geometry = waterGeometries[m.id]
  if (!geometry) throw new Error(`missing geometry for water: ${m.id}`)
  return { ...m, geometry }
})
