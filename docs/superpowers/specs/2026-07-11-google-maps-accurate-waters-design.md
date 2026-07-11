# Google Maps migration + accurate water geometries

Date: 2026-07-11
Status: approved

## Problem

The Karte page (`src/routes/karte.tsx`) renders the permitted waters of the
DAV Berlin Angelkarte on a Leaflet/OpenStreetMap map. All 23 geometries in
`src/data/waters/berlinWaters.ts` are hand-drawn approximations that were
never verified against real map data. The owner wants (a) Google Maps as the
basemap and (b) geometries that actually match the real waters.

The permit text itself (water list and rules in `permit.ts` / water notes)
was verified against a photo of the physical Angelkarte No. 104891 on
2026-07-11 and is correct. Only the geometries are wrong.

## Design

### Basemap: Google Maps JS API

- Use `@vis.gl/react-google-maps` (Google's endorsed React library) with a
  declarative `<Map>` component. Remove `leaflet` from dependencies.
- API key read from `VITE_GOOGLE_MAPS_API_KEY` (`.env.local`, not committed).
  The key ships in the client bundle by design; it must be restricted in
  Google Cloud Console by HTTP referrer and to the Maps JavaScript API.
- If the key is missing, the map container shows a friendly localized message
  instead of a broken map; the rest of the page (permit rules, water list)
  still works.
- Feature parity with the Leaflet version: styled polylines for
  canals/rivers, filled polygons for lakes, popup (InfoWindow) with name +
  note per water, water list buttons that pan/zoom to the water, initial
  bounds fitted to all waters.

### Geometry accuracy

- Replace every hand-drawn geometry with real OpenStreetMap data fetched
  from the Overpass API **at development time** and baked into
  `berlinWaters.ts`. No runtime fetching; the app stays static.
- Canals/rivers: LineStrings clipped to the permitted section printed on the
  permit (e.g. Berlin-Spandauer Schifffahrtskanal only between Schleuse
  Plötzensee and Humboldthafen; Spree only from Einlauf Britzer Zweigkanal
  to Mühlendammschleuse).
- Lakes: outer-ring polygons, simplified to roughly 50–100 points each to
  keep the bundle small.
- The four "location unconfirmed" lakes (Kiessee, Körner See, Grabensprung,
  Bucher Teich I–II) are researched properly; genuinely ambiguous ones keep
  a warning note, resolved ones lose it.
- The `approximate` flag stays in the type but is removed from waters whose
  geometry now comes from OSM data. The file-header warning about hand-drawn
  data is replaced by a note about the data source.
- i18n: the map disclaimer stays as a legal disclaimer ("map does not replace
  the permit"), but the "borders are roughly drawn" wording is softened.

### Verification

- Render the finished map in a browser (Playwright) and visually confirm
  each water's shape sits on actual water on the basemap — per-water
  screenshots via the existing fly-to list.
- Without an API key the Google basemap cannot render; geometry verification
  then uses a throwaway OSM-tile page in the scratchpad (geometry correctness
  is independent of the basemap).

## Out of scope

- Brandenburg waters (existing "coming later" notice stays).
- Satellite/map-type toggle beyond what Google Maps shows by default.
- Any change to permit rules content.
