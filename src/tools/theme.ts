import { ThemeOptions, createTheme } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
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
