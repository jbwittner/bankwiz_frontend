import { PropsWithChildren } from 'react'
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
  withAuthenticationRequired
} from '@auth0/auth0-react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import App from '@/pages/App'
import Users from '@/pages/Test'

const UsersPageWithAuthentication = withAuthenticationRequired(Users)

const Auth0ProviderWithRedirectCallback = ({
  children,
  ...props
}: PropsWithChildren<Auth0ProviderOptions>) => {
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

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/toto" element={<div>toto</div>} />
      <Route path="/users/:userId" element={<UsersPageWithAuthentication />} />
    </Routes>
  )
}

export { Auth0ProviderWithRedirectCallback, AppRoute }
