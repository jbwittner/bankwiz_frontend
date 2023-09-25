import { useGroupDeleteGroup, useGroupGetGroups } from '@/tools/hooks/apihooks/groupapihook'
import { useUserGetCurrentUserInfo } from '@/tools/hooks/apihooks/userapihook'
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { GroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import ValidationDialog from '@/components/dialog/ValidationDialog'
import GroupCreationDialog from './components/GroupCreationDialog'
import { groupLine } from './components/GroupLine'
import useConfirmationModal from '@/tools/hooks/component/modalhook'
import GroupUsersDialog from './components/GroupUsersDialog'

const fabSx = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
}

export function GroupPage() {
  const {
    isOpen: isGroupDeletionModalOpen,
    data: groupToDelete,
    openModal: openGroupDeletionModal,
    closeModal: closeGroupDeletionModal,
    confirmAction: confirmGroupDeletion
  } = useConfirmationModal<GroupDTO>()

  const {
    isOpen: isGroupUserManagementModalOpen,
    data: groupWithUsers,
    openModal: openGroupUserManagementModal,
    closeModal: closeGroupUserManagementModal
  } = useConfirmationModal<GroupDTO>()

  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false)
  const { groupsDTO, getGroups } = useGroupGetGroups()
  const { userDTO, getCurrentUserInfo } = useUserGetCurrentUserInfo()
  const { deleteGroup } = useGroupDeleteGroup()

  useEffect(() => {
    getGroups()
    getCurrentUserInfo()
  }, [])

  const onCloseModalCreation = () => {
    getGroups()
    setModalCreateIsOpen(false)
  }

  const confirmDeleteCallback = async (data: GroupDTO) => {
    await deleteGroup(data.groupId)
    await getGroups()
  }

  return (
    <React.Fragment>
      <GroupCreationDialog open={modalCreateIsOpen} onValid={onCloseModalCreation} onCancel={() => setModalCreateIsOpen(false)} />
      <ValidationDialog
        titleDialog={'Deletion confirmation'}
        textDialog={'You will delete the group ' + groupToDelete?.groupName}
        open={isGroupDeletionModalOpen}
        onCancel={closeGroupDeletionModal}
        onValid={() => confirmGroupDeletion(confirmDeleteCallback)}
      />
      {groupWithUsers && userDTO && (
        <GroupUsersDialog open={isGroupUserManagementModalOpen} group={groupWithUsers} currentUser={userDTO} onClose={closeGroupUserManagementModal} />
      )}
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
          <TableBody>
            {groupsDTO && userDTO && groupsDTO.map(group => groupLine(group, userDTO, openGroupDeletionModal, openGroupUserManagementModal))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" sx={fabSx} onClick={() => setModalCreateIsOpen(true)}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}
