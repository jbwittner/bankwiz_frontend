import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute, Auth0ProviderWithRedirectCallback } from './tools/router.tsx'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './tools/theme.ts'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import React from 'react'

console.log("main")

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
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

    <ThemeProvider theme={theme}>
      <AppRoute />
    </ThemeProvider>
  </React.Fragment>
)
