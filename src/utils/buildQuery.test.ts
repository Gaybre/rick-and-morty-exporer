import type { CharacterFilters } from '../types/character'
import { buildQuery } from './buildQuery'

const filters: CharacterFilters = {
  name: 'rick',
  status: 'dead',
  gender: 'male',
  species: 'robot',
  page: 5,
}

it('should return empty string if no receive parameters', () => {
  const queryParam = buildQuery({})
  expect(queryParam).toEqual('')
})

it('should query name only', () => {
  const queryParam = buildQuery({ name: filters.name })
  expect(queryParam).toEqual('name=rick')
})

it('should query name and gender', () => {
  const queryParam = buildQuery({ name: filters.name, gender: filters.gender })
  expect(queryParam).toEqual('name=rick&gender=male')
})

it('should query status, gender and species', () => {
  const queryParam = buildQuery({
    status: filters.status,
    gender: filters.gender,
    species: filters.species,
  })
  expect(queryParam).toEqual('status=dead&gender=male&species=robot')
})

it('should query all filters', () => {
  const queryParam = buildQuery(filters)
  expect(queryParam).toEqual(
    'name=rick&status=dead&gender=male&species=robot&page=5',
  )
})
