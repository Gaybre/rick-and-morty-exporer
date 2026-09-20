import { act, renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'
vi.useFakeTimers()

const DELAY = 500

it('should return initial searchValue', () => {
  const searchValue = ''
  const { result } = renderHook(() => useDebounce(searchValue, DELAY))
  expect(result.current).toBe('')
})

it('should not update searchValue before delay', () => {
  let searchValue = ''
  const { result, rerender } = renderHook(() => useDebounce(searchValue, DELAY))

  searchValue = 'rick'
  rerender(() => useDebounce(searchValue, DELAY))

  act(() => vi.advanceTimersByTime(DELAY - 1))
  expect(result.current).toBe('')
})

it('should update searchValue right after reach delay', () => {
  let searchValue = 'r'
  const { result, rerender } = renderHook(() => useDebounce(searchValue, DELAY))

  searchValue = 'rick'
  rerender(() => useDebounce(searchValue, DELAY))

  act(() => vi.advanceTimersByTime(DELAY - 1))
  expect(result.current).toBe('r')
  act(() => vi.advanceTimersByTime(1))
  expect(result.current).toBe('rick')
})

it('should not update searchValue if delay is restarted', () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, DELAY),
    { initialProps: { value: '' } },
  )

  rerender({ value: 'r' })
  act(() => vi.advanceTimersByTime(DELAY - 1))
  expect(result.current).toBe('')

  rerender({ value: 'ri' })
  act(() => vi.advanceTimersByTime(DELAY - 1))
  expect(result.current).toBe('')

  rerender({ value: 'ric' })
  act(() => vi.advanceTimersByTime(DELAY - 1))
  expect(result.current).toBe('')

  rerender({ value: 'rick' })
  act(() => vi.advanceTimersByTime(DELAY - 1))
  expect(result.current).toBe('')
  act(() => vi.advanceTimersByTime(1))
  expect(result.current).toBe('rick')
})
