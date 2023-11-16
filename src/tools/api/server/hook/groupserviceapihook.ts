import { AddUserGroupRequest, GroupCreationRequest, GroupServiceApi } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useGroupServiceApi = () => {
  const getConfiguration = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = await getConfiguration()
    return new GroupServiceApi(configuration)
  }

  const getUserGroups = async () => {
    const apiInstance = await getApiInstance()
    return await apiInstance.getUserGroups()
  }

  const createGroup = async (groupCreationRequest: GroupCreationRequest) => {
    const apiInstance = await getApiInstance()
    return await apiInstance.createGroup({ groupCreationRequest })
  }

  const getGroupDetails = async (groupId: string) => {
    const apiInstance = await getApiInstance()
    return await apiInstance.getGroupDetails({ id: groupId })
  }

  const addUserToGroup = async (groupId: string, addUserGroupRequest: AddUserGroupRequest) => {
    const apiInstance = await getApiInstance()
    return await apiInstance.addUserGroup({ id: groupId, addUserGroupRequest })
  }

  return {
    getUserGroups,
    createGroup,
    getGroupDetails,
    addUserToGroup
  }
}

export { useGroupServiceApi }
