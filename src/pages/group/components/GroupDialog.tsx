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
import { TextFieldForm } from '../../../components/forms/FieldsForm'

interface IGroupDialogProps {
  open: boolean
  onValid: () => void
  onCancel: () => void
}

interface IGroupCreationForm {
  GroupName: string
}

export default function GroupDialog({
  open,
  onCancel,
  onValid
}: IGroupDialogProps) {
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
    onValid()
  }

  return (
    <Dialog open={open} onClose={onCancel}>
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
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" form="hook-form">
          Create groupe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
