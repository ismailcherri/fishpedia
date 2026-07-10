import { createFileRoute } from '@tanstack/react-router'
import type { LatLngBoundsExpression, Layer, Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import { berlinWaters } from '../data/waters/berlinWaters'
import { permit } from '../data/waters/permit'
import type { WaterArea } from '../data/waters/types'
import { usePrefs } from '../lib/prefs'

export const Route = createFileRoute('/karte')({
  component: MapPage,
})

const CANAL_COLOR = '#256d84' // water-600
const LAKE_FILL = '#48a3b8' // water-400

function toLatLngs(coords: [number, number][]): [number, number][] {
  return coords.map(([lng, lat]) => [lat, lng])
}

function MapPage() {
  const { lang, region, t, tx } = usePrefs()
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const layersRef = useRef(
    new Map<string, Layer & { getBounds: () => LatLngBoundsExpression }>()
  )

  useEffect(() => {
    let cancelled = false

    async function initMap() {
      const L = await import('leaflet')
      const container = containerRef.current
      if (cancelled || !container) return

      const map = L.map(container, { scrollWheelZoom: false })
      mapRef.current = map

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      const group = L.featureGroup()

      for (const water of berlinWaters) {
        const layer =
          water.geometry.type === 'Polygon'
            ? L.polygon(
                water.geometry.coordinates.map(toLatLngs) as [
                  number,
                  number,
                ][][],
                {
                  color: CANAL_COLOR,
                  weight: 2.5,
                  fillColor: LAKE_FILL,
                  fillOpacity: 0.45,
                  dashArray: water.approximate ? '6 4' : undefined,
                }
              )
            : L.polyline(toLatLngs(water.geometry.coordinates), {
                color: CANAL_COLOR,
                weight: 7,
                opacity: 0.75,
                lineCap: 'round',
                dashArray: water.approximate ? '10 8' : undefined,
              })

        const note = water.note ? `<br><em>${water.note[lang]}</em>` : ''
        const approx = water.approximate
          ? `<br><small>(${t('mapApproximate')})</small>`
          : ''
        layer.bindPopup(`<strong>${water.name}</strong>${note}${approx}`)
        layer.addTo(group)
        layersRef.current.set(water.id, layer)
      }

      group.addTo(map)
      map.fitBounds(group.getBounds().pad(0.06))
    }

    initMap()

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      layersRef.current.clear()
    }
  }, [lang, t])

  function focusWater(water: WaterArea) {
    const map = mapRef.current
    const layer = layersRef.current.get(water.id)
    if (!map || !layer) return
    map.flyToBounds(layer.getBounds(), { maxZoom: 14, duration: 0.6 })
    if ('openPopup' in layer) (layer as { openPopup: () => void }).openPopup()
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const canals = berlinWaters.filter((w) => w.kind !== 'lake')
  const lakes = berlinWaters.filter((w) => w.kind === 'lake')

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-extrabold">{t('mapTitle')}</h1>
      <p className="mt-1 mb-3 text-sm text-slate-500 dark:text-slate-400">
        {t('mapIntro')}
      </p>

      {region === 'brandenburg' && (
        <p className="mb-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950/60 dark:text-amber-200 dark:ring-amber-900">
          {t('mapBrandenburgSoon')}
        </p>
      )}

      <details className="ring-water-100 dark:bg-water-900 dark:ring-water-800 mb-3 rounded-2xl bg-white ring-1 open:pb-3">
        <summary className="cursor-pointer p-4 font-bold select-none">
          🪪 {tx(permit.title)}
        </summary>
        <div className="px-4">
          <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
            {tx(permit.subtitle)}
          </p>
          <ul className="space-y-1.5 text-sm leading-relaxed">
            {permit.rules.map((rule, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-water-500 mt-0.5">
                  ◆
                </span>
                <span>{tx(rule)}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <div
        ref={containerRef}
        className="bg-water-100 ring-water-200 dark:bg-water-900 dark:ring-water-800 z-0 h-[55dvh] min-h-72 w-full overflow-hidden rounded-2xl ring-1"
        aria-label={t('mapTitle')}
      />
      <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {t('mapDisclaimer')}
      </p>

      <section className="mt-4">
        <h2 className="text-lg font-bold">{t('mapWaters')}</h2>
        <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
          {t('mapZoomHint')}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <WaterList
            title={t('mapLegendCanal')}
            icon="〰️"
            waters={canals}
            onSelect={focusWater}
          />
          <WaterList
            title={t('mapLegendLake')}
            icon="🔵"
            waters={lakes}
            onSelect={focusWater}
          />
        </div>
      </section>
    </div>
  )
}

function WaterList({
  title,
  icon,
  waters,
  onSelect,
}: {
  title: string
  icon: string
  waters: WaterArea[]
  onSelect: (w: WaterArea) => void
}) {
  const { tx, t } = usePrefs()
  return (
    <div className="ring-water-100 dark:bg-water-900 dark:ring-water-800 rounded-2xl bg-white p-3 ring-1">
      <h3 className="text-water-600 dark:text-water-300 mb-1.5 px-1 text-sm font-bold tracking-wide uppercase">
        <span aria-hidden>{icon}</span> {title}
      </h3>
      <ul>
        {waters.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              onClick={() => onSelect(w)}
              className="hover:bg-water-50 dark:hover:bg-water-800 w-full rounded-lg px-2 py-1.5 text-left text-sm transition-colors"
            >
              <span className="font-semibold">{w.name}</span>
              {w.note && (
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  {tx(w.note)}
                </span>
              )}
              {w.approximate && !w.note && (
                <span className="block text-xs text-slate-400 dark:text-slate-500">
                  {t('mapApproximate')}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
