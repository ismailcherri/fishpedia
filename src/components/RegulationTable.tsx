import type { FishSpecies, Region, RegionRule } from '../data/types'
import { formatDate, formatSeason } from '../lib/format'
import { usePrefs } from '../lib/prefs'
import { getStatus, nextChange } from '../lib/season'
import { StatusBadge } from './StatusBadge'

function RegionRules({ region, rule }: { region: Region; rule: RegionRule }) {
    const { lang, now, t, tx, region: activeRegion } = usePrefs()
    const active = region === activeRegion
    const status = now ? getStatus(rule, now) : undefined
    const change = now ? nextChange(rule, now) : undefined

    return (
        <div
            className={`rounded-2xl p-4 ring-1 ${
                active
                    ? 'bg-water-50 ring-water-500 dark:bg-water-900 ring-2'
                    : 'ring-water-100 dark:bg-water-900/50 dark:ring-water-800 bg-white'
            }`}
        >
            <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-bold">
                    {t(
                        region === 'berlin'
                            ? 'regionBerlin'
                            : 'regionBrandenburg'
                    )}
                </h3>
                <StatusBadge rule={rule} compact />
            </div>
            <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-2">
                    <dt className="text-slate-500 dark:text-slate-400">
                        {t('minSize')}
                    </dt>
                    <dd className="font-semibold">
                        {rule.fullyProtected
                            ? '–'
                            : rule.minSizeCm !== undefined
                              ? `${rule.minSizeCm} cm`
                              : t('noMinSize')}
                    </dd>
                </div>
                <div className="flex justify-between gap-2">
                    <dt className="text-slate-500 dark:text-slate-400">
                        {t('closedSeason')}
                    </dt>
                    <dd className="text-right font-semibold">
                        {rule.fullyProtected
                            ? t('statusProtected')
                            : rule.closedSeason
                              ? formatSeason(rule.closedSeason, lang)
                              : t('none')}
                    </dd>
                </div>
                {status === 'closed' && change && (
                    <div className="flex justify-between gap-2 text-red-700 dark:text-red-300">
                        <dt>{t('reopens')}</dt>
                        <dd className="font-bold">
                            {formatDate(change, lang)}
                        </dd>
                    </div>
                )}
                {status === 'open' && rule.closedSeason && change && (
                    <div className="flex justify-between gap-2 text-emerald-700 dark:text-emerald-300">
                        <dt>{t('closesOn')}</dt>
                        <dd className="font-bold">
                            {formatDate(change, lang)}
                        </dd>
                    </div>
                )}
            </dl>
            {rule.note && (
                <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs leading-relaxed text-amber-900 dark:bg-amber-950/60 dark:text-amber-200">
                    {tx(rule.note)}
                </p>
            )}
        </div>
    )
}

export function RegulationTable({ fish }: { fish: FishSpecies }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            <RegionRules region="berlin" rule={fish.regulations.berlin} />
            <RegionRules
                region="brandenburg"
                rule={fish.regulations.brandenburg}
            />
        </div>
    )
}
