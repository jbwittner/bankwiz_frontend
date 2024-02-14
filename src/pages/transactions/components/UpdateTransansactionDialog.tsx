import { TextFieldForm } from '@/components/FormFields'
import { useTransactionServiceApi } from '@/tools/api/server/hook/transactionapihooks'
import { TransactionDTO, TransactionIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IUpdateTransansactionDialogProps {
  transaction: TransactionIndexDTO
  open: boolean
  handleCancel: () => void
  handleUpdate: () => void
}

interface IFormUpdateTransaction {
  amount: number
  comment: string
}

export const UpdateTransansactionDialog = (props: IUpdateTransansactionDialogProps) => {
  const { updateTransaction } = useTransactionServiceApi()
  console.log(props)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      amount: props.transaction.decimalAmount * 100,
      comment: props.transaction.comment ?? ''
    }
  })

  const onSubmit: SubmitHandler<IFormUpdateTransaction> = async data => {
    const decimalAmount = data.amount * 100
    await updateTransaction(props.transaction.transactionId, { decimalAmount: decimalAmount, comment: data.comment })
    props.handleUpdate()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Update transaction to bank account</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Enter a amount and comment</DialogContentText>
          <TextFieldForm
            name="amount"
            control={control}
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
            margin="dense"
            required
            error={errors.amount?.type === 'required'}
            sx={{ margin: '10px 0 0 0' }}
          />
          <TextFieldForm name="comment" control={control} label="Comment" variant="outlined" fullWidth margin="dense" sx={{ margin: '10px 0 0 0' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <Button type="submit">Update transaction</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
