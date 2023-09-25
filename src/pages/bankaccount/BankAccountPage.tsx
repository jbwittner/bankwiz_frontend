import { useBankAccountGetBankAccounts } from '@/tools/hooks/apihooks/accountapihook'
import { BankAccountIndexDTO, GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const columns: GridColDef[] = [
  {
    field: 'accountId',
    headerName: 'Account ID',
    width: 100,
    editable: true
  },
  {
    field: 'group',
    headerName: 'Group',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.groupIndexDTO.groupName || ''}`
  },
  {
    field: 'accountName',
    headerName: 'Account name',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.bankAccountIndexDTO.accountName || ''}`
  },
  {
    field: 'Amount',
    headerName: 'Account amount',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.bankAccountIndexDTO.baseAmountDecimal / 100 || ''}`
  }
]

interface IDataGrid {
  accountId: number
  groupIndexDTO: GroupIndexDTO
  bankAccountIndexDTO: BankAccountIndexDTO
}

export function BankAccountPage() {
  const { data: bankAccountsGroup, getBankAccounts } = useBankAccountGetBankAccounts()
  const [dataGrid, setDataGrid] = useState<IDataGrid[]>([])

  useEffect(() => {
    getBankAccounts()
  }, [])

  useEffect(() => {
    const datas: IDataGrid[] = []

    bankAccountsGroup?.forEach(bankAccountGroup => {
      bankAccountGroup.accountIndexDTOs.forEach(account => {
        datas.push({
          accountId: account.accountId,
          bankAccountIndexDTO: account,
          groupIndexDTO: bankAccountGroup.groupIndexDTO
        })
      })
    })

    console.log(datas)

    setDataGrid(datas)
  }, [bankAccountsGroup])

  return (
    <DataGrid
      rows={dataGrid}
      columns={columns}
      getRowId={row => row?.accountId}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10
          }
        }
      }}
      pageSizeOptions={[5, 10, 15, 20]}
      sx={{
        maxWidth: '800px',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '8px'
      }}
      disableRowSelectionOnClick
    />
  )
}
