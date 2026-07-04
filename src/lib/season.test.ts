import { describe, expect, it } from 'vitest'
import type { RegionRule } from '../data/types'
import { getStatus, isInClosedSeason, nextChange } from './season'

const d = (iso: string) => new Date(`${iso}T12:00:00`)

describe('isInClosedSeason', () => {
    const simple = { from: '01-01', to: '04-30' } // Hecht Berlin

    it('is closed inside a non-wrapping season', () => {
        expect(isInClosedSeason(simple, d('2026-01-01'))).toBe(true)
        expect(isInClosedSeason(simple, d('2026-03-15'))).toBe(true)
        expect(isInClosedSeason(simple, d('2026-04-30'))).toBe(true)
    })

    it('is open outside a non-wrapping season', () => {
        expect(isInClosedSeason(simple, d('2026-05-01'))).toBe(false)
        expect(isInClosedSeason(simple, d('2026-12-31'))).toBe(false)
    })

    const wrapping = { from: '10-16', to: '04-15' } // Bachforelle

    it('handles seasons wrapping the year boundary', () => {
        expect(isInClosedSeason(wrapping, d('2026-10-16'))).toBe(true)
        expect(isInClosedSeason(wrapping, d('2026-12-31'))).toBe(true)
        expect(isInClosedSeason(wrapping, d('2026-01-05'))).toBe(true)
        expect(isInClosedSeason(wrapping, d('2026-04-15'))).toBe(true)
        expect(isInClosedSeason(wrapping, d('2026-04-16'))).toBe(false)
        expect(isInClosedSeason(wrapping, d('2026-10-15'))).toBe(false)
        expect(isInClosedSeason(wrapping, d('2026-07-01'))).toBe(false)
    })
})

describe('getStatus', () => {
    it('reports protected year-round species', () => {
        const rule: RegionRule = { fullyProtected: true }
        expect(getStatus(rule, d('2026-07-03'))).toBe('protected')
    })

    it('reports closed inside the season and open outside', () => {
        const zanderBerlin: RegionRule = {
            minSizeCm: 45,
            closedSeason: { from: '01-01', to: '05-31' },
        }
        expect(getStatus(zanderBerlin, d('2026-02-10'))).toBe('closed')
        expect(getStatus(zanderBerlin, d('2026-07-03'))).toBe('open')
    })

    it('reports open when only a minimum size applies', () => {
        const aal: RegionRule = { minSizeCm: 50 }
        expect(getStatus(aal, d('2026-01-15'))).toBe('open')
    })

    it('reports unregulated without any rule', () => {
        expect(getStatus({}, d('2026-01-15'))).toBe('unregulated')
    })
})

describe('nextChange', () => {
    const hechtBB: RegionRule = {
        minSizeCm: 45,
        closedSeason: { from: '02-01', to: '03-31' },
    }

    it('finds the reopening day while closed', () => {
        const next = nextChange(hechtBB, d('2026-02-15'))
        expect(next?.getMonth()).toBe(3) // April
        expect(next?.getDate()).toBe(1)
    })

    it('finds the next closing day while open', () => {
        const next = nextChange(hechtBB, d('2026-07-03'))
        expect(next?.getFullYear()).toBe(2027)
        expect(next?.getMonth()).toBe(1) // February
        expect(next?.getDate()).toBe(1)
    })

    it('returns undefined without a closed season', () => {
        expect(nextChange({ minSizeCm: 50 }, d('2026-07-03'))).toBeUndefined()
        expect(
            nextChange({ fullyProtected: true }, d('2026-07-03'))
        ).toBeUndefined()
    })
})
