import App from '@/App'
import LoginPage from '@/pages/LoginPage'
import { RootPage } from '@/pages/RootPage'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

interface ParentCompProps {
  component: React.ComponentType<object>
}

const AuthenticationGuard: React.FC<ParentCompProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => loading()
  })

  return <Component />
}

function loading() {
  return <div>Redirecting you to the login...</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthenticationGuard component={RootPage} />,
    children: [
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/test',
        element: <TestPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <h3>HomePage</h3>
      <Button onClick={() => navigate('/test')}>gototest</Button>
    </>
  )
}

function TestPage() {
  const navigate = useNavigate()

  return (
    <>
      <h3>TestPage</h3>
      <Button onClick={() => navigate('/home')}>gotohome</Button>
    </>
  )
}

export default router
