import { UserServiceApi } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useUserServiceApi = () => {
  const getConfiguration = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = await getConfiguration()
    return new UserServiceApi(configuration)
  }

  const checkRegistration = async () => {
    const apiInstance = await getApiInstance()
    return apiInstance.checkRegistration()
  }

  const getCurrentUserInfo = async () => {
    const apiInstance = await getApiInstance()
    return apiInstance.getCurrentUserInfo()
  }

  return {
    checkRegistration,
    getCurrentUserInfo
  }
}

export { useUserServiceApi }
