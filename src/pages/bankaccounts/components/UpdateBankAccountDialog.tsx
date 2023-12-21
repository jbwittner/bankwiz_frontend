import { SelectFieldForm, TextFieldForm } from '@/components/FormFields'
import { useBankAccountServiceApi } from '@/tools/api/server/hook/bankaccountapihooks'
import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import { BankAccountIndexDTO, GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IUpdateBankAccountDialogProps {
  bankAccount: BankAccountIndexDTO
  groupId: string
  open: boolean
  handleCancel: () => void
  handleUpdate: () => void
}

interface IFormGroupUpdate {
  bankAccountName: string
  groupId: string
  baseAmount: number
}

export const UpdateBankAccountDialog = (props: IUpdateBankAccountDialogProps) => {
  const { getUserGroups } = useGroupServiceApi()
  const { updateBankAccount } = useBankAccountServiceApi()
  const [groups, setGroups] = useState<GroupIndexDTO[]>([])

  useEffect(() => {
    getUserGroups().then(data => {
      setGroups(data)
    })
  }, [])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      bankAccountName: props.bankAccount.bankAccountName,
      groupId: props.groupId,
      baseAmount: props.bankAccount.decimalBaseAmount / 100
    }
  })

  const onSubmit: SubmitHandler<IFormGroupUpdate> = async data => {
    const decimalBaseAmount = data.baseAmount * 100
    await updateBankAccount(props.bankAccount.bankAccountId, { bankAccountName: data.bankAccountName, groupId: data.groupId, decimalBaseAmount })
    props.handleUpdate()
    reset()
  }

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Update bank account</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>Enter a bank account name</DialogContentText>
          <TextFieldForm
            name="bankAccountName"
            control={control}
            label="Bank account name"
            variant="outlined"
            fullWidth
            margin="dense"
            error={errors.bankAccountName?.type === 'required'}
          />
          <TextFieldForm
            name="baseAmount"
            control={control}
            label="Base amount"
            variant="outlined"
            fullWidth
            margin="dense"
            helperText="Maximum two decimal places."
            pattern={/^\d+(\.\d{1,2})?$/}
            error={errors.baseAmount?.type === 'required' || errors.baseAmount?.type === 'pattern'}
          />
          <SelectFieldForm
            control={control}
            name="groupId"
            label="Group"
            variant="outlined"
            error={errors.groupId?.type === 'required'}
            fullWidth
            sx={{ margin: '10px 0 0 0' }}
          >
            {groups.map(group => {
              return (
                <MenuItem key={group.groupId} value={group.groupId}>
                  {group.groupName}
                </MenuItem>
              )
            })}
          </SelectFieldForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancel}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
