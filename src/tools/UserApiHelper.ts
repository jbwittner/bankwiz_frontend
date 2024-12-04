import { ApiHelper, userServiceApi } from '@/tools/ApiHelper.ts'

export class UserApiHelper extends ApiHelper {
  public async authenticationUser() {
    const headers = await this.getHeaders()
    return await userServiceApi.authenticationUser(headers)
  }
}
