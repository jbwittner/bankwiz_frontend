import { BankAccountCreationRequest, BankAccountUpdateRequest } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useBankAccountServiceApi = () => {
  const { bankAccountServiceApi, getAuthorizationJsonHeader } = useApiConfiguration()

  const createBankAccount = async (bankAccountCreationRequest: BankAccountCreationRequest) => {
    const headers = await getAuthorizationJsonHeader()
    return await bankAccountServiceApi.createBankAccount({ bankAccountCreationRequest }, { headers })
  }

  const getAllBankAccounts = async () => {
    const headers = await getAuthorizationJsonHeader()
    return await bankAccountServiceApi.getAllBankAccount({ headers })
  }

  const deleteBankAccount = async (id: string) => {
    const headers = await getAuthorizationJsonHeader()
    return await bankAccountServiceApi.deleteBankAccount({ id }, { headers })
  }

  const updateBankAccount = async (id: string, bankAccountUpdateRequest: BankAccountUpdateRequest) => {
    const headers = await getAuthorizationJsonHeader()
    return await bankAccountServiceApi.updateBankAccount({ id, bankAccountUpdateRequest }, { headers })
  }

  return {
    createBankAccount,
    getAllBankAccounts,
    deleteBankAccount,
    updateBankAccount
  }
}

export { useBankAccountServiceApi }
