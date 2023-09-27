import { ThemeOptions, createTheme } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
  typography: {
    h1: {
      fontSize: '60px'
    },
    h2: {
      fontSize: '48px'
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#673ab7'
    },
    secondary: {
      main: '#89b73a'
    }
  }
}

const theme = createTheme(themeOptions)

export { themeOptions, theme }
