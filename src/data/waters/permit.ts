import type { LocalizedText } from '../types'

/**
 * Conditions of the DAV Berlin Fischereierlaubnisvertrag (Angelkarte) as
 * printed on the permit – edit here if you get a different permit.
 * Deliberately contains NO personal data.
 */
export const permit: {
  title: LocalizedText
  subtitle: LocalizedText
  rules: LocalizedText[]
} = {
  title: {
    de: 'Meine Angelkarte (DAV Berlin)',
    en: 'My fishing permit (DAV Berlin)',
  },
  subtitle: {
    de: 'Fischereierlaubnisvertrag gem. § 14 LFischG – Jungfischereischein',
    en: 'Fishing permit contract per § 14 LFischG – junior licence',
  },
  rules: [
    {
      de: 'Nur Friedfischangeln (Jungfischereischein).',
      en: 'Coarse fishing only (junior licence).',
    },
    {
      de: 'Fischfang ohne tageszeitliche Begrenzung, vom Ufer aus.',
      en: 'Fishing at any time of day, from the bank.',
    },
    {
      de: '2 Angeln mit je einem einfachen Haken.',
      en: '2 rods with one single hook each.',
    },
    {
      de: 'Nur eine Angel als Raubrute (ein Mehrlingshaken oder ein Hakensystem für tote Köderfische zugelassen).',
      en: 'Only one rod as a predator rod (one multi-point hook or one rig for dead bait fish permitted).',
    },
    {
      de: 'Nur gültig mit Fischereischein, DAV-Mitgliedsausweis und Jahresmarke.',
      en: 'Only valid together with the fishing licence, DAV membership card and annual stamp.',
    },
    {
      de: 'Angeln dürfen nicht ohne Aufsicht ausliegen; verlorene Erlaubnisscheine werden nicht ersetzt.',
      en: 'Rods must not be left unattended; lost permits are not replaced.',
    },
  ],
}
