import { LogoutOptions, useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { Outlet } from 'react-router-dom'

const logoutOption: LogoutOptions = {
  logoutParams: {
    returnTo: window.location.origin
  }
}

const RootPage = () => {
  const { logout } = useAuth0()
  return (
    <div>
      <h1>RootPage</h1>
      <Button onClick={() => logout(logoutOption)}>Logout</Button>

      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet />
    </div>
  )
}

export { RootPage }
