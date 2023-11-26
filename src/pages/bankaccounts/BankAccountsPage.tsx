import PageWrapper from '@/tools/router/pagewrapper'
import { useEffect, useState } from 'react'

interface IBankAccountsBasePageProps {}

const BankAccountsBasePage = (props: IBankAccountsBasePageProps) => {
  return <div></div>
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
