import PageWrapper from '@/tools/router/pagewrapper'
import { Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useBankAccountServiceApi } from '@/tools/api/server/hook/bankaccountapihooks'
import { GroupBankAccountIndexDTO, TransactionIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useTransactionServiceApi } from '@/tools/api/server/hook/transactionapihooks'
import AddIcon from '@mui/icons-material/Add'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface ITransactionsBasePageProps {
  groupBankAccountIndexDTOs: GroupBankAccountIndexDTO[]
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 100
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 300
  }
]

const TransactionsBasePage = (props: ITransactionsBasePageProps) => {
  const { getAllTransactionOfBankAccount } = useTransactionServiceApi()

  const [age, setAge] = useState('')
  const [bankAccountTransactions, setBankAccountTransactions] = useState<TransactionIndexDTO[]>([])

  const rows = bankAccountTransactions.map(transaction => {
    return {
      id: transaction.transactionId,
      amount: transaction.decimalAmount / 100,
      comment: transaction.comment
    }
  })

  const items = props.groupBankAccountIndexDTOs.map(groupBankAccountIndex => {
    return groupBankAccountIndex.bankAccountIndexList.map(bankAccountIndex => {
      return (
        <MenuItem key={bankAccountIndex.bankAccountId} value={bankAccountIndex.bankAccountId}>
          {bankAccountIndex.bankAccountName + ' (' + groupBankAccountIndex.groupeIndex.groupName + ')'}
        </MenuItem>
      )
    })
  })

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
    getAllTransactionOfBankAccount(event.target.value).then(values => {
      setBankAccountTransactions(values.transactions)
    })
  }

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Bank account</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Bank account" onChange={handleChange}>
          {items}
        </Select>
      </FormControl>
      <DataGrid
        rowHeight={25}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />{' '}
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => console.log(true)}>
        <AddIcon />
      </Fab>
    </div>
  )
}

const TransactionsPage = () => {
  const { getAllBankAccounts } = useBankAccountServiceApi()
  const [loading, setLoading] = useState(true)
  const [groupBankAccountIndex, setGroupBankAccountIndex] = useState<GroupBankAccountIndexDTO[]>([])

  useEffect(() => {
    getAllBankAccounts().then(data => {
      setGroupBankAccountIndex(data)
      setLoading(false)
    })
  }, [])

  return (
    <PageWrapper loading={loading} xs={8}>
      <TransactionsBasePage groupBankAccountIndexDTOs={groupBankAccountIndex} />
    </PageWrapper>
  )
}

export { TransactionsPage }
