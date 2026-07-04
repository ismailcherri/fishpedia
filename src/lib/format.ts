import type { Lang } from '../data/types'

const EN_MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

/** "10-16" -> "16.10." (de) / "16 Oct" (en) */
export function formatMmDd(mmdd: string, lang: Lang): string {
    const [mm = '', dd = ''] = mmdd.split('-')
    const m = Number(mm)
    const d = Number(dd)
    if (lang === 'de') return `${d}.${m}.`
    return `${d} ${EN_MONTHS[m - 1] ?? mm}`
}

export function formatDate(date: Date, lang: Lang): string {
    return date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
        day: 'numeric',
        month: lang === 'de' ? 'numeric' : 'short',
    })
}

export function formatSeason(
    season: { from: string; to: string },
    lang: Lang
): string {
    return `${formatMmDd(season.from, lang)} – ${formatMmDd(season.to, lang)}`
}
