// Fetches a freely licensed photo for each species from Wikipedia/Wikimedia
// Commons into src/assets/fish/photos/ and regenerates src/data/photoCredits.ts.
//
// Usage: node scripts/fetch-photos.mjs [id ...]
//   With no args all species are fetched; passing ids re-fetches only those.
//   To use a different Commons image for a species, add an entry to OVERRIDES.

import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PHOTO_DIR = path.join(ROOT, 'src/assets/fish/photos')
const CREDITS_FILE = path.join(ROOT, 'src/data/photoCredits.ts')
const UA =
  'fishpedea/1.0 (https://github.com/ismailcherri/fishpedea; hobby fishing companion app)'

// id → candidate Wikipedia page titles, most specific first.
const SPECIES = [
  ['hecht', 'Esox lucius', 'Hecht'],
  ['zander', 'Sander lucioperca', 'Zander'],
  ['barsch', 'Perca fluviatilis', 'Flussbarsch'],
  ['wels', 'Silurus glanis', 'Wels'],
  ['aal', 'Anguilla anguilla', 'Europäischer Aal'],
  ['quappe', 'Lota lota', 'Quappe'],
  ['rapfen', 'Leuciscus aspius', 'Rapfen'],
  ['kaulbarsch', 'Gymnocephalus cernua', 'Kaulbarsch'],
  ['karpfen', 'Cyprinus carpio', 'Karpfen'],
  ['schleie', 'Tinca tinca', 'Schleie'],
  ['barbe', 'Barbus barbus', 'Barbe'],
  ['aland', 'Leuciscus idus', 'Aland'],
  ['doebel', 'Squalius cephalus', 'Döbel'],
  ['ploetze', 'Rutilus rutilus', 'Rotauge'],
  ['rotfeder', 'Scardinius erythrophthalmus', 'Rotfeder'],
  ['blei', 'Abramis brama', 'Brachse'],
  ['guester', 'Blicca bjoerkna', 'Güster'],
  ['karausche', 'Carassius carassius', 'Karausche'],
  ['giebel', 'Carassius gibelio', 'Giebel'],
  ['ukelei', 'Alburnus alburnus', 'Ukelei'],
  ['gruendling', 'Gobio gobio', 'Gründling'],
  ['nase', 'Chondrostoma nasus', 'Nase (Fisch)'],
  ['bachforelle', 'Bachforelle', 'Salmo trutta fario'],
  ['regenbogenforelle', 'Oncorhynchus mykiss', 'Regenbogenforelle'],
  ['seeforelle', 'Seeforelle', 'Salmo trutta lacustris'],
  ['aesche', 'Thymallus thymallus', 'Äsche'],
  ['grosse-maraene', 'Coregonus maraena', 'Ostseeschnäpel'],
  ['lachs', 'Salmo salar', 'Atlantischer Lachs'],
  ['meerforelle', 'Meerforelle', 'Salmo trutta trutta'],
  ['stoer', 'Acipenser oxyrinchus', 'Atlantischer Stör'],
  ['bitterling', 'Rhodeus amarus', 'Bitterling'],
  ['steinbeisser', 'Cobitis taenia', 'Steinbeißer'],
  ['schlammpeitzger', 'Misgurnus fossilis', 'Schlammpeitzger'],
]

// id → Commons file title (without "File:"), used instead of the Wikipedia
// lead image when that one is unsuitable (drawing, map, poor angle …).
const OVERRIDES = {
  // Wikipedia lead image was fish eggs; use a clear specimen instead.
  seeforelle: 'Salmo trutta.jpg',
  // Wikipedia lead image was a drawing; use an underwater photo instead.
  aesche: 'Grayling Thymallus thymallus.JPG',
}

const OK_EXT = new Set(['jpg', 'jpeg', 'png'])

async function getJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA } })
  if (!res.ok) return null
  return res.json()
}

function fileNameFromUrl(url) {
  const name = decodeURIComponent(new URL(url).pathname.split('/').pop())
  // Thumbnail URLs end in "<width>px-<original name>".
  return name.replace(/^\d+px-/, '')
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function findLeadImageFile(titles) {
  for (const wiki of ['de', 'en']) {
    for (const title of titles) {
      const data = await getJson(
        `https://${wiki}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      )
      const src = data?.originalimage?.source
      if (!src) continue
      const file = fileNameFromUrl(src)
      const ext = file.split('.').pop().toLowerCase()
      if (!OK_EXT.has(ext)) continue
      if (/\b(map|range|distribution|verbreitung)\b/i.test(file)) continue
      return file
    }
  }
  return null
}

async function fetchCredit(file) {
  const data = await getJson(
    `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(`File:${file}`)}&prop=imageinfo&iiprop=extmetadata%7Curl&format=json&formatversion=2`
  )
  const info = data?.query?.pages?.[0]?.imageinfo?.[0]
  const meta = info?.extmetadata ?? {}
  return {
    author: stripHtml(meta.Artist?.value ?? 'Unbekannt / unknown'),
    license: meta.LicenseShortName?.value ?? 'siehe Quelle / see source',
    sourceUrl:
      info?.descriptionurl ??
      `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
  }
}

async function downloadPhoto(file, id) {
  const ext = file.split('.').pop().toLowerCase() === 'png' ? 'png' : 'jpg'
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1000`
  const res = await fetch(url, {
    headers: { 'user-agent': UA },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`download failed (${res.status}): ${file}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const target = path.join(PHOTO_DIR, `${id}.${ext}`)
  await writeFile(target, buf)
  return { target, bytes: buf.length }
}

async function loadExistingCredits() {
  if (!existsSync(CREDITS_FILE)) return {}
  const src = await readFile(CREDITS_FILE, 'utf8')
  const match = src.match(/export const photoCredits[^=]*=\s*(\{[\s\S]*\})\s*$/)
  if (!match) return {}
  return JSON.parse(match[1])
}

function writeCredits(credits) {
  const sorted = Object.fromEntries(
    Object.entries(credits).sort(([a], [b]) => a.localeCompare(b))
  )
  const body = JSON.stringify(sorted, null, 2)
  return writeFile(
    CREDITS_FILE,
    `// Generated by scripts/fetch-photos.mjs — do not edit by hand.
export interface PhotoCredit {
  file: string
  author: string
  license: string
  sourceUrl: string
}

export const photoCredits: Record<string, PhotoCredit> = ${body}
`
  )
}

const only = new Set(process.argv.slice(2))
await mkdir(PHOTO_DIR, { recursive: true })
const credits = await loadExistingCredits()
const failed = []

for (const [id, ...titles] of SPECIES) {
  if (only.size > 0 && !only.has(id)) continue
  try {
    const file = OVERRIDES[id] ?? (await findLeadImageFile(titles))
    if (!file) throw new Error('no usable lead image found')
    const credit = await fetchCredit(file)
    const { bytes } = await downloadPhoto(file, id)
    credits[id] = { file, ...credit }
    console.log(
      `ok  ${id}: ${file} (${Math.round(bytes / 1024)} kB, ${credit.license})`
    )
  } catch (err) {
    failed.push(id)
    console.error(`ERR ${id}: ${err.message}`)
  }
  await new Promise((r) => setTimeout(r, 250))
}

await writeCredits(credits)
console.log(
  `\n${Object.keys(credits).length} credits written to src/data/photoCredits.ts`
)
if (failed.length > 0) {
  console.error(`failed: ${failed.join(', ')}`)
  process.exitCode = 1
}
