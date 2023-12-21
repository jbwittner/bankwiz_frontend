import { useApiConfiguration } from './configurationapihooks'

const useUserServiceApi = () => {
  const { userServiceApi, getAuthorizationJsonHeader } = useApiConfiguration()

  const checkRegistration = async () => {
    const headers = await getAuthorizationJsonHeader()
    return userServiceApi.checkRegistration({ headers })
  }

  const getCurrentUserInfo = async () => {
    const headers = await getAuthorizationJsonHeader()
    return userServiceApi.getCurrentUserInfo({ headers })
  }

  return {
    checkRegistration,
    getCurrentUserInfo
  }
}

export { useUserServiceApi }
