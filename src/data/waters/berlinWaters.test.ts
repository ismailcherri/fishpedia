import { describe, expect, it } from 'vitest'
import { berlinWaters } from './berlinWaters'

const officialWaterIds = [
  'B 01-101',
  'B 02-101',
  'B 02-102',
  'B 02-103',
  'B 03-102',
  'B 04-101',
  'B 04-102',
  'B 04-103',
  'B 04-104',
  'B 05-101',
  'B 05-102',
  'B 06-101',
  'B 10-201',
  'B 10-202',
  'B 10-203',
  'B 10-204',
  'B 10-205',
  'B 10-206',
  'B 10-207',
  'B 10-208',
  'B 10-209',
  'B 10-210',
  'B 10-211',
]

describe('Berlin permit waters', () => {
  it('matches the official LAV Berlin water register', () => {
    const actualIds = berlinWaters.flatMap((water) =>
      water.permitId ? [water.permitId] : []
    )

    expect(actualIds).toHaveLength(officialWaterIds.length)
    expect(new Set(actualIds).size).toBe(actualIds.length)
    expect(actualIds.sort()).toEqual(officialWaterIds)
  })
})
