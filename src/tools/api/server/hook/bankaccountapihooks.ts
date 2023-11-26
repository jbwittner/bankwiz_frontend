import { BankAccountCreationRequest, BankAccountServiceApi } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useBankAccountServiceApi = () => {
  const getConfiguration = useApiConfiguration()

  const getApiInstance = async () => {
    const configuration = await getConfiguration()
    return new BankAccountServiceApi(configuration)
  }

  const createBankAccount = async (bankAccountCreationRequest: BankAccountCreationRequest) => {
    const apiInstance = await getApiInstance()
    return await apiInstance.createBankAccount({ bankAccountCreationRequest })
  }

  return {
    createBankAccount
  }
}

export { useBankAccountServiceApi }
