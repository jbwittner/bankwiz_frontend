import { UserServiceApi } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useUserServiceApi = () => {
  const {getConfiguration, getAuthorizationHeader} = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = getConfiguration()
    return new UserServiceApi(configuration)
  }

  const checkRegistration = async () => {
    const apiInstance = await getApiInstance()
    const headers = await getAuthorizationHeader();
    return apiInstance.checkRegistration({headers})
  }

  const getCurrentUserInfo = async () => {
    const apiInstance = await getApiInstance()
    const headers = await getAuthorizationHeader();
    return apiInstance.getCurrentUserInfo({headers})
  }

  return {
    checkRegistration,
    getCurrentUserInfo
  }
}

export { useUserServiceApi }
