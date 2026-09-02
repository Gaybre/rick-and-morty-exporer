import type { Character, CharacterSort } from '../types/character'

export const sortCharacters = (
  characters: Character[],
  sortType: CharacterSort,
) => {
  switch (sortType) {
    case 'name a-z':
      return [...characters].sort((a, b) => a.name.localeCompare(b.name))
    case 'name z-a':
      return [...characters].sort((a, b) => b.name.localeCompare(a.name))
    default:
      return characters
  }
}
