import { createContext, useContext, useState, useEffect } from 'react'
import admiralBoom from './admiral-boom/theme'
import judyHopps from './judy-hopps/theme'

const THEMES = {
  'admiral-boom': admiralBoom,
  'judy-hopps': judyHopps,
}

function applyTheme(theme) {
  Object.entries(theme.cssVars).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  )
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('admiral-boom')

  useEffect(() => {
    applyTheme(THEMES[themeId])
  }, [themeId])

  return (
    <ThemeContext.Provider value={{ themeId, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
