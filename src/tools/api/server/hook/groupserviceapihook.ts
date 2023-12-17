import { AddUserGroupRequest, GroupCreationRequest, GroupServiceApi } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useGroupServiceApi = () => {
  const {getConfiguration, getAuthorizationHeader} = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = getConfiguration()
    return new GroupServiceApi(configuration)
  }

  const getUserGroups = async () => {
    const apiInstance = await getApiInstance()
    return await apiInstance.getUserGroups()
  }

  const createGroup = async (groupCreationRequest: GroupCreationRequest) => {
    const apiInstance = await getApiInstance()
    const headers = await getAuthorizationHeader();
    return await apiInstance.createGroup({ groupCreationRequest }, {headers})
  }

  const getGroupDetails = async (groupId: string) => {
    const apiInstance = await getApiInstance()
    const headers = await getAuthorizationHeader();
    return await apiInstance.getGroupDetails({ id: groupId }, {headers})
  }

  const addUserToGroup = async (groupId: string, addUserGroupRequest: AddUserGroupRequest) => {
    const apiInstance = await getApiInstance()
    const headers = await getAuthorizationHeader();
    return await apiInstance.addUserGroup({ groupId, addUserGroupRequest }, {headers})
  }

  const deleteUserFromGroup = async (groupId: string, userId: string) => {
    const apiInstance = await getApiInstance()
    const headers = await getAuthorizationHeader();
    await apiInstance.deleteUserFromGroup({ groupId, userId }, {headers})
  }

  const deleteGroup = async (groupId: string) => {
    const apiInstance = await getApiInstance()
    const headers = await getAuthorizationHeader();
    await apiInstance.deleteGroup({ id: groupId }, {headers})
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
