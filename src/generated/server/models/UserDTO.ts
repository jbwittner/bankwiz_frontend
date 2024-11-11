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

import { mapValues } from '../runtime'
/**
 *
 * @export
 * @interface UserDTO
 */
export interface UserDTO {
  /**
   *
   * @type {string}
   * @memberof UserDTO
   */
  id: string
  /**
   *
   * @type {string}
   * @memberof UserDTO
   */
  email: string
  /**
   *
   * @type {string}
   * @memberof UserDTO
   */
  authId: string
  /**
   *
   * @type {string}
   * @memberof UserDTO
   */
  nickName: string
  /**
   *
   * @type {string}
   * @memberof UserDTO
   */
  fullName: string
}

/**
 * Check if a given object implements the UserDTO interface.
 */
export function instanceOfUserDTO(value: object): value is UserDTO {
  if (!('id' in value) || value['id'] === undefined) return false
  if (!('email' in value) || value['email'] === undefined) return false
  if (!('authId' in value) || value['authId'] === undefined) return false
  if (!('nickName' in value) || value['nickName'] === undefined) return false
  if (!('fullName' in value) || value['fullName'] === undefined) return false
  return true
}

export function UserDTOFromJSON(json: any): UserDTO {
  return UserDTOFromJSONTyped(json, false)
}

export function UserDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): UserDTO {
  if (json == null) {
    return json
  }
  return {
    id: json['id'],
    email: json['email'],
    authId: json['auth_id'],
    nickName: json['nick_name'],
    fullName: json['full_name'],
  }
}

export function UserDTOToJSON(json: any): UserDTO {
  return UserDTOToJSONTyped(json, false)
}

export function UserDTOToJSONTyped(
  value?: UserDTO | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value
  }

  return {
    id: value['id'],
    email: value['email'],
    auth_id: value['authId'],
    nick_name: value['nickName'],
    full_name: value['fullName'],
  }
}
