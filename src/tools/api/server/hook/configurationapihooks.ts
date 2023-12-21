import { useAuth0 } from '@auth0/auth0-react'
import {
  BankAccountServiceApi,
  Configuration,
  FunctionalExceptionDTO,
  GroupServiceApi,
  Middleware,
  ResponseContext,
  UserServiceApi
} from '@jbwittner/bankwiz_openapi-client-fetch'
import { toast } from 'react-toastify'

const useApiConfiguration = () => {
  const { getAccessTokenSilently } = useAuth0()
  const configuration = new Configuration({
    basePath: import.meta.env.VITE_SERVER_URL,
    middleware: [customMiddleware]
  })

  const bankAccountServiceApi: BankAccountServiceApi = new BankAccountServiceApi(configuration)
  const groupServiceApi: GroupServiceApi = new GroupServiceApi(configuration)
  const userServiceApi: UserServiceApi = new UserServiceApi(configuration)

  const getAuthorizationJsonHeader = async (): Promise<HeadersInit> => {
    const token = await getAccessTokenSilently()
    return { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
  }

  return { bankAccountServiceApi, groupServiceApi, userServiceApi, getAuthorizationJsonHeader }
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
