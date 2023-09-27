import { PropsWithChildren } from 'react'
import { AppState, Auth0Provider, Auth0ProviderOptions, withAuthenticationRequired } from '@auth0/auth0-react'
import { useNavigate, Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { GroupsPage } from '@/pages/groups/GroupsPage'
import { ApplicationLayout } from '@/components/layout/ApplicationLayout'
import { HomePage } from '@/pages/home/HomePage'
import { LoginPage } from '@/pages/login/LoginPage'
import { BankAccountPage } from '@/pages/bankaccount/BankAccountPage'
import { GroupPage } from '@/pages/group/GroupPage'
import { useGroupGetGroup } from './hooks/apihooks/groupapihook'
import { Auth0ProviderWithRedirectCallback } from './auth'




const ApplicationLayoutWithAuthentication = withAuthenticationRequired(ApplicationLayout)
const HomePageWithAuthentication = withAuthenticationRequired(HomePage)
const GroupsPageWithAuthentication = withAuthenticationRequired(GroupsPage)
const GroupPageWithAuthentication = withAuthenticationRequired(GroupPage)
const BankAccountPageWithAuthentication = withAuthenticationRequired(BankAccountPage)

/*
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Auth0ProviderWithRedirectCallback
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          redirect_uri: window.location.origin
        }}
      />
    ),
    children: [
      {
        index: true,
        Component: LoginPage
      },
      {
        path: 'home',
        Component: HomePageWithAuthentication,
        loader: {({ params }) => {console.log(params)}}
      },
      {
        path: 'groups',
      }
    ]
  }
])
*/

const AppRoute = () => {

          const { groupDTO, getGroup } = useGroupGetGroup()


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Auth0ProviderWithRedirectCallback
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            redirect_uri: window.location.origin
          }}
        />
      }
    >
      <Route index element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/groups" element={<GroupsPageWithAuthentication />} />
      <Route
        path="/group/:groupId"
        element={<GroupPageWithAuthentication />}
        loader={async ({ params }) => {
          console.log("params")
          console.log(params)
          console.log("params")
          if (params.groupId) {
            return groupDTO
          }
        }}
        action={({ request }) => {
          console.log('request')
          console.log(request)
          console.log('request')
          return null
        }}
      />
    </Route>
  )
)


  return (
      <RouterProvider router={router} />
  )
}

/*
const AppRoute = () => {

  const { groupDTO, getGroup } = useGroupGetGroup()

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ApplicationLayoutWithAuthentication />}>
        <Route path="/home" element={<HomePageWithAuthentication />} />
        <Route path="/groups" element={<GroupsPageWithAuthentication />} />
        <Route
          path="/group/:groupId"
          element={<GroupPageWithAuthentication />}
          loader={async ({ params }) => {
            console.log(params)
            if (params.groupId) {
              const groupId = Number.parseInt(params.groupId)
              await getGroup(groupId)
              return groupDTO
            }
          }}
        />
        <Route path="/bankaccount" element={<BankAccountPageWithAuthentication />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )

  return <RouterProvider router={router}/>
}
*/

export { Auth0ProviderWithRedirectCallback, AppRoute }
