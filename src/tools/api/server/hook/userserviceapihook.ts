import { useApiConfiguration } from './configurationapihooks'

const useUserServiceApi = () => {
  const {userServiceApi, getAuthorizationHeader} = useApiConfiguration()

  const checkRegistration = async () => {
    const headers = await getAuthorizationHeader();
    return userServiceApi.checkRegistration({headers})
  }

  const getCurrentUserInfo = async () => {
    const headers = await getAuthorizationHeader();
    return userServiceApi.getCurrentUserInfo({headers})
  }

  return {
    checkRegistration,
    getCurrentUserInfo
  }
}

export { useUserServiceApi }
