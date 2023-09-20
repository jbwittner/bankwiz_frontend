import { UserApi, UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'
import { useState } from 'react'

const useUserCheckRegistration = () => {
  const getConfiguration = useApiConfiguration()

  const checkRegistration = async () => {
    const configuration = await getConfiguration()
    const userApi = new UserApi(configuration)
    return userApi.checkRegistration()
  }

  return {
    checkRegistration
  }
}

const useUserGetCurrentUserInfo = () => {
  const getConfiguration = useApiConfiguration()
  const [userDTO, setUserDTO] = useState<UserDTO | null>(null)

  const getCurrentUserInfo = async () => {
    const configuration = await getConfiguration()
    const userApi = new UserApi(configuration)
    const userData = await userApi.getCurrentUserInfo()
    setUserDTO(userData)
  }

  return {
    userDTO,
    getCurrentUserInfo
  }
}

export { useUserCheckRegistration, useUserGetCurrentUserInfo }
