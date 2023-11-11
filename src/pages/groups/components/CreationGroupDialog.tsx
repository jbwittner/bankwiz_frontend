import { TextFieldForm } from '@/components/FormFields'
import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICreationGroupDialogProps {
  open: boolean
  handleCancel: () => void
  handleCreate: () => void
}

interface IFormGroupCreation {
  groupName: string
}


export const CreationGroupDialog = (props: ICreationGroupDialogProps) => {
  const { createGroup } = useGroupServiceApi()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      groupName: ''
    }
  })

  const onSubmit: SubmitHandler<IFormGroupCreation> = async data => {
    await createGroup({ groupName: data.groupName })
    props.handleCreate()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Create group</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Enter a groupe name to create a group</DialogContentText>
          <TextFieldForm name="groupName" control={control} label="Group name" variant="standard" fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
