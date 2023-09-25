import { useAuth0 } from '@auth0/auth0-react'
import { BankAccountApi, Configuration, GroupApi, UserApi } from '@jbwittner/bankwiz_openapi-client-fetch'
import { toast } from 'react-toastify'

const displayErrorToast = (hookName: string) => {
  const errorMessage = `An error occurred in the hook: ${hookName}`
  toast.error(errorMessage)
}

const useApiConfiguration = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getConfiguration = async (): Promise<Configuration> => {
    const token = await getAccessTokenSilently()
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

const useGroupApi = () => {
  const getConfiguration = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = await getConfiguration()
    return new GroupApi(configuration)
  }

  return getApiInstance
}

const useBankAccountApi = () => {
  const getConfiguration = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = await getConfiguration()
    return new BankAccountApi(configuration)
  }

  return getApiInstance
}

export { displayErrorToast, useApiConfiguration, useUserApi, useGroupApi, useBankAccountApi }
