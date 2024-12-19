import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserDTO } from '@/generated/server'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserDTO>()
  return {
    user
  }
})
