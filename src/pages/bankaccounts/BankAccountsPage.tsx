import PageWrapper from '@/tools/router/pagewrapper'
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { CreationBankAccountDialog } from './components/CreationBankAccountDialog'
import { useBankAccountServiceApi } from '@/tools/api/server/hook/bankaccountapihooks'
import { GroupBankAccountIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'

interface IBankAccountsBasePageProps {
  groupBankAccountIndexDTOs: GroupBankAccountIndexDTO[]
}

const BankAccountsBasePage = (props: IBankAccountsBasePageProps) => {
  const [groupBankAccountIndexDTOs, setGroupBankAccountIndexDTOs] = useState(props.groupBankAccountIndexDTOs)
  const { getAllBankAccounts } = useBankAccountServiceApi()
  const [open, setOpen] = useState(false)

  const onCreate = async () => {
    const data = await getAllBankAccounts()
    setGroupBankAccountIndexDTOs(data)
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  return (
    <div>
      <CreationBankAccountDialog open={open} handleCancel={close} handleCreate={onCreate} />
      <TableContainer component={Paper} sx={{ mt: '15px' }}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Group ID</TableCell>
              <TableCell align="center">Group Name</TableCell>
              <TableCell align="center">Bank Account Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupBankAccountIndexDTOs.map(groupBankAccountIndexDTO => {
              return groupBankAccountIndexDTO.bankAccountIndexList.map(bankAccountIndex => {
                return (
                  <TableRow key={bankAccountIndex.bankAccountId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {bankAccountIndex.bankAccountId}
                    </TableCell>
                    <TableCell align="center">{groupBankAccountIndexDTO.groupeIndex.groupName}</TableCell>
                    <TableCell align="center">{bankAccountIndex.bankAccountName}</TableCell>
                  </TableRow>
                )
              })
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
    </div>
  )
}

const BankAccountsPage = () => {
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
      <BankAccountsBasePage groupBankAccountIndexDTOs={groupBankAccountIndex} />
    </PageWrapper>
  )
}

export { BankAccountsPage }
