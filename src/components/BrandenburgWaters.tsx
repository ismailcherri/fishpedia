import type { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  APIProvider,
  Map as GoogleMap,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps'
import type { ReactElement, ReactNode, RefObject } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { BrandenburgWater } from '../data/waters/brandenburgWaters'
import { brandenburgWaters } from '../data/waters/brandenburgWaters'
import { directionsUrl } from '../lib/maps'
import { usePrefs } from '../lib/prefs'

const MAX_RESULTS = 30
const FOCUS_ZOOM = 13

const allBounds: google.maps.LatLngBoundsLiteral = (() => {
  let west = Infinity
  let south = Infinity
  let east = -Infinity
  let north = -Infinity
  for (const w of brandenburgWaters) {
    west = Math.min(west, w.lng)
    east = Math.max(east, w.lng)
    south = Math.min(south, w.lat)
    north = Math.max(north, w.lat)
  }
  return { west, south, east, north }
})()

export function BrandenburgPage({ apiKey }: { apiKey: string | undefined }) {
  const { t } = usePrefs()
  const containerRef = useRef<HTMLDivElement>(null)

  const body = (content: ReactNode) => (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-extrabold">{t('mapTitleBb')}</h1>
      <p className="mt-1 mb-3 text-sm text-slate-500 dark:text-slate-400">
        {t('mapIntroBb')}
      </p>
      {content}
    </div>
  )

  if (!apiKey) {
    return body(
      <>
        <MapContainer containerRef={containerRef}>
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-slate-400">
            {t('mapKeyMissing')}
          </div>
        </MapContainer>
        <Footnotes />
        <WaterSearch onSelect={() => {}} />
      </>
    )
  }

  return (
    <APIProvider apiKey={apiKey}>
      <BrandenburgWithMap containerRef={containerRef} body={body} />
    </APIProvider>
  )
}

function BrandenburgWithMap({
  containerRef,
  body,
}: {
  containerRef: RefObject<HTMLDivElement | null>
  body: (content: ReactNode) => ReactElement
}) {
  const map = useMap()
  const [selected, setSelected] = useState<BrandenburgWater | null>(null)

  function focusWater(water: BrandenburgWater) {
    setSelected(water)
    if (map) {
      map.panTo({ lat: water.lat, lng: water.lng })
      if ((map.getZoom() ?? 0) < FOCUS_ZOOM) map.setZoom(FOCUS_ZOOM)
    }
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return body(
    <>
      <MapContainer containerRef={containerRef}>
        <GoogleMap
          defaultBounds={allBounds}
          gestureHandling="cooperative"
          streetViewControl={false}
          fullscreenControl={false}
          mapTypeControl
        >
          <ClusteredPins onSelect={setSelected} />
          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <WaterDetails water={selected} />
            </InfoWindow>
          )}
        </GoogleMap>
      </MapContainer>
      <Footnotes />
      <WaterSearch onSelect={focusWater} />
    </>
  )
}

function MapContainer({
  containerRef,
  children,
}: {
  containerRef: RefObject<HTMLDivElement | null>
  children: ReactNode
}) {
  const { t } = usePrefs()
  return (
    <div
      ref={containerRef}
      className="bg-water-100 ring-water-200 dark:bg-water-900 dark:ring-water-800 z-0 h-[55dvh] min-h-72 w-full overflow-hidden rounded-2xl ring-1"
      aria-label={t('mapTitleBb')}
    >
      {children}
    </div>
  )
}

function Footnotes() {
  const { t } = usePrefs()
  return (
    <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
      {t('mapDisclaimerBb')}{' '}
      <a
        href="https://www.lavb.de/gwsmaps"
        target="_blank"
        rel="noreferrer"
        className="text-water-600 dark:text-water-300 font-semibold"
      >
        {t('mapSourceLavb')}
      </a>
    </p>
  )
}

/** All 944 waters as clustered markers (classic Marker + MarkerClusterer). */
function ClusteredPins({
  onSelect,
}: {
  onSelect: (water: BrandenburgWater) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (!map) return
    let cancelled = false
    let clusterer: MarkerClusterer | undefined

    // dynamic import: the package is CJS and must not run during SSR
    import('@googlemaps/markerclusterer').then(({ MarkerClusterer }) => {
      if (cancelled) return
      const markers = brandenburgWaters.map((water) => {
        const marker = new google.maps.Marker({
          position: { lat: water.lat, lng: water.lng },
          title: `${water.id} ${water.name}`,
        })
        marker.addListener('click', () => onSelect(water))
        return marker
      })
      clusterer = new MarkerClusterer({ map, markers })
    })

    return () => {
      cancelled = true
      clusterer?.clearMarkers()
      clusterer?.setMap(null)
    }
  }, [map, onSelect])

  return null
}

function WaterDetails({ water }: { water: BrandenburgWater }) {
  const { t } = usePrefs()
  const facts = [water.id, water.ha ? `${water.ha} ha` : null, water.club]
    .filter(Boolean)
    .join(' · ')
  return (
    <div className="max-w-64 text-slate-800">
      <strong>{water.name}</strong>
      <p className="mt-0.5 text-xs text-slate-500">{facts}</p>
      {water.note && <p className="mt-0.5 text-xs italic">{water.note}</p>}
      <a
        href={directionsUrl(water.lat, water.lng)}
        target="_blank"
        rel="noreferrer"
        className="text-water-600 mt-1 inline-block text-xs font-semibold"
      >
        🧭 {t('mapDirections')}
      </a>
    </div>
  )
}

function WaterSearch({
  onSelect,
}: {
  onSelect: (water: BrandenburgWater) => void
}) {
  const { t } = usePrefs()
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return brandenburgWaters.filter(
      (w) => w.name.toLowerCase().includes(q) || w.id.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <section className="mt-4">
      <h2 className="text-lg font-bold">{t('mapWaters')}</h2>
      <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
        {t('mapSearchHintBb')}
      </p>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('mapSearchPlaceholderBb')}
        className="ring-water-200 focus:ring-water-500 dark:bg-water-900 dark:ring-water-800 w-full rounded-xl bg-white px-4 py-2.5 text-sm ring-1 outline-none focus:ring-2"
      />
      {query.trim().length >= 2 && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {matches.length} / {brandenburgWaters.length} {t('mapWaters')}
        </p>
      )}
      <ul className="ring-water-100 dark:bg-water-900 dark:ring-water-800 mt-2 rounded-2xl bg-white ring-1 empty:hidden">
        {matches.slice(0, MAX_RESULTS).map((w) => (
          <li key={w.id} className="flex items-start gap-1 px-1 py-0.5">
            <button
              type="button"
              onClick={() => onSelect(w)}
              className="hover:bg-water-50 dark:hover:bg-water-800 min-w-0 flex-1 rounded-lg px-2 py-1.5 text-left text-sm transition-colors"
            >
              <span className="font-semibold">{w.name}</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                {[w.id, w.ha ? `${w.ha} ha` : null, w.club]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            </button>
            <a
              href={directionsUrl(w.lat, w.lng)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t('mapDirections')}: ${w.name}`}
              title={t('mapDirections')}
              className="hover:bg-water-50 dark:hover:bg-water-800 mt-1 shrink-0 rounded-lg px-2 py-1.5 text-sm transition-colors"
            >
              🧭
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
