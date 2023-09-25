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
import { useForm } from 'react-hook-form'
import { TextFieldForm } from '@/components/forms/FieldsForm'
import { SelectFieldForm } from '@/components/forms/SelectForm'

interface IAddUserGroupModalProps {
  open: boolean
  onCancel: () => void
  onSucess: () => void
  group: GroupDTO
}

interface IAddUserForm {
  UserId: number
  Authorization: GroupAuthorizationEnum
}

export function AddUserGroupModal({ open, onCancel, onSucess, group }: IAddUserGroupModalProps) {
  const [userIdToAdd, setUserIdToAdd] = useState<number | null>(null)
  const [authorizationNewUser, setAuthorizationNewUser] = useState<GroupAuthorizationEnum | null>(null)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IAddUserForm>({
    defaultValues: { UserId: 5, Authorization: GroupAuthorizationEnum.Read }
  })

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

  const submit = async (data: IAddUserForm) => {}

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add user to group {group.groupName}</DialogTitle>
      <DialogContent>
        <form id="hook-form" onSubmit={handleSubmit(submit)}>
          <TextFieldForm
            control={control}
            name="UserId"
            label="User ID"
            type="number"
            variant="outlined"
            required
            error={errors.UserId?.type === 'required'}
            fullWidth
            sx={{ margin: '10px 0 0 0' }}
          />
          <SelectFieldForm
            control={control}
            name="Authorization"
            label="Authorizationaaaa"
            variant="outlined"
            required
            error={errors.Authorization?.type === 'required'}
            fullWidth
            sx={{ margin: '10px 0 0 0' }}
          >
            <MenuItem value={GroupAuthorizationEnum.Admin}>{GroupAuthorizationEnum.Admin}</MenuItem>
            <MenuItem value={GroupAuthorizationEnum.Read}>{GroupAuthorizationEnum.Read}</MenuItem>
            <MenuItem value={GroupAuthorizationEnum.Write}>{GroupAuthorizationEnum.Write}</MenuItem>
          </SelectFieldForm>
        </form>
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
