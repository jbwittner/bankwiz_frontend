import { useCreateGroup } from '@/tools/hooks/apihooks/groupapihook'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextFieldForm } from './forms/FieldsForm'

interface IGroupDialogProps {
  open: boolean
  onClose: () => void
}

interface IGroupCreationForm {
  GroupName: string
}

export default function GroupDialog(props: IGroupDialogProps) {
  const [open, setOpen] = React.useState(props.open)
  const { createGroup } = useCreateGroup()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IGroupCreationForm>({
    defaultValues: { GroupName: '' }
  })

  useEffect(() => setOpen(props.open), [props.open])

  const handleClose = () => {
    setOpen(false)
    props.onClose()
  }

  const submit = async (data: IGroupCreationForm) => {
    await createGroup({
      groupName: data.GroupName
    })
    reset()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="hook-form">
          Create groupe
        </Button>
      </DialogActions>
    </Dialog>
  )
}
