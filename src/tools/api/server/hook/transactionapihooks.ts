import { CreateTransactionRequest, UpdateTransactionRequest } from '@jbwittner/bankwiz_openapi-client-fetch'
import { useApiConfiguration } from './configurationapihooks'

const useTransactionServiceApi = () => {
  const { transactionServiceApi, getAuthorizationJsonHeader } = useApiConfiguration()

  const getAllTransactionOfBankAccount = async (bankaccountId: string) => {
    const headers = await getAuthorizationJsonHeader()
    return transactionServiceApi.getAllTransactionOfBankAccount({ bankaccountId }, { headers })
  }

  const createTransaction = async (createTransactionRequest: CreateTransactionRequest) => {
    const headers = await getAuthorizationJsonHeader()
    return transactionServiceApi.createTransaction({ createTransactionRequest }, { headers })
  }

  const updateTransaction = async (transactionId: string, updateTransactionRequest: UpdateTransactionRequest) => {
    const headers = await getAuthorizationJsonHeader()
    return transactionServiceApi.updateTransaction({ transactionId, updateTransactionRequest }, { headers })
  }

  const deleteTransaction = async (transactionId: string) => {
    const headers = await getAuthorizationJsonHeader()
    return transactionServiceApi.deleteTransaction({ transactionId }, { headers })
  }

  return {
    getAllTransactionOfBankAccount,
    createTransaction,
    updateTransaction,
    deleteTransaction
  }
}

export { useTransactionServiceApi }
