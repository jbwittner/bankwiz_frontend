import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ApplicationBar } from './components/ApplicationBar'
import { ApplicationDrawer } from './components/ApplicationDrawer'

const RootPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ApplicationBar />
      <ApplicationDrawer />
      <Box component="main" sx={{ flexGrow: 1, pl: '50px', pt: '0', pr: '50px' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export { RootPage }
