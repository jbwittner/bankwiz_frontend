import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute, Auth0ProviderWithRedirectCallback } from './tools/router.tsx'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './tools/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth0ProviderWithRedirectCallback
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin
      }}
    >
      <ThemeProvider theme={theme}>
        <AppRoute />
      </ThemeProvider>
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>
)
