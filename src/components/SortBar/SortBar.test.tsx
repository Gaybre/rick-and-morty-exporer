import { act, fireEvent, render } from '@testing-library/react'
import SortBar from './SortBar'

const setSortValue = vi.fn()
const setup = () =>
  render(
    <SortBar
      totals={10}
      loading={false}
      sortValue={''}
      setSortValue={setSortValue}
    />,
  )

describe('SortBar', () => {
  it('should render UI elements', () => {
    const sortBar = setup()
    const results = sortBar.getByRole('paragraph')
    const select = sortBar.getByRole('combobox', { name: 'Sort by' })

    expect(results).toBeTruthy()
    expect(results.textContent).toBe('Total results: 10')

    expect(select).toBeTruthy()
    expect(select.textContent).toBe('Sort by')
  })

  it('should call setSortValue after select option', () => {
    const sortBar = setup()
    const select = sortBar.getByRole('combobox', { name: 'Sort by' })

    act(() => fireEvent.mouseDown(select))
    const sortAtoZ = sortBar.getByRole('option', { name: /name a-z/i })
    act(() => fireEvent.click(sortAtoZ))

    expect(setSortValue).toHaveBeenCalledOnce()
    expect(setSortValue).toHaveBeenCalledWith('name a-z')
  })
})
