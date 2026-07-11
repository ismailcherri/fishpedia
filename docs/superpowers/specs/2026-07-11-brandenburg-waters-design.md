# Brandenburg (LAVB) waters on the Karte page

Date: 2026-07-11
Status: approved

## Problem

The Karte page only covers the Berlin Angelkarte; with the region toggle on
Brandenburg it shows a "coming later" notice. The owner also holds the LAVB
Brandenburg Angelkarte, whose waters are published on the official
interactive map at https://www.lavb.de/gwsmaps.

## Findings

The LAVB map loads its pins from `https://gws.lavb.de/api/gm_all`: 944
waters with LAVB water number (`id`, e.g. "P 07-02"), full name including
the permitted section, lat/lng, size (ha), managing club (`verein`) and
restriction notes (`bemerkung`). No CORS header, so browser-side fetching
is impossible — and undesired: the app bakes data in at dev time and works
offline.

## Design

- **Data pipeline** (same pattern as Berlin): `scripts/fetch-brandenburg.mjs`
  fetches `gm_all`, cleans it (trim coordinate whitespace, drop literal
  "NULL" notes, sanity-check every point inside Brandenburg:
  lat 51.3–53.6, lng 11.2–14.8), sorts by water number and generates
  `src/data/waters/brandenburgWaters.ts` exporting
  `BrandenburgWater { id, name, lat, lng, ha?, club?, note? }[]`.
  Header credits LAVB as source with fetch date.
- **Map:** with region = Brandenburg the Google Map shows all waters as
  clustered pins (`@googlemaps/markerclusterer`). Pin click opens an
  InfoWindow with name, water number, size, club, note and the existing
  🧭 directions link.
- **Search instead of list:** a search input filters by name or water
  number; the first 30 matches render as rows (fly-to + directions) with a
  "n of 944" count. No static 944-row list.
- **Housekeeping:** the "Brandenburger Gewässer folgen später" notice is
  removed; the Berlin permit-rules card renders only for region = Berlin;
  a source line links to lavb.de/gwsmaps; the map disclaimer credits LAVB
  for Brandenburg data. Brandenburg UI lives in
  `src/components/BrandenburgWaters.tsx` to keep `karte.tsx` small.
- The Berlin experience is unchanged.

## Out of scope

- Water polygons for Brandenburg (LAVB publishes points only).
- Transcribing the Brandenburg permit's printed rules (can follow later
  from a photo of the card, like Berlin).
