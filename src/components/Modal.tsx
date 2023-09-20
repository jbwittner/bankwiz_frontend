import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField
} from '@mui/material'
import React, { useEffect } from 'react'
import {
  Path,
  useForm,
  UseFormRegister,
  SubmitHandler,
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

  const submit = (data: IGroupCreationForm) => {
    console.log(data)
    reset()
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
