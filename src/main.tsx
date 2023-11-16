import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme/index.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './tools/router/router.tsx'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  </Auth0Provider>
)
