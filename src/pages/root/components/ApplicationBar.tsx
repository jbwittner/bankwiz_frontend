import { LogoutOptions, useAuth0 } from '@auth0/auth0-react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useAppPath } from '@/tools/router/router'

const logoutOption: LogoutOptions = {
  logoutParams: {
    returnTo: window.location.origin
  }
}

export const ApplicationBar = () => {
  const { logout } = useAuth0()
  const pathName = useAppPath()

  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pathName}
        </Typography>
        <Button onClick={() => logout(logoutOption)} color="error">Logout</Button>
      </Toolbar>
    </AppBar>
  )
}
