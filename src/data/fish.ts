import { cyprinids } from './species/cyprinids'
import { predators } from './species/predators'
import { protectedSpecies } from './species/protectedSpecies'
import { salmonids } from './species/salmonids'
import type { FishSpecies } from './types'

export const allFish: FishSpecies[] = [
    ...predators,
    ...cyprinids,
    ...salmonids,
    ...protectedSpecies,
]

const bySlug = new Map(allFish.map((f) => [f.id, f]))

export function getFish(slug: string): FishSpecies | undefined {
    return bySlug.get(slug)
}
