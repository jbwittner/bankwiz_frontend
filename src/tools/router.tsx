import { PropsWithChildren } from 'react'
import { AppState, Auth0Provider, Auth0ProviderOptions, withAuthenticationRequired } from '@auth0/auth0-react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { ApplicationLayout } from '@/components/layout/ApplicationLayout'
import { HomePage } from '@/pages/home/HomePage'
import { LoginPage } from '@/pages/login/LoginPage'
import { GroupsPage } from '@/pages/groups/GroupsPage'
import { GroupPage } from '@/pages/group/GroupPage'
import { BankAccountsPage } from '@/pages/bankaccounts/BankAccountsPage'

const Auth0ProviderWithRedirectCallback = ({ children, ...props }: PropsWithChildren<Auth0ProviderOptions>) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo ?? window.location.pathname)
  }

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  )
}

const ApplicationLayoutWithAuthentication = withAuthenticationRequired(ApplicationLayout)
const HomePageWithAuthentication = withAuthenticationRequired(HomePage)
const GroupsPageWithAuthentication = withAuthenticationRequired(GroupsPage)
const GroupPageWithAuthentication = withAuthenticationRequired(GroupPage)
const BankAccountsPageWithAuthentication = withAuthenticationRequired(BankAccountsPage)

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ApplicationLayoutWithAuthentication />}>
        <Route path="/home" element={<HomePageWithAuthentication />} />
        <Route path="/groups" element={<GroupsPageWithAuthentication />} />
        <Route path="/group/:groupId" element={<GroupPageWithAuthentication />} />
        <Route path="/bankaccounts" element={<BankAccountsPageWithAuthentication />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export { Auth0ProviderWithRedirectCallback, AppRoute }
