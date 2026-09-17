import { getFish } from '../fish'
import type { Region } from '../types'
import imported from './fischHitparade.json'

export interface WaterEnrichment {
  name: string
  url: string
  /** Retrieval date, not a claim that the source facts were independently verified. */
  fetchedAt: string
  matchMethod: 'permit' | 'name-location'
  species: { slug: string; name: string }[]
  substrate: string[]
  areaHa?: number
  averageDepthM?: number
  maxDepthM?: number
}

const records: Record<string, WaterEnrichment> = imported as Record<
  string,
  WaterEnrichment
>

export function getWaterEnrichment(region: Region, id: string) {
  return records[`${region}:${id}`]
}

const fishAliases: Record<string, string> = {
  rotauge: 'ploetze',
  brasse: 'blei',
  'laube-ukelei': 'ukelei',
  'wels-waller': 'wels',
}

export function getSourceFish(slug: string) {
  // The source's generic sturgeon entry does not identify European sturgeon.
  if (slug === 'stoer') return undefined
  return getFish(fishAliases[slug] ?? slug)
}

const sourceSpeciesEnglish: Record<string, string> = {
  bachsaibling: 'Brook trout',
  goldforellen: 'Golden trout',
  graskarpfen: 'Grass carp',
  hasel: 'Dace',
  'katzenwels-zwergwels': 'Bullhead catfish',
  lachsforelle: 'Salmon trout',
  maraene: 'Whitefish',
  marmorkarpfen: 'Bighead carp',
  moderlieschen: 'Sunbleak',
  'saibling-seesaibling': 'Arctic char',
  schuppenkarpfen: 'Scaled carp',
  silberkarpfen: 'Silver carp',
  'sonstige-fischarten': 'Other fish species',
  spiegelkarpfen: 'Mirror carp',
  stint: 'Smelt',
  stoer: 'Sturgeon',
  'verschiedene-weissfisch-arten': 'Various coarse fish',
  wildkarpfen: 'Wild carp',
  zeilenkarpfen: 'Linear mirror carp',
  zope: 'Blue bream',
}

export function sourceSpeciesLabel(
  species: { slug: string; name: string },
  lang: 'de' | 'en'
) {
  return lang === 'en'
    ? (sourceSpeciesEnglish[species.slug] ?? species.name)
    : species.name
}

const substrateEnglish: Record<string, string> = {
  sandig: 'sandy',
  schlammig: 'muddy',
  kiesig: 'gravel',
  steinig: 'stony',
  felsig: 'rocky',
  torfig: 'peaty',
  lehmig: 'clay',
  'moderig/sumpfig': 'silty / marshy',
  krautig: 'weedy',
  holzig: 'woody debris',
}

export function substrateLabel(value: string, lang: 'de' | 'en') {
  return lang === 'en'
    ? (substrateEnglish[value.toLowerCase()] ?? value)
    : value
}
