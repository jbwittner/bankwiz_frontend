// src/services/apiService.ts
import { useAuthStore } from '@/stores/authStore'
import { Configuration } from '@/generated/server'

export abstract class ApiHelper {
  private authStore = useAuthStore()

  protected configuration: Configuration = new Configuration({
    basePath: import.meta.env.VITE_SERVER_URL,
  })

  protected async getHeaders(): Promise<RequestInit> {
    const token = await this.authStore.getAccessToken()
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  }
}
