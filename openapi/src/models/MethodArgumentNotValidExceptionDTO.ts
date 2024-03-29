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
 * @interface MethodArgumentNotValidExceptionDTO
 */
export interface MethodArgumentNotValidExceptionDTO {
    /**
     * 
     * @type {number}
     * @memberof MethodArgumentNotValidExceptionDTO
     */
    status: number;
    /**
     * 
     * @type {string}
     * @memberof MethodArgumentNotValidExceptionDTO
     */
    details: string;
    /**
     * 
     * @type {string}
     * @memberof MethodArgumentNotValidExceptionDTO
     */
    exception: string;
    /**
     * 
     * @type {string}
     * @memberof MethodArgumentNotValidExceptionDTO
     */
    message: string;
    /**
     * 
     * @type {Date}
     * @memberof MethodArgumentNotValidExceptionDTO
     */
    timestamp: Date;
    /**
     * 
     * @type {string}
     * @memberof MethodArgumentNotValidExceptionDTO
     */
    field: string;
    /**
     * 
     * @type {string}
     * @memberof MethodArgumentNotValidExceptionDTO
     */
    objectName: string;
}

/**
 * Check if a given object implements the MethodArgumentNotValidExceptionDTO interface.
 */
export function instanceOfMethodArgumentNotValidExceptionDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "details" in value;
    isInstance = isInstance && "exception" in value;
    isInstance = isInstance && "message" in value;
    isInstance = isInstance && "timestamp" in value;
    isInstance = isInstance && "field" in value;
    isInstance = isInstance && "objectName" in value;

    return isInstance;
}

export function MethodArgumentNotValidExceptionDTOFromJSON(json: any): MethodArgumentNotValidExceptionDTO {
    return MethodArgumentNotValidExceptionDTOFromJSONTyped(json, false);
}

export function MethodArgumentNotValidExceptionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): MethodArgumentNotValidExceptionDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
        'details': json['details'],
        'exception': json['exception'],
        'message': json['message'],
        'timestamp': (new Date(json['timestamp'])),
        'field': json['field'],
        'objectName': json['objectName'],
    };
}

export function MethodArgumentNotValidExceptionDTOToJSON(value?: MethodArgumentNotValidExceptionDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'details': value.details,
        'exception': value.exception,
        'message': value.message,
        'timestamp': (value.timestamp.toISOString()),
        'field': value.field,
        'objectName': value.objectName,
    };
}

