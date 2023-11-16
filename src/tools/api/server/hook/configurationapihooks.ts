import { useAuth0 } from '@auth0/auth0-react'
import { Configuration, FunctionalExceptionDTO, Middleware, ResponseContext } from '@jbwittner/bankwiz_openapi-client-fetch'
import { toast } from 'react-toastify'

const useApiConfiguration = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getConfiguration = async (): Promise<Configuration> => {
    const token = await getAccessTokenSilently()
    return new Configuration({
      basePath: import.meta.env.VITE_SERVER_URL,
      accessToken: 'Bearer ' + token,
      middleware: [customMiddleware]
    })
  }

  return getConfiguration
}

const customMiddleware: Middleware = {
  post: async (context: ResponseContext) => {
    const response = await context.response.json()
    if (response as FunctionalExceptionDTO) {
      const functionalExceptionDTO = response as FunctionalExceptionDTO
      toast.error(functionalExceptionDTO.message)
    }
  }
}

export { useApiConfiguration }
