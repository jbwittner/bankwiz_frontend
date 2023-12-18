import { RootPage } from '@/pages/root/RootPage'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import { createBrowserRouter, useLocation } from 'react-router-dom'

const useAppPath = () => {
  const location = useLocation()
  const groupPathRegex = /^\/app\/group\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  switch (location.pathname) {
    case '/app/home':
      return 'Home'
    case '/app/groups':
      return 'Groups'
    case '/app/bankaccounts':
      return 'Bank accounts'
    default:
      if (groupPathRegex.test(location.pathname)) {
        return 'Group'
      }

      return 'Unknown'
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
    element: <div>LoginPage</div>
  },
  {
    path: '/app',
    element: <AuthenticationGuard component={RootPage} />,
    children: [
      {
        path: 'home',
        element: <div>home</div>
      },
      {
        path: 'groups',
        element: <div>groups</div>
      },
      {
        path: 'group/:groupId',
        element: <div>group/:groupId</div>
      },
      {
        path: 'bankaccounts',
        element: <div>bankaccounts</div>
      }
    ]
  }
])

export { router, useAppPath }
