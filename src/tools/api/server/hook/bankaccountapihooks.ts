import { BankAccountCreationRequest } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useBankAccountServiceApi = () => {
  const {getBankAccountServiceApi, getAuthorizationHeader} = useApiConfiguration()
  const bankAccountService = getBankAccountServiceApi()

  const createBankAccount = async (bankAccountCreationRequest: BankAccountCreationRequest) => {
    const headers = await getAuthorizationHeader();
    return await bankAccountService.createBankAccount({ bankAccountCreationRequest }, {headers})
  }

  const getAllBankAccounts = async () => {
    const headers = await getAuthorizationHeader();
    return await bankAccountService.getAllBankAccount({headers})
  }

  const deleteBankAccount = async (id: string) => {
    const headers = await getAuthorizationHeader();
    return await bankAccountService.deleteBankAccount({ id },{headers})
  }

  return {
    createBankAccount,
    getAllBankAccounts,
    deleteBankAccount
  }
}

export { useBankAccountServiceApi }
