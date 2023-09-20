import { useAuth0 } from '@auth0/auth0-react'
import {
  Configuration,
  UserApi,
  UserDTO
} from '@jbwittner/bankwiz_openapi-client-fetch'
import { useState } from 'react'

const useUserCheckRegistration = () => {
  const { getAccessTokenSilently } = useAuth0()

  const callCheckRegistration = () => {
    return getAccessTokenSilently()
      .then(token => {
        console.log(token)
        const configuration = new Configuration({
          basePath: 'http://localhost:8080',
          accessToken: token
        })

        const userApi = new UserApi(configuration)
        return userApi.checkRegistration()
      })
      .then(user => {
        return user
      })
  }

  return {
    callCheckRegistration
  }
}

const useUserGetCurrentUserInfo = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [userDTO, setUserDTO] = useState<UserDTO>()

  const callGetCurrentUserInfo = () => {
    getAccessTokenSilently()
      .then(token => {
        console.log(token)
        const configuration = new Configuration({
          basePath: 'http://localhost:8080',
          accessToken: token
        })

        const userApi = new UserApi(configuration)
        return userApi.getCurrentUserInfo()
      })
      .then(user => {
        setUserDTO(user)
        return user
      })
  }

  return {
    userDTO,
    callGetCurrentUserInfo
  }
}

export { useUserCheckRegistration, useUserGetCurrentUserInfo }
