import { useUserCheckRegistration } from '@/tools/api/server/hook/userapihook'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { loginWithPopup } = useAuth0()
  const navigate = useNavigate()
  const { checkRegistration } = useUserCheckRegistration()

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

  return <Button onClick={() => processLogin()}>Log In</Button>
}

export default LoginPage
