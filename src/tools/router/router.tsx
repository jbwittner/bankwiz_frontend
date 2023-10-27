import LoginPage from '@/pages/LoginPage'
import { RootPage } from '@/pages/RootPage'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import React from 'react'
import { createBrowserRouter, useLoaderData, useNavigate } from 'react-router-dom'

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
        path: '/test/:testId',
        element: <TestPage />,
        loader: async ({ params }) => {
          console.log(params)
          return { totoid: 5 }
        }
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
      <Button onClick={() => navigate('/test/6')}>gototest</Button>
    </>
  )
}

function TestPage() {
  const navigate = useNavigate()
  const data = useLoaderData() as { totoid: number }

  console.log('testid : ' + data.totoid)

  return (
    <>
      <h3>TestPage : {data.totoid}</h3>
      <Button onClick={() => navigate('/home')}>gotohome</Button>
    </>
  )
}

export default router
