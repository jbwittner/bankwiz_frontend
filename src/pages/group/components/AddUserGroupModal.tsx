import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { GroupAuthorizationEnum, GroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useGroupAddUserToGroup } from '@/tools/hooks/apihooks/groupapihook'
import { useState } from 'react'

interface IAddUserGroupModalProps {
  open: boolean
  onCancel: () => void
  onSucess: () => void
  group: GroupDTO
}

export function AddUserGroupModal({ open, onCancel, onSucess, group }: IAddUserGroupModalProps) {
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
