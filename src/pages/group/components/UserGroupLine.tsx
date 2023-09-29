import { FormControl, IconButton, MenuItem, Select, SelectChangeEvent, SxProps, TableCell, TableRow } from '@mui/material'
import { GroupAuthorizationEnum, UserGroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import { Theme } from '@emotion/react'
import { red } from '@mui/material/colors'
import { useState } from 'react'

const deleteIconSx: SxProps<Theme> = {
  color: red[700],
  ':disabled': { color: red[200] }
}

interface ISelectAuthorizationProps {
  authorization: GroupAuthorizationEnum
  updateAuthorization: (authorization: GroupAuthorizationEnum) => void
}

const SelectAuthorization = (data: ISelectAuthorizationProps) => {
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

interface IUserGroupLineProps {
  userGroupDTO: UserGroupDTO
  currentUser: UserGroupDTO
  onDelete: (userId: number) => Promise<void>
  updateAuthorization: (userId: number, authorization: GroupAuthorizationEnum) => void
}

export const UserGroupLine = (props: IUserGroupLineProps) => {
  const isAdmin = props.currentUser.authorization === GroupAuthorizationEnum.Admin
  const isCurrentUser = props.userGroupDTO.user.userId === props.currentUser.user.userId

  const onUpdateAuthorization = (authorization: GroupAuthorizationEnum) => {
    props.updateAuthorization(props.userGroupDTO.user.userId, authorization)
  }

  return (
    <TableRow key={props.userGroupDTO.user.userId}>
      <TableCell align="center">{props.userGroupDTO.user.firstName}</TableCell>
      <TableCell align="center">{props.userGroupDTO.user.lastName}</TableCell>
      <TableCell align="center">{props.userGroupDTO.user.email}</TableCell>
      <TableCell align="center">
        {isAdmin && !isCurrentUser ? (
          <SelectAuthorization authorization={props.userGroupDTO.authorization} updateAuthorization={onUpdateAuthorization} />
        ) : (
          props.userGroupDTO.authorization
        )}
      </TableCell>
      <TableCell align="center">
        {/*Only administrator users can remove rights (for other users)*/}
        <IconButton size="small" disabled={!(isAdmin && !isCurrentUser)} sx={deleteIconSx} onClick={() => props.onDelete(props.userGroupDTO.user.userId)}>
          <GroupRemoveIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
