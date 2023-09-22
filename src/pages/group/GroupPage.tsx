import {
  useDeleteGroup,
  useGroupGetGroups
} from '@/tools/hooks/apihooks/groupapihook'
import { useUserGetCurrentUserInfo } from '@/tools/hooks/apihooks/userapihook'
import {
  Fab,
  IconButton,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import {
  GroupAuthorizationEnum,
  GroupDTO,
  UserDTO
} from '@jbwittner/bankwiz_openapi-client-fetch'
import DeleteIcon from '@mui/icons-material/Delete'
import { red } from '@mui/material/colors'
import ValidationDialog from '@/components/dialog/ValidationDialog'
import GroupIcon from '@mui/icons-material/Group'
import GroupDialog from './components/GroupDialog'

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
}

const deleteIconSx: SxProps<Theme> = {
  color: red[700],
  ':disabled': { color: red[200] }
}

const groupLine = (
  groupDTO: GroupDTO,
  userDTO: UserDTO,
  openDialogDelete: (groupDTO: GroupDTO) => void
) => {
  const authorization = groupDTO.users.find(
    userGroupDto => userGroupDto.user.userId === userDTO.userId
  )?.authorization

  const isAdmin = authorization === GroupAuthorizationEnum.Admin

  return (
    <TableRow key={groupDTO.groupId}>
      <TableCell>{groupDTO.groupId}</TableCell>
      <TableCell align="center">{groupDTO.groupName}</TableCell>
      <TableCell align="center">{groupDTO.users.length}</TableCell>
      <TableCell align="center">
        {
          groupDTO.users.find(
            userGroupDto => userGroupDto.user.userId === userDTO.userId
          )?.authorization
        }
      </TableCell>
      <TableCell align="center">
        <IconButton
          aria-label="delete"
          size="small"
          disabled={!isAdmin}
          sx={deleteIconSx}
          onClick={() => openDialogDelete(groupDTO)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <GroupIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export function GroupPage() {
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  const [deleteGroupDTO, setDeleteGroupDTO] = useState<GroupDTO>()
  const { groupsDTO, getGroups } = useGroupGetGroups()
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()
  const { deleteGroup } = useDeleteGroup()

  useEffect(() => {
    getGroups()
    getCurrentUserInfo()
  }, [])

  const onClickDelete = (groupDTO: GroupDTO) => {
    setDeleteGroupDTO(groupDTO)
    setModalDeleteIsOpen(true)
  }

  const onCloseModalCreation = () => {
    getGroups()
    setModalCreateIsOpen(false)
  }

  const onCloseModalDelete = () => {
    setModalDeleteIsOpen(false)
  }

  const onValidDelete = async () => {
    setModalDeleteIsOpen(false)
    if (deleteGroupDTO) {
      await deleteGroup(deleteGroupDTO.groupId)
    }
    await getGroups()
  }

  return (
    <React.Fragment>
      <GroupDialog open={modalCreateIsOpen} onClose={onCloseModalCreation} />
      <ValidationDialog
        titleDialog={'Deletion confirmation'}
        textDialog={'You will delete the group ' + deleteGroupDTO?.groupName}
        open={modalDeleteIsOpen}
        onCancel={onCloseModalDelete}
        onValid={onValidDelete}
      />
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '800px',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginTop: '0'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group ID</TableCell>
              <TableCell align="center">Group name</TableCell>
              <TableCell align="center">User count</TableCell>
              <TableCell align="center">User right</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupsDTO &&
              userDTO &&
              groupsDTO.map(group => groupLine(group, userDTO, onClickDelete))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color="primary"
        aria-label="add"
        sx={style}
        onClick={() => setModalCreateIsOpen(true)}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}
