import { SelectFieldForm, TextFieldForm } from '@/components/FormFields'
import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import { UserGroupRightEnum } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IAddUserGroupDialogProps {
  groupId: string
  open: boolean
  handleCancel: () => void
  handleAdd: () => void
}

interface IFormAddUser {
  userId: string
  authorization: UserGroupRightEnum
}

export const AddUserGroupDialog = (props: IAddUserGroupDialogProps) => {
  const { addUserToGroup } = useGroupServiceApi()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      userId: '',
      authorization: UserGroupRightEnum.Read
    }
  })

  const onSubmit: SubmitHandler<IFormAddUser> = async data => {
    await addUserToGroup(props.groupId, { userId: data.userId, right: data.authorization })
    props.handleAdd()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Add user to group</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Enter a user id and user right</DialogContentText>
          <TextFieldForm
            name="userId"
            control={control}
            label="User ID"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            error={errors.userId?.type === 'required'}
            sx={{ margin: '10px 0 0 0' }}
          />
          <SelectFieldForm
            control={control}
            name="authorization"
            label="Authorization"
            variant="outlined"
            required
            error={errors.authorization?.type === 'required'}
            fullWidth
            sx={{ margin: '10px 0 0 0' }}
          >
            <MenuItem value={UserGroupRightEnum.Admin}>{UserGroupRightEnum.Admin}</MenuItem>
            <MenuItem value={UserGroupRightEnum.Read}>{UserGroupRightEnum.Read}</MenuItem>
            <MenuItem value={UserGroupRightEnum.Write}>{UserGroupRightEnum.Write}</MenuItem>
          </SelectFieldForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <Button type="submit">Add user</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
