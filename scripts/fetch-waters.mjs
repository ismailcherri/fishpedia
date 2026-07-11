/**
 * Regenerates src/data/waters/geometries.ts from OpenStreetMap data
 * (Overpass API). Run: node scripts/fetch-waters.mjs
 *
 * Each manifest entry pins a water from the DAV Berlin Angelkarte to
 * concrete OSM objects. Line waters are extracted as the shortest path
 * through the water's way network between two pinned endpoints, so
 * permitted sections (e.g. "Schleuse Plötzensee bis Humboldthafen") come
 * out clipped exactly to the printed limits. Identifications were verified
 * against the DAV Berlin water register (landesanglerverband.berlin,
 * water numbers noted below) in July 2026.
 *
 * Data © OpenStreetMap contributors, ODbL — openstreetmap.org/copyright.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { clipRingBelowLat, simplify, stitchRing } from './lib/geometry.mjs'

const OUT_FILE = join(
  dirname(fileURLToPath(import.meta.url)),
  '../src/data/waters/geometries.ts'
)

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

/**
 * Manifest. kind 'line': `query` selects candidate ways, `from`/`to`
 * ([lng, lat]) pin the endpoints of the (permitted section of the) water.
 * kind 'polygon': `ways`/`relations` list OSM ids; every outer ring becomes
 * a path. `clipBelowLat` cuts a ring at a latitude (schematic boundary).
 */
const manifest = [
  {
    id: 'landwehrkanal',
    kind: 'line',
    query: `way["waterway"]["name"="Landwehrkanal"](52.48,13.30,52.52,13.46);`,
    from: [13.449, 52.496],
    to: [13.329, 52.512],
  },
  {
    id: 'verbindungskanal',
    kind: 'line',
    query: `way["waterway"]["name"="Charlottenburger Verbindungskanal"](52.51,13.29,52.545,13.32);`,
    from: [13.304, 52.525],
    to: [13.309, 52.535],
  },
  {
    id: 'westhafenkanal',
    kind: 'line',
    query: `way["waterway"]["name"="Westhafenkanal"](52.52,13.29,52.55,13.35);`,
    from: [13.302, 52.5355],
    to: [13.342, 52.538],
  },
  {
    // permit: zwischen Schleuse Plötzensee und Humboldthafen
    id: 'berlin-spandauer-schifffahrtskanal',
    kind: 'line',
    query: `way["waterway"]["name"="Berlin-Spandauer Schifffahrtskanal"](52.51,13.30,52.56,13.39);`,
    from: [13.3236, 52.5434],
    to: [13.3723, 52.5251],
  },
  {
    // permit: von der Lohmühlenbrücke bis Britzer Hafen (≈ whole canal)
    id: 'neukoellner-schifffahrtskanal',
    kind: 'line',
    query: `way["waterway"]["name"="Neuköllner Schifffahrtskanal"](52.45,13.42,52.50,13.46);`,
    from: [13.4394, 52.4895],
    to: [13.447, 52.462],
  },
  {
    // printed "Britzer Zweigkanal"; OSM name: Britzer Verbindungskanal
    id: 'britzer-zweigkanal',
    kind: 'line',
    query: `way["waterway"]["name"="Britzer Verbindungskanal"](52.45,13.44,52.49,13.49);`,
    from: [13.477, 52.472],
    to: [13.46, 52.462],
  },
  {
    id: 'gosener-kanal',
    kind: 'line',
    query: `way["waterway"]["name"="Gosener Kanal"](52.38,13.66,52.44,13.76);`,
    from: [13.68, 52.39],
    to: [13.75, 52.43],
  },
  {
    // permit: vom Seddinsee bis Wernsdorfer See
    id: 'oder-spree-kanal',
    kind: 'line',
    query: `way["waterway"]["name"="Oder-Spree-Kanal"](52.33,13.60,52.43,13.78);`,
    from: [13.6813, 52.3872],
    to: [13.7106, 52.3806],
  },
  {
    // permit: von der B1 bis zur Spree; waterway relation "Wuhle" (its
    // lower course is mapped as unnamed member ways)
    id: 'wuhle',
    kind: 'line',
    query: `relation(2406420)->.rel;way(r.rel)(52.42,13.52,52.54,13.62);`,
    from: [13.5734, 52.5044],
    to: [13.5887, 52.4415],
  },
  {
    // permit: vom Einlauf Britzer Zweigkanal bis Mühlendammschleuse;
    // waterway relation "Spree" (some sections are unnamed member ways)
    id: 'spree',
    kind: 'line',
    query: `relation(390274)->.rel;way(r.rel)(52.45,13.38,52.53,13.50);`,
    from: [13.475, 52.473],
    to: [13.4073, 52.514],
  },
  {
    // Spree arm at Museum Island; OSM name: Spreekanal
    id: 'kupfergraben',
    kind: 'line',
    query: `way["waterway"]["name"="Spreekanal"](52.50,13.38,52.53,13.42);`,
    from: [13.409, 52.5115],
    to: [13.394, 52.523],
  },
  { id: 'rummelsburger-see', kind: 'polygon', ways: [10295991] },
  { id: 'weisser-see', kind: 'polygon', ways: [59454293] },
  { id: 'malchower-see', kind: 'polygon', ways: [4783377] },
  { id: 'orankesee', kind: 'polygon', ways: [4788724] },
  { id: 'obersee', kind: 'polygon', relations: [312543] },
  {
    // DAV B 03-102: Karpfenteich 1 + 2 im Mittelbruch (Bucher Forst);
    // Karpfenteich 3 (relation 17073038) is gesperrt – not included
    id: 'bucher-teiche',
    kind: 'polygon',
    ways: [10570219],
    relations: [2733371],
  },
  { id: 'butzer-see', kind: 'polygon', relations: [4180313] }, // DAV B 04-101
  { id: 'habermannsee', kind: 'polygon', relations: [3559646] }, // DAV B 04-102
  {
    // DAV B 04-103 "Kiessee": south basin of the Kaulsdorfer Baggersee at
    // Mannheimer Straße; OSM maps it as part of the Habermannsee polygon,
    // so the northern edge here is a schematic straight cut.
    id: 'kiessee',
    kind: 'polygon',
    relations: [3559646],
    outerOnly: true,
    clipBelowLat: 52.4917,
  },
  { id: 'koerner-see', kind: 'polygon', ways: [25928007] }, // DAV B 04-104
  { id: 'grabensprung', kind: 'polygon', ways: [4699209] }, // DAV B 05-101
  { id: 'griebnitzsee', kind: 'polygon', ways: [71375387] },
]

// Optional response cache (WATER_CACHE_DIR) so interrupted runs resume
// without re-querying Overpass.
const cacheDir = process.env.WATER_CACHE_DIR
if (cacheDir) mkdirSync(cacheDir, { recursive: true })

async function overpass(query, cacheId) {
  const cacheFile = cacheDir && join(cacheDir, `${cacheId}.json`)
  if (cacheFile && existsSync(cacheFile))
    return JSON.parse(readFileSync(cacheFile, 'utf8'))
  const data = `[out:json][timeout:90];(${query});out geom;`
  for (let attempt = 0; attempt < 6; attempt++) {
    const endpoint = ENDPOINTS[attempt % ENDPOINTS.length]
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'User-Agent': 'fishpedia-water-fetch/1.0 (personal permit app)',
          Accept: 'application/json',
        },
        body: new URLSearchParams({ data }),
      })
      if (res.ok) {
        const elements = (await res.json()).elements
        if (cacheFile && elements.length > 0)
          writeFileSync(cacheFile, JSON.stringify(elements))
        return elements
      }
      console.error(`  HTTP ${res.status} from ${endpoint}, retrying…`)
    } catch (err) {
      console.error(`  ${err.message} from ${endpoint}, retrying…`)
    }
    await new Promise((r) => setTimeout(r, 5000))
  }
  throw new Error('all Overpass endpoints failed')
}

const toCoords = (geometry) => geometry.map((p) => [p.lon, p.lat])
const key = ([lng, lat]) => `${lng.toFixed(7)},${lat.toFixed(7)}`
const mPerDegLat = 111320
const mPerDegLng = 111320 * Math.cos((52.5 * Math.PI) / 180)
const distM = (a, b) =>
  Math.hypot((a[0] - b[0]) * mPerDegLng, (a[1] - b[1]) * mPerDegLat)

/**
 * Shortest path (metres) through the segment graph of `ways` between the
 * graph vertices nearest to `from` and `to`. Robust against branching
 * arms, parallel lock channels and unordered way soup.
 */
function pathBetween(ways, from, to) {
  const coordOf = new Map()
  const adj = new Map()
  for (const way of ways) {
    for (let i = 0; i < way.length - 1; i++) {
      const a = way[i]
      const b = way[i + 1]
      const ka = key(a)
      const kb = key(b)
      coordOf.set(ka, a)
      coordOf.set(kb, b)
      const w = distM(a, b)
      if (!adj.has(ka)) adj.set(ka, [])
      if (!adj.has(kb)) adj.set(kb, [])
      adj.get(ka).push([kb, w])
      adj.get(kb).push([ka, w])
    }
  }
  const nearest = (p) => {
    let bestK
    let bestD = Infinity
    for (const [k, c] of coordOf) {
      const d = distM(c, p)
      if (d < bestD) {
        bestD = d
        bestK = k
      }
    }
    return bestK
  }
  const start = nearest(from)
  const goal = nearest(to)

  const dist = new Map([[start, 0]])
  const prev = new Map()
  const done = new Set()
  while (true) {
    let u
    let uD = Infinity
    for (const [k, d] of dist) {
      if (!done.has(k) && d < uD) {
        uD = d
        u = k
      }
    }
    if (u === undefined) throw new Error('endpoints not connected')
    if (u === goal) break
    done.add(u)
    for (const [v, w] of adj.get(u)) {
      const nd = uD + w
      if (nd < (dist.get(v) ?? Infinity)) {
        dist.set(v, nd)
        prev.set(v, u)
      }
    }
  }
  const path = []
  for (let k = goal; k !== undefined; k = prev.get(k))
    path.unshift(coordOf.get(k))
  return path
}

/** Group relation members into closed rings (role outer/inner). */
function relationRings(rel, { outerOnly = false } = {}) {
  const rings = []
  for (const role of outerOnly ? ['outer'] : ['outer', 'inner']) {
    const members = rel.members.filter((m) => m.role === role && m.geometry)
    if (members.length === 0) continue
    // group connected members into rings
    let pool = members.map((m) => toCoords(m.geometry))
    while (pool.length > 0) {
      // grow a ring greedily from the first remaining way
      const used = [pool.shift()]
      let ring
      for (;;) {
        try {
          ring = stitchRing(used)
          break
        } catch {
          const last = used[used.length - 1]
          const ends = [last[0], last[last.length - 1]].map(key)
          const i = pool.findIndex(
            (w) =>
              ends.includes(key(w[0])) || ends.includes(key(w[w.length - 1]))
          )
          if (i === -1) throw new Error('cannot close ring')
          used.push(pool.splice(i, 1)[0])
        }
      }
      rings.push(ring)
    }
  }
  return rings
}

const round = (n) => Math.round(n * 1e5) / 1e5

function checkBerlinArea(id, coords) {
  for (const [lng, lat] of coords) {
    if (lng < 12.9 || lng > 13.9 || lat < 52.3 || lat > 52.7)
      throw new Error(`${id}: coordinate outside greater Berlin: ${lng},${lat}`)
  }
}

const results = {}

for (const entry of manifest) {
  process.stdout.write(`${entry.id} … `)
  if (entry.kind === 'line') {
    const elements = await overpass(entry.query, entry.id)
    const ways = elements
      .filter((e) => e.type === 'way' && e.geometry)
      .map((e) => toCoords(e.geometry))
    if (ways.length === 0) throw new Error(`${entry.id}: no ways found`)
    const line = simplify(pathBetween(ways, entry.from, entry.to), 150)
    if (line.length < 4) throw new Error(`${entry.id}: degenerate line`)
    checkBerlinArea(entry.id, line)
    results[entry.id] = {
      type: 'LineString',
      coordinates: line.map(([a, b]) => [round(a), round(b)]),
    }
    console.log(`line, ${line.length} pts`)
  } else {
    const parts = [
      ...(entry.ways ?? []).map((id) => `way(${id});`),
      ...(entry.relations ?? []).map((id) => `relation(${id});`),
    ].join('')
    const elements = await overpass(parts, entry.id)
    let rings = []
    for (const e of elements) {
      if (e.type === 'way' && e.geometry)
        rings.push(stitchRing([toCoords(e.geometry)]))
      if (e.type === 'relation')
        rings.push(...relationRings(e, { outerOnly: entry.outerOnly }))
    }
    if (entry.clipBelowLat !== undefined)
      rings = rings
        .map((r) => clipRingBelowLat(r, entry.clipBelowLat))
        .filter((r) => r.length >= 4)
    if (rings.length === 0) throw new Error(`${entry.id}: no rings`)
    rings = rings.map((r) => simplify(r, 100))
    for (const r of rings) {
      if (key(r[0]) !== key(r[r.length - 1]))
        throw new Error(`${entry.id}: ring not closed`)
      checkBerlinArea(entry.id, r)
    }
    results[entry.id] = {
      type: 'Polygon',
      coordinates: rings.map((r) => r.map(([a, b]) => [round(a), round(b)])),
    }
    console.log(
      `polygon, ${rings.length} ring(s), ${rings.reduce((n, r) => n + r.length, 0)} pts`
    )
  }
  await new Promise((r) => setTimeout(r, 1500))
}

const ids = manifest.map((m) => m.id)
if (new Set(ids).size !== ids.length) throw new Error('duplicate ids')

const body = ids
  .map((id) => `  '${id}': ${JSON.stringify(results[id])},`)
  .join('\n')

writeFileSync(
  OUT_FILE,
  `// GENERATED by scripts/fetch-waters.mjs — do not edit by hand.
// Geometry data © OpenStreetMap contributors (ODbL),
// https://www.openstreetmap.org/copyright
import type { WaterGeometry } from './types'

export const waterGeometries: Record<string, WaterGeometry> = {
${body}
}
`
)
console.log(`\nwrote ${OUT_FILE} (${ids.length} waters)`)
