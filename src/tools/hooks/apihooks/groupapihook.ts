import {
  GroupApi,
  GroupCreationRequest,
  GroupDTO
} from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'
import { useState } from 'react'

const useGroupGetGroups = () => {
  const getConfiguration = useApiConfiguration()
  const [groupsDTO, setGroupsDTO] = useState<GroupDTO[] | null>(null)

  const getGroups = async () => {
    const configuration = await getConfiguration()
    const groupApi = new GroupApi(configuration)
    const groupsData = await groupApi.getGroups()
    setGroupsDTO(groupsData)
  }

  return {
    groupsDTO,
    getGroups
  }
}

const useCreateGroup = () => {
  const getConfiguration = useApiConfiguration()
  const [groupDTO, setGroupDTO] = useState<GroupDTO | null>(null)

  const createGroup = async (groupCreationRequest: GroupCreationRequest) => {
    const configuration = await getConfiguration()
    const groupApi = new GroupApi(configuration)
    const groupDTO = await groupApi.createGroup({ groupCreationRequest })
    setGroupDTO(groupDTO)
  }

  return {
    groupDTO,
    createGroup
  }
}

const useDeleteGroup = () => {
  const getConfiguration = useApiConfiguration()

  const deleteGroup = async (groupId: number) => {
    const configuration = await getConfiguration()
    const groupApi = new GroupApi(configuration)
    await groupApi.deleteGroup({ groupId })
  }

  return {
    deleteGroup
  }
}

export { useGroupGetGroups, useCreateGroup, useDeleteGroup }
