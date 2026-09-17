import { describe, expect, it } from 'vitest'
import {
  cleanText,
  matchWater,
  parseDirectory,
  parseWater,
} from './fisch-hitparade.mjs'

const url = 'https://www.fisch-hitparade.de/gewaesser/testsee/'
const property = (title, content) =>
  `<h6 class="property-title card-title">${title}</h6><div class="property-content card-text">${content}</div>`
const fixture = `<h1>Testsee &amp; Ufer</h1>
${property('Fischbestand', '<a href="https://www.fisch-hitparade.de/service/fischlexikon/hecht/">Hecht</a>')}
${property('Untergrund', '<ul><li>sandig</li><li>schlammig</li></ul>')}
<input id="size" value="79.00"><input id="maximum_depth" value="12.5"><input id="average_depth" value="">
<div class="body_content"><p>Gewässernummer C 01-117.</p></div>
<div class="forum">B 01-101 <a href="https://www.fisch-hitparade.de/service/fischlexikon/aal/">Aal</a></div>
<script>const markersGroup = ${JSON.stringify({ fishing_shops: [{ coordinates: { lat: 1, lng: 2 } }], waters: [{ url, coordinates: { lat: '51.4431', lng: '13.2337' } }] })};</script>`

describe('FHP extraction', () => {
  it('only reads water cards, not categories, from the directory', () => {
    expect(
      parseDirectory(
        `<a href="https://www.fisch-hitparade.de/gewaesser/see/">See</a><a href="${url}"><h5>Testsee</h5></a><a href="/gewaesser/liste/page/150/">150</a>`
      )
    ).toEqual({ entries: [{ url, name: 'Testsee' }], pages: 150 })
  })
  it('extracts factual fields without mixing in forum species or shop coordinates', () => {
    expect(parseWater(fixture, url)).toEqual({
      name: 'Testsee & Ufer',
      url,
      species: [{ slug: 'hecht', name: 'Hecht' }],
      substrate: ['sandig', 'schlammig'],
      areaHa: 79,
      averageDepthM: undefined,
      maxDepthM: 12.5,
      permitIds: ['C 01-117'],
      lat: 51.4431,
      lng: 13.2337,
    })
  })
  it('fails on changed markup instead of silently publishing empty data', () => {
    expect(() => parseWater('<h1>Blocked</h1>', url)).toThrow(
      'No water properties'
    )
    expect(() => parseDirectory('<h1>Blocked</h1>')).toThrow('no water cards')
  })
  it('decodes numeric and German entities', () => {
    expect(cleanText('Wei&szlig;er&nbsp;See &#38; &#xE4;')).toBe(
      'Weißer See & ä'
    )
  })
})

describe('conservative matching', () => {
  const water = {
    id: 'C 01-117',
    permitId: 'C 01-117',
    name: 'Testsee, Mühlberg',
    lat: 51.443,
    lng: 13.234,
  }
  const source = {
    name: 'Testsee',
    permitIds: ['C 01-117'],
    lat: 51.4431,
    lng: 13.2337,
  }
  it('matches an official number even when names differ', () => {
    expect(matchWater({ ...source, name: 'Ostsee' }, [water])?.method).toBe(
      'permit'
    )
  })
  it('rejects duplicate numbers, multiple numbers and distant coordinates', () => {
    expect(
      matchWater(source, [water, { ...water, id: 'C 01-117 (2)' }])
    ).toBeUndefined()
    expect(
      matchWater({ ...source, permitIds: ['C 01-117', 'C 01-118'] }, [water])
    ).toBeUndefined()
    expect(matchWater({ ...source, lat: 53 }, [water])).toBeUndefined()
  })
  it('requires a unique nearby name if no number exists', () => {
    expect(matchWater({ ...source, permitIds: [] }, [water])?.method).toBe(
      'name-location'
    )
    expect(
      matchWater({ ...source, permitIds: [], lat: 53 }, [water])
    ).toBeUndefined()
    expect(
      matchWater({ name: source.name, permitIds: [] }, [water])
    ).toBeUndefined()
    expect(
      matchWater({ ...source, permitIds: [] }, [
        water,
        { ...water, id: 'other' },
      ])
    ).toBeUndefined()
  })
  it('never uses a name to override a conflicting official number', () => {
    expect(
      matchWater({ ...source, permitIds: ['C 01-118'] }, [water])
    ).toBeUndefined()
  })
})
