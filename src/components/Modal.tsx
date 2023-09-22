import { useCreateGroup } from '@/tools/hooks/apihooks/groupapihook'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { TextFieldForm } from './forms/FieldsForm'

interface IGroupDialogProps {
  open: boolean
  onClose: () => void
}

interface IGroupCreationForm {
  GroupName: string
}

export default function GroupDialog({ open, onClose }: IGroupDialogProps) {
  const { createGroup } = useCreateGroup()

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
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create new group</DialogTitle>
      <DialogContent>
        <form id="hook-form" onSubmit={handleSubmit(submit)}>
          <DialogContentText>
            Enter the informations to create a new group
          </DialogContentText>
          <TextFieldForm
            control={control}
            name="GroupName"
            label="Group name"
            required
            error={errors.GroupName?.type === 'required'}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="hook-form">
          Create groupe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
