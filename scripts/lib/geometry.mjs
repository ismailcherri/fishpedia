/**
 * Pure geometry helpers for the water-data pipeline (scripts/fetch-waters.mjs).
 * Coordinates are [lng, lat] pairs throughout.
 */

const key = ([lng, lat]) => `${lng.toFixed(7)},${lat.toFixed(7)}`

/**
 * Chain way segments that share endpoints into one continuous line.
 * Segments may be in any order and any direction.
 */
export function stitchWays(ways) {
  if (ways.length === 0) throw new Error('stitchWays: no ways given')
  const remaining = ways.map((w) => [...w])
  let chain = remaining.shift()

  while (remaining.length > 0) {
    const head = key(chain[0])
    const tail = key(chain[chain.length - 1])
    const i = remaining.findIndex(
      (w) =>
        key(w[0]) === tail ||
        key(w[w.length - 1]) === tail ||
        key(w[0]) === head ||
        key(w[w.length - 1]) === head
    )
    if (i === -1) {
      throw new Error(
        `stitchWays: segments do not connect (${remaining.length} left over)`
      )
    }
    const [w] = remaining.splice(i, 1)
    if (key(w[0]) === tail) chain = chain.concat(w.slice(1))
    else if (key(w[w.length - 1]) === tail)
      chain = chain.concat(w.reverse().slice(1))
    else if (key(w[w.length - 1]) === head) chain = w.slice(0, -1).concat(chain)
    else chain = w.reverse().slice(0, -1).concat(chain)
  }
  return chain
}

/** Assemble ways into a closed ring (first point === last point). */
export function stitchRing(ways) {
  const line = stitchWays(ways)
  if (key(line[0]) !== key(line[line.length - 1])) line.push(line[0])
  return line
}

const sqDist = ([ax, ay], [bx, by]) => (ax - bx) ** 2 + (ay - by) ** 2

function nearestIndex(coords, point) {
  let best = 0
  let bestD = Infinity
  coords.forEach((c, i) => {
    const d = sqDist(c, point)
    if (d < bestD) {
      bestD = d
      best = i
    }
  })
  return best
}

/**
 * Slice of `coords` between the vertices nearest to `from` and `to`
 * (inclusive), preserving the line's original direction.
 */
export function clipLine(coords, from, to) {
  let i = nearestIndex(coords, from)
  let j = nearestIndex(coords, to)
  if (i > j) [i, j] = [j, i]
  return coords.slice(i, j + 1)
}

/**
 * Half-plane clip (Sutherland–Hodgman): the part of a closed ring at or
 * below `maxLat`, with intersection points inserted on crossing edges.
 */
export function clipRingBelowLat(ring, maxLat) {
  const out = []
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i]
    const b = ring[i + 1]
    const aIn = a[1] <= maxLat
    const bIn = b[1] <= maxLat
    if (aIn) out.push(a)
    if (aIn !== bIn) {
      const t = (maxLat - a[1]) / (b[1] - a[1])
      out.push([a[0] + t * (b[0] - a[0]), maxLat])
    }
  }
  if (out.length > 0 && key(out[0]) !== key(out[out.length - 1]))
    out.push(out[0])
  return out
}

/** Perpendicular distance of point p from segment a–b. */
function perpDist(p, a, b) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) return Math.sqrt(sqDist(p, a))
  const t = Math.max(
    0,
    Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lenSq)
  )
  return Math.sqrt(sqDist(p, [a[0] + t * dx, a[1] + t * dy]))
}

function douglasPeucker(coords, tolerance) {
  if (coords.length <= 2) return coords
  let maxD = 0
  let index = 0
  const last = coords.length - 1
  for (let i = 1; i < last; i++) {
    const d = perpDist(coords[i], coords[0], coords[last])
    if (d > maxD) {
      maxD = d
      index = i
    }
  }
  if (maxD <= tolerance) return [coords[0], coords[last]]
  const left = douglasPeucker(coords.slice(0, index + 1), tolerance)
  const right = douglasPeucker(coords.slice(index), tolerance)
  return left.slice(0, -1).concat(right)
}

/**
 * Douglas-Peucker simplification; the tolerance is raised until the result
 * has at most `maxPoints` points. Endpoints (and thus ring closure) are kept.
 */
export function simplify(coords, maxPoints) {
  if (coords.length <= maxPoints) return coords
  let tolerance = 0.00001 // ≈ 1 m in Berlin
  let out = douglasPeucker(coords, tolerance)
  while (out.length > maxPoints) {
    tolerance *= 2
    out = douglasPeucker(coords, tolerance)
  }
  return out
}
