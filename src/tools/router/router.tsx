import { BankAccountsPage } from '@/pages/bankaccounts/BankAccountsPage'
import { GroupPage } from '@/pages/group/GroupPage'
import { GroupsPage } from '@/pages/groups/GroupsPage'
import { HomePage } from '@/pages/home/HomePage'
import LoginPage from '@/pages/login/LoginPage'
import { RootPage } from '@/pages/root/RootPage'
import { TransactionsPage } from '@/pages/transactions/TransactionsPage'
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
    case '/app/transactions':
      return 'Transactions'
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
        path: 'groups',
        element: <GroupsPage />
      },
      {
        path: 'group/:groupId',
        element: <GroupPage />
      },
      {
        path: 'bankaccounts',
        element: <BankAccountsPage />
      },
      {
        path: 'transactions',
        element: <TransactionsPage />
      }
    ]
  }
])

export { router, useAppPath }
