# Google Maps directions links for permitted waters

Date: 2026-07-11
Status: approved

## Problem

From the Karte page there is no quick way to navigate to a water. Each
water should offer a Google Maps directions link (from the user's current
location).

## Design

- `karte.tsx` gets a `directionsUrl(geometry)` helper building the official
  universal link `https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng>`
  (opens the Google Maps app on phones, the website on desktop). Destination
  point: middle vertex for LineStrings (always on the water), bounds center
  for polygons. Google snaps to the nearest road access.
- InfoWindow: a "🧭 Route" link under the note, `target="_blank"`.
- Water list: each row becomes a flex pair — existing fly-to button plus a
  compact 🧭 `<a>` on the right (sibling, not nested; aria-label with the
  water name).
- i18n: new key `mapDirections` (de "Route" / en "Directions").
- No data changes, no new dependencies.
