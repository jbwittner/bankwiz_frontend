import { LogoutOptions, useAuth0 } from '@auth0/auth0-react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { LogoutButton } from '@/components/Buttons'
import { useAppPath } from '@/tools/router/router'

const logoutOption: LogoutOptions = {
  logoutParams: {
    returnTo: window.location.origin
  }
}

const RootPage = () => {
  const { logout } = useAuth0()
  const pathName = useAppPath()

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {pathName}
            </Typography>
            <LogoutButton onClick={() => logout(logoutOption)}>Logout</LogoutButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </div>
  )
}

export { RootPage }
