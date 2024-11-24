import { ApiHelper } from '@/tools/ApiHelper.ts'
import { UserServiceApi } from '@/generated/server'

class UserApiHelper extends ApiHelper {

  private userServiceApi = new UserServiceApi(this.configuration)

  public async getUserData() {
    const headers = await this.getHeaders()
    return await this.userServiceApi.authenticationUser(headers);
  }
}

export const userApiHelper = new UserApiHelper()
