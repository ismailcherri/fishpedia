import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Lang, LocalizedText, Region } from '../data/types'
import { dict, type DictKey } from '../i18n/dict'

interface Prefs {
  lang: Lang
  setLang: (l: Lang) => void
  region: Region
  setRegion: (r: Region) => void
  /** null until mounted – prerendered HTML stays date-neutral */
  now: Date | null
  t: (key: DictKey) => string
  tx: (text: LocalizedText) => string
}

const PrefsContext = createContext<Prefs | null>(null)

const LANG_KEY = 'fishpedea.lang'
const REGION_KEY = 'fishpedea.region'

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de')
  const [region, setRegionState] = useState<Region>('berlin')
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY)
    if (storedLang === 'de' || storedLang === 'en') setLangState(storedLang)
    const storedRegion = localStorage.getItem(REGION_KEY)
    if (storedRegion === 'berlin' || storedRegion === 'brandenburg') {
      setRegionState(storedRegion)
    }
    setNow(new Date())
  }, [])

  const value = useMemo<Prefs>(
    () => ({
      lang,
      setLang: (l) => {
        setLangState(l)
        localStorage.setItem(LANG_KEY, l)
      },
      region,
      setRegion: (r) => {
        setRegionState(r)
        localStorage.setItem(REGION_KEY, r)
      },
      now,
      t: (key) => dict[key][lang],
      tx: (text) => text[lang],
    }),
    [lang, region, now]
  )

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>
}

export function usePrefs(): Prefs {
  const ctx = useContext(PrefsContext)
  if (!ctx) throw new Error('usePrefs must be used inside PrefsProvider')
  return ctx
}
