import { useAuth0 } from '@auth0/auth0-react'
import { BankAccountServiceApi, Configuration, FunctionalExceptionDTO, GroupServiceApi, Middleware, ResponseContext, UserServiceApi } from '@jbwittner/bankwiz_openapi-client-fetch'
import { toast } from 'react-toastify'

const useApiConfiguration = () => {

  const { getAccessTokenSilently } = useAuth0()

  const getBankAccountServiceApi = () => {
    const configuration = getConfiguration()
    const service: BankAccountServiceApi = new BankAccountServiceApi(configuration);
    return service;
  }

  const getGroupServiceApi = () => {
    const configuration = getConfiguration()
    const service: GroupServiceApi = new GroupServiceApi(configuration);
    return service;
  }

  const getUserServiceApi = () => {
    const configuration = getConfiguration()
    const service: UserServiceApi = new UserServiceApi(configuration);
    return service;
  }

  const getAuthorizationHeader = async (): Promise<HeadersInit> => {
    const token = await getAccessTokenSilently()
    return {"Authorization": "Bearer " + token}
  }

  const getConfiguration = (): Configuration => {
    return new Configuration({
      basePath: import.meta.env.VITE_SERVER_URL,
      middleware: [customMiddleware]
    })
  }

  return {getConfiguration, getBankAccountServiceApi, getGroupServiceApi, getUserServiceApi, getAuthorizationHeader}
}

const customMiddleware: Middleware = {
  post: async (context: ResponseContext) => {
    try {
      const response = await context.response.json()
      if (response as FunctionalExceptionDTO) {
        const functionalExceptionDTO = response as FunctionalExceptionDTO
        toast.error(functionalExceptionDTO.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export { useApiConfiguration }
