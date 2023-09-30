import { GroupAuthorizationEnum, GroupDTO, UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserGroupLine } from './components/UserGroupLine'
import { useGroupDeleteGroup, useGroupGetGroup, useGroupRemoveUserFromGroup, useGroupUpdateUserInGroup } from '@/tools/hooks/apihooks/groupapihook'
import { AddUserGroupModal } from './components/AddUserGroupModal'
import ValidationDialog from '@/components/dialog/ValidationDialog'
import useConfirmationModal from '@/tools/hooks/component/modalhook'
import { useNavigate } from 'react-router-dom'

interface IGroupBasePageProps {
  groupDTO: GroupDTO
  currentUser: UserDTO
}

export const GroupBasePage: React.FC<IGroupBasePageProps> = props => {
  const {
    isOpen: isGroupDeletionModalOpen,
    data: groupToDelete,
    openModal: openGroupDeletionModal,
    closeModal: closeGroupDeletionModal,
    confirmAction: confirmGroupDeletion
  } = useConfirmationModal<GroupDTO>()

  const [modalAddUserIsOpen, setModalAddUserIsOpen] = useState(false)

  const [group, setGroup] = useState<GroupDTO>(props.groupDTO)
  const { groupDTO, getGroup } = useGroupGetGroup()
  const { removeUserFromGroup } = useGroupRemoveUserFromGroup()
  const { updateUserInGroup } = useGroupUpdateUserInGroup()

  const { deleteGroup } = useGroupDeleteGroup()
  const navigate = useNavigate()

  useEffect(() => {
    if (groupDTO) {
      setGroup(groupDTO)
    }
  }, [groupDTO])

  const onClickDelete = async (userId: number) => {
    await removeUserFromGroup(group.groupId, userId)
    await getGroup(group.groupId)
  }

  const onUpdateAuthorization = async (userId: number, authorization: GroupAuthorizationEnum) => {
    await updateUserInGroup(group.groupId, userId, { authorization: authorization })
    await getGroup(group.groupId)
  }

  const currentUserGroupDto = props.groupDTO.users.find(userGroupDto => userGroupDto.user.userId === props.currentUser.userId)

  const onSucessAddUser = () => {
    setModalAddUserIsOpen(false)
    getGroup(group.groupId)
  }

  const confirmDeleteCallback = async (data: GroupDTO) => {
    await deleteGroup(data.groupId)
    navigate('/groups')
  }

  return (
    <React.Fragment>
      <ValidationDialog
        titleDialog={'Deletion confirmation'}
        textDialog={'You will delete the group ' + groupToDelete?.groupName}
        open={isGroupDeletionModalOpen}
        onCancel={closeGroupDeletionModal}
        onValid={() => confirmGroupDeletion(confirmDeleteCallback)}
      />

      <AddUserGroupModal open={modalAddUserIsOpen} group={group} onCancel={() => setModalAddUserIsOpen(false)} onSucess={onSucessAddUser} />
      <Grid container direction="column">
        <Grid container item direction="row" justifyContent={'space-between'} alignItems={'center'}>
          <Grid container item direction="column" xs={8}>
            <Grid item>
              <Typography display="inline" variant="h2" sx={{ fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>
                Group :
              </Typography>
              <Typography display="inline" variant="h2" sx={{ fontWeight: 'bold' }}>
                {' ' + props.groupDTO.groupName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 'bold', textDecoration: 'underline', fontStyle: 'italic' }}>
                Group ID :
              </Typography>
              <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {' ' + props.groupDTO.groupId}
              </Typography>
            </Grid>
          </Grid>
          {currentUserGroupDto?.authorization === GroupAuthorizationEnum.Admin && (
            <Grid item>
              <Button sx={{ margin: '2px' }} variant="contained" onClick={() => setModalAddUserIsOpen(true)}>
                Add user
              </Button>
              <Button sx={{ margin: '2px' }} color="error" variant="contained" onClick={() => openGroupDeletionModal(props.groupDTO)}>
                Delete groupe
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">First name</TableCell>
                  <TableCell align="center">Last name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Authorization</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUserGroupDto &&
                  group.users.map(userGroutDto => (
                    <UserGroupLine
                      key={userGroutDto.user.userId}
                      userGroupDTO={userGroutDto}
                      currentUser={currentUserGroupDto}
                      onDelete={onClickDelete}
                      updateAuthorization={onUpdateAuthorization}
                    />
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
