import { BankAccountGroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { displayErrorToast, useBankAccountApi } from './configurationapihooks'
import { useState } from 'react'

const useBankAccountGetBankAccounts = () => {
  const getApiInstance = useBankAccountApi()
  const [data, setData] = useState<BankAccountGroupDTO[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const getBankAccounts = async () => {
    try {
      const groupApi = await getApiInstance()
      const datafetch = await groupApi.getBankAccounts()
      setData(datafetch)
    } catch (err) {
      displayErrorToast('useBankAccountGetBankAccounts')
      if (err instanceof Error) {
        setError(err)
      } else {
        setError(new Error(String(err)))
      }
    }
  }

  return {
    data,
    getBankAccounts,
    error
  }
}

export { useBankAccountGetBankAccounts }
