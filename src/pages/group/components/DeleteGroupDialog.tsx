import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'

interface IDeleteGroupDialog {
  groupId: string
  open: boolean
  handleCancel: () => void
  handleDelete: () => void
}

export const DeleteGroupDialog = (props: IDeleteGroupDialog) => {
  const { deleteGroup } = useGroupServiceApi()

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      userId: ''
    }
  })

  const onSubmit = async () => {
    await deleteGroup(props.groupId)
    props.handleDelete()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Delete group ?</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Do you want to delete the group ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>No</Button>
          <Button type="submit" color="error">
            Yes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
