import { AddUserGroupRequest, GroupCreationRequest, GroupDTO, UpdateUserGroupRequest } from '@jbwittner/bankwiz_openapi-client-fetch'
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

const useGroupCreateGroup = () => {
  const getApiInstance = useGroupApi()
  const [groupDTO, setGroupDTO] = useState<GroupDTO | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const createGroup = async (groupCreationRequest: GroupCreationRequest) => {
    try {
      const groupApi = await getApiInstance()
      const group = await groupApi.createGroup({ groupCreationRequest })
      setGroupDTO(group)
    } catch (err) {
      displayErrorToast('useGroupCreateGroup')
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

const useGroupDeleteGroup = () => {
  const getApiInstance = useGroupApi()
  const [error, setError] = useState<Error | null>(null)

  const deleteGroup = async (groupId: number) => {
    try {
      const groupApi = await getApiInstance()
      await groupApi.deleteGroup({ groupId })
    } catch (err) {
      displayErrorToast('useGroupDeleteGroup')
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

const useGroupRemoveUserFromGroup = () => {
  const getApiInstance = useGroupApi()
  const [error, setError] = useState<Error | null>(null)

  const removeUserFromGroup = async (groupId: number, userId: number) => {
    try {
      const groupApi = await getApiInstance()
      await groupApi.removeUserFromGroup({ groupId, userId })
    } catch (err) {
      displayErrorToast('useGroupRemoveUserFromGroup')
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

const useGroupGetGroup = () => {
  const getApiInstance = useGroupApi()
  const [error, setError] = useState<Error | null>(null)
  const [groupDTO, setGroupDTO] = useState<GroupDTO | null>(null)

  const getGroup = async (groupId: number) => {
    try {
      const groupApi = await getApiInstance()
      const group = await groupApi.getGroup({ groupId })
      setGroupDTO(group)
    } catch (err) {
      displayErrorToast('useGroupGetGroup')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    groupDTO,
    getGroup,
    error
  }
}

const useGroupUpdateUserInGroup = () => {
  const getApiInstance = useGroupApi()
  const [error, setError] = useState<Error | null>(null)
  const [groupDTO, setGroupDTO] = useState<GroupDTO | null>(null)

  const updateUserInGroup = async (groupId: number, userId: number, updateUserGroupRequest: UpdateUserGroupRequest) => {
    try {
      const groupApi = await getApiInstance()
      const group = await groupApi.updateUserInGroup({
        groupId,
        userId,
        updateUserGroupRequest
      })
      setGroupDTO(group)
    } catch (err) {
      displayErrorToast('useGroupGetGroup')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    groupDTO,
    updateUserInGroup,
    error
  }
}

const useGroupAddUserToGroup = () => {
  const getApiInstance = useGroupApi()
  const [error, setError] = useState<Error | null>(null)
  const [groupDTO, setGroupDTO] = useState<GroupDTO | null>(null)

  const addUserToGroup = async (groupId: number, addUserGroupRequest: AddUserGroupRequest) => {
    try {
      const groupApi = await getApiInstance()
      const group = await groupApi.addUserToGroup({
        groupId,
        addUserGroupRequest
      })
      setGroupDTO(group)
    } catch (err) {
      displayErrorToast('useGroupAddUserToGroup')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    groupDTO,
    addUserToGroup,
    error
  }
}

export {
  useGroupGetGroups,
  useGroupCreateGroup,
  useGroupDeleteGroup,
  useGroupRemoveUserFromGroup,
  useGroupGetGroup,
  useGroupUpdateUserInGroup,
  useGroupAddUserToGroup
}
