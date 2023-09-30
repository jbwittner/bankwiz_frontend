import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { LogoutOptions, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'

const logoutOption: LogoutOptions = {
  logoutParams: {
    returnTo: window.location.origin
  }
}

export default function ApplicationBar() {
  const { logout } = useAuth0()
  const navigate = useNavigate()

  const logoutProcess = () => {
    logout(logoutOption)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Button color="inherit" onClick={() => navigate('/home')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/groups')}>
              Groups
            </Button>
            <Button color="inherit" onClick={() => navigate('/bankaccounts')}>
              Bank Account
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={logoutProcess}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
