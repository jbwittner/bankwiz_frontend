import { BankAccountCreationRequest } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useBankAccountServiceApi = () => {
  const {bankAccountServiceApi, getAuthorizationHeader} = useApiConfiguration()

  const createBankAccount = async (bankAccountCreationRequest: BankAccountCreationRequest) => {
    const headers = await getAuthorizationHeader();
    return await bankAccountServiceApi.createBankAccount({ bankAccountCreationRequest }, {headers})
  }

  const getAllBankAccounts = async () => {
    const headers = await getAuthorizationHeader();
    return await bankAccountServiceApi.getAllBankAccount({headers})
  }

  const deleteBankAccount = async (id: string) => {
    const headers = await getAuthorizationHeader();
    return await bankAccountServiceApi.deleteBankAccount({ id },{headers})
  }

  return {
    createBankAccount,
    getAllBankAccounts,
    deleteBankAccount
  }
}

export { useBankAccountServiceApi }
