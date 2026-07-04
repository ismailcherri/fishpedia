export type Lang = 'de' | 'en'

export interface LocalizedText {
  de: string
  en: string
}

export type Region = 'berlin' | 'brandenburg'

export type FishCategory = 'predator' | 'cyprinid' | 'salmonid' | 'protected'

/**
 * A closed season (Schonzeit). Dates are "MM-DD" strings and inclusive on
 * both ends. Seasons may wrap the year boundary (e.g. 10-16 .. 04-15).
 */
export interface ClosedSeason {
  from: string
  to: string
}

/** Regulation for one species in one region (LFischO Bln / BbgFischO). */
export interface RegionRule {
  /** Mindestmaß in cm (undefined = no legal minimum size) */
  minSizeCm?: number
  /** Schonzeit (undefined = no closed season) */
  closedSeason?: ClosedSeason
  /** Ganzjährig geschont – may never be targeted or kept */
  fullyProtected?: boolean
  /** Extra regulation context, e.g. lure bans or per-water differences */
  note?: LocalizedText
}

export interface FishSpecies {
  /** URL slug, e.g. "hecht" */
  id: string
  names: { de: string; en: string; scientific: string }
  category: FishCategory
  description: LocalizedText
  /** Distinguishing features for identification, as bullet points */
  identification: LocalizedText[]
  habitat: LocalizedText
  avgLengthCm: number
  maxLengthCm: number
  image: {
    /** file name inside src/assets/fish/ */
    svg: string
    /** optional real photo (add later); shown instead of the SVG when set */
    photoUrl?: string
    photoAttribution?: string
  }
  regulations: {
    berlin: RegionRule
    brandenburg: RegionRule
  }
}
