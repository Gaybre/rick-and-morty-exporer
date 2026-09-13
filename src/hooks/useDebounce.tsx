import { useState, useEffect } from 'react'

export const useDebounce = <T,>(searchParam: T, delay: number): T => {
  const [searchDebounceParam, setSearchDebounceParam] = useState<T>(searchParam)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounceParam(searchParam)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [searchParam, delay])

  return searchDebounceParam
}
