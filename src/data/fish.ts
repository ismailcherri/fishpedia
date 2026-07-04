import type { FishSpecies } from './types'
import { predators } from './species/predators'
import { cyprinids } from './species/cyprinids'
import { salmonids } from './species/salmonids'
import { protectedSpecies } from './species/protectedSpecies'

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
