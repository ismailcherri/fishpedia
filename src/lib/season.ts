import type { ClosedSeason, RegionRule } from '../data/types'

export type CatchStatus =
    | 'open' // may be caught (min size may still apply)
    | 'closed' // currently in its closed season
    | 'protected' // fully protected year-round
    | 'unregulated' // no closed season and no minimum size

/** Day-of-year style comparable key from "MM-DD" (e.g. "04-15" -> 415). */
function key(mmdd: string): number {
    const [mm, dd] = mmdd.split('-').map(Number)
    if (!mm || !dd || mm < 1 || mm > 12 || dd < 1 || dd > 31) {
        throw new Error(`Invalid MM-DD date: ${mmdd}`)
    }
    return mm * 100 + dd
}

function dateKey(date: Date): number {
    return (date.getMonth() + 1) * 100 + date.getDate()
}

/** True when `date` falls inside the closed season (inclusive bounds). */
export function isInClosedSeason(season: ClosedSeason, date: Date): boolean {
    const d = dateKey(date)
    const from = key(season.from)
    const to = key(season.to)
    if (from <= to) return d >= from && d <= to
    // wraps the year boundary, e.g. 16.10. – 15.04.
    return d >= from || d <= to
}

export function getStatus(rule: RegionRule, date: Date): CatchStatus {
    if (rule.fullyProtected) return 'protected'
    if (rule.closedSeason && isInClosedSeason(rule.closedSeason, date)) {
        return 'closed'
    }
    if (!rule.closedSeason && rule.minSizeCm === undefined) return 'unregulated'
    return 'open'
}

/**
 * The next status-change date: when closed, the first open day; when open
 * with a closed season, the first closed day. Undefined otherwise.
 */
export function nextChange(rule: RegionRule, date: Date): Date | undefined {
    if (rule.fullyProtected || !rule.closedSeason) return undefined
    const closedNow = isInClosedSeason(rule.closedSeason, date)
    // walk forward day by day (max 366) until the state flips
    const probe = new Date(date)
    for (let i = 0; i < 366; i++) {
        probe.setDate(probe.getDate() + 1)
        if (isInClosedSeason(rule.closedSeason, probe) !== closedNow)
            return probe
    }
    return undefined
}
