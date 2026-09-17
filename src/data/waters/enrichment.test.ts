import { describe, expect, it } from 'vitest'
import { berlinWaters } from './berlinWaters'
import { brandenburgWaters } from './brandenburgWaters'
import {
  getSourceFish,
  getWaterEnrichment,
  type WaterEnrichment,
} from './enrichment'
import imported from './fischHitparade.json'

describe('imported water enrichment', () => {
  const records = Object.entries(imported) as [string, WaterEnrichment][]
  const known = new Set([
    ...berlinWaters.map((w) => `berlin:${w.id}`),
    ...brandenburgWaters.map((w) => `brandenburg:${w.id}`),
  ])

  it('contains usable records for both regions and only enriches existing waters', () => {
    expect(records.some(([key]) => key.startsWith('berlin:'))).toBe(true)
    expect(records.some(([key]) => key.startsWith('brandenburg:'))).toBe(true)
    for (const [key, record] of records) {
      expect(known.has(key), key).toBe(true)
      expect(record.name.length).toBeGreaterThan(0)
      expect(record.url).toMatch(
        /^https:\/\/www\.fisch-hitparade\.de\/gewaesser\/[\w-]+\/$/
      )
      expect(record.fetchedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(['permit', 'name-location']).toContain(record.matchMethod)
      expect(
        record.species.length +
          record.substrate.length +
          Number(record.areaHa != null) +
          Number(record.maxDepthM != null)
      ).toBeGreaterThan(0)
      expect(new Set(record.species.map((s) => s.slug)).size).toBe(
        record.species.length
      )
      for (const species of record.species) {
        expect(species.slug).toMatch(/^[\w-]+$/)
        expect(species.name.length).toBeGreaterThan(0)
      }
      for (const value of [
        record.areaHa,
        record.averageDepthM,
        record.maxDepthM,
      ]) {
        if (value != null) {
          expect(Number.isFinite(value)).toBe(true)
          expect(value).toBeGreaterThan(0)
        }
      }
      if (record.averageDepthM && record.maxDepthM)
        expect(record.averageDepthM).toBeLessThanOrEqual(record.maxDepthM)
      expect(record).not.toHaveProperty('note')
      expect(record).not.toHaveProperty('geometry')
    }
  })

  it('keeps unmatched records absent and regions separate', () => {
    expect(getWaterEnrichment('berlin', 'C 01-117')).toBeUndefined()
    expect(getWaterEnrichment('brandenburg', 'unknown')).toBeUndefined()
    expect(getWaterEnrichment('brandenburg', 'C 01-117')?.url).toBe(
      'https://www.fisch-hitparade.de/gewaesser/abbaufeld-elbekies-ii/'
    )
  })

  it('links equivalent species names without conflating unknown species', () => {
    expect(getSourceFish('rotauge')?.id).toBe('ploetze')
    expect(getSourceFish('brasse')?.id).toBe('blei')
    expect(getSourceFish('laube-ukelei')?.id).toBe('ukelei')
    expect(getSourceFish('wels-waller')?.id).toBe('wels')
    expect(getSourceFish('marmorkarpfen')).toBeUndefined()
    expect(getSourceFish('stoer')).toBeUndefined()
  })
})
