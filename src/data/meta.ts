/**
 * Data provenance. Update STAND whenever the regulation values in
 * src/data/species/ are re-checked against the official sources below.
 */
export const STAND = '2026-07'

export const SOURCES = [
  {
    name: {
      de: 'Fischereiamt Berlin – Mindestmaße und Schonzeiten (LFischO Bln)',
      en: 'Berlin Fisheries Office – minimum sizes and closed seasons (LFischO Bln)',
    },
    url: 'https://www.berlin.de/fischereiamt/angelfischen/mindestmasse-und-schonzeiten/',
  },
  {
    name: {
      de: 'Fischereiordnung des Landes Brandenburg (BbgFischO), Anlage 1',
      en: 'Brandenburg Fisheries Ordinance (BbgFischO), Annex 1',
    },
    url: 'https://bravors.brandenburg.de/de/verordnungen-212446',
  },
  {
    name: {
      de: 'MLEUV Brandenburg – Übersicht Schonzeiten (PDF)',
      en: 'Brandenburg Ministry (MLEUV) – closed seasons overview (PDF)',
    },
    url: 'https://mleuv.brandenburg.de/sixcms/media.php/9/Schonzeiten-Fischarten-de.pdf',
  },
] as const
