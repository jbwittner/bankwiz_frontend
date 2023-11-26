import { SelectFieldForm, TextFieldForm } from '@/components/FormFields'
import { useBankAccountServiceApi } from '@/tools/api/server/hook/bankaccountapihooks'
import { useGroupServiceApi } from '@/tools/api/server/hook/groupserviceapihook'
import { GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICreationBankAccountDialogProps {
  open: boolean
  handleCancel: () => void
  handleCreate: () => void
}

interface IFormGroupCreation {
  bankAccountName: string
  groupId: string
  baseAmount: number
}

export const CreationBankAccountDialog = (props: ICreationBankAccountDialogProps) => {
  const { getUserGroups } = useGroupServiceApi()
  const { createBankAccount } = useBankAccountServiceApi()
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
      bankAccountName: '',
      groupId: '',
      baseAmount: 0
    }
  })

  const onSubmit: SubmitHandler<IFormGroupCreation> = async data => {
    const decimalBaseAmount = data.baseAmount * 100
    await createBankAccount({ bankAccountName: data.bankAccountName, groupId: data.groupId, decimalBaseAmount })
    props.handleCreate()
    reset()
  }

  console.log(errors)

  return (
    <Dialog open={props.open} onClose={props.handleCancel}>
      <DialogTitle>Create bank account</DialogTitle>
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
            required
            error={errors.bankAccountName?.type === 'required'}
          />
          <TextFieldForm
            type="number"
            name="baseAmount"
            control={control}
            label="Base amount"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            helperText="Maximum two decimal places."
            pattern={/^\d+(\.\d{1,2})?$/}
            error={errors.baseAmount?.type === 'required' || errors.baseAmount?.type === 'pattern'}
          />
          <SelectFieldForm
            control={control}
            name="groupId"
            label="Group"
            variant="outlined"
            required
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
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
