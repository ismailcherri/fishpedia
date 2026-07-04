import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { allFish } from '../data/fish'
import type { FishCategory } from '../data/types'
import { getStatus, type CatchStatus } from '../lib/season'
import { usePrefs } from '../lib/prefs'
import { FishCard } from '../components/FishCard'

export const Route = createFileRoute('/')({
  component: HomePage,
})

type StatusFilter = 'all' | 'open' | 'closed' | 'protected'

const CATEGORY_ORDER: FishCategory[] = [
  'predator',
  'cyprinid',
  'salmonid',
  'protected',
]

const categoryKey = {
  predator: 'categoryPredator',
  cyprinid: 'categoryCyprinid',
  salmonid: 'categorySalmonid',
  protected: 'categoryProtected',
} as const

function matchesStatus(
  status: CatchStatus,
  filter: StatusFilter,
): boolean {
  if (filter === 'all') return true
  if (filter === 'open') return status === 'open' || status === 'unregulated'
  return status === filter
}

function HomePage() {
  const { region, lang, now, t } = usePrefs()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<StatusFilter>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allFish.filter((fish) => {
      if (q) {
        const haystack =
          `${fish.names.de} ${fish.names.en} ${fish.names.scientific}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      if (filter !== 'all') {
        if (!now) return true
        return matchesStatus(getStatus(fish.regulations[region], now), filter)
      }
      return true
    })
  }, [query, filter, region, now])

  const filters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: t('filterAll') },
    { value: 'open', label: t('filterOpen') },
    { value: 'closed', label: t('filterClosed') },
    { value: 'protected', label: t('filterProtected') },
  ]

  return (
    <div>
      <div className="mb-4 space-y-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full rounded-xl border border-water-200 bg-white px-4 py-2.5 text-base shadow-sm outline-none focus:border-water-500 focus:ring-2 focus:ring-water-300 dark:border-water-700 dark:bg-water-900 dark:focus:ring-water-600"
          aria-label={t('searchPlaceholder')}
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                filter === f.value
                  ? 'bg-water-600 text-white'
                  : 'bg-water-100 text-water-800 hover:bg-water-200 dark:bg-water-900 dark:text-water-100 dark:hover:bg-water-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-500 dark:text-slate-400">
          {t('noResults')}
        </p>
      )}

      {CATEGORY_ORDER.map((cat) => {
        const fishes = filtered.filter((f) => f.category === cat)
        if (fishes.length === 0) return null
        return (
          <section key={cat} className="mb-6">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-water-600 dark:text-water-300">
              {t(categoryKey[cat])}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {fishes.map((fish) => (
                <FishCard key={fish.id} fish={fish} />
              ))}
            </div>
          </section>
        )
      })}

      {/* screen-reader/crawler hint: language of content is mixed de/en */}
      <span className="sr-only" lang={lang === 'de' ? 'de' : 'en'} />
    </div>
  )
}
