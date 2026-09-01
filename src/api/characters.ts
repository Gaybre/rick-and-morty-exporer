import type { ApiResponse, CharacterFilters } from '../types/character'
import { buildQuery } from '../utils/buildQuery'

const BASE_URL = 'https://rickandmortyapi.com/api/character'
export const ERRORS = {
  NOT_FOUND: 'NOT_FOUND',
  SOMETHING_WENT_WRONG: 'SOMETHING_WENT_WRONG',
}

export const getCharacters = async (
  filters: CharacterFilters = {},
): Promise<ApiResponse> => {
  const query = buildQuery(filters)
  const response = await fetch(query ? `${BASE_URL}?${query}` : BASE_URL)

  if (response.status === 404) {
    throw new Error(ERRORS.NOT_FOUND)
  }

  if (!response.ok) {
    throw new Error(ERRORS.SOMETHING_WENT_WRONG)
  }

  return (await response.json()) as ApiResponse
}
