import GroupDialog from '@/components/Modal'
import { useGroupGetGroups } from '@/tools/hooks/apihooks/groupapihook'
import { useUserGetCurrentUserInfo } from '@/tools/hooks/apihooks/userapihook'
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
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
              <TableCell align="right">Group name</TableCell>
              <TableCell align="right">User count</TableCell>
              <TableCell align="right">User right</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupsDTO &&
              userDTO &&
              groupsDTO.map(group => (
                <TableRow key={group.groupId}>
                  <TableCell component="th" scope="row">
                    {group.groupId}
                  </TableCell>
                  <TableCell align="right">{group.groupName}</TableCell>
                  <TableCell align="right">{group.users.length}</TableCell>
                  <TableCell align="right">
                    {
                      group.users.find(
                        userGroupDto =>
                          userGroupDto.user.userId === userDTO.userId
                      )?.authorization
                    }
                  </TableCell>
                </TableRow>
              ))}
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
