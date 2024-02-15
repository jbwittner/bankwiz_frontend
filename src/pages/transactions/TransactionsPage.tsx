import PageWrapper from '@/tools/router/pagewrapper'
import { Button, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useBankAccountServiceApi } from '@/tools/api/server/hook/bankaccountapihooks'
import { GroupBankAccountIndexDTO, TransactionIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useTransactionServiceApi } from '@/tools/api/server/hook/transactionapihooks'
import AddIcon from '@mui/icons-material/Add'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import { DeleteTransactionDialog } from './components/DeleteTransactionDialog'
import { AddTransansactionDialog } from './components/AddTransansactionDialog'
import { UpdateTransansactionDialog } from './components/UpdateTransansactionDialog'

interface ITransactionsBasePageProps {
  groupBankAccountIndexDTOs: GroupBankAccountIndexDTO[]
}

const TransactionsBasePage = (props: ITransactionsBasePageProps) => {
  const { getAllTransactionOfBankAccount } = useTransactionServiceApi()
  const [isOpenDeleteTransactionModal, setIsOpenDeleteTransactionModal] = useState(false)
  const [isOpenCreateTransactionModal, setIsOpenCreateTransactionModal] = useState(false)
  const [isOpenUpdateTransactionModal, setIsOpenUpdateTransactionModal] = useState(false)
  const [transactionToManage, setTransactionToManage] = useState<TransactionIndexDTO>({ transactionId: '', decimalAmount: 0 })
  const [currentBankAccountId, setCurrentBankAccountId] = useState('')

  const [age, setAge] = useState('')
  const [bankAccountTransactions, setBankAccountTransactions] = useState<TransactionIndexDTO[]>([])

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
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: cellValues => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const result = bankAccountTransactions.find(transaction => transaction.transactionId === cellValues.row.id)
                if (result) {
                  setTransactionToManage(result)
                  setIsOpenUpdateTransactionModal(true)
                }
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                const result = bankAccountTransactions.find(transaction => transaction.transactionId === cellValues.row.id)
                if (result) {
                  setTransactionToManage(result)
                  setIsOpenDeleteTransactionModal(true)
                }
              }}
            >
              Delete
            </Button>
          </>
        )
      }
    }
  ]

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

  const addDeleteUpdateTransactionSucessfully = () => {
    getAllTransactionOfBankAccount(currentBankAccountId).then(values => {
      setIsOpenCreateTransactionModal(false)
      setIsOpenDeleteTransactionModal(false)
      setIsOpenUpdateTransactionModal(false)
      setBankAccountTransactions(values.transactions)
    })
  }

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
    getAllTransactionOfBankAccount(event.target.value).then(values => {
      setCurrentBankAccountId(values.bankAccountIndex.bankAccountId)
      setBankAccountTransactions(values.transactions)
    })
  }

  return (
    <div>
      <DeleteTransactionDialog
        transactionId={transactionToManage.transactionId}
        handleCancel={() => setIsOpenDeleteTransactionModal(false)}
        handleDelete={addDeleteUpdateTransactionSucessfully}
        open={isOpenDeleteTransactionModal}
      />
      <AddTransansactionDialog
        bankAccountId={currentBankAccountId}
        open={isOpenCreateTransactionModal}
        handleCancel={() => setIsOpenCreateTransactionModal(false)}
        handleAdd={addDeleteUpdateTransactionSucessfully}
      />
      <UpdateTransansactionDialog
        transaction={transactionToManage}
        open={isOpenUpdateTransactionModal}
        handleCancel={() => setIsOpenUpdateTransactionModal(false)}
        handleUpdate={addDeleteUpdateTransactionSucessfully}
      />
      <FormControl fullWidth sx={{ marginTop: '10px', marginBottom: '10px' }}>
        <InputLabel id="demo-simple-select-label">Bank account</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Bank account" onChange={handleChange}>
          {items}
        </Select>
      </FormControl>
      <DataGrid
        sx={{ height: '70vh', width: '100%' }}
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              transactionId: false
            }
          },
          pagination: {
            paginationModel: {
              pageSize: 25
            }
          }
        }}
        density="compact"
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setIsOpenCreateTransactionModal(true)}>
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
    <PageWrapper loading={loading} xs={11}>
      <TransactionsBasePage groupBankAccountIndexDTOs={groupBankAccountIndex} />
    </PageWrapper>
  )
}

export { TransactionsPage }
