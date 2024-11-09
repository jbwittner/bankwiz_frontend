/* tslint:disable */
/* eslint-disable */
/**
 * Bankwiz API
 * Bankwiz - API Swagger documentation
 *
 * The version of the OpenAPI document: 1.0.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';

/**
 * 
 */
export class StatusServiceApi extends runtime.BaseAPI {

    /**
     * Admin endpoint to check the admin status of the service
     * Admin endpoint
     */
    async getAdminStatusRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("security_auth", []);
        }

        const response = await this.request({
            path: `/status/admin`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Admin endpoint to check the admin status of the service
     * Admin endpoint
     */
    async getAdminStatus(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getAdminStatusRaw(initOverrides);
        return await response.value();
    }

    /**
     * Private endpoint to check the private status of the service
     * Private endpoint
     */
    async getPrivateStatusRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("security_auth", []);
        }

        const response = await this.request({
            path: `/status/private`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Private endpoint to check the private status of the service
     * Private endpoint
     */
    async getPrivateStatus(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getPrivateStatusRaw(initOverrides);
        return await response.value();
    }

    /**
     * Public endpoint to check the status of the service
     * Public endpoint
     */
    async getPublicStatusRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("security_auth", []);
        }

        const response = await this.request({
            path: `/status/public`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Public endpoint to check the status of the service
     * Public endpoint
     */
    async getPublicStatus(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getPublicStatusRaw(initOverrides);
        return await response.value();
    }

}
