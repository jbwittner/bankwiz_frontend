import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute, Auth0ProviderWithRedirectCallback } from './tools/router.tsx'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './tools/theme.ts'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
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
