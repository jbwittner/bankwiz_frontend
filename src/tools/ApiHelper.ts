import { useAuthStore } from '@/stores/authStore'
import { Configuration, UserServiceApi } from '@/generated/server'

const configuration: Configuration = new Configuration({
  basePath: import.meta.env.VITE_SERVER_URL,
})

export const userServiceApi = new UserServiceApi(configuration)

export abstract class ApiHelper {
  private authStore = useAuthStore()

  protected async getHeaders(): Promise<RequestInit> {
    const token = await this.authStore.getAccessToken()
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }
}
