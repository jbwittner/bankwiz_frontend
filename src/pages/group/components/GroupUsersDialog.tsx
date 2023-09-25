import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import { GroupAuthorizationEnum, GroupDTO, UserDTO, UserGroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import { Theme } from '@emotion/react'
import { red } from '@mui/material/colors'
import { useGroupAddUserToGroup, useGroupGetGroup, useGroupRemoveUserFromGroup, useGroupUpdateUserInGroup } from '@/tools/hooks/apihooks/groupapihook'
import { useEffect, useState } from 'react'

const deleteIconSx: SxProps<Theme> = {
  color: red[700],
  ':disabled': { color: red[200] }
}

interface IAddUserGroupModalProps {
  open: boolean
  onCancel: () => void
  onSucess: () => void
  group: GroupDTO
}

function AddUserGroupModal({ open, onCancel, onSucess, group }: IAddUserGroupModalProps) {
  const [userIdToAdd, setUserIdToAdd] = useState<number | null>(null)
  const [authorizationNewUser, setAuthorizationNewUser] = useState<GroupAuthorizationEnum | null>(null)

  const { addUserToGroup } = useGroupAddUserToGroup()

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAuthorizationNewUser(event.target.value as GroupAuthorizationEnum)
  }

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIdToAdd(Number(event.target.value))
  }

  const onSubmit = () => {
    if (userIdToAdd && authorizationNewUser) {
      addUserToGroup(group.groupId, { userId: userIdToAdd, authorization: authorizationNewUser }).then(() => {
        onSucess()
      })
    }
  }

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add user to group {group.groupName}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          sx={{ margin: '10px 0 0 0' }}
          id="outlined-basic"
          label="User ID"
          variant="outlined"
          onChange={handleChangeTextField}
          type="number"
        />
        <FormControl fullWidth sx={{ margin: '10px 0 0 0' }}>
          <InputLabel id="demo-simple-select-label">Authorization</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Atuhorization" onChange={handleChangeSelect}>
            <MenuItem value={GroupAuthorizationEnum.Admin}>{GroupAuthorizationEnum.Admin}</MenuItem>
            <MenuItem value={GroupAuthorizationEnum.Read}>{GroupAuthorizationEnum.Read}</MenuItem>
            <MenuItem value={GroupAuthorizationEnum.Write}>{GroupAuthorizationEnum.Write}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" form="hook-form" onClick={onSubmit}>
          Add user
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface ISelectAuthorizationProps {
  authorization: GroupAuthorizationEnum
  updateAuthorization: (authorization: GroupAuthorizationEnum) => void
}

function SelectAuthorization(data: ISelectAuthorizationProps) {
  const [authorization, setAuthorization] = useState(data.authorization)

  const handleChange = (event: SelectChangeEvent) => {
    setAuthorization(event.target.value as GroupAuthorizationEnum)
    data.updateAuthorization(event.target.value as GroupAuthorizationEnum)
  }

  return (
    <FormControl fullWidth>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={authorization} onChange={handleChange}>
        <MenuItem value={GroupAuthorizationEnum.Admin}>{GroupAuthorizationEnum.Admin}</MenuItem>
        <MenuItem value={GroupAuthorizationEnum.Read}>{GroupAuthorizationEnum.Read}</MenuItem>
        <MenuItem value={GroupAuthorizationEnum.Write}>{GroupAuthorizationEnum.Write}</MenuItem>
      </Select>
    </FormControl>
  )
}

const userLine = (
  userGroupDTO: UserGroupDTO,
  currentUser: UserGroupDTO,
  onDelete: (userId: number) => Promise<void>,
  updateAuthorization: (userId: number, authorization: GroupAuthorizationEnum) => void
) => {
  const isAdmin = currentUser.authorization === GroupAuthorizationEnum.Admin
  const isCurrentUser = userGroupDTO.user.userId === currentUser.user.userId

  const onUpdateAuthorization = (authorization: GroupAuthorizationEnum) => {
    updateAuthorization(userGroupDTO.user.userId, authorization)
  }

  return (
    <TableRow key={userGroupDTO.user.userId}>
      <TableCell align="center">{userGroupDTO.user.firstName}</TableCell>
      <TableCell align="center">{userGroupDTO.user.lastName}</TableCell>
      <TableCell align="center">{userGroupDTO.user.email}</TableCell>
      <TableCell align="center">
        {isAdmin && !isCurrentUser ? (
          <SelectAuthorization authorization={userGroupDTO.authorization} updateAuthorization={onUpdateAuthorization} />
        ) : (
          userGroupDTO.authorization
        )}
      </TableCell>
      <TableCell align="center">
        {/*Only administrator users can remove rights (for other users)*/}
        <IconButton size="small" disabled={!(isAdmin && !isCurrentUser)} sx={deleteIconSx} onClick={() => onDelete(userGroupDTO.user.userId)}>
          <GroupRemoveIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

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
