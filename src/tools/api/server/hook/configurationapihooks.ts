import { useAuth0 } from '@auth0/auth0-react'
import { Configuration } from '@jbwittner/bankwiz_openapi-client-fetch'

const useApiConfiguration = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getConfiguration = async (): Promise<Configuration> => {
    const token = await getAccessTokenSilently()
    return new Configuration({
      basePath: import.meta.env.VITE_SERVER_URL,
      accessToken: 'Bearer ' + token
    })
  }

  return getConfiguration
}

export { useApiConfiguration }
