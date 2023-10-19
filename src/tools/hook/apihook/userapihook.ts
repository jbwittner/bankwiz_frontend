import { UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useUserApi } from './configurationapihooks'
import { useState } from 'react'

const useUserCheckRegistration = () => {
  const getApiInstance = useUserApi()

  const checkRegistration = async () => {
    const userApi = await getApiInstance()
    return userApi.checkRegistration()
  }

  return {
    checkRegistration
  }
}

const useUserGetCurrentUserInfo = () => {
  const getApiInstance = useUserApi()
  const [userDTO, setUserDTO] = useState<UserDTO | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const getCurrentUserInfo = async () => {
    try {
      const userApi = await getApiInstance()
      const userData = await userApi.getCurrentUserInfo()
      setUserDTO(userData)
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    userDTO,
    getCurrentUserInfo,
    error
  }
}

export { useUserCheckRegistration, useUserGetCurrentUserInfo }