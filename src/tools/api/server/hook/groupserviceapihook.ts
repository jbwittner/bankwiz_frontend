import { AddUserGroupRequest, GroupCreationRequest } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useGroupServiceApi = () => {
  const { groupServiceApi, getAuthorizationHeader } = useApiConfiguration()

  const getUserGroups = async () => {
    const headers = await getAuthorizationHeader()
    return await groupServiceApi.getUserGroups({ headers })
  }

  const createGroup = async (groupCreationRequest: GroupCreationRequest) => {
    const headers = await getAuthorizationHeader()
    return await groupServiceApi.createGroup({ groupCreationRequest }, { headers })
  }

  const getGroupDetails = async (groupId: string) => {
    const headers = await getAuthorizationHeader()
    return await groupServiceApi.getGroupDetails({ id: groupId }, { headers })
  }

  const addUserToGroup = async (groupId: string, addUserGroupRequest: AddUserGroupRequest) => {
    const headers = await getAuthorizationHeader()
    return await groupServiceApi.addUserGroup({ groupId, addUserGroupRequest }, { headers })
  }

  const deleteUserFromGroup = async (groupId: string, userId: string) => {
    const headers = await getAuthorizationHeader()
    await groupServiceApi.deleteUserFromGroup({ groupId, userId }, { headers })
  }

  const deleteGroup = async (groupId: string) => {
    const headers = await getAuthorizationHeader()
    await groupServiceApi.deleteGroup({ id: groupId }, { headers })
  }

  return {
    getUserGroups,
    createGroup,
    getGroupDetails,
    addUserToGroup,
    deleteUserFromGroup,
    deleteGroup
  }
}

export { useGroupServiceApi }
