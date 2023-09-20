import { useCreateGroup } from '@/tools/hooks/apihooks/groupapihook'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import React, { useEffect } from 'react'
import {
  useForm,
  Controller
} from 'react-hook-form'

interface DialogProps {
  open: boolean
  onClose: () => void
}

interface IGroupCreationForm {
  GroupName: string
}

export default function GroupDialog(props: DialogProps) {
  const [open, setOpen] = React.useState(props.open)
  const {createGroup} = useCreateGroup();

  const {
    handleSubmit,
    control,
    formState: { errors },
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
          <Controller
            control={control}
            name="GroupName"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                error={errors.GroupName?.type === 'required'}
                label="Group name *"
              />
            )}
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
