
import { createAuth0 } from '@auth0/auth0-vue'

const auth0 =   createAuth0({
    domain: import.meta.env.VITE_DOMAIN_AUTH0,
    clientId: import.meta.env.VITE_CLIENT_ID_AUTH0,
    authorizationParams: {
      audience: import.meta.env.VITE_AUDIENCE_AUTH0,
      redirect_uri: window.location.origin,
    },
  })

export default auth0
