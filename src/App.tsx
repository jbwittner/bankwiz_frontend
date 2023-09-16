import { useAuth0 } from '@auth0/auth0-react'
import { Container, Typography, Button } from '@mui/material'
import { useEffect } from 'react'
import { ButtonLink } from './components/Button';

function App() {
  const { loginWithPopup } = useAuth0()

  useEffect(() => {})

  const loginProcess = async () => {
    await loginWithPopup()
  }

  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Bankwizz
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your Financial Management Solution
      </Typography>
      <Typography variant="body1" paragraph>
        Discover how we can assist you in managing your finances in an efficient
        and intuitive manner.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={loginProcess}
      >
        Get Started
      </Button>
      <ButtonLink to="/home">Home</ButtonLink>
    </Container>
  )
}

export default App
