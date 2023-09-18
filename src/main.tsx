import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute, Auth0ProviderWithRedirectCallback } from './tools/router.tsx'

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
