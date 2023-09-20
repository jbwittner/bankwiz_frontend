import { useAuth0 } from '@auth0/auth0-react'
import {
  Configuration,
  GroupApi,
  GroupDTO,
  UserApi,
  UserDTO
} from '@jbwittner/bankwiz_openapi-client-fetch'
import { useState } from 'react'

const useUserCheckRegistration = () => {
  const { getAccessTokenSilently } = useAuth0()

  const callCheckRegistration = () => {
    return getAccessTokenSilently()
      .then(token => {
        const configuration = new Configuration({
          basePath: 'http://localhost:8080',
          accessToken: token
        })

        const userApi = new UserApi(configuration)
        return userApi.checkRegistration()
      })
      .then(user => {})
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
        const configuration = new Configuration({
          basePath: 'http://localhost:8080',
          accessToken: token
        })

        const userApi = new UserApi(configuration)
        return userApi.getCurrentUserInfo()
      })
      .then(user => {
        setUserDTO(user)
      })
  }

  return {
    userDTO,
    callGetCurrentUserInfo
  }
}

const useGroupGetGroups = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [groupsDTO, setGroupsDTO] = useState<GroupDTO[]>([])

  const getGroups = () => {
    getAccessTokenSilently()
      .then(token => {
        const configuration = new Configuration({
          basePath: 'http://localhost:8080',
          accessToken: token
        })

        const groupApi = new GroupApi(configuration)
        return groupApi.getGroups()
      })
      .then(group => {
        setGroupsDTO(group)
      })
  }

  return {
    groupsDTO,
    getGroups
  }
}

export {
  useUserCheckRegistration,
  useUserGetCurrentUserInfo,
  useGroupGetGroups
}
