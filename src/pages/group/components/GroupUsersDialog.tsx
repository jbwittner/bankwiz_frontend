import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import {
  GroupAuthorizationEnum,
  GroupDTO,
  UserDTO,
  UserGroupDTO
} from '@jbwittner/bankwiz_openapi-client-fetch'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import { Theme } from '@emotion/react'
import { red } from '@mui/material/colors'
import { useRemoveUserFromGroup } from '@/tools/hooks/apihooks/groupapihook'
import { useState } from 'react'

const deleteIconSx: SxProps<Theme> = {
  color: red[700],
  ':disabled': { color: red[200] }
}

interface IGroupCreationDialogProps {
  open: boolean
  group: GroupDTO
  currentUser: UserDTO
  onClose: () => void
}

const userLine = (userGroupDTO: UserGroupDTO, currentUser: UserGroupDTO, onDelete: (userId: number) => void) => {
  const isAdmin = currentUser.authorization === GroupAuthorizationEnum.Admin
  const isCurrentUser = userGroupDTO.user.userId === currentUser.user.userId
  return (
    <TableRow key={userGroupDTO.user.userId}>
      <TableCell align="center">{userGroupDTO.user.firstName}</TableCell>
      <TableCell align="center">{userGroupDTO.user.lastName}</TableCell>
      <TableCell align="center">{userGroupDTO.user.email}</TableCell>
      <TableCell align="center">{userGroupDTO.authorization}</TableCell>
      <TableCell align="center">
        {/*Only administrator users can remove rights (for other users)*/}
        <IconButton
          size="small"
          disabled={!(isAdmin && !isCurrentUser)}
          sx={deleteIconSx}
          onClick={() => onDelete(userGroupDTO.user.userId)}
        >
          <GroupRemoveIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default function GroupUsersDialog({
  open,
  group,
  currentUser,
  onClose
}: IGroupCreationDialogProps) {
  const currentUserGroupDto = group.users.find(
    userGroupDto => userGroupDto.user.userId === currentUser.userId
  )

  const [groupData, setGroupData] = useState<GroupDTO>(group)

  const {removeUserFromGroup} =useRemoveUserFromGroup()

  const onClickDelete = (userId: number) => {
    removeUserFromGroup(group.groupId, userId).then(() => {
      const newGroup = {... group}
      newGroup.users = newGroup.users.filter(userGroup => userGroup.user.userId !== userId)
      setGroupData(newGroup)
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
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
              groupData.users.map(userGroutDto =>
                userLine(userGroutDto, currentUserGroupDto, onClickDelete)
              )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button type="submit" form="hook-form">
          Add user
        </Button>
      </DialogActions>
    </Dialog>
  )
}
