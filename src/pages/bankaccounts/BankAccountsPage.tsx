import { useBankAccountGetBankAccounts } from '@/tools/hooks/apihooks/accountapihook'
import { BankAccountIndexDTO, GroupIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { Fab } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

const fabSx = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed'
}

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

export const BankAccountsPage: React.FC = () => {
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

    setDataGrid(datas)
  }, [bankAccountsGroup])

  return (
    <React.Fragment>
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
      <Fab color="primary" aria-label="add" sx={fabSx} onClick={() => console.log(true)}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}
