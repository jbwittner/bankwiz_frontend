import { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions
} from '@auth0/auth0-react'
import { BrowserRouter, useNavigate, Routes, Route } from 'react-router-dom'

const Auth0ProviderWithRedirectCallback = ({
  children,
  ...props
}: PropsWithChildren<Auth0ProviderOptions>) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname)
  }

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  )
}

const AppRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<div>Toto</div>} />
      </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Auth0ProviderWithRedirectCallback
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AppRoute />
    </Auth0ProviderWithRedirectCallback>
  </BrowserRouter>
)
