import { TextFieldForm } from '@/components/FormFields'
import { useTransactionServiceApi } from '@/tools/api/server/hook/transactionapihooks'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IAddTransansactionDialogProps {
  bankAccountId: string
  open: boolean
  handleCancel: () => void
  handleAdd: () => void
}

interface IFormAddTransaction {
  amount: number
  comment: string
}

export const AddTransansactionDialog = (props: IAddTransansactionDialogProps) => {
  const { createTransaction } = useTransactionServiceApi()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      amount: 0,
      comment: ''
    }
  })

  const onSubmit: SubmitHandler<IFormAddTransaction> = async data => {
    const decimalAmount = data.amount * 100
    await createTransaction({ bankAccountId: props.bankAccountId, decimalAmount: decimalAmount, comment: data.comment })
    props.handleAdd()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Add transaction to bank account</DialogTitle>
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
          <TextFieldForm
            name="comment"
            control={control}
            label="Comment"
            variant="outlined"
            fullWidth
            margin="dense"
            error={errors.comment?.type === 'required'}
            sx={{ margin: '10px 0 0 0' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <Button type="submit">Add transaction</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
