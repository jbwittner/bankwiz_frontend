import { blue, red } from '@mui/material/colors'
import { ThemeOptions, createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true
  }
}

export const theme = () => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700]
      },
      secondary: {
        main: '#f50057'
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained'
        },
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: '10px'
          }
        }
      }
    }
  }

  const themes = createTheme(themeOptions)

  return themes
}

export default theme
