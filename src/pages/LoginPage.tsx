import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { loginWithPopup } = useAuth0()
  const navigate = useNavigate()

  const processLogin = async () => {
    await loginWithPopup()
    navigate('/app/home')
  }

  return <Button onClick={() => processLogin()}>Log In</Button>
}

export default LoginPage
