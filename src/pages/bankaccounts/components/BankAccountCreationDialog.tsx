import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import { TextFieldForm } from '@/components/forms/FieldsForm'
import { useBankAccountAddAccount } from '@/tools/hooks/apihooks/accountapihook'

interface IBankAccountCreationDialogProps {
  open: boolean
  onValid: () => void
  onCancel: () => void
}

interface IGroupCreationForm {
  AccountName: string
  GroupId: number
  BaseAmount: number
}

export default function BankAccountCreationDialog({ open, onCancel, onValid }: IBankAccountCreationDialogProps) {
  const { addAccount } = useBankAccountAddAccount()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IGroupCreationForm>({
    defaultValues: { AccountName: '', GroupId: 0, BaseAmount: 0 }
  })

  const submit = async (data: IGroupCreationForm) => {
    const baseAmountDecimal: number = data.BaseAmount * 100
    await addAccount({
      accountName: data.AccountName,
      groupId: data.GroupId,
      baseAmountDecimal: baseAmountDecimal
    })
    reset()
    onValid()
  }

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Create new group</DialogTitle>
      <form onSubmit={handleSubmit(submit)}>
        <DialogContent>
          <DialogContentText>Enter the informations to create a new bank account</DialogContentText>
          <TextFieldForm
            sx={{ marginTop: '6px' }}
            control={control}
            fullWidth={true}
            name="AccountName"
            label="Account name"
            required
            error={errors.AccountName?.type === 'required'}
          />
          <TextFieldForm
            sx={{ marginTop: '6px' }}
            control={control}
            fullWidth={true}
            type={'number'}
            name="GroupId"
            label="Group ID"
            required
            error={errors.GroupId?.type === 'required'}
          />
          <TextFieldForm
            sx={{ marginTop: '6px' }}
            control={control}
            fullWidth={true}
            type={'number'}
            name="BaseAmount"
            label="Base amount"
            required
            error={errors.BaseAmount?.type === 'required'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Create account</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
