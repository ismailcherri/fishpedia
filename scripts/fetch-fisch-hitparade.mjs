/**
 * Supplement existing waters with factual FHP metadata for personal reference.
 * Run: npm run fetch:fhp (Node 22+). Cache makes interrupted runs resumable.
 * Use --refresh to re-fetch; --offline rebuilds exclusively from the cache.
 * No article text, photos, forum posts, or permit rules are published.
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'
import { createServer } from 'vite'
import {
  matchWater,
  ORIGIN,
  parseDirectory,
  parseWater,
} from './lib/fisch-hitparade.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const cache = `${root}.cache/fisch-hitparade`
const output = `${root}src/data/waters/fischHitparade.json`
const refresh = process.argv.includes('--refresh')
const offline = process.argv.includes('--offline')
if (refresh && offline)
  throw new Error('--refresh and --offline cannot be combined')
await mkdir(cache, { recursive: true })

// Reuse the app's actual catalog, including Berlin geometry, through installed Vite.
const vite = await createServer({
  configFile: false,
  root,
  cacheDir: `${root}.cache/vite-fhp`,
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: 'custom',
})
let waters
try {
  const { berlinWaters } = await vite.ssrLoadModule(
    '/src/data/waters/berlinWaters.ts'
  )
  const { brandenburgWaters } = await vite.ssrLoadModule(
    '/src/data/waters/brandenburgWaters.ts'
  )
  waters = [
    ...berlinWaters.map((w) => {
      const coords =
        w.geometry.type === 'LineString'
          ? w.geometry.coordinates
          : w.geometry.coordinates.flat()
      const lngs = coords.map((c) => c[0]),
        lats = coords.map((c) => c[1])
      return {
        id: w.id,
        permitId: w.permitId,
        name: w.name,
        region: 'berlin',
        lat: (Math.min(...lats) + Math.max(...lats)) / 2,
        lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
      }
    }),
    ...brandenburgWaters.map((w) => ({
      ...w,
      permitId: w.id.replace(/ \(\d+\)$/, ''),
      region: 'brandenburg',
    })),
  ]
} finally {
  await vite.close()
}

async function page(url) {
  const path = `${cache}/${createHash('sha256').update(url).digest('hex')}.json`
  if (!refresh) {
    try {
      return JSON.parse(await readFile(path, 'utf8'))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
  }
  if (offline) throw new Error(`Missing cached page: ${url}`)
  for (let attempt = 0; attempt < 3; attempt++) {
    await delay(400 + attempt * 2000)
    const response = await fetch(url, {
      signal: AbortSignal.timeout(30_000),
      headers: { 'User-Agent': 'Fishpedia/0.1 (personal water reference)' },
    })
    if ((response.status === 429 || response.status >= 500) && attempt < 2) {
      await delay(5000)
      continue
    }
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`)
    const data = {
      url,
      fetchedAt: new Date().toISOString().slice(0, 10),
      html: await response.text(),
    }
    await writeFile(path, JSON.stringify(data))
    return data
  }
}

async function pool(items, task) {
  let index = 0,
    done = 0
  await Promise.all(
    Array.from({ length: 2 }, async () => {
      while (index < items.length) {
        const item = items[index++]
        await task(item)
        done++
        if (done % 50 === 0 || done === items.length)
          console.log(`${done}/${items.length}`)
      }
    })
  )
}

const listUrl = (pageNumber = 1) =>
  `${ORIGIN}/gewaesser/liste/${pageNumber > 1 ? `page/${pageNumber}/` : ''}?search=&country%5B%5D=DE&bundesland%5B%5D=berlin&bundesland%5B%5D=brandenburg&plz=`
const first = parseDirectory((await page(listUrl())).html)
if (first.pages > 300) throw new Error('Unexpected directory pagination')
const entries = new Map(first.entries.map((e) => [e.url, e]))
console.log(`Discovering ${first.pages} directory pages`)
await pool(
  Array.from({ length: first.pages - 1 }, (_, i) => i + 2),
  async (number) => {
    const parsed = parseDirectory((await page(listUrl(number))).html)
    for (const entry of parsed.entries) entries.set(entry.url, entry)
  }
)
console.log(`Reading ${entries.size} water pages`)
const matches = new Map(),
  skipped = [],
  errors = []
await pool([...entries.values()], async (entry) => {
  try {
    const result = await page(entry.url)
    const parsed = parseWater(result.html, entry.url)
    const match = matchWater(parsed, waters)
    if (!match) {
      skipped.push(entry)
      return
    }
    const key = `${match.water.region}:${match.water.id}`
    const { name, url, species, substrate, areaHa, averageDepthM, maxDepthM } =
      parsed
    const record = {
      name,
      url,
      fetchedAt: result.fetchedAt,
      matchMethod: match.method,
      species,
      substrate,
      areaHa,
      averageDepthM,
      maxDepthM,
    }
    const existing = matches.get(key) ?? []
    matches.set(key, [...existing, record])
  } catch (error) {
    errors.push({ ...entry, error: error.message })
  }
})

const ambiguous = [...matches.entries()].filter(
  ([, values]) => values.length !== 1
)
const data = Object.fromEntries(
  [...matches.entries()]
    .filter(([, values]) => values.length === 1)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, values]) => [key, values[0]])
)
await writeFile(
  `${cache}/report.json`,
  JSON.stringify(
    {
      entries: entries.size,
      matched: Object.keys(data).length,
      ambiguous,
      skipped,
      errors,
    },
    null,
    2
  )
)
if (errors.length)
  throw new Error(
    `${errors.length} pages failed; output unchanged. See .cache/fisch-hitparade/report.json and rerun to resume.`
  )
if (!Object.keys(data).length)
  throw new Error('No confident matches; output unchanged')
await writeFile(`${output}.tmp`, JSON.stringify(data, null, 2) + '\n')
await rename(`${output}.tmp`, output)
console.log(
  `Saved ${Object.keys(data).length} matched waters (${ambiguous.length} ambiguous matches skipped). Report: .cache/fisch-hitparade/report.json`
)
