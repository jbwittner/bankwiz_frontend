import { useAuth0 } from '@auth0/auth0-react'
import { Container, Typography, Button, Paper, Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CustomBackdrop from '@/components/Backdrop'
import { useUserCheckRegistration } from '@/tools/hooks/apihooks/userapihook'

function LoginPage() {
  const [openBackdrtop, setOpenBackdrtop] = React.useState(false)

  const { loginWithPopup, isAuthenticated } = useAuth0()
  const { checkRegistration } = useUserCheckRegistration()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      setOpenBackdrtop(true)
      navigate('/home')
    }
  })

  const loginProcess = () => {
    setOpenBackdrtop(true)
    loginWithPopup().then(() => {
      checkRegistration().then(() => {
        navigate('/home')
      })
    })
  }

  return (
    <React.Fragment>
      <CustomBackdrop open={openBackdrtop} />
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
          }}
        >
          <Avatar style={{ backgroundColor: '#f50057', marginBottom: '10px' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Bankwizz
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={loginProcess}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default LoginPage
