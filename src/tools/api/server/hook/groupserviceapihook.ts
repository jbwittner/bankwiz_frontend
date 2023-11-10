import { GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useGroupServiceApi } from './configurationapihooks'
import { useState } from 'react'

const useGroupGetUserGroups = () => {
  const getApiInstance = useGroupServiceApi()
  const [data, setData] = useState<GroupIndexDTO[]>([])
  const [error, setError] = useState<Error | null>(null)

  const getUserGroups = async () => {
    try {
      const apiInstance = await getApiInstance()
      const userData = await apiInstance.getUserGroups()
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
    getUserGroups,
    error
  }
}

export { useGroupGetUserGroups }
