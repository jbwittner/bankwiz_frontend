import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth0 = useAuth0()
  const isAuthenticated = ref(auth0.isAuthenticated.value)

  const login = () => {
    return auth0.loginWithPopup()
  }

  const logout = () => {
    return auth0.logout()
  }

  watch(auth0.isAuthenticated, (value) => {
    isAuthenticated.value = value
  })

  return {
    isAuthenticated,
    login,
    logout,
  }
})
