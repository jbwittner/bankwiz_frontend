import { CreateTransactionRequest } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useTransactionServiceApi = () => {
  const { transactionServiceApi, getAuthorizationJsonHeader } = useApiConfiguration()

  const getAllTransactionOfBankAccount = async (bankaccountId: string) => {
    const headers = await getAuthorizationJsonHeader()
    return transactionServiceApi.getAllTransactionOfBankAccount({bankaccountId},{ headers })
  }

  const createTransaction = async (createTransactionRequest: CreateTransactionRequest) => {
    const headers = await getAuthorizationJsonHeader()
    return transactionServiceApi.createTransaction({createTransactionRequest}, { headers })
  }

  return {
    getAllTransactionOfBankAccount,
    createTransaction
  }
}

export { useTransactionServiceApi }
