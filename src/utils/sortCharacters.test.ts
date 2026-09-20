import { sortCharacters } from './sortCharacters'
import type { Character } from '../types/character'

const mockData: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
  },
  {
    id: 2,
    name: 'Morty Smith',
  },
  {
    id: 3,
    name: 'Summer Smith',
  },
  {
    id: 4,
    name: 'Beth Smith',
  },
  {
    id: 5,
    name: 'Jerry Smith',
  },
] as Character[]

it('should sort by name A-Z', () => {
  const sortedAtoZ = sortCharacters(mockData, 'name a-z')
  expect(sortedAtoZ.map((character) => character.name)).toEqual([
    'Beth Smith',
    'Jerry Smith',
    'Morty Smith',
    'Rick Sanchez',
    'Summer Smith',
  ])
})

it('should sort by name Z-A', () => {
  const sortedZtoA = sortCharacters(mockData, 'name z-a')
  expect(sortedZtoA.map((character) => character.name)).toEqual([
    'Summer Smith',
    'Rick Sanchez',
    'Morty Smith',
    'Jerry Smith',
    'Beth Smith',
  ])
})

it('should not mutate the original array', () => {
  const original = [...mockData]
  sortCharacters(mockData, 'name a-z')
  expect(mockData).toEqual(original)
})
