export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown'
  origin: LocationReference
  location: LocationReference
  image: string
  url: string
}

export interface LocationReference {
  name: string
  url: string
}

export interface ApiResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}

export interface CharacterFilters {
  name?: string
  status?: 'alive' | 'dead' | 'unknown'
  gender?: 'male' | 'female' | 'genderless' | 'unknown'
  species?: string
  page?: number
}
