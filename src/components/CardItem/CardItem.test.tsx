import { render } from '@testing-library/react'
import CardItem from './CardItem'
import { charactersMockData } from '../../test/mocks/characters'

describe('CardItem', () => {
  it('should display image, status, name, specie, gender and origin accurately', () => {
    const cardItem = render(<CardItem character={charactersMockData[0]} />)

    expect(cardItem.getByRole('img').getAttribute('alt')).toBe(
      'this is Rick Sanchez',
    )
    expect(cardItem.getByText('Alive')).toBeTruthy()
    expect(cardItem.getByText('Rick Sanchez')).toBeTruthy()
    expect(cardItem.getByText('Human')).toBeTruthy()
    expect(cardItem.getByText('Male')).toBeTruthy()
    expect(cardItem.getByText('Earth (C-137)')).toBeTruthy()
  })
})
