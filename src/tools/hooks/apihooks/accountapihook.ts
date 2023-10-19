import { BankAccountCreationRequest, BankAccountDTO, BankAccountGroupDTO } from '@jbwittner/bankwiz_openapi-client-fetch'
import { displayErrorToast, useBankAccountApi } from './configurationapihooks'
import { useState } from 'react'

const useBankAccountGetBankAccounts = () => {
  const getApiInstance = useBankAccountApi()
  const [data, setData] = useState<BankAccountGroupDTO[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const getBankAccounts = async () => {
    try {
      const apiBankAccount = await getApiInstance()
      const datafetch = await apiBankAccount.getBankAccounts()
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

const useBankAccountAddAccount = () => {
  const getApiInstance = useBankAccountApi()
  const [data, setData] = useState<BankAccountDTO | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const addAccount = async (bankAccountCreationRequest: BankAccountCreationRequest) => {
    try {
      const apiBankAccount = await getApiInstance()
      const datafetch = await apiBankAccount.addAccount({ bankAccountCreationRequest })
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
    addAccount,
    error
  }
}

export { useBankAccountGetBankAccounts, useBankAccountAddAccount }
