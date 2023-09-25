import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react'
import TemporaryDrawer from '../drawer/ApplicationDrawer'
import React, { useState } from 'react'

const logoutOption: LogoutOptions = {
  logoutParams: {
    returnTo: window.location.origin
  }
}

function stringSwitch(inputStr: string): string {
  switch (inputStr) {
    case '/home':
      return 'Home'
    case '/group':
      return 'Group'
    case '/account':
      return 'Account'
    default:
      return 'Unknown'
  }
}

export default function ApplicationBar() {
  const { logout } = useAuth0()
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)

  const label = stringSwitch(window.location.pathname)

  const logoutProcess = () => {
    logout(logoutOption)
  }

  return (
    <React.Fragment>
      <TemporaryDrawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setDrawerIsOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {label}
            </Typography>
            <Button color="inherit" onClick={logoutProcess}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  )
}
