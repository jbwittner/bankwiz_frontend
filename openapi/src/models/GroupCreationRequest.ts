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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GroupCreationRequest
 */
export interface GroupCreationRequest {
    /**
     * 
     * @type {string}
     * @memberof GroupCreationRequest
     */
    groupName: string;
}

/**
 * Check if a given object implements the GroupCreationRequest interface.
 */
export function instanceOfGroupCreationRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "groupName" in value;

    return isInstance;
}

export function GroupCreationRequestFromJSON(json: any): GroupCreationRequest {
    return GroupCreationRequestFromJSONTyped(json, false);
}

export function GroupCreationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GroupCreationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'groupName': json['groupName'],
    };
}

export function GroupCreationRequestToJSON(value?: GroupCreationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'groupName': value.groupName,
    };
}

