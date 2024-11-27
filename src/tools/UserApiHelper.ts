import { ApiHelper } from '@/tools/ApiHelper.ts'
import { UserServiceApi } from '@/generated/server'

export class UserApiHelper extends ApiHelper {
  private userServiceApi = new UserServiceApi(this.configuration)

  public async authenticationUser() {
    const headers = await this.getHeaders()
    return await this.userServiceApi.authenticationUser(headers)
  }
}
