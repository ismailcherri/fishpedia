# 🎣 Fishpedia

Mobile-first fisher companion app (PWA) for **Berlin & Brandenburg**: browse the fish
species of the local lakes and rivers, identify a catch via illustration and key
features, and check the rules at a glance — **Mindestmaß** (minimum size),
**Schonzeit** (closed season) and whether the species is currently in season,
per region and computed from today's date.

Built with [TanStack Start](https://tanstack.com/start) in static-prerender mode:
every route is emitted as static HTML at build time and hydrates into an SPA.
Works offline after the first visit (service worker) and can be installed to the
home screen.

## Development

```bash
npm install
npm run dev        # dev server
npm test           # season-logic unit tests (vitest)
npm run typecheck  # tsc --noEmit
npm run build      # static build -> dist/client (all routes prerendered)
npm run preview    # serve the production build locally
```

The app is served under the base path `/fishpedia/` (GitHub Pages project page).
Override with `BASE_PATH=/ npm run build` for root deployments.

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml` (build → upload `dist/client` → deploy).

**One-time setup:** repository _Settings → Pages → Source: “GitHub Actions”_.
The app is then live at `https://<owner>.github.io/fishpedia/`.

## Data maintenance

All content lives in typed data files — no CMS, no backend:

| What                                           | Where                                  |
| ---------------------------------------------- | -------------------------------------- |
| Species, descriptions, identification, rules   | `src/data/species/*.ts`                |
| Data “Stand” (as-of) date and official sources | `src/data/meta.ts`                     |
| Illustrations (one SVG per species)            | `src/assets/fish/*.svg`                |
| Real photos (one per species)                  | `src/assets/fish/photos/*.{jpg,png}`   |
| Photo attribution (author / licence / source)  | `src/data/photoCredits.ts` (generated) |
| UI strings (DE/EN)                             | `src/i18n/dict.ts`                     |

Regulation values are transcriptions of **Anlage 1 LFischO Berlin** and
**Anlage 1 BbgFischO** (see links in `src/data/meta.ts` and the in-app info
page). When laws change: update the values, bump `STAND` in `src/data/meta.ts`,
run `npm test`, done. Closed seasons are `MM-DD` ranges and may wrap the year
boundary (e.g. `10-16` → `04-15`); both bounds are inclusive.

### Photos

The detail page shows a real photo **alongside** the SVG illustration. Photos are
bundled locally (so the app stays offline-capable) in `src/assets/fish/photos/`,
one per species id, with attribution in the generated `src/data/photoCredits.ts`.

`node scripts/fetch-photos.mjs` (re)fetches every species' photo from
Wikipedia/Wikimedia Commons and rewrites `photoCredits.ts`; pass ids to refresh a
subset (`node scripts/fetch-photos.mjs hecht zander`). To pin a specific Commons
file for a species, add it to the `OVERRIDES` map at the top of the script. Only
freely licensed images (CC / public domain) are used; the licence and author are
shown under each photo and link back to the source.

A species may also set an explicit `image.photoUrl` / `photoAttribution` in its
data file; that URL takes precedence over the bundled photo.

### Map of permitted waters (`/karte`)

The map uses the **Google Maps JS API** via `@vis.gl/react-google-maps` and
needs an API key at build time:

```bash
echo 'VITE_GOOGLE_MAPS_API_KEY=your-key' > .env.local   # gitignored
```

Create the key in the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/credentials)
(project with billing enabled; the free tier easily covers a personal app) and
**restrict it**: HTTP referrer restriction to your deployed origin (e.g.
`https://<owner>.github.io/*`, plus `http://localhost:*/*` for development) and
API restriction to _Maps JavaScript API_ only. The key is public by design in a
client bundle — the restrictions are the protection. For the GitHub Pages
deploy, store it as the `GOOGLE_MAPS_API_KEY` repository secret (the workflow
exports it as `VITE_GOOGLE_MAPS_API_KEY`). Without a key the page still renders
permit rules and the water list, plus a hint instead of the map.

The waters of the Berlin Angelkarte live in `src/data/waters/berlinWaters.ts`
(metadata verified against the printed permit; permit conditions in
`src/data/waters/permit.ts` — no personal data there). Geometries are **real
OpenStreetMap data** (© OpenStreetMap contributors, ODbL) in the generated
`src/data/waters/geometries.ts`; permitted canal/river sections are clipped to
the limits printed on the permit. Regenerate or adjust via the manifest in
`scripts/fetch-waters.mjs`:

```bash
node scripts/fetch-waters.mjs   # re-queries Overpass, rewrites geometries.ts
```

Coordinates are `[lng, lat]`.

With the region toggle on **Brandenburg**, the map shows the ~950 waters of
the LAVB Gewässerfonds as clustered pins with a search box (data source & ©
[LAVB Gewässerkarte](https://www.lavb.de/gwsmaps); points only, no
polygons). Regenerate the generated
`src/data/waters/brandenburgWaters.ts` with:

```bash
node scripts/fetch-brandenburg.mjs
```

⚠️ The app shows guidance, not legal advice: official publications and
water-specific rules (Gewässerordnung, Erlaubnisschein) always prevail.
