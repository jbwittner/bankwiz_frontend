import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/index.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './tools/router/router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      redirect_uri: window.location.origin
    }}
  >
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Auth0Provider>
)
