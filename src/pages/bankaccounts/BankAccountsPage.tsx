import PageWrapper from '@/tools/router/pagewrapper'
import { Fab, IconButton, Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { CreationBankAccountDialog } from './components/CreationBankAccountDialog'
import { useBankAccountServiceApi } from '@/tools/api/server/hook/bankaccountapihooks'
import { BankAccountIndexDTO, GroupBankAccountIndexDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import DeleteIcon from '@mui/icons-material/Delete'
import { Theme } from '@emotion/react'
import { grey, red } from '@mui/material/colors'
import { DeleteBankAccountDialog } from './components/DeleteBankAccountDialog'
import { UpdateBankAccountDialog } from './components/UpdateBankAccountDialog'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'

const deleteIconSx: SxProps<Theme> = {
  color: red[700],
  ':disabled': { color: red[200] }
}

const updateIconSx: SxProps<Theme> = {
  color: grey[700]
}

interface IBankAccountsBasePageProps {
  groupBankAccountIndexDTOs: GroupBankAccountIndexDTO[]
}

const BankAccountsBasePage = (props: IBankAccountsBasePageProps) => {
  const { getAllBankAccounts } = useBankAccountServiceApi()
  const [groupBankAccountIndexDTOs, setGroupBankAccountIndexDTOs] = useState(props.groupBankAccountIndexDTOs)
  const [bankAccountIdState, setBankAccountIdState] = useState('')
  const [bankAccount, setBankAccount] = useState<BankAccountIndexDTO>()
  const [isOpenDeleteBankAccountModal, setIsOpenDeleteBankAccountModal] = useState(false)
  const [openCreationDialog, setOpenCreationDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
  const [groupOfAccount, setGroupOfAccount] = useState('')

  const onCreateOrUpdate = async () => {
    const data = await getAllBankAccounts()
    setGroupBankAccountIndexDTOs(data)
    setOpenCreationDialog(false)
    setOpenUpdateDialog(false)
  }

  const onClickUpdateBankAccount = (groupId: string, bankAccountindexDTO: BankAccountIndexDTO) => {
    setBankAccount(bankAccountindexDTO)
    setGroupOfAccount(groupId)
    setOpenUpdateDialog(true)
  }

  const onClickDeleteBankAccount = (id: string) => {
    setBankAccountIdState(id)
    setIsOpenDeleteBankAccountModal(true)
  }

  const handleDelete = async () => {
    const data = await getAllBankAccounts()
    setGroupBankAccountIndexDTOs(data)
    setIsOpenDeleteBankAccountModal(false)
  }

  return (
    <div>
      <CreationBankAccountDialog open={openCreationDialog} handleCancel={() => setOpenCreationDialog(false)} handleCreate={onCreateOrUpdate} />
      {openUpdateDialog && (
        <UpdateBankAccountDialog
          groupId={groupOfAccount}
          bankAccount={bankAccount!}
          open={true}
          handleCancel={() => setOpenUpdateDialog(false)}
          handleUpdate={onCreateOrUpdate}
        />
      )}
      <DeleteBankAccountDialog
        bankAccountId={bankAccountIdState}
        handleCancel={() => setIsOpenDeleteBankAccountModal(false)}
        handleDelete={handleDelete}
        open={isOpenDeleteBankAccountModal}
      />
      <TableContainer component={Paper} sx={{ mt: '15px' }}>
        <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Group ID</TableCell>
              <TableCell align="center">Group Name</TableCell>
              <TableCell align="center">Bank Account Name</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                    <TableCell align="center">
                      <IconButton size="small" sx={deleteIconSx} onClick={() => onClickDeleteBankAccount(bankAccountIndex.bankAccountId)}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={updateIconSx}
                        onClick={() => onClickUpdateBankAccount(groupBankAccountIndexDTO.groupeIndex.groupId, bankAccountIndex)}
                      >
                        <SettingsApplicationsIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setOpenCreationDialog(true)}>
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
