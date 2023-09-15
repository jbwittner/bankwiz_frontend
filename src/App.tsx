import { useAuth0 } from '@auth0/auth0-react'
import { Container, Typography, Button } from '@mui/material'

function App() {
  const { loginWithPopup, logout, getAccessTokenSilently } = useAuth0()

  console.log(import.meta.env.VITE_AUTH0_DOMAIN) // 123
  console.log(import.meta.env.VITE_SERVER_URL) // undefined

  const toto = () => {
    getAccessTokenSilently()
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
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
      <Button variant="contained" color="primary" size="large">
        Get Started
      </Button>
      <Button onClick={() => loginWithPopup()}>Log In</Button>
      <Button onClick={() => logout()}>Log out</Button>
      <Button onClick={() => toto()}>getToken</Button>
    </Container>
  )
}

export default App
