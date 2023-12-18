import { useUserServiceApi } from '@/tools/api/server/hook/userserviceapihook'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { loginWithPopup } = useAuth0()
  const navigate = useNavigate()
  const { checkRegistration } = useUserServiceApi()

  const processLogin = async () => {
    loginWithPopup()
      .then(() => {
        return checkRegistration()
      })
      .then(() => {
        navigate('/app/home')
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Button colorScheme="blue" onClick={() => processLogin()}>
      Log In
    </Button>
  )
}

export default LoginPage
