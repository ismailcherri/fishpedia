import type { Region } from '../data/types'
import { usePrefs } from '../lib/prefs'

export function RegionToggle() {
  const { region, setRegion, t } = usePrefs()
  const options: { value: Region; label: string; short: string }[] = [
    { value: 'berlin', label: t('regionBerlin'), short: 'BE' },
    { value: 'brandenburg', label: t('regionBrandenburg'), short: 'BB' },
  ]
  return (
    <div
      role="group"
      aria-label="Region"
      className="bg-water-100 dark:bg-water-900 inline-flex rounded-full p-0.5"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setRegion(o.value)}
          aria-pressed={region === o.value}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
            region === o.value
              ? 'bg-water-600 text-white shadow-sm'
              : 'text-water-800 hover:bg-water-200 dark:text-water-100 dark:hover:bg-water-800'
          }`}
        >
          <span className="hidden sm:inline">{o.label}</span>
          <span className="sm:hidden">{o.short}</span>
        </button>
      ))}
    </div>
  )
}

export function LangToggle() {
  const { lang, setLang } = usePrefs()
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
      className="bg-water-100 text-water-800 hover:bg-water-200 dark:bg-water-900 dark:text-water-100 dark:hover:bg-water-800 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors"
      aria-label={
        lang === 'de' ? 'Switch to English' : 'Auf Deutsch umschalten'
      }
    >
      {lang === 'de' ? 'EN' : 'DE'}
    </button>
  )
}
