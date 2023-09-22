import { IconButton, SxProps, TableCell, TableRow, Theme } from '@mui/material'
import {
  GroupAuthorizationEnum,
  GroupDTO,
  UserDTO
} from '@jbwittner/bankwiz_openapi-client-fetch'
import DeleteIcon from '@mui/icons-material/Delete'
import { red } from '@mui/material/colors'
import GroupIcon from '@mui/icons-material/Group'

const deleteIconSx: SxProps<Theme> = {
  color: red[700],
  ':disabled': { color: red[200] }
}

export const groupLine = (
  groupDTO: GroupDTO,
  userDTO: UserDTO,
  onClickDelete: (groupDTO: GroupDTO) => void
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
          onClick={() => onClickDelete(groupDTO)}
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
