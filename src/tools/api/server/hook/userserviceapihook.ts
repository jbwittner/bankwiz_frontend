import { UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useUserServiceApi } from './configurationapihooks'
import { useState } from 'react'

const useUserCheckRegistration = () => {
  const getApiInstance = useUserServiceApi()

  const checkRegistration = async () => {
    const apiInstance = await getApiInstance()
    return apiInstance.checkRegistration()
  }

  return {
    checkRegistration
  }
}

const useUserGetCurrentUserInfo = () => {
  const getApiInstance = useUserServiceApi()
  const [data, setData] = useState<UserDTO | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const getCurrentUserInfo = async () => {
    try {
      const apiInstance = await getApiInstance()
      const userData = await apiInstance.getCurrentUserInfo()
      setData(userData)
    } catch (err) {
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    data,
    getCurrentUserInfo,
    error
  }
}

export { useUserCheckRegistration, useUserGetCurrentUserInfo }
