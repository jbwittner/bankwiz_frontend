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
import { GroupPage } from '@/pages/GroupPage'
import { ApplicationLayout } from '@/components/layout/ApplicationLayout'

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

const ApplicationLayoutWithAuthentication =
  withAuthenticationRequired(ApplicationLayout)
const HomePageWithAuthentication = withAuthenticationRequired(HomePage)
const GroupPageWithAuthentication = withAuthenticationRequired(GroupPage)

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ApplicationLayoutWithAuthentication />}>
        <Route path="/home" element={<HomePageWithAuthentication />} />
        <Route path="/group" element={<GroupPageWithAuthentication />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export { Auth0ProviderWithRedirectCallback, AppRoute }
