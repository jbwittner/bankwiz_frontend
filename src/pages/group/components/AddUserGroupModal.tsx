import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material'
import { GroupAuthorizationEnum, GroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useGroupAddUserToGroup } from '@/tools/hooks/apihooks/groupapihook'
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
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IAddUserForm>({
    defaultValues: { UserId: 0, Authorization: GroupAuthorizationEnum.Read }
  })

  const { addUserToGroup } = useGroupAddUserToGroup()

  const submitData = async (data: IAddUserForm) => {
    console.log('toto')
    addUserToGroup(group.groupId, { userId: data.UserId, authorization: data.Authorization }).then(() => {
      onSucess()
    })
  }

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add user to group {group.groupName}</DialogTitle>
      <form onSubmit={handleSubmit(submitData)}>
        <DialogContent>
          <TextFieldForm
            control={control}
            name="UserId"
            label="User ID"
            variant="outlined"
            required
            error={errors.UserId?.type === 'required'}
            fullWidth
            sx={{ margin: '10px 0 0 0' }}
          />
          <SelectFieldForm
            control={control}
            name="Authorization"
            label="Authorization"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Add user</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
