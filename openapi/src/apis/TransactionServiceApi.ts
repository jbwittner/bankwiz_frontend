/* tslint:disable */
/* eslint-disable */
/**
 * BankWiz API
 * An API for accessing banking functionalities provided by BankWiz
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BankAccountTransactionsDTO,
  CreateTransactionRequest,
  TransactionDTO,
  UpdateTransactionRequest,
} from '../models/index';
import {
    BankAccountTransactionsDTOFromJSON,
    BankAccountTransactionsDTOToJSON,
    CreateTransactionRequestFromJSON,
    CreateTransactionRequestToJSON,
    TransactionDTOFromJSON,
    TransactionDTOToJSON,
    UpdateTransactionRequestFromJSON,
    UpdateTransactionRequestToJSON,
} from '../models/index';

export interface CreateTransactionOperationRequest {
    createTransactionRequest: CreateTransactionRequest;
}

export interface DeleteTransactionRequest {
    transactionId: string;
}

export interface GetAllTransactionOfBankAccountRequest {
    bankaccountId: string;
}

export interface UpdateTransactionOperationRequest {
    transactionId: string;
    updateTransactionRequest: UpdateTransactionRequest;
}

/**
 * TransactionServiceApi - interface
 * 
 * @export
 * @interface TransactionServiceApiInterface
 */
export interface TransactionServiceApiInterface {
    /**
     * 
     * @summary Create a new transaction
     * @param {CreateTransactionRequest} createTransactionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionServiceApiInterface
     */
    createTransactionRaw(requestParameters: CreateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionDTO>>;

    /**
     * Create a new transaction
     */
    createTransaction(requestParameters: CreateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionDTO>;

    /**
     * 
     * @summary Delete transaction
     * @param {string} transactionId Transaction ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionServiceApiInterface
     */
    deleteTransactionRaw(requestParameters: DeleteTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>>;

    /**
     * Delete transaction
     */
    deleteTransaction(requestParameters: DeleteTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void>;

    /**
     * 
     * @summary Get all transaction of bank account
     * @param {string} bankaccountId Bank account ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionServiceApiInterface
     */
    getAllTransactionOfBankAccountRaw(requestParameters: GetAllTransactionOfBankAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BankAccountTransactionsDTO>>;

    /**
     * Get all transaction of bank account
     */
    getAllTransactionOfBankAccount(requestParameters: GetAllTransactionOfBankAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BankAccountTransactionsDTO>;

    /**
     * 
     * @summary Update transaction
     * @param {string} transactionId Transaction ID
     * @param {UpdateTransactionRequest} updateTransactionRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransactionServiceApiInterface
     */
    updateTransactionRaw(requestParameters: UpdateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionDTO>>;

    /**
     * Update transaction
     */
    updateTransaction(requestParameters: UpdateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionDTO>;

}

/**
 * 
 */
export class TransactionServiceApi extends runtime.BaseAPI implements TransactionServiceApiInterface {

    /**
     * Create a new transaction
     */
    async createTransactionRaw(requestParameters: CreateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionDTO>> {
        if (requestParameters.createTransactionRequest === null || requestParameters.createTransactionRequest === undefined) {
            throw new runtime.RequiredError('createTransactionRequest','Required parameter requestParameters.createTransactionRequest was null or undefined when calling createTransaction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["openid", "profile", "email"]);
        }

        const response = await this.request({
            path: `/transaction`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTransactionRequestToJSON(requestParameters.createTransactionRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionDTOFromJSON(jsonValue));
    }

    /**
     * Create a new transaction
     */
    async createTransaction(requestParameters: CreateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionDTO> {
        const response = await this.createTransactionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete transaction
     */
    async deleteTransactionRaw(requestParameters: DeleteTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.transactionId === null || requestParameters.transactionId === undefined) {
            throw new runtime.RequiredError('transactionId','Required parameter requestParameters.transactionId was null or undefined when calling deleteTransaction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["openid", "profile", "email"]);
        }

        const response = await this.request({
            path: `/transaction/{transactionId}`.replace(`{${"transactionId"}}`, encodeURIComponent(String(requestParameters.transactionId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete transaction
     */
    async deleteTransaction(requestParameters: DeleteTransactionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteTransactionRaw(requestParameters, initOverrides);
    }

    /**
     * Get all transaction of bank account
     */
    async getAllTransactionOfBankAccountRaw(requestParameters: GetAllTransactionOfBankAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BankAccountTransactionsDTO>> {
        if (requestParameters.bankaccountId === null || requestParameters.bankaccountId === undefined) {
            throw new runtime.RequiredError('bankaccountId','Required parameter requestParameters.bankaccountId was null or undefined when calling getAllTransactionOfBankAccount.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["openid", "profile", "email"]);
        }

        const response = await this.request({
            path: `/transaction/bankaccount/{bankaccountId}`.replace(`{${"bankaccountId"}}`, encodeURIComponent(String(requestParameters.bankaccountId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BankAccountTransactionsDTOFromJSON(jsonValue));
    }

    /**
     * Get all transaction of bank account
     */
    async getAllTransactionOfBankAccount(requestParameters: GetAllTransactionOfBankAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BankAccountTransactionsDTO> {
        const response = await this.getAllTransactionOfBankAccountRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update transaction
     */
    async updateTransactionRaw(requestParameters: UpdateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionDTO>> {
        if (requestParameters.transactionId === null || requestParameters.transactionId === undefined) {
            throw new runtime.RequiredError('transactionId','Required parameter requestParameters.transactionId was null or undefined when calling updateTransaction.');
        }

        if (requestParameters.updateTransactionRequest === null || requestParameters.updateTransactionRequest === undefined) {
            throw new runtime.RequiredError('updateTransactionRequest','Required parameter requestParameters.updateTransactionRequest was null or undefined when calling updateTransaction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth2", ["openid", "profile", "email"]);
        }

        const response = await this.request({
            path: `/transaction/{transactionId}`.replace(`{${"transactionId"}}`, encodeURIComponent(String(requestParameters.transactionId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateTransactionRequestToJSON(requestParameters.updateTransactionRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionDTOFromJSON(jsonValue));
    }

    /**
     * Update transaction
     */
    async updateTransaction(requestParameters: UpdateTransactionOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionDTO> {
        const response = await this.updateTransactionRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
