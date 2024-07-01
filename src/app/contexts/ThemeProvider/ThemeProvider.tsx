import { ThemeProvider as MUIThemeProvider } from '@mui/material'
import { getTheme } from 'app/themes'
import { useState } from 'react'
import { ThemeMode } from 'shared/types'
import { ThemeContext } from './ThemeContext'

//@ts-ignore
export const ThemeProvider = ({ children, initialAppTheme }) => {
  // State to hold selected theme
  const [themeName, _setThemeName] = useState<ThemeMode>(initialAppTheme)

  // Retrieve theme object by theme name
  const theme = getTheme(themeName)

  // Wrap setThemeName to store new theme names as cookie.
  const setThemeName = (name: ThemeMode) => {
    _setThemeName(name)
  }

  const contextValue = {
    appTheme: themeName,
    setTheme: setThemeName,
  }
  return (
    //@ts-ignore
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
