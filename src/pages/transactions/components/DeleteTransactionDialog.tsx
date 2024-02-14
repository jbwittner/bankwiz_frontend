import { useTransactionServiceApi } from '@/tools/api/server/hook/transactionapihooks'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'

interface IDeleteTransactionDialog {
  transactionId: string
  open: boolean
  handleCancel: () => void
  handleDelete: () => void
}

export const DeleteTransactionDialog = (props: IDeleteTransactionDialog) => {
  const { deleteTransaction } = useTransactionServiceApi()

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      transactionId: ''
    }
  })

  const onSubmit = async () => {
    await deleteTransaction(props.transactionId)
    props.handleDelete()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Delete transaction ?</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Do you want to delete the transaction ?</DialogContentText>
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
