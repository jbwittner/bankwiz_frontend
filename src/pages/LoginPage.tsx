import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'

function LoginPage() {
  const { loginWithPopup } = useAuth0()
  const navigate = useNavigate()

  const processLogin = async () => {
    await loginWithPopup()
    navigate('/home')
  }

  return <Button onClick={() => processLogin()}>Log In</Button>
}

export default LoginPage
