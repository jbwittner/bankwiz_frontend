import GroupDialog from '@/components/Modal'
import { useGroupGetGroups } from '@/tools/hooks/apihooks/groupapihook'
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

const groupLine = (groupDTO: GroupDTO, userDTO: UserDTO) => {
  const authorization = groupDTO.users.find(
    userGroupDto => userGroupDto.user.userId === userDTO.userId
  )?.authorization

  const isAdmin = authorization === GroupAuthorizationEnum.Admin

  return (
    <TableRow key={groupDTO.groupId}>
      <TableCell component="th" scope="row">
        {groupDTO.groupId}
      </TableCell>
      <TableCell align="right">{groupDTO.groupName}</TableCell>
      <TableCell align="right">{groupDTO.users.length}</TableCell>
      <TableCell align="right">
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
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export function GroupPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { groupsDTO, getGroups } = useGroupGetGroups()
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()

  useEffect(() => {
    getGroups()
    getCurrentUserInfo()
  }, [])

  const onCloseModal = () => {
    getGroups()
    setModalIsOpen(false)
  }

  return (
    <React.Fragment>
      <GroupDialog open={modalIsOpen} onClose={onCloseModal} />
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
              groupsDTO.map(group => groupLine(group, userDTO))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color="primary"
        aria-label="add"
        sx={style}
        onClick={() => setModalIsOpen(true)}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}
