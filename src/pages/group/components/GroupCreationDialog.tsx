import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useGroupCreateGroup } from '@/tools/hooks/apihooks/groupapihook'
import { TextFieldForm } from '@/components/forms/FieldsForm'

interface IGroupCreationDialogProps {
  open: boolean
  onValid: () => void
  onCancel: () => void
}

interface IGroupCreationForm {
  GroupName: string
}

export default function GroupCreationDialog({ open, onCancel, onValid }: IGroupCreationDialogProps) {
  const { createGroup } = useGroupCreateGroup()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IGroupCreationForm>({
    defaultValues: { GroupName: '' }
  })

  const submit = async (data: IGroupCreationForm) => {
    await createGroup({
      groupName: data.GroupName
    })
    reset()
    onValid()
  }

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Create new group</DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent>
          <DialogContentText>Enter the informations to create a new group</DialogContentText>
          <TextFieldForm control={control} name="GroupName" label="Group name" required error={errors.GroupName?.type === 'required'} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Create groupe</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
