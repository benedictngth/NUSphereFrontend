import { ThemeOptions } from '@mui/material/styles'

export const lightTheme: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 2400,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#53836b',
      light: '#40577f',
      dark: '#011638',
    },
    secondary: {
      main: '#f36725',
    },
    text: {
      primary: '#000000',
    },
    background: {
      paper: '#f3f3f3',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    h2: {
      fontWeight: 400,
    },
    h1: {
      fontWeight: 400,
    },
  },
  spacing: 8,
}
