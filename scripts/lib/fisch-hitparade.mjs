/** Parsers for the public FHP directory. Never evaluate source-page scripts. */
export const ORIGIN = 'https://www.fisch-hitparade.de'

export function cleanText(html) {
  const entities = {
    amp: '&',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    auml: 'ä',
    ouml: 'ö',
    uuml: 'ü',
    Auml: 'Ä',
    Ouml: 'Ö',
    Uuml: 'Ü',
    szlig: 'ß',
    ndash: '–',
    mdash: '—',
    hellip: '…',
  }
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (full, entity) => {
      if (!entity.startsWith('#')) return entities[entity] ?? full
      const code =
        entity[1].toLowerCase() === 'x'
          ? parseInt(entity.slice(2), 16)
          : Number(entity.slice(1))
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : ''
    })
    .replace(/\s+/g, ' ')
    .trim()
}

export function parseDirectory(html) {
  const entries = [
    ...html.matchAll(
      /<a\b[^>]*href="([^"]+)"[^>]*>\s*<h5\b[^>]*>([\s\S]*?)<\/h5>/g
    ),
  ]
    .map(([, url, name]) => ({ url: cleanText(url), name: cleanText(name) }))
    .filter(({ url }) =>
      /^https:\/\/www\.fisch-hitparade\.de\/gewaesser\/[\w-]+\/$/.test(url)
    )
  const pages = [...html.matchAll(/\/gewaesser\/liste\/page\/(\d+)\//g)].map(
    (m) => Number(m[1])
  )
  if (!entries.length)
    throw new Error('FHP directory has no water cards; check markup')
  return { entries, pages: Math.max(1, ...pages) }
}

export function parseWater(html, url) {
  const name = cleanText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '')
  if (!name) throw new Error(`No water title: ${url}`)
  const properties = new Map(
    [
      ...html.matchAll(
        /<h6\b[^>]*class="[^"]*property-title[^"]*"[^>]*>([\s\S]*?)<\/h6>\s*<div\b[^>]*class="[^"]*property-content[^"]*"[^>]*>([\s\S]*?)<\/div>/g
      ),
    ].map(([, label, content]) => [cleanText(label), content])
  )
  if (!properties.size) throw new Error(`No water properties: ${url}`)
  const species = [
    ...(properties.get('Fischbestand') ?? '').matchAll(
      /<a\b[^>]*href="https:\/\/www\.fisch-hitparade\.de\/service\/fischlexikon\/([\w-]+)\/"[^>]*>([\s\S]*?)<\/a>/g
    ),
  ].map(([, slug, label]) => ({ slug, name: cleanText(label) }))
  const numberInput = (id) => {
    const input = html.match(new RegExp(`<input\\b[^>]*id="${id}"[^>]*>`))?.[0]
    const value = Number(input?.match(/\bvalue="([^"]*)"/)?.[1])
    return Number.isFinite(value) && value > 0 ? value : undefined
  }
  const rawMarkers = html.match(/const markersGroup\s*=\s*(\{[^\n]*\});/)?.[1]
  const marker = rawMarkers
    ? JSON.parse(rawMarkers).waters?.find((w) => w.url === url)
    : undefined
  const lat = Number(marker?.coordinates?.lat)
  const lng = Number(marker?.coordinates?.lng ?? marker?.coordinates?.lon)
  // Only the editorial description, never forum posts, related waters or forms.
  const description = cleanText(
    html.match(/<div class="body_content">([\s\S]*?)<\/div>/)?.[1] ?? ''
  )
  const permitIds = [
    ...new Set(
      [
        ...description.matchAll(/\b([BCFP])\s*(\d{2})\s*[-–]\s*(\d{2,3})\b/g),
      ].map(([, region, district, water]) => `${region} ${district}-${water}`)
    ),
  ]
  const substrate = [
    ...(properties.get('Untergrund') ?? '').matchAll(
      /<li\b[^>]*>([\s\S]*?)<\/li>/g
    ),
  ].map((m) => cleanText(m[1]))
  return {
    name,
    url,
    species,
    substrate,
    areaHa: numberInput('size'),
    averageDepthM: numberInput('average_depth'),
    maxDepthM: numberInput('maximum_depth'),
    permitIds,
    ...(Number.isFinite(lat) && Number.isFinite(lng) && { lat, lng }),
  }
}

export function normalizedName(name) {
  return name
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '')
}

export function distanceKm(a, b) {
  return Math.hypot(
    (a.lat - b.lat) * 111.2,
    (a.lng - b.lng) * 111.2 * Math.cos(((a.lat + b.lat) * Math.PI) / 360)
  )
}

/** Reject shared permit numbers and geographically inconsistent matches. */
export function matchWater(source, waters) {
  if (source.permitIds.length > 1) return undefined
  const byPermit = waters.filter((w) => source.permitIds.includes(w.permitId))
  if (byPermit.length) {
    if (byPermit.length !== 1) return undefined
    const water = byPermit[0]
    if (source.lat != null && distanceKm(source, water) > 5) return undefined
    return { water, method: 'permit' }
  }
  // An explicit but unknown permit ID must not be overridden by a name guess.
  if (source.permitIds.length || source.lat == null) return undefined
  const name = normalizedName(source.name)
  const nearby = waters.filter(
    (w) =>
      distanceKm(source, w) <= 0.75 &&
      [w.name, w.name.split(',')[0]].some((n) => normalizedName(n) === name)
  )
  return nearby.length === 1
    ? { water: nearby[0], method: 'name-location' }
    : undefined
}
