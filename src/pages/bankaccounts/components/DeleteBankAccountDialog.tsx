import { useBankAccountServiceApi } from '@/tools/api/server/hook/bankaccountapihooks'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'

interface IDeleteBankAccountDialog {
  bankAccountId: string
  open: boolean
  handleCancel: () => void
  handleDelete: () => void
}

export const DeleteBankAccountDialog = (props: IDeleteBankAccountDialog) => {
  const { deleteBankAccount } = useBankAccountServiceApi()

  const { handleSubmit, reset } = useForm({
    defaultValues: {
      userId: ''
    }
  })

  const onSubmit = async () => {
    await deleteBankAccount(props.bankAccountId)
    props.handleDelete()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Delete group ?</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Do you want to delete the bank account ?</DialogContentText>
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
