import { createFileRoute } from '@tanstack/react-router'
import {
  APIProvider,
  Map as GoogleMap,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { berlinWaters } from '../data/waters/berlinWaters'
import { permit } from '../data/waters/permit'
import type { WaterArea, WaterGeometry } from '../data/waters/types'
import { usePrefs } from '../lib/prefs'

export const Route = createFileRoute('/karte')({
  component: MapPage,
})

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

const CANAL_COLOR = '#256d84' // water-600
const LAKE_FILL = '#48a3b8' // water-400
const MAX_FOCUS_ZOOM = 15

function coordsOf(geometry: WaterGeometry): [number, number][] {
  return geometry.type === 'Polygon'
    ? geometry.coordinates.flat()
    : geometry.coordinates
}

function boundsOf(
  geometries: WaterGeometry[]
): google.maps.LatLngBoundsLiteral {
  let west = Infinity
  let south = Infinity
  let east = -Infinity
  let north = -Infinity
  for (const geometry of geometries) {
    for (const [lng, lat] of coordsOf(geometry)) {
      west = Math.min(west, lng)
      east = Math.max(east, lng)
      south = Math.min(south, lat)
      north = Math.max(north, lat)
    }
  }
  return { west, south, east, north }
}

interface Selection {
  water: WaterArea
  anchor: google.maps.LatLngLiteral
}

function MapPage() {
  const { t } = usePrefs()

  if (!API_KEY) {
    return (
      <PageFrame
        map={
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {t('mapKeyMissing')}
          </div>
        }
        onSelectWater={() => {}}
      />
    )
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <MapPageWithMap />
    </APIProvider>
  )
}

function MapPageWithMap() {
  const { lang, t } = usePrefs()
  const map = useMap()
  const [selected, setSelected] = useState<Selection | null>(null)

  function focusWater(water: WaterArea) {
    if (!map) return
    const bounds = boundsOf([water.geometry])
    map.fitBounds(bounds, 40)
    google.maps.event.addListenerOnce(map, 'idle', () => {
      if ((map.getZoom() ?? 0) > MAX_FOCUS_ZOOM) map.setZoom(MAX_FOCUS_ZOOM)
    })
    setSelected({
      water,
      anchor: {
        lat: (bounds.north + bounds.south) / 2,
        lng: (bounds.east + bounds.west) / 2,
      },
    })
  }

  const handleShapeClick = useCallback(
    (water: WaterArea, anchor: google.maps.LatLngLiteral) =>
      setSelected({ water, anchor }),
    []
  )

  return (
    <PageFrame
      map={
        <GoogleMap
          defaultBounds={boundsOf(berlinWaters.map((w) => w.geometry))}
          gestureHandling="cooperative"
          streetViewControl={false}
          fullscreenControl={false}
          mapTypeControl
        >
          {berlinWaters.map((water) => (
            <WaterShape
              key={water.id}
              water={water}
              onClick={handleShapeClick}
            />
          ))}
          {selected && (
            <InfoWindow
              position={selected.anchor}
              onCloseClick={() => setSelected(null)}
            >
              <div className="max-w-56 text-slate-800">
                <strong>{selected.water.name}</strong>
                {selected.water.note && (
                  <p className="mt-0.5 text-xs italic">
                    {selected.water.note[lang]}
                  </p>
                )}
                {selected.water.approximate && (
                  <p className="mt-0.5 text-xs text-slate-500">
                    ({t('mapApproximate')})
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      }
      onSelectWater={focusWater}
    />
  )
}

/** Draws one water as a native Google Maps polygon/polyline. */
function WaterShape({
  water,
  onClick,
}: {
  water: WaterArea
  onClick: (water: WaterArea, anchor: google.maps.LatLngLiteral) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (!map) return
    const toLatLng = ([lng, lat]: [number, number]) => ({ lat, lng })
    const dash: google.maps.IconSequence[] = [
      {
        icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2.5 },
        offset: '0',
        repeat: '14px',
      },
    ]

    const shapes: (google.maps.Polygon | google.maps.Polyline)[] = []
    if (water.geometry.type === 'Polygon') {
      const paths = water.geometry.coordinates.map((ring) => ring.map(toLatLng))
      shapes.push(
        new google.maps.Polygon({
          map,
          paths,
          strokeColor: CANAL_COLOR,
          strokeWeight: 2.5,
          strokeOpacity: water.approximate ? 0 : 1,
          fillColor: LAKE_FILL,
          fillOpacity: 0.45,
        })
      )
      if (water.approximate) {
        // polygons cannot dash their outline – overlay dashed polylines
        for (const ring of paths) {
          shapes.push(
            new google.maps.Polyline({
              map,
              path: ring,
              strokeColor: CANAL_COLOR,
              strokeOpacity: 0,
              icons: dash,
            })
          )
        }
      }
    } else {
      shapes.push(
        new google.maps.Polyline({
          map,
          path: water.geometry.coordinates.map(toLatLng),
          strokeColor: CANAL_COLOR,
          strokeWeight: 6,
          strokeOpacity: water.approximate ? 0 : 0.75,
          icons: water.approximate ? dash : undefined,
        })
      )
    }

    const listeners = shapes.map((shape) =>
      shape.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) onClick(water, e.latLng.toJSON())
      })
    )
    return () => {
      for (const l of listeners) l.remove()
      for (const s of shapes) s.setMap(null)
    }
  }, [map, water, onClick])

  return null
}

/** Shared page layout around the map container (also used without a key). */
function PageFrame({
  map,
  onSelectWater,
}: {
  map: ReactNode
  onSelectWater: (water: WaterArea) => void
}) {
  const { region, t, tx } = usePrefs()
  const containerRef = useRef<HTMLDivElement>(null)

  const canals = berlinWaters.filter((w) => w.kind !== 'lake')
  const lakes = berlinWaters.filter((w) => w.kind === 'lake')

  function selectAndScroll(water: WaterArea) {
    onSelectWater(water)
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
      >
        {map}
      </div>
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
            onSelect={selectAndScroll}
          />
          <WaterList
            title={t('mapLegendLake')}
            icon="🔵"
            waters={lakes}
            onSelect={selectAndScroll}
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
