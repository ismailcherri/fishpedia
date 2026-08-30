import {
  Circle,
  ControlPosition,
  MapControl,
  Marker,
  useMap,
} from '@vis.gl/react-google-maps'
import { useState } from 'react'
import type { DictKey } from '../i18n/dict'
import { usePrefs } from '../lib/prefs'

const LOCATION_ZOOM = 15

interface Position {
  lat: number
  lng: number
  accuracy: number
}

function errorKey(error: GeolocationPositionError): DictKey {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'mapLocationDenied'
    case error.POSITION_UNAVAILABLE:
      return 'mapLocationUnavailable'
    case error.TIMEOUT:
      return 'mapLocationTimeout'
    default:
      return 'mapLocationUnavailable'
  }
}

export function CurrentLocation() {
  const map = useMap()
  const { t } = usePrefs()
  const [position, setPosition] = useState<Position | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<DictKey | null>(null)

  function findLocation() {
    if (!navigator.geolocation) {
      setError('mapLocationUnsupported')
      return
    }

    setLoading(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const next = {
          lat: coords.latitude,
          lng: coords.longitude,
          accuracy: coords.accuracy,
        }
        setPosition(next)
        setLoading(false)
        map?.panTo(next)
        if ((map?.getZoom() ?? 0) < LOCATION_ZOOM) map?.setZoom(LOCATION_ZOOM)
      },
      (locationError) => {
        setLoading(false)
        setError(errorKey(locationError))
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 15_000 }
    )
  }

  const label = t(loading ? 'mapLocating' : 'mapLocation')

  return (
    <>
      {position && (
        <>
          <Circle
            center={position}
            radius={position.accuracy}
            clickable={false}
            strokeColor="#2563eb"
            strokeOpacity={0.4}
            strokeWeight={1}
            fillColor="#3b82f6"
            fillOpacity={0.14}
          />
          <Marker
            position={position}
            title={t('mapLocation')}
            zIndex={1000}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#2563eb',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 3,
            }}
          />
        </>
      )}
      <MapControl position={ControlPosition.RIGHT_BOTTOM}>
        <div className="m-3 flex max-w-64 flex-col items-end gap-2">
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-white px-3 py-2 text-xs text-slate-700 shadow-md dark:bg-slate-800 dark:text-slate-200"
            >
              {t(error)}
            </p>
          )}
          <button
            type="button"
            onClick={findLocation}
            disabled={loading}
            aria-label={label}
            title={label}
            className="text-water-700 hover:bg-water-50 focus-visible:ring-water-500 flex size-11 items-center justify-center rounded-full bg-white shadow-md transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-wait disabled:opacity-70 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={`size-6 ${loading ? 'animate-pulse' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          </button>
        </div>
      </MapControl>
    </>
  )
}
