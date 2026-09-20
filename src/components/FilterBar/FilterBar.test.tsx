import { act, fireEvent, render } from '@testing-library/react'
import { useScreenSize } from '../../hooks/useScreenSize'
import FilterBar from './FilterBar'

vi.useFakeTimers()
vi.mock('../../hooks/useScreenSize')
const refresh = vi.fn()

const setup = () => render(<FilterBar loading={false} refresh={refresh} />)

describe('FilterBar UI', () => {
  it('should render mobile components', () => {
    vi.mocked(useScreenSize).mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    })
    const filterBar = setup()

    const textBox = filterBar.getByRole('textbox')
    expect(textBox).toBeTruthy()
    expect(textBox.id).toBe('Search character-input')

    const deleteButton = filterBar.getAllByRole('button')
    expect(deleteButton.length).toBe(1)
    expect(deleteButton[0].getAttribute('aria-label')).toBe('Delete')
    expect(deleteButton[0].textContent).toBeFalsy()

    const filterCounter = filterBar.getByTestId('appliedFilters')
    expect(filterCounter).toBeTruthy()
    expect(filterCounter.textContent).toBeFalsy()

    const selectInputs = filterBar.queryAllByRole('combobox')
    expect(selectInputs.length).toBe(3)
    expect(selectInputs[0].id).toBe('Status-select')
    expect(selectInputs[1].id).toBe('Gender-select')
    expect(selectInputs[2].id).toBe('Species-select')
  })

  it('should render tablet components', () => {
    vi.mocked(useScreenSize).mockReturnValue({
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    })
    const filterBar = setup()

    const textBox = filterBar.getByRole('textbox')
    expect(textBox).toBeTruthy()
    expect(textBox.id).toBe('Search character-input')

    const selectInputs = filterBar.queryAllByRole('combobox')
    expect(selectInputs.length).toBe(3)
    expect(selectInputs[0].id).toBe('Status-select')
    expect(selectInputs[1].id).toBe('Gender-select')
    expect(selectInputs[2].id).toBe('Species-select')

    const deleteButton = filterBar.getAllByRole('button')
    expect(deleteButton.length).toBe(1)
    expect(deleteButton[0].getAttribute('aria-label')).toBe('Delete')
    expect(deleteButton[0].textContent).toBeFalsy()

    const filterCounter = filterBar.getByTestId('appliedFilters')
    expect(filterCounter).toBeTruthy()
    expect(filterCounter.textContent).toBeFalsy()
  })

  it('should render desktop components', () => {
    vi.mocked(useScreenSize).mockReturnValue({
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    })
    const filterBar = setup()

    const textBox = filterBar.getByRole('textbox')
    expect(textBox).toBeTruthy()
    expect(textBox.id).toBe('Search character-input')

    const selectInputs = filterBar.queryAllByRole('combobox')
    expect(selectInputs.length).toBe(3)
    expect(selectInputs[0].id).toBe('Status-select')
    expect(selectInputs[1].id).toBe('Gender-select')
    expect(selectInputs[2].id).toBe('Species-select')

    const deleteButton = filterBar.getAllByRole('button')
    expect(deleteButton.length).toBe(1)
    expect(deleteButton[0].textContent).toBeTruthy()
    expect(deleteButton[0].textContent.toLowerCase()).toBe('clear filters')

    const filterCounter = filterBar.getByTestId('appliedFilters-desktop')
    expect(filterCounter).toBeTruthy()
    expect(filterCounter.textContent).toBe('0 FILTERS')
  })
})

describe('FilterBar functionality', () => {
  vi.mocked(useScreenSize).mockReturnValue({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })

  it('should not call search-refresh before the debounce ends', () => {
    const filterBar = setup()
    refresh.mockClear()
    const textBox = filterBar.getByRole('textbox')

    fireEvent.change(textBox, { target: { value: 'r' } })
    act(() => vi.advanceTimersByTime(499))
    expect(refresh).not.toHaveBeenCalled()

    fireEvent.change(textBox, { target: { value: 'rick' } })
    act(() => vi.advanceTimersByTime(499))
    expect(refresh).not.toHaveBeenCalled()
  })

  it('should call refresh only once and only with last value after the debounce ends', () => {
    const filterBar = setup()
    refresh.mockClear()
    const textBox = filterBar.getByRole('textbox')

    fireEvent.change(textBox, { target: { value: 'r' } })
    act(() => vi.advanceTimersByTime(499))
    fireEvent.change(textBox, { target: { value: 'ri' } })
    act(() => vi.advanceTimersByTime(499))
    fireEvent.change(textBox, { target: { value: 'rick' } })
    act(() => vi.advanceTimersByTime(500))

    expect(refresh).toHaveBeenCalledOnce()
    expect(refresh).toHaveBeenCalledWith({
      gender: '',
      name: 'rick',
      species: '',
      status: '',
    })
  })

  it('should call refresh once after filter by Status', () => {
    const filterBar = setup()
    refresh.mockClear()

    const statusSelect = filterBar.getByRole('combobox', { name: 'Status' })
    act(() => fireEvent.mouseDown(statusSelect))
    const deadOption = filterBar.getByRole('option', { name: 'Dead' })
    act(() => fireEvent.click(deadOption))

    expect(refresh).toHaveBeenCalledOnce()
    expect(refresh).toHaveBeenCalledWith({
      gender: '',
      name: '',
      species: '',
      status: 'dead',
    })
  })

  it('should call refresh once after filter by Gender', () => {
    const filterBar = setup()
    refresh.mockClear()

    const genderSelect = filterBar.getByRole('combobox', { name: 'Gender' })
    act(() => fireEvent.mouseDown(genderSelect))
    const genderOption = filterBar.getByRole('option', { name: 'Female' })
    act(() => fireEvent.click(genderOption))

    expect(refresh).toHaveBeenCalledOnce()
    expect(refresh).toHaveBeenCalledWith({
      gender: 'female',
      name: '',
      species: '',
      status: '',
    })
  })

  it('should call refresh once after filter by Species', () => {
    const filterBar = setup()
    refresh.mockClear()

    const speciesSelect = filterBar.getByRole('combobox', { name: 'Species' })
    act(() => fireEvent.mouseDown(speciesSelect))
    const speciesOption = filterBar.getByRole('option', { name: 'Robot' })
    act(() => fireEvent.click(speciesOption))

    expect(refresh).toHaveBeenCalledOnce()
    expect(refresh).toHaveBeenCalledWith({
      gender: '',
      name: '',
      species: 'robot',
      status: '',
    })
  })

  it('should clear filters, filter count, and call refresh without params', () => {
    const filterBar = setup()
    const clearFiltersButton = filterBar.getByRole('button')
    const filterCounter = filterBar.getByTestId('appliedFilters-desktop')

    const textBox = filterBar.getByRole('textbox')
    act(() => fireEvent.change(textBox, { target: { value: 'rick' } }))
    const statusSelect = filterBar.getByRole('combobox', { name: 'Status' })
    act(() => fireEvent.mouseDown(statusSelect))
    const aliveOption = filterBar.getByRole('option', { name: 'Alive' })
    act(() => fireEvent.click(aliveOption))
    expect(filterCounter.textContent).toBe('2 FILTERS')

    refresh.mockClear()
    act(() => fireEvent.click(clearFiltersButton))
    expect(refresh).toHaveBeenCalledOnce()
    expect(refresh).toHaveBeenCalledWith({
      gender: '',
      name: '',
      species: '',
      status: '',
    })
    expect(filterCounter.textContent).toBe('0 FILTERS')
  })
})
