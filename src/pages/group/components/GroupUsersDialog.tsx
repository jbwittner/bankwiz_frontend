import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { GroupAuthorizationEnum, GroupDTO, UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useGroupGetGroup, useGroupRemoveUserFromGroup, useGroupUpdateUserInGroup } from '@/tools/hooks/apihooks/groupapihook'
import { useEffect, useState } from 'react'
import { userLine } from './UserLine'
import { AddUserGroupModal } from './AddUserGroupModal'

interface IGroupCreationDialogProps {
  open: boolean
  group: GroupDTO
  currentUser: UserDTO
  onClose: () => void
}

export default function GroupUsersDialog({ open, group, currentUser, onClose }: IGroupCreationDialogProps) {
  const { groupDTO, getGroup } = useGroupGetGroup()

  const [modalAddUserIsOpen, setModalAddUserIsOpen] = useState(false)

  const currentUserGroupDto = group.users.find(userGroupDto => userGroupDto.user.userId === currentUser.userId)
  const isAdmin = currentUserGroupDto?.authorization === GroupAuthorizationEnum.Admin

  useEffect(() => {
    getGroup(group.groupId)
  }, [group])

  const { removeUserFromGroup } = useGroupRemoveUserFromGroup()
  const { updateUserInGroup } = useGroupUpdateUserInGroup()

  const onClickDelete = async (userId: number) => {
    await removeUserFromGroup(group.groupId, userId)
    await getGroup(group.groupId)
  }

  const onUpdateAuthorization = (userId: number, authorization: GroupAuthorizationEnum) => {
    updateUserInGroup(group.groupId, userId, {
      authorization: authorization
    }).then(() => {
      getGroup(group.groupId)
    })
  }

  const onSucessAddUser = () => {
    setModalAddUserIsOpen(false)
    getGroup(group.groupId)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <AddUserGroupModal open={modalAddUserIsOpen} group={group} onCancel={() => setModalAddUserIsOpen(false)} onSucess={onSucessAddUser} />
      <DialogTitle>Users group of {group.groupName}</DialogTitle>
      <DialogContent>
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
              groupDTO &&
              groupDTO.users.map(userGroutDto => userLine(userGroutDto, currentUserGroupDto, onClickDelete, onUpdateAuthorization))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit" form="hook-form" disabled={!isAdmin} onClick={() => setModalAddUserIsOpen(true)}>
          Add user
        </Button>
      </DialogActions>
    </Dialog>
  )
}
