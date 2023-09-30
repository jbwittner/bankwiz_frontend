import { useGroupGetGroups } from '@/tools/hooks/apihooks/groupapihook'
import { useUserGetCurrentUserInfo } from '@/tools/hooks/apihooks/userapihook'
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import GroupCreationDialog from './components/GroupCreationDialog'
import { GroupeLine } from './components/GroupLine'

const fabSx = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
}

export const GroupsPage: React.FC = () => {
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
  const { groupsDTO, getGroups } = useGroupGetGroups()
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()

  useEffect(() => {
    getGroups()
    getCurrentUserInfo()
  }, [])

  const onCloseModalCreation = () => {
    getGroups()
    setModalCreateIsOpen(false)
  }

  return (
    <React.Fragment>
      <GroupCreationDialog open={modalCreateIsOpen} onValid={onCloseModalCreation} onCancel={() => setModalCreateIsOpen(false)} />
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '800px',
          marginRight: 'auto',
          marginLeft: 'auto',
          marginTop: '8px'
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
          <TableBody>{groupsDTO && userDTO && groupsDTO.map(group => <GroupeLine key={group.groupId} groupDTO={group} userDTO={userDTO} />)}</TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" sx={fabSx} onClick={() => setModalCreateIsOpen(true)}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}
