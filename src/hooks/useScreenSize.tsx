import { useEffect, useState } from 'react'

const TABLET_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024

type ScreenSize = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

const getScreenSize = (): ScreenSize => {
  const width = window.innerWidth
  return {
    isMobile: width < TABLET_BREAKPOINT,
    isTablet: width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT,
    isDesktop: width >= DESKTOP_BREAKPOINT,
  }
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize)

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize())
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return screenSize
}
