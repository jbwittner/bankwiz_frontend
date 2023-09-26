import { IconButton, TableCell, TableRow } from '@mui/material'
import { GroupDTO, UserDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'

interface IGroupeLineProps {
  groupDTO: GroupDTO
  userDTO: UserDTO
  onClickDelete: (groupDTO: GroupDTO) => void
  onClickUsers: (groupDTO: GroupDTO) => void
}

export const GroupeLine = ({ groupDTO, userDTO }: IGroupeLineProps) => {
  const navigate = useNavigate()

  return (
    <TableRow key={groupDTO.groupId}>
      <TableCell>{groupDTO.groupId}</TableCell>
      <TableCell align="center">{groupDTO.groupName}</TableCell>
      <TableCell align="center">{groupDTO.users.length}</TableCell>
      <TableCell align="center">{groupDTO.users.find(userGroupDto => userGroupDto.user.userId === userDTO.userId)?.authorization}</TableCell>
      <TableCell align="center">
        <IconButton size="small" onClick={() => navigate('/group/' + groupDTO.groupId)}>
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
