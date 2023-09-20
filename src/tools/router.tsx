import { PropsWithChildren } from 'react'
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
  withAuthenticationRequired
} from '@auth0/auth0-react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import { HomePage } from '@/pages/HomePage'

const Auth0ProviderWithRedirectCallback = ({
  children,
  ...props
}: PropsWithChildren<Auth0ProviderOptions>) => {
  console.log(props)

  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo ?? window.location.pathname)
  }

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  )
}

const HomePageWithAuthentication = withAuthenticationRequired(HomePage)

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePageWithAuthentication />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export { Auth0ProviderWithRedirectCallback, AppRoute }
