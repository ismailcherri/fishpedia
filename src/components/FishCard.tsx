import { Link } from '@tanstack/react-router'
import type { FishSpecies } from '../data/types'
import { fishImageUrl } from '../lib/fishImages'
import { usePrefs } from '../lib/prefs'
import { StatusBadge } from './StatusBadge'

export function FishCard({ fish }: { fish: FishSpecies }) {
    const { region, lang, t } = usePrefs()
    const rule = fish.regulations[region]

    return (
        <Link
            to="/fisch/$slug"
            params={{ slug: fish.id }}
            className="group ring-water-100 dark:bg-water-900 dark:ring-water-800 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 transition-shadow hover:shadow-md"
        >
            <div className="from-water-100 to-water-50 dark:from-water-800 dark:to-water-900 bg-gradient-to-b px-3 pt-2">
                <img
                    src={fish.image.photoUrl ?? fishImageUrl(fish.image.svg)}
                    alt={fish.names[lang]}
                    loading="lazy"
                    className="mx-auto aspect-8/5 w-full max-w-56 object-contain transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="flex grow flex-col gap-1.5 p-3">
                <div>
                    <h3 className="leading-tight font-bold">
                        {fish.names[lang]}
                    </h3>
                    <p className="text-xs text-slate-500 italic dark:text-slate-400">
                        {fish.names.scientific}
                    </p>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-1.5">
                    <StatusBadge rule={rule} compact />
                    {rule.minSizeCm !== undefined && (
                        <span className="bg-water-100 text-water-800 dark:bg-water-800 dark:text-water-100 rounded-full px-2 py-0.5 text-[11px] font-semibold">
                            {t('minSize')} {rule.minSizeCm} cm
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}
