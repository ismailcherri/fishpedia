# 🎣 Fishpidea

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

The app is served under the base path `/fishpidea/` (GitHub Pages project page).
Override with `BASE_PATH=/ npm run build` for root deployments.

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml` (build → upload `dist/client` → deploy).

**One-time setup:** repository *Settings → Pages → Source: “GitHub Actions”*.
The app is then live at `https://<owner>.github.io/fishpidea/`.

## Data maintenance

All content lives in typed data files — no CMS, no backend:

| What | Where |
| --- | --- |
| Species, descriptions, identification, rules | `src/data/species/*.ts` |
| Data “Stand” (as-of) date and official sources | `src/data/meta.ts` |
| Illustrations (one SVG per species) | `src/assets/fish/*.svg` |
| UI strings (DE/EN) | `src/i18n/dict.ts` |

Regulation values are transcriptions of **Anlage 1 LFischO Berlin** and
**Anlage 1 BbgFischO** (see links in `src/data/meta.ts` and the in-app info
page). When laws change: update the values, bump `STAND` in `src/data/meta.ts`,
run `npm test`, done. Closed seasons are `MM-DD` ranges and may wrap the year
boundary (e.g. `10-16` → `04-15`); both bounds are inclusive.

Each species has an optional `image.photoUrl` / `photoAttribution` slot — add a
real photo URL there and it is shown instead of the SVG illustration.

⚠️ The app shows guidance, not legal advice: official publications and
water-specific rules (Gewässerordnung, Erlaubnisschein) always prevail.
