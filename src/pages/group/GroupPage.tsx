import {
  useDeleteGroup,
  useGroupGetGroups
} from '@/tools/hooks/apihooks/groupapihook'
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
import { GroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import ValidationDialog from '@/components/dialog/ValidationDialog'
import GroupDialog from './components/GroupDialog'
import { groupLine } from './components/GroupLine'

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
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
