import { describe, expect, it } from 'vitest'
import { clipLine, simplify, stitchRing, stitchWays } from './geometry.mjs'

describe('stitchWays', () => {
  it('chains segments sharing endpoints, reversing where needed', () => {
    // A→B, C→B (needs reversal), C→D
    const ways = [
      [
        [0, 0],
        [1, 0],
      ],
      [
        [2, 0],
        [1, 0],
      ],
      [
        [2, 0],
        [3, 0],
      ],
    ]
    expect(stitchWays(ways)).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ])
  })

  it('returns a single way unchanged', () => {
    const way = [
      [0, 0],
      [1, 1],
    ]
    expect(stitchWays([way])).toEqual(way)
  })

  it('throws when segments do not connect', () => {
    expect(() =>
      stitchWays([
        [
          [0, 0],
          [1, 0],
        ],
        [
          [5, 5],
          [6, 5],
        ],
      ])
    ).toThrow(/connect/i)
  })
})

describe('stitchRing', () => {
  it('assembles ways into a closed ring', () => {
    const ways = [
      [
        [0, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 1],
        [0, 1],
      ],
      [
        [0, 0],
        [0, 1],
      ],
    ]
    const ring = stitchRing(ways)
    expect(ring[0]).toEqual(ring[ring.length - 1])
    // all original vertices present
    expect(ring).toHaveLength(5)
  })

  it('closes an already-closed single way', () => {
    const way = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 0],
    ]
    expect(stitchRing([way])).toEqual(way)
  })
})

describe('clipLine', () => {
  const line = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ]

  it('slices between the vertices nearest to from/to', () => {
    expect(clipLine(line, [1.1, 0.1], [3.05, -0.1])).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
    ])
  })

  it('preserves original line direction even if from/to are swapped', () => {
    expect(clipLine(line, [3.05, 0], [1.1, 0])).toEqual([
      [1, 0],
      [2, 0],
      [3, 0],
    ])
  })

  it('returns full line when clip points are at the ends', () => {
    expect(clipLine(line, [0, 0], [4, 0])).toEqual(line)
  })
})

describe('simplify', () => {
  it('keeps endpoints and stays under maxPoints', () => {
    const coords = Array.from({ length: 500 }, (_, i) => [
      i / 100,
      Math.sin(i / 10) * 0.01,
    ])
    const out = simplify(coords, 50)
    expect(out.length).toBeLessThanOrEqual(50)
    expect(out[0]).toEqual(coords[0])
    expect(out[out.length - 1]).toEqual(coords[coords.length - 1])
  })

  it('leaves short lines untouched', () => {
    const coords = [
      [0, 0],
      [1, 1],
      [2, 0],
    ]
    expect(simplify(coords, 50)).toEqual(coords)
  })

  it('preserves ring closure when simplifying polygons', () => {
    const ring = Array.from({ length: 200 }, (_, i) => {
      const a = (i / 199) * 2 * Math.PI
      return [Math.cos(a), Math.sin(a)]
    })
    ring[199] = ring[0]
    const out = simplify(ring, 40)
    expect(out[0]).toEqual(out[out.length - 1])
    expect(out.length).toBeLessThanOrEqual(40)
  })
})
