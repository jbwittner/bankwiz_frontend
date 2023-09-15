import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'

function App() {
  const [count, setCount] = useState(0)
  const {
    loginWithPopup,
    logout,
    getAccessTokenSilently,
    user,
    isAuthenticated
  } = useAuth0()

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
    <>
      <div>
        <div>
          {isAuthenticated && user && (
            <div>
              <img src={user.userpicture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )}
        </div>
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Button onClick={() => loginWithPopup()}>Log In</Button>
        <Button onClick={() => logout()}>Log out</Button>
        <Button onClick={() => toto()}>getToken</Button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
