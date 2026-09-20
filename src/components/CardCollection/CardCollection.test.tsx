import { render } from '@testing-library/react'
import CardCollection from './CardCollection'
import { charactersMockData } from '../../test/mocks/characters'
import type { Character } from '../../types/character'

describe('CardCollection', () => {
  const setup = (characters: Character[] = []) =>
    render(<CardCollection characters={characters} />)

  it('should render an empty container', () => {
    const container = setup()
    expect(container).toBeTruthy()
    expect(container.queryAllByRole('img').length).toBe(0)
  })

  it('should render 12 CardItems inside Container', () => {
    const container = setup(charactersMockData)
    const elements = container.getAllByRole('img')
    expect(elements.length).toBe(12)
  })
})
