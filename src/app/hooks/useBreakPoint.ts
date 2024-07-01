import { Breakpoint, useMediaQuery, useTheme } from '@mui/material'

export const useBreakPoint = (breakpoint: Breakpoint) => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.up(breakpoint))
}
