import { AppState, Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react'
import { Outlet, useNavigate } from 'react-router-dom'

export const Auth0ProviderWithRedirectCallback = (props: Auth0ProviderOptions) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo ?? window.location.pathname)
  }

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      <Outlet />
    </Auth0Provider>
  )
}
