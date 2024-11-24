import { defineStore } from 'pinia'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth0 = useAuth0()
  const router = useRouter()
  const isAuthenticated = ref(auth0.isAuthenticated.value)

  const pushToHome = async () => {
    await router.push({ name: 'home' })
  }

  const login = async () => {
    await auth0.loginWithPopup()
    await pushToHome()
  }

  const logout = async () => {
    await auth0.logout({
      openUrl(url) {
        window.location.replace(url)
      },
    })
  }

  const checkIsAuthenticated = async () => {
    isAuthenticated.value = auth0.isAuthenticated.value
    console.log('auth0.isAuthenticated.value', auth0.isAuthenticated.value)
    if (isAuthenticated.value) {
      await pushToHome()
    }
  }

  return {
    isAuthenticated,
    checkIsAuthenticated,
    login,
    logout,
  }
})
