import { useAuth0 } from '@auth0/auth0-react'
import { Configuration, UserApi } from '@jbwittner/bankwiz_openapi-client-fetch'

const useApiConfiguration = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getConfiguration = async (): Promise<Configuration> => {
    const token = await getAccessTokenSilently()
    console.log(token)
    return new Configuration({
      basePath: 'http://localhost:8080',
      accessToken: token
    })
  }

  return getConfiguration
}

const useUserApi = () => {
  const getConfiguration = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = await getConfiguration()
    return new UserApi(configuration)
  }

  return getApiInstance
}

export { useApiConfiguration, useUserApi }
