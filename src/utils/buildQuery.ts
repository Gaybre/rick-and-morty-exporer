import type { CharacterFilters } from "../types/character"

export const buildQuery = (filters: CharacterFilters): string => {
  const params = new URLSearchParams()

  if (filters.name) params.append("name", filters.name)
  if (filters.status) params.append("status", filters.status)
  if (filters.gender) params.append("gender", filters.gender)
  if (filters.species) params.append("species", filters.species)
  if (filters.page) params.append("page", String(filters.page))

  return params.toString()
}
