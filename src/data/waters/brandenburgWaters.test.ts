import { describe, expect, it } from 'vitest'
import { brandenburgWaters } from './brandenburgWaters'

describe('Brandenburg map waters', () => {
  it('matches the audited LAVB map snapshot', () => {
    expect(brandenburgWaters).toHaveLength(947)
    expect(new Set(brandenburgWaters.map((water) => water.id)).size).toBe(947)
    expect(
      brandenburgWaters.filter((water) => water.contractWater)
    ).toHaveLength(49)
  })

  it('contains valid map coordinates', () => {
    expect(
      brandenburgWaters.every(
        ({ lat, lng }) =>
          lat >= 51.3 && lat <= 53.6 && lng >= 11.2 && lng <= 14.8
      )
    ).toBe(true)
  })
})
