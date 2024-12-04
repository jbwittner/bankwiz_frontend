import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth0 = useAuth0()
  const isAuthenticated = ref(auth0.isAuthenticated.value)

  watch(auth0.isAuthenticated, async (value) => {
    isAuthenticated.value = value
  })

  const login = () => {
    return auth0.loginWithPopup()
  }

  const logout = async () => {
    return auth0.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })
  }

  const getAccessToken = async () => {
    return await auth0.getAccessTokenSilently()
  }

  return {
    isAuthenticated,
    getAccessToken,
    login,
    logout,
  }
})
