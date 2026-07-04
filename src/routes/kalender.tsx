import { Link, createFileRoute } from '@tanstack/react-router'
import { allFish } from '../data/fish'
import { usePrefs } from '../lib/prefs'
import { isInClosedSeason } from '../lib/season'

export const Route = createFileRoute('/kalender')({
    component: CalendarPage,
})

const MONTHS_DE = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

/** true when any day of the given month (1-12) lies in the closed season */
function monthTouchesSeason(
    season: { from: string; to: string },
    month: number
): boolean {
    // check the 1st, 15th and last day of the month – seasons in the
    // regulations always start/end on those boundaries or mid-month
    const probeDays = [1, 15, 28]
    return probeDays.some((day) =>
        isInClosedSeason(season, new Date(2026, month - 1, day))
    )
}

function CalendarPage() {
    const { region, lang, now, t } = usePrefs()
    const currentMonth = now ? now.getMonth() + 1 : undefined

    const regulated = allFish.filter((f) => {
        const rule = f.regulations[region]
        return rule.closedSeason || rule.fullyProtected
    })

    return (
        <div>
            <h1 className="text-xl font-extrabold">{t('calendarTitle')}</h1>
            <p className="mt-1 mb-4 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                {t('calendarHint')}
            </p>

            <div className="ring-water-100 dark:bg-water-900 dark:ring-water-800 overflow-x-auto rounded-2xl bg-white ring-1">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                    <thead>
                        <tr className="border-water-100 dark:border-water-800 border-b">
                            <th className="p-2 text-left font-bold">
                                {t(
                                    region === 'berlin'
                                        ? 'regionBerlin'
                                        : 'regionBrandenburg'
                                )}
                            </th>
                            {MONTHS_DE.map((m, i) => (
                                <th
                                    key={i}
                                    className={`w-8 p-1 text-center font-semibold ${
                                        currentMonth === i + 1
                                            ? 'text-water-700 dark:text-water-200'
                                            : 'text-slate-400'
                                    }`}
                                    aria-label={`Monat ${i + 1}`}
                                >
                                    {m}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {regulated.map((fish) => {
                            const rule = fish.regulations[region]
                            return (
                                <tr
                                    key={fish.id}
                                    className="border-water-50 dark:border-water-800/50 border-b last:border-0"
                                >
                                    <td className="p-2">
                                        <Link
                                            to="/fisch/$slug"
                                            params={{ slug: fish.id }}
                                            className="text-water-700 dark:text-water-200 font-semibold hover:underline"
                                        >
                                            {fish.names[lang]}
                                        </Link>
                                    </td>
                                    {MONTHS_DE.map((_, i) => {
                                        const month = i + 1
                                        const blocked = rule.fullyProtected
                                            ? true
                                            : rule.closedSeason
                                              ? monthTouchesSeason(
                                                    rule.closedSeason,
                                                    month
                                                )
                                              : false
                                        return (
                                            <td
                                                key={i}
                                                className="p-1 text-center"
                                            >
                                                <span
                                                    className={`mx-auto block h-5 w-5 rounded ${
                                                        blocked
                                                            ? rule.fullyProtected
                                                                ? 'bg-purple-400 dark:bg-purple-600'
                                                                : 'bg-red-400 dark:bg-red-600'
                                                            : 'bg-emerald-100 dark:bg-emerald-900/50'
                                                    } ${
                                                        currentMonth === month
                                                            ? 'ring-water-600 dark:ring-water-300 ring-2'
                                                            : ''
                                                    }`}
                                                    role="img"
                                                    aria-label={
                                                        blocked
                                                            ? t('statusClosed')
                                                            : t('statusOpen')
                                                    }
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
