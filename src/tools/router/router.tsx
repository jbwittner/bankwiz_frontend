import { GroupPage } from '@/pages/group/GroupPage'
import { HomePage } from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import { RootPage } from '@/pages/root/RootPage'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { createBrowserRouter, useLocation } from 'react-router-dom'

const useAppPath = () => {
  const location = useLocation()
  switch (location.pathname) {
    case '/app/home':
      return 'Home'
    case '/app/group':
      return 'Group'
    default:
      break
  }
}

interface ParentCompProps {
  component: React.ComponentType<object>
}

const AuthenticationGuard = ({ component }: ParentCompProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => loading()
  })

  return <Component />
}

function loading() {
  return <div>Redirecting you to the loginnnnnnnn...</div>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/app',
    element: <AuthenticationGuard component={RootPage} />,
    children: [
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'group',
        element: <GroupPage />
      }
    ]
  }
])

export { router, useAppPath }
