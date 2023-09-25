import {
  GroupCreationRequest,
  GroupDTO
} from '@jbwittner/bankwiz_openapi-client-fetch'
import { displayErrorToast, useGroupApi } from './configurationapihooks'
import { useState } from 'react'

const useGroupGetGroups = () => {
  const getApiInstance = useGroupApi()
  const [groupsDTO, setGroupsDTO] = useState<GroupDTO[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const getGroups = async () => {
    try {
      const groupApi = await getApiInstance()
      const groupsData = await groupApi.getGroups()
      setGroupsDTO(groupsData)
    } catch (err) {
      displayErrorToast('useGroupGetGroups')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    groupsDTO,
    getGroups,
    error
  }
}

const useCreateGroup = () => {
  const getApiInstance = useGroupApi()
  const [groupDTO, setGroupDTO] = useState<GroupDTO | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const createGroup = async (groupCreationRequest: GroupCreationRequest) => {
    try {
      const groupApi = await getApiInstance()
      const group = await groupApi.createGroup({ groupCreationRequest })
      setGroupDTO(group)
    } catch (err) {
      displayErrorToast('useCreateGroup')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    groupDTO,
    createGroup,
    error
  }
}

const useDeleteGroup = () => {
  const getApiInstance = useGroupApi()
  const [error, setError] = useState<Error | null>(null)

  const deleteGroup = async (groupId: number) => {
    try {
      const groupApi = await getApiInstance()
      await groupApi.deleteGroup({ groupId })
    } catch (err) {
      displayErrorToast('useDeleteGroup')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    deleteGroup,
    error
  }
}

const useRemoveUserFromGroup = () => {
  const getApiInstance = useGroupApi()
  const [error, setError] = useState<Error | null>(null)

  const removeUserFromGroup = async (groupId: number, userId: number) => {
    try {
      const groupApi = await getApiInstance()
      await groupApi.removeUserFromGroup({ groupId, userId })
    } catch (err) {
      displayErrorToast('useDeleteGroup')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    removeUserFromGroup,
    error
  }
}

export { useGroupGetGroups, useCreateGroup, useDeleteGroup, useRemoveUserFromGroup }
