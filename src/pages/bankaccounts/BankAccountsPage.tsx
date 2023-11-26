import PageWrapper from '@/tools/router/pagewrapper'
import { Fab } from '@mui/material'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { CreationBankAccountDialog } from './components/CreationBankAccountDialog'

const BankAccountsBasePage = () => {
  const [open, setOpen] = useState(false)

  const onCreate = async () => {
    setOpen(false)
  }

  const close = () => {
    setOpen(false)
  }

  return (
    <div>
      <CreationBankAccountDialog open={open} handleCancel={close} handleCreate={onCreate} />
      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
    </div>
  )
}

const BankAccountsPage = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <PageWrapper loading={loading} xs={8}>
      <BankAccountsBasePage />
    </PageWrapper>
  )
}

export { BankAccountsPage }
